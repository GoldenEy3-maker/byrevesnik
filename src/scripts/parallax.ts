import { gsap } from "gsap";

export class ImageParallax {
  constructor() {
    this.init();
  }

  init() {
    gsap.utils
      .toArray<HTMLDivElement>(".image-parallax")
      .forEach((container) => {
        const img = container.querySelector<HTMLImageElement>("img");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            scrub: true,
            pin: false,
          },
        });

        tl.fromTo(
          img,
          {
            yPercent: -15,
            ease: "none",
          },
          {
            yPercent: 15,
            ease: "none",
          },
        );
      });
  }
}
