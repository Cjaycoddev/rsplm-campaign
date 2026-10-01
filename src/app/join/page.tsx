import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JoinForm from "@/components/join/JoinForm";
import { Users } from "lucide-react";

export default function JoinPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-ivory pb-20">
        {/* Dark header strip for navbar contrast */}
        <section className="bg-hero-gradient pb-12 pt-32">
          <div className="container-x max-w-2xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold">
              <Users className="h-3 w-3" /> Grassroots Mobilization
            </div>
            <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">
              Join the Movement
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              Every supporter counts. Register today to stand with Hon. Nathaniel Garang Aduotdit and the People First movement.
            </p>
          </div>
        </section>

        <div className="container-x max-w-2xl -mt-6">
          <JoinForm />
          <p className="mt-6 text-center text-xs text-ink/50">
            Registered supporters are assigned to local boma and payam coordination committees.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}