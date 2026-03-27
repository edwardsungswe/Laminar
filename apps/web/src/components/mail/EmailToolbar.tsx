import { SlidersHorizontal, ChevronRight } from "lucide-react";
import { useUIStore } from "@/stores/uiStore";
import { FILTER_TABS } from "@/utils/constants";

export function EmailToolbar() {
  const { activeFilter, setActiveFilter } = useUIStore();

  return (
    <div className="flex items-center gap-1">
      {FILTER_TABS.map((tab) => {
        const isActive = activeFilter === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition-colors ${
              isActive
                ? "bg-white/20 font-medium text-white"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            {tab.label}
            {tab.count != null && (
              <span
                className={`rounded-full px-1.5 text-xs ${
                  isActive ? "bg-white/25" : "bg-white/10"
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
      <button className="ml-1 rounded-lg p-1.5 text-white/50 transition-colors hover:bg-white/10 hover:text-white">
        <ChevronRight size={16} />
      </button>
      <button className="ml-auto rounded-lg p-1.5 text-white/50 transition-colors hover:bg-white/10 hover:text-white">
        <SlidersHorizontal size={16} />
      </button>
    </div>
  );
}
