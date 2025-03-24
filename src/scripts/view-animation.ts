import { gsap } from "gsap";

export class ViewAnimation {
  spanLines: NodeListOf<HTMLSpanElement>;
  viewAnimElements: NodeListOf<HTMLElement>;

  constructor() {
    this.spanLines = document.querySelectorAll<HTMLSpanElement>(".line-inner");
    this.viewAnimElements =
      document.querySelectorAll<HTMLElement>(".view-animation");

    this.init();
  }

  init() {
    this.spanLines.forEach((target) =>
      this.observeSpanInner(target, this.getDelay(target)),
    );
    this.viewAnimElements.forEach((target) =>
      this.observerViewElements(target, this.getDelay(target, "0.2")),
    );
  }

  getDelay(target: HTMLElement, fallback: string = "0") {
    return parseFloat(target.getAttribute("data-delay") || fallback);
  }

  observeSpanInner(target: HTMLElement, delay: number) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.to(entry.target, {
            y: "-2%",
            delay: delay,
            duration: 0.8,
          });
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(target);
  }

  observerViewElements(target: HTMLElement, delay: number) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.from(entry.target, {
            y: "2em",
            opacity: 0,
            duration: 0.8,
            delay: delay,
          });
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(target);
  }
}
