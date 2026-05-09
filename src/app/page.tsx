import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import SocialProofSection from '@/components/SocialProofSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-[#f8f9fb] relative selection:bg-[#51bc8f]/30 selection:text-[#2d7a5a]">
      {/* SaaS Grid Background */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#51bc8f15_1px,transparent_1px),linear-gradient(to_bottom,#51bc8f15_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#f8f9fb]/60 via-transparent to-[#f8f9fb] pointer-events-none" />
      
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <FeaturesSection />
        <SocialProofSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
        <Footer />
      </div>
    </main>
  );
}
