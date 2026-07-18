const tocLinks = Array.from(
  document.querySelectorAll<HTMLAnchorElement>('[data-toc-anchor]'),
);
const asidePanels = Array.from(
  document.querySelectorAll<HTMLElement>('.sidebar-aside__panel'),
);
const progressBar = document.getElementById('progress-bar');

const anchorToLinks = new Map<string, HTMLAnchorElement[]>();
for (const link of tocLinks) {
  const anchor = link.dataset.tocAnchor!;
  const list = anchorToLinks.get(anchor) ?? [];
  list.push(link);
  anchorToLinks.set(anchor, list);
}

const sectionEls = Array.from(
  document.querySelectorAll<HTMLElement>('main [data-section]'),
);

function activate(anchor: string): void {
  for (const link of tocLinks) {
    const isActive = link.dataset.tocAnchor === anchor;
    link.classList.toggle('is-active', isActive);
  }

  const topLevel = anchor.split('__')[0];
  for (const panel of asidePanels) {
    panel.hidden = panel.dataset.asideFor !== topLevel;
  }
}

const visible = new Map<string, number>();
const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      const anchor = (entry.target as HTMLElement).id;
      if (entry.isIntersecting) {
        visible.set(anchor, entry.intersectionRatio);
      } else {
        visible.delete(anchor);
      }
    }

    if (visible.size === 0) return;

    let bestAnchor = '';
    let bestTop = Number.POSITIVE_INFINITY;
    for (const anchor of visible.keys()) {
      const el = document.getElementById(anchor);
      if (!el) continue;
      const top = el.getBoundingClientRect().top;
      if (top < bestTop) {
        bestTop = top;
        bestAnchor = anchor;
      }
    }

    if (bestAnchor) activate(bestAnchor);
  },
  {
    rootMargin: '-20% 0px -60% 0px',
    threshold: [0, 0.25, 0.5, 0.75, 1],
  },
);

for (const el of sectionEls) observer.observe(el);

function updateProgress(): void {
  if (!progressBar) return;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
  progressBar.style.width = `${ratio * 100}%`;
}

window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);
updateProgress();
