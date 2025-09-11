// page.tsx
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import WhatYouGet from "@/components/WhatYouGet";
// import Extension from "@/components/Extension"; // removed to avoid ESLint unused var
import BenefitsDeck from "@/components/BenefitsDeck";
import Security from "@/components/Security";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import ShowcaseDeck from "@/components/ShowcaseDeck";
import ScrollManifesto from "@/components/ScrollManifesto";
// import WallOfLove from "@/components/WallOfLove"; // enable when needed

const COPY = `
Attendance isn’t just a punch — it’s proof of presence.  
Attendify binds people, place, and device to every check-in with anti-spoofing, device binding, and geo-fencing.  

The result?  
Trusted data that flows straight into payroll and HRMS,  
automated shift tracking, and zero manual reconciliation —  
so teams can focus on work, not paperwork.
`;

export default function Home() {
  return (
    <main>
      <Hero />

      {/* Showcase / hero device */}
      <ShowcaseDeck />

      {/* Features overview */}
      <Features />

      {/* NEW: What You Get (scroll-driven branch animation) */}
      <WhatYouGet />

      {/* Big typographic manifesto */}
      <ScrollManifesto
        text={COPY}
        heightVh={380}
        anchor={0.30}
        softness={0.22}
        className="text-[8vw] sm:text-[6.5vw] md:text-[52px] lg:text-[58px]"
      />

      {/* Optional future sections */}
      {/* <Extension /> */}
      <BenefitsDeck />
      {/* <WallOfLove /> */}
      <Security />
      <FAQ />
      <Pricing />
      
      <CTA />
    </main>
  );
}