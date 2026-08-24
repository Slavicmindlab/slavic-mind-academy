import { WORDS, type Word, type WordCategory } from "@/data/vocabulary";

export type Difficulty = Word["difficulty"];
export type GameWord = Word & { canonical: string };

export const normalizePolish = (value: string) =>
  value
    .trim()
    .toLocaleLowerCase("pl-PL")
    .normalize("NFC");

export function shuffle<T>(items: readonly T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function uniqueGameWords(words: readonly Word[] = WORDS): GameWord[] {
  const seen = new Map<string, GameWord>();
  for (const word of words) {
    const canonical = normalizePolish(word.pl);
    if (!seen.has(canonical)) seen.set(canonical, { ...word, canonical });
  }
  return [...seen.values()];
}

export const GAME_WORDS = uniqueGameWords();

export function sampleGameWords({
  count,
  difficulties,
  categories,
  exclude = [],
  uniqueTranslations = true,
}: {
  count: number;
  difficulties?: Difficulty[];
  categories?: WordCategory[];
  exclude?: string[];
  uniqueTranslations?: boolean;
}): GameWord[] {
  const excluded = new Set(exclude);
  const candidates = shuffle(
    GAME_WORDS.filter(
      (word) =>
        !excluded.has(word.canonical) &&
        (!difficulties?.length || difficulties.includes(word.difficulty)) &&
        (!categories?.length || categories.includes(word.category)),
    ),
  );

  const picked: GameWord[] = [];
  const bgSeen = new Set<string>();
  const enSeen = new Set<string>();
  for (const word of candidates) {
    const bg = word.bg.trim().toLocaleLowerCase("bg-BG");
    const en = word.en.trim().toLocaleLowerCase("en-US");
    if (uniqueTranslations && (bgSeen.has(bg) || enSeen.has(en))) continue;
    picked.push(word);
    bgSeen.add(bg);
    enSeen.add(en);
    if (picked.length >= count) break;
  }
  return picked;
}

export type GameSentence = {
  id: string;
  difficulty: Difficulty;
  topic: string;
  pl: string;
  bg: string;
  en: string;
};

const sentence = (
  id: string,
  difficulty: Difficulty,
  topic: string,
  pl: string,
  bg: string,
  en: string,
): GameSentence => ({ id, difficulty, topic, pl, bg, en });

export const GAME_SENTENCES: GameSentence[] = [
  sentence("a1-01", "A1", "university", "Dzisiaj mam dwa wykłady na uniwersytecie.", "Днес имам две лекции в университета.", "Today I have two lectures at the university."),
  sentence("a1-02", "A1", "cafe", "Po zajęciach piję kawę z koleżanką.", "След занятията пия кафе с колежка.", "After class I drink coffee with a friend."),
  sentence("a1-03", "A1", "home", "Mój kot śpi na moim krześle.", "Котката ми спи на моя стол.", "My cat sleeps on my chair."),
  sentence("a1-04", "A1", "family", "Moja siostra mieszka blisko centrum.", "Сестра ми живее близо до центъра.", "My sister lives near the city centre."),
  sentence("a1-05", "A1", "transport", "Autobus numer pięć jedzie do centrum.", "Автобус номер пет отива до центъра.", "Bus number five goes to the centre."),
  sentence("a1-06", "A1", "shopping", "Kupuję chleb, mleko i czerwone jabłka.", "Купувам хляб, мляко и червени ябълки.", "I buy bread, milk and red apples."),
  sentence("a1-07", "A1", "weather", "Dzisiaj jest ciepło, ale trochę pada.", "Днес е топло, но вали малко.", "Today it is warm, but it is raining a little."),
  sentence("a1-08", "A1", "restaurant", "Poproszę zupę pomidorową i wodę.", "Моля доматена супа и вода.", "I would like tomato soup and water."),
  sentence("a1-09", "A1", "study", "Wieczorem uczę się nowych polskich słów.", "Вечер уча нови полски думи.", "In the evening I learn new Polish words."),
  sentence("a1-10", "A1", "station", "Pociąg do Krakowa odjeżdża o ósmej.", "Влакът за Краков тръгва в осем.", "The train to Krakow leaves at eight."),
  sentence("a1-11", "A1", "home", "W kuchni stoi mały drewniany stół.", "В кухнята има малка дървена маса.", "There is a small wooden table in the kitchen."),
  sentence("a1-12", "A1", "friends", "Mój przyjaciel bardzo lubi polską muzykę.", "Моят приятел много харесва полска музика.", "My friend really likes Polish music."),
  sentence("a1-13", "A1", "airport", "Mam paszport i bilet w plecaku.", "Имам паспорт и билет в раницата.", "I have my passport and ticket in my backpack."),
  sentence("a1-14", "A1", "city", "Biblioteka jest obok dużego parku.", "Библиотеката е до големия парк.", "The library is next to the big park."),
  sentence("a1-15", "A1", "family", "Babcia robi najlepsze pierogi w rodzinie.", "Баба прави най-добрите пироги в семейството.", "Grandma makes the best pierogi in the family."),
  sentence("a1-16", "A1", "university", "Profesor pisze nowe słowo na tablicy.", "Професорът пише нова дума на дъската.", "The professor writes a new word on the board."),
  sentence("a1-17", "A1", "hobby", "W sobotę gram z przyjaciółmi w piłkę.", "В събота играя футбол с приятели.", "On Saturday I play football with friends."),
  sentence("a1-18", "A1", "cafe", "Ta kawiarnia ma bardzo dobre ciasto.", "Това кафене има много хубав сладкиш.", "This café has very good cake."),
  sentence("a1-19", "A1", "transport", "Na przystanku czeka dużo ludzi.", "На спирката чакат много хора.", "Many people are waiting at the stop."),
  sentence("a1-20", "A1", "home", "Rano otwieram okno i robię śniadanie.", "Сутрин отварям прозореца и правя закуска.", "In the morning I open the window and make breakfast."),
  sentence("a1-21", "A1", "shopping", "Szukam czarnej kurtki na zimę.", "Търся черно яке за зимата.", "I am looking for a black jacket for winter."),
  sentence("a1-22", "A1", "relationships", "Czekam na żonę przed kinem.", "Чакам жена си пред киното.", "I am waiting for my wife in front of the cinema."),
  sentence("a1-23", "A1", "city", "Skręć w lewo przy następnym skrzyżowaniu.", "Завий наляво на следващото кръстовище.", "Turn left at the next intersection."),
  sentence("a1-24", "A1", "culture", "W muzeum oglądamy stare obrazy.", "В музея разглеждаме стари картини.", "At the museum we look at old paintings."),
  sentence("a1-25", "A1", "weather", "Zimą często noszę ciepły szalik.", "През зимата често нося топъл шал.", "In winter I often wear a warm scarf."),
  sentence("a1-26", "A1", "food", "Na obiad jem rybę z warzywami.", "За обяд ям риба със зеленчуци.", "For lunch I eat fish with vegetables."),
  sentence("a1-27", "A1", "study", "Nie rozumiem tego ćwiczenia z gramatyki.", "Не разбирам това упражнение по граматика.", "I do not understand this grammar exercise."),
  sentence("a1-28", "A1", "home", "Telefon leży obok mojego laptopa.", "Телефонът е до лаптопа ми.", "The phone is next to my laptop."),
  sentence("a1-29", "A1", "friends", "Spotykamy się jutro o szóstej wieczorem.", "Срещаме се утре в шест вечерта.", "We are meeting tomorrow at six in the evening."),
  sentence("a1-30", "A1", "humor", "Mój pies zawsze chce moje śniadanie.", "Кучето ми винаги иска закуската ми.", "My dog always wants my breakfast."),

  sentence("a2-01", "A2", "university", "Dzisiaj po zajęciach idę z koleżanką do małej kawiarni obok uniwersytetu.", "Днес след занятията отивам с колежка в малко кафене до университета.", "Today after class I am going with a friend to a small café next to the university."),
  sentence("a2-02", "A2", "station", "Mimo opóźnienia pociągu zdążyliśmy na ostatni autobus.", "Въпреки закъснението на влака успяхме да хванем последния автобус.", "Despite the train delay, we caught the last bus."),
  sentence("a2-03", "A2", "renting", "Szukamy mieszkania z jasną kuchnią i małym balkonem.", "Търсим апартамент със светла кухня и малък балкон.", "We are looking for a flat with a bright kitchen and a small balcony."),
  sentence("a2-04", "A2", "shopping", "Kupiłem tę kurtkę, ponieważ była na dużej promocji.", "Купих това яке, защото беше на голямо намаление.", "I bought this jacket because it was heavily discounted."),
  sentence("a2-05", "A2", "weather", "Jeśli jutro nie będzie padać, pójdziemy do parku.", "Ако утре не вали, ще отидем в парка.", "If it does not rain tomorrow, we will go to the park."),
  sentence("a2-06", "A2", "restaurant", "Kelner przyniósł nam zupę, ale zapomniał o napojach.", "Сервитьорът ни донесе супата, но забрави напитките.", "The waiter brought us soup but forgot the drinks."),
  sentence("a2-07", "A2", "airport", "Przed lotem sprawdziłem dwa razy numer bramki.", "Преди полета проверих два пъти номера на изхода.", "Before the flight I checked the gate number twice."),
  sentence("a2-08", "A2", "friends", "Nie widziałem Marka od czasu naszego ostatniego egzaminu.", "Не съм виждал Марек от последния ни изпит.", "I have not seen Marek since our last exam."),
  sentence("a2-09", "A2", "study", "Muszę przeczytać trzy rozdziały przed poniedziałkowym seminarium.", "Трябва да прочета три глави преди семинара в понеделник.", "I have to read three chapters before Monday's seminar."),
  sentence("a2-10", "A2", "home", "Kiedy wróciłem do domu, kot spał na klawiaturze.", "Когато се прибрах, котката спеше върху клавиатурата.", "When I came home, the cat was sleeping on the keyboard."),
  sentence("a2-11", "A2", "transport", "Wysiadamy na trzecim przystanku za mostem.", "Слизаме на третата спирка след моста.", "We get off at the third stop after the bridge."),
  sentence("a2-12", "A2", "city", "Przepraszam, jak dojść stąd do dworca głównego?", "Извинете, как да стигна оттук до централната гара?", "Excuse me, how do I get from here to the main station?"),
  sentence("a2-13", "A2", "family", "Moi rodzice przyjadą do nas w przyszły weekend.", "Родителите ми ще дойдат при нас следващия уикенд.", "My parents will visit us next weekend."),
  sentence("a2-14", "A2", "culture", "Wczoraj oglądaliśmy polski film z angielskimi napisami.", "Вчера гледахме полски филм с английски субтитри.", "Yesterday we watched a Polish film with English subtitles."),
  sentence("a2-15", "A2", "food", "Zamiast deseru zamówiłam herbatę z cytryną i miodem.", "Вместо десерт поръчах чай с лимон и мед.", "Instead of dessert I ordered tea with lemon and honey."),
  sentence("a2-16", "A2", "relationships", "Napisałem do niej wiadomość, ale jeszcze nie odpowiedziała.", "Писах ѝ съобщение, но още не е отговорила.", "I sent her a message, but she has not replied yet."),
  sentence("a2-17", "A2", "university", "Profesor przełożył dzisiejszy wykład na czwartek rano.", "Професорът премести днешната лекция за четвъртък сутрин.", "The professor moved today's lecture to Thursday morning."),
  sentence("a2-18", "A2", "hobby", "Od kilku miesięcy uczę się grać na gitarze.", "От няколко месеца се уча да свиря на китара.", "I have been learning to play guitar for several months."),
  sentence("a2-19", "A2", "weather", "Rano było słonecznie, a po południu zaczął padać śnieg.", "Сутринта беше слънчево, а следобед започна да вали сняг.", "It was sunny in the morning, and it started snowing in the afternoon."),
  sentence("a2-20", "A2", "renting", "Właściciel mieszkania poprosił nas o dokument tożsamości.", "Собственикът на апартамента поиска документ за самоличност.", "The landlord asked us for an identity document."),
  sentence("a2-21", "A2", "shopping", "Nie kupiłem butów, bo nie było mojego rozmiaru.", "Не купих обувките, защото нямаше моя размер.", "I did not buy the shoes because they did not have my size."),
  sentence("a2-22", "A2", "station", "Na tablicy pojawiła się informacja o zmianie peronu.", "На таблото се появи информация за смяна на перона.", "Information about a platform change appeared on the board."),
  sentence("a2-23", "A2", "home", "Po kolacji posprzątam kuchnię i podleję rośliny.", "След вечеря ще почистя кухнята и ще полея растенията.", "After dinner I will clean the kitchen and water the plants."),
  sentence("a2-24", "A2", "friends", "Umówiliśmy się przed biblioteką kwadrans przed zajęciami.", "Уговорихме се пред библиотеката петнадесет минути преди занятията.", "We arranged to meet in front of the library fifteen minutes before class."),
  sentence("a2-25", "A2", "study", "Najpierw powtórzę przypadki, a potem zrobię test.", "Първо ще преговоря падежите, а после ще направя тест.", "First I will revise the cases, then I will do a test."),
  sentence("a2-26", "A2", "city", "Apteka znajduje się naprzeciwko małego supermarketu.", "Аптеката се намира срещу малкия супермаркет.", "The pharmacy is opposite the small supermarket."),
  sentence("a2-27", "A2", "humor", "Babcia powiedziała, że zrobi tylko kilka pierogów, a zrobiła trzydzieści.", "Баба каза, че ще направи само няколко пироги, а направи трийсет.", "Grandma said she would make only a few pierogi, but she made thirty."),
  sentence("a2-28", "A2", "transport", "Zwykle jadę tramwajem, kiedy pada mocny deszcz.", "Обикновено пътувам с трамвай, когато вали силно.", "I usually take the tram when it rains heavily."),
  sentence("a2-29", "A2", "restaurant", "Czy możemy dostać rachunek i zapłacić kartą?", "Може ли да получим сметката и да платим с карта?", "Can we get the bill and pay by card?"),
  sentence("a2-30", "A2", "airport", "Moja walizka była cięższa, niż się spodziewałem.", "Куфарът ми беше по-тежък, отколкото очаквах.", "My suitcase was heavier than I expected."),

  sentence("b1-01", "B1", "study", "Gdybym wiedział, że profesor przełoży egzamin, nie uczyłbym się do drugiej w nocy.", "Ако знаех, че професорът ще премести изпита, нямаше да уча до два през нощта.", "If I had known the professor would postpone the exam, I would not have studied until two at night."),
  sentence("b1-02", "B1", "station", "Mimo że pociąg miał dwadzieścia minut opóźnienia, zdążyliśmy na wykład bez większego problemu.", "Въпреки че влакът закъсня с двайсет минути, стигнахме навреме за лекцията без особен проблем.", "Although the train was twenty minutes late, we made it to the lecture without much trouble."),
  sentence("b1-03", "B1", "relationships", "Zanim odpowiem na tę wiadomość, chcę spokojnie przemyśleć, co naprawdę czuję.", "Преди да отговоря на това съобщение, искам спокойно да обмисля какво наистина чувствам.", "Before I reply to that message, I want to calmly think about how I really feel."),
  sentence("b1-04", "B1", "renting", "Mieszkanie wyglądało lepiej na zdjęciach, ale lokalizacja okazała się świetna.", "Апартаментът изглеждаше по-добре на снимките, но местоположението се оказа чудесно.", "The flat looked better in the photos, but the location turned out to be great."),
  sentence("b1-05", "B1", "culture", "Im więcej czytam po polsku, tym łatwiej rozumiem dialogi w filmach.", "Колкото повече чета на полски, толкова по-лесно разбирам диалозите във филмите.", "The more I read in Polish, the easier it is to understand dialogue in films."),
  sentence("b1-06", "B1", "university", "Prowadząca poprosiła nas, żebyśmy przygotowali krótką prezentację na przyszły tydzień.", "Преподавателката ни помоли да подготвим кратка презентация за следващата седмица.", "The lecturer asked us to prepare a short presentation for next week."),
  sentence("b1-07", "B1", "friends", "Chociaż dawno się nie widzieliśmy, rozmowa od razu wróciła na dawne tory.", "Макар че не се бяхме виждали отдавна, разговорът веднага потръгна както преди.", "Although we had not seen each other for a long time, the conversation immediately felt familiar."),
  sentence("b1-08", "B1", "travel", "Gdy dotarliśmy na lotnisko, okazało się, że nasz lot został przeniesiony do innego terminalu.", "Когато стигнахме до летището, се оказа, че полетът ни е преместен на друг терминал.", "When we reached the airport, it turned out our flight had been moved to another terminal."),
  sentence("b1-09", "B1", "home", "Nie zdążyłem posprzątać mieszkania, ponieważ przez cały dzień pracowałem nad projektem.", "Не успях да почистя апартамента, защото цял ден работех по проекта.", "I did not manage to clean the flat because I worked on the project all day."),
  sentence("b1-10", "B1", "humor", "Mój kot uważa, że klawiatura jest znacznie wygodniejsza niż jego własne legowisko.", "Котката ми смята, че клавиатурата е много по-удобна от собственото ѝ легло.", "My cat thinks the keyboard is much more comfortable than its own bed."),
  sentence("b1-11", "B1", "food", "Kiedy babcia mówi, że przygotowała małą kolację, wszyscy wiemy, że stół będzie pełny.", "Когато баба каже, че е приготвила малка вечеря, всички знаем, че масата ще е пълна.", "When grandma says she made a small dinner, we all know the table will be full."),
  sentence("b1-12", "B1", "weather", "Prognoza zapowiadała słońce, więc oczywiście zaczęło padać pięć minut po wyjściu z domu.", "Прогнозата обещаваше слънце, така че естествено заваля пет минути след като излязох.", "The forecast predicted sunshine, so naturally it started raining five minutes after I left home."),
  sentence("b1-13", "B1", "shopping", "Gdybym nie porównał cen w kilku sklepach, zapłaciłbym prawie dwa razy więcej.", "Ако не бях сравнил цените в няколко магазина, щях да платя почти два пъти повече.", "If I had not compared prices in several shops, I would have paid almost twice as much."),
  sentence("b1-14", "B1", "city", "Nie byłem pewien, czy dobrze zrozumiałem wskazówki, dlatego zapytałem jeszcze jedną osobę.", "Не бях сигурен дали правилно съм разбрал указанията, затова попитах още един човек.", "I was not sure I had understood the directions correctly, so I asked one more person."),
  sentence("b1-15", "B1", "study", "Zauważyłem, że łatwiej zapamiętuję słowa, kiedy używam ich we własnych zdaniach.", "Забелязах, че запомням думите по-лесно, когато ги използвам в свои изречения.", "I noticed that I remember words more easily when I use them in my own sentences."),
  sentence("b1-16", "B1", "transport", "Kierowca powiedział, że z powodu remontu autobus pojedzie inną trasą.", "Шофьорът каза, че заради ремонта автобусът ще мине по друг маршрут.", "The driver said the bus would take a different route because of roadworks."),
  sentence("b1-17", "B1", "relationships", "Nie chodzi o to, że się nie zgadzamy, tylko o sposób, w jaki o tym rozmawiamy.", "Не става дума за това, че не сме съгласни, а за начина, по който говорим за това.", "It is not that we disagree; it is about the way we talk about it."),
  sentence("b1-18", "B1", "university", "Po zaliczeniu ostatniego egzaminu wreszcie miałem czas spotkać się ze znajomymi.", "След като взех последния изпит, най-сетне имах време да се видя с приятели.", "After passing my last exam, I finally had time to meet friends."),
  sentence("b1-19", "B1", "culture", "Spektakl był zupełnie inny, niż się spodziewałem, ale właśnie dlatego zrobił na mnie wrażenie.", "Спектакълът беше съвсем различен от очакваното, но точно затова ме впечатли.", "The performance was completely different from what I expected, but that is exactly why it impressed me."),
  sentence("b1-20", "B1", "travel", "Zarezerwowaliśmy nocleg wcześniej, żeby nie szukać hotelu po przyjeździe późnym wieczorem.", "Резервирахме нощувката предварително, за да не търсим хотел след късното пристигане.", "We booked accommodation in advance so we would not have to look for a hotel after arriving late."),
  sentence("b1-21", "B1", "work", "Jeżeli skończę ten raport przed piątą, będę mógł spokojnie wyjść na trening.", "Ако приключа доклада преди пет, ще мога спокойно да отида на тренировка.", "If I finish this report before five, I will be able to go to training without stress."),
  sentence("b1-22", "B1", "home", "Sąsiad zapytał, czy mogę podlać jego kwiaty, kiedy będzie na urlopie.", "Съседът попита дали мога да поливам цветята му, докато е в отпуск.", "My neighbour asked if I could water his flowers while he is on holiday."),
  sentence("b1-23", "B1", "food", "Restauracja, którą poleciła nam koleżanka, okazała się niewielka, ale bardzo przyjemna.", "Ресторантът, който ни препоръча колежка, се оказа малък, но много приятен.", "The restaurant a friend recommended turned out to be small but very pleasant."),
  sentence("b1-24", "B1", "humor", "Powiedziałem sobie, że obejrzę tylko jeden odcinek, a potem nagle była druga w nocy.", "Казах си, че ще гледам само един епизод, а после изведнъж стана два през нощта.", "I told myself I would watch only one episode, and then suddenly it was two in the morning."),
  sentence("b1-25", "B1", "language", "Nawet jeśli popełniam błędy, staram się mówić po polsku przy każdej okazji.", "Дори когато правя грешки, се старая да говоря на полски при всяка възможност.", "Even if I make mistakes, I try to speak Polish whenever I get the chance."),

  sentence("b2-01", "B2", "language", "Dopiero kiedy zacząłem zwracać uwagę na aspekt czasownika, zrozumiałem, dlaczego niektóre zdania brzmiały nienaturalnie.", "Едва когато започнах да обръщам внимание на вида на глагола, разбрах защо някои изречения звучаха неестествено.", "Only when I started paying attention to verbal aspect did I understand why some sentences sounded unnatural."),
  sentence("b2-02", "B2", "university", "Choć argument prowadzącego początkowo wydawał mi się przekonujący, po dyskusji zacząłem dostrzegać jego słabe strony.", "Макар аргументът на преподавателя първоначално да ми се струваше убедителен, след дискусията започнах да виждам слабите му страни.", "Although the lecturer's argument initially seemed convincing, after the discussion I began to see its weaknesses."),
  sentence("b2-03", "B2", "culture", "Powieść nie tyle opowiada historię jednej rodziny, ile pokazuje, jak pamięć zmienia nasze spojrzenie na przeszłość.", "Романът не толкова разказва историята на едно семейство, колкото показва как паметта променя погледа ни към миналото.", "The novel does not so much tell the story of one family as show how memory changes our view of the past."),
  sentence("b2-04", "B2", "work", "Gdybyśmy wcześniej ustalili jasny podział obowiązków, uniknęlibyśmy większości nieporozumień w zespole.", "Ако бяхме уточнили по-рано ясно разпределение на задачите, щяхме да избегнем повечето недоразумения в екипа.", "Had we agreed on a clear division of responsibilities earlier, we would have avoided most misunderstandings in the team."),
  sentence("b2-05", "B2", "relationships", "To, że ktoś mówi spokojnie, nie oznacza jeszcze, że sytuacja nie jest dla niego emocjonalnie trudna.", "Това, че някой говори спокойно, не означава непременно, че ситуацията не е емоционално трудна за него.", "The fact that someone speaks calmly does not necessarily mean the situation is not emotionally difficult for them."),
  sentence("b2-06", "B2", "travel", "Mimo licznych zmian w rozkładzie podróż przebiegła sprawniej, niż można było oczekiwać po pierwszych komunikatach.", "Въпреки многото промени в разписанието пътуването мина по-гладко, отколкото можеше да се очаква от първите съобщения.", "Despite numerous timetable changes, the journey went more smoothly than the first announcements suggested."),
  sentence("b2-07", "B2", "city", "Im dłużej mieszkam w dużym mieście, tym bardziej doceniam miejsca, w których można na chwilę uciec od hałasu.", "Колкото по-дълго живея в голям град, толкова повече ценя местата, където човек може за малко да избяга от шума.", "The longer I live in a big city, the more I appreciate places where one can escape the noise for a while."),
  sentence("b2-08", "B2", "study", "Nie wystarczy zapamiętać regułę; trzeba jeszcze rozpoznać sytuację, w której rzeczywiście ma ona zastosowanie.", "Не е достатъчно да запомниш правилото; трябва и да разпознаеш ситуацията, в която то действително се прилага.", "It is not enough to memorise a rule; you also have to recognise the situation in which it actually applies."),
  sentence("b2-09", "B2", "culture", "Choć przedstawienie korzystało z klasycznego tekstu, reżyser nadał mu współczesny rytm bez upraszczania jego sensu.", "Макар постановката да използваше класически текст, режисьорът ѝ придаде съвременен ритъм, без да опростява смисъла му.", "Although the production used a classic text, the director gave it a contemporary rhythm without simplifying its meaning."),
  sentence("b2-10", "B2", "humor", "Plan był prosty: zrobić krótką przerwę od nauki, która w niewyjaśnionych okolicznościach zamieniła się w dwugodzinne porządki.", "Планът беше прост: кратка почивка от ученето, която при неизяснени обстоятелства се превърна в двучасово чистене.", "The plan was simple: take a short study break, which under mysterious circumstances turned into two hours of cleaning."),
  sentence("b2-11", "B2", "language", "Najtrudniejsze w swobodnym mówieniu jest pogodzenie poprawności z tym, żeby nie analizować w głowie każdej końcówki.", "Най-трудното при свободното говорене е да съчетаеш правилността с това да не анализираш наум всяко окончание.", "The hardest part of speaking freely is balancing correctness with not analysing every ending in your head."),
  sentence("b2-12", "B2", "society", "Dyskusja stała się ciekawsza dopiero wtedy, gdy uczestnicy przestali bronić swoich stanowisk za wszelką cenę.", "Дискусията стана по-интересна едва когато участниците престанаха да защитават позициите си на всяка цена.", "The discussion became more interesting only when the participants stopped defending their positions at all costs."),
  sentence("b2-13", "B2", "renting", "Umowa była napisana na tyle niejasno, że przed podpisaniem poprosiliśmy właściciela o doprecyzowanie kilku punktów.", "Договорът беше написан толкова неясно, че преди подписването помолихме собственика да уточни няколко точки.", "The agreement was written so unclearly that before signing it we asked the landlord to clarify several points."),
  sentence("b2-14", "B2", "work", "Nawet najlepiej zaplanowany projekt może się opóźnić, jeśli kluczowe decyzje są odkładane do ostatniej chwili.", "Дори най-добре планираният проект може да се забави, ако ключовите решения се отлагат до последния момент.", "Even the best-planned project can be delayed if key decisions are postponed until the last moment."),
  sentence("b2-15", "B2", "relationships", "Z perspektywy czasu widzę, że problemem nie był sam konflikt, lecz to, że zbyt długo unikaliśmy szczerej rozmowy.", "От дистанцията на времето виждам, че проблемът не беше самият конфликт, а това, че твърде дълго избягвахме откровен разговор.", "Looking back, I see that the problem was not the conflict itself, but that we avoided an honest conversation for too long."),
];

export const SENTENCE_COUNTS = GAME_SENTENCES.reduce<Record<Difficulty, number>>(
  (counts, item) => ({ ...counts, [item.difficulty]: counts[item.difficulty] + 1 }),
  { A1: 0, A2: 0, B1: 0, B2: 0 },
);

export function sentenceTokens(value: string): string[] {
  return value.trim().split(/\s+/);
}

export function pickSentence(
  difficulty: Difficulty | "mixed",
  recentIds: readonly string[] = [],
): GameSentence {
  const recent = new Set(recentIds);
  const levelPool = GAME_SENTENCES.filter(
    (item) => difficulty === "mixed" || item.difficulty === difficulty,
  );
  const fresh = levelPool.filter((item) => !recent.has(item.id));
  return shuffle(fresh.length ? fresh : levelPool)[0];
}

export type FillBlankItem = {
  id: string;
  difficulty: Difficulty;
  before: string;
  after: string;
  answer: string;
  options: string[];
  hint: string;
  bg: string;
};

export const FILL_BLANK_ITEMS: FillBlankItem[] = [
  { id: "fb01", difficulty: "A1", before: "Codziennie piję", after: "z mlekiem.", answer: "kawę", options: ["kawa", "kawę", "kawy", "kawą"], hint: "pić + biernik", bg: "Всеки ден пия кафе с мляко." },
  { id: "fb02", difficulty: "A1", before: "Mieszkamy w", after: "blisko centrum.", answer: "Warszawie", options: ["Warszawa", "Warszawę", "Warszawie", "Warszawą"], hint: "w + miejscownik", bg: "Живеем във Варшава близо до центъра." },
  { id: "fb03", difficulty: "A1", before: "Ona", after: "po polsku bardzo dobrze.", answer: "mówi", options: ["mówię", "mówisz", "mówi", "mówią"], hint: "3. os. l. poj.", bg: "Тя говори много добре полски." },
  { id: "fb04", difficulty: "A1", before: "Czekam na", after: "przed uniwersytetem.", answer: "koleżankę", options: ["koleżanka", "koleżankę", "koleżanki", "koleżanką"], hint: "czekać na + biernik", bg: "Чакам колежката пред университета." },
  { id: "fb05", difficulty: "A1", before: "Idę do", after: "po świeży chleb.", answer: "sklepu", options: ["sklep", "sklepu", "sklepem", "sklepie"], hint: "do + dopełniacz", bg: "Отивам до магазина за пресен хляб." },
  { id: "fb06", difficulty: "A1", before: "Rozmawiam z", after: "po zajęciach.", answer: "profesorem", options: ["profesor", "profesora", "profesorowi", "profesorem"], hint: "z + narzędnik", bg: "Говоря с професора след занятията." },
  { id: "fb07", difficulty: "A1", before: "My", after: "się polskiego od roku.", answer: "uczymy", options: ["uczę", "uczysz", "uczymy", "uczą"], hint: "1. os. l. mn.", bg: "Учим полски от една година." },
  { id: "fb08", difficulty: "A1", before: "To jest", after: "nowa książka.", answer: "moja", options: ["mój", "moja", "moje", "moją"], hint: "rodzaj żeński, mianownik", bg: "Това е моята нова книга." },
  { id: "fb09", difficulty: "A2", before: "Słucham", after: "każdego wieczoru.", answer: "muzyki", options: ["muzyki", "muzykę", "muzyka", "muzyką"], hint: "słuchać + dopełniacz", bg: "Слушам музика всяка вечер." },
  { id: "fb10", difficulty: "A2", before: "Pomagam", after: "w przygotowaniu kolacji.", answer: "mamie", options: ["mamę", "mamie", "mama", "mamą"], hint: "pomagać + celownik", bg: "Помагам на мама с приготвянето на вечерята." },
  { id: "fb11", difficulty: "A2", before: "Interesuję się polską", after: "od liceum.", answer: "literaturą", options: ["literatura", "literaturę", "literatury", "literaturą"], hint: "interesować się + narzędnik", bg: "Интересувам се от полска литература от гимназията." },
  { id: "fb12", difficulty: "A2", before: "Boję się", after: "podczas nocnej burzy.", answer: "grzmotów", options: ["grzmoty", "grzmotów", "grzmotami", "grzmotach"], hint: "bać się + dopełniacz", bg: "Страхувам се от гръмотевици по време на нощна буря." },
  { id: "fb13", difficulty: "A2", before: "Myślę o", after: "przed jutrzejszym egzaminem.", answer: "wakacjach", options: ["wakacje", "wakacji", "wakacjami", "wakacjach"], hint: "myśleć o + miejscownik", bg: "Мисля за ваканцията преди утрешния изпит." },
  { id: "fb14", difficulty: "A2", before: "Jestem", after: "filologii słowiańskiej.", answer: "studentem", options: ["student", "studenta", "studentem", "studentowi"], hint: "być + narzędnik", bg: "Аз съм студент по славянска филология." },
  { id: "fb15", difficulty: "A2", before: "Wracam z", after: "dopiero wieczorem.", answer: "uniwersytetu", options: ["uniwersytet", "uniwersytetu", "uniwersytetem", "uniwersytecie"], hint: "z + dopełniacz", bg: "Връщам се от университета чак вечерта." },
  { id: "fb16", difficulty: "A2", before: "Wczoraj", after: "bilet do Krakowa przez internet.", answer: "kupiłem", options: ["kupuję", "kupiłem", "kupował", "kupić"], hint: "dokonany czas przeszły", bg: "Вчера купих билет за Краков онлайн." },
  { id: "fb17", difficulty: "B1", before: "Gdybym miał więcej czasu,", after: "częściej po polsku.", answer: "czytałbym", options: ["czytam", "czytałem", "czytałbym", "przeczytam"], hint: "tryb warunkowy", bg: "Ако имах повече време, щях да чета по-често на полски." },
  { id: "fb18", difficulty: "B1", before: "Zanim wyszedłem z domu,", after: "wszystkie okna.", answer: "zamknąłem", options: ["zamykałem", "zamknąłem", "zamykam", "zamknę"], hint: "czynność zakończona", bg: "Преди да изляза от вкъщи, затворих всички прозорци." },
  { id: "fb19", difficulty: "B1", before: "Nie spodziewałem się", after: "tak trudnego pytania.", answer: "tak", options: ["tak", "taki", "takiego", "takiemu"], hint: "przysłówek przed przymiotnikiem", bg: "Не очаквах толкова труден въпрос." },
  { id: "fb20", difficulty: "B1", before: "Profesor poprosił nas, żebyśmy", after: "prezentację na piątek.", answer: "przygotowali", options: ["przygotujemy", "przygotowali", "przygotowując", "przygotować"], hint: "żeby + forma przeszła", bg: "Професорът ни помоли да подготвим презентация за петък." },
  { id: "fb21", difficulty: "B1", before: "Mimo", after: "deszczu poszliśmy na spacer.", answer: "silnego", options: ["silny", "silnego", "silnemu", "silnym"], hint: "mimo + dopełniacz", bg: "Въпреки силния дъжд отидохме на разходка." },
  { id: "fb22", difficulty: "B1", before: "Zależy mi", after: "tym egzaminie.", answer: "na", options: ["do", "na", "o", "z"], hint: "zależeć komuś na + miejscownik", bg: "Този изпит е важен за мен." },
  { id: "fb23", difficulty: "B1", before: "Nie pamiętam, gdzie", after: "klucze.", answer: "położyłem", options: ["kładłem", "położyłem", "położę", "kładę"], hint: "rezultat czynności", bg: "Не помня къде оставих ключовете." },
  { id: "fb24", difficulty: "B1", before: "Im więcej ćwiczę, tym", after: "mówię.", answer: "swobodniej", options: ["swobodny", "swobodnie", "swobodniej", "najswobodniejszy"], hint: "stopień wyższy przysłówka", bg: "Колкото повече упражнявам, толкова по-свободно говоря." },
  { id: "fb25", difficulty: "B2", before: "Gdybyśmy wcześniej", after: "decyzję, uniknęlibyśmy problemu.", answer: "podjęli", options: ["podejmujemy", "podjęli", "podejmiemy", "podejmując"], hint: "warunek nierealny w przeszłości", bg: "Ако бяхме взели решението по-рано, щяхме да избегнем проблема." },
  { id: "fb26", difficulty: "B2", before: "Nie tyle brak czasu,", after: "brak jasnego planu był problemem.", answer: "ile", options: ["ale", "ile", "jak", "więc"], hint: "nie tyle..., ile...", bg: "Проблемът беше не толкова липсата на време, колкото липсата на ясен план." },
  { id: "fb27", difficulty: "B2", before: "Tekst był napisany na tyle jasno, że nie wymagał", after: "wyjaśnień.", answer: "dodatkowych", options: ["dodatkowe", "dodatkowych", "dodatkowymi", "dodatkowym"], hint: "wymagać + dopełniacz", bg: "Текстът беше написан достатъчно ясно и не изискваше допълнителни обяснения." },
  { id: "fb28", difficulty: "B2", before: "Choć początkowo się wahałem, ostatecznie", after: "na tę propozycję.", answer: "przystałem", options: ["przystałem", "przystawałem", "przystanę", "przystaję"], hint: "przystać na + biernik", bg: "Макар първоначално да се колебаех, накрая приех предложението." },
  { id: "fb29", difficulty: "B2", before: "Nie przypuszczałem, że sprawa okaże się aż tak", after: ".", answer: "złożona", options: ["złożony", "złożona", "złożonej", "złożoną"], hint: "orzecznik zgodny z 'sprawa'", bg: "Не предполагах, че въпросът ще се окаже толкова сложен." },
  { id: "fb30", difficulty: "B2", before: "Dopiero po rozmowie zdałem sobie", after: "z konsekwencji tej decyzji.", answer: "sprawę", options: ["sprawa", "sprawę", "sprawy", "sprawą"], hint: "zdać sobie sprawę z", bg: "Едва след разговора осъзнах последствията от това решение." },
];

export function pickFillBlankRound(
  count: number,
  difficulty: Difficulty | "mixed",
  recentIds: readonly string[] = [],
): FillBlankItem[] {
  const recent = new Set(recentIds);
  const levelPool = FILL_BLANK_ITEMS.filter(
    (item) => difficulty === "mixed" || item.difficulty === difficulty,
  );
  const fresh = levelPool.filter((item) => !recent.has(item.id));
  const source = fresh.length >= count ? fresh : levelPool;
  return shuffle(source)
    .slice(0, count)
    .map((item) => ({ ...item, options: shuffle(item.options) }));
}

const CROSSWORD_PRIORITY = new Set([
  "biblioteka",
  "wykład",
  "przystanek",
  "nadzieja",
  "skrzyżowanie",
  "marchewka",
  "wiewiórka",
  "stypendium",
  "zaliczenie",
  "tęsknota",
  "wiadomość",
  "lotnisko",
  "profesor",
  "pierogi",
  "fortepian",
  "skrzypce",
]);

export function crosswordCandidates(): GameWord[] {
  const eligible = GAME_WORDS.filter(
    (word) =>
      word.pos === "noun" &&
      /^[a-ząćęłńóśźż]+$/iu.test(word.pl) &&
      word.pl.length >= 4 &&
      word.pl.length <= 12,
  );
  return shuffle(eligible).sort(
    (a, b) => Number(CROSSWORD_PRIORITY.has(b.canonical)) - Number(CROSSWORD_PRIORITY.has(a.canonical)),
  );
}

const POSITIVE_FEEDBACK = [
  "Grammar survived. Barely.",
  "Mickiewicz would probably approve. Probably.",
  "Dobrze! That one behaved itself.",
  "Clean answer. Polish cases are temporarily peaceful.",
];

const RETRY_FEEDBACK = [
  "Prawie! Polish cases strike again.",
  "Nie tym razem — Biernik zastawił pułapkę.",
  "Close. Check the ending and try the next one.",
  "Polish had other plans. The hint tells you why.",
];

export function gameFeedback(correct: boolean): string {
  const pool = correct ? POSITIVE_FEEDBACK : RETRY_FEEDBACK;
  return pool[Math.floor(Math.random() * pool.length)];
}
