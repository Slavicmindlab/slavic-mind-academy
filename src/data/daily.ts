// Daily content for the dynamic homepage: idioms, historical facts,
// literature quotes, memes, and time-based greetings.

export type Idiom = {
  pl: string;
  literal: string; // word-for-word
  meaning: string; // what it actually means (English)
  bg: string; // Bulgarian gloss
};

export const IDIOMS: Idiom[] = [
  { pl: "Nie mój cyrk, nie moje małpy.", literal: "Not my circus, not my monkeys.", meaning: "Not my problem.", bg: "Не е мой проблем." },
  { pl: "Bułka z masłem.", literal: "A roll with butter.", meaning: "Piece of cake — very easy.", bg: "Като фасул — лесно е." },
  { pl: "Rzucać grochem o ścianę.", literal: "To throw peas at a wall.", meaning: "To talk to a brick wall.", bg: "Говориш на стената." },
  { pl: "Mieć muchy w nosie.", literal: "To have flies in one's nose.", meaning: "To be in a bad mood.", bg: "В лошо настроение е." },
  { pl: "Czuć się jak ryba w wodzie.", literal: "To feel like a fish in water.", meaning: "To be in one's element.", bg: "Като риба във вода." },
  { pl: "Gdzie kucharek sześć, tam nie ma co jeść.", literal: "Where there are six cooks, there is nothing to eat.", meaning: "Too many cooks spoil the broth.", bg: "Много баби — хилаво дете." },
  { pl: "Wpaść z deszczu pod rynnę.", literal: "To fall from rain under the gutter.", meaning: "Out of the frying pan into the fire.", bg: "От трън, та на глог." },
  { pl: "Robić z igły widły.", literal: "To make a pitchfork from a needle.", meaning: "To make a mountain out of a molehill.", bg: "Правя от мухата слон." },
];

export type HistoryFact = {
  year: string;
  title: string;
  body: string;
};

export const HISTORY_FACTS: HistoryFact[] = [
  { year: "966", title: "Chrzest Polski", body: "Mieszko I accepts Christianity, anchoring Poland to Latin Europe and beginning the Piast state's recognition by the Holy See." },
  { year: "1364", title: "Akademia Krakowska", body: "Casimir III the Great founds the University of Kraków — the second university in Central Europe after Prague." },
  { year: "1410", title: "Bitwa pod Grunwaldem", body: "Combined Polish–Lithuanian forces crush the Teutonic Order at Grunwald, one of the largest battles of medieval Europe." },
  { year: "1569", title: "Unia Lubelska", body: "The Union of Lublin merges Poland and Lithuania into the Polish–Lithuanian Commonwealth, a near-million-square-kilometer republic." },
  { year: "1791", title: "Konstytucja 3 Maja", body: "Europe's first modern codified constitution is adopted in Warsaw — only the second in the world after the U.S." },
  { year: "1918", title: "Niepodległość", body: "After 123 years of partition by Russia, Prussia, and Austria, Poland regains independence on 11 November." },
  { year: "1980", title: "Solidarność", body: "Workers at the Gdańsk shipyard, led by Lech Wałęsa, found Solidarność — the first independent trade union in the Soviet bloc." },
  { year: "1989", title: "Wolne wybory", body: "Partially free elections in June 1989 end communist rule in Poland and trigger the fall of regimes across Central Europe." },
];

export type LiteratureQuote = {
  pl: string;
  en: string;
  author: string;
  work: string;
};

export const LITERATURE_QUOTES: LiteratureQuote[] = [
  { pl: "Litwo! Ojczyzno moja! ty jesteś jak zdrowie.", en: "Lithuania! My homeland! You are like health.", author: "Adam Mickiewicz", work: "Pan Tadeusz, 1834" },
  { pl: "Nadzieja matką głupich.", en: "Hope is the mother of fools.", author: "Polish proverb", work: "—" },
  { pl: "Człowiek jest wielki nie przez to, co posiada, lecz przez to, kim jest.", en: "A person is great not by what they possess, but by who they are.", author: "Jan Paweł II", work: "Speeches" },
  { pl: "Kto czyta książki, żyje podwójnie.", en: "Whoever reads books lives twice.", author: "Umberto Eco (PL trans.)", work: "—" },
  { pl: "Ojczyzna to wielki, zbiorowy obowiązek.", en: "The homeland is a great collective duty.", author: "Cyprian Kamil Norwid", work: "Memoriał o Młodej Emigracji" },
  { pl: "Wszystko mi mówi, że mnie ktoś pokochał.", en: "Everything tells me that someone has loved me.", author: "Adam Asnyk", work: "Między nami nic nie było" },
];

export type Meme = {
  pl: string;
  en: string;
  vibe: string;
};

export const MEMES: Meme[] = [
  { pl: "— Jak leci? — Po staremu.", en: "— How's it going? — Same old.", vibe: "The national mood, in two lines." },
  { pl: "Życie nie jest bajką. Jest paragonem z Biedronki.", en: "Life isn't a fairy tale. It's a receipt from Biedronka.", vibe: "Polish-supermarket existentialism." },
  { pl: "Pan dzwoni z Bangladeszu? Nie, dziękuję.", en: "Sir, calling from Bangladesh? No thanks.", vibe: "Every scam-call victim ever." },
  { pl: "Niedziela handlowa? A co to za stwór?", en: "Trading Sunday? What kind of creature is that?", vibe: "Post-2018 shopping ban energy." },
  { pl: "Janusz biznesu zatwierdza.", en: "Janusz of business approves.", vibe: "The patron saint of cutting corners." },
];

export type Greeting = {
  pl: string;
  bg: string;
  en: string;
  ru: string;
  cs: string;
};

export type DayPhase = "morning" | "afternoon" | "evening" | "night";

export const GREETINGS: Record<DayPhase, Greeting> = {
  morning:   { pl: "Dzień dobry",  bg: "Добро утро", en: "Good morning", ru: "Доброе утро", cs: "Dobré ráno" },
  afternoon: { pl: "Dzień dobry",  bg: "Добър ден",  en: "Good day",     ru: "Добрый день", cs: "Dobrý den" },
  evening:   { pl: "Dobry wieczór", bg: "Добър вечер", en: "Good evening", ru: "Добрый вечер", cs: "Dobrý večer" },
  night:     { pl: "Dobranoc",     bg: "Лека нощ",   en: "Good night",   ru: "Спокойной ночи", cs: "Dobrou noc" },
};

export function getDayPhase(hour: number): DayPhase {
  if (hour < 5) return "night";
  if (hour < 12) return "morning";
  if (hour < 18) return "afternoon";
  if (hour < 22) return "evening";
  return "night";
}

export const PHASE_LABEL: Record<DayPhase, string> = {
  morning: "Poranek",
  afternoon: "Popołudnie",
  evening: "Wieczór",
  night: "Noc",
};

export const PHASE_TAGLINE: Record<DayPhase, string> = {
  morning: "Zacznij dzień od jednego nowego słowa.",
  afternoon: "Krótka przerwa, jedno ćwiczenie — i wracasz silniejszy.",
  evening: "Czas na spokojną lekturę i ulubione słówka.",
  night: "Wycisz się przy słowiańskiej legendzie.",
};

export const RECOMMENDED_PATH: Record<DayPhase, { title: string; href: string; reason: string }> = {
  morning:   { title: "Słowo dnia + Mianownik drill", href: "/grammar/cases/mianownik", reason: "Świeży umysł — najlepszy moment na nową gramatykę." },
  afternoon: { title: "Mind Game: Crossword", href: "/games/crossword", reason: "Aktywne przypomnienie słownictwa w 5 minut." },
  evening:   { title: "Case Quest — kolejne królestwo", href: "/quest", reason: "Jedno królestwo, jedna walka, jeden poziom." },
  night:     { title: "Słowiańska legenda", href: "/stories", reason: "Krótka historia z folkloru — czytanie przed snem." },
};
