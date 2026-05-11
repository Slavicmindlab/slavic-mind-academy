import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { isSoundEnabled, setSoundEnabled, subscribeSound } from "@/lib/speak";

type Props = { className?: string };

export function SoundToggle({ className = "" }: Props) {
  const [enabled, setEnabled] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setEnabled(isSoundEnabled());
    return subscribeSound(setEnabled);
  }, []);

  const toggle = () => setSoundEnabled(!enabled);
  const label = enabled ? "Mute pronunciation" : "Unmute pronunciation";
  const Icon = enabled ? Volume2 : VolumeX;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      aria-pressed={!enabled}
      title={label}
      className={`h-9 w-9 grid place-items-center rounded-md border border-border/70 bg-surface/40 text-muted-foreground hover:text-ivory hover:border-crimson/60 transition ${className}`}
    >
      <Icon className={`h-4 w-4 ${mounted && !enabled ? "text-crimson" : ""}`} />
    </button>
  );
}
