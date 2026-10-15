export type WordHubItem = {
  pl: string;
  bg: string;
  note?: string;
  partOfSpeech: "rzeczownik" | "czasownik" | "przymiotnik" | "wyrażenie";
  gender?: "męski" | "żeński" | "nijaki" | "liczba mnoga";
  aspect?: "niedokonany" | "dokonany" | "para aspektowa";
  government?: string;
  usage: string;
  example: { pl: string; bg: string };
};

export type WordHubSection = {
  number?: number;
  title: string;
  items: WordHubItem[];
};

export type WordHubTopic = {
  id: string;
  number: number;
  title: string;
  level: "A1" | "A2" | "B1";
  description: string;
  sections: WordHubSection[];
};

const FEMININE = new Set([
  "wieś",
  "stolica",
  "miejscowość",
  "okolica",
  "gmina",
  "metropolia",
  "kamienica",
  "dzielnica",
  "elewacja",
  "ulica",
  "ulica główna",
  "ulica jednokierunkowa",
  "ulica dwukierunkowa",
  "ulica handlowa",
  "ulica dla pieszych",
  "autostrada",
  "aleja",
  "brukowana ulica",
  "jezdnia",
  "kładka",
  "lokomotywa",
  "kolej",
  "stacja paliw",
  "obwodnica",
  "pętla",
  "fontanna",
  "ławka",
  "ścieżka",
  "sala koncertowa",
  "biblioteka",
  "księgarnia",
  "galeria sztuki",
  "galeria handlowa",
  "atrakcja turystyczna",
  "apteka",
  "siłownia",
  "restauracja",
  "knajpa",
  "dyskoteka",
  "kawiarnia",
  "cukiernia",
  "piekarnia",
  "lodziarnia",
  "piwiarnia",
  "starówka",
  "cerkiew",
  "synagoga",
  "katedra",
  "twierdza",
  "brama",
  "wieża",
  "instytucja",
  "rada miejska",
  "rada ministrów",
  "władza lokalna",
  "poczta",
  "szkoła wyższa",
  "uczelnia",
  "akademia",
  "szkoła podstawowa",
  "latarnia",
]);

const NEUTER = new Set([
  "miasto",
  "województwo",
  "przedmieście",
  "śródmieście",
  "centrum",
  "osiedle mieszkaniowe",
  "biuro",
  "skrzyżowanie",
  "rondo",
  "światło",
  "przejście podziemne",
  "auto",
  "metro",
  "lotnisko",
  "paliwo",
  "przejście dla pieszych",
  "ogrodzenie",
  "drzewo",
  "miejsce do zwiedzania",
  "kino",
  "muzeum",
  "wesołe miasteczko",
  "boisko",
  "lodowisko",
  "stare miasto",
  "zgromadzenie narodowe",
  "zdjęcie z lotu ptaka",
  "tło",
]);

const PLURAL_ONLY = new Set(["światła drogowe", "ruiny"]);

const VERBS: Record<string, Pick<WordHubItem, "aspect" | "government" | "usage" | "example">> = {
  budować: {
    aspect: "niedokonany",
    government: "budować + biernik (kogo? co?)",
    usage: "Продължително или повтарящо се строене; свършеният партньор е „zbudować“.",
    example: { pl: "Budują nowy most nad rzeką.", bg: "Строят нов мост над реката." },
  },
  "skręcać / skręcić": {
    aspect: "para aspektowa",
    government: "skręcić w + biernik; skręcić z + dopełniacz",
    usage: "„skręcać“ означава процес/повторение, а „skręcić“ — еднократно завършено действие.",
    example: { pl: "Na skrzyżowaniu skręć w lewo.", bg: "На кръстовището завий наляво." },
  },
  przejść: {
    aspect: "dokonany",
    government: "przejść przez + biernik; przejść do + dopełniacz",
    usage: "Завършено преминаване или прекосяване; несвършеният партньор е „przechodzić“.",
    example: { pl: "Przejdź przez ulicę na światłach.", bg: "Пресечи улицата на светофара." },
  },
  założyć: {
    aspect: "dokonany",
    government: "założyć + biernik (co?)",
    usage: "В тази тема означава „основа/създам“ град, институция или организация.",
    example: { pl: "Miasto założono w XIII wieku.", bg: "Градът е основан през XIII век." },
  },
  powstać: {
    aspect: "dokonany",
    government: "powstać + bez przyimka; powstać w + miejscownik",
    usage: "За възникване, появяване или основаване; несвършеният партньор е „powstawać“.",
    example: {
      pl: "Nowa dzielnica powstała nad rzeką.",
      bg: "Новият квартал възникна край реката.",
    },
  },
  dotrzeć: {
    aspect: "dokonany",
    government: "dotrzeć do + dopełniacz",
    usage: "Означава успешно достигане до място; несвършеният партньор е „docierać“.",
    example: { pl: "Jak dotrzeć do starego miasta?", bg: "Как да стигна до стария град?" },
  },
  "dostać się": {
    aspect: "dokonany",
    government: "dostać się do + dopełniacz; dostać się na + biernik",
    usage: "Подчертава начина или усилието да се стигне/влезе някъде.",
    example: { pl: "Jak dostać się na lotnisko?", bg: "Как да стигна до летището?" },
  },
  omijać: {
    aspect: "niedokonany",
    government: "omijać + biernik (kogo? co?)",
    usage: "За заобикаляне или избягване; свършеният партньор е „ominąć“.",
    example: {
      pl: "Autobusy omijają centrum miasta.",
      bg: "Автобусите заобикалят центъра на града.",
    },
  },
};

const SPECIAL: Record<string, Partial<WordHubItem>> = {
  miejski: {
    partOfSpeech: "przymiotnik",
    usage: "Прилагателно; съгласува се по род, число и падеж със съществителното.",
    example: { pl: "To jest urząd miejski.", bg: "Това е общинска служба." },
  },
  pieszy: {
    partOfSpeech: "rzeczownik",
    gender: "męski",
    usage: "Като съществително означава „пешеходец“, а като прилагателно — „пешеходен“.",
    example: {
      pl: "Pieszy czeka przed przejściem.",
      bg: "Пешеходецът чака пред пешеходната пътека.",
    },
  },
  "w tle": {
    partOfSpeech: "wyrażenie",
    government: "w + miejscownik",
    usage: "Израз за предмет или място, което се вижда на заден план.",
    example: {
      pl: "W tle widać wieżę kościoła.",
      bg: "На заден план се вижда кулата на църквата.",
    },
  },
  "ulica dla pieszych": {
    partOfSpeech: "wyrażenie",
    gender: "żeński",
    government: "dla + dopełniacz: dla pieszych",
    usage: "Назовава улица, предназначена за пешеходци и обикновено затворена за автомобили.",
    example: { pl: "To spokojna ulica dla pieszych.", bg: "Това е спокойна пешеходна улица." },
  },
  "miejsce do zwiedzania": {
    partOfSpeech: "wyrażenie",
    gender: "nijaki",
    government: "do + dopełniacz: do zwiedzania",
    usage: "Общо название за място, което туристите могат да посетят и разгледат.",
    example: {
      pl: "To ciekawe miejsce do zwiedzania.",
      bg: "Това е интересно място за посещение.",
    },
  },
  "przejście dla pieszych": {
    partOfSpeech: "wyrażenie",
    gender: "nijaki",
    government: "dla + dopełniacz: dla pieszych",
    usage: "Официалното название на обозначено място за пресичане на улица.",
    example: {
      pl: "Przejście dla pieszych jest obok przystanku.",
      bg: "Пешеходната пътека е до спирката.",
    },
  },
  "stacja paliw": {
    partOfSpeech: "wyrażenie",
    gender: "żeński",
    government: "paliw — dopełniacz liczby mnogiej od „paliwo“",
    usage: "Полското стандартно название за бензиностанция.",
    example: {
      pl: "Najbliższa stacja paliw jest za rondem.",
      bg: "Най-близката бензиностанция е след кръговото.",
    },
  },
  "plac zabaw": {
    partOfSpeech: "wyrażenie",
    gender: "męski",
    government: "zabaw — dopełniacz liczby mnogiej od „zabawa“",
    usage: "Площадка с уреди и пространство за детски игри.",
    example: { pl: "Dzieci bawią się na placu zabaw.", bg: "Децата играят на детската площадка." },
  },
  "galeria sztuki": {
    partOfSpeech: "wyrażenie",
    gender: "żeński",
    government: "sztuki — dopełniacz liczby pojedynczej od „sztuka“",
    usage: "Място за изложби и представяне на художествени произведения.",
    example: {
      pl: "W galerii sztuki oglądamy obrazy.",
      bg: "В художествената галерия разглеждаме картини.",
    },
  },
  "rada ministrów": {
    partOfSpeech: "wyrażenie",
    gender: "żeński",
    government: "ministrów — dopełniacz liczby mnogiej od „minister“",
    usage: "Официално название на правителството като колективен орган.",
    example: {
      pl: "Rada Ministrów przyjęła projekt ustawy.",
      bg: "Министерският съвет прие проектозакона.",
    },
  },
  "prezydent miasta": {
    partOfSpeech: "wyrażenie",
    gender: "męski",
    government: "miasta — dopełniacz liczby pojedynczej od „miasto“",
    usage: "В Полша това е названието на кмета на определени, обикновено по-големи градове.",
    example: { pl: "Prezydent miasta otworzył nowy park.", bg: "Кметът на града откри нов парк." },
  },
  "zdjęcie z lotu ptaka": {
    partOfSpeech: "wyrażenie",
    gender: "nijaki",
    government: "z + dopełniacz: z lotu ptaka",
    usage: "Устойчив израз за снимка или гледка, заснета от високо.",
    example: {
      pl: "To zdjęcie miasta z lotu ptaka.",
      bg: "Това е снимка на града от птичи поглед.",
    },
  },
};

const item = (pl: string, bg: string, note?: string): WordHubItem => {
  const verb = VERBS[pl];
  if (verb) return { pl, bg, note, partOfSpeech: "czasownik", ...verb };

  const special = SPECIAL[pl];
  if (special) {
    return {
      pl,
      bg,
      note,
      partOfSpeech: special.partOfSpeech ?? "wyrażenie",
      gender: special.gender,
      aspect: special.aspect,
      government: special.government,
      usage: special.usage ?? "Устойчив израз, използван при описание на града.",
      example: special.example ?? { pl: `Przykład: ${pl}.`, bg: `Пример: ${bg}.` },
    };
  }

  const gender = PLURAL_ONLY.has(pl)
    ? "liczba mnoga"
    : FEMININE.has(pl)
      ? "żeński"
      : NEUTER.has(pl)
        ? "nijaki"
        : "męski";

  const plural = gender === "liczba mnoga";
  return {
    pl,
    bg,
    note,
    partOfSpeech: "rzeczownik",
    gender,
    usage: "Дума от тематичния речник за града; формата е дадена в именителен падеж.",
    example: {
      pl: plural ? `W centrum znajdują się ${pl}.` : `W centrum znajduje się ${pl}.`,
      bg: `В центъра има ${bg}.`,
    },
  };
};

export const WORD_HUB_TOPICS: WordHubTopic[] = [
  {
    id: "miasto",
    number: 1,
    title: "Miasto",
    level: "A1",
    description: "Градът, сградите, движението, забележителностите, заведенията и институциите.",
    sections: [
      {
        title: "Podstawowe pojęcia",
        items: [
          item("miasto", "град"),
          item("wieś", "село"),
          item("stolica", "столица"),
          item("województwo", "воеводство; област в Полша"),
          item("okręg", "окръг; район"),
          item("przedmieście", "предградие"),
          item("śródmieście", "централна градска част"),
          item("centrum", "център"),
          item("miejscowość", "населено място"),
          item("okolica", "околност; район"),
          item("gmina", "община"),
          item("metropolia", "метрополия; голям градски център"),
        ],
      },
      {
        number: 1,
        title: "Budynek",
        items: [
          item("budynek", "сграда"),
          item("budować", "строя", "несвършен вид"),
          item("gmach", "голяма представителна сграда"),
          item("dom", "къща; дом"),
          item("kamienica", "градска жилищна сграда; стара кооперация"),
          item("blok mieszkalny", "жилищен блок"),
          item("osiedle mieszkaniowe", "жилищен комплекс; квартал"),
          item("dzielnica", "квартал; градски район"),
          item("wieżowiec", "небостъргач; висока сграда"),
          item("biurowiec", "офис сграда"),
          item("biuro", "офис; бюро"),
          item("elewacja", "фасада"),
        ],
      },
      {
        number: 2,
        title: "Ulice, ruch drogowy i transport",
        items: [
          item("ulica", "улица"),
          item("ulica główna", "главна улица"),
          item("ulica jednokierunkowa", "еднопосочна улица"),
          item("ulica dwukierunkowa", "двупосочна улица"),
          item("ulica handlowa", "търговска улица"),
          item("ulica dla pieszych", "пешеходна улица"),
          item("deptak", "пешеходна зона; пешеходна улица"),
          item("autostrada", "магистрала"),
          item("aleja", "алея; булевард"),
          item("brukowana ulica", "павирана улица"),
          item("chodnik", "тротоар"),
          item("jezdnia", "пътно платно"),
          item("krawężnik", "бордюр"),
          item("ruch", "движение"),
          item("skrzyżowanie", "кръстовище"),
          item("rondo", "кръгово кръстовище"),
          item("plac", "площад"),
          item("rynek", "централен пазарен площад"),
          item("światło", "светлина; сигнал"),
          item("światła drogowe", "светофар"),
          item("parking", "паркинг"),
          item("kładka", "пешеходен надлез"),
          item("przystanek", "спирка"),
          item("znak drogowy", "пътен знак"),
          item("przejście podziemne", "подлез"),
          item("zakręt", "завой"),
          item("dworzec", "гара; автогара"),
          item("samochód", "автомобил"),
          item("auto", "кола; автомобил", "разговорно"),
          item("pojazd", "превозно средство"),
          item("środek transportu", "транспортно средство"),
          item("pociąg", "влак"),
          item("trolejbus", "тролейбус"),
          item("metro", "метро"),
          item("lokomotywa", "локомотив"),
          item("samolot", "самолет"),
          item("tramwaj", "трамвай"),
          item("kolej", "железница"),
          item("port", "пристанище"),
          item("lotnisko", "летище"),
          item("most", "мост"),
          item("stacja paliw", "бензиностанция"),
          item("paliwo", "гориво"),
          item("obwodnica", "околовръстен път"),
          item("korek", "задръстване"),
          item("przejście dla pieszych", "пешеходна пътека"),
          item("pętla", "крайна спирка; обръщало"),
          item("skręcać / skręcić", "завивам / завия"),
          item("róg", "ъгъл"),
          item("przejść", "премина; прекося"),
          item("omijać", "заобикалям; избягвам"),
          item("objazd", "обходен маршрут"),
          item("dotrzeć", "стигна; достигна"),
          item("dostać się", "стигна; добера се"),
          item("postój", "престой; стоянка"),
          item("pieszy", "пешеходец; пешеходен"),
          item("słup", "стълб"),
          item("latarnia", "улична лампа; фенер"),
        ],
      },
      {
        number: 3,
        title: "Park",
        items: [
          item("park", "парк"),
          item("ogród", "градина"),
          item("skwer", "малък градски площад със зеленина"),
          item("zieleniec", "малка озеленена площ"),
          item("trawnik", "тревна площ; морава"),
          item("kwiat", "цвете"),
          item("fontanna", "фонтан"),
          item("ławka", "пейка"),
          item("ogrodzenie", "ограда"),
          item("drzewo", "дърво"),
          item("ścieżka", "пътека"),
          item("kosz", "кош; кошче"),
        ],
      },
      {
        number: 4,
        title: "Miejsca do zwiedzania",
        items: [
          item("miejsce do zwiedzania", "място за посещение; забележителност"),
          item("kino", "кино"),
          item("teatr", "театър"),
          item("muzeum", "музей"),
          item("sala koncertowa", "концертна зала"),
          item("biblioteka", "библиотека"),
          item("księgarnia", "книжарница"),
          item("galeria sztuki", "художествена галерия"),
          item("galeria handlowa", "търговски център"),
          item("atrakcja turystyczna", "туристическа атракция"),
          item("basen", "басейн"),
          item("wesołe miasteczko", "увеселителен парк"),
          item("ogród zoologiczny", "зоологическа градина"),
          item("ogród botaniczny", "ботаническа градина"),
          item("plac zabaw", "детска площадка"),
          item("targ", "пазар"),
          item("bazar", "базар"),
          item("stragan", "сергия"),
          item("apteka", "аптека"),
          item("boisko", "игрище"),
          item("stadion", "стадион"),
          item("lodowisko", "ледена пързалка"),
          item("siłownia", "фитнес зала"),
          item("cmentarz", "гробище"),
        ],
      },
      {
        number: 5,
        title: "Lokale",
        items: [
          item("lokal", "заведение; помещение"),
          item("restauracja", "ресторант"),
          item("knajpa", "кръчма; заведение", "разговорно"),
          item("pub", "пъб"),
          item("bar mleczny", "полски тип евтина столова"),
          item("klub", "клуб"),
          item("klub nocny", "нощен клуб"),
          item("dyskoteka", "дискотека"),
          item("kawiarnia", "кафене"),
          item("cukiernia", "сладкарница"),
          item("piekarnia", "пекарна"),
          item("lodziarnia", "сладоледена къща"),
          item("piwiarnia", "бирария"),
        ],
      },
      {
        number: 6,
        title: "Zabytki",
        items: [
          item("zabytek", "паметник на културата; историческа забележителност"),
          item("stare miasto", "стар град"),
          item("starówka", "старата градска част"),
          item("ruiny", "руини"),
          item("kościół", "църква; католически храм"),
          item("cerkiew", "православен храм"),
          item("synagoga", "синагога"),
          item("meczet", "джамия"),
          item("minaret", "минаре"),
          item("klasztor", "манастир"),
          item("katedra", "катедрала"),
          item("pomnik", "паметник"),
          item("pałac", "дворец"),
          item("zamek", "замък"),
          item("twierdza", "крепост"),
          item("brama", "порта"),
          item("wieża", "кула"),
          item("mur", "зид; крепостна стена"),
          item("łuk", "арка; свод"),
        ],
      },
      {
        number: 7,
        title: "Instytucje",
        items: [
          item("instytucja", "институция"),
          item("ratusz", "кметство; градска управа"),
          item("urząd", "учреждение; служба"),
          item("pałac prezydencki", "президентски дворец"),
          item("rada miejska", "общински съвет"),
          item("miejski", "градски; общински"),
          item("rada ministrów", "министерски съвет"),
          item("parlament", "парламент"),
          item("zgromadzenie narodowe", "народно събрание"),
          item("władza lokalna", "местна власт"),
          item("prezydent miasta", "кмет на голям град в Полша"),
          item("bank", "банка"),
          item("bankomat", "банкомат"),
          item("poczta", "поща"),
          item("szkoła wyższa", "висше училище"),
          item("uniwersytet", "университет"),
          item("uczelnia", "висше учебно заведение"),
          item("akademia", "академия"),
          item("akademik", "студентско общежитие"),
          item("szkoła podstawowa", "основно училище"),
          item("żłobek", "детска ясла"),
        ],
      },
      {
        title: "Opis i historia miasta",
        items: [
          item("założyć", "основа; създам"),
          item("powstać", "възникна; бъда основан"),
          item("tło", "фон"),
          item("w tle", "на заден план"),
          item("zdjęcie z lotu ptaka", "снимка от птичи поглед"),
        ],
      },
    ],
  },
];
