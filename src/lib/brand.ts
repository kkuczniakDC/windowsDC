/**
 * Central brand configuration — swap values here as the real brand is finalized.
 * `workingName` is an explicit temporary label, not final marketing copy.
 */
export const brandConfig = {
  workingName: "Southern Windows",
  isWorkingNameTemporary: true,
  copyrightYear: 2026,
  description:
    "Architectural windows, doors and glazing systems shaped around light, comfort and lasting detail.",
  contact: {
    email: null as string | null,
    phone: null as string | null,
  },
} as const;

export const routes = {
  home: "/",
  about: "/about",
  architects: "/architects",
  consultation: "/consultation",
  privacy: "/privacy",
  windows: "/windows",
  slidingDoors: "/sliding-doors",
  entranceDoors: "/entrance-doors",
  architecturalGlazing: "/architectural-glazing",
} as const;
