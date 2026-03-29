import type { SettingsTab } from "@/types";
import ThemeTab from "./ThemeTab";
import SettingsTabPlaceholder from "./SettingsTabPlaceholder";

const tabLabels: Record<SettingsTab, string> = {
  profile: "Profile",
  theme: "Theme",
  notifications: "Notifications",
  account: "Account",
  security: "Security",
};

interface ProfileViewProps {
  activeTab: SettingsTab;
}

export default function ProfileView({ activeTab }: ProfileViewProps) {
  if (activeTab === "theme") {
    return <ThemeTab />;
  }
  return <SettingsTabPlaceholder tabName={tabLabels[activeTab]} />;
}
