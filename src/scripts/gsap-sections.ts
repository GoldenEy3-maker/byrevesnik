import gsap from "gsap";

export function initGsapSections() {
  const runHeroContainerAnimation = gsap.timeline({
    scrollTrigger: {
      trigger: "#hero-container",
      start: "top top",
      end: "max",
      scrub: true,
      pin: true,
    },
  });

  runHeroContainerAnimation
    .add([
      gsap.to("#hero-text", {
        y: -100,
        opacity: 0,
        duration: 1,
      }),
      gsap.to("#hero-first-layer", {
        y: -500,
        duration: 2,
      }),
      gsap.to("#hero-second-layer", {
        y: -500,
        duration: 2,
      }),
      gsap.to("#hero-address", {
        opacity: 1,
        duration: 2,
        delay: 0.5,
      }),
    ])
    .add([
      gsap.to("#hero-title", {
        opacity: 0,
        duration: 1,
      }),
      gsap.to("#hero-first-layer", {
        width: "100%",
        height: "90vh",
        y: -700,
        duration: 2,
      }),
      gsap.to("#hero-second-layer", {
        width: "100%",
        height: "90vh",
        y: -700,
        duration: 2,
      }),
      gsap.to("#hero-address", {
        opacity: 0,
        duration: 1,
      }),
    ]);

  // const runQueueContainerAnimation = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: "#queue-container",
  //     start: "top 25%",
  //     end: `+=2000`,
  //     scrub: true,
  //     pin: true,
  //   },
  // });

  // runQueueContainerAnimation.add([
  //   gsap.to("#queue-list", {
  //     x: `-100%`,
  //     duration: 2,
  //   }),
  // ]);
}
