import ymaps3, { YMapLocationRequest } from "@yandex/ymaps3-types";
import YMAPS_THEME from "./ymaps-theme.json";

export async function initContactsMap() {
  const contactsMapContainer = document.getElementById("contacts-map");

  if (contactsMapContainer) {
    await ymaps3.ready;

    const LOCATION: YMapLocationRequest = {
      center: [83.79308867918458, 53.33885042164052],
      zoom: 16,
    };

    const {
      YMap,
      YMapDefaultSchemeLayer,
      YMapDefaultFeaturesLayer,
      YMapMarker,
      YMapControls,
    } = ymaps3;

    const { YMapZoomControl } = await ymaps3.import(
      "@yandex/ymaps3-controls@0.0.1"
    );

    const controls = new YMapControls(
      {
        position: "right",
        orientation: "vertical",
      },
      [new YMapZoomControl({})]
    );

    const imgMarker = document.createElement("img");
    imgMarker.style.width = "46px";
    imgMarker.style.height = "46px";
    imgMarker.style.maxWidth = "none";
    imgMarker.style.position = "relative";
    imgMarker.style.left = "-23px";
    imgMarker.style.top = "-23px";
    imgMarker.src = "assets/img/map-marker.webp";

    const marker = new YMapMarker(
      {
        coordinates: [83.79308867918458, 53.33885042164052],
      },
      imgMarker
    );

    new YMap(
      contactsMapContainer,
      {
        location: LOCATION,
      },
      [
        new YMapDefaultSchemeLayer({
          // @ts-expect-error
          customization: YMAPS_THEME,
        }),
        new YMapDefaultFeaturesLayer({}),
        controls,
        marker,
      ]
    );
  }
}
