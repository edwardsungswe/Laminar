interface SidebarNavItemProps {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  isActive: boolean;
  onClick: () => void;
  badge?: number;
  disabled?: boolean;
}

export default function SidebarNavItem({
  icon: Icon,
  label,
  isActive,
  onClick,
  badge,
  disabled,
}: SidebarNavItemProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-100 cursor-pointer ${
        disabled
          ? "text-text-tertiary cursor-not-allowed"
          : isActive
            ? "bg-surface text-accent"
            : "text-text-secondary hover:bg-surface/50 hover:text-text-primary"
      }`}
    >
      <Icon className="w-[18px] h-[18px] shrink-0" strokeWidth={1.5} />
      <span className="truncate">{label}</span>
      {badge !== undefined && badge > 0 && (
        <span className="ml-auto text-[10px] font-semibold bg-accent text-white w-5 h-5 rounded-full flex items-center justify-center shrink-0">
          {badge}
        </span>
      )}
    </button>
  );
}
