const STORAGE_KEY = 'carta-abierta:pending-signatures';
/** Prefix for the copyable section-uid payload. Parsed by scripts/add-signature.mjs */
const CODE_PREFIX = 'CAB1';

type SignState = {
  selected: string[];
};

function readState(): SignState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { selected: [] };
    const parsed = JSON.parse(raw) as Partial<SignState>;
    const selected = Array.isArray(parsed.selected)
      ? parsed.selected.filter((id): id is string => typeof id === 'string')
      : [];
    return { selected };
  } catch {
    return { selected: [] };
  }
}

function writeState(state: SignState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

/** Uids of signable sections currently present in the page. */
function existingSignableUids(): Set<string> {
  const ids = new Set<string>();
  document.querySelectorAll<HTMLElement>('[data-sign-id]').forEach((el) => {
    const id = el.getAttribute('data-sign-id');
    if (id) ids.add(id);
  });
  return ids;
}

/**
 * Drop stored selections whose section no longer exists on this page.
 * Keeps every uid that still matches a signable section.
 */
function pruneMissingSelections(state: SignState): SignState {
  const existing = existingSignableUids();
  const selected = state.selected.filter((id) => existing.has(id));
  if (selected.length !== state.selected.length) {
    const next = { selected };
    writeState(next);
    return next;
  }
  return state;
}

function titleFor(id: string): string {
  const el = document.querySelector(`[data-sign-id="${CSS.escape(id)}"]`);
  return el?.getAttribute('data-sign-title') ?? id;
}

/** Compact, script-parseable list of stable section uids. Example: CAB1:0012,0639 */
function buildSectionCode(selected: string[]): string {
  const ids = [...new Set(selected)].sort().join(',');
  return `${CODE_PREFIX}:${ids}`;
}

function showToast(message: string) {
  const existing = document.getElementById('sign-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'sign-toast';
  toast.className = 'sign-toast';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('is-visible'));
  window.setTimeout(() => {
    toast.classList.remove('is-visible');
    window.setTimeout(() => toast.remove(), 280);
  }, 5200);
}

function syncUi(state: SignState) {
  const selected = new Set(state.selected);

  document.querySelectorAll<HTMLButtonElement>('[data-sign-toggle]').forEach((btn) => {
    const id = btn.getAttribute('data-sign-id');
    if (!id) return;
    const isOn = selected.has(id);
    btn.setAttribute('aria-pressed', isOn ? 'true' : 'false');
    btn.classList.toggle('is-selected', isOn);
    const label = btn.querySelector('[data-sign-label]');
    if (label) {
      label.textContent = isOn ? 'Quiero firmar esto ✓' : 'Quiero firmar esto';
    }
  });

  const hasSelection = state.selected.length > 0;

  const panel = document.getElementById('firmar');
  if (panel) {
    panel.hidden = !hasSelection;
  }

  const bar = document.getElementById('sign-sticky-bar');
  const countEl = document.getElementById('sign-sticky-count');
  if (bar && countEl) {
    if (!hasSelection) {
      bar.hidden = true;
    } else {
      bar.hidden = false;
      const n = state.selected.length;
      countEl.textContent =
        n === 1 ? '1 sección seleccionada' : `${n} secciones seleccionadas`;
    }
  }

  const list = document.getElementById('sign-selected-list');
  if (list) {
    list.innerHTML = '';
    for (const id of state.selected) {
      const li = document.createElement('li');
      li.textContent = titleFor(id);
      list.appendChild(li);
    }
  }

  const codeEl = document.getElementById('sign-code');
  if (codeEl) {
    codeEl.textContent = hasSelection ? buildSectionCode(state.selected) : '—';
  }
}

function toggle(id: string) {
  const state = readState();
  const idx = state.selected.indexOf(id);
  const wasOff = idx === -1;
  if (wasOff) {
    state.selected.push(id);
  } else {
    state.selected.splice(idx, 1);
  }
  writeState(state);
  syncUi(state);

  if (wasOff) {
    showToast(
      'Al final del documento aparecerán las instrucciones para completar la firma de las secciones que hayas marcado.',
    );
  }
}

function init() {
  document.querySelectorAll<HTMLButtonElement>('[data-sign-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-sign-id');
      if (id) toggle(id);
    });
  });

  const copyBtn = document.getElementById('sign-copy');
  copyBtn?.addEventListener('click', async () => {
    const state = readState();
    if (state.selected.length === 0) return;
    const code = buildSectionCode(state.selected);
    try {
      await navigator.clipboard.writeText(code);
      showToast('Código copiado. Envíalo junto con tu nombre a través de un contacto en común.');
    } catch {
      const codeEl = document.getElementById('sign-code');
      if (codeEl) {
        const range = document.createRange();
        range.selectNodeContents(codeEl);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
      showToast('No se pudo copiar automáticamente. Selecciona el código y cópialo a mano.');
    }
  });

  const clearBtn = document.getElementById('sign-clear');
  clearBtn?.addEventListener('click', () => {
    writeState({ selected: [] });
    syncUi(readState());
  });

  syncUi(pruneMissingSelections(readState()));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
