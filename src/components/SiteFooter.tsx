import { Link } from "@tanstack/react-router";
import { Sparkles, MessageCircle, Phone, Mail } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-[image:var(--gradient-soft)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[image:var(--gradient-hero)] text-primary-foreground">
              <Sparkles className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-bold">EcoScouts</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Zimbabwe's trusted home services platform — connecting verified cleaners with households and businesses.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Platform</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/services" className="hover:text-foreground">Services</Link></li>
            <li><Link to="/cleaners" className="hover:text-foreground">Find Cleaners</Link></li>
            <li><Link to="/book" className="hover:text-foreground">Book Now</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Cleaners</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/for-cleaners" className="hover:text-foreground">Join EcoScouts</Link></li>
            <li><Link to="/about" className="hover:text-foreground">About Us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Get in touch</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><MessageCircle className="h-4 w-4 text-primary" /> WhatsApp +263 77 000 0000</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> +263 242 000 000</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> hello@ecoscouts.co.zw</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} EcoScouts. Made in Harare.
      </div>
    </footer>
  );
}
