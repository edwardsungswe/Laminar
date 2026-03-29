import { useEffect } from "react";
import { CheckCircle } from "lucide-react";

interface ToastProps {
  message: string;
  isVisible: boolean;
  onDismiss: () => void;
}

export default function Toast({ message, isVisible, onDismiss }: ToastProps) {
  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, 2000);
    return () => clearTimeout(timer);
  }, [isVisible, onDismiss]);

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-200 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-2 pointer-events-none"
      }`}
    >
      <div className="bg-text-primary text-white text-sm font-medium px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2">
        <CheckCircle className="w-4 h-4" strokeWidth={1.5} />
        {message}
      </div>
    </div>
  );
}
