// Browser-side text-to-speech using the Web Speech API.
// Free, no API key, supports Polish (pl-PL) and Bulgarian (bg-BG)
// when the OS has those voices installed (most modern systems do).

export type SpeakLang = "pl-PL" | "bg-BG" | "en-US";

let cachedVoices: SpeechSynthesisVoice[] = [];

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

export function speak(text: string, lang: SpeakLang = "pl-PL", rate = 0.9) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    u.rate = rate;
    u.pitch = 1;
    const voices = loadVoices();
    const match =
      voices.find((v) => v.lang?.toLowerCase() === lang.toLowerCase()) ||
      voices.find((v) => v.lang?.toLowerCase().startsWith(lang.split("-")[0]));
    if (match) u.voice = match;
    window.speechSynthesis.speak(u);
  } catch {
    /* no-op */
  }
}

export function isSpeechSupported() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}
