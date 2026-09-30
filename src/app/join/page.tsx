import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JoinForm from "@/components/join/JoinForm";
import { Users } from "lucide-react";

export default function JoinPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-ivory pb-20 pt-32">
        <div className="container-x max-w-2xl">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gold/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
              <Users className="h-3 w-3" /> Grassroots Mobilization
            </div>
            <h1 className="font-display text-4xl font-bold text-green-deep sm:text-5xl">
              Join the Movement
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-ink/70">
              Every supporter counts. Register today to stand with Hon. Nathaniel Garang Aduotdit and the People First movement.
            </p>
          </div>
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