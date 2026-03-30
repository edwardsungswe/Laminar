interface ProfileTabProps {
  user: { name: string; email: string };
  onShowToast: (msg: string) => void;
}

export default function ProfileTab({ user, onShowToast }: ProfileTabProps) {
  const initials = user.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="max-w-lg mx-auto">
        <h2 className="text-lg font-semibold text-text-primary mb-6">Profile</h2>

        {/* Avatar */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center text-lg font-semibold select-none">
            {initials}
          </div>
          <p className="text-sm font-medium text-text-primary mt-3">{user.name}</p>
        </div>

        {/* Name field */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-text-secondary uppercase tracking-wider mb-1.5">
            Name
          </label>
          <input
            type="text"
            value={user.name}
            readOnly
            className="w-full bg-surface text-sm text-text-primary rounded-lg px-3 py-2.5 focus:outline-none"
          />
        </div>

        {/* Email field */}
        <div className="mb-6">
          <label className="block text-xs font-medium text-text-secondary uppercase tracking-wider mb-1.5">
            Email
          </label>
          <input
            type="text"
            value={user.email}
            readOnly
            className="w-full bg-surface text-sm text-text-primary rounded-lg px-3 py-2.5 focus:outline-none"
          />
        </div>

        <button
          onClick={() => onShowToast("Profile editing coming soon")}
          className="h-9 px-5 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors duration-100 cursor-pointer"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}
