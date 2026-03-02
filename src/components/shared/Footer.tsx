import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🍛</span>
            <span className="font-display text-lg font-bold text-primary">LankaBites</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Authentic Sri Lankan flavours delivered to your doorstep. From kottu to biriyani, taste the island.
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold mb-3">Quick Links</h4>
          <div className="space-y-2">
            {[
              { to: "/menu", label: "Menu" },
              { to: "/about", label: "About Us" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold mb-3">Contact</h4>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>42 Galle Road, Colombo 03</p>
            <p>+94 77 123 4567</p>
            <p>hello@lankabites.lk</p>
          </div>
        </div>
      </div>

      <div className="border-t py-4">
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} LankaBites. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
