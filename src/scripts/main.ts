import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initFirstGsapSection, initSecondGsapSection } from "./gsap-sections";
import { initHistorySlider } from "./history-slider";
import { initContactsMap } from "./contacts-map";
import { initTelMask } from "./tel-mask";
import { handleSubmitForm } from "./forms";
import { openModal } from "./modals";
import { lenis } from "./lenis";
import { eventBus } from "./events";
import { FeaturesTabsView } from "./features-tabs";
import { ImageParallax } from "./parallax";
import { ViewAnimation } from "./view-animation";
import { BenefitsSlider } from "./benefits-slider";

gsap.registerPlugin(ScrollTrigger);

if (window.location.hash) lenis.scrollTo(window.location.hash);

initHistorySlider();
initFirstGsapSection();
initSecondGsapSection();
initTelMask();
initContactsMap();

new FeaturesTabsView();
new ImageParallax();
new ViewAnimation();
new BenefitsSlider();

document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;

  const modalTrigger = target.closest(
    "[data-modal-trigger]",
  ) as HTMLElement | null;
  const navLink = target.closest("[data-nav-link]") as HTMLAnchorElement | null;
  const featuresTabTrigger = target.closest(
    "[data-features-tabs-trigger]",
  ) as HTMLButtonElement | null;

  if (modalTrigger)
    openModal(modalTrigger.getAttribute("data-modal-trigger")!, modalTrigger);

  if (navLink) {
    event.preventDefault();
    const url = new URL(navLink.href);
    lenis.scrollTo(url.hash, {
      offset: -50,
    });
  }

  if (featuresTabTrigger)
    eventBus.emit(
      "features-tabs:changed",
      parseInt(
        featuresTabTrigger.getAttribute("data-features-tabs-trigger") ?? "",
      ),
    );
});

document.addEventListener("submit", handleSubmitForm);
