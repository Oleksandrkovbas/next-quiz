export function delayAnimation(cb, delay = 100) {
  setTimeout(() => requestAnimationFrame(cb), delay);
}

export function scrollSmooth(top, offset = 0) {
  if (top === undefined) {
    top =
      Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      ) + offset;
  }

  try {
    window.scrollTo({
      top,
      behavior: 'smooth',
    });
  } catch (e) {
    window.scrollTo(0, top);
  }
}

export function scrollToElement(qs, offset = 0, onlyIfBellow = false) {
  if (!qs) return;
  if (qs) {
    const scrollToEl = document.querySelector(qs);
    if (scrollToEl) {
      const dest = scrollToEl.offsetTop + offset;
      if (onlyIfBellow && window.scrollY < dest) return;
      console.log(dest, scrollToEl);
      scrollSmooth(dest);
    }
  }
}
