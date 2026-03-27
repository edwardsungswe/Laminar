const LABEL_COLORS: Record<string, string> = {
  Legal: "bg-blue-100 text-blue-700",
  Freelance: "bg-green-100 text-green-700",
  Work: "bg-purple-100 text-purple-700",
  "Dev 3.0": "bg-orange-100 text-orange-700",
};

const FALLBACK_COLORS = [
  "bg-slate-100 text-slate-700",
  "bg-cyan-100 text-cyan-700",
  "bg-rose-100 text-rose-700",
  "bg-amber-100 text-amber-700",
];

function hashLabel(label: string): number {
  let hash = 0;
  for (let i = 0; i < label.length; i++) {
    hash = (hash << 5) - hash + label.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

interface BadgeProps {
  label: string;
}

export function Badge({ label }: BadgeProps) {
  const colorClass =
    LABEL_COLORS[label] ??
    FALLBACK_COLORS[hashLabel(label) % FALLBACK_COLORS.length];

  return (
    <span
      className={`${colorClass} inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium`}
    >
      {label}
    </span>
  );
}
