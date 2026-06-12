import Preloader from "@/component/Preloader";
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
import { HomepageData, EngagementModel, Industry, SelectedWork, Testimonial } from "@/types/homepage";

async function getHomepageData(): Promise<HomepageData | null> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/home?populate[bannarSection][populate][brandsImages]=true&populate[engagementModelSection][populate][engagementModelImage]=true&populate[techStackSection][populate][techStackImage]=true&populate[contactSection][populate][contactDetails]=true&populate[onDemandSection][populate][onDemandDetails]=true&populate[industrySection]=true&populate[impactSection]=true&populate[selectedWorkSection]=true&populate[testimonialSection]=true&populate[serviceSection][populate][serviceImage]=true&populate[serviceSection][populate][services]=true`, {
            cache: 'no-store',
            headers: {
                'Authorization': `Bearer ${process.env.AUTH_TOKEN}`
            }
        });
        if (!res.ok) {
            console.error(`Failed to fetch homepage data: ${res.status} ${res.statusText}`);
            console.error(await res.text());
            return null;
        }
        const json = await res.json();
        return json.data;
    } catch (error) {
        console.error("Error fetching homepage data:", error);
        return null;
    }
}

async function getEngagementModels(): Promise<EngagementModel[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/engagement-models?populate[details]=true`, {
            cache: 'no-store',
            headers: {
                'Authorization': `Bearer ${process.env.AUTH_TOKEN}`
            }
        });
        if (!res.ok) {
            console.error(`Failed to fetch engagement models: ${res.status} ${res.statusText}`);
            return [];
        }
        const json = await res.json();
        return json.data || [];
    } catch (error) {
        console.error("Error fetching engagement models:", error);
        return [];
    }
}

async function getIndustries(): Promise<Industry[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/industries?populate[details]=true&populate[image]=true`, {
            cache: 'no-store',
            headers: {
                'Authorization': `Bearer ${process.env.AUTH_TOKEN}`
            }
        });
        if (!res.ok) {
            console.error(`Failed to fetch industries: ${res.status} ${res.statusText}`);
            return [];
        }
        const json = await res.json();
        return json.data || [];
    } catch (error) {
        console.error("Error fetching industries:", error);
        return [];
    }
}

async function getSelectedWorks(): Promise<SelectedWork[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/selected-works?populate[image]=true`, {
            cache: 'no-store',
            headers: {
                'Authorization': `Bearer ${process.env.AUTH_TOKEN}`
            }
        });
        if (!res.ok) {
            console.error(`Failed to fetch selected works: ${res.status} ${res.statusText}`);
            return [];
        }
        const json = await res.json();
        return json.data || [];
    } catch (error) {
        console.error("Error fetching selected works:", error);
        return [];
    }
}

async function getTestimonials(): Promise<Testimonial[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/testimonials?populate[image]=true`, {
            cache: 'no-store',
            headers: {
                'Authorization': `Bearer ${process.env.AUTH_TOKEN}`
            }
        });
        if (!res.ok) {
            console.error(`Failed to fetch testimonials: ${res.status} ${res.statusText}`);
            return [];
        }
        const json = await res.json();
        return json.data || [];
    } catch (error) {
        console.error("Error fetching testimonials:", error);
        return [];
    }
}

export default async function Home() {
    const [data, engagementModels, industries, selectedWorks, testimonials] = await Promise.all([
        getHomepageData(),
        getEngagementModels(),
        getIndustries(),
        getSelectedWorks(),
        getTestimonials()
    ]);

    return (
        <>
            <Preloader />
            <div className="smooth-wrapper">
                <div className="smooth-content">
                   
                    <main>
                        <HeroSection data={data?.bannarSection} />
                        <ApproachUsSection />
                        <ServicesSection data={data?.serviceSection} />
                        <ImpactSection data={data?.impactSection} />
                        <IndustriesSection data={data?.industrySection} onDemand={data?.onDemandSection} industries={industries} />
                        <EngagementSection data={data?.engagementModelSection} engagementModels={engagementModels} /> 
                        <CaseStudySection data={data?.selectedWorkSection} selectedWorks={selectedWorks} />
                        <StaffAugmentationSection data={data?.techStackSection} />
                        <TestimonialsSection data={data?.testimonialSection} testimonials={testimonials} />
                        <ContactSection data={data?.contactSection} />
                       
                    </main>
                    
                </div>
            </div>
        </>
    );
}
