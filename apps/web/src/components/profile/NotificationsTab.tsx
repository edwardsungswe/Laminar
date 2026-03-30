import { useState } from "react";

interface ToggleRowProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (val: boolean) => void;
}

function ToggleRow({ label, description, checked, onChange }: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-divider last:border-b-0">
      <div>
        <p className="text-sm font-medium text-text-primary">{label}</p>
        <p className="text-xs text-text-secondary mt-0.5">{description}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-10 h-[22px] rounded-full transition-colors duration-200 cursor-pointer shrink-0 ml-4 ${
          checked ? "bg-accent" : "bg-surface"
        }`}
      >
        <span
          className={`absolute top-[3px] left-[3px] w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
            checked ? "translate-x-[18px]" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

export default function NotificationsTab() {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [marketing, setMarketing] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="max-w-lg mx-auto">
        <h2 className="text-lg font-semibold text-text-primary mb-6">Notifications</h2>

        <div className="flex flex-col">
          <ToggleRow
            label="Email notifications"
            description="Receive email alerts for new messages and updates"
            checked={emailNotifs}
            onChange={setEmailNotifs}
          />
          <ToggleRow
            label="Push notifications"
            description="Get browser push notifications in real time"
            checked={pushNotifs}
            onChange={setPushNotifs}
          />
          <ToggleRow
            label="Weekly digest"
            description="Receive a weekly summary of your inbox activity"
            checked={weeklyDigest}
            onChange={setWeeklyDigest}
          />
          <ToggleRow
            label="Marketing emails"
            description="Updates about new features and product news"
            checked={marketing}
            onChange={setMarketing}
          />
        </div>
      </div>
    </div>
  );
}
