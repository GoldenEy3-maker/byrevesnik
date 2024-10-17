import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Lenis from "lenis";
import { initGsapSections } from "./gsap-sections";
import { initHistorySlider } from "./history-slider";
import { initContactsMap } from "./contacts-map";
import { initTelMask } from "./tel-mask";
import { handleSubmitForm } from "./forms";

gsap.registerPlugin(ScrollTrigger);

// const navLinks = document.querySelectorAll("[data-nav-link]");

// if (navLinks.length)
//   navLinks.forEach((link) => {
//     link.addEventListener("click", (event) => {
//       event.preventDefault();
//       const url = new URL((link as HTMLAnchorElement).href);
//       const section = document.getElementById(url.hash.replace("#", ""));
//       if (section)
//         lenis.scrollTo(section, {
//           offset: -140,
//         });
//     });
//   });

initHistorySlider();
initGsapSections();
initTelMask();
initContactsMap();

document.addEventListener("submit", handleSubmitForm);
