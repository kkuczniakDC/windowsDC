import { routes } from "@/lib/brand";

export const categoryIds = [
  "windows",
  "sliding-doors",
  "entrance-doors",
  "architectural-glazing",
] as const;

export type CategoryId = (typeof categoryIds)[number];

export type CategoryFamily = {
  id: string;
  title: string;
  summary: string;
  characteristics: string[];
  configurations: string[];
  detailHref?: string;
};

export type CategoryDetail = {
  title: string;
  body: string;
};

export type CategoryContent = {
  id: CategoryId;
  href: (typeof routes)[keyof typeof routes];
  title: string;
  navSummary: string;
  metadataDescription: string;
  eyebrow: string;
  heroTitle: string;
  heroLede: string;
  thesisEyebrow: string;
  thesisTitle: string;
  thesisBody: string[];
  familiesEyebrow: string;
  familiesTitle: string;
  familiesIntro: string;
  families: CategoryFamily[];
  detailsEyebrow: string;
  detailsTitle: string;
  detailsIntro: string;
  details: CategoryDetail[];
  detailsNote: string;
  inspirationEyebrow: string;
  inspirationTitle: string;
  inspirationBody: string;
  inspirationCaption: string;
  ctaEyebrow: string;
  ctaTitle: string;
  ctaBody: string;
};

const windows: CategoryContent = {
  id: "windows",
  href: routes.windows,
  title: "Windows",
  navSummary: "Disciplined sightlines for measured daylight and ventilation.",
  metadataDescription:
    "Aluminium and timber windows composed as casement, tilt and turn, or weighted sash—each opening held to the elevation.",
  eyebrow: "01 / Windows",
  heroTitle: "Proportion, held in the frame.",
  heroLede:
    "Aluminium and timber windows, composed as casement, tilt and turn, or weighted sash—each opening held to the elevation.",
  thesisEyebrow: "The language",
  thesisTitle: "Material, then the way it opens.",
  thesisBody: [
    "A window is a line in the façade before it is a product. The range splits by material and by opening, so a new light, a replacement, or a conservation elevation can stay in one architectural language.",
    "Aluminium reads slim and contemporary. Timber carries period bar patterns, dual colour and the quieter work of conservation. Neither is treated as an extra applied to the wall.",
  ],
  familiesEyebrow: "Families",
  familiesTitle: "Five ways to hold the light.",
  familiesIntro:
    "Hinged casement, tilt and turn, hidden sash, and weighted vertical sliding. Descriptive names only—final product naming remains open.",
  families: [
    {
      id: "aluminium-casement",
      title: "Aluminium Casement Windows",
      summary:
        "Outward-opening aluminium casements for new work, extensions and replacement, including fixed lights, shaped units and bays.",
      characteristics: [
        "Aluminium with a thermal break",
        "Powder-coated or anodised finishes",
        "Dual colour available",
      ],
      configurations: [
        "Top-hung",
        "Side-hung",
        "Fixed lights",
        "Shaped units",
        "Bays",
      ],
    },
    {
      id: "timber-casement",
      title: "Timber Casement Windows",
      summary:
        "Flush engineered-timber casements, made to order, with a choice of frame profiles, glazing bars and hardware.",
      characteristics: [
        "Clear-grade engineered timber",
        "Factory-applied micro-porous finish",
        "Stains and dual colour",
      ],
      configurations: [
        "Georgian",
        "Leaded",
        "Traditional",
        "Contemporary bar patterns",
      ],
    },
    {
      id: "tilt-and-turn",
      title: "Tilt & Turn Windows",
      summary:
        "Aluminium tilt and turn for inward ventilation and a full opening, with concealed or visible fittings.",
      characteristics: [
        "Thermally broken aluminium",
        "Concealed, manual or electromechanical fittings",
        "Dual colour, anodised or coated finishes",
      ],
      configurations: [
        "Tilt and turn",
        "Top-hung",
        "Side-hung",
        "Bottom-hung",
      ],
    },
    {
      id: "hidden-sash",
      title: "Hidden Sash Windows",
      summary:
        "A contemporary aluminium tilt and turn whose hidden sash is meant to read as a fixed light from outside, so opening and fixed lights sit in one plane.",
      characteristics: [
        "Hidden sash",
        "Concealed handle and gearing",
        "Fixed-light appearance from outside",
      ],
      configurations: [
        "Inward tilt and turn",
        "Side-hung",
        "Bottom-hung",
      ],
    },
    {
      id: "timber-sash",
      title: "Timber Sash Windows",
      summary:
        "Vertical sliding sashes, balanced with cords, weights and pulleys in a boxed liner, for conservation elevations and new work.",
      characteristics: [
        "Engineered timber",
        "Cord, weight and pulley balance",
        "Dual colour and stains",
      ],
      configurations: ["Georgian", "Victorian", "Cottage", "Modern bar patterns"],
    },
  ],
  detailsEyebrow: "Construction",
  detailsTitle: "Frame, opening, finish.",
  detailsIntro:
    "What can be said now is qualitative. Dimensions, thermal values and certifications are confirmed for the chosen system and market.",
  details: [
    {
      title: "Materials",
      body: "Aluminium where the elevation asks for a slim contemporary line. Engineered timber where period, conservation or a warmer frame belongs.",
    },
    {
      title: "Openings",
      body: "Hinged casement, tilt and turn, or weighted vertical sash. Hidden sash is a tilt and turn that reads as a fixed light—not a separate non-tilt product.",
    },
    {
      title: "Finish",
      body: "Dual colour, stains, powder coat and anodised surfaces. Timber can take glazing bars, leaded lights and period or contemporary bar patterns.",
    },
    {
      title: "Hardware",
      body: "Concealed fittings are available on tilt and turn. Hardware is specified with the opening, not added after the frame is chosen.",
    },
  ],
  detailsNote:
    "Project-specific values, classifications and compliance documents are supplied only after the system and market are confirmed.",
  inspirationEyebrow: "Atmosphere",
  inspirationTitle: "Daylight, measured by the frame.",
  inspirationBody:
    "A visual study of how a tall opening holds a room. The photograph is a reference, not a completed project by the brand.",
  inspirationCaption: "Visual reference · A room held by the frame",
  ctaEyebrow: "Begin",
  ctaTitle: "Talk through style, finish and the opening.",
  ctaBody:
    "Share the elevation, the room and how the window must work. We will follow up from the consultation.",
};

const slidingDoors: CategoryContent = {
  id: "sliding-doors",
  href: routes.slidingDoors,
  title: "Sliding doors",
  navSummary: "Large spans that move with ease and preserve visual continuity.",
  metadataDescription:
    "Aluminium sliding doors for a wide, light opening—where garden, terrace or courtyard remains part of the room.",
  eyebrow: "02 / Sliding doors",
  heroTitle: "A room, continued outward.",
  heroLede:
    "Aluminium sliding doors for a wide, light opening—where garden, terrace or courtyard remains part of the room.",
  thesisEyebrow: "The span",
  thesisTitle: "Panoramic glass is the shared aim.",
  thesisBody: [
    "The specification is how the door moves, where the panels go, and how slim the frame stays. Daylight, a level route outside and visual continuity are the reasons to choose a slider.",
    "Lift-and-slide, pocket and open-corner arrangements belong to some systems, not to every opening. They are chosen with the architecture, not promised as a catalogue default.",
  ],
  familiesEyebrow: "Approaches",
  familiesTitle: "How the wall gives way.",
  familiesIntro:
    "These are framing approaches and configurations, not proprietary system names. Interlock widths and sash sizes are confirmed with the chosen system.",
  families: [
    {
      id: "slimline",
      title: "Slimline Sliding Doors",
      summary:
        "Aluminium sliders with a slim visible frame, so the opening reads as glass first.",
      characteristics: [
        "Aluminium",
        "Slim visible framing",
        "Double or triple glazing",
      ],
      configurations: ["Sliding leaves", "Fixed lights"],
    },
    {
      id: "lift-and-slide",
      title: "Lift & Slide Systems",
      summary:
        "For larger apertures, a lift-and-slide action can carry the leaf with less effort. Not every sliding opening uses it.",
      characteristics: [
        "Lift-and-slide action",
        "Suited to larger apertures",
        "Manual or motorised on some systems",
      ],
      configurations: ["Sliding", "Lift-and-slide"],
    },
    {
      id: "panoramic",
      title: "Large Panoramic Sliding Doors",
      summary:
        "Floor-to-ceiling sliding for an uninterrupted view and more daylight across a wide opening.",
      characteristics: [
        "Floor-to-ceiling glass",
        "Concealed outer frames where the detail allows",
        "Level threshold on some systems",
      ],
      configurations: ["Single, double or triple track"],
    },
    {
      id: "minimal-interlock",
      title: "Minimal Interlock Systems",
      summary:
        "Meeting stiles kept visually quiet so adjacent leaves read as a continuous plane. Widths differ by system and are not stated here.",
      characteristics: [
        "Quiet meeting stile",
        "Continuous glazed plane",
        "Aluminium",
      ],
      configurations: ["Sliding meeting stiles"],
    },
    {
      id: "pocket-galandage",
      title: "Pocket / Galandage Systems",
      summary:
        "Panels that park in the wall, clearing the opening entirely when the architecture asks for it.",
      characteristics: [
        "Panels concealed in the wall",
        "Opening cleared when stacked",
        "Specified with the wall build-up",
      ],
      configurations: ["Wall pocket", "Galandage"],
    },
    {
      id: "open-corner",
      title: "Open Corner Configurations",
      summary:
        "Corners that open without a mullion, including square corners and, on some systems, an angled corner.",
      characteristics: [
        "Corner without a mullion",
        "Indoor–outdoor continuity",
        "Not available on every system",
      ],
      configurations: ["Open corner", "90° corner", "Angled corner"],
    },
  ],
  detailsEyebrow: "Configuration",
  detailsTitle: "Track, pocket, corner.",
  detailsIntro:
    "The useful choices are how the door moves, where the panels go, and how slim the meeting stile remains.",
  details: [
    {
      title: "Movement",
      body: "Sliding is the default language. Lift-and-slide is offered for larger apertures on some systems, and is not assumed for every span.",
    },
    {
      title: "Where panels go",
      body: "Leaves can run across the frame, park in a pocket, or open off a corner. Pocket and open-corner details are specified with the wall and the floor.",
    },
    {
      title: "Threshold and frame",
      body: "Some systems allow a level threshold and frames set into the wall. Dual colour, wood-effect and anodised finishes are part of the aluminium language.",
    },
    {
      title: "Operation",
      body: "Manual and motorised operation exist on some systems. The method is chosen with the leaf size and how the opening is used.",
    },
  ],
  detailsNote:
    "Lift-and-slide, pocket and open-corner arrangements are specified where the architecture asks for them. They are not assumed for every opening.",
  inspirationEyebrow: "Atmosphere",
  inspirationTitle: "Inside, held in the same light.",
  inspirationBody:
    "A visual study of a glazed corridor continuing toward the garden. The photograph is a reference, not a completed project by the brand.",
  inspirationCaption: "Visual reference · Continuity along the opening",
  ctaEyebrow: "Begin",
  ctaTitle: "Send the aperture. We will discuss the configuration.",
  ctaBody:
    "Share the span, the floor level and how the rooms should meet. We will follow up from the consultation.",
};

const entranceDoors: CategoryContent = {
  id: "entrance-doors",
  href: routes.entranceDoors,
  title: "Entrance doors",
  navSummary: "A precise first contact: proportion, tactility and security.",
  metadataDescription:
    "Aluminium entrance doors composed from leaf, infill, hardware and colour—the first contact with the architecture.",
  eyebrow: "03 / Entrance doors",
  heroTitle: "The building’s first line.",
  heroLede:
    "An aluminium entrance door, composed from leaf, infill, hardware and colour—the first contact with the architecture.",
  thesisEyebrow: "The threshold",
  thesisTitle: "One door, specified as a composition.",
  thesisBody: [
    "This is not six separate models. It is one aluminium entrance door whose visitor-facing choices are panel or glass, handle type, colour and texture, and whether inside and outside match.",
    "Flush surfaces and concealed leaf edges keep the door in the plane of the wall. Hardware and access are integrated without unnecessary visual noise.",
  ],
  familiesEyebrow: "Composition",
  familiesTitle: "Leaf, infill, hand, surface.",
  familiesIntro:
    "Read as chapters of one specification. Side lights, pairs and fanlights are not published here until the configuration set is confirmed.",
  families: [
    {
      id: "contemporary-aluminium",
      title: "Contemporary Aluminium Entrance Doors",
      summary:
        "Aluminium residential entrance doors with flush surfaces and concealed leaf edges, styled to the house.",
      characteristics: [
        "Aluminium",
        "Flush alignment",
        "Concealed leaf edges",
      ],
      configurations: ["Single leaf entrance"],
    },
    {
      id: "panelled",
      title: "Panelled Entrance Doors",
      summary:
        "Solid infills as the main styling element of the leaf—fully panelled where the elevation asks for mass.",
      characteristics: ["Panel infill", "Coordinated frame and leaf"],
      configurations: ["Fully panelled leaf"],
    },
    {
      id: "glazed",
      title: "Glazed Entrance Doors",
      summary:
        "Glazed inserts where daylight and a view through the threshold belong, including a fully glazed leaf.",
      characteristics: ["Glazed infill", "Daylight at the threshold"],
      configurations: ["Glazed leaf", "Glazed inserts"],
    },
    {
      id: "bespoke",
      title: "Bespoke Door Designs",
      summary:
        "Frame, leaf and infill composed together, including a different finish inside and out, before the door is quoted.",
      characteristics: [
        "Designed as a composition",
        "Inside and outside can differ",
        "Infill as the styling element",
      ],
      configurations: ["Custom composition"],
    },
    {
      id: "handles",
      title: "Custom Handles and Finishes",
      summary:
        "Door pulls, push handles and push-bar handles, specified with the leaf rather than added as an afterthought.",
      characteristics: ["Pulls", "Push handles", "Push-bar handles"],
      configurations: ["Hardware specified with the leaf"],
    },
    {
      id: "surfaces",
      title: "Different Colours and Surface Treatments",
      summary:
        "Anodised, coated, metallic and sand-blasted surfaces. Frame and infill can differ; inside can differ from outside.",
      characteristics: [
        "Anodised",
        "RAL coating",
        "Metallic",
        "Sand-blasted structural effects",
      ],
      configurations: ["Dual colour", "Frame and infill independently finished"],
    },
  ],
  detailsEyebrow: "Character",
  detailsTitle: "Identity, written in the leaf.",
  detailsIntro:
    "Security, access hardware and thermal performance are resolved with the chosen system. Classes and values are not published as house-brand facts.",
  details: [
    {
      title: "Flush alignment",
      body: "The visual point is a quiet plane: coordinated frames, leaf frames and infills, with concealed door-leaf sections.",
    },
    {
      title: "Infill",
      body: "The infill is the main styling element. Choose a panel, glass, or a composition of both, without inventing a second product range.",
    },
    {
      title: "Hand and surface",
      body: "Handles are specified with the leaf. Colour and texture include anodised, coated, metallic and sand-blasted treatments, including dual colour.",
    },
    {
      title: "Access",
      body: "Comfort hardware such as electric openers, automatic closing or fingerprint access can be discussed with the door. It is not assumed on every entrance.",
    },
  ],
  detailsNote:
    "Resistance classes, insulation values and glass build-ups belong to the chosen system. They are supplied after that system is confirmed.",
  inspirationEyebrow: "Atmosphere",
  inspirationTitle: "A threshold, not a catalogue tile.",
  inspirationBody:
    "Until an approved entrance photograph is in the library, the door is shown as a constructed figure—proportion, leaf and handle—rather than a stock image.",
  inspirationCaption: "Study figure · Leaf, infill, handle",
  ctaEyebrow: "Begin",
  ctaTitle: "Design the leaf, then the conversation.",
  ctaBody:
    "Share the elevation, how the door should feel in the hand, and whether inside and outside match. We will follow up from the consultation.",
};

const architecturalGlazing: CategoryContent = {
  id: "architectural-glazing",
  href: routes.architecturalGlazing,
  title: "Architectural glazing",
  navSummary: "Glazed walls resolved as an integral part of the building.",
  metadataDescription:
    "Project-built glass for walls, corners, roofs and walk-on lights, finished with slim joints rather than a visible frame.",
  eyebrow: "04 / Architectural glazing",
  heroTitle: "Light, given structure.",
  heroLede:
    "Project-built glass: walls, corners, roofs and walk-on lights, finished with slim joints rather than a visible frame.",
  thesisEyebrow: "The assembly",
  thesisTitle: "Glass as architecture, not a catalogue size.",
  thesisBody: [
    "These are assemblies specified with the architect and the structural engineer, and built around access, weathering and the line of the building.",
    "The craft that can be named is the silicone joint, the hidden bracket, and the decision to make the piece at all. Spans, thicknesses and loads are confirmed in engineering, not on this page.",
  ],
  familiesEyebrow: "Solutions",
  familiesTitle: "Six ways to keep the frame away.",
  familiesIntro:
    "A collection of architectural solutions. Each is a project piece, not a stock unit with a published maximum.",
  families: [
    {
      id: "structural-walls",
      title: "Structural Glass Walls",
      summary:
        "A structural glass wall for a light, transparent elevation, made from insulated panels rather than a framed curtain of products.",
      characteristics: [
        "Insulated glass panels",
        "Transparent elevation",
        "Specified with the structure",
      ],
      configurations: ["Structural joint glass wall"],
    },
    {
      id: "frameless",
      title: "Frameless Structural Glazing",
      summary:
        "A frameless finish from a slim silicone joint between panels, with edge frameworks whose fixings and brackets stay hidden.",
      characteristics: [
        "Slim silicone joint",
        "Hidden fixings and brackets",
        "Frameless reading",
      ],
      configurations: ["Silicone-jointed panels"],
    },
    {
      id: "oversized",
      title: "Oversized Glass Units",
      summary:
        "Large picture windows and feature walls. Capacity is a matter of the piece, the factory and the site—not a published maximum here.",
      characteristics: [
        "Large picture windows",
        "Feature walls",
        "Sized to the project",
      ],
      configurations: ["Oversized insulated units"],
    },
    {
      id: "roofs",
      title: "Glass Roofs and Rooflights",
      summary:
        "Flatglass rooflights, lanterns, lean-to roofs and large-area roof glazing, made to the project, often with a frameless internal finish.",
      characteristics: [
        "Fixed, non-opening rooflights",
        "Frameless internal finish",
        "Lean-to aluminium framing where required",
      ],
      configurations: ["Flat", "Lantern", "Lean-to", "Large-area roof"],
    },
    {
      id: "walk-on",
      title: "Walk-on Glass",
      summary:
        "Walk-on rooflights to light the room below, in toughened safety glass. Load is confirmed in engineering, not as a catalogue class.",
      characteristics: [
        "Toughened safety glass",
        "UV-blocking coating as standard",
        "Optional opaque or non-slip texture",
      ],
      configurations: ["Walk-on rooflight"],
    },
    {
      id: "oriel",
      title: "Oriel / Glass Box Windows",
      summary:
        "A contemporary structural box window for a window seat. Frameless glass panels meet at the corner without framing; structural silicone makes the weather seal.",
      characteristics: [
        "Frameless corner",
        "Structural silicone weather seal",
        "Slim joint inside and out",
      ],
      configurations: ["Corner glass box"],
    },
  ],
  detailsEyebrow: "Craft",
  detailsTitle: "Joint, bracket, weather.",
  detailsIntro:
    "What the work is willing to discuss is installation, site access, weathering and the precision of the silicone joint.",
  details: [
    {
      title: "Joints",
      body: "Slim silicone joints between insulated panels, with a weather seal that can read as a single line inside and out.",
    },
    {
      title: "Fixings",
      body: "Edge frameworks with hidden fixings and brackets, so the glass remains the elevation.",
    },
    {
      title: "Roofs",
      body: "Flat, lantern or lean-to. Lean-to roofs use thermally broken aluminium framing where the detail requires it. Fixed rooflights can finish frameless internally.",
    },
    {
      title: "Collaboration",
      body: "These pieces are specified with architects, designers and structural engineers, around access and whether the assembly can be built, weathered and installed.",
    },
  ],
  detailsNote:
    "Spans, thicknesses, walk-on loads and thermal values are confirmed with engineering. They are not published as house-brand facts.",
  inspirationEyebrow: "Atmosphere",
  inspirationTitle: "A roof of light, not a skylight product.",
  inspirationBody:
    "A visual study of a glazed roof holding a court of shadow and sun. The photograph is a reference, not a completed project by the brand.",
  inspirationCaption: "Visual reference · Light structured overhead",
  ctaEyebrow: "Begin",
  ctaTitle: "Bring the drawing. We will ask if it can be built.",
  ctaBody:
    "Share the section, the access and the weathering line. We will follow up from the consultation.",
};

const categories: Record<CategoryId, CategoryContent> = {
  windows,
  "sliding-doors": slidingDoors,
  "entrance-doors": entranceDoors,
  "architectural-glazing": architecturalGlazing,
};

export function getCategory(id: CategoryId): CategoryContent {
  return categories[id];
}

export function getAllCategories(): CategoryContent[] {
  return categoryIds.map((id) => categories[id]);
}

export function getRelatedCategories(id: CategoryId): CategoryContent[] {
  return getAllCategories().filter((category) => category.id !== id);
}
