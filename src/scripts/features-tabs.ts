import { eventBus } from "./events";

export class FeaturesTabsView {
  activeIndex: number = 0;
  triggers: NodeListOf<HTMLElement> | null = null;
  contents: NodeListOf<HTMLElement> | null = null;

  constructor() {
    this.triggers = document.querySelectorAll<HTMLElement>(
      "[data-features-tabs-trigger]",
    );
    this.contents = document.querySelectorAll<HTMLElement>(
      "[data-features-tabs-content]",
    );
    this.init();
  }

  init() {
    eventBus.on("features-tabs:changed", (i) => {
      if (i !== this.activeIndex) this.update(i);
    });
  }

  update(index: number) {
    this.triggers?.[index].setAttribute("aria-current", "true");
    this.triggers?.[this.activeIndex].setAttribute("aria-current", "false");
    this.contents?.[index].setAttribute("aria-hidden", "false");
    this.contents?.[this.activeIndex].setAttribute("aria-hidden", "true");
    this.activeIndex = index;
  }
}
