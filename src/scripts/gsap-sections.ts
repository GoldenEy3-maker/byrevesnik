import { gsap } from "gsap";

export function initFirstGsapSection() {
  const BreakpointsMap = {
    XL2: "(max-width: 1340px)",
    XL: "(max-width: 1200px)",
    MD2: "(max-width: 991px)",
    MD: "(max-width: 768px)",
    SM2: "(max-width: 640px)",
    SM: "(max-width: 425px)",
  };

  const mediaAnimationValuesMap = {
    DEFAULT: {
      firstStep: {
        heroFirstLayer: {
          yPercent: -60,
        },
        heroSecondLayer: {
          yPercent: -60,
        },
      },
      secondStep: {
        heroFirstLayer: {
          yPercent: -80,
          height: "+=30",
        },
        heroSecondLayer: {
          yPercent: -80,
          height: "+=30",
        },
      },
    },
    [BreakpointsMap.XL2]: {
      firstStep: {
        heroFirstLayer: {
          yPercent: -60,
        },
        heroSecondLayer: {
          yPercent: -60,
        },
      },
      secondStep: {
        heroFirstLayer: {
          yPercent: -75,
          height: "+=30",
        },
        heroSecondLayer: {
          yPercent: -75,
          height: "+=30",
        },
      },
    },
    [BreakpointsMap.XL]: {
      firstStep: {
        heroFirstLayer: {
          yPercent: -45,
        },
        heroSecondLayer: {
          yPercent: -45,
        },
      },
      secondStep: {
        heroFirstLayer: {
          yPercent: -65,
          height: "+=30",
        },
        heroSecondLayer: {
          yPercent: -65,
          height: "+=30",
        },
      },
    },
    [BreakpointsMap.MD2]: {
      firstStep: {
        heroFirstLayer: {
          yPercent: -45,
        },
        heroSecondLayer: {
          yPercent: -45,
        },
      },
      secondStep: {
        heroFirstLayer: {
          yPercent: -55,
          height: "+=30",
        },
        heroSecondLayer: {
          yPercent: -55,
          height: "+=30",
        },
      },
    },
    [BreakpointsMap.MD]: {
      firstStep: {
        heroFirstLayer: {
          yPercent: -40,
        },
        heroSecondLayer: {
          yPercent: -40,
        },
      },
      secondStep: {
        heroFirstLayer: {
          yPercent: -45,
          height: "+=30",
        },
        heroSecondLayer: {
          yPercent: -45,
          height: "+=30",
        },
      },
    },
    [BreakpointsMap.SM2]: {
      firstStep: {
        heroFirstLayer: {
          yPercent: -40,
        },
        heroSecondLayer: {
          yPercent: -40,
        },
      },
      secondStep: {
        heroFirstLayer: {
          yPercent: -45,
          height: "+=20",
        },
        heroSecondLayer: {
          yPercent: -45,
          height: "+=20",
        },
      },
    },
    [BreakpointsMap.SM]: {
      firstStep: {
        heroFirstLayer: {
          yPercent: -40,
        },
        heroSecondLayer: {
          yPercent: -40,
        },
      },
      secondStep: {
        heroFirstLayer: {
          yPercent: -50,
          height: "+=20",
        },
        heroSecondLayer: {
          yPercent: -50,
          height: "+=20",
        },
      },
    },
  };

  const mediaQueryList = Object.values(BreakpointsMap).map((query) =>
    window.matchMedia(query)
  );

  function getMatchedMedia() {
    return mediaQueryList.filter((mq) => mq.matches).at(-1);
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#hero-container",
      start: "top top",
      end: "bottom top",
      pin: true,
      scrub: true,
    },
  });

  initAnimation(getMatchedMedia()?.media ?? "DEFAULT");

  function initAnimation(mqKey: string) {
    tl.add([
      gsap.to("#hero-text", {
        yPercent: -50,
        opacity: 0,
      }),
      gsap.to("#hero-first-layer", {
        yPercent:
          mediaAnimationValuesMap[mqKey].firstStep.heroFirstLayer.yPercent,
      }),
      gsap.to("#hero-second-layer", {
        yPercent:
          mediaAnimationValuesMap[mqKey].firstStep.heroSecondLayer.yPercent,
      }),
      gsap.to("#hero-address", {
        opacity: 1,
      }),
    ]).add([
      gsap.to("#hero-title", {
        opacity: 0,
      }),
      gsap.to("#hero-first-layer", {
        maxWidth: "100%",
        width: "100%",
        height: mediaAnimationValuesMap[mqKey].secondStep.heroFirstLayer.height,
        yPercent:
          mediaAnimationValuesMap[mqKey].secondStep.heroFirstLayer.yPercent,
      }),
      gsap.to("#hero-second-layer", {
        maxWidth: "100%",
        width: "100%",
        height:
          mediaAnimationValuesMap[mqKey].secondStep.heroSecondLayer.height,
        yPercent:
          mediaAnimationValuesMap[mqKey].secondStep.heroFirstLayer.yPercent,
      }),
      gsap.to("#hero-address", {
        opacity: 0,
      }),
    ]);

    return tl;
  }

  mediaQueryList.forEach((mq) => {
    mq.addEventListener("change", (changedMq) => {
      initAnimation(changedMq.media);
      tl.invalidate();
    });
  });
}

export function initSecondGsapSection() {
  let tl: GSAPTimeline;
  const workingAnimationMq = window.matchMedia("(min-width: 768px)");

  const list = document.querySelector("#queue-list");

  function initAnimation(mq: MediaQueryList) {
    if (mq.matches) {
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#queue-container",
          start: "top 30%",
          end: "bottom top",
          pin: true,
          scrub: true,
        },
      });

      tl.add([
        gsap.to("#queue-list", {
          x: () => -(list?.children.item(0) as HTMLElement).offsetWidth / 1.5,
          duration: 2,
        }),
      ]);
    } else {
      if (tl) tl.kill();
    }
  }

  initAnimation(workingAnimationMq);

  workingAnimationMq.addEventListener("change", function () {
    initAnimation(this);
  });
}
