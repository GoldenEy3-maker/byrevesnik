import Swiper from "swiper/bundle";

let historySwiperText: Swiper, historySwiperImg: Swiper;

historySwiperText = new Swiper(".history-swiper-text", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
historySwiperImg = new Swiper(".history-swiper-img", {});

historySwiperText.controller.control = historySwiperImg;
historySwiperImg.controller.control = historySwiperText;
