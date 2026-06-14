"use client";

import { SelectedWorkSectionData, SelectedWork } from "@/types/homepage";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";

const caseStudies = [
    {
        id: "1",
        name: "Value Care",
        title: "Value-Based Care Management Software",
        desc: "A value-based care management platform built for clinics and care teams. Simplifies patient programs, billing workflows, and reimbursement tracking.",
    },
    {
        id: "2",
        name: "Gigneo",
        title: "AI-Powered Services & Digital Items Marketplace",
        desc: "A smart marketplace for AI-powered services, tools, and digital products. Connect with modern solutions designed to automate, scale, and accelerate your business.",
    },
    {
        id: "3",
        name: "Workreap",
        title: "Online Professionals & Job Marketplace",
        desc: "A talent marketplace connecting businesses with verified professionals. Post jobs, hire freelancers, and manage projects in one secure platform.",
    },
    {
        id: "4",
        name: "Topline",
        title: "AI-Powered Growth Platform for Professionals",
        desc: "An AI-powered growth platform that helps professionals manage leads, automate outreach, and convert clients faster.",
    },
];

const DEFAULT_BGS = [
    "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/690204360a47bb374fdfd6f8_img-bg-01.png",
    "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/68edfdbeeed21cd13c7882fa_img-bg-02.png",
    "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/68fa288152b3552c969f59c5_img-bg-03.png",
    "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/68fa29b8d0e9b13cbfd05a9f_img-bg-04.png"
];

function getProjectName(title: string): string {
    const words = title.split(" ");
    if (words.length > 1) {
        return `${words[0]} ${words[1]}`;
    }
    return words[0] || "Project";
}

export default function CaseStudySection({ 
    data,
    selectedWorks = []
}: { 
    data?: SelectedWorkSectionData;
    selectedWorks?: SelectedWork[];
}) {
    const listRef = useRef<HTMLUListElement>(null);

    const activeCaseStudies = selectedWorks.length > 0
        ? selectedWorks.map((model, i) => {
            const bgUrl = model.image?.url
                ? (model.image.url.startsWith("http")
                    ? model.image.url
                    : `${process.env.NEXT_PUBLIC_SERVER_URL}${model.image.url}`)
                : DEFAULT_BGS[i % DEFAULT_BGS.length];
            
            return {
                id: String(i + 1),
                name: getProjectName(model.title),
                title: model.title,
                desc: model.description,
                bg: bgUrl
            };
        })
        : caseStudies.map((cs, i) => ({
            ...cs,
            bg: DEFAULT_BGS[i % DEFAULT_BGS.length]
        }));

    useEffect(() => {
        if (!listRef.current) return;

        const cards = listRef.current.querySelectorAll<HTMLLIElement>(".case-study-card-item");
        const images = document.querySelectorAll<HTMLImageElement>(".case-study-bg img");

        const handleMouseEnter = (e: Event) => {
            const card = e.currentTarget as HTMLLIElement;
            const id = card.getAttribute("data-amt-item");
            const target = document.querySelector<HTMLImageElement>(`.case-study-bg-image-${id}`);

            gsap.to(images, { opacity: 0, duration: 0.3, pointerEvents: "none" });
            if (target) {
                gsap.to(target, { opacity: 1, duration: 0.5, pointerEvents: "auto" });
            }
        };

        cards.forEach((card) => {
            card.addEventListener("mouseenter", handleMouseEnter);
        });

        return () => {
            cards.forEach((card) => {
                card.removeEventListener("mouseenter", handleMouseEnter);
            });
        };
    }, [selectedWorks]);

    return (
        <>
            <section className="section case-study-section">
                <div className="div-block-24">
                    <div className="container-3 w-container">
                        <div className="section-head section-head-two">
                            <div className="section-head-content-subtitle">
                                <div className="section-head-subtitle-dot" />
                                <p className="section-head-subtitle-content subtitle-secondary-content">Selected works ( {data?.selectedWorkYears || "2024 - 2025"} )</p>
                            </div>
                            <div id="w-node-ac1d2d88-9db0-673c-14ec-8da00a74a86b-28eb60ed" className="title title-two">
                                <h2 data-amt="text-reveal" className="title-h2-2 title-h2-two case-study-title">{data?.selectedWorkTitle || "Our Solutions Have Empowered Businesses Worldwide"}</h2>
                                <div className="button-wrap service-banner-button">
                                    <Link href="/contact-us" className="button-primary-dark w-inline-block">
                                        <div className="text-block-12">Talk to us</div>
                                        <Image alt="arrow-top-right" src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/68dd105094d90e0a289e4185_arrow-top-right-white.svg" width={16} height={16} className="button-icon" />
                                    </Link>
                                    <Link href="/contact-us" data-gn-book-meeting="modal" data-w-id="0bccd79c-11eb-4320-ede2-235c9f3c19c7" className="button-secondary-light hero-secondary-button w-inline-block no-hover">
                                        <div className="button-secondary-light-text-2">Book a meeting</div>
                                        <div className="arrows-container cta">
                                            <Image alt="Icon" src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/6937e33ae69eb8ce6ab3de51_date-icon-dark.svg" width={16} height={16} className="dark-arrow _16" />
                                            <Image alt="Icon" src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/6937e33ae69eb8ce6ab3de51_date-icon-dark.svg" width={16} height={16} className="arrow-button _16" />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-4 w-container">
                        <div className="case-study-wrap">
                            <div className="case-study-bg">
                                {activeCaseStudies.map((cs, i) => (
                                    <Image 
                                        key={cs.id}
                                        loading="lazy" 
                                        src={cs.bg} 
                                        alt="bg image" 
                                        width={1200} 
                                        height={600} 
                                        unoptimized
                                        className={`case-study-bg-image case-study-bg-image-${cs.id}`}
                                        style={{ opacity: i === 0 ? 1 : 0 }}
                                    />
                                ))}
                                <div className="case-study-bg-color" />
                            </div>
                            <ul ref={listRef} role="list" className="case-study-list">
                                {activeCaseStudies.map((cs, i) => (
                                    <li key={i} data-amt-item={cs.id} className={`case-study-card-item ${i === 0 ? "border-left-0" : `case-study-card-item-0${i}`}`}>
                                        <div className="bg-filter" />
                                        <div className="case-study-card">
                                            <div className="section-head-content-subtitle case-study-name none">
                                                <div className="section-head-subtitle-dot" />
                                                <p className="section-head-subtitle-content hero-primary-content">{cs.name}</p>
                                            </div>
                                            <h3 className="case-study-card-title">{cs.title}</h3>
                                            <div className="case-study-desc">{cs.desc}</div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="button-wrap service-banner-button responsive-style">
                            <Link href="/contact-us" data-gn-book-meeting="modal" className="button-primary-dark w-inline-block">
                                <div className="text-block-12">Talk to us</div>
                                <Image alt="arrow-top-right" src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/68dd105094d90e0a289e4185_arrow-top-right-white.svg" width={16} height={16} className="button-icon" />
                            </Link>
                            <Link href="/contact-us" data-gn-book-meeting="modal" data-w-id="b7f189c3-7215-4f02-b69c-bed022614c0b" className="button-secondary-light w-inline-block no-hover">
                                <div className="button-secondary-light-text-2">Book a meeting</div>
                                <div className="arrows-container cta">
                                    <Image alt="Icon" src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/6937e33ae69eb8ce6ab3de51_date-icon-dark.svg" width={16} height={16} className="dark-arrow _16" />
                                    <Image alt="Icon" src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/6937e33ae69eb8ce6ab3de51_date-icon-dark.svg" width={16} height={16} className="arrow-button _16" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <style>{`
                .case-study-card-item .case-study-card {
                    transition: transform 0.3s ease-in-out;
                }
                .case-study-card-item:hover .case-study-card {
                    transform: translate(0, 0);
                }
                .case-study-card-item {
                    transition: background 0.3s ease-in-out;
                }
                .case-study-card-item .bg-filter {
                    transition: opacity 0.3s ease-in-out;
                }
                .case-study-card-item:hover .bg-filter {
                    opacity: 1;
                }
                .case-study-desc {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    transition: all 0.3s ease;
                    transition: overflow 0.3s ease-in-out;
                }
                .case-study-card-item:active .case-study-desc,
                .case-study-card-item:hover .case-study-desc {
                    overflow: visible;
                    -webkit-line-clamp: none;
                }
                @media (max-width: 991px) {
                    .case-study-card-item {
                        background-image: none !important;
                    }
                    .case-study-bg-image {
                        background-image: linear-gradient(#15242300, #152423);
                    }
                }
                @media only screen and (min-width: 992px) and (max-width: 1280px) {
                    .case-study-card-item {
                        padding: 20px;
                    }
                    .case-study-card {
                        transform: translate(0, 103px) !important;
                    }
                    .case-study-card-item:hover .case-study-card {
                        transform: translate(0, 0) !important;
                    }
                }
                /* Override Book a meeting button hover effect */
                .button-secondary-light.no-hover:hover {
                    background-color: #e6e6e6 !important;
                    transform: none !important;
                    box-shadow: none !important;
                    border-color: #cfcfcf !important;
                }
                .button-secondary-light.no-hover:hover .button-secondary-light-text-2 {
                    color: #152423 !important;
                }
                .button-secondary-light.no-hover:hover .dark-arrow._16 {
                    opacity: 1 !important;
                    filter: none !important;
                }
                .button-secondary-light.no-hover:hover .arrow-button._16 {
                    opacity: 0 !important;
                }
                .button-secondary-light.no-hover:hover .arrows-container {
                    transform: none !important;
                }
            `}</style>
        </>
    );
}
