import { Outlet } from "react-router";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

export default function MailLayout() {
  return (
    <div
      className="flex h-screen"
      style={{
        background: `linear-gradient(135deg, var(--gradient-from), var(--gradient-to))`,
      }}
    >
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col p-3 pl-0">
        <Header />

        <main className="min-h-0 flex-1 overflow-y-auto rounded-2xl border border-glass bg-glass shadow-lg backdrop-blur-xl">
          <Outlet />
        </main>

        <footer className="py-2 text-center text-xs text-white/30">
          Laminar Email Client
        </footer>
      </div>
    </div>
  );
}
