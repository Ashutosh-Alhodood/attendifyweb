// page.tsx
import Hero from "@/components/Hero";

// Features (desktop / mobile)
import Features from "@/components/Features";
import FeatureMobile from "@/components/FeatureMobile";

// WhatYouGet (desktop animated; keep as-is for mobile too if you want same content)
import WhatYouGet from "@/components/WhatYouGet";

// Benefits (desktop animated) and mobile simplified version
import BenefitsDeck from "@/components/BenefitsDeck";
import BenefitsDeckMobile from "@/components/BenefitsDeckMobile";

// Other sections (desktop-only behavior unchanged)
import Security from "@/components/Security";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";

// Showcase (contains its own mobile/desktop branches internally)
import ShowcaseDeck from "@/components/ShowcaseDeck";

// Scroll manifesto (desktop animated) and a simplified mobile version (no scroll-lock / no motion)
import ScrollManifesto from "@/components/ScrollManifesto";
import ScrollManifestoMobile from "@/components/ScrollManifestoMobile";

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

      {/* Showcase / hero device (component handles mobile/desktop internally) */}
      <ShowcaseDeck />

      {/* Features: mobile-first / desktop unchanged */}
      <div className="sm:hidden">
        <FeatureMobile />
      </div>
      <div className="hidden sm:block">
        <Features />
      </div>

      {/* What You Get — keep original (animated) version (desktop + mobile will both render it;
          if you want a separate mobile WhatYouGet, create one and wrap like Features/Benefits) */}
      <WhatYouGet />

      {/* Big typographic manifesto
          - Mobile: simplified, non-animated ScrollManifestoMobile
          - Desktop/Tablet: original animated ScrollManifesto (unchanged)
      */}
      <div className="sm:hidden">
        <ScrollManifestoMobile text={COPY} />
      </div>
      <div className="hidden sm:block">
        <ScrollManifesto
          text={COPY}
          heightVh={380}
          anchor={0.30}
          softness={0.22}
          className="text-[8vw] sm:text-[6.5vw] md:text-[52px] lg:text-[58px]"
        />
      </div>

      {/* Benefits: mobile simplified list, desktop animated deck */}
      <div className="sm:hidden">
        <BenefitsDeckMobile />
      </div>
      <div className="hidden sm:block">
        <BenefitsDeck />
      </div>

      {/* Remaining sections (desktop behavior unchanged) */}
      <Security />
      <FAQ />
      <Pricing />

      <CTA />
    </main>
  );
}