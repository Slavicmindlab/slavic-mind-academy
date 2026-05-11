import { useEffect, useState } from "react";
import { Zap } from "lucide-react";
import { onXpGain } from "@/lib/progress";

type Toast = { id: number; amount: number; reason?: string };

export function XpToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    return onXpGain((amount, reason) => {
      const id = Date.now() + Math.random();
      setToasts((prev) => [...prev, { id, amount, reason }]);
      setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 2400);
    });
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto animate-fade-up rounded-full border border-crimson/40 bg-card-gradient px-4 py-2 shadow-glow flex items-center gap-2 backdrop-blur"
        >
          <Zap className="h-4 w-4 text-gold" />
          <span className="font-mono text-sm text-ivory">+{t.amount} XP</span>
          {t.reason && <span className="text-xs text-muted-foreground">· {t.reason}</span>}
        </div>
      ))}
    </div>
  );
}
