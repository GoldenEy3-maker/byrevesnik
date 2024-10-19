import Swiper from "swiper/bundle";

export function initHistorySlider() {
  const historySwiperText = new Swiper("[data-history-swiper-text]", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
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
  });

  historySwiperText.controller.control = historySwiperImg;
  historySwiperImg.controller.control = historySwiperText;
}
