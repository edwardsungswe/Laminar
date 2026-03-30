import type { SettingsTab } from "@/types";
import ThemeTab from "./ThemeTab";
import ProfileTab from "./ProfileTab";
import NotificationsTab from "./NotificationsTab";
import AccountTab from "./AccountTab";
import SecurityTab from "./SecurityTab";

interface ProfileViewProps {
  activeTab: SettingsTab;
  user?: { name: string; email: string };
  onShowToast?: (msg: string) => void;
}

export default function ProfileView({ activeTab, user, onShowToast }: ProfileViewProps) {
  const showToast = onShowToast ?? (() => {});
  const defaultUser = user ?? { name: "User", email: "user@example.com" };

  if (activeTab === "theme") return <ThemeTab />;
  if (activeTab === "profile") return <ProfileTab user={defaultUser} onShowToast={showToast} />;
  if (activeTab === "notifications") return <NotificationsTab />;
  if (activeTab === "account") return <AccountTab user={defaultUser} onShowToast={showToast} />;
  if (activeTab === "security") return <SecurityTab onShowToast={showToast} />;

  return null;
}
