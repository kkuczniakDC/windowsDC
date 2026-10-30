/** ScrollSmoother `data-speed` hints for homepage sections (effects mode). */
export const homeSectionEffects = {
  hero: { speed: 0.92 },
  thesis: { speed: 0.96 },
  systems: { speed: 1 },
  approach: undefined,
  performance: { speed: 0.97 },
  collaboration: { speed: 0.98 },
  atmospheres: { speed: 0.95 },
  finalCta: { speed: 1 },
} as const;

export type HomeSectionEffectKey = keyof typeof homeSectionEffects;

export function homeSectionEffectProps(key: HomeSectionEffectKey) {
  const config = homeSectionEffects[key];

  if (!config?.speed) {
    return {};
  }

  return { "data-speed": String(config.speed) } as const;
}
