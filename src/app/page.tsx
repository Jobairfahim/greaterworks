import Preloader from "@/component/Preloader";
import Navbar from "@/component/Navbar";
import HeroSection from "@/component/HeroSection";
import ApproachUsSection from "@/component/ApproachUsSection";
import ServicesSection from "@/component/ServicesSection";
import ImpactSection from "@/component/ImpactSection";
import IndustriesSection from "@/component/IndustriesSection";
import EngagementSection from "@/component/EngagementSection";
import CaseStudySection from "@/component/CaseStudySection";
import StaffAugmentationSection from "@/component/StaffAugmentationSection";
import TestimonialsSection from "@/component/TestimonialsSection";
import ContactSection from "@/component/ContactSection";
import CTASection from "@/component/CTASection";
import Footer from "@/component/Footer";
import FloatingCTA from "@/component/FloatingCTA";

export default function Home() {
    return (
        <>
            <Preloader />
            <div className="smooth-wrapper">
                <div className="smooth-content">
                    <Navbar />
                    <main>
                        <HeroSection />
                        <ApproachUsSection />
                        <ServicesSection />
                        <ImpactSection />
                        <IndustriesSection />
                        <EngagementSection />
                        <CaseStudySection />
                        <StaffAugmentationSection />
                        <TestimonialsSection />
                        <ContactSection />
                        <CTASection />
                    </main>
                    <FloatingCTA />
                    <Footer />
                </div>
            </div>
        </>
    );
}
