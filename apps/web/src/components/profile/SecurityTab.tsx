import { useState } from "react";

interface SecurityTabProps {
  onShowToast: (msg: string) => void;
}

export default function SecurityTab({ onShowToast }: SecurityTabProps) {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const sessions = [
    { device: "Chrome on macOS", location: "San Francisco, CA", lastActive: "Now (current)" },
    { device: "Laminar Mobile App", location: "San Francisco, CA", lastActive: "2 hours ago" },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="max-w-lg mx-auto">
        <h2 className="text-lg font-semibold text-text-primary mb-6">Security</h2>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-xs font-medium text-text-secondary uppercase tracking-wider mb-1.5">
            Password
          </label>
          <div className="flex items-center gap-3">
            <span className="text-sm text-text-primary tracking-widest">
              ••••••••••••
            </span>
            <button
              onClick={() => onShowToast("Password change coming soon")}
              className="h-9 px-4 text-sm font-medium text-accent hover:text-accent-hover transition-colors duration-100 cursor-pointer shrink-0"
            >
              Change password
            </button>
          </div>
        </div>

        {/* Two-factor auth */}
        <div className="mb-8 flex items-center justify-between py-4 border-y border-divider">
          <div>
            <p className="text-sm font-medium text-text-primary">Two-factor authentication</p>
            <p className="text-xs text-text-secondary mt-0.5">
              Add an extra layer of security to your account
            </p>
          </div>
          <button
            onClick={() => setTwoFactorEnabled((prev) => !prev)}
            className={`relative w-10 h-[22px] rounded-full transition-colors duration-200 cursor-pointer shrink-0 ml-4 ${
              twoFactorEnabled ? "bg-accent" : "bg-surface"
            }`}
          >
            <span
              className={`absolute top-[3px] left-[3px] w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                twoFactorEnabled ? "translate-x-[18px]" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Active sessions */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-text-primary mb-3">Active sessions</h3>
          <div className="border border-divider rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface/50">
                  <th className="text-left px-3 py-2 text-xs font-medium text-text-secondary uppercase tracking-wider">
                    Device
                  </th>
                  <th className="text-left px-3 py-2 text-xs font-medium text-text-secondary uppercase tracking-wider">
                    Location
                  </th>
                  <th className="text-left px-3 py-2 text-xs font-medium text-text-secondary uppercase tracking-wider">
                    Last active
                  </th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((session, i) => (
                  <tr key={i} className="border-t border-divider">
                    <td className="px-3 py-2.5 text-text-primary">{session.device}</td>
                    <td className="px-3 py-2.5 text-text-secondary">{session.location}</td>
                    <td className="px-3 py-2.5 text-text-secondary">{session.lastActive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <button
          onClick={() => onShowToast("All other devices signed out")}
          className="h-9 px-5 text-sm font-medium text-[#c07a7a] border border-[#c07a7a]/30 hover:bg-[#f5e6e8]/50 rounded-lg transition-colors duration-100 cursor-pointer"
        >
          Sign out all devices
        </button>
      </div>
    </div>
  );
}
