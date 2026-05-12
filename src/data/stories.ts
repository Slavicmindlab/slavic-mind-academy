// Short Polish reading exercises with parallel Bulgarian gloss and a couple
// of comprehension prompts. Used by /stories.

export type Story = {
  id: string;
  title: { pl: string; bg: string };
  level: "A1" | "A2" | "B1" | "B2";
  minutes: number;
  tags: string[];
  paragraphs: { pl: string; bg: string }[];
  questions: { q: string; choices: string[]; answer: number; bg: string }[];
};

export const STORIES: Story[] = [
  {
    id: "kawiarnia",
    title: { pl: "Poranek w krakowskiej kawiarni", bg: "Утро в краковска кафене" },
    level: "A2", minutes: 3, tags: ["everyday", "Kraków", "café"],
    paragraphs: [
      { pl: "Jest sobota. Anna siedzi w małej kawiarni na Kazimierzu i pije kawę. Przy oknie pada lekki deszcz.",
        bg: "Събота е. Ана седи в малко кафене в Казимеж и пие кафе. До прозореца ръми лек дъжд." },
      { pl: "Otwiera książkę — to powieść Olgi Tokarczuk. Czyta powoli, bo polski to nie jest jej język ojczysty.",
        bg: "Тя отваря книга — роман на Олга Токарчук. Чете бавно, защото полският не е родният ѝ език." },
      { pl: "Kelner pyta: „Czy chciałaby pani jeszcze jedną kawę?" Anna uśmiecha się i kiwa głową.",
        bg: "Сервитьорът пита: „Бихте ли желали още едно кафе?" Ана се усмихва и кима с глава." },
    ],
    questions: [
      { q: "Co Anna robi w kawiarni?", choices: ["Pisze list", "Czyta książkę", "Rozmawia z mamą"], answer: 1, bg: "Какво прави Ана в кафенето?" },
      { q: "Jaka jest pogoda?", choices: ["Słońce", "Śnieg", "Lekki deszcz"], answer: 2, bg: "Каква е времето?" },
      { q: "Czyją powieść czyta Anna?", choices: ["Sapkowskiego", "Tokarczuk", "Mickiewicza"], answer: 1, bg: "Чий роман чете Ана?" },
    ],
  },
  {
    id: "uniwersytet",
    title: { pl: "Pierwszy dzień na uniwersytecie", bg: "Първи ден в университета" },
    level: "B1", minutes: 4, tags: ["university", "Sofia", "philology"],
    paragraphs: [
      { pl: "Iwan przyjechał z Sofii do Warszawy na wymianę studencką. Studiuje filologię słowiańską.",
        bg: "Иван е дошъл от София във Варшава по студентска размяна. Учи славянска филология." },
      { pl: "W auli profesor mówi szybko, ale Iwan rozumie większość słów — bułgarski i polski są pokrewne.",
        bg: "В аулата професорът говори бързо, но Иван разбира повечето думи — българският и полският са сродни." },
      { pl: "Po wykładzie nowa koleżanka pyta go: „Skąd jesteś?" Iwan odpowiada z dumą: „Z Bułgarii. Uczę się polskiego od dwóch lat."",
        bg: "След лекцията нова състудентка го пита: „Откъде си?" Иван отговаря с гордост: „От България. Уча полски от две години."" },
    ],
    questions: [
      { q: "Co studiuje Iwan?", choices: ["Matematykę", "Filologię słowiańską", "Historię"], answer: 1, bg: "Какво учи Иван?" },
      { q: "Skąd pochodzi Iwan?", choices: ["Z Polski", "Z Rosji", "Z Bułgarii"], answer: 2, bg: "Откъде е Иван?" },
      { q: "Od ilu lat uczy się polskiego?", choices: ["Od roku", "Od dwóch lat", "Od pięciu lat"], answer: 1, bg: "От колко години учи полски?" },
    ],
  },
  {
    id: "podroz",
    title: { pl: "Pociąg do Gdańska", bg: "Влакът до Гданск" },
    level: "A2", minutes: 3, tags: ["travel", "trains"],
    paragraphs: [
      { pl: "Marek kupuje bilet na pociąg do Gdańska. Podróż trwa pięć godzin.",
        bg: "Марек купува билет за влака до Гданск. Пътуването трае пет часа." },
      { pl: "W przedziale siedzi starsza pani z kotem w koszyku. Marek czyta gazetę i patrzy przez okno na pola i lasy.",
        bg: "В купето седи възрастна дама с котка в кошница. Марек чете вестник и гледа през прозореца поля и гори." },
      { pl: "Wieczorem czuje zapach morza. Gdańsk wita go zimnym wiatrem i światłami portu.",
        bg: "Вечерта той усеща мириса на морето. Гданск го посреща със студен вятър и светлините на пристанището." },
    ],
    questions: [
      { q: "Dokąd jedzie Marek?", choices: ["Do Krakowa", "Do Gdańska", "Do Wrocławia"], answer: 1, bg: "Накъде пътува Марек?" },
      { q: "Ile trwa podróż?", choices: ["Trzy godziny", "Pięć godzin", "Siedem godzin"], answer: 1, bg: "Колко трае пътуването?" },
    ],
  },
  {
    id: "wieczor",
    title: { pl: "Wieczór z babcią", bg: "Вечер с баба" },
    level: "A1", minutes: 2, tags: ["family", "cozy"],
    paragraphs: [
      { pl: "Babcia Zofia robi pierogi. W kuchni pachnie ciastem i serem.",
        bg: "Баба Зофия прави пироги. В кухнята мирише на тесто и сирене." },
      { pl: "Wnuk Tomek pomaga jej. Lepi małe, krzywe pierogi i śmieje się głośno.",
        bg: "Внукът Томек ѝ помага. Слепя малки, криви пироги и се смее на глас." },
      { pl: "Wieczorem siadają razem przy stole i jedzą. „Pyszne!" — mówi Tomek.",
        bg: "Вечерта сядат заедно на масата и ядат. „Вкусно!" — казва Томек." },
    ],
    questions: [
      { q: "Co robi babcia?", choices: ["Pierogi", "Zupę", "Ciasto"], answer: 0, bg: "Какво прави бабата?" },
      { q: "Kto jej pomaga?", choices: ["Mama", "Wnuk Tomek", "Kot"], answer: 1, bg: "Кой ѝ помага?" },
    ],
  },
];
