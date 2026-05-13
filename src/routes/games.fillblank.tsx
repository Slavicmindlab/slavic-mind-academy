import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Ornament } from "@/components/SlavicMindLogo";
import { SpeakButton } from "@/components/SpeakButton";
import { addXp, recordGamePlay, recordGrammarDrill } from "@/lib/progress";
import { ArrowLeft, RotateCcw, Trophy, Check, X } from "lucide-react";

export const Route = createFileRoute("/games/fillblank")({
  head: () => ({
    meta: [
      { title: "Fill in the blank — SlavicMind" },
      { name: "description", content: "Pick the correct Polish word to complete each sentence — cases, prepositions, verb forms." },
    ],
  }),
  component: FillBlankGame,
});

type Item = {
  id: string;
  before: string;
  after: string;
  answer: string;
  options: string[];
  hint: string;
  bg: string;
};

const ITEMS: Item[] = [
  { id: "fb1", before: "Słucham", after: "każdego wieczoru.", answer: "muzyki", options: ["muzyki", "muzykę", "muzyka", "muzyką"], hint: "słuchać + dopełniacz", bg: "Слушам музика всяка вечер." },
  { id: "fb2", before: "Pomagam", after: "w kuchni.", answer: "mamie", options: ["mamę", "mamie", "mama", "mamą"], hint: "pomagać + celownik", bg: "Помагам на мама в кухнята." },
  { id: "fb3", before: "Interesuję się polską", after: ".", answer: "literaturą", options: ["literatura", "literaturę", "literatury", "literaturą"], hint: "interesować się + narzędnik", bg: "Интересувам се от полска литература." },
  { id: "fb4", before: "Mieszkam w", after: "od dwóch lat.", answer: "Krakowie", options: ["Kraków", "Krakowa", "Krakowem", "Krakowie"], hint: "w + miejscownik", bg: "Живея в Краков от две години." },
  { id: "fb5", before: "Czekam na", after: "od godziny.", answer: "autobus", options: ["autobus", "autobusu", "autobusem", "autobusie"], hint: "czekać na + biernik", bg: "Чакам автобуса от един час." },
  { id: "fb6", before: "Boję się", after: "w nocy.", answer: "burzy", options: ["burza", "burzę", "burzy", "burzą"], hint: "bać się + dopełniacz", bg: "Страхувам се от буря през нощта." },
  { id: "fb7", before: "Myślę o", after: "codziennie.", answer: "tobie", options: ["ciebie", "tobie", "tobą", "ty"], hint: "myśleć o + miejscownik", bg: "Мисля за теб всеки ден." },
  { id: "fb8", before: "Jestem", after: "filologii słowiańskiej.", answer: "studentem", options: ["student", "studenta", "studentem", "studentowi"], hint: "być + narzędnik (професи́я)", bg: "Аз съм студент по славянска филология." },
  { id: "fb9", before: "Dziękuję ci za", after: ".", answer: "prezent", options: ["prezent", "prezentu", "prezentem", "prezencie"], hint: "za + biernik", bg: "Благодаря ти за подаръка." },
  { id: "fb10", before: "Wracam z", after: "wieczorem.", answer: "uniwersytetu", options: ["uniwersytet", "uniwersytetu", "uniwersytetem", "uniwersytecie"], hint: "z + dopełniacz", bg: "Връщам се от университета вечерта." },
  { id: "fb11", before: "Ona", after: "po polsku bardzo dobrze.", answer: "mówi", options: ["mówię", "mówisz", "mówi", "mówią"], hint: "3. os. l. poj.", bg: "Тя говори много добре полски." },
  { id: "fb12", before: "My", after: "się polskiego od roku.", answer: "uczymy", options: ["uczę", "uczysz", "uczymy", "uczą"], hint: "1. os. l. mn.", bg: "Учим полски от една година." },
];

function shuffle<T>(arr: T[]): T[] { return [...arr].sort(() => Math.random() - 0.5); }

function pickRound(): Item[] { return shuffle(ITEMS).slice(0, 6).map((it) => ({ ...it, options: shuffle(it.options) })); }

function FillBlankGame() {
  const [round, setRound] = useState<Item[]>(() => pickRound());
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const cur = round[i];
  const correct = picked === cur?.answer;
  const showResult = picked !== null;

  useEffect(() => {
    if (done) {
      const xp = 30 + score * 10;
      addXp(xp, "Fill in the blank");
      recordGamePlay("fillblank", score);
      recordGrammarDrill();
    }
  }, [done]);

  const choose = (opt: string) => {
    if (showResult) return;
    setPicked(opt);
    if (opt === cur.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (i + 1 >= round.length) { setDone(true); return; }
    setI(i + 1); setPicked(null);
  };

  const restart = () => { setRound(pickRound()); setI(0); setPicked(null); setScore(0); setDone(false); };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="relative grain">
        <div className="absolute inset-0 bg-hero opacity-50 pointer-events-none" />
        <div className="relative mx-auto max-w-3xl px-6 py-12">
          <Link to="/games" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-ivory">
            <ArrowLeft className="h-4 w-4" /> All games
          </Link>

          <div className="mt-6 text-center">
            <div className="text-xs uppercase tracking-[0.3em] text-crimson">Uzupełnij zdanie</div>
            <h1 className="mt-3 font-serif text-4xl md:text-5xl">Fill in the blank</h1>
            <Ornament className="mx-auto mt-4 w-60 text-crimson" />
            <p className="mt-3 text-muted-foreground">Choose the correct case, preposition or verb form.</p>
            <div className="mt-4 inline-flex items-center gap-3 px-4 py-2 rounded-full border border-border/70 bg-surface/40 text-sm">
              <span className="font-mono">Score · {score}</span>
              <span className="text-muted-foreground">{Math.min(i + (done ? 0 : 1), round.length)} / {round.length}</span>
            </div>
          </div>

          {!done && cur && (
            <div className="mt-10 rounded-2xl border border-border/70 bg-card-gradient p-8 animate-fade-up">
              <div className="text-[10px] uppercase tracking-widest text-rose">{cur.hint}</div>
              <div className="mt-4 flex items-center gap-3 flex-wrap">
                <span className="font-serif text-2xl md:text-3xl leading-relaxed">
                  {cur.before}{" "}
                  <span className={`px-3 py-1 rounded-md border-b-2 mx-1 ${showResult ? (correct ? "border-emerald-400 text-emerald-300" : "border-destructive text-destructive") : "border-crimson/60 text-crimson"}`}>
                    {picked ?? "____"}
                  </span>{" "}
                  {cur.after}
                </span>
                <SpeakButton text={`${cur.before} ${cur.answer} ${cur.after}`} />
              </div>
              <p className="mt-3 text-sm text-muted-foreground italic">{cur.bg}</p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {cur.options.map((opt) => {
                  const isAns = opt === cur.answer;
                  const isPicked = picked === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => choose(opt)}
                      disabled={showResult}
                      className={`px-4 py-3 rounded-lg border font-serif text-lg transition flex items-center justify-between
                        ${showResult && isAns ? "border-emerald-400 bg-emerald-500/10 text-emerald-200" :
                          showResult && isPicked && !isAns ? "border-destructive bg-destructive/10" :
                          "border-border/70 hover:border-crimson/60"}`}
                    >
                      <span>{opt}</span>
                      {showResult && isAns && <Check className="h-4 w-4" />}
                      {showResult && isPicked && !isAns && <X className="h-4 w-4" />}
                    </button>
                  );
                })}
              </div>

              {showResult && (
                <button onClick={next} className="mt-6 w-full px-4 py-3 rounded-lg bg-crimson-gradient text-ivory text-sm shadow-glow hover:opacity-95 transition">
                  {i + 1 >= round.length ? "See results" : "Next"}
                </button>
              )}
            </div>
          )}

          {done && (
            <div className="mt-10 p-8 rounded-2xl border border-crimson/40 bg-card-gradient text-center animate-fade-up">
              <Trophy className="h-8 w-8 mx-auto text-gold" />
              <h2 className="mt-3 font-serif text-3xl">Round complete</h2>
              <p className="mt-2 text-muted-foreground">{score} / {round.length} correct · +{30 + score * 10} XP</p>
              <button onClick={restart} className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-crimson-gradient text-ivory text-sm shadow-glow">
                <RotateCcw className="h-4 w-4" /> Play again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
