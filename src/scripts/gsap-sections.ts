import { gsap } from "gsap";

export function initFirstGsapSection() {
  const mm = gsap.matchMedia();

  const BreakpointsMap = {
    XL6: "(min-width: 1440px)",
    XL5: "(min-width: 1380px) and (max-width: 1440px)",
    XL4: "(min-width: 1280px) and (max-width: 1380px)",
    XL3: "(min-width: 1180px) and (max-width: 1280px)",
    XL2: "(min-width: 1080px) and (max-width: 1180px)",
    XL: "(min-width: 980px) and (max-width: 1080px)",
    MD3: "(min-width: 880px) and (max-width: 980px)",
    MD2: "(min-width: 780px) and (max-width: 880px)",
    MD: "(min-width: 680px) and (max-width: 780px)",
  } as const;

  type BreakpointsMap = (typeof BreakpointsMap)[keyof typeof BreakpointsMap];

  const AnimationValuesMap: Record<
    keyof typeof BreakpointsMap,
    {
      firstStep: {
        heroFirstLayer: { yPercent: number };
        heroSecondLayer: { yPercent: number };
      };
      secondStep: {
        heroFirstLayer: {
          height: string;
          yPercent: number;
        };
        heroSecondLayer: {
          height: string;
          yPercent: number;
        };
      };
    }
  > = {
    XL6: {
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
          yPercent: -72,
          height: "+=160",
        },
        heroSecondLayer: {
          yPercent: -72,
          height: "+=160",
        },
      },
    },
    XL5: {
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
          height: "+=100",
        },
        heroSecondLayer: {
          yPercent: -75,
          height: "+=100",
        },
      },
    },
    XL4: {
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
          yPercent: -72,
          height: "+=100",
        },
        heroSecondLayer: {
          yPercent: -72,
          height: "+=100",
        },
      },
    },
    XL3: {
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
          yPercent: -68,
          height: "+=100",
        },
        heroSecondLayer: {
          yPercent: -68,
          height: "+=100",
        },
      },
    },
    XL2: {
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
          yPercent: -64,
          height: "+=110",
        },
        heroSecondLayer: {
          yPercent: -64,
          height: "+=110",
        },
      },
    },
    XL: {
      firstStep: {
        heroFirstLayer: {
          yPercent: -50,
        },
        heroSecondLayer: {
          yPercent: -50,
        },
      },
      secondStep: {
        heroFirstLayer: {
          yPercent: -64,
          height: "+=60",
        },
        heroSecondLayer: {
          yPercent: -64,
          height: "+=60",
        },
      },
    },
    MD3: {
      firstStep: {
        heroFirstLayer: {
          yPercent: -50,
        },
        heroSecondLayer: {
          yPercent: -50,
        },
      },
      secondStep: {
        heroFirstLayer: {
          yPercent: -62,
          height: "+=40",
        },
        heroSecondLayer: {
          yPercent: -62,
          height: "+=40",
        },
      },
    },
    MD2: {
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
          yPercent: -58,
          height: "+=40",
        },
        heroSecondLayer: {
          yPercent: -58,
          height: "+=40",
        },
      },
    },
    MD: {
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
          yPercent: -52,
          height: "+=50",
        },
        heroSecondLayer: {
          yPercent: -52,
          height: "+=50",
        },
      },
    },
  };

  function getActiveConditionKey(conditions: gsap.Conditions) {
    let result: keyof typeof BreakpointsMap | undefined = undefined;

    for (const [key, value] of Object.entries(conditions)) {
      if (value === true) {
        result = key as keyof typeof BreakpointsMap;
        break;
      }
    }

    return result;
  }

  mm.add(BreakpointsMap, (context) => {
    if (!context.conditions) return;

    const activeCondition = getActiveConditionKey(context.conditions);

    if (!activeCondition) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero-container",
        start: "top top",
        end: "bottom top",
        pin: true,
        scrub: true,
      },
    });

    tl.add([
      gsap.to("#hero-text", {
        yPercent: -50,
        opacity: 0,
      }),
      gsap.to("#hero-first-layer", {
        yPercent:
          AnimationValuesMap[activeCondition].firstStep.heroFirstLayer.yPercent,
      }),
      gsap.to("#hero-second-layer", {
        yPercent:
          AnimationValuesMap[activeCondition].firstStep.heroSecondLayer
            .yPercent,
      }),
      gsap.to("#hero-address", {
        opacity: 1,
      }),
    ]).add([
      gsap.to("#hero-title", {
        opacity: 0,
      }),
      gsap.fromTo(
        "#hero-first-layer",
        {
          maxWidth: "670px",
        },
        {
          maxWidth: "100%",
          height:
            AnimationValuesMap[activeCondition].secondStep.heroFirstLayer
              .height,
          yPercent:
            AnimationValuesMap[activeCondition].secondStep.heroFirstLayer
              .yPercent,
        }
      ),
      gsap.fromTo(
        "#hero-second-layer",
        {
          maxWidth: "670px",
        },
        {
          maxWidth: "100%",
          height:
            AnimationValuesMap[activeCondition].secondStep.heroSecondLayer
              .height,
          yPercent:
            AnimationValuesMap[activeCondition].secondStep.heroSecondLayer
              .yPercent,
        }
      ),
      gsap.to("#hero-address", {
        opacity: 0,
      }),
    ]);
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
