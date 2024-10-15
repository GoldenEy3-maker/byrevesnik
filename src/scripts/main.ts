import Swiper from "swiper/bundle";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis();

lenis.on("scroll", (e) => {
  // console.log(e);
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

const navLinks = document.querySelectorAll("[data-nav-link]");

if (navLinks.length)
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const url = new URL((link as HTMLAnchorElement).href);
      const section = document.getElementById(url.hash.replace("#", ""));
      if (section)
        lenis.scrollTo(section, {
          offset: -140,
        });
    });
  });

const historySwiperText = new Swiper("[data-history-swiper-text]", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  speed: 600,
});
const historySwiperImg = new Swiper("[data-history-swiper-img]", {
  speed: 600,
});

historySwiperText.controller.control = historySwiperImg;
historySwiperImg.controller.control = historySwiperText;

function heroAnimation() {
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
}

heroAnimation();

const queueList = document.getElementById("queue-list");
let queueListWidth = 0;

if (queueList) {
  for (let i = 1; i < queueList.children.length; i++) {
    const item = queueList.children.item(i);
    if (item) {
      queueListWidth += (item as HTMLElement).offsetWidth;
    }
  }

  function queueAnimation() {
    const runAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#queue-container",
        start: "top 25%",
        end: `+=${queueListWidth}`,
        scrub: true,
        pin: true,
      },
    });

    runAnimation.add([
      gsap.to("#queue-list", {
        x: `-${queueListWidth}`,
        duration: 2,
      }),
    ]);
  }

  queueAnimation();
}
