// Polish grammar reference data: declension paradigms, conjugation groups,
// verb aspect, and verb→case/preposition mapping. Data used across grammar
// pages and mind games.

export type CaseSlug =
  | "mianownik" | "dopelniacz" | "celownik" | "biernik"
  | "narzednik" | "miejscownik" | "wolacz";

export const CASE_ORDER: CaseSlug[] = [
  "mianownik", "dopelniacz", "celownik", "biernik",
  "narzednik", "miejscownik", "wolacz",
];

export const CASE_LABELS: Record<CaseSlug, { pl: string; bg: string }> = {
  mianownik:   { pl: "Mianownik",   bg: "Именителен"  },
  dopelniacz:  { pl: "Dopełniacz",  bg: "Родителен"   },
  celownik:    { pl: "Celownik",    bg: "Дателен"     },
  biernik:     { pl: "Biernik",     bg: "Винителен"   },
  narzednik:   { pl: "Narzędnik",   bg: "Творителен"  },
  miejscownik: { pl: "Miejscownik", bg: "Местен"      },
  wolacz:      { pl: "Wołacz",      bg: "Звателен"    },
};

export type Declension = {
  lemma: string;          // dictionary form (mianownik sg.)
  gender: "m" | "f" | "n";
  bg: string;
  en: string;
  singular: Record<CaseSlug, string>;
  plural: Record<CaseSlug, string>;
};

// Paradigms — masculine, feminine, neuter, plus animate/inanimate variants
export const DECLENSIONS: Declension[] = [
  {
    lemma: "student", gender: "m", bg: "студент", en: "student",
    singular: { mianownik: "student", dopelniacz: "studenta", celownik: "studentowi", biernik: "studenta", narzednik: "studentem", miejscownik: "studencie", wolacz: "studencie" },
    plural:   { mianownik: "studenci", dopelniacz: "studentów", celownik: "studentom", biernik: "studentów", narzednik: "studentami", miejscownik: "studentach", wolacz: "studenci" },
  },
  {
    lemma: "stół", gender: "m", bg: "маса", en: "table",
    singular: { mianownik: "stół", dopelniacz: "stołu", celownik: "stołowi", biernik: "stół", narzednik: "stołem", miejscownik: "stole", wolacz: "stole" },
    plural:   { mianownik: "stoły", dopelniacz: "stołów", celownik: "stołom", biernik: "stoły", narzednik: "stołami", miejscownik: "stołach", wolacz: "stoły" },
  },
  {
    lemma: "kot", gender: "m", bg: "котка", en: "cat",
    singular: { mianownik: "kot", dopelniacz: "kota", celownik: "kotu", biernik: "kota", narzednik: "kotem", miejscownik: "kocie", wolacz: "kocie" },
    plural:   { mianownik: "koty", dopelniacz: "kotów", celownik: "kotom", biernik: "koty", narzednik: "kotami", miejscownik: "kotach", wolacz: "koty" },
  },
  {
    lemma: "kobieta", gender: "f", bg: "жена", en: "woman",
    singular: { mianownik: "kobieta", dopelniacz: "kobiety", celownik: "kobiecie", biernik: "kobietę", narzednik: "kobietą", miejscownik: "kobiecie", wolacz: "kobieto" },
    plural:   { mianownik: "kobiety", dopelniacz: "kobiet", celownik: "kobietom", biernik: "kobiety", narzednik: "kobietami", miejscownik: "kobietach", wolacz: "kobiety" },
  },
  {
    lemma: "książka", gender: "f", bg: "книга", en: "book",
    singular: { mianownik: "książka", dopelniacz: "książki", celownik: "książce", biernik: "książkę", narzednik: "książką", miejscownik: "książce", wolacz: "książko" },
    plural:   { mianownik: "książki", dopelniacz: "książek", celownik: "książkom", biernik: "książki", narzednik: "książkami", miejscownik: "książkach", wolacz: "książki" },
  },
  {
    lemma: "noc", gender: "f", bg: "нощ", en: "night",
    singular: { mianownik: "noc", dopelniacz: "nocy", celownik: "nocy", biernik: "noc", narzednik: "nocą", miejscownik: "nocy", wolacz: "nocy" },
    plural:   { mianownik: "noce", dopelniacz: "nocy", celownik: "nocom", biernik: "noce", narzednik: "nocami", miejscownik: "nocach", wolacz: "noce" },
  },
  {
    lemma: "okno", gender: "n", bg: "прозорец", en: "window",
    singular: { mianownik: "okno", dopelniacz: "okna", celownik: "oknu", biernik: "okno", narzednik: "oknem", miejscownik: "oknie", wolacz: "okno" },
    plural:   { mianownik: "okna", dopelniacz: "okien", celownik: "oknom", biernik: "okna", narzednik: "oknami", miejscownik: "oknach", wolacz: "okna" },
  },
  {
    lemma: "dziecko", gender: "n", bg: "дете", en: "child",
    singular: { mianownik: "dziecko", dopelniacz: "dziecka", celownik: "dziecku", biernik: "dziecko", narzednik: "dzieckiem", miejscownik: "dziecku", wolacz: "dziecko" },
    plural:   { mianownik: "dzieci", dopelniacz: "dzieci", celownik: "dzieciom", biernik: "dzieci", narzednik: "dziećmi", miejscownik: "dzieciach", wolacz: "dzieci" },
  },
  {
    lemma: "imię", gender: "n", bg: "име", en: "name",
    singular: { mianownik: "imię", dopelniacz: "imienia", celownik: "imieniu", biernik: "imię", narzednik: "imieniem", miejscownik: "imieniu", wolacz: "imię" },
    plural:   { mianownik: "imiona", dopelniacz: "imion", celownik: "imionom", biernik: "imiona", narzednik: "imionami", miejscownik: "imionach", wolacz: "imiona" },
  },
];

// ── Conjugation ─────────────────────────────────────────────────────────

export type ConjugationGroup = "I" | "II" | "III" | "IV";

export const PRONOUNS = ["ja", "ty", "on/ona/ono", "my", "wy", "oni/one"] as const;
export type Pronoun = typeof PRONOUNS[number];

export type ConjVerb = {
  infinitive: string;
  bg: string;
  en: string;
  group: ConjugationGroup;
  aspect: "imperf" | "perf";
  pair?: string; // aspect pair (perfective ↔ imperfective)
  present: Record<Pronoun, string>;
  past_m_sg: string;       // past tense, masculine singular ("ja")
  future_he?: string;      // future 3sg (perfective form)
};

export const CONJUGATION_GROUPS: Record<ConjugationGroup, { name: string; pattern: string; bg: string }> = {
  I:   { name: "Group I — -ę / -esz",   pattern: "pisać → piszę, piszesz, pisze",       bg: "Глаголи на -ować, -ywać, -ąć, -nąć." },
  II:  { name: "Group II — -ę / -isz",  pattern: "mówić → mówię, mówisz, mówi",         bg: "Глаголи на -ić / -yć." },
  III: { name: "Group III — -am / -asz", pattern: "czytać → czytam, czytasz, czyta",    bg: "Глаголи на -ać." },
  IV:  { name: "Group IV — -em / -esz", pattern: "umieć → umiem, umiesz, umie",         bg: "Малка група, -eć." },
};

export const CONJ_VERBS: ConjVerb[] = [
  {
    infinitive: "być", bg: "съм", en: "to be", group: "I", aspect: "imperf",
    present: { "ja":"jestem", "ty":"jesteś", "on/ona/ono":"jest", "my":"jesteśmy", "wy":"jesteście", "oni/one":"są" },
    past_m_sg: "byłem",
  },
  {
    infinitive: "mieć", bg: "имам", en: "to have", group: "III", aspect: "imperf",
    present: { "ja":"mam", "ty":"masz", "on/ona/ono":"ma", "my":"mamy", "wy":"macie", "oni/one":"mają" },
    past_m_sg: "miałem",
  },
  {
    infinitive: "czytać", bg: "чета", en: "to read", group: "III", aspect: "imperf", pair: "przeczytać",
    present: { "ja":"czytam", "ty":"czytasz", "on/ona/ono":"czyta", "my":"czytamy", "wy":"czytacie", "oni/one":"czytają" },
    past_m_sg: "czytałem",
  },
  {
    infinitive: "pisać", bg: "пиша", en: "to write", group: "I", aspect: "imperf", pair: "napisać",
    present: { "ja":"piszę", "ty":"piszesz", "on/ona/ono":"pisze", "my":"piszemy", "wy":"piszecie", "oni/one":"piszą" },
    past_m_sg: "pisałem",
  },
  {
    infinitive: "mówić", bg: "говоря", en: "to speak", group: "II", aspect: "imperf", pair: "powiedzieć",
    present: { "ja":"mówię", "ty":"mówisz", "on/ona/ono":"mówi", "my":"mówimy", "wy":"mówicie", "oni/one":"mówią" },
    past_m_sg: "mówiłem",
  },
  {
    infinitive: "robić", bg: "правя", en: "to do/make", group: "II", aspect: "imperf", pair: "zrobić",
    present: { "ja":"robię", "ty":"robisz", "on/ona/ono":"robi", "my":"robimy", "wy":"robicie", "oni/one":"robią" },
    past_m_sg: "robiłem",
  },
  {
    infinitive: "iść", bg: "вървя", en: "to go (on foot)", group: "I", aspect: "imperf", pair: "pójść",
    present: { "ja":"idę", "ty":"idziesz", "on/ona/ono":"idzie", "my":"idziemy", "wy":"idziecie", "oni/one":"idą" },
    past_m_sg: "szedłem",
  },
  {
    infinitive: "jechać", bg: "пътувам", en: "to travel", group: "I", aspect: "imperf", pair: "pojechać",
    present: { "ja":"jadę", "ty":"jedziesz", "on/ona/ono":"jedzie", "my":"jedziemy", "wy":"jedziecie", "oni/one":"jadą" },
    past_m_sg: "jechałem",
  },
  {
    infinitive: "wiedzieć", bg: "зная", en: "to know (fact)", group: "IV", aspect: "imperf",
    present: { "ja":"wiem", "ty":"wiesz", "on/ona/ono":"wie", "my":"wiemy", "wy":"wiecie", "oni/one":"wiedzą" },
    past_m_sg: "wiedziałem",
  },
  {
    infinitive: "rozumieć", bg: "разбирам", en: "to understand", group: "IV", aspect: "imperf", pair: "zrozumieć",
    present: { "ja":"rozumiem", "ty":"rozumiesz", "on/ona/ono":"rozumie", "my":"rozumiemy", "wy":"rozumiecie", "oni/one":"rozumieją" },
    past_m_sg: "rozumiałem",
  },
  {
    infinitive: "lubić", bg: "харесвам", en: "to like", group: "II", aspect: "imperf", pair: "polubić",
    present: { "ja":"lubię", "ty":"lubisz", "on/ona/ono":"lubi", "my":"lubimy", "wy":"lubicie", "oni/one":"lubią" },
    past_m_sg: "lubiłem",
  },
  {
    infinitive: "kochać", bg: "обичам", en: "to love", group: "III", aspect: "imperf", pair: "pokochać",
    present: { "ja":"kocham", "ty":"kochasz", "on/ona/ono":"kocha", "my":"kochamy", "wy":"kochacie", "oni/one":"kochają" },
    past_m_sg: "kochałem",
  },
  {
    infinitive: "uczyć się", bg: "уча се", en: "to study", group: "II", aspect: "imperf", pair: "nauczyć się",
    present: { "ja":"uczę się", "ty":"uczysz się", "on/ona/ono":"uczy się", "my":"uczymy się", "wy":"uczycie się", "oni/one":"uczą się" },
    past_m_sg: "uczyłem się",
  },
  {
    infinitive: "pić", bg: "пия", en: "to drink", group: "I", aspect: "imperf", pair: "wypić",
    present: { "ja":"piję", "ty":"pijesz", "on/ona/ono":"pije", "my":"pijemy", "wy":"pijecie", "oni/one":"piją" },
    past_m_sg: "piłem",
  },
  {
    infinitive: "jeść", bg: "ям", en: "to eat", group: "IV", aspect: "imperf", pair: "zjeść",
    present: { "ja":"jem", "ty":"jesz", "on/ona/ono":"je", "my":"jemy", "wy":"jecie", "oni/one":"jedzą" },
    past_m_sg: "jadłem",
  },
];

// ── Aspect pairs (imperf ↔ perf) ────────────────────────────────────────

export type AspectPair = {
  imperf: string; perf: string; bg: string; en: string;
  note: string;   // micro-explanation of the meaning shift
};

export const ASPECT_PAIRS: AspectPair[] = [
  { imperf: "czytać",   perf: "przeczytać", bg: "чета / прочета",     en: "to read / to read through",        note: "Imperfective = process. Perfective = the book finished." },
  { imperf: "pisać",    perf: "napisać",    bg: "пиша / напиша",      en: "to write / to write down",         note: "Perfective marks the act as completed." },
  { imperf: "robić",    perf: "zrobić",     bg: "правя / направя",    en: "to do / to get done",              note: "Use perfective when you want to stress the result." },
  { imperf: "mówić",    perf: "powiedzieć", bg: "говоря / кажа",      en: "to speak / to say",                note: "Suppletive pair — different roots, same aspect logic." },
  { imperf: "kupować",  perf: "kupić",      bg: "купувам / купя",     en: "to buy",                           note: "Imperfective for habits, perfective for one purchase." },
  { imperf: "uczyć się", perf: "nauczyć się", bg: "уча / науча",      en: "to study / to learn",              note: "Perfective marks mastery achieved." },
  { imperf: "iść",      perf: "pójść",      bg: "отивам / тръгвам",   en: "to go / to set off",               note: "Determinate motion verbs use prefixes for perfectivity." },
  { imperf: "pić",      perf: "wypić",      bg: "пия / изпия",        en: "to drink / to drink up",           note: "Wy- prefix often signals 'until finished'." },
  { imperf: "jeść",     perf: "zjeść",      bg: "ям / изям",          en: "to eat / to eat up",               note: "Z- here means: the food is gone." },
];

// ── Verbs that govern specific cases / prepositions ─────────────────────

export type VerbGov = {
  verb: string; bg: string; en: string;
  governs: { case: CaseSlug; prep?: string; note: string }[];
  example: { pl: string; bg: string };
};

export const VERB_GOVERNANCE: VerbGov[] = [
  { verb: "szukać", bg: "търся", en: "to look for",
    governs: [{ case: "dopelniacz", note: "Direct object always in genitive." }],
    example: { pl: "Szukam pracy.", bg: "Търся работа." } },
  { verb: "potrzebować", bg: "нуждая се от", en: "to need",
    governs: [{ case: "dopelniacz", note: "Object in genitive." }],
    example: { pl: "Potrzebuję czasu.", bg: "Нуждая се от време." } },
  { verb: "pomagać", bg: "помагам", en: "to help",
    governs: [{ case: "celownik", note: "Person helped in dative." }],
    example: { pl: "Pomagam mamie.", bg: "Помагам на мама." } },
  { verb: "dziękować", bg: "благодаря", en: "to thank",
    governs: [{ case: "celownik", prep: "za + biernik", note: "Person dative; thing thanked for + accusative." }],
    example: { pl: "Dziękuję ci za prezent.", bg: "Благодаря ти за подаръка." } },
  { verb: "interesować się", bg: "интересувам се", en: "to be interested in",
    governs: [{ case: "narzednik", note: "Topic in instrumental." }],
    example: { pl: "Interesuję się literaturą.", bg: "Интересувам се от литература." } },
  { verb: "być", bg: "съм", en: "to be (a profession)",
    governs: [{ case: "narzednik", note: "Profession or role in instrumental." }],
    example: { pl: "Jestem studentem filologii.", bg: "Аз съм студент по филология." } },
  { verb: "mieszkać", bg: "живея", en: "to live (somewhere)",
    governs: [{ case: "miejscownik", prep: "w / na", note: "Place in locative after w/na." }],
    example: { pl: "Mieszkam w Krakowie.", bg: "Живея в Краков." } },
  { verb: "myśleć", bg: "мисля", en: "to think",
    governs: [{ case: "miejscownik", prep: "o", note: "Topic in locative after o." }],
    example: { pl: "Myślę o tobie.", bg: "Мисля за теб." } },
  { verb: "czekać", bg: "чакам", en: "to wait",
    governs: [{ case: "biernik", prep: "na", note: "Person/thing awaited after na + accusative." }],
    example: { pl: "Czekam na autobus.", bg: "Чакам автобуса." } },
  { verb: "iść", bg: "отивам", en: "to go",
    governs: [{ case: "biernik", prep: "do (+ dop.) / na", note: "Direction: do + genitive, na + accusative." }],
    example: { pl: "Idę na uniwersytet.", bg: "Отивам в университета." } },
  { verb: "bać się", bg: "страхувам се", en: "to fear",
    governs: [{ case: "dopelniacz", note: "Object feared in genitive." }],
    example: { pl: "Boję się burzy.", bg: "Страхувам се от буря." } },
  { verb: "słuchać", bg: "слушам", en: "to listen",
    governs: [{ case: "dopelniacz", note: "Object listened to in genitive." }],
    example: { pl: "Słucham muzyki.", bg: "Слушам музика." } },
  { verb: "uczyć się", bg: "уча (нещо)", en: "to study (a subject)",
    governs: [{ case: "dopelniacz", note: "Subject studied in genitive." }],
    example: { pl: "Uczę się polskiego.", bg: "Уча полски." } },
  { verb: "życzyć", bg: "пожелавам", en: "to wish",
    governs: [{ case: "celownik", note: "Person wished + genitive of thing." }],
    example: { pl: "Życzę ci szczęścia.", bg: "Пожелавам ти щастие." } },
  { verb: "ufać", bg: "вярвам / доверявам се", en: "to trust",
    governs: [{ case: "celownik", note: "Person trusted in dative." }],
    example: { pl: "Ufam mojej siostrze.", bg: "Вярвам на сестра ми." } },
  { verb: "zajmować się", bg: "занимавам се с", en: "to deal with",
    governs: [{ case: "narzednik", note: "Activity in instrumental." }],
    example: { pl: "Zajmuję się filologią.", bg: "Занимавам се с филология." } },
  { verb: "rozmawiać", bg: "разговарям", en: "to talk",
    governs: [{ case: "narzednik", prep: "z", note: "Person spoken with: z + instrumental." }, { case: "miejscownik", prep: "o", note: "Topic: o + locative." }],
    example: { pl: "Rozmawiam z mamą o szkole.", bg: "Разговарям с мама за училище." } },
  { verb: "patrzeć", bg: "гледам", en: "to look at",
    governs: [{ case: "biernik", prep: "na", note: "Object looked at: na + accusative." }],
    example: { pl: "Patrzę na zachód słońca.", bg: "Гледам залеза." } },
  { verb: "pytać", bg: "питам", en: "to ask",
    governs: [{ case: "biernik", prep: "o", note: "Topic asked about: o + accusative." }],
    example: { pl: "Pytam o drogę.", bg: "Питам за пътя." } },
  { verb: "wracać", bg: "връщам се", en: "to return",
    governs: [{ case: "dopelniacz", prep: "do / z", note: "Direction with do/z + genitive." }],
    example: { pl: "Wracam z uniwersytetu.", bg: "Връщам се от университета." } },
  { verb: "zapomnieć", bg: "забравям", en: "to forget",
    governs: [{ case: "miejscownik", prep: "o", note: "Topic forgotten: o + locative." }],
    example: { pl: "Zapomniałem o spotkaniu.", bg: "Забравих за срещата." } },
];
