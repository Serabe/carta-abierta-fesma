import { execSync } from 'node:child_process';

export type GitTag = {
  name: string;
  date: string;
  subject: string;
  tagUrl: string;
  compareUrl: string | null;
};

function run(command: string): string {
  return execSync(command, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
}

function detectRepoUrl(): string | null {
  const fromEnv = process.env.PUBLIC_REPO_URL;
  if (fromEnv) return fromEnv.replace(/\/$/, '');

  try {
    const remote = run('git remote get-url origin');
    const httpsMatch = remote.match(/^https?:\/\/[^/]+\/(.+?)(?:\.git)?$/);
    if (httpsMatch) return `https://github.com/${httpsMatch[1]}`;
    const sshMatch = remote.match(/^git@([^:]+):(.+?)(?:\.git)?$/);
    if (sshMatch) return `https://${sshMatch[1]}/${sshMatch[2]}`;
    return null;
  } catch {
    return null;
  }
}

export function getGitTags(): GitTag[] {
  let rawTags: string;
  try {
    rawTags = run('git tag --sort=-creatordate');
  } catch {
    return [];
  }
  if (!rawTags) return [];

  const names = rawTags.split('\n').filter(Boolean);
  const repoUrl = detectRepoUrl();

  return names.map((name, index) => {
    let date = '';
    let subject = '';
    try {
      date = run(`git log -1 --format=%cs ${name}`);
    } catch {}
    try {
      subject = run(`git log -1 --format=%s ${name}`);
    } catch {}

    const previous = names[index + 1];
    const tagUrl = repoUrl ? `${repoUrl}/releases/tag/${name}` : '#';
    const compareUrl =
      repoUrl && previous ? `${repoUrl}/compare/${previous}...${name}` : null;

    return { name, date, subject, tagUrl, compareUrl };
  });
}
