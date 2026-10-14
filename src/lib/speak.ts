// Browser-side text-to-speech using the Web Speech API.
// Free, no API key. Voice availability depends on the browser and operating
// system, so keep the requested locale even when no exact installed voice is
// reported: some browsers resolve the matching network voice only at playback.

export type SpeakLang =
  | "be-BY"
  | "bg-BG"
  | "bs-BA"
  | "cs-CZ"
  | "en-US"
  | "hr-HR"
  | "mk-MK"
  | "pl-PL"
  | "ru-RU"
  | "sk-SK"
  | "sl-SI"
  | "sr-ME"
  | "sr-RS"
  | "uk-UA";

const STORAGE_KEY = "slavicmind:sound-enabled";
type Listener = (enabled: boolean) => void;
const listeners = new Set<Listener>();

let cachedVoices: SpeechSynthesisVoice[] = [];
let pendingSpeech: number | undefined;

function loadVoices(): SpeechSynthesisVoice[] {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return [];
  if (cachedVoices.length) return cachedVoices;
  cachedVoices = window.speechSynthesis.getVoices();
  return cachedVoices;
}

if (typeof window !== "undefined" && "speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoices = window.speechSynthesis.getVoices();
  };
}

export function isSoundEnabled(): boolean {
  if (typeof window === "undefined") return true;
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === null ? true : v === "1";
}

export function setSoundEnabled(enabled: boolean) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, enabled ? "1" : "0");
  if (!enabled && "speechSynthesis" in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      /* no-op */
    }
  }
  listeners.forEach((l) => l(enabled));
}

export function subscribeSound(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function speak(text: string, lang: SpeakLang = "pl-PL", rate = 0.9) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  if (!isSoundEnabled()) return;
  try {
    const synthesis = window.speechSynthesis;
    if (pendingSpeech !== undefined) window.clearTimeout(pendingSpeech);
    synthesis.cancel();
    synthesis.resume();

    // Chromium can drop an utterance issued immediately after cancel(), most
    // noticeably when switching between voices from different languages.
    pendingSpeech = window.setTimeout(() => {
      pendingSpeech = undefined;
      if (!isSoundEnabled()) return;
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang;
      u.rate = rate;
      u.pitch = 1;
      const voices = loadVoices();
      const language = lang.split("-")[0].toLowerCase();
      const match =
        voices.find((v) => v.lang?.toLowerCase() === lang.toLowerCase()) ||
        voices.find((v) => v.lang?.toLowerCase().split("-")[0] === language);
      if (match) u.voice = match;
      synthesis.speak(u);
    }, 60);
  } catch {
    /* no-op */
  }
}

export function isSpeechSupported() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}
