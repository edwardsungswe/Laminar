const PALETTE = [
  "bg-rose-500",
  "bg-sky-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-violet-500",
  "bg-pink-500",
  "bg-teal-500",
  "bg-orange-500",
  "bg-indigo-500",
  "bg-lime-500",
];

function hashName(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

interface AvatarProps {
  name: string;
  size?: "sm" | "md";
}

export function Avatar({ name, size = "sm" }: AvatarProps) {
  const colorClass = PALETTE[hashName(name) % PALETTE.length];
  const initial = name.charAt(0).toUpperCase();
  const sizeClasses = size === "sm" ? "h-8 w-8 text-xs" : "h-10 w-10 text-sm";

  return (
    <div
      className={`${colorClass} ${sizeClasses} flex shrink-0 items-center justify-center rounded-full font-medium text-white`}
    >
      {initial}
    </div>
  );
}
