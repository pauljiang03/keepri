/** Wrap words without changing their text, spacing, or accessible reading order. */
export function createWordSurfaces() {
  const cache = new Map<
    HTMLElement,
    {
      words: HTMLElement[];
      originals: { original: Text; wrapper: HTMLElement }[];
    }
  >();
  const restore = (page: HTMLElement) => {
    const entry = cache.get(page);
    if (!entry) return;
    for (const { original, wrapper } of entry.originals)
      wrapper.replaceWith(original);
    cache.delete(page);
  };
  return {
    prepare(page: HTMLElement) {
      const existing = cache.get(page);
      if (existing)
        return existing.words.filter((word) => word.getClientRects().length);
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
      const originals: { original: Text; wrapper: HTMLElement }[] = [];
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
      cache.set(page, { words, originals });
      // Hidden responsive links must not be measured by GSAP: its temporary
      // reparenting of display:none nodes can reorder their whitespace nodes.
      return words.filter((word) => word.getClientRects().length);
    },
    // Restore the untouched original text nodes instead of asking GSAP to
    // measure hidden words during cleanup. The resting page is native text.
    reset: restore,
    destroy() {
      for (const page of cache.keys()) restore(page);
    },
  };
}
