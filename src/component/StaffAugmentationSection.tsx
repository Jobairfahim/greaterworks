"use client";

import { TechStackSectionData } from "@/types/homepage";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const tabs = [
    { label: "Front End", image: "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/695533ec7b71331f251fa598_frontend.png" },
    { label: "Back End", image: "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/6953e5e0976e19ecd54bca52_back-end.webp" },
    { label: "Low/No Code", image: "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/6953e60295a8cf46185499bb_low-no-code.webp" },
    { label: "Database", image: "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/6953e6179e256f3b2a0b7593_database.webp" },
    { label: "DevOps", image: "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/6953e62ce75474700a9cc0e0_devops.webp" },
    { label: "Mobile", image: "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/6953e63f23daa6daaa11693c_mobile.webp" },
    { label: "AI & ML", image: "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/6953e65253f794174c6919f8_ai-ml.webp" },
];

export default function StaffAugmentationSection({ data }: { data?: TechStackSectionData }) {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <>
            <section className="section section-box section-v3">
                <div className="container-3 w-container">
                    <div className="section-head section-head-two staff-augmentation">
                        <div className="section-head-content-subtitle">
                            <div className="section-head-subtitle-dot" />
                            <p className="section-head-subtitle-content subtitle-secondary-content">Tech Stack</p>
                        </div>
                        <div className="title title-two">
                            <h2 className="title-h2-2 title-h2-two staff-augmentation">{data?.techStackTitle || "Shape Your Perfect Team of Expert Developers Skilled in Leading Technologies"}</h2>
                        </div>
                    </div>
                    <div className="software-technologies-tabs w-tabs">
                        <div className="software-technology-menu w-tab-menu">
                            {tabs.map((tab, i) => (
                                <button key={i} onClick={() => setActiveTab(i)} className={`software-technology-tab-link w-inline-block w-tab-link ${activeTab === i ? "w--current active" : ""}`}>
                                    <div className="software-technology-tab-title">{tab.label}</div>
                                </button>
                            ))}
                        </div>
                        <div className="software-technology-tab-content w-tab-content">
                            {tabs.map((tab, i) => (
                                <div key={i} className={`software-technology-tab-pane w-tab-pane ${activeTab === i ? "w--tab-active" : ""}`} style={{ display: activeTab === i ? "block" : "none" }}>
                                    <Image src={tab.image} loading="eager" alt="tech-img" width={2000} height={2000} unoptimized className="technology-image" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="technology-cta">
                        <div className="technology-cta-content-wrap">
                            <div className="technoloy-left-content">
                                <p className="technology-stats-card-info-two">
                                    <span className="amt-counter amt-counter-two tech-number">{data?.techStackTechNumber || 120}+</span>
                                </p>
                                <p className="section-title-description technology-description">{data?.techStackDescription || "Technology stack expertise & custom integrations experience"}</p>
                            </div>
                            <div className="button-wrap hero-banner-button-wrap on-demand-cta">
                                <Link href="/contact-us" className="button-primary on-demand-cta w-inline-block">
                                    <div className="text-block-16">Get in touch</div>
                                    <Image alt="arrow-top-right" src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/68dd105094d90e0a289e4185_arrow-top-right-white.svg" width={16} height={16} className="button-icon" />
                                </Link>
                                <Link href="/contact-us" className="button-secondary-light w-inline-block">
                                    <div className="button-secondary-light-text-2">Book a meeting</div>
                                    <div className="arrows-container cta">
                                        <Image alt="Icon" src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/6937e4382716cdf25ad0f3d5_date-icon-light.svg" width={16} height={16} className="dark-arrow _16" />
                                        <Image alt="Icon" src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/6937e33ae69eb8ce6ab3de51_date-icon-dark.svg" width={16} height={16} className="arrow-button _16" />
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="logo-ticker-wrap">
                            <Image src="https://res.cloudinary.com/dsoilebvu/image/upload/v1777048319/stack_prlff7.png" loading="lazy" alt="Logo Ticker Img" width={1000} height={1000} className="logo-ticker-image" />
                        </div>
                    </div>
                </div>
            </section>
            <style>{`
                .software-technology-menu::-webkit-scrollbar {
                    display: none;
                }
                .software-technology-menu {
                    scrollbar-width: none;
                }
                .software-technology-tab-link {
                    transition: background-color 0.3s ease-in-out;
                }
                .software-technology-tab-link .software-technology-tab-title {
                    transition: color 0.3s ease-in-out;
                }
                .software-technology-tab-link:hover .software-technology-tab-title,
                .software-technology-tab-link.w--current .software-technology-tab-title {
                    color: #fff;
                }
                @media (max-width: 480px) {
                    .software-technology-menu {
                        margin-left: 0px;
                    }
                }
                @media only screen and (min-width: 992px) and (max-width: 1280px) {
                    .software-technology-menu {
                        margin-left: 20px;
                        gap: 5px;
                    }
                    .technoloy-left-content {
                        flex-wrap: wrap;
                    }
                    .technology-cta {
                        padding: 25px;
                        gap: 30px;
                    }
                    .technology-cta .technology-cta-content-wrap {
                        width: 51%;
                    }
                    .technology-cta .logo-ticker-wrap {
                        max-width: 100%;
                        width: 49%;
                    }
                    .w-layout-blockcontainer:has(.staff-augmentation) {
                        max-width: 100%;
                    }
                    .section-head.section-head-two.staff-augmentation {
                        padding: 0 20px;
                    }
                }
            `}</style>
        </>
    );
}
