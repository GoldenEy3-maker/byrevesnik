import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initFirstGsapSection, initSecondGsapSection } from "./gsap-sections";
import { initHistorySlider } from "./history-slider";
import { initContactsMap } from "./contacts-map";
import { initTelMask } from "./tel-mask";
import { handleSubmitForm } from "./forms";
import { openModal } from "./modals";
import { lenis } from "./lenis";

gsap.registerPlugin(ScrollTrigger);

if (window.location.hash) {
  lenis.scrollTo(window.location.hash);
}

const navLinks = document.querySelectorAll("[data-nav-link]");

if (navLinks.length)
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const openedBurger = document.querySelector("[data-modal-root=burger]");
      if (openedBurger && link.getAttribute("data-modal-close")) return;

      event.preventDefault();
      const url = new URL((link as HTMLAnchorElement).href);
      lenis.scrollTo(url.hash, {
        offset: -50,
      });
    });
  });

initHistorySlider();
initFirstGsapSection();
initSecondGsapSection();
initTelMask();
initContactsMap();

document.addEventListener("click", (event) => {
  const modalTrigger = (event.target as HTMLElement).closest(
    "[data-modal-trigger]"
  ) as HTMLElement | null;

  if (modalTrigger)
    openModal(modalTrigger.getAttribute("data-modal-trigger")!, modalTrigger);
});

document.addEventListener("submit", handleSubmitForm);
