import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-green-forest text-white">
      <div className="container-x py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="R-SPLM/F" width={56} height={56} className="rounded-full bg-white p-1" />
              <div>
                <div className="font-display text-xl font-bold">R-SPLM/F</div>
                <div className="text-xs uppercase tracking-[0.2em] text-gold">The Real SPLM  People First</div>
              </div>
            </div>
            <p className="mt-6 max-w-md text-sm text-white/70">
              Serving with Honor. Leading with Heart. A covenant with the people of South Sudan.
            </p>
            <div className="mt-6">
              <div className="font-display text-sm font-bold text-white">Hon. Nathaniel Garang Aduotdit</div>
              <div className="text-xs text-gold">For President  South Sudan 2026</div>
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">Movement</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link href="/about" className="hover:text-gold">Biography</Link></li>
              <li><Link href="/manifesto" className="hover:text-gold">Manifesto</Link></li>
              <li><Link href="/analytics" className="hover:text-gold">Movement</Link></li>
              <li><Link href="/media" className="hover:text-gold">Press &amp; Media</Link></li>
              <li><Link href="/gallery" className="hover:text-gold">Gallery</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">Get Involved</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link href="/join" className="hover:text-gold">Register</Link></li>
              <li><Link href="/donate" className="hover:text-gold">Donate</Link></li>
              <li><Link href="/contact" className="hover:text-gold">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">Legal</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link href="/legal/privacy" className="hover:text-gold">Privacy Policy</Link></li>
              <li><Link href="/legal/terms" className="hover:text-gold">Terms of Use</Link></li>
              <li><Link href="/legal/donations" className="hover:text-gold">Donation Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/50">
           2026 R-SPLM/F Campaign  People First  Hon. Nathaniel Garang Aduotdit for President
        </div>
      </div>
    </footer>
  );
}