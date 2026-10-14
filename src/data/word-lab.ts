import type { SpeakLang } from "@/lib/speak";

export type WordLabKind = "cognate" | "sound-pattern" | "false-friend";
export type WordLabStatus = "established" | "reconstructed" | "disputed";
export type WordLabLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export type WordLabSource = {
  title: string;
  institution: string;
  url: string;
  role: "Bulgarian meaning" | "Polish meaning and origin" | "Comparative etymology";
};

export type WordLabEntry = {
  id: string;
  kind: WordLabKind;
  status: WordLabStatus;
  level: WordLabLevel;
  bg: { word: string; ipa: string; meaning: string; example: string };
  pl: { word: string; ipa: string; meaning: string; example: string };
  protoSlavic: string;
  connection: string;
  etymology: string;
  soundPattern: string;
  relatives: Array<{ language: string; word: string; lang: SpeakLang }>;
  task: {
    prompt: string;
    choices: string[];
    answer: number;
    explanation: string;
  };
  sources: WordLabSource[];
  reviewedAt: string;
};

const DERKSEN: WordLabSource = {
  title: "Etymological Dictionary of the Slavic Inherited Lexicon",
  institution: "Rick Derksen · Brill, 2008",
  url: "https://brill.com/display/title/12607",
  role: "Comparative etymology",
};

const bgSource = (word: string): WordLabSource => ({
  title: `Речник на българския език: ${word}`,
  institution: "Институт за български език · БАН",
  url: `https://ibl.bas.bg/rbe/lang/bg/${encodeURIComponent(word.toLocaleUpperCase("bg-BG"))}/`,
  role: "Bulgarian meaning",
});

const plSource = (title: string, url: string): WordLabSource => ({
  title: `Wielki słownik języka polskiego PAN: ${title}`,
  institution: "Instytut Języka Polskiego · PAN",
  url,
  role: "Polish meaning and origin",
});

export const WORD_LAB_ENTRIES: WordLabEntry[] = [
  {
    id: "water-voda-woda",
    kind: "cognate",
    status: "established",
    level: "A1",
    bg: { word: "вода", ipa: "/voˈda/", meaning: "water", example: "Пия студена вода." },
    pl: { word: "woda", ipa: "/ˈvɔ.da/", meaning: "water", example: "Piję zimną wodę." },
    protoSlavic: "*voda",
    connection:
      "The modern words retain the same core meaning and are one of the clearest Bulgarian–Polish cognate pairs.",
    etymology:
      "Both forms continue a reconstructed Proto-Slavic noun *voda. The asterisk marks a scholarly reconstruction, not a directly attested spelling.",
    soundPattern:
      "Initial Bulgarian в and written Polish w represent closely corresponding /v/ sounds here.",
    relatives: [
      { language: "Russian", word: "вода", lang: "ru-RU" },
      { language: "Ukrainian", word: "вода", lang: "uk-UA" },
      { language: "Belarusian", word: "вада", lang: "be-BY" },
      { language: "Czech", word: "voda", lang: "cs-CZ" },
      { language: "Slovak", word: "voda", lang: "sk-SK" },
      { language: "Serbian", word: "вода", lang: "sr-RS" },
      { language: "Croatian", word: "voda", lang: "hr-HR" },
      { language: "Bosnian", word: "voda", lang: "bs-BA" },
      { language: "Montenegrin", word: "voda", lang: "sr-ME" },
      { language: "Slovenian", word: "voda", lang: "sl-SI" },
      { language: "Macedonian", word: "вода", lang: "mk-MK" },
    ],
    task: {
      prompt: "Which Polish form correctly completes: Piję zimną ___?",
      choices: ["woda", "wodę", "wodzie"],
      answer: 1,
      explanation: "Piję takes a direct object, so woda appears in the accusative: wodę.",
    },
    sources: [
      bgSource("вода"),
      plSource("woda", "https://wsjp.pl/haslo/podglad/8016/woda/4518296/ciecz"),
      DERKSEN,
    ],
    reviewedAt: "2026-10-14",
  },
  {
    id: "brother-brat-brat",
    kind: "cognate",
    status: "established",
    level: "A1",
    bg: { word: "брат", ipa: "/brat/", meaning: "brother", example: "Това е моят брат." },
    pl: { word: "brat", ipa: "/brat/", meaning: "brother", example: "To jest mój brat." },
    protoSlavic: "*bratrъ",
    connection:
      "Form and meaning are nearly identical, although Polish develops irregular-looking plural forms such as bracia.",
    etymology:
      "Bulgarian брат and Polish brat continue the reconstructed Proto-Slavic kinship term *bratrъ.",
    soundPattern: "The consonant frame br-t is preserved with almost no visible change.",
    relatives: [
      { language: "Russian", word: "брат", lang: "ru-RU" },
      { language: "Ukrainian", word: "брат", lang: "uk-UA" },
      { language: "Belarusian", word: "брат", lang: "be-BY" },
      { language: "Czech", word: "bratr", lang: "cs-CZ" },
      { language: "Slovak", word: "brat", lang: "sk-SK" },
      { language: "Serbian", word: "брат", lang: "sr-RS" },
      { language: "Croatian", word: "brat", lang: "hr-HR" },
      { language: "Bosnian", word: "brat", lang: "bs-BA" },
      { language: "Montenegrin", word: "brat", lang: "sr-ME" },
      { language: "Slovenian", word: "brat", lang: "sl-SI" },
      { language: "Macedonian", word: "брат", lang: "mk-MK" },
    ],
    task: {
      prompt: "Which Polish plural normally means ‘brothers’ in a family?",
      choices: ["braty", "bracia", "bratowie"],
      answer: 1,
      explanation:
        "The standard personal plural is bracia; similarity in the singular does not predict it.",
    },
    sources: [
      bgSource("брат"),
      plSource("brat", "https://wsjp.pl/haslo/podglad/2206/brat/4919173/w-rodzinie"),
      DERKSEN,
    ],
    reviewedAt: "2026-10-14",
  },
  {
    id: "head-glava-glowa",
    kind: "sound-pattern",
    status: "reconstructed",
    level: "A1",
    bg: { word: "глава", ipa: "/ɡɫɐˈva/", meaning: "head", example: "Боли ме главата." },
    pl: { word: "głowa", ipa: "/ˈɡwɔ.va/", meaning: "head", example: "Boli mnie głowa." },
    protoSlavic: "*golva",
    connection:
      "The relationship becomes clearer once Polish ł is read as /w/ and the different vowel order is recognized.",
    etymology:
      "The two words continue Proto-Slavic *golva. Their shapes reflect different historical developments in South and West Slavic.",
    soundPattern:
      "Bulgarian гла- and Polish gło- illustrate a historical liquid-and-vowel pattern; this is a clue, not a rule to apply blindly.",
    relatives: [
      { language: "Russian", word: "голова", lang: "ru-RU" },
      { language: "Ukrainian", word: "голова", lang: "uk-UA" },
      { language: "Belarusian", word: "галава", lang: "be-BY" },
      { language: "Czech", word: "hlava", lang: "cs-CZ" },
      { language: "Slovak", word: "hlava", lang: "sk-SK" },
      { language: "Serbian", word: "глава", lang: "sr-RS" },
      { language: "Croatian", word: "glava", lang: "hr-HR" },
      { language: "Bosnian", word: "glava", lang: "bs-BA" },
      { language: "Montenegrin", word: "glava", lang: "sr-ME" },
      { language: "Slovenian", word: "glava", lang: "sl-SI" },
      { language: "Macedonian", word: "глава", lang: "mk-MK" },
    ],
    task: {
      prompt: "How is the Polish letter ł pronounced in głowa?",
      choices: ["Like Bulgarian л", "Approximately /w/", "It is silent"],
      answer: 1,
      explanation: "In contemporary standard Polish, ł is pronounced approximately like English w.",
    },
    sources: [
      bgSource("глава"),
      plSource("głowa", "https://wsjp.pl/haslo/podglad/19814/glowa/4924385/czesc-ciala"),
      DERKSEN,
    ],
    reviewedAt: "2026-10-14",
  },
  {
    id: "hand-raka-reka",
    kind: "sound-pattern",
    status: "reconstructed",
    level: "A1",
    bg: { word: "ръка", ipa: "/rɐˈka/", meaning: "hand; arm", example: "Вдигни дясната ръка." },
    pl: { word: "ręka", ipa: "/ˈrɛŋ.ka/", meaning: "hand; arm", example: "Podnieś prawą rękę." },
    protoSlavic: "*rǫka",
    connection:
      "The Polish nasal vowel and Bulgarian ъ point back to different outcomes of an older Slavic nasal vowel.",
    etymology:
      "Both words continue reconstructed Proto-Slavic *rǫka. Polish preserves nasalization in spelling, while Bulgarian does not.",
    soundPattern:
      "A Polish nasal vowel such as ę can correspond to a non-nasal Bulgarian vowel, but the exact outcome depends on the word and environment.",
    relatives: [
      { language: "Russian", word: "рука", lang: "ru-RU" },
      { language: "Ukrainian", word: "рука", lang: "uk-UA" },
      { language: "Belarusian", word: "рука", lang: "be-BY" },
      { language: "Czech", word: "ruka", lang: "cs-CZ" },
      { language: "Slovak", word: "ruka", lang: "sk-SK" },
      { language: "Serbian", word: "рука", lang: "sr-RS" },
      { language: "Croatian", word: "ruka", lang: "hr-HR" },
      { language: "Bosnian", word: "ruka", lang: "bs-BA" },
      { language: "Montenegrin", word: "ruka", lang: "sr-ME" },
      { language: "Slovenian", word: "roka", lang: "sl-SI" },
      { language: "Macedonian", word: "рака", lang: "mk-MK" },
    ],
    task: {
      prompt: "Which phrase means ‘with the hand’ in Polish?",
      choices: ["z ręka", "ręką", "do ręki"],
      answer: 1,
      explanation: "The instrumental singular of ręka is ręką.",
    },
    sources: [
      bgSource("ръка"),
      plSource("ręka", "https://wsjp.pl/haslo/podglad/15951/reka"),
      DERKSEN,
    ],
    reviewedAt: "2026-10-14",
  },
  {
    id: "forest-mountain-gora",
    kind: "false-friend",
    status: "established",
    level: "A1",
    bg: { word: "гора", ipa: "/ɡoˈra/", meaning: "forest", example: "Разхождаме се в гората." },
    pl: { word: "góra", ipa: "/ˈɡu.ra/", meaning: "mountain; top", example: "Wchodzimy na górę." },
    protoSlavic: "*gora",
    connection:
      "The forms are historically related, but their everyday meanings have diverged — a classic high-risk false friend.",
    etymology:
      "Polish retains the mountain meaning associated with *gora. Bulgarian developed the everyday meaning ‘forest’, so surface similarity is misleading.",
    soundPattern:
      "Polish ó is pronounced /u/. Accent marks are not decorative: góra and Bulgarian гора differ in both sound and meaning.",
    relatives: [
      { language: "Russian", word: "гора", lang: "ru-RU" },
      { language: "Ukrainian", word: "гора", lang: "uk-UA" },
      { language: "Belarusian", word: "гара", lang: "be-BY" },
      { language: "Czech", word: "hora", lang: "cs-CZ" },
      { language: "Slovak", word: "hora", lang: "sk-SK" },
      { language: "Serbian", word: "гора", lang: "sr-RS" },
      { language: "Croatian", word: "gora", lang: "hr-HR" },
      { language: "Bosnian", word: "gora", lang: "bs-BA" },
      { language: "Montenegrin", word: "gora", lang: "sr-ME" },
      { language: "Slovenian", word: "gora", lang: "sl-SI" },
      { language: "Macedonian", word: "гора", lang: "mk-MK" },
    ],
    task: {
      prompt: "Your Polish friend says Idziemy w góry. Where are you going?",
      choices: ["To the forest", "To the mountains", "To the city"],
      answer: 1,
      explanation: "Polish góry is the plural of góra: mountains, not forests.",
    },
    sources: [
      bgSource("гора"),
      plSource("góra", "https://wsjp.pl/haslo/podglad/8070/gora"),
      DERKSEN,
    ],
    reviewedAt: "2026-10-14",
  },
  {
    id: "five-pet-piec",
    kind: "sound-pattern",
    status: "reconstructed",
    level: "A1",
    bg: { word: "пет", ipa: "/pɛt/", meaning: "five", example: "Имам пет книги." },
    pl: { word: "pięć", ipa: "/pjɛɲt͡ɕ/", meaning: "five", example: "Mam pięć książek." },
    protoSlavic: "*pętь",
    connection:
      "The numeral is inherited in both languages, but Polish displays nasalization and palatalization absent from the Bulgarian form.",
    etymology:
      "Both forms continue reconstructed Proto-Slavic *pętь. The modern pair is useful for recognizing recurring Polish ę and soft final consonants.",
    soundPattern:
      "Bulgarian пет corresponds to Polish pięć; Polish spelling encodes changes that make the cognate less visually transparent.",
    relatives: [
      { language: "Russian", word: "пять", lang: "ru-RU" },
      { language: "Ukrainian", word: "п’ять", lang: "uk-UA" },
      { language: "Belarusian", word: "пяць", lang: "be-BY" },
      { language: "Czech", word: "pět", lang: "cs-CZ" },
      { language: "Slovak", word: "päť", lang: "sk-SK" },
      { language: "Serbian", word: "пет", lang: "sr-RS" },
      { language: "Croatian", word: "pet", lang: "hr-HR" },
      { language: "Bosnian", word: "pet", lang: "bs-BA" },
      { language: "Montenegrin", word: "pet", lang: "sr-ME" },
      { language: "Slovenian", word: "pet", lang: "sl-SI" },
      { language: "Macedonian", word: "пет", lang: "mk-MK" },
    ],
    task: {
      prompt: "Which Polish phrase means ‘five books’?",
      choices: ["pięć książki", "pięć książek", "pięciu książka"],
      answer: 1,
      explanation: "After pięć, the counted noun normally appears in the genitive plural: książek.",
    },
    sources: [
      bgSource("пет"),
      plSource("pięć", "https://wsjp.pl/haslo/podglad/37403/piec"),
      DERKSEN,
    ],
    reviewedAt: "2026-10-14",
  },
];

export const WORD_LAB_KIND_LABELS: Record<WordLabKind, string> = {
  cognate: "Cognates",
  "sound-pattern": "Sound patterns",
  "false-friend": "False friends",
};

export const WORD_LAB_STATUS_LABELS: Record<WordLabStatus, string> = {
  established: "Установено",
  reconstructed: "Реконструирано",
  disputed: "Спорно",
};
