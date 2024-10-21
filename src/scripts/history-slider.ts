import Swiper from "swiper/bundle";

export function initHistorySlider() {
  const interleaveOffset = 0.5;

  const historySwiperText = new Swiper("[data-history-swiper-text]", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    autoHeight: true,
    effect: "creative",
    creativeEffect: {
      prev: {
        opacity: 0,
        translate: [0, 0, -400],
      },
      next: {
        opacity: 1,
        translate: ["102%", 0, 0],
      },
    },
    speed: 600,
  });
  const historySwiperImg = new Swiper("[data-history-swiper-img]", {
    speed: 600,
    slidesPerView: 1,
    watchSlidesProgress: true,
    on: {
      progress: (swiper) => {
        for (let i = 0; i < swiper.slides.length; i++) {
          // @ts-expect-error progress preperty doest exist in HTMLElement
          const slideProgress = swiper.slides[i].progress;
          const innerOffset = swiper.width * interleaveOffset;
          const innerTranslate = slideProgress * innerOffset;
          const inner = swiper.slides[i].querySelector(
            ".slide-inner"
          ) as HTMLElement;
          if (inner)
            inner.style.transform =
              "translate3d(" + innerTranslate + "px, 0, 0)";
        }
      },
      touchStart: (swiper) => {
        for (let i = 0; i < swiper.slides.length; i++) {
          swiper.slides[i].style.transition = "";
        }
      },
      setTransition: (swiper, speed) => {
        for (let i = 0; i < swiper.slides.length; i++) {
          swiper.slides[i].style.transition = speed + "ms";
          const inner = swiper.slides[i].querySelector(
            ".slide-inner"
          ) as HTMLElement;
          if (inner) inner.style.transition = speed + "ms";
        }
      },
    },
  });

  historySwiperText.controller.control = historySwiperImg;
  historySwiperImg.controller.control = historySwiperText;
}
