import type { StaticImageData } from "next/image";

import benAshby from "../../../assets/ben-ashby-0jUEk_11na8-unsplash.jpg";
import bundoKim from "../../../assets/bundo-kim-MmagnTelMyo-unsplash.jpg";
import deVontez from "../../../assets/de-vontez-cox-obHGJUwzJsA-unsplash.jpg";
import ejLi from "../../../assets/ej-li-afZTFY94vv0-unsplash.jpg";
import greysonGrowth from "../../../assets/greyson-growth-yRcRrCIqxtw-unsplash.jpg";
import maximScheglov from "../../../assets/maxim-scheglov-TMauUlE9PxE-unsplash.jpg";
import miguelLuis from "../../../assets/miguel-luis-r6uVcUq0I8E-unsplash.jpg";
import naomiAugust from "../../../assets/naomi-august-a14NxeTfMXE-unsplash.jpg";
import slidingDoorDark from "../../../assets/sliding-door-dark-unsplash.jpg";
import sunsetWindow from "../../../assets/sunset-window-unsplash.jpg";
import yaelYanez from "../../../assets/yael-yanez-Uuz7lCQWpyo-unsplash.jpg";
import zhishengDeng from "../../../assets/zhisheng-deng-W8FPl06Q4F4-unsplash.jpg";

import type { MediaCatalogItem } from "./types";

export type ImageMediaEntry = MediaCatalogItem & {
  kind: "image";
  image: StaticImageData;
  width: number;
  height: number;
};

export type MetadataMediaEntry = MediaCatalogItem & {
  kind: "metadata-only";
};

export type MediaEntry = ImageMediaEntry | MetadataMediaEntry;

const CAPTION = "Visual reference · demo placeholder";

function imageEntry(
  id: string,
  filename: string,
  image: StaticImageData,
): ImageMediaEntry {
  return {
    id,
    filename,
    caption: CAPTION,
    kind: "image",
    image,
    width: image.width,
    height: image.height,
  };
}

export const mediaCatalog: MediaEntry[] = [
  imageEntry("sliding-door-dark", "sliding-door-dark-unsplash.jpg", slidingDoorDark),
  imageEntry("yael-yanez", "yael-yanez-Uuz7lCQWpyo-unsplash.jpg", yaelYanez),
  imageEntry("ej-li", "ej-li-afZTFY94vv0-unsplash.jpg", ejLi),
  imageEntry(
    "maxim-scheglov",
    "maxim-scheglov-TMauUlE9PxE-unsplash.jpg",
    maximScheglov,
  ),
  imageEntry(
    "de-vontez-cox",
    "de-vontez-cox-obHGJUwzJsA-unsplash.jpg",
    deVontez,
  ),
  imageEntry("ben-ashby", "ben-ashby-0jUEk_11na8-unsplash.jpg", benAshby),
  imageEntry("sunset-window", "sunset-window-unsplash.jpg", sunsetWindow),
  imageEntry("bundo-kim", "bundo-kim-MmagnTelMyo-unsplash.jpg", bundoKim),
  imageEntry("zhisheng-deng", "zhisheng-deng-W8FPl06Q4F4-unsplash.jpg", zhishengDeng),
  imageEntry("naomi-august", "naomi-august-a14NxeTfMXE-unsplash.jpg", naomiAugust),
  imageEntry(
    "greyson-growth",
    "greyson-growth-yRcRrCIqxtw-unsplash.jpg",
    greysonGrowth,
  ),
  imageEntry(
    "miguel-luis",
    "miguel-luis-r6uVcUq0I8E-unsplash.jpg",
    miguelLuis,
  ),
  {
    id: "heng-chiu",
    filename: "heng-chiu-O0-nO2ipXAg-unsplash.jpg",
    caption: CAPTION,
    kind: "metadata-only",
    note: "~13.4 MB · not loaded in preview",
  },
  {
    id: "living-room-video",
    filename:
      "living-room-with-light-streaming-in-through-the-window-uhd_3840_2160_30fps.mp4",
    caption: CAPTION,
    kind: "metadata-only",
    note: "~32.7 MB · 3840×2160 · not loaded in preview",
  },
  {
    id: "curtains-portrait-video",
    filename:
      "woman-pulls-back-curtains-revealing-a-window-uhd_2160_3840_30fps.mp4",
    caption: CAPTION,
    kind: "metadata-only",
    note: "~18.2 MB · not loaded in preview",
  },
  {
    id: "curtains-morning-video",
    filename:
      "woman-pulls-back-curtains-and-looking-out-the-window-in-the-morning-uhd_2560_1080_25fps.mp4",
    caption: CAPTION,
    kind: "metadata-only",
    note: "~10.5 MB · not loaded in preview",
  },
  {
    id: "flowers-window-video",
    filename:
      "flowers-on-which-light-from-the-window-falls-hd_1080_1920_30fps.mp4",
    caption: CAPTION,
    kind: "metadata-only",
    note: "~5.3 MB · not loaded in preview",
  },
];

export function getMediaById(id: string): MediaEntry | undefined {
  return mediaCatalog.find((item) => item.id === id);
}

export function getInitialMediaOrder(): string[] {
  return mediaCatalog.map((item) => item.id);
}
