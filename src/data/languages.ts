// Single source of truth for the SlavicMind language ecosystem.
// Adding a future language = adding an entry here. Only "available"
// languages get a course route; "planned" ones are never linkable.

export type LanguageStatus = "available" | "planned";

export interface SlavicLanguage {
  code: string;
  name: string;
  nativeName: string;
  /** Short glyph used in cards — a letter typical of the language's script/orthography. */
  glyph: string;
  status: LanguageStatus;
  group: "West Slavic" | "South Slavic" | "East Slavic";
  blurb: string;
  /** Only set for available languages. */
  href?: string;
}

export const LANGUAGES: SlavicLanguage[] = [
  {
    code: "pl",
    name: "Polish",
    nativeName: "polski",
    glyph: "Ł",
    status: "available",
    group: "West Slavic",
    blurb: "The flagship course: seven cases, aspect, 490+ words, stories and mind games.",
    href: "/learn/polish",
  },
  {
    code: "cs",
    name: "Czech",
    nativeName: "čeština",
    glyph: "Ř",
    status: "planned",
    group: "West Slavic",
    blurb: "Seven cases too — and a grammar that rhymes with Polish more than it differs.",
  },
  {
    code: "sk",
    name: "Slovak",
    nativeName: "slovenčina",
    glyph: "Ľ",
    status: "planned",
    group: "West Slavic",
    blurb: "The bridge language of Central Europe, mutually intelligible with Czech.",
  },
  {
    code: "sr",
    name: "Serbian",
    nativeName: "српски",
    glyph: "Ђ",
    status: "planned",
    group: "South Slavic",
    blurb: "Two alphabets, pitch accent, and a case system close to Bulgarian's lost one.",
  },
  {
    code: "hr",
    name: "Croatian",
    nativeName: "hrvatski",
    glyph: "Č",
    status: "planned",
    group: "South Slavic",
    blurb: "Adriatic South Slavic — shared grammar core, distinct lexicon and standard.",
  },
  {
    code: "sl",
    name: "Slovenian",
    nativeName: "slovenščina",
    glyph: "Ž",
    status: "planned",
    group: "South Slavic",
    blurb: "Keeps the dual number — a grammatical relic almost nowhere else in Europe.",
  },
  {
    code: "uk",
    name: "Ukrainian",
    nativeName: "українська",
    glyph: "Ї",
    status: "planned",
    group: "East Slavic",
    blurb: "East Slavic with striking Polish contact vocabulary and a vocative case.",
  },
  {
    code: "bg",
    name: "Bulgarian",
    nativeName: "български",
    glyph: "Ъ",
    status: "planned",
    group: "South Slavic",
    blurb: "Currently the language we teach *from*. A course for other Slavs comes later.",
  },
];

export const AVAILABLE_LANGUAGES = LANGUAGES.filter((l) => l.status === "available");
export const PLANNED_LANGUAGES = LANGUAGES.filter((l) => l.status === "planned");

export function getLanguage(code: string) {
  return LANGUAGES.find((l) => l.code === code);
}
