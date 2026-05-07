export type WordCategory =
  | "Greetings"
  | "Food"
  | "Travel"
  | "Family"
  | "Verbs"
  | "Nouns"
  | "Adjectives"
  | "Phrases"
  | "University"
  | "Emotions"
  | "Daily speech"
  | "Time";

export type Gender = "m" | "f" | "n" | "—";
export type PartOfSpeech = "noun" | "verb" | "adjective" | "phrase" | "adverb";

export type Word = {
  id: string;
  pl: string;
  bg: string;
  en: string;
  pronunciation: string;
  pos: PartOfSpeech;
  gender: Gender;
  plural: string;
  example: { pl: string; bg: string };
  category: WordCategory;
  difficulty: "A1" | "A2" | "B1" | "B2";
};

const w = (
  id: string,
  pl: string,
  bg: string,
  en: string,
  pronunciation: string,
  pos: PartOfSpeech,
  gender: Gender,
  plural: string,
  examplePl: string,
  exampleBg: string,
  category: WordCategory,
  difficulty: Word["difficulty"],
): Word => ({
  id, pl, bg, en, pronunciation, pos, gender, plural,
  example: { pl: examplePl, bg: exampleBg }, category, difficulty,
});

export const WORDS: Word[] = [
  // Greetings
  w("1", "dzień dobry", "добър ден", "good day", "djen DOH-bri", "phrase", "—", "—", "Dzień dobry, jak się masz?", "Добър ден, как си?", "Greetings", "A1"),
  w("2", "dziękuję", "благодаря", "thank you", "djen-KOO-yeh", "phrase", "—", "—", "Dziękuję bardzo!", "Много благодаря!", "Greetings", "A1"),
  w("3", "do widzenia", "довиждане", "goodbye", "doh vee-DZEH-nya", "phrase", "—", "—", "Do widzenia, do jutra!", "Довиждане, до утре!", "Greetings", "A1"),
  w("4", "cześć", "здравей", "hi / bye", "tcheshch", "phrase", "—", "—", "Cześć, co słychać?", "Здравей, какво ново?", "Greetings", "A1"),
  w("5", "przepraszam", "извинявай", "sorry / excuse me", "psheh-PRAH-shahm", "phrase", "—", "—", "Przepraszam za spóźnienie.", "Извинявай за закъснението.", "Greetings", "A1"),

  // Nouns — Food
  w("10", "chleb", "хляб", "bread", "khlep", "noun", "m", "chleby", "Kupuję świeży chleb.", "Купувам свеж хляб.", "Food", "A1"),
  w("11", "kawa", "кафе", "coffee", "KAH-vah", "noun", "f", "kawy", "Poproszę kawę z mlekiem.", "Моля, кафе с мляко.", "Food", "A1"),
  w("12", "woda", "вода", "water", "VOH-dah", "noun", "f", "wody", "Piję dużo wody.", "Пия много вода.", "Food", "A1"),
  w("13", "jabłko", "ябълка", "apple", "YAHP-koh", "noun", "n", "jabłka", "Jem czerwone jabłko.", "Ям червена ябълка.", "Food", "A1"),
  w("14", "ser", "сирене", "cheese", "ser", "noun", "m", "sery", "Lubię polski ser.", "Харесвам полско сирене.", "Food", "A1"),
  w("15", "zupa", "супа", "soup", "ZOO-pah", "noun", "f", "zupy", "Zupa pomidorowa jest pyszna.", "Доматената супа е вкусна.", "Food", "A1"),

  // Nouns — Travel
  w("20", "pociąg", "влак", "train", "POH-chonk", "noun", "m", "pociągi", "Pociąg odjeżdża o ósmej.", "Влакът тръгва в осем.", "Travel", "A2"),
  w("21", "lotnisko", "летище", "airport", "lot-NEE-skoh", "noun", "n", "lotniska", "Jadę na lotnisko.", "Отивам на летището.", "Travel", "A2"),
  w("22", "bilet", "билет", "ticket", "BEE-let", "noun", "m", "bilety", "Kupiłem bilet do Krakowa.", "Купих билет за Краков.", "Travel", "A1"),
  w("23", "mapa", "карта", "map", "MAH-pah", "noun", "f", "mapy", "Patrzę na mapę miasta.", "Гледам картата на града.", "Travel", "A1"),
  w("24", "hotel", "хотел", "hotel", "HOH-tel", "noun", "m", "hotele", "Hotel jest blisko centrum.", "Хотелът е близо до центъра.", "Travel", "A1"),

  // Nouns — Family
  w("30", "rodzina", "семейство", "family", "roh-DJEE-nah", "noun", "f", "rodziny", "Moja rodzina jest duża.", "Моето семейство е голямо.", "Family", "A1"),
  w("31", "matka", "майка", "mother", "MAHT-kah", "noun", "f", "matki", "Moja matka jest nauczycielką.", "Майка ми е учителка.", "Family", "A1"),
  w("32", "ojciec", "баща", "father", "OY-chets", "noun", "m", "ojcowie", "Ojciec pracuje w biurze.", "Баща ми работи в офис.", "Family", "A1"),
  w("33", "siostra", "сестра", "sister", "SHOS-trah", "noun", "f", "siostry", "Mam młodszą siostrę.", "Имам по-малка сестра.", "Family", "A1"),
  w("34", "brat", "брат", "brother", "braht", "noun", "m", "bracia", "Mój brat studiuje prawo.", "Брат ми учи право.", "Family", "A1"),

  // University
  w("40", "uniwersytet", "университет", "university", "oo-nee-ver-SI-tet", "noun", "m", "uniwersytety", "Studiuję na uniwersytecie.", "Уча в университета.", "University", "A2"),
  w("41", "wykład", "лекция", "lecture", "VI-kwahd", "noun", "m", "wykłady", "Mam wykład o dziewiątej.", "Имам лекция в девет.", "University", "A2"),
  w("42", "egzamin", "изпит", "exam", "eg-ZAH-meen", "noun", "m", "egzaminy", "Jutro mam egzamin.", "Утре имам изпит.", "University", "A2"),
  w("43", "książka", "книга", "book", "KSHONZH-kah", "noun", "f", "książki", "Czytam ciekawą książkę.", "Чета интересна книга.", "University", "A1"),
  w("44", "biblioteka", "библиотека", "library", "beeb-lyo-TEH-kah", "noun", "f", "biblioteki", "Idę do biblioteki.", "Отивам в библиотеката.", "University", "A2"),
  w("45", "student", "студент", "student", "STOO-dent", "noun", "m", "studenci", "Jestem studentem filologii.", "Аз съм студент по филология.", "University", "A1"),

  // Emotions
  w("50", "miłość", "любов", "love", "MEE-woshch", "noun", "f", "—", "Miłość jest ważna.", "Любовта е важна.", "Emotions", "B1"),
  w("51", "radość", "радост", "joy", "RAH-doshch", "noun", "f", "—", "Czuję wielką radość.", "Изпитвам голяма радост.", "Emotions", "A2"),
  w("52", "smutek", "тъга", "sadness", "SMOO-tek", "noun", "m", "—", "Smutek mija powoli.", "Тъгата отминава бавно.", "Emotions", "B1"),
  w("53", "strach", "страх", "fear", "strakh", "noun", "m", "—", "Strach paraliżuje.", "Страхът парализира.", "Emotions", "B1"),
  w("54", "spokój", "спокойствие", "calm", "SPOH-kooy", "noun", "m", "—", "Szukam spokoju w książkach.", "Търся спокойствие в книгите.", "Emotions", "B1"),

  // Adjectives
  w("60", "dobry", "добър", "good", "DOB-ri", "adjective", "m", "dobrzy", "To jest dobry pomysł.", "Това е добра идея.", "Adjectives", "A1"),
  w("61", "piękny", "красив", "beautiful", "PYENK-ni", "adjective", "m", "piękni", "Piękny zachód słońca.", "Красив залез.", "Adjectives", "A2"),
  w("62", "ciekawy", "интересен", "interesting", "chye-KAH-vi", "adjective", "m", "ciekawi", "Ciekawy artykuł.", "Интересна статия.", "Adjectives", "A2"),
  w("63", "trudny", "труден", "difficult", "TROOD-ni", "adjective", "m", "trudni", "Język polski jest trudny.", "Полският език е труден.", "Adjectives", "A2"),
  w("64", "mądry", "умен", "wise / clever", "MOND-ri", "adjective", "m", "mądrzy", "Mądry student dużo czyta.", "Умният студент чете много.", "Adjectives", "B1"),

  // Verbs
  w("70", "rozumieć", "разбирам", "to understand", "roh-ZOO-myech", "verb", "—", "—", "Czy rozumiesz po polsku?", "Разбираш ли полски?", "Verbs", "A2"),
  w("71", "uczyć się", "уча се", "to study", "OO-chich sheh", "verb", "—", "—", "Uczę się polskiego.", "Уча полски.", "Verbs", "A2"),
  w("72", "czytać", "чета", "to read", "CHI-tach", "verb", "—", "—", "Czytam każdego wieczoru.", "Чета всяка вечер.", "Verbs", "A1"),
  w("73", "pisać", "пиша", "to write", "PEE-sach", "verb", "—", "—", "Piszę list do przyjaciela.", "Пиша писмо на приятел.", "Verbs", "A1"),
  w("74", "mówić", "говоря", "to speak", "MOO-veech", "verb", "—", "—", "Mówię trochę po polsku.", "Говоря малко полски.", "Verbs", "A1"),
  w("75", "myśleć", "мисля", "to think", "MISH-letch", "verb", "—", "—", "Myślę o tobie.", "Мисля за теб.", "Verbs", "A2"),
  w("76", "być", "съм / бъда", "to be", "bich", "verb", "—", "—", "Jestem studentem.", "Аз съм студент.", "Verbs", "A1"),
  w("77", "mieć", "имам", "to have", "myech", "verb", "—", "—", "Mam dwa koty.", "Имам две котки.", "Verbs", "A1"),

  // Phrases / Daily speech
  w("80", "nie wiem", "не знам", "I don't know", "nyeh vyem", "phrase", "—", "—", "Nie wiem, gdzie to jest.", "Не знам къде е това.", "Phrases", "A1"),
  w("81", "jak się masz?", "как си?", "how are you?", "yak sheh mash", "phrase", "—", "—", "Cześć, jak się masz dzisiaj?", "Здравей, как си днес?", "Phrases", "A1"),
  w("82", "do zobaczenia", "до скоро", "see you", "doh zoh-bah-CHEH-nya", "phrase", "—", "—", "Do zobaczenia w piątek!", "До скоро в петък!", "Phrases", "A1"),
  w("83", "smacznego", "добър апетит", "bon appétit", "smatch-NEH-goh", "phrase", "—", "—", "Smacznego, drodzy goście!", "Добър апетит, скъпи гости!", "Daily speech", "A1"),
  w("84", "na zdrowie", "наздраве", "cheers / bless you", "nah ZDROH-vyeh", "phrase", "—", "—", "Na zdrowie i sto lat!", "Наздраве и сто години!", "Daily speech", "A1"),
  w("85", "oczywiście", "разбира се", "of course", "oh-chi-VEESH-cheh", "adverb", "—", "—", "Oczywiście, że pomogę.", "Разбира се, че ще помогна.", "Daily speech", "A2"),

  // Time
  w("90", "wczoraj", "вчера", "yesterday", "VCHOH-rye", "adverb", "—", "—", "Wczoraj padał deszcz.", "Вчера валеше дъжд.", "Time", "A2"),
  w("91", "dzisiaj", "днес", "today", "DJEE-shay", "adverb", "—", "—", "Dzisiaj jest piątek.", "Днес е петък.", "Time", "A1"),
  w("92", "jutro", "утре", "tomorrow", "YOO-troh", "adverb", "—", "—", "Jutro mam egzamin.", "Утре имам изпит.", "Time", "A1"),
];

export const CATEGORIES: WordCategory[] = [
  "Greetings", "Phrases", "Daily speech", "Nouns", "Verbs", "Adjectives",
  "Food", "Travel", "Family", "University", "Emotions", "Time",
];

export const WORD_OF_DAY: Word = WORDS.find((x) => x.id === "50")!;

// Conjugation tables for the conjugation challenge
export type ConjugationRow = {
  infinitive: string;
  bg: string;
  en: string;
  forms: { ja: string; ty: string; on: string; my: string; wy: string; oni: string };
};

export const CONJUGATIONS: ConjugationRow[] = [
  { infinitive: "być", bg: "съм", en: "to be",
    forms: { ja: "jestem", ty: "jesteś", on: "jest", my: "jesteśmy", wy: "jesteście", oni: "są" } },
  { infinitive: "mieć", bg: "имам", en: "to have",
    forms: { ja: "mam", ty: "masz", on: "ma", my: "mamy", wy: "macie", oni: "mają" } },
  { infinitive: "czytać", bg: "чета", en: "to read",
    forms: { ja: "czytam", ty: "czytasz", on: "czyta", my: "czytamy", wy: "czytacie", oni: "czytają" } },
  { infinitive: "pisać", bg: "пиша", en: "to write",
    forms: { ja: "piszę", ty: "piszesz", on: "pisze", my: "piszemy", wy: "piszecie", oni: "piszą" } },
  { infinitive: "mówić", bg: "говоря", en: "to speak",
    forms: { ja: "mówię", ty: "mówisz", on: "mówi", my: "mówimy", wy: "mówicie", oni: "mówią" } },
  { infinitive: "rozumieć", bg: "разбирам", en: "to understand",
    forms: { ja: "rozumiem", ty: "rozumiesz", on: "rozumie", my: "rozumiemy", wy: "rozumiecie", oni: "rozumieją" } },
];

// Sentences for the sentence-builder
export type SentencePuzzle = {
  id: string;
  pl: string[]; // correct order
  bg: string;
  en: string;
};

export const SENTENCES: SentencePuzzle[] = [
  { id: "s1", pl: ["Uczę", "się", "języka", "polskiego"], bg: "Уча полски език.", en: "I am learning the Polish language." },
  { id: "s2", pl: ["Czytam", "ciekawą", "książkę", "wieczorem"], bg: "Чета интересна книга вечер.", en: "I read an interesting book in the evening." },
  { id: "s3", pl: ["Moja", "siostra", "mieszka", "w", "Krakowie"], bg: "Сестра ми живее в Краков.", en: "My sister lives in Kraków." },
  { id: "s4", pl: ["Jutro", "mam", "ważny", "egzamin"], bg: "Утре имам важен изпит.", en: "Tomorrow I have an important exam." },
  { id: "s5", pl: ["Lubię", "pić", "kawę", "z", "mlekiem"], bg: "Обичам да пия кафе с мляко.", en: "I like to drink coffee with milk." },
];
