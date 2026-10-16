"use client";

import { ShieldAlert, Clock, Phone } from "lucide-react";

export default function PaymentRequiredClient() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-ivory text-ink px-6 py-12">
      <div className="mx-auto max-w-2xl text-center">
        {/* Header badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold">
          <ShieldAlert className="h-3 w-3" />
          Access Notice
        </div>

        {/* Icon */}
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-2xl border border-gold/30 bg-gold/5">
          <Clock className="h-12 w-12 text-gold" />
        </div>

        <h1 className="font-display text-4xl font-bold text-green-deep sm:text-5xl lg:text-6xl">
          Temporarily Restricted
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-lg text-ink/70 leading-relaxed sm:text-xl">
          This campaign website is currently restricted from public access pending completion of
          outstanding service payments. All pages are temporarily unavailable until the account
          is settled.
        </p>

        <div className="mt-12 rounded-3xl border border-green-deep/10 bg-white p-8 sm:p-12 shadow-card">
          <h2 className="mb-4 font-display text-2xl font-bold text-green-deep">What You Need to Know</h2>

          <div className="space-y-6 text-base text-ink/80 leading-relaxed">
            <div className="flex gap-3 text-left sm:text-center">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-deep/10 flex items-center justify-center text-green-deep font-bold">
                1
              </div>
              <div>
                <span className="font-semibold text-green-deep">Access is suspended.</span>
                All campaign pages — including the homepage, about, manifesto, analytics, and contact — are
                temporarily unavailable.
              </div>
            </div>

            <div className="flex gap-3 text-left sm:text-center">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-deep/10 flex items-center justify-center text-green-deep font-bold">
                2
              </div>
              <div>
                <span className="font-semibold text-green-deep">Payment is required to restore access.</span>
                Please settle the outstanding balance for web development and campaign services rendered
                for the R-SPLM/F South Sudan 2026 presidential campaign. Once payment is confirmed,
                full site access will be restored immediately and all navigation will be re-enabled.
              </div>
            </div>

            <div className="flex gap-3 text-left sm:text-center">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-deep/10 flex items-center justify-center text-green-deep font-bold">
                3
              </div>
              <div>
                <span className="font-semibold text-green-deep">No action needed on this page.</span>
                Simply complete the payment as invoiced, and we will lift the restriction on your behalf.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4">
          <a href="https://wa.me/254717556879" className="btn-gold px-8 py-4 text-lg flex items-center gap-3">
            <Phone className="h-5 w-5" />
            Contact: 0717556879
          </a>
          <p className="text-xs text-ink/40 tracking-wide uppercase">
            Real People&apos;s Liberation Movement Forward &mdash; South Sudan 2026
          </p>
        </div>
      </div>
    </main>
  );
}
