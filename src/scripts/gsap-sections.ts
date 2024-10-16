import gsap from "gsap";

export function initGsapSections() {
  const runAnimation = gsap.timeline({
    scrollTrigger: {
      trigger: "#hero-container",
      start: "top 21%",
      end: "+=2000",
      scrub: true,
      pin: true,
    },
  });

  runAnimation
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
        height: 800,
        y: -650,
        duration: 2,
      }),
      gsap.to("#hero-second-layer", {
        width: "100%",
        height: 800,
        y: -650,
        duration: 2,
      }),
      gsap.to("#hero-address", {
        opacity: 0,
        duration: 1,
      }),
    ]);

  const queueList = document.getElementById("queue-list");

  if (queueList) {
    const runAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#queue-container",
        start: "top 25%",
        end: `+=${queueList?.offsetWidth}`,
        scrub: true,
        pin: true,
      },
    });

    runAnimation.add([
      gsap.to("#queue-list", {
        x: `-${queueList?.offsetWidth}`,
        duration: 2,
      }),
    ]);
  }
}
