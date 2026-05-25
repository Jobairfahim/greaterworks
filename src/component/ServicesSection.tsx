"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ServiceSectionData } from "@/types/homepage";

const services = [
    { title: "Custom Software Development", href: "/custom-software-development" },
    { title: "Web App Development", href: "/web-app-development" },
    { title: "Mobile App Development", href: "/mobile-app-development" },
    { title: "UI/UX Design", href: "/ui-ux-design" },
    { title: "Custom Enterprise Solutions", href: "/enterprise-solutions" },
    { title: "AI & Machine Learning", href: "/artificial-intelligence-machine-learning" },
    { title: "Blockchain Development", href: "/blockchain-development" },
    { title: "DevOps & CloudOps", href: "/devops-it-consulting" },
    { title: "Quality Assurance & Testing", href: "/quality-assurance-testing" },
];

export default function ServicesSection({ data }: { data?: ServiceSectionData }) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const subtitle = data?.serviceTagline || "What we offer";
    const title = data?.serviceTitle || "IT Solutions That Propel Your Business Forward";
    const description = data?.serviceDiscripction || "At Greater Works Technologies, we lead change with technology consulting and advanced software solutions. We help businesses embrace digital transformation through cloud solutions, enterprise software, and AI development.";
    
    const imageUrl = data?.serviceImage?.url
        ? `${process.env.NEXT_PUBLIC_SERVER_URL}${data.serviceImage.url}`
        : "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/6942ab995c9897a7f0810d41_discussion-img.png";

    const displayServices = data?.services && data.services.length > 0
        ? data.services.map(s => ({
            title: s.serviceTitle,
            href: s.slug.startsWith("/") ? `services/${s.slug}` : `/services/${s.slug}`
          }))
        : services;

    return (
        <>
            <section className="section section-v2">
                <div className="container-3 w-container">
                    <div className="section-head section-head-two">
                        <div className="section-head-content-subtitle">
                            <div className="section-head-subtitle-dot" />
                            <p className="section-head-subtitle-content subtitle-secondary-content">{subtitle}</p>
                        </div>
                        <div className="title title-two">
                            <h2 className="title-h2-2 title-h2-two">{title}</h2>
                            <p className="section-title-description">{description}</p>
                        </div>
                    </div>
                    <div className="our-service-wrapper">
                        <div className="services-content-left">
                            {displayServices.map((s, i) => (
                                <Link 
                                    key={i} 
                                    href={s.href} 
                                    className="services-listing-item w-inline-block"
                                    onMouseEnter={() => setHoveredIndex(i)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    <div className="services-listing-title">{s.title}</div>
                                    <Image 
                                        alt="arrow-top-right" 
                                        src={hoveredIndex === i ? "https://res.cloudinary.com/dsoilebvu/image/upload/v1778074601/68dd0ede1e60a7db30b19932_arrow-top-right_1_ufxclp.svg" : "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/68dd105094d90e0a289e4185_arrow-top-right-white.svg"} 
                                        width={24} 
                                        height={24} 
                                        className="button-icon service-listing-icon-white" 
                                    />
                                    <Image 
                                        alt="arrow-top-right" 
                                        src={hoveredIndex === i ? "https://res.cloudinary.com/dsoilebvu/image/upload/v1778074601/68dd0ede1e60a7db30b19932_arrow-top-right_1_ufxclp.svg" : "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/6942b22dc1dbf27cb5b5a394_arrow-up-right-grey.png"} 
                                        width={24} 
                                        height={24} 
                                        className="button-icon service-listing-icon" 
                                    />
                                </Link>
                            ))}
                        </div>
                        <div className="services-content-right">
                            <div className="discussion-content-wrap">
                                <div className="discussion-content">
                                    <div className="discussion-text">Looking for something specific? Let&apos;s discuss a custom solution!</div>
                                    <Link href="/contact-us" className="button-primary-3 discussion-cta w-inline-block">
                                        <div className="text-block-16 discussion-cta-text">Get in touch</div>
                                        <Image alt="arrow-top-right" src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/68dd105094d90e0a289e4185_arrow-top-right-white.svg" width={16} height={16} className="button-icon arrow-up-right" />
                                    </Link>
                                </div>
                            </div>
                            <Image 
                                src={imageUrl} 
                                width={1000} 
                                height={1000} 
                                loading="lazy" 
                                alt="Discussion-image" 
                                className="discussion-image" 
                                unoptimized={!!data?.serviceImage?.url}
                            />
                        </div>
                    </div>
                </div>
            </section>
            <style>{`
            .services-listing-item:hover .button-icon.service-listing-icon-white {
                opacity: 1 !important;
                filter: none !important;
                transform: scale(1.3) !important;
                transition: transform 0.2s ease !important;
            }
            .services-listing-item:hover .button-icon.service-listing-icon {
                opacity: 1 !important;
                transform: scale(1.3) !important;
                transition: transform 0.2s ease !important;
            }
            .button-icon.service-listing-icon-white,
            .button-icon.service-listing-icon {
                transition: transform 0.2s ease !important;
            }
            @media only screen and (min-width: 992px) and (max-width: 1280px) {
                .discussion-content {
                    padding: 20px;
                    flex-wrap: wrap;
                    gap: 20px;
                }
            }
        `}</style>
        </>
    );
}
