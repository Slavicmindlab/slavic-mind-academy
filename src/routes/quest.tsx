import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { ClientOnly } from "@/components/ClientOnly";
import { Ornament } from "@/components/SlavicMindLogo";
import { useMemo, useState } from "react";
import {
  CASE_ORDER, CASE_LABELS, DECLENSIONS, type CaseSlug, type Declension,
} from "@/data/grammar";
import { useQuest, completeKingdom } from "@/lib/quest";
import { addXp } from "@/lib/progress";
import {
  Castle, Crown, Flame, Heart, Shield, Sword, Sparkles, Trophy,
  ChevronRight, ArrowLeft, Skull, Star, Lock,
} from "lucide-react";

export const Route = createFileRoute("/quest")({
  head: () => ({
    meta: [
      { title: "Case Quest: The Seven Kingdoms — SlavicMind Games" },
      { name: "description", content: "An interactive Polish grammar RPG. Travel seven kingdoms — one for each case — defeat dragons, decline nouns and master the language of the Slavs." },
      { property: "og:title", content: "Case Quest: The Seven Kingdoms" },
      { property: "og:description", content: "A fantasy Slavic RPG that teaches Polish cases. Choose your kingdom. Slay the dragon. Master Mianownik through Wołacz." },
    ],
  }),
  component: QuestPage,
});

// ── Kingdom lore ────────────────────────────────────────────────────────
type Lore = {
  banner: string;
  motto: string;
  bg: string;
  fg: string;
  dragon: string;
  oath: string;
  prompts: { template: string; bg: string }[]; // {noun} placeholder
};

const LORE: Record<CaseSlug, Lore> = {
  mianownik: {
    banner: "🏰 Mianownik",
    motto: "The Kingdom of Names",
    bg: "from-rose-900/30 via-background to-background",
    fg: "text-rose",
    dragon: "Bezimienny — the Nameless One",
    oath: "Every thing has a name. Name it, and it becomes real.",
    prompts: [
      { template: "To jest mój ___.", bg: "Това е моят ___." },
      { template: "Tu mieszka ___.", bg: "Тук живее ___." },
      { template: "Idzie ___ — uważaj!", bg: "Идва ___ — внимавай!" },
      { template: "Wrócił ___ z wojny.", bg: "___ се върна от войната." },
    ],
  },
  dopelniacz: {
    banner: "🏰 Dopełniacz",
    motto: "The Kingdom of Absence",
    bg: "from-crimson/20 via-background to-background",
    fg: "text-crimson",
    dragon: "Niedoboru — the Lack-Wyrm",
    oath: "What is missing still has shape. Speak it.",
    prompts: [
      { template: "Nie ma już ___.", bg: "Вече няма ___." },
      { template: "Boję się ___ w lesie.", bg: "Страхувам се от ___ в гората." },
      { template: "Słucham ___ wieczorem.", bg: "Слушам ___ вечерта." },
      { template: "Szukam ___ od rana.", bg: "Търся ___ от сутринта." },
      { template: "Wracam z ___.", bg: "Връщам се от ___." },
    ],
  },
  celownik: {
    banner: "🏰 Celownik",
    motto: "The Kingdom of Gifts",
    bg: "from-gold/15 via-background to-background",
    fg: "text-gold",
    dragon: "Daromór — the Giftless King",
    oath: "Give, and the receiver bends the word.",
    prompts: [
      { template: "Pomagam ___ w kuchni.", bg: "Помагам на ___ в кухнята." },
      { template: "Dziękuję ___ za wszystko.", bg: "Благодаря на ___ за всичко." },
      { template: "Ufam tylko ___.", bg: "Вярвам само на ___." },
      { template: "Kupiłem prezent ___.", bg: "Купих подарък на ___." },
    ],
  },
  biernik: {
    banner: "🏰 Biernik",
    motto: "The Kingdom of Deeds",
    bg: "from-rose-900/25 via-background to-background",
    fg: "text-rose",
    dragon: "Czyniciel — the Doer of Endings",
    oath: "Strike, and the thing struck changes its tail.",
    prompts: [
      { template: "Pokonałem ___!", bg: "Победих ___!" },
      { template: "Oglądam ___ wieczorem.", bg: "Гледам ___ вечерта." },
      { template: "Kupiłem ___ na obiad.", bg: "Купих ___ за обяд." },
      { template: "Znalazłem legendarnego ___.", bg: "Намерих легендарен ___." },
      { template: "Lubię ___ najbardziej.", bg: "Харесвам ___ най-много." },
    ],
  },
  narzednik: {
    banner: "🏰 Narzędnik",
    motto: "The Kingdom of Tools",
    bg: "from-crimson/20 via-background to-background",
    fg: "text-crimson",
    dragon: "Bezbroń — the Toolless Beast",
    oath: "By which means? With what? That answer wears -em or -ą.",
    prompts: [
      { template: "Walczę srebrnym ___.", bg: "Бия се със сребърен ___." },
      { template: "Gram z ___ co wieczór.", bg: "Играя с ___ всяка вечер." },
      { template: "Jadę do Krakowa ___.", bg: "Пътувам до Краков с ___." },
      { template: "Jestem ___ filologii.", bg: "Аз съм ___ по филология." },
      { template: "Interesuję się ___.", bg: "Интересувам се от ___." },
    ],
  },
  miejscownik: {
    banner: "🏰 Miejscownik",
    motto: "The Kingdom of Places",
    bg: "from-gold/10 via-background to-background",
    fg: "text-gold",
    dragon: "Bezdroża — the Pathless Wraith",
    oath: "A locative answers ‘where?’ — but only after a preposition.",
    prompts: [
      { template: "Myślę o ___ całą noc.", bg: "Мисля за ___ цяла нощ." },
      { template: "Mówimy o ___ na zajęciach.", bg: "Говорим за ___ в час." },
      { template: "Marzę o ___ od dziecka.", bg: "Мечтая за ___ от дете." },
      { template: "Mieszkam w ___ od września.", bg: "Живея в ___ от септември." },
    ],
  },
  wolacz: {
    banner: "🏰 Wołacz",
    motto: "The Kingdom of Calls",
    bg: "from-rose-900/20 via-background to-background",
    fg: "text-rose",
    dragon: "Niemy — the Silent One",
    oath: "Call the name, and the name will answer.",
    prompts: [
      { template: "___, zgubiłem klucze!", bg: "___, изгубих ключовете!" },
      { template: "Drogi ___, posłuchaj mnie.", bg: "Скъпи ___, чуй ме." },
      { template: "Panie ___, mam pytanie!", bg: "Господин ___, имам въпрос!" },
      { template: "___, potwór za tobą!", bg: "___, чудовище зад теб!" },
      { template: "___, wracaj do domu!", bg: "___, върни се вкъщи!" },
    ],
  },
};

// ── Question generator ──────────────────────────────────────────────────
type Q = {
  prompt: string;
  bg: string;
  noun: Declension;
  correct: string;
  choices: string[];
  isBoss: boolean;
};

function pick<T>(arr: T[], rng = Math.random): T {
  return arr[Math.floor(rng() * arr.length)];
}
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildQuestions(slug: CaseSlug): Q[] {
  const lore = LORE[slug];
  const pool = shuffle(DECLENSIONS).slice(0, 5);
  return pool.map((noun, i) => {
    const tpl = lore.prompts[i % lore.prompts.length];
    const correct = noun.singular[slug];
    // Distractors: other-case forms of same noun
    const others = (CASE_ORDER as CaseSlug[])
      .filter((c) => c !== slug)
      .map((c) => noun.singular[c])
      .filter((w) => w && w !== correct);
    const distractors = shuffle(Array.from(new Set(others))).slice(0, 3);
    while (distractors.length < 3) distractors.push(noun.plural[slug]);
    const choices = shuffle([correct, ...distractors]);
    return {
      prompt: tpl.template.replace("___", `___ (${noun.lemma})`),
      bg: tpl.bg.replace("___", `___ (${noun.bg})`),
      noun,
      correct,
      choices,
      isBoss: i === pool.length - 1,
    };
  });
}

// ── Main page ──────────────────────────────────────────────────────────
function QuestPage() {
  const [active, setActive] = useState<CaseSlug | null>(null);
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="relative">
        <div className="absolute inset-0 bg-hero opacity-40 pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-5 py-10">
          {active ? (
            <Kingdom slug={active} onExit={() => setActive(null)} />
          ) : (
            <ClientOnly fallback={<MapView slug={null} onPick={() => {}} />}>
              <MapView slug={active} onPick={setActive} />
            </ClientOnly>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Kingdom map ────────────────────────────────────────────────────────
function MapView({ onPick }: { slug: CaseSlug | null; onPick: (s: CaseSlug) => void }) {
  const q = useQuest();
  const clearedCount = Object.values(q.kingdoms).filter((k) => k.cleared).length;
  return (
    <div>
      <div className="text-center animate-fade-up">
        <Link to="/games" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-crimson transition">
          <ArrowLeft className="h-3 w-3" /> SlavicMind Games
        </Link>
        <div className="mt-6 text-[10px] uppercase tracking-[0.4em] text-crimson">SlavicMind Games · Chapter I</div>
        <h1 className="mt-3 font-serif text-4xl md:text-6xl leading-tight">Case Quest</h1>
        <div className="mt-1 font-serif italic text-xl text-muted-foreground">The Seven Kingdoms</div>
        <Ornament className="mx-auto mt-5 w-72 text-crimson" />
        <p className="mt-5 max-w-xl mx-auto text-sm md:text-base text-muted-foreground leading-relaxed">
          A fantasy Slavic world where every Polish case is a kingdom. Decline nouns,
          slay dragons, master the seven endings — from <em>Mianownik</em> to <em>Wołacz</em>.
        </p>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface/60 px-4 py-1.5 text-xs">
          <Crown className="h-3.5 w-3.5 text-gold" />
          <span className="font-mono text-gold">{clearedCount}/7</span>
          <span className="text-muted-foreground uppercase tracking-widest">kingdoms cleared</span>
          <span className="text-border">·</span>
          <Sparkles className="h-3.5 w-3.5 text-crimson" />
          <span className="font-mono text-crimson">+{q.totalXp}</span>
          <span className="text-muted-foreground uppercase tracking-widest">quest xp</span>
        </div>
      </div>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CASE_ORDER.map((slug, i) => {
          const lore = LORE[slug];
          const k = q.kingdoms[slug];
          const prev = i === 0 ? null : q.kingdoms[CASE_ORDER[i - 1]];
          const locked = prev ? !prev.cleared && prev.bestScore < 40 : false;
          return (
            <button
              key={slug}
              onClick={() => !locked && onPick(slug)}
              disabled={locked}
              className={`group relative text-left rounded-2xl border border-border/70 bg-gradient-to-br ${lore.bg} p-6 transition-all overflow-hidden ${
                locked ? "opacity-50 cursor-not-allowed" : "hover:border-crimson/60 hover:-translate-y-0.5"
              }`}
            >
              {locked && (
                <div className="absolute top-3 right-3 text-muted-foreground">
                  <Lock className="h-4 w-4" />
                </div>
              )}
              {k.cleared && (
                <div className="absolute top-3 right-3 text-gold">
                  <Crown className="h-5 w-5" />
                </div>
              )}
              <div className="flex items-center gap-3">
                <Castle className={`h-7 w-7 ${lore.fg}`} />
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Kingdom № {i + 1}</div>
                  <h3 className="font-serif text-2xl leading-tight">{CASE_LABELS[slug].pl}</h3>
                </div>
              </div>
              <div className="mt-3 text-xs italic text-muted-foreground">{lore.motto}</div>
              <div className="mt-1 text-[11px] text-muted-foreground/80">{CASE_LABELS[slug].bg}</div>

              <div className="mt-5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Skull className="h-3.5 w-3.5" /> {lore.dragon.split(" — ")[0]}
                </div>
                {k.bestScore > 0 ? (
                  <span className="font-mono text-gold inline-flex items-center gap-1">
                    <Star className="h-3 w-3" /> {k.bestScore}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-crimson opacity-0 group-hover:opacity-100 transition">
                    Enter <ChevronRight className="h-3 w-3" />
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-10 rounded-2xl border border-border/70 bg-card-gradient p-6 text-sm text-muted-foreground">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-crimson shrink-0 mt-0.5" />
          <div>
            <div className="font-serif text-lg text-ivory">Rules of the realm</div>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>Each kingdom holds 5 trials. The final trial is a <strong className="text-crimson">dragon</strong>.</li>
              <li>Three lives. A wrong answer costs one. Clear a kingdom with ≥ 60 score to earn its crown.</li>
              <li>Clear a kingdom to unlock the next. XP feeds your SlavicMind Academy account.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Battle screen ──────────────────────────────────────────────────────
function Kingdom({ slug, onExit }: { slug: CaseSlug; onExit: () => void }) {
  const lore = LORE[slug];
  const questions = useMemo(() => buildQuestions(slug), [slug]);
  const [idx, setIdx] = useState(0);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [bossKilled, setBossKilled] = useState(false);

  const q = questions[idx];

  function answer(choice: string) {
    if (picked) return;
    setPicked(choice);
    const correct = choice === q.correct;
    const bossBonus = q.isBoss ? 2 : 1;
    if (correct) {
      const gained = (10 + combo * 2) * bossBonus;
      setScore((s) => s + gained);
      setCombo((c) => c + 1);
      if (q.isBoss) setBossKilled(true);
    } else {
      setCombo(0);
      setLives((l) => l - 1);
    }
  }

  function next() {
    setPicked(null);
    if (lives <= 0 || idx >= questions.length - 1) {
      const finalScore = Math.min(100, score);
      const xp = Math.round(finalScore * 0.6) + (bossKilled ? 25 : 0);
      completeKingdom(slug, finalScore, bossKilled, xp);
      addXp(xp, `Case Quest · ${CASE_LABELS[slug].pl}`);
      setDone(true);
      return;
    }
    setIdx((i) => i + 1);
  }

  if (done) {
    return <Victory slug={slug} score={Math.min(100, score)} bossKilled={bossKilled} onExit={onExit} />;
  }

  return (
    <div className={`rounded-3xl border border-border/70 bg-gradient-to-br ${lore.bg} p-6 md:p-10 animate-fade-up`}>
      <div className="flex items-center justify-between">
        <button onClick={onExit} className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-crimson transition">
          <ArrowLeft className="h-3 w-3" /> Leave kingdom
        </button>
        <div className="flex items-center gap-3 text-sm">
          <span className="inline-flex items-center gap-1 text-rose">
            {Array.from({ length: 3 }).map((_, i) =>
              i < lives ? <Heart key={i} className="h-4 w-4 fill-rose" /> : <Heart key={i} className="h-4 w-4 opacity-30" />
            )}
          </span>
          <span className="inline-flex items-center gap-1 text-gold font-mono">
            <Sparkles className="h-3.5 w-3.5" /> {score}
          </span>
          {combo >= 2 && (
            <span className="inline-flex items-center gap-1 text-crimson font-mono">
              <Flame className="h-3.5 w-3.5" /> ×{combo}
            </span>
          )}
        </div>
      </div>

      <div className="mt-6 text-center">
        <div className={`text-[10px] uppercase tracking-[0.4em] ${lore.fg}`}>{lore.banner}</div>
        <h2 className="mt-2 font-serif text-3xl md:text-4xl">{CASE_LABELS[slug].pl}</h2>
        <div className="mt-1 text-xs text-muted-foreground italic">{lore.oath}</div>
        <div className="mt-4 inline-flex gap-1">
          {questions.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-8 rounded-full ${i < idx ? "bg-crimson" : i === idx ? "bg-gold" : "bg-border/60"}`}
            />
          ))}
        </div>
      </div>

      <div className="mt-8 mx-auto max-w-2xl">
        {q.isBoss && (
          <div className="mb-5 rounded-xl border border-crimson/50 bg-crimson/5 p-4 text-center">
            <div className="inline-flex items-center gap-2 text-crimson font-serif text-lg">
              <Skull className="h-5 w-5" /> Boss · {lore.dragon}
            </div>
            <div className="mt-1 text-xs text-muted-foreground">Double XP. One wrong answer still bites.</div>
          </div>
        )}

        <div className="rounded-2xl border border-border/70 bg-surface/70 p-6 md:p-8">
          <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Trial № {idx + 1}</div>
          <div className="mt-3 font-serif text-2xl md:text-3xl leading-snug">
            {q.prompt.split("___").map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && <span className="mx-1 text-crimson">_____</span>}
              </span>
            ))}
          </div>
          <div className="mt-2 text-sm text-muted-foreground italic">{q.bg}</div>

          <div className="mt-6 grid sm:grid-cols-2 gap-3">
            {q.choices.map((c) => {
              const isCorrect = c === q.correct;
              const chosen = picked === c;
              const reveal = picked !== null;
              return (
                <button
                  key={c}
                  onClick={() => answer(c)}
                  disabled={reveal}
                  className={`rounded-xl border px-4 py-3 text-left font-mono text-lg transition-all ${
                    reveal
                      ? isCorrect
                        ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-300"
                        : chosen
                          ? "border-crimson/60 bg-crimson/10 text-crimson"
                          : "border-border/70 opacity-60"
                      : "border-border/70 hover:border-crimson/60 hover:bg-crimson/5"
                  }`}
                >
                  <span className="text-[10px] block uppercase tracking-widest text-muted-foreground mb-0.5">forma</span>
                  {c}
                </button>
              );
            })}
          </div>

          {picked && (
            <div className="mt-5 flex items-center justify-between gap-3 animate-fade-up">
              <div className="text-sm">
                {picked === q.correct ? (
                  <span className="text-emerald-400 inline-flex items-center gap-2">
                    <Sword className="h-4 w-4" /> Damage dealt. Correct form: <strong className="font-mono">{q.correct}</strong>.
                  </span>
                ) : (
                  <span className="text-crimson inline-flex items-center gap-2">
                    <Skull className="h-4 w-4" /> The dragon bites. Correct form: <strong className="font-mono">{q.correct}</strong>.
                  </span>
                )}
              </div>
              <button
                onClick={next}
                className="inline-flex items-center gap-2 rounded-full bg-crimson px-5 py-2 text-sm font-serif text-ivory hover:bg-crimson/90 transition"
              >
                {idx >= questions.length - 1 || lives <= 0 ? "Finish quest" : "Next trial"}
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Victory({ slug, score, bossKilled, onExit }: { slug: CaseSlug; score: number; bossKilled: boolean; onExit: () => void }) {
  const lore = LORE[slug];
  const win = score >= 60;
  return (
    <div className={`rounded-3xl border border-border/70 bg-gradient-to-br ${lore.bg} p-10 text-center animate-fade-up`}>
      <div className={`mx-auto h-16 w-16 rounded-full border border-border/70 bg-surface grid place-items-center ${win ? "text-gold" : "text-crimson"}`}>
        {win ? <Crown className="h-7 w-7" /> : <Skull className="h-7 w-7" />}
      </div>
      <div className={`mt-4 text-[10px] uppercase tracking-[0.4em] ${lore.fg}`}>{lore.banner}</div>
      <h2 className="mt-2 font-serif text-4xl">{win ? "Kingdom cleared" : "The dragon prevails"}</h2>
      <p className="mt-3 text-sm text-muted-foreground max-w-md mx-auto">
        {win
          ? `You ${bossKilled ? "slew" : "outlasted"} ${lore.dragon} and learned the song of the ${CASE_LABELS[slug].pl}.`
          : `The court of ${CASE_LABELS[slug].pl} stands. Return, rested. The dragon will be waiting.`}
      </p>

      <div className="mt-6 inline-flex items-center gap-4 rounded-full border border-border/70 bg-surface/60 px-6 py-2">
        <span className="inline-flex items-center gap-1.5 text-gold font-mono">
          <Trophy className="h-4 w-4" /> {score}
        </span>
        <span className="text-border">·</span>
        <span className="inline-flex items-center gap-1.5 text-crimson font-mono">
          <Sparkles className="h-4 w-4" /> +{Math.round(score * 0.6) + (bossKilled ? 25 : 0)} XP
        </span>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button onClick={() => location.reload()} className="rounded-full border border-border/70 px-5 py-2 text-sm hover:border-crimson/60 transition">
          Try again
        </button>
        <button onClick={onExit} className="inline-flex items-center gap-2 rounded-full bg-crimson px-6 py-2 text-sm font-serif text-ivory hover:bg-crimson/90 transition">
          Return to the map <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
