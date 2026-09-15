import { gsap } from 'gsap';

/** Wrap words without changing their text, spacing, or accessible reading order. */
export function createWordSurfaces() {
  const cache = new Map<HTMLElement, HTMLElement[]>();
  const originals: { original: Text; wrapper: HTMLElement }[] = [];
  return {
    prepare(page: HTMLElement) {
      const existing = cache.get(page);
      if (existing)
        return existing.filter((word) => word.getClientRects().length);
      const walker = document.createTreeWalker(page, NodeFilter.SHOW_TEXT);
      const nodes: Text[] = [];
      while (walker.nextNode()) {
        const node = walker.currentNode as Text;
        if (
          node.textContent?.trim() &&
          !node.parentElement?.closest(
            'svg, .sr-only, .keepri-wordmark, button',
          )
        )
          nodes.push(node);
      }
      const words: HTMLElement[] = [];
      for (const original of nodes) {
        const wrapper = document.createElement('span');
        wrapper.className = 'transition-text';
        for (const part of original.data.split(/(\s+)/)) {
          if (!part.trim()) wrapper.appendChild(document.createTextNode(part));
          else {
            const word = document.createElement('span');
            word.className = 'transition-word';
            word.textContent = part;
            wrapper.appendChild(word);
            words.push(word);
          }
        }
        original.replaceWith(wrapper);
        originals.push({ original, wrapper });
      }
      cache.set(page, words);
      // Hidden responsive links must not be measured by GSAP: its temporary
      // reparenting of display:none nodes can reorder their whitespace nodes.
      return words.filter((word) => word.getClientRects().length);
    },
    reset(page: HTMLElement) {
      const words = cache
        .get(page)
        ?.filter((word) => word.style.transform || word.style.opacity);
      if (words?.length) gsap.set(words, { clearProps: 'transform,opacity' });
    },
    destroy() {
      for (const { original, wrapper } of originals)
        wrapper.replaceWith(original);
      cache.clear();
    },
  };
}
