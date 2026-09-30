import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Home, Compass, Heart } from "lucide-react";

export const metadata = { title: "Page Not Found  R-SPLM/F Campaign" };

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-hero-gradient px-4 pt-24 pb-16 text-white">
        <div className="absolute inset-0 opacity-10">
          <Image src="/images/rally-juba.jpg" alt="" fill className="object-cover" />
        </div>
        <div className="relative mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-gold/30 bg-gold/10 backdrop-blur-md">
            <Compass className="h-10 w-10 text-gold" />
          </div>

          <div className="font-display text-6xl font-bold text-gold sm:text-7xl">404</div>
          <h1 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl">
            This path hasn&apos;t been blazed yet.
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base text-white/70">
            The page you&apos;re looking for doesn&apos;t exist  but the movement is right here.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/" className="btn-gold">
              <Home className="h-4 w-4" /> Back to Home
            </Link>
            <Link href="/join" className="btn-outline">
              <Heart className="h-4 w-4" /> Join the Movement
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}