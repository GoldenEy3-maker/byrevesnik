import Swiper from "swiper";

export class BenefitsSlider {
  constructor() {
    this.init();
  }

  init() {
    new Swiper("[data-benefits-slider]", {
      slidesPerView: "auto",
      navigation: {
        prevEl: ".benefits-slider-prev",
        nextEl: ".benefits-slider-next",
      },
      speed: 800,
    });
  }
}
