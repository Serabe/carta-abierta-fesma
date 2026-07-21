#!/usr/bin/env node
/**
 * Add a signer from a CAB1 section code (copied from the letter UI).
 *
 * Usage:
 *   node scripts/add-signature.mjs --name "Ana Pérez" --code "CAB1:0012,0639"
 *   node scripts/add-signature.mjs --name "Ana Pérez" --affiliation "Madrid" --code "CAB1:0639"
 *   node scripts/add-signature.mjs --remove --name "Ana Pérez"
 *
 * Code format: CAB1:<uid>,<uid>,...
 * Uids are 4-digit strings for integers 0–1000 (e.g. 0000, 0012, 1000),
 * from each section's frontmatter `uid` field — not folder/file order.
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA_PATH = join(ROOT, 'src/data/signatures.json');
const SECTIONS_DIR = join(ROOT, 'src/content/sections');
const CODE_PREFIX = 'CAB1';
const UID_RE = /^\d{4}$/;

/**
 * @param {string} uid
 */
function isValidUid(uid) {
  if (!UID_RE.test(uid)) return false;
  const n = Number(uid);
  return n >= 0 && n <= 1000;
}

/**
 * @typedef {{ name: string, affiliation?: string, sections: string[], addedAt: string }} Signer
 */

function usage() {
  console.error(`Usage:
  node scripts/add-signature.mjs --name "Nombre" --code "CAB1:0639,0012"
  node scripts/add-signature.mjs --name "Nombre" --affiliation "Delegación" --code "CAB1:0639"
  node scripts/add-signature.mjs --remove --name "Nombre"`);
  process.exit(1);
}

/**
 * @param {string[]} argv
 */
function parseArgs(argv) {
  /** @type {{ name?: string, affiliation?: string, code?: string, remove: boolean }} */
  const out = { remove: false };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--name') out.name = argv[++i];
    else if (arg === '--affiliation') out.affiliation = argv[++i];
    else if (arg === '--code') out.code = argv[++i];
    else if (arg === '--remove') out.remove = true;
    else if (arg === '--help' || arg === '-h') usage();
    else {
      console.error(`Unknown argument: ${arg}`);
      usage();
    }
  }
  return out;
}

/**
 * Walk section markdown files and collect frontmatter `uid` values.
 * @returns {Set<string>}
 */
function loadKnownUids() {
  /** @type {string[]} */
  const files = [];

  /**
   * @param {string} dir
   */
  function walk(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.isFile() && entry.name.endsWith('.md')) files.push(full);
    }
  }

  walk(SECTIONS_DIR);

  /** @type {Set<string>} */
  const uids = new Set();
  for (const file of files) {
    const raw = readFileSync(file, 'utf8');
    if (!raw.startsWith('---')) continue;
    const end = raw.indexOf('\n---', 3);
    if (end === -1) continue;
    const frontmatter = raw.slice(3, end);
    const match = /^uid:\s*["']?(\d{4})["']?\s*$/m.exec(frontmatter);
    if (!match) continue;
    const uid = match[1];
    if (!isValidUid(uid)) {
      throw new Error(`Invalid uid "${uid}" in ${file} (expected 0000–1000)`);
    }
    if (uids.has(uid)) {
      throw new Error(`Duplicate uid "${uid}" found while scanning sections`);
    }
    uids.add(uid);
  }
  return uids;
}

/**
 * @param {string} code
 * @param {Set<string>} knownUids
 * @returns {string[]}
 */
function parseCode(code, knownUids) {
  const trimmed = code.trim();
  const prefix = `${CODE_PREFIX}:`;
  if (!trimmed.startsWith(prefix)) {
    throw new Error(
      `Invalid code: expected it to start with "${prefix}" (got "${trimmed.slice(0, 24)}")`,
    );
  }
  const body = trimmed.slice(prefix.length).trim();
  if (!body) {
    throw new Error('Invalid code: no section uids after the prefix');
  }
  const ids = [
    ...new Set(
      body
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    ),
  ].sort();
  if (ids.length === 0) {
    throw new Error('Invalid code: empty section list');
  }
  for (const id of ids) {
    if (!isValidUid(id)) {
      throw new Error(`Invalid section uid in code: "${id}" (expected 0000–1000)`);
    }
    if (!knownUids.has(id)) {
      throw new Error(
        `Unknown section uid "${id}". Known uids: ${[...knownUids].sort().join(', ') || '(none)'}`,
      );
    }
  }
  return ids;
}

/**
 * @returns {Signer[]}
 */
function loadSigners() {
  const raw = readFileSync(DATA_PATH, 'utf8');
  const data = JSON.parse(raw);
  if (!Array.isArray(data)) {
    throw new Error(`${DATA_PATH} must be a JSON array`);
  }
  return data;
}

/**
 * @param {Signer[]} signers
 */
function saveSigners(signers) {
  writeFileSync(DATA_PATH, `${JSON.stringify(signers, null, 2)}\n`, 'utf8');
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.name?.trim()) {
    console.error('Missing --name');
    usage();
  }
  const name = args.name.trim();
  const signers = loadSigners();

  if (args.remove) {
    const next = signers.filter(
      (s) => s.name.toLowerCase() !== name.toLowerCase(),
    );
    if (next.length === signers.length) {
      console.error(`No signer found with name "${name}"`);
      process.exit(1);
    }
    saveSigners(next);
    console.log(`Removed signer "${name}". Remains in git history if already committed.`);
    return;
  }

  if (!args.code?.trim()) {
    console.error('Missing --code');
    usage();
  }

  const knownUids = loadKnownUids();
  const sections = parseCode(args.code, knownUids);
  const existingIdx = signers.findIndex(
    (s) => s.name.toLowerCase() === name.toLowerCase(),
  );

  /** @type {Signer} */
  const entry = {
    name,
    sections,
    addedAt: new Date().toISOString().slice(0, 10),
  };
  if (args.affiliation?.trim()) {
    entry.affiliation = args.affiliation.trim();
  }

  if (existingIdx >= 0) {
    const prev = signers[existingIdx];
    entry.sections = [...new Set([...prev.sections, ...sections])].sort();
    if (!entry.affiliation && prev.affiliation) {
      entry.affiliation = prev.affiliation;
    }
    signers[existingIdx] = entry;
    console.log(`Updated signer "${name}" → sections: ${entry.sections.join(', ')}`);
  } else {
    signers.push(entry);
    console.log(`Added signer "${name}" → sections: ${entry.sections.join(', ')}`);
  }

  saveSigners(signers);
  console.log(`Wrote ${DATA_PATH}`);
}

main();
