import { useState } from "react";
import { Mail, Lock, User } from "lucide-react";

interface LoginPageProps {
  onLogin: (email: string, password: string) => boolean;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    const success = onLogin(email, password);
    if (!success) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-bg">
      <div className="w-[400px] flex flex-col items-center">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
            <Mail className="w-5 h-5 text-white" strokeWidth={1.5} />
          </div>
          <span className="text-2xl font-semibold text-text-primary tracking-tight">
            Laminar
          </span>
        </div>

        {/* Card */}
        <div className="w-full bg-bg-white rounded-xl border border-divider shadow-sm p-8">
          <h2 className="text-lg font-semibold text-text-primary mb-1">
            Welcome back
          </h2>
          <p className="text-sm text-text-secondary mb-6">
            Sign in to your account
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-text-primary">
                Email
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary"
                  strokeWidth={1.5}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@laminar.design"
                  className="w-full bg-surface rounded-lg pl-9 pr-3 py-2.5 text-sm text-text-primary border border-divider focus:border-accent focus:outline-none placeholder:text-text-tertiary transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-text-primary">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary"
                  strokeWidth={1.5}
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-surface rounded-lg pl-9 pr-3 py-2.5 text-sm text-text-primary border border-divider focus:border-accent focus:outline-none placeholder:text-text-tertiary transition-colors"
                />
              </div>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              className="w-full h-10 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors duration-100 cursor-pointer mt-1"
            >
              Sign in
            </button>
          </form>
        </div>

        <p className="text-xs text-text-tertiary mt-6">
          Demo credentials: email@email.com | 123
        </p>
      </div>
    </div>
  );
}
