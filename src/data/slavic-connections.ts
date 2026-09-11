export type ConnectionKind = "cognate" | "sound-pattern" | "false-friend" | "grammar";

export type SlavicConnection = {
  id: string;
  kind: ConnectionKind;
  title: string;
  summary: string;
  bg: string;
  pl: string;
  note: string;
  examples: Array<{
    label: string;
    bg: string;
    pl: string;
  }>;
};

export const SLAVIC_CONNECTIONS: SlavicConnection[] = [
  {
    id: "water-woda",
    kind: "cognate",
    title: "вода ↔ woda",
    summary: "A transparent cognate: same inherited root, almost no decoding needed.",
    bg: "вода",
    pl: "woda",
    note: "These are true cognates with the same basic meaning.",
    examples: [
      { label: "BG", bg: "Пия вода.", pl: "" },
      { label: "PL", bg: "", pl: "Piję wodę." },
    ],
  },
  {
    id: "brother-brat",
    kind: "cognate",
    title: "брат ↔ brat",
    summary: "A family word that stays strikingly close across Bulgarian and Polish.",
    bg: "брат",
    pl: "brat",
    note: "The dictionary form is nearly identical, but Polish inflection still changes the form in context.",
    examples: [
      { label: "BG", bg: "Това е брат ми.", pl: "" },
      { label: "PL", bg: "", pl: "To jest mój brat." },
    ],
  },
  {
    id: "head-glowa",
    kind: "sound-pattern",
    title: "глава ↔ głowa",
    summary:
      "A useful example of regular-looking sound correspondence rather than simple spelling similarity.",
    bg: "глава",
    pl: "głowa",
    note: "The words are related, but Polish ł is pronounced like English w. Learn the sound, not just the letters.",
    examples: [
      { label: "BG", bg: "Боли ме главата.", pl: "" },
      { label: "PL", bg: "", pl: "Boli mnie głowa." },
    ],
  },
  {
    id: "mountain-gora",
    kind: "false-friend",
    title: "гора ≠ góra",
    summary:
      "Familiar shape, different meaning — exactly the kind of trap Slavic learners should see early.",
    bg: "гора = forest",
    pl: "góra = mountain",
    note: "Bulgarian гора means ‘forest’; Polish góra means ‘mountain’ or ‘top’. Treat this as a false friend, not a cognate shortcut.",
    examples: [
      { label: "BG", bg: "Разхождаме се в гората.", pl: "" },
      { label: "PL", bg: "", pl: "Wchodzimy na górę." },
    ],
  },
  {
    id: "instrumental-by-with",
    kind: "grammar",
    title: "с + noun ↔ z + narzędnik",
    summary:
      "Bulgarian often uses a preposition where Polish also requires a specific case ending.",
    bg: "с приятел",
    pl: "z przyjacielem",
    note: "For Bulgarian speakers, the new information is not the preposition z, but the instrumental ending on the noun.",
    examples: [
      { label: "BG", bg: "Говоря с приятел.", pl: "" },
      { label: "PL", bg: "", pl: "Rozmawiam z przyjacielem." },
    ],
  },
  {
    id: "genitive-negation",
    kind: "grammar",
    title: "нямам книга ↔ nie mam książki",
    summary:
      "Polish case choice carries information Bulgarian usually expresses without noun-case endings.",
    bg: "нямам книга",
    pl: "nie mam książki",
    note: "After mieć under negation, Polish commonly uses the genitive: książka → książki.",
    examples: [
      { label: "BG", bg: "Нямам книга.", pl: "" },
      { label: "PL", bg: "", pl: "Nie mam książki." },
    ],
  },
];

export const CONNECTION_KIND_LABELS: Record<ConnectionKind, { title: string; bg: string }> = {
  cognate: { title: "Cognates", bg: "Сродни думи" },
  "sound-pattern": { title: "Sound patterns", bg: "Звукови съответствия" },
  "false-friend": { title: "False friends", bg: "Лъжливи приятели" },
  grammar: { title: "Grammar bridges", bg: "Граматични мостове" },
};
