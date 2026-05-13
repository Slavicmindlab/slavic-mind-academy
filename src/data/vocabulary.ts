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
  | "Cultural";

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
];

export const CATEGORIES: WordCategory[] = [
  "Greetings", "Phrases", "Daily speech", "Slang",
  "Verbs", "Adjectives",
  "Food", "Drinks", "Travel", "Transportation",
  "Family", "University", "Jobs", "Emotions", "Time",
  "Colors", "Animals", "Pets", "Clothing", "Technology",
  "Body", "Weather", "Nature", "Literature",
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
