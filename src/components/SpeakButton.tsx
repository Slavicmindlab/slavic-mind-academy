import { Volume2 } from "lucide-react";
import { speak, type SpeakLang } from "@/lib/speak";

type Props = {
  text: string;
  lang?: SpeakLang;
  className?: string;
  label?: string;
  size?: "sm" | "md";
};

export function SpeakButton({ text, lang = "pl-PL", className = "", label, size = "sm" }: Props) {
  const dim = size === "sm" ? "h-8 w-8" : "h-10 w-10";
  const icon = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        speak(text, lang);
      }}
      aria-label={label ?? `Listen — ${text}`}
      title={label ?? `Listen — ${text}`}
      className={`${dim} grid place-items-center rounded-full border border-border/70 text-muted-foreground hover:text-crimson hover:border-crimson/60 transition ${className}`}
    >
      <Volume2 className={icon} />
    </button>
  );
}
