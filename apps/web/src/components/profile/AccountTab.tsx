interface AccountTabProps {
  user: { name: string; email: string };
  onShowToast: (msg: string) => void;
}

export default function AccountTab({ user, onShowToast }: AccountTabProps) {
  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="max-w-lg mx-auto">
        <h2 className="text-lg font-semibold text-text-primary mb-6">Account</h2>

        {/* Email */}
        <div className="mb-6">
          <label className="block text-xs font-medium text-text-secondary uppercase tracking-wider mb-1.5">
            Email
          </label>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={user.email}
              readOnly
              className="flex-1 bg-surface text-sm text-text-primary rounded-lg px-3 py-2.5 focus:outline-none"
            />
            <button
              onClick={() => onShowToast("Email change coming soon")}
              className="h-9 px-4 text-sm font-medium text-accent hover:text-accent-hover transition-colors duration-100 cursor-pointer shrink-0"
            >
              Change email
            </button>
          </div>
        </div>

        {/* Account type */}
        <div className="mb-6">
          <label className="block text-xs font-medium text-text-secondary uppercase tracking-wider mb-1.5">
            Account type
          </label>
          <p className="text-sm text-text-primary">Free Plan</p>
        </div>

        {/* Storage */}
        <div className="mb-8">
          <label className="block text-xs font-medium text-text-secondary uppercase tracking-wider mb-1.5">
            Storage
          </label>
          <p className="text-sm text-text-primary mb-2">2.4 GB of 15 GB used</p>
          <div className="w-full h-2 bg-surface rounded-full overflow-hidden">
            <div className="h-full bg-accent rounded-full" style={{ width: "16%" }} />
          </div>
        </div>

        <div className="border-t border-divider pt-6">
          <button
            onClick={() => onShowToast("Account deletion coming soon")}
            className="h-9 px-5 text-sm font-medium text-[#c07a7a] border border-[#c07a7a]/30 hover:bg-[#f5e6e8]/50 rounded-lg transition-colors duration-100 cursor-pointer"
          >
            Delete account
          </button>
        </div>
      </div>
    </div>
  );
}
