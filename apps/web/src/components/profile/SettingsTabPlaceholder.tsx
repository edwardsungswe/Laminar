interface SettingsTabPlaceholderProps {
  tabName: string;
}

export default function SettingsTabPlaceholder({ tabName }: SettingsTabPlaceholderProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-3 p-8">
      <h2 className="text-lg font-semibold text-text-primary">{tabName}</h2>
      <p className="text-sm text-text-secondary">Coming soon</p>
    </div>
  );
}
