export type Word = {
  id: string;
  pl: string;
  bg: string;
  en: string;
  pronunciation: string;
  example: { pl: string; bg: string };
  category: "Greetings" | "Food" | "Travel" | "Family" | "Verbs" | "Time";
  difficulty: "A1" | "A2" | "B1" | "B2";
};

export const WORDS: Word[] = [
  { id: "1", pl: "dzień dobry", bg: "добър ден", en: "good day", pronunciation: "djen DOH-bri",
    example: { pl: "Dzień dobry, jak się masz?", bg: "Добър ден, как си?" },
    category: "Greetings", difficulty: "A1" },
  { id: "2", pl: "dziękuję", bg: "благодаря", en: "thank you", pronunciation: "djen-KOO-yeh",
    example: { pl: "Dziękuję bardzo!", bg: "Много благодаря!" },
    category: "Greetings", difficulty: "A1" },
  { id: "3", pl: "książka", bg: "книга", en: "book", pronunciation: "KSHONZH-kah",
    example: { pl: "Czytam ciekawą książkę.", bg: "Чета интересна книга." },
    category: "Family", difficulty: "A1" },
  { id: "4", pl: "chleb", bg: "хляб", en: "bread", pronunciation: "khlep",
    example: { pl: "Kupuję świeży chleb.", bg: "Купувам свеж хляб." },
    category: "Food", difficulty: "A1" },
  { id: "5", pl: "pociąg", bg: "влак", en: "train", pronunciation: "POH-chonk",
    example: { pl: "Pociąg odjeżdża o ósmej.", bg: "Влакът тръгва в осем." },
    category: "Travel", difficulty: "A2" },
  { id: "6", pl: "rodzina", bg: "семейство", en: "family", pronunciation: "roh-DJEE-nah",
    example: { pl: "Moja rodzina jest duża.", bg: "Моето семейство е голямо." },
    category: "Family", difficulty: "A1" },
  { id: "7", pl: "rozumieć", bg: "разбирам", en: "to understand", pronunciation: "roh-ZOO-myech",
    example: { pl: "Czy rozumiesz po polsku?", bg: "Разбираш ли полски?" },
    category: "Verbs", difficulty: "A2" },
  { id: "8", pl: "wczoraj", bg: "вчера", en: "yesterday", pronunciation: "VCHOH-rye",
    example: { pl: "Wczoraj padał deszcz.", bg: "Вчера валеше дъжд." },
    category: "Time", difficulty: "A2" },
  { id: "9", pl: "kawa", bg: "кафе", en: "coffee", pronunciation: "KAH-vah",
    example: { pl: "Poproszę kawę z mlekiem.", bg: "Моля, кафе с мляко." },
    category: "Food", difficulty: "A1" },
  { id: "10", pl: "miłość", bg: "любов", en: "love", pronunciation: "MEE-woshch",
    example: { pl: "Miłość jest ważna.", bg: "Любовта е важна." },
    category: "Family", difficulty: "B1" },
  { id: "11", pl: "uczyć się", bg: "уча се", en: "to study", pronunciation: "OO-chich sheh",
    example: { pl: "Uczę się polskiego.", bg: "Уча полски." },
    category: "Verbs", difficulty: "A2" },
  { id: "12", pl: "lotnisko", bg: "летище", en: "airport", pronunciation: "lot-NEE-skoh",
    example: { pl: "Jadę na lotnisko.", bg: "Отивам на летището." },
    category: "Travel", difficulty: "A2" },
];

export const WORD_OF_DAY: Word = WORDS[9];
