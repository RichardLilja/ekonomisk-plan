export function disableBodyScroll() {
  if (!window || !document) return 0;

  const html = document.querySelector("html");
  const body = document.querySelector("body");

  if (!html || !body) return 0;

  const scrollPosition = window.scrollY;

  html.style.setProperty("scrollBehavior", "unset");

  body.style.setProperty("position", "fixed");
  body.style.setProperty("top", `-${scrollPosition}px`);

  return scrollPosition;
}

export function enableBodyScroll(scrollPosition: number) {
  if (!window || !document) return 0;

  const html = document.querySelector("html");
  const body = document.querySelector("body");

  if (!html || !body) return 0;

  body.style.setProperty("position", "");
  body.style.setProperty("top", "");

  window.scrollTo(0, scrollPosition);

  html.style.setProperty("scrollBehavior", "smooth");
}
