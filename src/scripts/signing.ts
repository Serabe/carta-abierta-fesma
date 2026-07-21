const STORAGE_KEY = 'carta-abierta:pending-signatures';

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

function titleFor(id: string): string {
  const el = document.querySelector(`[data-sign-id="${CSS.escape(id)}"]`);
  return el?.getAttribute('data-sign-title') ?? id;
}

function shortCode(selected: string[], name: string): string {
  const payload = `${name.trim().toLowerCase()}|${[...selected].sort().join(',')}`;
  let hash = 0;
  for (let i = 0; i < payload.length; i++) {
    hash = (hash * 31 + payload.charCodeAt(i)) >>> 0;
  }
  return `CAB-${hash.toString(16).toUpperCase().padStart(6, '0').slice(0, 6)}`;
}

function buildMessage(selected: string[], name: string, affiliation: string): string {
  const lines = [
    'Solicitud de firma — Carta abierta a FESMA',
    '',
    `Nombre (tal como debe aparecer): ${name.trim() || '—'}`,
  ];
  if (affiliation.trim()) {
    lines.push(`Afiliación / delegación: ${affiliation.trim()}`);
  }
  lines.push('', 'Secciones que deseo firmar:');
  for (const id of selected) {
    lines.push(`- ${titleFor(id)} (${id})`);
  }
  lines.push('', `Código de solicitud: ${shortCode(selected, name)}`);
  lines.push(
    '',
    'He leído el aviso: mi nombre figurará en el repositorio público del',
    'proyecto. Si más adelante retiro la firma, el nombre dejará de',
    'aparecer en la versión publicada, pero permanecerá en el historial',
    'de cambios de git.',
  );
  return lines.join('\n');
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

  const bar = document.getElementById('sign-sticky-bar');
  const countEl = document.getElementById('sign-sticky-count');
  if (bar && countEl) {
    const n = state.selected.length;
    if (n === 0) {
      bar.hidden = true;
    } else {
      bar.hidden = false;
      countEl.textContent =
        n === 1 ? '1 sección seleccionada' : `${n} secciones seleccionadas`;
    }
  }

  const empty = document.getElementById('sign-finalize-empty');
  const form = document.getElementById('sign-finalize-form');
  const list = document.getElementById('sign-selected-list');
  if (empty && form && list) {
    if (state.selected.length === 0) {
      empty.hidden = false;
      form.hidden = true;
    } else {
      empty.hidden = true;
      form.hidden = false;
      list.innerHTML = '';
      for (const id of state.selected) {
        const li = document.createElement('li');
        li.textContent = titleFor(id);
        list.appendChild(li);
      }
    }
  }

  refreshMessage();
}

function refreshMessage() {
  const state = readState();
  const nameInput = document.getElementById('sign-name') as HTMLInputElement | null;
  const affInput = document.getElementById('sign-affiliation') as HTMLInputElement | null;
  const out = document.getElementById('sign-message') as HTMLTextAreaElement | null;
  const codeEl = document.getElementById('sign-code');
  if (!out) return;
  const name = nameInput?.value ?? '';
  const affiliation = affInput?.value ?? '';
  out.value = buildMessage(state.selected, name, affiliation);
  if (codeEl) {
    codeEl.textContent =
      state.selected.length > 0 ? shortCode(state.selected, name) : '—';
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
      'Al final del documento encontrarás las instrucciones para completar la firma de todas las secciones que hayas marcado.',
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

  const nameInput = document.getElementById('sign-name');
  const affInput = document.getElementById('sign-affiliation');
  nameInput?.addEventListener('input', refreshMessage);
  affInput?.addEventListener('input', refreshMessage);

  const copyBtn = document.getElementById('sign-copy');
  copyBtn?.addEventListener('click', async () => {
    const out = document.getElementById('sign-message') as HTMLTextAreaElement | null;
    if (!out?.value) return;
    try {
      await navigator.clipboard.writeText(out.value);
      showToast('Mensaje copiado. Envíalo a través de un contacto en común.');
    } catch {
      out.focus();
      out.select();
      showToast('No se pudo copiar automáticamente. Selecciona el texto y cópialo a mano.');
    }
  });

  const clearBtn = document.getElementById('sign-clear');
  clearBtn?.addEventListener('click', () => {
    writeState({ selected: [] });
    syncUi(readState());
  });

  syncUi(readState());
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
