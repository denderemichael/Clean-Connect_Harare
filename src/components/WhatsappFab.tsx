import { MessageCircle } from "lucide-react";

export function WhatsappFab() {
  return (
    <a
      href="https://wa.me/263770000000?text=Hi%20EcoScouts%2C%20I%27d%20like%20to%20book%20a%20cleaner"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-whatsapp px-4 py-3 text-sm font-semibold text-whatsapp-foreground shadow-[var(--shadow-soft)] transition-transform hover:scale-105"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">Book on WhatsApp</span>
    </a>
  );
}
