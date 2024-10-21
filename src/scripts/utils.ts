import { lenis } from "./lenis";

export function lockScroll() {
  document.body.style.setProperty(
    "--scrollbar-width",
    window.innerWidth - document.body.offsetWidth + "px"
  );
  document.body.classList.add("lock-scroll");
  lenis.stop();
}

export function unlockScroll(delay: number = 0) {
  setTimeout(() => {
    document.body.classList.remove("lock-scroll");
    lenis.start();
  }, delay);
}
