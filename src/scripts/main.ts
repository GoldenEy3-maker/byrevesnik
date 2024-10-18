import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Lenis from "lenis";
import { initFirstGsapSection, initSecondGsapSection } from "./gsap-sections";
import { initHistorySlider } from "./history-slider";
import { initContactsMap } from "./contacts-map";
import { initTelMask } from "./tel-mask";
import { handleSubmitForm } from "./forms";

gsap.registerPlugin(ScrollTrigger);

// const lenis = new Lenis();

// lenis.on("scroll", (e) => {
//   // console.log(e);
// });

// lenis.on("scroll", ScrollTrigger.update);

// gsap.ticker.add((time) => {
//   lenis.raf(time * 1000);
// });

// gsap.ticker.lagSmoothing(0);

const navLinks = document.querySelectorAll("[data-nav-link]");

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
initFirstGsapSection();
initSecondGsapSection();
initTelMask();
initContactsMap();

document.addEventListener("submit", handleSubmitForm);
