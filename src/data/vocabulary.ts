export type WordCategory =
  | "Greetings"
  | "Phrases"
  | "Daily speech"
  | "Slang"
  | "Literature"
  | "Verbs"
  | "Adjectives"
  | "Adverbs"
  | "Food"
  | "Drinks"
  | "Travel"
  | "Transportation"
  | "Family"
  | "University"
  | "Jobs"
  | "Emotions"
  | "Time"
  | "Colors"
  | "Animals"
  | "Pets"
  | "Clothing"
  | "Technology"
  | "Body"
  | "Weather"
  | "Nature"
  | "Idioms"
  | "Jokes"
  | "Memes"
  | "Internet"
  | "Cultural"
  | "School"
  | "Music"
  | "Poetry";

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
  pron: string,
  pos: PartOfSpeech,
  gender: Gender,
  plural: string,
  ex_pl: string,
  ex_bg: string,
  cat: WordCategory,
  diff: Word["difficulty"],
): Word => ({ id, pl, bg, en, pronunciation: pron, pos, gender, plural, example: { pl: ex_pl, bg: ex_bg }, category: cat, difficulty: diff });

export const WORDS: Word[] = [
  // Greetings
  w("g1", "dzień dobry", "добър ден", "good day", "djen DOH-bri", "phrase", "—", "—", "Dzień dobry, jak się masz?", "Добър ден, как си?", "Greetings", "A1"),
  w("g2", "dziękuję", "благодаря", "thank you", "djen-KOO-yeh", "phrase", "—", "—", "Dziękuję bardzo!", "Много благодаря!", "Greetings", "A1"),
  w("g3", "do widzenia", "довиждане", "goodbye", "doh vee-DZEH-nya", "phrase", "—", "—", "Do widzenia, do jutra!", "Довиждане, до утре!", "Greetings", "A1"),
  w("g4", "cześć", "здравей", "hi / bye", "tcheshch", "phrase", "—", "—", "Cześć, co słychać?", "Здравей, какво ново?", "Greetings", "A1"),
  w("g5", "przepraszam", "извинявай", "sorry / excuse me", "psheh-PRAH-shahm", "phrase", "—", "—", "Przepraszam za spóźnienie.", "Извинявай за закъснението.", "Greetings", "A1"),
  w("g6", "dobry wieczór", "добър вечер", "good evening", "DOH-bri vye-CHOOR", "phrase", "—", "—", "Dobry wieczór, państwu.", "Добър вечер, дами и господа.", "Greetings", "A1"),
  w("g7", "dobranoc", "лека нощ", "good night", "doh-BRAH-nots", "phrase", "—", "—", "Dobranoc, śpij dobrze.", "Лека нощ, спи добре.", "Greetings", "A1"),
  w("g8", "miło mi", "приятно ми е", "nice to meet you", "MEE-woh mee", "phrase", "—", "—", "Miło mi cię poznać.", "Приятно ми е да се запознаем.", "Greetings", "A1"),

  // Food
  w("f1", "chleb", "хляб", "bread", "khlep", "noun", "m", "chleby", "Kupuję świeży chleb.", "Купувам свеж хляб.", "Food", "A1"),
  w("f2", "ser", "сирене", "cheese", "ser", "noun", "m", "sery", "Lubię polski ser.", "Харесвам полско сирене.", "Food", "A1"),
  w("f3", "zupa", "супа", "soup", "ZOO-pah", "noun", "f", "zupy", "Zupa pomidorowa jest pyszna.", "Доматената супа е вкусна.", "Food", "A1"),
  w("f4", "jabłko", "ябълка", "apple", "YAHP-koh", "noun", "n", "jabłka", "Jem czerwone jabłko.", "Ям червена ябълка.", "Food", "A1"),
  w("f5", "mięso", "месо", "meat", "MYEN-soh", "noun", "n", "mięsa", "Nie jem mięsa.", "Не ям месо.", "Food", "A2"),
  w("f6", "ryba", "риба", "fish", "RI-bah", "noun", "f", "ryby", "Świeża ryba na obiad.", "Прясна риба за обяд.", "Food", "A1"),
  w("f7", "pierogi", "пироги", "dumplings", "pye-ROH-gee", "noun", "—", "—", "Pierogi z serem i ziemniakami.", "Пироги със сирене и картофи.", "Food", "A1"),
  w("f8", "kanapka", "сандвич", "sandwich", "kah-NAHP-kah", "noun", "f", "kanapki", "Robię kanapkę.", "Правя си сандвич.", "Food", "A1"),
  w("f9", "owoc", "плод", "fruit", "OH-vots", "noun", "m", "owoce", "Owoce są zdrowe.", "Плодовете са здравословни.", "Food", "A2"),
  w("f10", "warzywo", "зеленчук", "vegetable", "vah-ZHI-voh", "noun", "n", "warzywa", "Lubię świeże warzywa.", "Харесвам свежи зеленчуци.", "Food", "A2"),

  // Drinks
  w("d1", "kawa", "кафе", "coffee", "KAH-vah", "noun", "f", "kawy", "Poproszę kawę z mlekiem.", "Моля, кафе с мляко.", "Drinks", "A1"),
  w("d2", "herbata", "чай", "tea", "her-BAH-tah", "noun", "f", "herbaty", "Pije czarną herbatę.", "Пие черен чай.", "Drinks", "A1"),
  w("d3", "woda", "вода", "water", "VOH-dah", "noun", "f", "wody", "Piję dużo wody.", "Пия много вода.", "Drinks", "A1"),
  w("d4", "sok", "сок", "juice", "sok", "noun", "m", "soki", "Sok pomarańczowy, proszę.", "Портокалов сок, моля.", "Drinks", "A1"),
  w("d5", "mleko", "мляко", "milk", "MLEH-koh", "noun", "n", "—", "Mleko w lodówce.", "Млякото в хладилника.", "Drinks", "A1"),
  w("d6", "piwo", "бира", "beer", "PEE-voh", "noun", "n", "piwa", "Polskie piwo jest dobre.", "Полската бира е добра.", "Drinks", "A1"),
  w("d7", "wino", "вино", "wine", "VEE-noh", "noun", "n", "wina", "Czerwone wino do kolacji.", "Червено вино за вечеря.", "Drinks", "A2"),

  // Travel
  w("tr1", "lotnisko", "летище", "airport", "lot-NEE-skoh", "noun", "n", "lotniska", "Jadę na lotnisko.", "Отивам на летището.", "Travel", "A2"),
  w("tr2", "bilet", "билет", "ticket", "BEE-let", "noun", "m", "bilety", "Kupiłem bilet do Krakowa.", "Купих билет за Краков.", "Travel", "A1"),
  w("tr3", "mapa", "карта", "map", "MAH-pah", "noun", "f", "mapy", "Patrzę na mapę miasta.", "Гледам картата на града.", "Travel", "A1"),
  w("tr4", "hotel", "хотел", "hotel", "HOH-tel", "noun", "m", "hotele", "Hotel jest blisko centrum.", "Хотелът е близо до центъра.", "Travel", "A1"),
  w("tr5", "podróż", "пътуване", "trip", "POH-droozh", "noun", "f", "podróże", "Lubię długie podróże.", "Обичам дълги пътувания.", "Travel", "A2"),
  w("tr6", "walizka", "куфар", "suitcase", "vah-LEEZ-kah", "noun", "f", "walizki", "Pakuję walizkę.", "Стягам куфара.", "Travel", "A1"),
  w("tr7", "paszport", "паспорт", "passport", "PASH-port", "noun", "m", "paszporty", "Gdzie jest mój paszport?", "Къде ми е паспортът?", "Travel", "A2"),

  // Transportation
  w("tp1", "pociąg", "влак", "train", "POH-chonk", "noun", "m", "pociągi", "Pociąg odjeżdża o ósmej.", "Влакът тръгва в осем.", "Transportation", "A2"),
  w("tp2", "samochód", "кола", "car", "sah-MOH-khood", "noun", "m", "samochody", "Mój samochód jest stary.", "Колата ми е стара.", "Transportation", "A1"),
  w("tp3", "autobus", "автобус", "bus", "ahw-TOH-boos", "noun", "m", "autobusy", "Autobus jedzie do centrum.", "Автобусът отива в центъра.", "Transportation", "A1"),
  w("tp4", "tramwaj", "трамвай", "tram", "TRAHM-vai", "noun", "m", "tramwaje", "Tramwaj numer pięć.", "Трамвай номер пет.", "Transportation", "A1"),
  w("tp5", "rower", "колело", "bike", "ROH-ver", "noun", "m", "rowery", "Jeżdżę na rowerze.", "Карам колело.", "Transportation", "A1"),
  w("tp6", "samolot", "самолет", "airplane", "sah-MOH-lot", "noun", "m", "samoloty", "Samolot do Warszawy.", "Самолет до Варшава.", "Transportation", "A2"),
  w("tp7", "metro", "метро", "subway", "MET-roh", "noun", "n", "—", "Jadę metrem.", "Пътувам с метро.", "Transportation", "A1"),

  // Family
  w("fa1", "rodzina", "семейство", "family", "roh-DJEE-nah", "noun", "f", "rodziny", "Moja rodzina jest duża.", "Моето семейство е голямо.", "Family", "A1"),
  w("fa2", "matka", "майка", "mother", "MAHT-kah", "noun", "f", "matki", "Moja matka jest nauczycielką.", "Майка ми е учителка.", "Family", "A1"),
  w("fa3", "ojciec", "баща", "father", "OY-chets", "noun", "m", "ojcowie", "Ojciec pracuje w biurze.", "Баща ми работи в офис.", "Family", "A1"),
  w("fa4", "siostra", "сестра", "sister", "SHOS-trah", "noun", "f", "siostry", "Mam młodszą siostrę.", "Имам по-малка сестра.", "Family", "A1"),
  w("fa5", "brat", "брат", "brother", "braht", "noun", "m", "bracia", "Mój brat studiuje prawo.", "Брат ми учи право.", "Family", "A1"),
  w("fa6", "babcia", "баба", "grandmother", "BAHB-cha", "noun", "f", "babcie", "Babcia piecze ciasto.", "Баба пече сладкиш.", "Family", "A1"),
  w("fa7", "dziadek", "дядо", "grandfather", "DJAH-dek", "noun", "m", "dziadkowie", "Dziadek opowiada historie.", "Дядо разказва истории.", "Family", "A1"),
  w("fa8", "syn", "син", "son", "sin", "noun", "m", "synowie", "Mam dorosłego syna.", "Имам пораснал син.", "Family", "A2"),
  w("fa9", "córka", "дъщеря", "daughter", "TSOOR-kah", "noun", "f", "córki", "Córka idzie do szkoły.", "Дъщерята отива на училище.", "Family", "A2"),

  // University
  w("u1", "uniwersytet", "университет", "university", "oo-nee-ver-SI-tet", "noun", "m", "uniwersytety", "Studiuję na uniwersytecie.", "Уча в университета.", "University", "A2"),
  w("u2", "wykład", "лекция", "lecture", "VI-kwahd", "noun", "m", "wykłady", "Mam wykład o dziewiątej.", "Имам лекция в девет.", "University", "A2"),
  w("u3", "egzamin", "изпит", "exam", "eg-ZAH-meen", "noun", "m", "egzaminy", "Jutro mam egzamin.", "Утре имам изпит.", "University", "A2"),
  w("u4", "książka", "книга", "book", "KSHONZH-kah", "noun", "f", "książki", "Czytam ciekawą książkę.", "Чета интересна книга.", "University", "A1"),
  w("u5", "biblioteka", "библиотека", "library", "beeb-lyo-TEH-kah", "noun", "f", "biblioteki", "Idę do biblioteki.", "Отивам в библиотеката.", "University", "A2"),
  w("u6", "student", "студент", "student", "STOO-dent", "noun", "m", "studenci", "Jestem studentem filologii.", "Аз съм студент по филология.", "University", "A1"),
  w("u7", "filologia", "филология", "philology", "fee-loh-LOH-gya", "noun", "f", "—", "Filologia słowiańska.", "Славянска филология.", "University", "B1"),
  w("u8", "wykładowca", "преподавател", "lecturer", "vi-kwah-DOV-tsah", "noun", "m", "wykładowcy", "Wykładowca jest surowy.", "Преподавателят е строг.", "University", "B1"),

  // Jobs
  w("j1", "lekarz", "лекар", "doctor", "LEH-kazh", "noun", "m", "lekarze", "Lekarz przyjmuje rano.", "Лекарят приема сутрин.", "Jobs", "A2"),
  w("j2", "nauczyciel", "учител", "teacher", "naw-CHI-chel", "noun", "m", "nauczyciele", "Nauczyciel polskiego.", "Учител по полски.", "Jobs", "A2"),
  w("j3", "inżynier", "инженер", "engineer", "een-ZHI-nyer", "noun", "m", "inżynierowie", "Pracuje jako inżynier.", "Работи като инженер.", "Jobs", "B1"),
  w("j4", "kucharz", "готвач", "cook", "KOO-khazh", "noun", "m", "kucharze", "Kucharz w restauracji.", "Готвач в ресторант.", "Jobs", "A2"),
  w("j5", "pisarz", "писател", "writer", "PEE-sazh", "noun", "m", "pisarze", "Polski pisarz.", "Полски писател.", "Jobs", "B1"),
  w("j6", "tłumacz", "преводач", "translator", "TWOO-mach", "noun", "m", "tłumacze", "Tłumacz konferencyjny.", "Конферентен преводач.", "Jobs", "B1"),
  w("j7", "praca", "работа", "work / job", "PRAH-tsah", "noun", "f", "prace", "Idę do pracy.", "Отивам на работа.", "Jobs", "A1"),

  // Emotions
  w("e1", "miłość", "любов", "love", "MEE-woshch", "noun", "f", "—", "Miłość jest ważna.", "Любовта е важна.", "Emotions", "B1"),
  w("e2", "radość", "радост", "joy", "RAH-doshch", "noun", "f", "—", "Czuję wielką radość.", "Изпитвам голяма радост.", "Emotions", "A2"),
  w("e3", "smutek", "тъга", "sadness", "SMOO-tek", "noun", "m", "—", "Smutek mija powoli.", "Тъгата отминава бавно.", "Emotions", "B1"),
  w("e4", "strach", "страх", "fear", "strakh", "noun", "m", "—", "Strach paraliżuje.", "Страхът парализира.", "Emotions", "B1"),
  w("e5", "spokój", "спокойствие", "calm", "SPOH-kooy", "noun", "m", "—", "Szukam spokoju.", "Търся спокойствие.", "Emotions", "B1"),
  w("e6", "złość", "гняв", "anger", "ZWOSHCH", "noun", "f", "—", "Złość niszczy serce.", "Гневът разрушава сърцето.", "Emotions", "B1"),
  w("e7", "tęsknota", "копнеж", "longing", "tenk-SNOH-tah", "noun", "f", "—", "Tęsknota za domem.", "Копнеж по дома.", "Emotions", "B2"),
  w("e8", "nadzieja", "надежда", "hope", "nah-DJEH-yah", "noun", "f", "—", "Nadzieja umiera ostatnia.", "Надеждата умира последна.", "Emotions", "B1"),

  // Time
  w("t1", "wczoraj", "вчера", "yesterday", "VCHOH-rye", "adverb", "—", "—", "Wczoraj padał deszcz.", "Вчера валеше дъжд.", "Time", "A2"),
  w("t2", "dzisiaj", "днес", "today", "DJEE-shay", "adverb", "—", "—", "Dzisiaj jest piątek.", "Днес е петък.", "Time", "A1"),
  w("t3", "jutro", "утре", "tomorrow", "YOO-troh", "adverb", "—", "—", "Jutro mam egzamin.", "Утре имам изпит.", "Time", "A1"),
  w("t4", "rano", "сутрин", "morning", "RAH-noh", "adverb", "—", "—", "Wstaję wcześnie rano.", "Ставам рано сутрин.", "Time", "A1"),
  w("t5", "wieczór", "вечер", "evening", "VYEH-choor", "noun", "m", "wieczory", "Spokojny wieczór.", "Спокойна вечер.", "Time", "A1"),
  w("t6", "tydzień", "седмица", "week", "TI-djen", "noun", "m", "tygodnie", "Cały tydzień pracuję.", "Цяла седмица работя.", "Time", "A2"),
  w("t7", "miesiąc", "месец", "month", "MYEH-shonts", "noun", "m", "miesiące", "Nowy miesiąc, nowy plan.", "Нов месец, нов план.", "Time", "A2"),

  // Colors
  w("c1", "czerwony", "червен", "red", "cher-VOH-ni", "adjective", "m", "czerwoni", "Czerwony szalik.", "Червен шал.", "Colors", "A1"),
  w("c2", "biały", "бял", "white", "BYAH-wi", "adjective", "m", "biali", "Biały śnieg.", "Бял сняг.", "Colors", "A1"),
  w("c3", "czarny", "черен", "black", "CHAR-ni", "adjective", "m", "czarni", "Czarna kawa.", "Черно кафе.", "Colors", "A1"),
  w("c4", "niebieski", "син", "blue", "nye-BYES-kee", "adjective", "m", "niebiescy", "Niebieskie niebo.", "Синьо небе.", "Colors", "A1"),
  w("c5", "zielony", "зелен", "green", "zye-LOH-ni", "adjective", "m", "zieloni", "Zielony las.", "Зелена гора.", "Colors", "A1"),
  w("c6", "żółty", "жълт", "yellow", "ZHOOW-ti", "adjective", "m", "żółci", "Żółte słońce.", "Жълто слънце.", "Colors", "A1"),
  w("c7", "szary", "сив", "gray", "SHAH-ri", "adjective", "m", "szarzy", "Szary dzień.", "Сив ден.", "Colors", "A2"),
  w("c8", "różowy", "розов", "pink", "roo-ZHOH-vi", "adjective", "m", "różowi", "Różowy kwiat.", "Розово цвете.", "Colors", "A2"),
  w("c9", "fioletowy", "лилав", "violet", "fyo-leh-TOH-vi", "adjective", "m", "fioletowi", "Fioletowy zachód.", "Лилав залез.", "Colors", "A2"),

  // Animals
  w("a1", "kot", "котка", "cat", "kot", "noun", "m", "koty", "Mam czarnego kota.", "Имам черна котка.", "Animals", "A1"),
  w("a2", "pies", "куче", "dog", "pyes", "noun", "m", "psy", "Pies szczeka głośno.", "Кучето лае силно.", "Animals", "A1"),
  w("a3", "ptak", "птица", "bird", "ptahk", "noun", "m", "ptaki", "Ptak śpiewa rano.", "Птицата пее сутрин.", "Animals", "A1"),
  w("a4", "koń", "кон", "horse", "kon", "noun", "m", "konie", "Biały koń biegnie.", "Бял кон бяга.", "Animals", "A2"),
  w("a5", "krowa", "крава", "cow", "KROH-vah", "noun", "f", "krowy", "Krowa daje mleko.", "Кравата дава мляко.", "Animals", "A2"),
  w("a6", "niedźwiedź", "мечка", "bear", "nye-DJVYEDJ", "noun", "m", "niedźwiedzie", "Niedźwiedź w lesie.", "Мечка в гората.", "Animals", "B1"),
  w("a7", "wilk", "вълк", "wolf", "veelk", "noun", "m", "wilki", "Wilk wyje do księżyca.", "Вълкът вие на луната.", "Animals", "B1"),
  w("a8", "lis", "лисица", "fox", "lees", "noun", "m", "lisy", "Lis chytry.", "Хитра лисица.", "Animals", "B1"),

  // Pets
  w("pt1", "królik", "заек", "rabbit", "KROO-leek", "noun", "m", "króliki", "Mały biały królik.", "Малък бял заек.", "Pets", "A2"),
  w("pt2", "chomik", "хамстер", "hamster", "KHO-meek", "noun", "m", "chomiki", "Chomik biega w kółku.", "Хамстерът тича в колелото.", "Pets", "A2"),
  w("pt3", "papuga", "папагал", "parrot", "pah-POO-gah", "noun", "f", "papugi", "Papuga mówi 'cześć'.", "Папагалът казва 'здравей'.", "Pets", "A2"),
  w("pt4", "rybka", "рибка", "(small) fish", "RIB-kah", "noun", "f", "rybki", "Złota rybka w akwarium.", "Златна рибка в аквариум.", "Pets", "A2"),

  // Clothing
  w("cl1", "koszula", "риза", "shirt", "koh-SHOO-lah", "noun", "f", "koszule", "Biała koszula na egzamin.", "Бяла риза за изпит.", "Clothing", "A1"),
  w("cl2", "spodnie", "панталон", "trousers", "SPOD-nyeh", "noun", "—", "—", "Czarne spodnie.", "Черен панталон.", "Clothing", "A1"),
  w("cl3", "buty", "обувки", "shoes", "BOO-ti", "noun", "—", "—", "Wygodne buty.", "Удобни обувки.", "Clothing", "A1"),
  w("cl4", "kurtka", "яке", "jacket", "KOORT-kah", "noun", "f", "kurtki", "Ciepła kurtka na zimę.", "Топло яке за зимата.", "Clothing", "A1"),
  w("cl5", "sukienka", "рокля", "dress", "soo-KYEN-kah", "noun", "f", "sukienki", "Czerwona sukienka.", "Червена рокля.", "Clothing", "A1"),
  w("cl6", "czapka", "шапка", "cap / hat", "CHAHP-kah", "noun", "f", "czapki", "Wełniana czapka.", "Вълнена шапка.", "Clothing", "A1"),
  w("cl7", "szalik", "шал", "scarf", "SHAH-leek", "noun", "m", "szaliki", "Długi szalik.", "Дълъг шал.", "Clothing", "A2"),

  // Technology
  w("te1", "komputer", "компютър", "computer", "kom-POO-ter", "noun", "m", "komputery", "Komputer się zepsuł.", "Компютърът се развали.", "Technology", "A1"),
  w("te2", "telefon", "телефон", "phone", "teh-LEH-fon", "noun", "m", "telefony", "Mój telefon jest stary.", "Телефонът ми е стар.", "Technology", "A1"),
  w("te3", "internet", "интернет", "internet", "een-TER-net", "noun", "m", "—", "Wolny internet.", "Бавен интернет.", "Technology", "A1"),
  w("te4", "ekran", "екран", "screen", "EH-krahn", "noun", "m", "ekrany", "Duży ekran.", "Голям екран.", "Technology", "A2"),
  w("te5", "klawiatura", "клавиатура", "keyboard", "klah-vya-TOO-rah", "noun", "f", "klawiatury", "Polska klawiatura.", "Полска клавиатура.", "Technology", "A2"),
  w("te6", "wiadomość", "съобщение", "message", "vya-DOH-moshch", "noun", "f", "wiadomości", "Nowa wiadomość.", "Ново съобщение.", "Technology", "A2"),

  // Body
  w("b1", "głowa", "глава", "head", "GWOH-vah", "noun", "f", "głowy", "Boli mnie głowa.", "Боли ме главата.", "Body", "A1"),
  w("b2", "ręka", "ръка", "hand / arm", "REN-kah", "noun", "f", "ręce", "Daj mi rękę.", "Дай ми ръката.", "Body", "A1"),
  w("b3", "noga", "крак", "leg", "NOH-gah", "noun", "f", "nogi", "Boli mnie noga.", "Боли ме кракът.", "Body", "A1"),
  w("b4", "oko", "око", "eye", "OH-koh", "noun", "n", "oczy", "Niebieskie oczy.", "Сини очи.", "Body", "A1"),
  w("b5", "ucho", "ухо", "ear", "OO-khoh", "noun", "n", "uszy", "Słyszę uszami.", "Чувам с ушите.", "Body", "A1"),
  w("b6", "serce", "сърце", "heart", "SER-tseh", "noun", "n", "serca", "Bije mi serce.", "Сърцето ми бие.", "Body", "A2"),
  w("b7", "włosy", "коса", "hair", "VWOH-si", "noun", "—", "—", "Długie włosy.", "Дълга коса.", "Body", "A1"),
  w("b8", "twarz", "лице", "face", "tfash", "noun", "f", "twarze", "Spokojna twarz.", "Спокойно лице.", "Body", "A2"),

  // Weather
  w("we1", "pogoda", "време (метеорологично)", "weather", "poh-GOH-dah", "noun", "f", "—", "Ładna pogoda dziś.", "Хубаво време днес.", "Weather", "A1"),
  w("we2", "deszcz", "дъжд", "rain", "deshch", "noun", "m", "—", "Pada deszcz.", "Вали дъжд.", "Weather", "A1"),
  w("we3", "śnieg", "сняг", "snow", "shnyeg", "noun", "m", "—", "Pada śnieg w grudniu.", "Вали сняг през декември.", "Weather", "A1"),
  w("we4", "słońce", "слънце", "sun", "SWON-tseh", "noun", "n", "—", "Świeci słońce.", "Грее слънце.", "Weather", "A1"),
  w("we5", "wiatr", "вятър", "wind", "vyaht-er", "noun", "m", "wiatry", "Silny wiatr wieje.", "Силен вятър духа.", "Weather", "A2"),
  w("we6", "burza", "буря", "storm", "BOO-zhah", "noun", "f", "burze", "Burza nadchodzi.", "Бурята идва.", "Weather", "B1"),
  w("we7", "mgła", "мъгла", "fog", "mgwah", "noun", "f", "—", "Gęsta mgła rano.", "Гъста мъгла сутрин.", "Weather", "B1"),

  // Nature
  w("n1", "las", "гора", "forest", "lahs", "noun", "m", "lasy", "Spacer w lesie.", "Разходка в гората.", "Nature", "A2"),
  w("n2", "góra", "планина", "mountain", "GOO-rah", "noun", "f", "góry", "Wysoka góra.", "Висока планина.", "Nature", "A2"),
  w("n3", "rzeka", "река", "river", "ZHEH-kah", "noun", "f", "rzeki", "Wisła to długa rzeka.", "Висла е дълга река.", "Nature", "A2"),
  w("n4", "morze", "море", "sea", "MOH-zheh", "noun", "n", "morza", "Bałtyckie morze.", "Балтийско море.", "Nature", "A1"),
  w("n5", "jezioro", "езеро", "lake", "yeh-ZYO-roh", "noun", "n", "jeziora", "Czyste jezioro.", "Чисто езеро.", "Nature", "A2"),
  w("n6", "drzewo", "дърво", "tree", "DZHEH-voh", "noun", "n", "drzewa", "Stary dąb.", "Стар дъб.", "Nature", "A1"),
  w("n7", "kwiat", "цвете", "flower", "kfyaht", "noun", "m", "kwiaty", "Czerwony kwiat.", "Червено цвете.", "Nature", "A1"),

  // Adjectives
  w("ad1", "dobry", "добър", "good", "DOB-ri", "adjective", "m", "dobrzy", "To jest dobry pomysł.", "Това е добра идея.", "Adjectives", "A1"),
  w("ad2", "piękny", "красив", "beautiful", "PYENK-ni", "adjective", "m", "piękni", "Piękny zachód słońca.", "Красив залез.", "Adjectives", "A2"),
  w("ad3", "ciekawy", "интересен", "interesting", "chye-KAH-vi", "adjective", "m", "ciekawi", "Ciekawy artykuł.", "Интересна статия.", "Adjectives", "A2"),
  w("ad4", "trudny", "труден", "difficult", "TROOD-ni", "adjective", "m", "trudni", "Język polski jest trudny.", "Полският език е труден.", "Adjectives", "A2"),
  w("ad5", "mądry", "умен", "wise / clever", "MOND-ri", "adjective", "m", "mądrzy", "Mądry student dużo czyta.", "Умният студент чете много.", "Adjectives", "B1"),
  w("ad6", "duży", "голям", "big", "DOO-zhi", "adjective", "m", "duzi", "Duży dom.", "Голяма къща.", "Adjectives", "A1"),
  w("ad7", "mały", "малък", "small", "MAH-wi", "adjective", "m", "mali", "Mały kot.", "Малка котка.", "Adjectives", "A1"),
  w("ad8", "stary", "стар", "old", "STAH-ri", "adjective", "m", "starzy", "Stary zamek.", "Стар замък.", "Adjectives", "A1"),
  w("ad9", "młody", "млад", "young", "MWOH-di", "adjective", "m", "młodzi", "Młody pisarz.", "Млад писател.", "Adjectives", "A1"),
  w("ad10", "szybki", "бърз", "fast", "SHIB-kee", "adjective", "m", "szybcy", "Szybki pociąg.", "Бърз влак.", "Adjectives", "A2"),

  // Verbs
  w("v1", "być", "съм / бъда", "to be", "bich", "verb", "—", "—", "Jestem studentem.", "Аз съм студент.", "Verbs", "A1"),
  w("v2", "mieć", "имам", "to have", "myech", "verb", "—", "—", "Mam dwa koty.", "Имам две котки.", "Verbs", "A1"),
  w("v3", "rozumieć", "разбирам", "to understand", "roh-ZOO-myech", "verb", "—", "—", "Czy rozumiesz po polsku?", "Разбираш ли полски?", "Verbs", "A2"),
  w("v4", "uczyć się", "уча се", "to study", "OO-chich sheh", "verb", "—", "—", "Uczę się polskiego.", "Уча полски.", "Verbs", "A2"),
  w("v5", "czytać", "чета", "to read", "CHI-tach", "verb", "—", "—", "Czytam każdego wieczoru.", "Чета всяка вечер.", "Verbs", "A1"),
  w("v6", "pisać", "пиша", "to write", "PEE-sach", "verb", "—", "—", "Piszę list do przyjaciela.", "Пиша писмо на приятел.", "Verbs", "A1"),
  w("v7", "mówić", "говоря", "to speak", "MOO-veech", "verb", "—", "—", "Mówię trochę po polsku.", "Говоря малко полски.", "Verbs", "A1"),
  w("v8", "myśleć", "мисля", "to think", "MISH-letch", "verb", "—", "—", "Myślę o tobie.", "Мисля за теб.", "Verbs", "A2"),
  w("v9", "iść", "вървя / отивам", "to go (on foot)", "eeshch", "verb", "—", "—", "Idę do biblioteki.", "Отивам в библиотеката.", "Verbs", "A1"),
  w("v10", "jechać", "пътувам", "to go (by vehicle)", "YEH-khach", "verb", "—", "—", "Jadę do Krakowa.", "Пътувам за Краков.", "Verbs", "A2"),
  w("v11", "kochać", "обичам", "to love", "KOH-khach", "verb", "—", "—", "Kocham polską literaturę.", "Обичам полската литература.", "Verbs", "A2"),
  w("v12", "lubić", "харесвам", "to like", "LOO-beech", "verb", "—", "—", "Lubię herbatę.", "Харесвам чай.", "Verbs", "A1"),

  // Phrases / Daily speech
  w("p1", "nie wiem", "не знам", "I don't know", "nyeh vyem", "phrase", "—", "—", "Nie wiem, gdzie to jest.", "Не знам къде е това.", "Phrases", "A1"),
  w("p2", "jak się masz?", "как си?", "how are you?", "yak sheh mash", "phrase", "—", "—", "Cześć, jak się masz dzisiaj?", "Здравей, как си днес?", "Phrases", "A1"),
  w("p3", "do zobaczenia", "до скоро", "see you", "doh zoh-bah-CHEH-nya", "phrase", "—", "—", "Do zobaczenia w piątek!", "До скоро в петък!", "Phrases", "A1"),
  w("p4", "smacznego", "добър апетит", "bon appétit", "smatch-NEH-goh", "phrase", "—", "—", "Smacznego, drodzy goście!", "Добър апетит, скъпи гости!", "Daily speech", "A1"),
  w("p5", "na zdrowie", "наздраве", "cheers / bless you", "nah ZDROH-vyeh", "phrase", "—", "—", "Na zdrowie i sto lat!", "Наздраве и сто години!", "Daily speech", "A1"),
  w("p6", "oczywiście", "разбира се", "of course", "oh-chi-VEESH-cheh", "adverb", "—", "—", "Oczywiście, że pomogę.", "Разбира се, че ще помогна.", "Daily speech", "A2"),
  w("p7", "być może", "може би", "maybe", "bich MOH-zheh", "phrase", "—", "—", "Być może jutro przyjdę.", "Може би утре ще дойда.", "Daily speech", "A2"),
  w("p8", "co słychać?", "какво ново?", "what's up?", "tso SWI-khach", "phrase", "—", "—", "Cześć, co u ciebie słychać?", "Здравей, какво ново при теб?", "Daily speech", "A2"),

  // Slang
  w("sl1", "spoko", "спокойно / окей", "chill / okay", "SPOH-koh", "phrase", "—", "—", "Spoko, nie martw się.", "Спокойно, не се притеснявай.", "Slang", "A2"),
  w("sl2", "fajny", "готин", "cool", "FAI-ni", "adjective", "m", "fajni", "Fajny film.", "Готин филм.", "Slang", "A2"),
  w("sl3", "siema", "здрасти", "hey (informal)", "SHE-mah", "phrase", "—", "—", "Siema, co tam?", "Здрасти, какво става?", "Slang", "A2"),
  w("sl4", "git", "екстра", "great", "geet", "phrase", "—", "—", "Wszystko git.", "Всичко екстра.", "Slang", "B1"),
  w("sl5", "ogar", "съвземи се", "get a grip", "OH-gar", "phrase", "—", "—", "Ogar, stary.", "Съвземи се, човек.", "Slang", "B1"),

  // Literature
  w("li1", "powieść", "роман", "novel", "POH-vyeshch", "noun", "f", "powieści", "Polska powieść XIX wieku.", "Полски роман от XIX век.", "Literature", "B1"),
  w("li2", "wiersz", "стихотворение", "poem", "vyersh", "noun", "m", "wiersze", "Wiersz Mickiewicza.", "Стихотворение на Мицкевич.", "Literature", "B1"),
  w("li3", "autor", "автор", "author", "AHW-tor", "noun", "m", "autorzy", "Ulubiony autor.", "Любим автор.", "Literature", "A2"),
  w("li4", "rozdział", "глава", "chapter", "ROZ-djahw", "noun", "m", "rozdziały", "Pierwszy rozdział.", "Първа глава.", "Literature", "B1"),
  w("li5", "bohater", "герой", "hero / protagonist", "boh-HAH-ter", "noun", "m", "bohaterowie", "Bohater romantyczny.", "Романтичен герой.", "Literature", "B1"),
  w("li6", "metafora", "метафора", "metaphor", "meh-tah-FOH-rah", "noun", "f", "metafory", "Piękna metafora.", "Красива метафора.", "Literature", "B2"),
  w("li7", "tłumaczenie", "превод", "translation", "twoo-mah-CHEH-nyeh", "noun", "n", "tłumaczenia", "Polskie tłumaczenie.", "Полски превод.", "Literature", "B1"),

  // Daily speech & connectors
  w("d1", "tak", "да", "yes", "tahk", "phrase", "—", "—", "Tak, oczywiście.", "Да, разбира се.", "Daily speech", "A1"),
  w("d2", "nie", "не", "no", "nyeh", "phrase", "—", "—", "Nie, dziękuję.", "Не, благодаря.", "Daily speech", "A1"),
  w("d3", "może", "може би", "maybe", "MOH-zheh", "adverb", "—", "—", "Może jutro pójdziemy.", "Може би утре ще отидем.", "Daily speech", "A1"),
  w("d4", "zawsze", "винаги", "always", "ZAHV-sheh", "adverb", "—", "—", "Zawsze piję kawę rano.", "Винаги пия кафе сутрин.", "Daily speech", "A2"),
  w("d5", "nigdy", "никога", "never", "NEEG-di", "adverb", "—", "—", "Nigdy nie kłamię.", "Никога не лъжа.", "Daily speech", "A2"),
  w("d6", "często", "често", "often", "CHEN-stoh", "adverb", "—", "—", "Często chodzę do kina.", "Често ходя на кино.", "Daily speech", "A2"),
  w("d7", "naprawdę", "наистина", "really", "nah-PRAHV-dyeh", "adverb", "—", "—", "Naprawdę mi przykro.", "Наистина съжалявам.", "Daily speech", "A2"),
  w("d8", "spoko", "спокойно", "no worries (slang)", "SPOH-koh", "phrase", "—", "—", "Spoko, daj spokój.", "Спокойно, остави.", "Slang", "A2"),
  w("d9", "super", "супер", "great", "SOO-per", "adjective", "—", "—", "Super pomysł!", "Супер идея!", "Daily speech", "A1"),
  w("d10", "ekstra", "екстра", "awesome", "EKS-trah", "adjective", "—", "—", "Ekstra koncert.", "Екстра концерт.", "Slang", "A2"),

  // Verbs (extra)
  w("v1", "wstawać", "ставам", "to get up", "fstah-VAHCH", "verb", "—", "—", "Wstaję o siódmej.", "Ставам в седем.", "Verbs", "A2"),
  w("v2", "spać", "спя", "to sleep", "spahch", "verb", "—", "—", "Śpię osiem godzin.", "Спя осем часа.", "Verbs", "A1"),
  w("v3", "biegać", "тичам", "to run", "BYEH-gahch", "verb", "—", "—", "Biegam w parku.", "Тичам в парка.", "Verbs", "A2"),
  w("v4", "pływać", "плувам", "to swim", "PWI-vahch", "verb", "—", "—", "Pływam w jeziorze.", "Плувам в езерото.", "Verbs", "A2"),
  w("v5", "myśleć", "мисля", "to think", "MISH-lech", "verb", "—", "—", "Myślę o tobie.", "Мисля за теб.", "Verbs", "A2"),
  w("v6", "śmiać się", "смея се", "to laugh", "shmyatch sheh", "verb", "—", "—", "Śmieję się głośno.", "Смея се на глас.", "Verbs", "A2"),
  w("v7", "płakać", "плача", "to cry", "PWAH-kahch", "verb", "—", "—", "Dziecko płacze.", "Детето плаче.", "Verbs", "A2"),
  w("v8", "śpiewać", "пея", "to sing", "SHPYE-vahch", "verb", "—", "—", "Śpiewam w chórze.", "Пея в хор.", "Verbs", "A2"),
  w("v9", "tańczyć", "танцувам", "to dance", "TAHN-chich", "verb", "—", "—", "Tańczymy razem.", "Танцуваме заедно.", "Verbs", "A2"),
  w("v10", "podróżować", "пътувам", "to travel", "poh-droo-ZHOH-vahch", "verb", "—", "—", "Lubię podróżować.", "Обичам да пътувам.", "Verbs", "A2"),

  // Time
  w("t1", "dzisiaj", "днес", "today", "JEE-shahy", "adverb", "—", "—", "Dzisiaj jest piątek.", "Днес е петък.", "Time", "A1"),
  w("t2", "jutro", "утре", "tomorrow", "YOO-troh", "adverb", "—", "—", "Jutro mam egzamin.", "Утре имам изпит.", "Time", "A1"),
  w("t3", "wczoraj", "вчера", "yesterday", "FCHOH-rahy", "adverb", "—", "—", "Wczoraj padał deszcz.", "Вчера валеше дъжд.", "Time", "A1"),
  w("t4", "tydzień", "седмица", "week", "TI-djeny", "noun", "m", "tygodnie", "Cały tydzień pracuję.", "Цяла седмица работя.", "Time", "A2"),
  w("t5", "miesiąc", "месец", "month", "MYEH-shonts", "noun", "m", "miesiące", "Polski miesiąc.", "Полски месец.", "Time", "A2"),
  w("t6", "rok", "година", "year", "rohk", "noun", "m", "lata", "Mam dwadzieścia lat.", "На двадесет години съм.", "Time", "A1"),

  // Travel & nature
  w("tr10", "lotnisko", "летище", "airport", "loht-NEES-koh", "noun", "n", "lotniska", "Lotnisko Chopina w Warszawie.", "Летище Шопен във Варшава.", "Travel", "A2"),
  w("tr11", "dworzec", "гара", "train station", "DVOH-zhets", "noun", "m", "dworce", "Spotkajmy się na dworcu.", "Да се срещнем на гарата.", "Travel", "A2"),
  w("tr12", "bilet", "билет", "ticket", "BEE-let", "noun", "m", "bilety", "Kupiłem bilet.", "Купих билет.", "Travel", "A1"),
  w("tr13", "walizka", "куфар", "suitcase", "vah-LEEZ-kah", "noun", "f", "walizki", "Pakuję walizkę.", "Опаковам куфара.", "Travel", "A2"),
  w("tr14", "morze", "море", "sea", "MOH-zheh", "noun", "n", "morza", "Bałtyckie morze.", "Балтийско море.", "Nature", "A1"),
  w("tr15", "góry", "планина", "mountains", "GOO-ri", "noun", "—", "—", "Tatry to piękne góry.", "Татрите са красиви планини.", "Nature", "A2"),

  // Emotions
  w("e10", "radość", "радост", "joy", "RAH-doshch", "noun", "f", "—", "Czuję wielką radość.", "Чувствам голяма радост.", "Emotions", "B1"),
  w("e11", "smutek", "тъга", "sadness", "SMOO-tek", "noun", "m", "—", "Smutek mija powoli.", "Тъгата отминава бавно.", "Emotions", "B1"),
  w("e12", "strach", "страх", "fear", "strakh", "noun", "m", "—", "Mam strach przed burzą.", "Страх ме е от буря.", "Emotions", "A2"),
  w("e13", "tęsknota", "тъга по дома", "longing / homesickness", "tens-KNOH-tah", "noun", "f", "—", "Czuję tęsknotę za domem.", "Чувствам тъга по дома.", "Emotions", "B2"),

  // Idioms
  w("id1", "rzucać grochem o ścianę", "говоря на стената", "to talk to a brick wall", "ZHOO-tsach GROH-hem o SHCHA-neh", "phrase", "—", "—", "To jak rzucać grochem o ścianę.", "Все едно говориш на стената.", "Idioms", "B1"),
  w("id2", "mieć muchy w nosie", "сърдит съм без причина", "to be in a bad mood (lit. flies in the nose)", "myech MOO-hi v NOH-sheh", "phrase", "—", "—", "Dziś masz muchy w nosie.", "Днес си сърдит без причина.", "Idioms", "B1"),
  w("id3", "bułka z masłem", "лесна работа", "a piece of cake (lit. bread roll with butter)", "BOO-wkah z MAH-swem", "phrase", "—", "—", "Ten test to bułka z masłem.", "Този тест е фасулска работа.", "Idioms", "A2"),
  w("id4", "wyjść na ludzi", "ставам човек", "to make something of oneself", "viyshch nah LOO-dzhi", "phrase", "—", "—", "Wreszcie wyszedł na ludzi.", "Най-сетне стана човек.", "Idioms", "B2"),
  w("id5", "nie mój cyrk, nie moje małpy", "не е мой проблем", "not my circus, not my monkeys", "nyeh mooy tsirk", "phrase", "—", "—", "Nie mój cyrk, nie moje małpy.", "Не е мой проблем, не са мои маймуни.", "Idioms", "B1"),
  w("id6", "głodny jak wilk", "гладен като вълк", "hungry as a wolf", "GWOHD-ni yak vilk", "phrase", "—", "—", "Jestem głodny jak wilk!", "Гладен съм като вълк!", "Idioms", "A2"),

  // Jokes
  w("jk1", "Co robi pies w bibliotece? — Czyta między wierszami.", "Какво прави кучето в библиотеката? — Чете между редовете.", "What does the dog do at the library? — Reads between the lines.", "—", "phrase", "—", "—", "Co robi pies w bibliotece? Czyta między wierszami.", "Какво прави кучето в библиотеката? Чете между редовете.", "Jokes", "B1"),
  w("jk2", "Dlaczego programista poszedł do lasu? — Po drewno na stos wywołań.", "Защо програмистът отишъл в гората? — За дърва за стека.", "Why did the programmer go to the forest? — For wood for the call stack.", "—", "phrase", "—", "—", "Dlaczego programista poszedł do lasu?", "Защо програмистът отишъл в гората?", "Jokes", "B2"),
  w("jk3", "— Halo, czy to straż pożarna? — Nie, to żona.", "— Ало, пожарната ли е? — Не, жена ти е.", "— Hello, is this the fire brigade? — No, it's your wife.", "—", "phrase", "—", "—", "Halo, czy to straż pożarna? Nie, to żona.", "Ало, пожарната ли е? Не, жена ти е.", "Jokes", "A2"),
  w("jk4", "Polak, Niemiec i Rusek wchodzą do baru…", "Поляк, германец и руснак влизат в бар…", "A Pole, a German and a Russian walk into a bar…", "—", "phrase", "—", "—", "Polak, Niemiec i Rusek wchodzą do baru…", "Поляк, германец и руснак влизат в бар…", "Jokes", "B1"),

  // Memes
  w("mm1", "No i chuj", "ами това е (груб мем)", "well, that's that (vulgar meme)", "no ee hooy", "phrase", "—", "—", "Próbowałem, no i chuj.", "Опитах, ами това е.", "Memes", "B2"),
  w("mm2", "Janusz biznesu", "типичен дребен бизнесмен", "stereotypical small businessman (meme)", "YAH-noosh beez-NEH-soo", "phrase", "m", "—", "Klasyczny Janusz biznesu.", "Класически дребен бизнесмен.", "Memes", "B1"),
  w("mm3", "sucharek", "плосък виц", "dad joke (lit. little cracker)", "soo-HAH-rek", "noun", "m", "sucharki", "Ale sucharek!", "Какъв плосък виц!", "Memes", "A2"),
  w("mm4", "boomer", "бумър", "boomer (gen)", "BOO-mer", "noun", "m", "boomerzy", "Typowy boomer.", "Типичен бумър.", "Memes", "A2"),
  w("mm5", "cringe", "крийндж", "cringe", "krindzh", "adjective", "—", "—", "Ale cringe.", "Какъв крийндж.", "Memes", "A1"),

  // Internet
  w("in1", "siema", "здрасти (нет)", "hi (internet slang)", "SHEH-mah", "phrase", "—", "—", "Siema, co tam?", "Здрасти, какво става?", "Internet", "A1"),
  w("in2", "pozdro", "поздрав (кратко)", "cheers (slang)", "POZ-droh", "phrase", "—", "—", "Pozdro dla ekipy!", "Поздрав на бандата!", "Internet", "A2"),
  w("in3", "spoko", "спокойно", "chill / okay", "SPOH-koh", "adverb", "—", "—", "Spoko, ogarnę to.", "Спокойно, ще се справя.", "Internet", "A1"),
  w("in4", "ogarnąć", "оправям, разбирам", "to handle / to figure out", "oh-GAR-nontsh", "verb", "—", "—", "Muszę to ogarnąć przed jutrem.", "Трябва да го оправя до утре.", "Internet", "A2"),
  w("in5", "lajk", "лайк", "like (social media)", "layk", "noun", "m", "lajki", "Daj lajka!", "Дай един лайк!", "Internet", "A1"),
  w("in6", "hejt", "хейт", "hate (online)", "heyt", "noun", "m", "—", "Dostała dużo hejtu.", "Получи много хейт.", "Internet", "A2"),
  w("in7", "scrollować", "скролвам", "to scroll", "skrol-OH-vatsh", "verb", "—", "—", "Scrolluję cały wieczór.", "Скролвам цяла вечер.", "Internet", "A1"),

  // Cultural
  w("cu1", "Wigilia", "Бъдни вечер", "Christmas Eve (Polish tradition)", "vee-GHEE-lyah", "noun", "f", "—", "Wigilia w Polsce zaczyna się o zmroku.", "Бъдни вечер в Полша започва по здрач.", "Cultural", "A2"),
  w("cu2", "opłatek", "обреден хляб (Коледа)", "Christmas wafer (PL tradition)", "oh-PWAH-tek", "noun", "m", "opłatki", "Dzielimy się opłatkiem.", "Споделяме обреден хляб.", "Cultural", "B1"),
  w("cu3", "imieniny", "имен ден", "name day (more important than birthday in PL)", "ee-myeh-NEE-ni", "noun", "—", "—", "Dziś moje imieniny!", "Днес е моят имен ден!", "Cultural", "A2"),
  w("cu4", "barszcz", "червена борш супа", "borscht (red beet soup)", "barshch", "noun", "m", "—", "Barszcz z uszkami na Wigilię.", "Борш с малки кнедли за Бъдни вечер.", "Cultural", "A2"),
  w("cu5", "pierogi", "пироги", "pierogi (filled dumplings)", "pyeh-ROH-ghee", "noun", "—", "—", "Pierogi z kapustą i grzybami.", "Пироги със зеле и гъби.", "Cultural", "A1"),
  w("cu6", "Mickiewicz", "Мицкевич", "Adam Mickiewicz (national poet)", "meets-KYE-veech", "noun", "m", "—", "Mickiewicz to wieszcz narodowy.", "Мицкевич е национален поет.", "Cultural", "B1"),
  w("cu7", "Solidarność", "Солидарност (движение)", "Solidarity (movement, 1980)", "soh-lee-DAR-noshch", "noun", "f", "—", "Solidarność zmieniła Polskę.", "Солидарност промени Полша.", "Cultural", "B2"),

  // School & University
  w("sc1", "uczeń", "ученик", "pupil", "OO-cheny", "noun", "m", "uczniowie", "Uczeń pisze test.", "Ученикът пише тест.", "School", "A1"),
  w("sc2", "nauczyciel", "учител", "teacher", "now-CHI-chel", "noun", "m", "nauczyciele", "Nauczyciel tłumaczy gramatykę.", "Учителят обяснява граматиката.", "School", "A1"),
  w("sc3", "tablica", "дъска", "blackboard", "tah-BLEE-tsah", "noun", "f", "tablice", "Pisz na tablicy.", "Пиши на дъската.", "School", "A1"),
  w("sc4", "lekcja", "урок", "lesson", "LEK-tsyah", "noun", "f", "lekcje", "Mam teraz lekcję polskiego.", "Сега имам урок по полски.", "School", "A1"),
  w("sc5", "zeszyt", "тетрадка", "notebook", "ZEH-shit", "noun", "m", "zeszyty", "Zostawiłem zeszyt w domu.", "Забравих тетрадката вкъщи.", "School", "A2"),
  w("sc6", "ocena", "оценка", "grade", "oh-TSEH-nah", "noun", "f", "oceny", "Dostałem dobrą ocenę.", "Получих добра оценка.", "School", "A2"),
  w("sc7", "wykład", "лекция", "lecture", "VI-kwahd", "noun", "m", "wykłady", "Wykład trwa półtorej godziny.", "Лекцията продължава час и половина.", "University", "B1"),
  w("sc8", "egzamin", "изпит", "exam", "eg-ZAH-meen", "noun", "m", "egzaminy", "Jutro mam egzamin.", "Утре имам изпит.", "University", "A2"),
  w("sc9", "praca dyplomowa", "дипломна работа", "thesis", "PRAH-tsah dip-loh-MOH-vah", "phrase", "f", "—", "Piszę pracę dyplomową o Mickiewiczu.", "Пиша дипломна работа за Мицкевич.", "University", "B2"),
  w("sc10", "biblioteka", "библиотека", "library", "bib-lyo-TEH-kah", "noun", "f", "biblioteki", "Spotykamy się w bibliotece.", "Срещаме се в библиотеката.", "University", "A1"),
  w("sc11", "filologia słowiańska", "славянска филология", "Slavic philology", "fee-loh-LOH-gyah swoh-VYAN-skah", "phrase", "f", "—", "Studiuję filologię słowiańską.", "Уча славянска филология.", "University", "B1"),

  // Jobs (extra)
  w("jb1", "lekarz", "лекар", "doctor", "LEH-kazh", "noun", "m", "lekarze", "Mój brat jest lekarzem.", "Брат ми е лекар.", "Jobs", "A1"),
  w("jb2", "inżynier", "инженер", "engineer", "een-ZHI-nyer", "noun", "m", "inżynierowie", "Pracuje jako inżynier.", "Работи като инженер.", "Jobs", "A2"),
  w("jb3", "kelner", "сервитьор", "waiter", "KEL-ner", "noun", "m", "kelnerzy", "Kelner przynosi menu.", "Сервитьорът носи менюто.", "Jobs", "A2"),
  w("jb4", "programista", "програмист", "programmer", "proh-grah-MEES-tah", "noun", "m", "programiści", "Programista pije kawę.", "Програмистът пие кафе.", "Jobs", "A2"),
  w("jb5", "tłumacz", "преводач", "translator", "TWOO-mach", "noun", "m", "tłumacze", "Pracuję jako tłumacz polsko-bułgarski.", "Работя като полско-български преводач.", "Jobs", "B1"),

  // Drinks (extra)
  w("dr1", "herbata", "чай", "tea", "her-BAH-tah", "noun", "f", "herbaty", "Piję herbatę z cytryną.", "Пия чай с лимон.", "Drinks", "A1"),
  w("dr2", "kawa", "кафе", "coffee", "KAH-vah", "noun", "f", "kawy", "Poproszę kawę z mlekiem.", "Едно кафе с мляко, моля.", "Drinks", "A1"),
  w("dr3", "piwo", "бира", "beer", "PEE-voh", "noun", "n", "piwa", "Polskie piwo jest dobre.", "Полската бира е добра.", "Drinks", "A1"),
  w("dr4", "wódka", "водка", "vodka", "VOOD-kah", "noun", "f", "wódki", "Wódka żubrówka to klasyk.", "Зубровка е класика.", "Drinks", "A2"),
  w("dr5", "sok pomarańczowy", "портокалов сок", "orange juice", "sok poh-mah-rahn-CHOH-vi", "phrase", "m", "—", "Wypiję sok pomarańczowy.", "Ще изпия портокалов сок.", "Drinks", "A1"),

  // Music
  w("mu1", "muzyka", "музика", "music", "MOO-zi-kah", "noun", "f", "—", "Słucham muzyki klasycznej.", "Слушам класическа музика.", "Music", "A1"),
  w("mu2", "pieśń", "песен", "song (literary)", "pyeshny", "noun", "f", "pieśni", "To stara polska pieśń ludowa.", "Това е стара полска народна песен.", "Music", "B1"),
  w("mu3", "zespół", "група", "band", "ZES-poow", "noun", "m", "zespoły", "Mój ulubiony zespół to Republika.", "Любимата ми група е Република.", "Music", "A2"),
  w("mu4", "Chopin", "Шопен", "Chopin", "SHO-pen", "noun", "m", "—", "Chopin to duma Polski.", "Шопен е гордост за Полша.", "Music", "A1"),
  w("mu5", "koncert", "концерт", "concert", "KON-tsert", "noun", "m", "koncerty", "Idziemy na koncert.", "Отиваме на концерт.", "Music", "A1"),
  w("mu6", "skrzypce", "цигулка", "violin", "SKSHIP-tseh", "noun", "—", "—", "Gra na skrzypcach.", "Свири на цигулка.", "Music", "B1"),
  w("mu7", "fortepian", "пиано", "piano", "for-TEH-pyan", "noun", "m", "fortepiany", "Chopin pisał na fortepian.", "Шопен пишеше за пиано.", "Music", "A2"),

  // Poetry & Literature
  w("po1", "wiersz", "стихотворение", "poem", "vyersh", "noun", "m", "wiersze", "Czytam wiersz Tuwima.", "Чета стихотворение от Тувим.", "Poetry", "A2"),
  w("po2", "poeta", "поет", "poet", "poh-EH-tah", "noun", "m", "poeci", "Mickiewicz to wielki poeta.", "Мицкевич е велик поет.", "Poetry", "B1"),
  w("po3", "rym", "рима", "rhyme", "rim", "noun", "m", "rymy", "Ten wiersz ma piękne rymy.", "Това стихотворение има красиви рими.", "Poetry", "B1"),
  w("po4", "powieść", "роман", "novel", "POH-vyeshch", "noun", "f", "powieści", "Czytam powieść Sienkiewicza.", "Чета роман от Сенкевич.", "Literature", "B1"),
  w("po5", "rozdział", "глава", "chapter", "ROZ-djahw", "noun", "m", "rozdziały", "Pierwszy rozdział jest najtrudniejszy.", "Първата глава е най-трудната.", "Literature", "A2"),
  w("po6", "ojczyzna", "родина", "homeland (poetic)", "oy-CHIZ-nah", "noun", "f", "—", "„Litwo, ojczyzno moja!\"", "„Литво, отечество мое!\"", "Poetry", "B2"),
  w("po7", "tęsknić", "тъгувам", "to long for", "TENS-kneetch", "verb", "—", "—", "Tęsknię za rodziną.", "Тъгувам за семейството си.", "Poetry", "B1"),

  // Daily phrases (extra)
  w("dp1", "co słychać?", "какво ново?", "what's up?", "tso SWI-hach", "phrase", "—", "—", "Cześć! Co słychać?", "Здрасти! Какво ново?", "Daily speech", "A1"),
  w("dp2", "nie ma sprawy", "няма проблем", "no problem", "nyeh mah SPRAH-vi", "phrase", "—", "—", "Dzięki! — Nie ma sprawy.", "Благодаря! — Няма проблем.", "Daily speech", "A1"),
  w("dp3", "smacznego", "добър апетит", "bon appétit", "smach-NEH-go", "phrase", "—", "—", "Smacznego!", "Добър апетит!", "Daily speech", "A1"),
  w("dp4", "na zdrowie", "наздраве", "cheers / bless you", "nah ZDROH-vyeh", "phrase", "—", "—", "Na zdrowie!", "Наздраве!", "Daily speech", "A1"),
  w("dp5", "powodzenia", "успех", "good luck", "poh-vo-DZEH-nyah", "phrase", "—", "—", "Powodzenia na egzaminie!", "Успех на изпита!", "Daily speech", "A1"),

  // ============================================================
  // COLORS — full set
  // ============================================================
  w("col1", "czerwony", "червен", "red", "cher-VOH-ni", "adjective", "m", "czerwoni", "To jest czerwony samochód.", "Това е червена кола.", "Colors", "A1"),
  w("col2", "niebieski", "син", "blue", "nyeh-BYES-kee", "adjective", "m", "niebiescy", "Niebo jest niebieskie.", "Небето е синьо.", "Colors", "A1"),
  w("col3", "zielony", "зелен", "green", "zheh-LOH-ni", "adjective", "m", "zieloni", "Trawa jest zielona.", "Тревата е зелена.", "Colors", "A1"),
  w("col4", "żółty", "жълт", "yellow", "ZHOOW-ti", "adjective", "m", "żółci", "Słońce jest żółte.", "Слънцето е жълто.", "Colors", "A1"),
  w("col5", "pomarańczowy", "оранжев", "orange", "po-mah-ran-CHOH-vi", "adjective", "m", "pomarańczowi", "Lubię pomarańczowy sok.", "Харесвам оранжев сок.", "Colors", "A1"),
  w("col6", "fioletowy", "лилав", "purple", "fyoh-leh-TOH-vi", "adjective", "m", "fioletowi", "Mam fioletową bluzkę.", "Имам лилава блуза.", "Colors", "A1"),
  w("col7", "biały", "бял", "white", "BYAH-wi", "adjective", "m", "biali", "Śnieg jest biały.", "Снегът е бял.", "Colors", "A1"),
  w("col8", "czarny", "черен", "black", "CHAR-ni", "adjective", "m", "czarni", "Noszę czarny płaszcz.", "Нося черно палто.", "Colors", "A1"),
  w("col9", "szary", "сив", "grey", "SHAH-ri", "adjective", "m", "szarzy", "Niebo jest dziś szare.", "Небето днес е сиво.", "Colors", "A1"),
  w("col10", "różowy", "розов", "pink", "roo-ZHOH-vi", "adjective", "m", "różowi", "Mam różowy zeszyt.", "Имам розова тетрадка.", "Colors", "A1"),
  w("col11", "brązowy", "кафяв", "brown", "bron-ZOH-vi", "adjective", "m", "brązowi", "Pies ma brązowe oczy.", "Кучето има кафяви очи.", "Colors", "A1"),
  w("col12", "granatowy", "тъмносин", "navy blue", "grah-nah-TOH-vi", "adjective", "m", "granatowi", "Mundur jest granatowy.", "Униформата е тъмносиня.", "Colors", "A2"),
  w("col13", "turkusowy", "тюркоазен", "turquoise", "toor-koo-SOH-vi", "adjective", "m", "turkusowi", "Morze jest turkusowe.", "Морето е тюркоазено.", "Colors", "A2"),
  w("col14", "złoty", "златен", "gold", "ZWOH-ti", "adjective", "m", "złoci", "Ma złoty pierścionek.", "Има златен пръстен.", "Colors", "A2"),
  w("col15", "srebrny", "сребърен", "silver", "SREB-rni", "adjective", "m", "srebrni", "Lubię srebrną biżuterię.", "Харесвам сребърни бижута.", "Colors", "A2"),
  w("col16", "beżowy", "бежов", "beige", "beh-ZHOH-vi", "adjective", "m", "beżowi", "Ściany są beżowe.", "Стените са бежови.", "Colors", "A2"),
  w("col17", "jasny", "светъл", "light (color)", "YAHS-ni", "adjective", "m", "jaśni", "Mam jasne włosy.", "Имам светла коса.", "Colors", "A1"),
  w("col18", "ciemny", "тъмен", "dark (color)", "CHEM-ni", "adjective", "m", "ciemni", "Wolę ciemne kolory.", "Предпочитам тъмни цветове.", "Colors", "A1"),
  w("col19", "bordowy", "бордо", "burgundy", "bor-DOH-vi", "adjective", "m", "bordowi", "Sukienka jest bordowa.", "Роклята е бордо.", "Colors", "A2"),
  w("col20", "kremowy", "кремав", "cream", "kreh-MOH-vi", "adjective", "m", "kremowi", "Kupiła kremowy szal.", "Купи кремав шал.", "Colors", "A2"),
  w("col21", "kolor", "цвят", "color", "KOH-lor", "noun", "m", "kolory", "Jaki to kolor?", "Какъв е този цвят?", "Colors", "A1"),
  w("col22", "tęcza", "дъга", "rainbow", "TEHN-cha", "noun", "f", "tęcze", "Po deszczu pojawiła się tęcza.", "След дъжда се появи дъга.", "Colors", "A2"),

  // ============================================================
  // UNIVERSITY — full set
  // ============================================================
  w("uni1", "uniwersytet", "университет", "university", "oo-nee-ver-SI-tet", "noun", "m", "uniwersytety", "Studiuję na uniwersytecie.", "Уча в университет.", "University", "A1"),
  w("uni2", "student", "студент", "student (m)", "STOO-dent", "noun", "m", "studenci", "Jestem studentem filologii.", "Аз съм студент по филология.", "University", "A1"),
  w("uni3", "studentka", "студентка", "student (f)", "stoo-DENT-kah", "noun", "f", "studentki", "Anna jest studentką.", "Анна е студентка.", "University", "A1"),
  w("uni4", "profesor", "професор", "professor", "pro-FEH-sor", "noun", "m", "profesorowie", "Profesor wykłada gramatykę.", "Професорът преподава граматика.", "University", "A1"),
  w("uni5", "wykład", "лекция", "lecture", "VI-kwad", "noun", "m", "wykłady", "Wykład zaczyna się o ósmej.", "Лекцията започва в осем.", "University", "A1"),
  w("uni6", "egzamin", "изпит", "exam", "eg-ZAH-meen", "noun", "m", "egzaminy", "Mam egzamin w piątek.", "Имам изпит в петък.", "University", "A1"),
  w("uni7", "indeks", "студентска книжка", "student record book", "EEN-deks", "noun", "m", "indeksy", "Zapomniałem indeksu.", "Забравих студентската книжка.", "University", "A2"),
  w("uni8", "biblioteka", "библиотека", "library", "beeb-lyoh-TEH-kah", "noun", "f", "biblioteki", "Uczę się w bibliotece.", "Уча в библиотеката.", "University", "A1"),
  w("uni9", "stypendium", "стипендия", "scholarship", "sti-PEN-dyoom", "noun", "n", "stypendia", "Dostałam stypendium naukowe.", "Получих научна стипендия.", "University", "A2"),
  w("uni10", "kierunek", "специалност", "field of study", "kyeh-ROO-nek", "noun", "m", "kierunki", "Mój kierunek to filologia słowiańska.", "Моята специалност е славянска филология.", "University", "A2"),
  w("uni11", "semestr", "семестър", "semester", "SEH-mestr", "noun", "m", "semestry", "Zaczął się nowy semestr.", "Започна нов семестър.", "University", "A1"),
  w("uni12", "dziekan", "декан", "dean", "DJEH-kan", "noun", "m", "dziekani", "Dziekan podpisał wniosek.", "Деканът подписа заявлението.", "University", "B1"),
  w("uni13", "wydział", "факултет", "faculty / department", "VI-dzhaw", "noun", "m", "wydziały", "Wydział Filologiczny.", "Филологически факултет.", "University", "A2"),
  w("uni14", "akademik", "общежитие", "dormitory", "ah-kah-DEH-meek", "noun", "m", "akademiki", "Mieszkam w akademiku.", "Живея в общежитие.", "University", "A2"),
  w("uni15", "sesja", "сесия", "exam session", "SES-yah", "noun", "f", "sesje", "Sesja zimowa zaczyna się w styczniu.", "Зимната сесия започва през януари.", "University", "A2"),
  w("uni16", "ocena", "оценка", "grade", "oh-TSEH-nah", "noun", "f", "oceny", "Dostałem dobrą ocenę.", "Получих добра оценка.", "University", "A1"),
  w("uni17", "zaliczenie", "заверка", "course credit", "zah-lee-CHEH-nyeh", "noun", "n", "zaliczenia", "Mam zaliczenie z gramatyki.", "Имам заверка по граматика.", "University", "A2"),
  w("uni18", "praca dyplomowa", "дипломна работа", "thesis", "PRAH-tsah di-ploh-MOH-vah", "noun", "f", "prace dyplomowe", "Piszę pracę dyplomową.", "Пиша дипломна работа.", "University", "B1"),
  w("uni19", "promotor", "научен ръководител", "thesis advisor", "pro-MOH-tor", "noun", "m", "promotorzy", "Mój promotor jest bardzo wymagający.", "Моят научен ръководител е много взискателен.", "University", "B1"),
  w("uni20", "wykładowca", "преподавател", "lecturer", "vi-kwa-DOV-tsah", "noun", "m", "wykładowcy", "Wykładowca tłumaczy bardzo jasno.", "Преподавателят обяснява много ясно.", "University", "A2"),
  w("uni21", "kolokwium", "колоквиум", "midterm test", "ko-LOK-vyoom", "noun", "n", "kolokwia", "Jutro mam kolokwium.", "Утре имам колоквиум.", "University", "B1"),
  w("uni22", "doktorat", "докторат", "doctorate", "dok-TOH-rat", "noun", "m", "doktoraty", "Robi doktorat w Krakowie.", "Прави докторат в Краков.", "University", "B1"),
  w("uni23", "magister", "магистър", "master's degree", "mah-GEES-ter", "noun", "m", "magistrowie", "Skończyła magistra.", "Завърши магистър.", "University", "A2"),
  w("uni24", "licencjat", "бакалавър", "bachelor's degree", "lee-TSEN-tsyat", "noun", "m", "licencjaty", "Robi licencjat z filologii.", "Прави бакалавър по филология.", "University", "A2"),
  w("uni25", "zajęcia", "занятия", "classes", "zah-YEN-chah", "noun", "—", "—", "Mam zajęcia o dziewiątej.", "Имам занятия в девет.", "University", "A1"),

  // ============================================================
  // FAMILY — full set
  // ============================================================
  w("fam1", "matka", "майка", "mother", "MAHT-kah", "noun", "f", "matki", "Moja matka jest nauczycielką.", "Майка ми е учителка.", "Family", "A1"),
  w("fam2", "ojciec", "баща", "father", "OY-chets", "noun", "m", "ojcowie", "Mój ojciec pracuje w banku.", "Баща ми работи в банка.", "Family", "A1"),
  w("fam3", "brat", "брат", "brother", "braht", "noun", "m", "bracia", "Mam starszego brata.", "Имам по-голям брат.", "Family", "A1"),
  w("fam4", "siostra", "сестра", "sister", "SHOST-rah", "noun", "f", "siostry", "Moja siostra studiuje medycynę.", "Сестра ми учи медицина.", "Family", "A1"),
  w("fam5", "babcia", "баба", "grandmother", "BAB-chah", "noun", "f", "babcie", "Babcia robi pierogi.", "Баба прави пирожки.", "Family", "A1"),
  w("fam6", "dziadek", "дядо", "grandfather", "DJAH-dek", "noun", "m", "dziadkowie", "Dziadek opowiada historie.", "Дядо разказва истории.", "Family", "A1"),
  w("fam7", "ciocia", "леля", "aunt", "CHOH-chah", "noun", "f", "ciocie", "Ciocia mieszka w Gdańsku.", "Леля живее в Гданск.", "Family", "A1"),
  w("fam8", "wujek", "чичо", "uncle", "VOO-yek", "noun", "m", "wujkowie", "Wujek jest lekarzem.", "Чичо е лекар.", "Family", "A1"),
  w("fam9", "kuzyn", "братовчед", "cousin (m)", "KOO-zin", "noun", "m", "kuzyni", "Mój kuzyn mieszka w Warszawie.", "Братовчед ми живее във Варшава.", "Family", "A1"),
  w("fam10", "kuzynka", "братовчедка", "cousin (f)", "koo-ZIN-kah", "noun", "f", "kuzynki", "Kuzynka przyjedzie na święta.", "Братовчедката ще дойде за празниците.", "Family", "A1"),
  w("fam11", "rodzina", "семейство", "family", "roh-DJEE-nah", "noun", "f", "rodziny", "Moja rodzina jest duża.", "Моето семейство е голямо.", "Family", "A1"),
  w("fam12", "rodzice", "родители", "parents", "roh-DJEE-tseh", "noun", "—", "—", "Rodzice mieszkają w Łodzi.", "Родителите живеят в Лодз.", "Family", "A1"),
  w("fam13", "syn", "син", "son", "sin", "noun", "m", "synowie", "Mają dwóch synów.", "Имат двама сина.", "Family", "A1"),
  w("fam14", "córka", "дъщеря", "daughter", "TSOOR-kah", "noun", "f", "córki", "Ich córka ma pięć lat.", "Дъщеря им е на пет години.", "Family", "A1"),
  w("fam15", "mąż", "съпруг", "husband", "monzh", "noun", "m", "mężowie", "Mój mąż jest inżynierem.", "Съпругът ми е инженер.", "Family", "A1"),
  w("fam16", "żona", "съпруга", "wife", "ZHOH-nah", "noun", "f", "żony", "Jego żona jest pisarką.", "Съпругата му е писателка.", "Family", "A1"),
  w("fam17", "dziecko", "дете", "child", "DJETS-ko", "noun", "n", "dzieci", "Dziecko śpi.", "Детето спи.", "Family", "A1"),
  w("fam18", "wnuk", "внук", "grandson", "vnook", "noun", "m", "wnukowie", "Babcia kocha swojego wnuka.", "Баба обича внука си.", "Family", "A1"),
  w("fam19", "wnuczka", "внучка", "granddaughter", "VNOOCH-kah", "noun", "f", "wnuczki", "Wnuczka rysuje obrazek.", "Внучката рисува картинка.", "Family", "A1"),
  w("fam20", "teść", "тъст / свекър", "father-in-law", "teshch", "noun", "m", "teściowie", "Mój teść jest miły.", "Тъстът ми е мил.", "Family", "A2"),
  w("fam21", "teściowa", "тъща / свекърва", "mother-in-law", "tesh-CHOH-vah", "noun", "f", "teściowe", "Teściowa gotuje pyszne obiady.", "Свекървата готви вкусни обеди.", "Family", "A2"),
  w("fam22", "szwagier", "зет / шурей", "brother-in-law", "SHVAH-gyer", "noun", "m", "szwagrowie", "Szwagier pomógł nam w przeprowadzce.", "Зетят ни помогна при преместването.", "Family", "A2"),
  w("fam23", "szwagierka", "етърва / зълва", "sister-in-law", "shvah-GYER-kah", "noun", "f", "szwagierki", "Szwagierka mieszka obok.", "Етървата живее наблизо.", "Family", "A2"),
  w("fam24", "bliźniaki", "близнаци", "twins", "bleezh-NYAH-kee", "noun", "—", "—", "Mam braci bliźniaków.", "Имам братя близнаци.", "Family", "A2"),
  w("fam25", "krewny", "роднина", "relative", "KREV-ni", "noun", "m", "krewni", "To mój daleki krewny.", "Това е мой далечен роднина.", "Family", "A2"),

  // ============================================================
  // FOOD — full expansion
  // ============================================================
  w("food1", "chleb", "хляб", "bread", "khlep", "noun", "m", "chleby", "Kupuję świeży chleb.", "Купувам свеж хляб.", "Food", "A1"),
  w("food2", "ser", "сирене", "cheese", "ser", "noun", "m", "sery", "Lubię żółty ser.", "Харесвам кашкавал.", "Food", "A1"),
  w("food3", "mleko", "мляко", "milk", "MLEH-ko", "noun", "n", "—", "Piję mleko codziennie.", "Пия мляко всеки ден.", "Food", "A1"),
  w("food4", "jajko", "яйце", "egg", "YAHY-ko", "noun", "n", "jajka", "Zjadłam jajko na śniadanie.", "Изядох яйце за закуска.", "Food", "A1"),
  w("food5", "masło", "масло", "butter", "MAH-swo", "noun", "n", "—", "Posmaruj chleb masłem.", "Намажи хляба с масло.", "Food", "A1"),
  w("food6", "mięso", "месо", "meat", "MYEN-so", "noun", "n", "—", "Nie jem mięsa.", "Не ям месо.", "Food", "A1"),
  w("food7", "zupa", "супа", "soup", "ZOO-pah", "noun", "f", "zupy", "Mama gotuje pomidorową zupę.", "Мама готви доматена супа.", "Food", "A1"),
  w("food8", "ryż", "ориз", "rice", "rizh", "noun", "m", "—", "Ugotuj ryż.", "Свари ориз.", "Food", "A1"),
  w("food9", "makaron", "макарони", "pasta", "mah-KAH-ron", "noun", "m", "makarony", "Lubię makaron z sosem.", "Харесвам макарони със сос.", "Food", "A1"),
  w("food10", "jabłko", "ябълка", "apple", "YAHB-wko", "noun", "n", "jabłka", "Jem jabłko codziennie.", "Ям ябълка всеки ден.", "Food", "A1"),
  w("food11", "ziemniak", "картоф", "potato", "zhem-NYAK", "noun", "m", "ziemniaki", "Lubię gotowane ziemniaki.", "Харесвам варени картофи.", "Food", "A1"),
  w("food12", "marchewka", "морков", "carrot", "mar-KHEV-kah", "noun", "f", "marchewki", "Króliki lubią marchewki.", "Зайците харесват моркови.", "Food", "A1"),
  w("food13", "pomidor", "домат", "tomato", "po-MEE-dor", "noun", "m", "pomidory", "Pomidory są dojrzałe.", "Доматите са узрели.", "Food", "A1"),
  w("food14", "ogórek", "краставица", "cucumber", "oh-GOO-rek", "noun", "m", "ogórki", "Robię sałatkę z ogórków.", "Правя салата с краставици.", "Food", "A1"),
  w("food15", "cebula", "лук", "onion", "tseh-BOO-lah", "noun", "f", "cebule", "Pokrój cebulę.", "Нарежи лука.", "Food", "A1"),
  w("food16", "czosnek", "чесън", "garlic", "CHOS-nek", "noun", "m", "—", "Dodaj czosnek do sosu.", "Добави чесън в соса.", "Food", "A2"),
  w("food17", "kurczak", "пиле", "chicken", "KOOR-chak", "noun", "m", "kurczaki", "Pieczony kurczak jest pyszny.", "Печеното пиле е вкусно.", "Food", "A1"),
  w("food18", "wołowina", "телешко", "beef", "voh-woh-VEE-nah", "noun", "f", "—", "Wołowina jest droga.", "Телешкото е скъпо.", "Food", "A2"),
  w("food19", "wieprzowina", "свинско", "pork", "vyeh-psho-VEE-nah", "noun", "f", "—", "Lubię wieprzowinę.", "Харесвам свинско.", "Food", "A2"),
  w("food20", "ryba", "риба", "fish", "RI-bah", "noun", "f", "ryby", "Łowimy rybę.", "Ловим риба.", "Food", "A1"),
  w("food21", "warzywa", "зеленчуци", "vegetables", "vah-ZHI-vah", "noun", "—", "—", "Jedz dużo warzyw.", "Яж много зеленчуци.", "Food", "A1"),
  w("food22", "owoce", "плодове", "fruits", "oh-VOH-tseh", "noun", "—", "—", "Owoce są zdrowe.", "Плодовете са здравословни.", "Food", "A1"),
  w("food23", "cukier", "захар", "sugar", "TSOO-kyer", "noun", "m", "—", "Bez cukru, proszę.", "Без захар, моля.", "Food", "A1"),
  w("food24", "sól", "сол", "salt", "sool", "noun", "f", "—", "Podaj sól.", "Подай солта.", "Food", "A1"),
  w("food25", "pieprz", "пипер", "pepper", "pyepsh", "noun", "m", "—", "Dodaj trochę pieprzu.", "Добави малко пипер.", "Food", "A1"),
  w("food26", "pierogi", "пирожки", "pierogi (dumplings)", "pyeh-ROH-gee", "noun", "—", "—", "Pierogi z kapustą i grzybami.", "Пирожки със зеле и гъби.", "Food", "A2"),
  w("food27", "bigos", "бигош", "hunter's stew", "BEE-gos", "noun", "m", "—", "Bigos to polskie danie.", "Бигош е полско ястие.", "Food", "B1"),
  w("food28", "kotlet schabowy", "шницел", "pork cutlet", "KOT-let skha-BOH-vi", "noun", "m", "—", "Kotlet schabowy z ziemniakami.", "Шницел с картофи.", "Food", "B1"),
  w("food29", "śniadanie", "закуска", "breakfast", "shnyah-DAH-nyeh", "noun", "n", "—", "Jem śniadanie o siódmej.", "Закусвам в седем.", "Food", "A1"),
  w("food30", "obiad", "обяд", "lunch / dinner", "OH-byat", "noun", "m", "obiady", "Obiad jest gotowy.", "Обядът е готов.", "Food", "A1"),
  w("food31", "kolacja", "вечеря", "supper", "ko-LAH-tsyah", "noun", "f", "kolacje", "Kolacja o ósmej.", "Вечеря в осем.", "Food", "A1"),

  // ============================================================
  // TRANSPORTATION — full set
  // ============================================================
  w("tr1", "samochód", "кола", "car", "sah-MOH-khoot", "noun", "m", "samochody", "Mój samochód jest czerwony.", "Колата ми е червена.", "Transportation", "A1"),
  w("tr2", "autobus", "автобус", "bus", "ow-TOH-boos", "noun", "m", "autobusy", "Jadę autobusem do pracy.", "Пътувам с автобус до работа.", "Transportation", "A1"),
  w("tr3", "tramwaj", "трамвай", "tram", "TRAHM-vai", "noun", "m", "tramwaje", "Wsiadłem do tramwaju numer 4.", "Качих се на трамвай номер 4.", "Transportation", "A1"),
  w("tr4", "pociąg", "влак", "train", "POH-chonk", "noun", "m", "pociągi", "Pociąg odjeżdża o piątej.", "Влакът тръгва в пет.", "Transportation", "A1"),
  w("tr5", "rower", "велосипед", "bicycle", "ROH-ver", "noun", "m", "rowery", "Jeżdżę na rowerze do szkoły.", "Карам велосипед до училище.", "Transportation", "A1"),
  w("tr6", "metro", "метро", "subway", "MEH-tro", "noun", "n", "—", "Warszawskie metro jest szybkie.", "Варшавското метро е бързо.", "Transportation", "A1"),
  w("tr7", "lotnisko", "летище", "airport", "lot-NEES-ko", "noun", "n", "lotniska", "Lotnisko Chopina w Warszawie.", "Летище Шопен във Варшава.", "Transportation", "A1"),
  w("tr8", "stacja", "гара / станция", "station", "STAH-tsyah", "noun", "f", "stacje", "Następna stacja: Centrum.", "Следваща станция: Център.", "Transportation", "A1"),
  w("tr9", "bilet", "билет", "ticket", "BEE-let", "noun", "m", "bilety", "Kupiłem bilet w kasie.", "Купих билет на касата.", "Transportation", "A1"),
  w("tr10", "kierowca", "шофьор", "driver", "kyeh-ROV-tsah", "noun", "m", "kierowcy", "Kierowca jest bardzo uprzejmy.", "Шофьорът е много учтив.", "Transportation", "A1"),
  w("tr11", "samolot", "самолет", "airplane", "sah-MOH-lot", "noun", "m", "samoloty", "Samolot ląduje o trzeciej.", "Самолетът каца в три.", "Transportation", "A1"),
  w("tr12", "taksówka", "такси", "taxi", "tak-SOOV-kah", "noun", "f", "taksówki", "Zamówiłem taksówkę.", "Поръчах такси.", "Transportation", "A1"),
  w("tr13", "statek", "кораб", "ship", "STAH-tek", "noun", "m", "statki", "Statek wypływa o świcie.", "Корабът отплава призори.", "Transportation", "A2"),
  w("tr14", "motocykl", "мотоциклет", "motorcycle", "moh-TOH-tsikl", "noun", "m", "motocykle", "Ma czarny motocykl.", "Има черен мотоциклет.", "Transportation", "A2"),
  w("tr15", "przystanek", "спирка", "stop (bus/tram)", "pshi-STAH-nek", "noun", "m", "przystanki", "Czekam na przystanku.", "Чакам на спирката.", "Transportation", "A1"),
  w("tr16", "dworzec", "гара", "train station", "DVOH-zhets", "noun", "m", "dworce", "Dworzec Centralny.", "Централна гара.", "Transportation", "A1"),
  w("tr17", "peron", "перон", "platform", "PEH-ron", "noun", "m", "perony", "Pociąg odjeżdża z peronu drugiego.", "Влакът тръгва от втори перон.", "Transportation", "A2"),
  w("tr18", "rozkład jazdy", "разписание", "timetable", "ROZ-kwat YAHZ-di", "noun", "m", "—", "Sprawdź rozkład jazdy.", "Провери разписанието.", "Transportation", "A2"),
  w("tr19", "opóźnienie", "закъснение", "delay", "oh-poozh-NYEH-nyeh", "noun", "n", "opóźnienia", "Pociąg ma opóźnienie.", "Влакът има закъснение.", "Transportation", "A2"),
  w("tr20", "podróż", "пътуване", "trip", "POH-droozh", "noun", "f", "podróże", "Lubię długie podróże.", "Харесвам дълги пътувания.", "Transportation", "A1"),
  w("tr21", "autostrada", "магистрала", "highway", "ow-toh-STRAH-dah", "noun", "f", "autostrady", "Jedziemy autostradą A4.", "Караме по магистрала A4.", "Transportation", "A2"),
  w("tr22", "skrzyżowanie", "кръстовище", "intersection", "skshi-zho-VAH-nyeh", "noun", "n", "skrzyżowania", "Skręć w prawo na skrzyżowaniu.", "Завий надясно на кръстовището.", "Transportation", "B1"),
  w("tr23", "parking", "паркинг", "parking", "PAR-keenk", "noun", "m", "parkingi", "Gdzie jest parking?", "Къде е паркингът?", "Transportation", "A1"),
  w("tr24", "benzyna", "бензин", "gasoline", "ben-ZI-nah", "noun", "f", "—", "Muszę zatankować benzynę.", "Трябва да заредя бензин.", "Transportation", "A2"),

  // ============================================================
  // ANIMALS — expansion
  // ============================================================
  w("an1", "pies", "куче", "dog", "pyes", "noun", "m", "psy", "Mój pies nazywa się Reksio.", "Кучето ми се казва Рексио.", "Animals", "A1"),
  w("an2", "kot", "котка", "cat", "kot", "noun", "m", "koty", "Kot śpi na kanapie.", "Котката спи на дивана.", "Animals", "A1"),
  w("an3", "koń", "кон", "horse", "kon-y", "noun", "m", "konie", "Koń biega po polu.", "Конят тича по полето.", "Animals", "A1"),
  w("an4", "krowa", "крава", "cow", "KROH-vah", "noun", "f", "krowy", "Krowa daje mleko.", "Кравата дава мляко.", "Animals", "A1"),
  w("an5", "świnia", "свиня", "pig", "SHVEE-nyah", "noun", "f", "świnie", "Świnia tarza się w błocie.", "Свинята се търкаля в калта.", "Animals", "A1"),
  w("an6", "owca", "овца", "sheep", "OF-tsah", "noun", "f", "owce", "Owce pasą się na łące.", "Овцете пасат на ливадата.", "Animals", "A2"),
  w("an7", "kura", "кокошка", "hen", "KOO-rah", "noun", "f", "kury", "Kura zniosła jajko.", "Кокошката снесе яйце.", "Animals", "A1"),
  w("an8", "ptak", "птица", "bird", "ptahk", "noun", "m", "ptaki", "Ptak śpiewa o świcie.", "Птицата пее призори.", "Animals", "A1"),
  w("an9", "ryba", "риба", "fish (animal)", "RI-bah", "noun", "f", "ryby", "Ryba pływa w rzece.", "Рибата плува в реката.", "Animals", "A1"),
  w("an10", "niedźwiedź", "мечка", "bear", "nyedj-VYETJ", "noun", "m", "niedźwiedzie", "Niedźwiedź śpi w jaskini.", "Мечката спи в пещерата.", "Animals", "A2"),
  w("an11", "wilk", "вълк", "wolf", "veelk", "noun", "m", "wilki", "Wilk wyje do księżyca.", "Вълкът вие към луната.", "Animals", "A2"),
  w("an12", "lis", "лисица", "fox", "lees", "noun", "m", "lisy", "Lis jest chytry.", "Лисицата е хитра.", "Animals", "A2"),
  w("an13", "zając", "заек", "hare", "ZAH-yonts", "noun", "m", "zające", "Zając biegnie szybko.", "Заекът тича бързо.", "Animals", "A2"),
  w("an14", "wiewiórka", "катерица", "squirrel", "vyeh-VYOOR-kah", "noun", "f", "wiewiórki", "Wiewiórka zbiera orzechy.", "Катерицата събира орехи.", "Animals", "A2"),
  w("an15", "słoń", "слон", "elephant", "swon-y", "noun", "m", "słonie", "Słoń ma długą trąbę.", "Слонът има дълъг хобот.", "Animals", "A1"),

  // ============================================================
  // BODY — expansion
  // ============================================================
  w("bd1", "głowa", "глава", "head", "GWOH-vah", "noun", "f", "głowy", "Boli mnie głowa.", "Боли ме глава.", "Body", "A1"),
  w("bd2", "oko", "око", "eye", "OH-ko", "noun", "n", "oczy", "Ma niebieskie oczy.", "Има сини очи.", "Body", "A1"),
  w("bd3", "ucho", "ухо", "ear", "OO-kho", "noun", "n", "uszy", "Słyszę uszami.", "Чувам с ушите.", "Body", "A1"),
  w("bd4", "nos", "нос", "nose", "nos", "noun", "m", "nosy", "Mam katar i boli mnie nos.", "Имам хрема и ме боли носът.", "Body", "A1"),
  w("bd5", "usta", "уста", "mouth", "OOS-tah", "noun", "—", "—", "Otwórz usta, proszę.", "Отвори устата, моля.", "Body", "A1"),
  w("bd6", "ząb", "зъб", "tooth", "zomp", "noun", "m", "zęby", "Myję zęby rano.", "Мия зъбите си сутрин.", "Body", "A1"),
  w("bd7", "ręka", "ръка", "hand / arm", "REN-kah", "noun", "f", "ręce", "Trzymaj mnie za rękę.", "Дръж ме за ръката.", "Body", "A1"),
  w("bd8", "noga", "крак", "leg / foot", "NOH-gah", "noun", "f", "nogi", "Boli mnie noga po treningu.", "Боли ме кракът след тренировка.", "Body", "A1"),
  w("bd9", "serce", "сърце", "heart", "SER-tseh", "noun", "n", "serca", "Serce bije szybko.", "Сърцето бие бързо.", "Body", "A1"),
  w("bd10", "włosy", "коса", "hair", "VWOH-si", "noun", "—", "—", "Mam długie włosy.", "Имам дълга коса.", "Body", "A1"),
  w("bd11", "palec", "пръст", "finger", "PAH-lets", "noun", "m", "palce", "Skaleczyłam palec.", "Порязах си пръста.", "Body", "A1"),
  w("bd12", "twarz", "лице", "face", "tvahsh", "noun", "f", "twarze", "Umyj twarz.", "Измий лицето си.", "Body", "A1"),
  w("bd13", "plecy", "гръб", "back", "PLEH-tsi", "noun", "—", "—", "Bolą mnie plecy.", "Боли ме гърбът.", "Body", "A1"),
  w("bd14", "brzuch", "корем", "stomach", "bzhookh", "noun", "m", "brzuchy", "Boli mnie brzuch.", "Боли ме корем.", "Body", "A1"),

  // ============================================================
  // CLOTHING — expansion
  // ============================================================
  w("cl1", "koszula", "риза", "shirt", "ko-SHOO-lah", "noun", "f", "koszule", "Noszę białą koszulę.", "Нося бяла риза.", "Clothing", "A1"),
  w("cl2", "spodnie", "панталони", "trousers", "SPOD-nyeh", "noun", "—", "—", "Te spodnie są za długie.", "Тези панталони са твърде дълги.", "Clothing", "A1"),
  w("cl3", "sukienka", "рокля", "dress", "soo-KYEN-kah", "noun", "f", "sukienki", "Kupiła nową sukienkę.", "Купи нова рокля.", "Clothing", "A1"),
  w("cl4", "buty", "обувки", "shoes", "BOO-ti", "noun", "—", "—", "Moje buty są wygodne.", "Обувките ми са удобни.", "Clothing", "A1"),
  w("cl5", "kurtka", "яке", "jacket", "KOORT-kah", "noun", "f", "kurtki", "Włóż kurtkę, jest zimno.", "Сложи си якето, студено е.", "Clothing", "A1"),
  w("cl6", "płaszcz", "палто", "coat", "pwashch", "noun", "m", "płaszcze", "Mój płaszcz jest czarny.", "Палтото ми е черно.", "Clothing", "A1"),
  w("cl7", "czapka", "шапка", "cap / hat", "CHAHP-kah", "noun", "f", "czapki", "Zimą noszę czapkę.", "Зимата нося шапка.", "Clothing", "A1"),
  w("cl8", "szalik", "шал", "scarf", "SHAH-leek", "noun", "m", "szaliki", "Babcia zrobiła mi szalik.", "Баба ми изплете шал.", "Clothing", "A1"),
  w("cl9", "rękawiczki", "ръкавици", "gloves", "ren-kah-VEECH-kee", "noun", "—", "—", "Zgubiłem rękawiczki.", "Загубих ръкавиците.", "Clothing", "A2"),
  w("cl10", "bluzka", "блуза", "blouse", "BLOOZ-kah", "noun", "f", "bluzki", "Mam czerwoną bluzkę.", "Имам червена блуза.", "Clothing", "A1"),
  w("cl11", "spódnica", "пола", "skirt", "spood-NEE-tsah", "noun", "f", "spódnice", "Spódnica jest za krótka.", "Полата е твърде къса.", "Clothing", "A1"),
  w("cl12", "skarpetki", "чорапи", "socks", "skar-PET-kee", "noun", "—", "—", "Włóż czyste skarpetki.", "Сложи чисти чорапи.", "Clothing", "A1"),

  // ============================================================
  // WEATHER — expansion
  // ============================================================
  w("wt1", "pogoda", "време", "weather", "po-GOH-dah", "noun", "f", "—", "Jaka jest dzisiaj pogoda?", "Какво е времето днес?", "Weather", "A1"),
  w("wt2", "deszcz", "дъжд", "rain", "deshch", "noun", "m", "deszcze", "Pada deszcz od rana.", "Вали дъжд от сутринта.", "Weather", "A1"),
  w("wt3", "śnieg", "сняг", "snow", "shnyek", "noun", "m", "—", "Zimą pada śnieg.", "Зимата вали сняг.", "Weather", "A1"),
  w("wt4", "słońce", "слънце", "sun", "SWON-tseh", "noun", "n", "—", "Słońce mocno świeci.", "Слънцето грее силно.", "Weather", "A1"),
  w("wt5", "wiatr", "вятър", "wind", "vyahtr", "noun", "m", "wiatry", "Wieje silny wiatr.", "Духа силен вятър.", "Weather", "A1"),
  w("wt6", "chmura", "облак", "cloud", "KHMOO-rah", "noun", "f", "chmury", "Niebo jest pełne chmur.", "Небето е пълно с облаци.", "Weather", "A1"),
  w("wt7", "burza", "буря", "storm", "BOO-zhah", "noun", "f", "burze", "Wieczorem będzie burza.", "Вечерта ще има буря.", "Weather", "A2"),
  w("wt8", "mgła", "мъгла", "fog", "mgwah", "noun", "f", "—", "Rano była gęsta mgła.", "Сутринта имаше гъста мъгла.", "Weather", "A2"),
  w("wt9", "mróz", "мраз", "frost", "mroos", "noun", "m", "—", "Na dworze jest mróz.", "Навън има мраз.", "Weather", "A2"),
  w("wt10", "upał", "горещина", "heatwave", "OO-pow", "noun", "m", "upały", "Latem są upały.", "Лятото има горещини.", "Weather", "A2"),
  w("wt11", "ciepło", "топло", "warm", "CHEH-pwo", "adverb", "—", "—", "Dzisiaj jest ciepło.", "Днес е топло.", "Weather", "A1"),
  w("wt12", "zimno", "студено", "cold", "ZHEEM-no", "adverb", "—", "—", "Wczoraj było zimno.", "Вчера беше студено.", "Weather", "A1"),

  // ============================================================
  // TIME — expansion
  // ============================================================
  w("tm1", "dzień", "ден", "day", "djen", "noun", "m", "dni", "Każdy dzień jest inny.", "Всеки ден е различен.", "Time", "A1"),
  w("tm2", "tydzień", "седмица", "week", "TI-djen", "noun", "m", "tygodnie", "Mam wolny tydzień.", "Имам свободна седмица.", "Time", "A1"),
  w("tm3", "miesiąc", "месец", "month", "MYEH-shonts", "noun", "m", "miesiące", "W tym miesiącu wyjeżdżam.", "Този месец заминавам.", "Time", "A1"),
  w("tm4", "rok", "година", "year", "rok", "noun", "m", "lata", "Mam dwadzieścia lat.", "На двадесет години съм.", "Time", "A1"),
  w("tm5", "godzina", "час", "hour", "go-DJEE-nah", "noun", "f", "godziny", "Która godzina?", "Колко е часът?", "Time", "A1"),
  w("tm6", "minuta", "минута", "minute", "mee-NOO-tah", "noun", "f", "minuty", "Poczekaj minutę.", "Изчакай една минута.", "Time", "A1"),
  w("tm7", "rano", "сутрин", "morning", "RAH-no", "adverb", "—", "—", "Wstaję wcześnie rano.", "Ставам рано сутрин.", "Time", "A1"),
  w("tm8", "wieczór", "вечер", "evening", "VYEH-choor", "noun", "m", "wieczory", "Spotkamy się wieczorem.", "Ще се видим вечерта.", "Time", "A1"),
  w("tm9", "noc", "нощ", "night", "nots", "noun", "f", "noce", "Noc jest długa zimą.", "Нощта е дълга зимата.", "Time", "A1"),
  w("tm10", "wczoraj", "вчера", "yesterday", "VCHO-rai", "adverb", "—", "—", "Wczoraj padał deszcz.", "Вчера валеше дъжд.", "Time", "A1"),
  w("tm11", "dzisiaj", "днес", "today", "DJEE-shai", "adverb", "—", "—", "Dzisiaj mam wolne.", "Днес съм свободен.", "Time", "A1"),
  w("tm12", "jutro", "утре", "tomorrow", "YOO-tro", "adverb", "—", "—", "Jutro idę do kina.", "Утре отивам на кино.", "Time", "A1"),

  // ============================================================
  // NATURE — expansion
  // ============================================================
  w("nt1", "drzewo", "дърво", "tree", "DZHEH-vo", "noun", "n", "drzewa", "Drzewo rośnie w ogrodzie.", "Дървото расте в градината.", "Nature", "A1"),
  w("nt2", "kwiat", "цвете", "flower", "kvyaht", "noun", "m", "kwiaty", "Kupiłem kwiaty dla mamy.", "Купих цветя за мама.", "Nature", "A1"),
  w("nt3", "las", "гора", "forest", "lahs", "noun", "m", "lasy", "Las jest cichy i piękny.", "Гората е тиха и красива.", "Nature", "A1"),
  w("nt4", "rzeka", "река", "river", "ZHEH-kah", "noun", "f", "rzeki", "Wisła to najdłuższa rzeka.", "Висла е най-дългата река.", "Nature", "A1"),
  w("nt5", "morze", "море", "sea", "MOH-zheh", "noun", "n", "morza", "Bałtyk to nasze morze.", "Балтийско е нашето море.", "Nature", "A1"),
  w("nt6", "jezioro", "езеро", "lake", "yeh-ZHOH-ro", "noun", "n", "jeziora", "Łowimy ryby w jeziorze.", "Ловим риба в езерото.", "Nature", "A2"),
  w("nt7", "góra", "планина", "mountain", "GOO-rah", "noun", "f", "góry", "Tatry to piękne góry.", "Татрите са красиви планини.", "Nature", "A1"),
  w("nt8", "pole", "поле", "field", "POH-leh", "noun", "n", "pola", "Na polu rośnie zboże.", "На полето расте жито.", "Nature", "A1"),
  w("nt9", "łąka", "ливада", "meadow", "WON-kah", "noun", "f", "łąki", "Krowy pasą się na łące.", "Кравите пасат на ливадата.", "Nature", "A2"),
  w("nt10", "kamień", "камък", "stone", "KAH-myen", "noun", "m", "kamienie", "Znalazłem ciekawy kamień.", "Намерих интересен камък.", "Nature", "A2"),
  w("nt11", "trawa", "трева", "grass", "TRAH-vah", "noun", "f", "—", "Trawa jest zielona.", "Тревата е зелена.", "Nature", "A1"),
  w("nt12", "liść", "лист", "leaf", "leeshch", "noun", "m", "liście", "Jesienią liście są kolorowe.", "Есента листата са цветни.", "Nature", "A1"),

  // ============================================================
  // EMOTIONS — expansion
  // ============================================================
  w("em1", "radość", "радост", "joy", "RAH-doshch", "noun", "f", "—", "Czuję wielką radość.", "Чувствам голяма радост.", "Emotions", "A2"),
  w("em2", "smutek", "тъга", "sadness", "SMOO-tek", "noun", "m", "—", "Smutek mija powoli.", "Тъгата минава бавно.", "Emotions", "A2"),
  w("em3", "strach", "страх", "fear", "strakh", "noun", "m", "—", "Strach przed egzaminem.", "Страх от изпита.", "Emotions", "A2"),
  w("em4", "złość", "гняв", "anger", "ZWOSHCH", "noun", "f", "—", "Nie krzycz ze złości.", "Не крещи от гняв.", "Emotions", "A2"),
  w("em5", "miłość", "любов", "love", "MEE-woshch", "noun", "f", "—", "Miłość jest cierpliwa.", "Любовта е търпелива.", "Emotions", "A2"),
  w("em6", "tęsknota", "тъга по нещо", "longing", "tens-KNOH-tah", "noun", "f", "—", "Tęsknota za domem.", "Тъга по дома.", "Emotions", "B1"),
  w("em7", "nadzieja", "надежда", "hope", "nah-DZEH-yah", "noun", "f", "nadzieje", "Mam nadzieję, że się uda.", "Надявам се да се получи.", "Emotions", "A2"),
  w("em8", "wstyd", "срам", "shame", "vstit", "noun", "m", "—", "Czuję wstyd.", "Изпитвам срам.", "Emotions", "B1"),
];

export const CATEGORIES: WordCategory[] = [
  "Greetings", "Phrases", "Daily speech", "Slang",
  "Verbs", "Adjectives",
  "Food", "Drinks", "Travel", "Transportation",
  "Family", "School", "University", "Jobs", "Emotions", "Time",
  "Colors", "Animals", "Pets", "Clothing", "Technology",
  "Body", "Weather", "Nature", "Literature", "Poetry", "Music",
  "Idioms", "Jokes", "Memes", "Internet", "Cultural",
];

export const WORD_OF_DAY: Word = WORDS.find((x) => x.id === "e1") ?? WORDS[0];

// Conjugation tables
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
  pl: string[];
  bg: string;
  en: string;
};

export const SENTENCES: SentencePuzzle[] = [
  { id: "s1", pl: ["Uczę", "się", "języka", "polskiego"], bg: "Уча полски език.", en: "I am learning the Polish language." },
  { id: "s2", pl: ["Czytam", "ciekawą", "książkę", "wieczorem"], bg: "Чета интересна книга вечер.", en: "I read an interesting book in the evening." },
  { id: "s3", pl: ["Moja", "siostra", "mieszka", "w", "Krakowie"], bg: "Сестра ми живее в Краков.", en: "My sister lives in Kraków." },
  { id: "s4", pl: ["Jutro", "mam", "ważny", "egzamin"], bg: "Утре имам важен изпит.", en: "Tomorrow I have an important exam." },
  { id: "s5", pl: ["Lubię", "pić", "kawę", "z", "mlekiem"], bg: "Обичам да пия кафе с мляко.", en: "I like to drink coffee with milk." },
  { id: "s6", pl: ["Babcia", "piecze", "ciasto", "w", "niedzielę"], bg: "Баба пече сладкиш в неделя.", en: "Grandma bakes a cake on Sunday." },
  { id: "s7", pl: ["Zimą", "często", "pada", "śnieg"], bg: "През зимата често вали сняг.", en: "It often snows in winter." },
];

// Polish cases — for the grammar hub
export type PolishCase = {
  slug: string;
  name: string;
  bg: string;
  en: string;
  question: string;
  questionBg: string;
  intro: string;
  prepositions: string[];
  example: { pl: string; bg: string };
  endings: { label: string; m: string; f: string; n: string; pl: string }[];
};

export const CASES: PolishCase[] = [
  {
    slug: "mianownik", name: "Mianownik", bg: "Именителен", en: "Nominative",
    question: "Kto? Co?", questionBg: "Кой? Какво?",
    intro: "Базовата форма на думата — субект на изречението. Като в българския именителен падеж — но без определителен член.",
    prepositions: [],
    example: { pl: "Student czyta książkę.", bg: "Студентът чете книга." },
    endings: [
      { label: "singular", m: "—", f: "-a", n: "-o / -e", pl: "różnie" },
      { label: "plural",   m: "-i / -y / -owie", f: "-y / -e", n: "-a", pl: "—" },
    ],
  },
  {
    slug: "dopelniacz", name: "Dopełniacz", bg: "Родителен", en: "Genitive",
    question: "Kogo? Czego?", questionBg: "На кого? На какво?",
    intro: "Изразява притежание, отсъствие, количество. Употребява се след отрицание (nie ma) и много предлози.",
    prepositions: ["bez", "do", "od", "u", "z (= from)", "obok", "podczas"],
    example: { pl: "Nie ma mamy w domu.", bg: "Мама не е вкъщи." },
    endings: [
      { label: "singular", m: "-a / -u", f: "-y / -i", n: "-a", pl: "różnie" },
      { label: "plural",   m: "-ów", f: "—", n: "—", pl: "—" },
    ],
  },
  {
    slug: "celownik", name: "Celownik", bg: "Дателен", en: "Dative",
    question: "Komu? Czemu?", questionBg: "На кого? На какво?",
    intro: "Косвеният обект — на кого даваме нещо, на кого помагаме. Употребява се след глаголи като dawać, pomagać, dziękować.",
    prepositions: ["dzięki", "ku", "wbrew", "przeciwko"],
    example: { pl: "Daję bratu książkę.", bg: "Давам книга на брат си." },
    endings: [
      { label: "singular", m: "-owi / -u", f: "-(i)e", n: "-u", pl: "różnie" },
      { label: "plural",   m: "-om", f: "-om", n: "-om", pl: "—" },
    ],
  },
  {
    slug: "biernik", name: "Biernik", bg: "Винителен", en: "Accusative",
    question: "Kogo? Co?", questionBg: "Кого? Какво?",
    intro: "Прекият обект — кого/какво виждаме, обичаме, четем. Употребява се след преходни глаголи.",
    prepositions: ["na", "w", "przez", "za", "po", "pod", "nad"],
    example: { pl: "Czytam książkę.", bg: "Чета книга." },
    endings: [
      { label: "singular", m: "= mianownik / -a", f: "-ę", n: "= mianownik", pl: "różnie" },
      { label: "plural",   m: "różnie", f: "-y / -e", n: "-a", pl: "—" },
    ],
  },
  {
    slug: "narzednik", name: "Narzędnik", bg: "Творителен", en: "Instrumental",
    question: "Kim? Czym?", questionBg: "С кого? С какво?",
    intro: "Изразява инструмент, средство или придружаване. Използва се след глагола być при професии.",
    prepositions: ["z (= with)", "przed", "za", "pod", "nad", "między"],
    example: { pl: "Jestem studentem.", bg: "Аз съм студент." },
    endings: [
      { label: "singular", m: "-em", f: "-ą", n: "-em", pl: "różnie" },
      { label: "plural",   m: "-ami", f: "-ami", n: "-ami", pl: "—" },
    ],
  },
  {
    slug: "miejscownik", name: "Miejscownik", bg: "Местен", en: "Locative",
    question: "O kim? O czym?", questionBg: "За кого? За какво?",
    intro: "Винаги след предлог. Локация и тема на разговора.",
    prepositions: ["w / we", "na", "o", "po", "przy"],
    example: { pl: "Mieszkam w Krakowie.", bg: "Живея в Краков." },
    endings: [
      { label: "singular", m: "-(i)e / -u", f: "-(i)e", n: "-(i)e / -u", pl: "różnie" },
      { label: "plural",   m: "-ach", f: "-ach", n: "-ach", pl: "—" },
    ],
  },
  {
    slug: "wolacz", name: "Wołacz", bg: "Звателен", en: "Vocative",
    question: "O!", questionBg: "О!",
    intro: "Обръщение. В разговорната реч често се заменя с миановник, но в писмен и официален стил остава задължителен.",
    prepositions: [],
    example: { pl: "Pani profesor!", bg: "Госпожо професор!" },
    endings: [
      { label: "singular", m: "-(i)e / -u", f: "-o / -i", n: "= mianownik", pl: "różnie" },
      { label: "plural",   m: "= mianownik", f: "= mianownik", n: "= mianownik", pl: "—" },
    ],
  },
];
