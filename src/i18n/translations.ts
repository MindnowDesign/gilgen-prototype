export type Locale = "en" | "de";

export const LOCALES: { value: Locale; label: string }[] = [
  { value: "en", label: "English" },
  { value: "de", label: "Deutsch (CH)" },
];

const en = {
  common: {
    back: "Back",
    next: "Next",
    start: "Start",
    reset: "Reset",
    goToConfigurator: "Go to configurator",
    gilgenConfigurator: "Gilgen Configurator",
    backToStart: "Back to start",
    language: "Language",
    questionOf: "Question {step} of {total}",
  },
  welcome: {
    heroTitle: "Welcome to Gilgen Configurator",
    heroDescriptionBefore: "Before we start, please answer these",
    heroDescriptionHighlight: "3 questions",
    heroDescriptionAfter:
      " to design the best experience and solution for you and your needs.",
    stepQuestions: "Questions",
    stepConfigurator: "Configurator",
    copyright: "© 2026 Gilgen Door Systems. All rights reserved.",
    needHelp: "Need help?",
    contactUs: "Contact us",
  },
  configure: {
    doorType: {
      title: "What are you working on?",
      subtitle: "Select the option that best matches your project.",
      planning: {
        title: "Planning a new project",
        description:
          "I'm exploring door solutions for a new building or renovation.",
      },
      replacing: {
        title: "Replacing an existing door",
        description:
          "I need a compatible replacement for an existing installation.",
      },
      unsure: {
        title: "I'm not sure",
        description: "Help me find the solution that fits my needs.",
      },
    },
    replacingType: {
      title: "What are you replacing?",
      subtitle: "Select the door type that matches your existing installation.",
      sliding: {
        title: "Sliding Door",
        description: "Horizontal sliding systems for entrances and partitions.",
      },
      swing: {
        title: "Swing Door",
        description: "Hinged doors for standard openings and access points.",
      },
      industrial: {
        title: "Industrial Gate",
        description: "Heavy-duty gates for industrial and logistics sites.",
      },
    },
    replacingNeed: {
      title: "What do you need?",
      subtitle: "Choose the outcome that best describes your replacement goal.",
      exact: {
        title: "Exact Replacement",
        description:
          "Match the existing system with a direct, compatible replacement.",
      },
      performance: {
        title: "Improved Performance",
        description:
          "Upgrade reliability, efficiency, or operational performance.",
      },
      modern: {
        title: "Modern Alternative",
        description:
          "Explore updated technology and contemporary door solutions.",
      },
    },
    planningLocation: {
      title: "Where will the door be installed?",
      subtitle: "Choose the environment that best describes your installation.",
      commercial: {
        title: "Commercial Building",
        description:
          "Offices, retail, hospitality, and other commercial spaces.",
      },
      healthcare: {
        title: "Healthcare Facility",
        description: "Hospitals, clinics, and care environments.",
      },
      industrial: {
        title: "Industrial Facility",
        description: "Warehouses, production sites, and logistics hubs.",
      },
    },
    planningPriority: {
      title: "What's most important for your project?",
      subtitle:
        "Select the priority that matters most for your door solution.",
      design: {
        title: "Design & Architecture",
        description:
          "Aesthetic integration and alignment with the building design.",
      },
      security: {
        title: "Security & Protection",
        description: "Safety, access control, and protective performance.",
      },
      accessibility: {
        title: "Accessibility & Flow",
        description: "Ease of movement and inclusive access for all users.",
      },
    },
    unsureHelp: {
      title: "How can we help you?",
      subtitle:
        "Tell us where you are in your journey so we can guide you to the right path.",
      project: {
        title: "Project door solution",
        description:
          "New builds, renovations, and project-based door requirements.",
      },
      existing: {
        title: "Existing door support",
        description:
          "Replacement, upgrades, or support for an installed system.",
      },
      exploring: {
        title: "I'm just exploring options",
        description: "Browse solutions without a specific project in mind.",
      },
    },
  },
  configurator: {
    doorName: "Sliding Door System",
    description: "Commercial Application · High Traffic",
    slidingDoor: "Sliding door",
    hideSidebar: "Hide sidebar",
    showSidebar: "Show sidebar",
    changeBackground: "Change background",
    dimensions: "Dimensions",
    tabs: {
      design: "Design",
      performance: "Performance",
      summary: "Summary",
      ariaLabel: "Door configuration sections",
    },
    performancePlaceholder: "Performance options will appear here.",
    summaryPlaceholder: "Your configuration summary will appear here.",
    totalPrice: "Total price",
    colors: "Colors",
    glassType: "Glass type",
    glass: {
      clear: "Clear",
      frosted: "Frosted",
      tinted: "Tinted",
    },
    profileStyle: "Profile Style",
    profile: {
      frameless: "Frameless",
      slimFrame: "Slim Frame",
      standardFrame: "Standard Frame",
    },
    doorConfiguration: "Door Configuration",
    configuration: {
      single: "Single Sliding",
      double: "Double Sliding",
      telescopic: "Telescopic",
    },
    colorLabels: {
      naturalAluminium: "Natural Aluminium",
      anthraciteBlack: "Anthracite Black",
      pureWhite: "Pure White",
      stainlessSteel: "Stainless Steel",
      custom: "Custom",
    },
  },
};

type TranslationTree = {
  [key: string]: string | TranslationTree;
};

const de: TranslationTree = {
  common: {
    back: "Zurück",
    next: "Weiter",
    start: "Starten",
    reset: "Zurücksetzen",
    goToConfigurator: "Zum Konfigurator",
    gilgenConfigurator: "Gilgen Konfigurator",
    backToStart: "Zurück zum Start",
    language: "Sprache",
    questionOf: "Frage {step} von {total}",
  },
  welcome: {
    heroTitle: "Willkommen beim Gilgen Konfigurator",
    heroDescriptionBefore: "Bevor es losgeht, beantworten Sie bitte diese",
    heroDescriptionHighlight: "3 Fragen",
    heroDescriptionAfter:
      ", damit wir die bestmögliche Lösung für Sie und Ihr Projekt finden.",
    stepQuestions: "Fragen",
    stepConfigurator: "Konfigurator",
    copyright: "© 2026 Gilgen Door Systems. Alle Rechte vorbehalten.",
    needHelp: "Brauchen Sie Hilfe?",
    contactUs: "Kontakt aufnehmen",
  },
  configure: {
    doorType: {
      title: "Woran arbeiten Sie?",
      subtitle: "Wählen Sie die Option, die am besten zu Ihrem Projekt passt.",
      planning: {
        title: "Neues Projekt",
        description:
          "Lösungen für Neubau oder Umbau. Passend zu Ihrem Projekt.",
      },
      replacing: {
        title: "Tür ersetzen",
        description:
          "Ersatz für bestehende Anlagen. Kompatibel und passgenau.",
      },
      unsure: {
        title: "Bin unsicher",
        description:
          "Noch unsicher? Wir finden die richtige Lösung für Sie.",
      },
    },
    replacingType: {
      title: "Was möchten Sie ersetzen?",
      subtitle:
        "Wählen Sie den Türtyp, der zu Ihrer bestehenden Anlage passt.",
      sliding: {
        title: "Schiebetür",
        description:
          "Schiebesysteme für Eingänge. Ideal bei hoher Frequenz.",
      },
      swing: {
        title: "Drehtür",
        description:
          "Drehtüren für Standardöffnungen. Bewährt im Alltag.",
      },
      industrial: {
        title: "Industrietor",
        description:
          "Tore für Industrie und Logistik. Robust und belastbar.",
      },
    },
    replacingNeed: {
      title: "Was benötigen Sie?",
      subtitle:
        "Wählen Sie das Ziel, das Ihren Ersatzwunsch am besten beschreibt.",
      exact: {
        title: "Gleicher Ersatz",
        description:
          "System direkt ersetzen. Funktion bleibt, Qualität steigt.",
      },
      performance: {
        title: "Mehr Leistung",
        description:
          "Mehr Zuverlässigkeit im Betrieb. Effizienter und langlebiger.",
      },
      modern: {
        title: "Neue Technologie",
        description:
          "Moderne Technik entdecken. Mehr Komfort und Sicherheit.",
      },
    },
    planningLocation: {
      title: "Wo wird die Tür eingesetzt?",
      subtitle:
        "Wählen Sie die Umgebung, die Ihren Einsatzbereich am besten beschreibt.",
      commercial: {
        title: "Gewerbe",
        description:
          "Büros, Handel und Gastronomie. Für gewerbliche Bereiche.",
      },
      healthcare: {
        title: "Gesundheit",
        description:
          "Spitäler, Praxen und Pflege. Hygienisch und zuverlässig.",
      },
      industrial: {
        title: "Industrie",
        description:
          "Lager, Produktion, Logistik. Für den Industriealltag.",
      },
    },
    planningPriority: {
      title: "Was ist für Ihr Projekt am wichtigsten?",
      subtitle:
        "Wählen Sie die Priorität, die für Ihre Türlösung entscheidend ist.",
      design: {
        title: "Design",
        description:
          "Passend zur Architektur. Ästhetik und Funktion vereint.",
      },
      security: {
        title: "Sicherheit",
        description:
          "Schutz und Zugangskontrolle. Mehr Sicherheit im Betrieb.",
      },
      accessibility: {
        title: "Barrierefreiheit",
        description:
          "Barrierefrei und gut begehbar. Für alle Nutzer geeignet.",
      },
    },
    unsureHelp: {
      title: "Wie können wir Ihnen helfen?",
      subtitle:
        "Sagen Sie uns, wo Sie stehen – wir leiten Sie zum passenden nächsten Schritt.",
      project: {
        title: "Projekt",
        description:
          "Neubau, Umbau oder Renovation. Türkompetenz fürs Projekt.",
      },
      existing: {
        title: "Bestehende Tür",
        description:
          "Ersatz oder Upgrade vor Ort. Support für Ihre Anlage.",
      },
      exploring: {
        title: "Nur ansehen",
        description:
          "Erst einmal umsehen. Ohne konkretes Projekt.",
      },
    },
  },
  configurator: {
    doorName: "Schiebetürsystem",
    description: "Gewerbliche Anwendung · Hoher Durchgang",
    slidingDoor: "Schiebetür",
    hideSidebar: "Seitenleiste ausblenden",
    showSidebar: "Seitenleiste einblenden",
    changeBackground: "Hintergrund ändern",
    dimensions: "Abmessungen",
    tabs: {
      design: "Design",
      performance: "Leistung",
      summary: "Übersicht",
      ariaLabel: "Bereiche der Türkonfiguration",
    },
    performancePlaceholder: "Leistungsoptionen erscheinen hier.",
    summaryPlaceholder: "Ihre Konfigurationsübersicht erscheint hier.",
    totalPrice: "Gesamtpreis",
    colors: "Farben",
    glassType: "Glasart",
    glass: {
      clear: "Klar",
      frosted: "Milchglas",
      tinted: "Getönt",
    },
    profileStyle: "Profilstil",
    profile: {
      frameless: "Rahmenlos",
      slimFrame: "Schmaler Rahmen",
      standardFrame: "Standardrahmen",
    },
    doorConfiguration: "Türkonfiguration",
    configuration: {
      single: "Einfach\nSchiebetür",
      double: "Doppel\nSchiebetür",
      telescopic: "Teleskop\nSchiebetür",
    },
    colorLabels: {
      naturalAluminium: "Aluminium natur",
      anthraciteBlack: "Anthrazit",
      pureWhite: "Reinweiss",
      stainlessSteel: "Edelstahl",
      custom: "Nach Wunsch",
    },
  },
};

export const translations: Record<Locale, TranslationTree> = { en, de };

export type Translations = typeof en;

export function formatTranslation(
  template: string,
  values: Record<string, string | number>
) {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replace(`{${key}}`, String(value)),
    template
  );
}
