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


export default function Home() {
    return (
        <>
            <Preloader />
            <div className="smooth-wrapper">
                <div className="smooth-content">
                   
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
                       
                    </main>
                    
                </div>
            </div>
        </>
    );
}
