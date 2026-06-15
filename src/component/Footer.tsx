"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchNavbarData } from "@/lib/api";
import { NavbarData } from "@/types/navbar";

const defaultSocials = [
    { icon: "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/68e4c5c9fbdfaf41fb328b75_linkedin.svg", hover: "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/68e4c650d294d24baad93e63_linkedin-white.svg", href: "" },
    { icon: "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/69008193d2fcbc0bc3d256c5_youtube.svg", hover: "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/690081f11fd831d2aa593a98_youtube-white.svg", href: "" },
    { icon: "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/68e4c5c963753d1948850474_instagram.svg", hover: "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/68e4c6501992c6b0b7d4220a_instagram-white.svg", href: "" },
    { icon: "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/69008182dfcd3ca8a63d756b_x.svg", hover: "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/690081f116941397490b48b8_x-white.svg", href: "" },
];

const fallbackFooterCompany = [
    { label: "About Us", href: "/contact-us" },
    { label: "Work Portfolio", href: "/contact-us" },
    { label: "Career", href: "https://www.notion.so/amentotech/Job-Board-AMENTO-TECH-2951664c06b48032a384e228b1deb169", target: "_blank" },
    { label: "Pricing", href: "/contact-us" },
    { label: "Contact Us", href: "/contact-us" },
];

const fallbackServices = [
    { label: "Custom Software Development", href: "/services/custom-software-development" },
    { label: "Web Development", href: "/services/web-development" },
    { label: "Mobile App Development", href: "/services/mobile-app-development" },
    { label: "Cloud Computing", href: "/services/cloud-computing" },
    { label: "UI/UX Design", href: "/services/ui-ux-design" },
];

const fallbackIndustries = [
    { label: "E-commerce", href: "/contact-us" },
    { label: "Fintech", href: "/contact-us" },
    { label: "Healthcare", href: "/contact-us" },
    { label: "Ed-tech", href: "/contact-us" },
    { label: "Real Estate", href: "/contact-us" },
];

const fallbackSolutions = [
    { label: "Restaurant Management System", href: "/contact-us" },
    { label: "Booking & Reservation System", href: "/contact-us" },
    { label: "Real Estate Management System", href: "/contact-us" },
    { label: "ERP System", href: "/contact-us" },
];

export default function Footer() {
    const [navbarData, setNavbarData] = useState<NavbarData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadNavbarData = async () => {
            try {
                const data = await fetchNavbarData();
                setNavbarData(data);
            } catch (error) {
                console.error("Failed to load navbar data:", error);
            } finally {
                setLoading(false);
            }
        };

        loadNavbarData();
    }, []);

    if (!navbarData) {
        console.warn("Footer: No navbar data available. Using fallback content.");
    }

    const footerCompanyLinks =
        (navbarData as unknown as { companyLinks?: Array<{ label?: string; href?: string; target?: string }> })?.companyLinks
            ?.filter((item) => item?.label && item?.href)
            .map((item) => ({
                label: item.label as string,
                href: item.href as string,
                target: item.target,
            })) || fallbackFooterCompany;

    const footerSocials =
        (navbarData as unknown as { socialLinks?: Array<{ icon?: string; hover?: string; href?: string }> })?.socialLinks
            ?.filter((item) => item?.icon && item?.hover && item?.href)
            .map((item) => ({
                icon: item.icon as string,
                hover: item.hover as string,
                href: item.href as string,
            })) || defaultSocials;

    const footerDescription =
        (navbarData as unknown as { footerDescription?: string })?.footerDescription ||
        "We help businesses scale and stay competitive with cloud, AI, software & cybersecurity.";
    const footerCopyright =
        (navbarData as unknown as { copyrightText?: string })?.copyrightText ||
        "Copyright 2026 © Greater Works Technologies | All rights reserved";
    const footerLogo =
        navbarData?.footerIcon?.url
            ? `${process.env.NEXT_PUBLIC_SERVER_URL}${navbarData.footerIcon.url}`
            : "https://res.cloudinary.com/dsoilebvu/image/upload/v1777048314/logo_kxjvlv.png";

    return (
        <div className="footer" aria-busy={loading}>
            <div className="container-3 w-container">
                <div className="footer-wrapper">
                    <div className="footer-links-wrapper">
                        <div className="footer-header-wrapper">
                            <div className="footer-header-left-side">
                                <Link href="/" className="footer-brand w-nav-brand">
                                    <Image src={footerLogo} height={30} alt="" width={140} className="logo-footer-image" />
                                </Link>
                                <p className="footer-description">{footerDescription}</p>
                            </div>
                            <div className="footer-header-right-side">
                                <div className="footer-header-card">
                                    <div className="contact-us-card">
                                        <div className="contact-us-card-icon">
                                            <Image src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/68e4b7bde312a6e238715c90_email.svg" alt="icon" width={20} height={20} className="image-22" />
                                        </div>
                                        <Link href={`mailto:${navbarData?.serviceSidbarContactEmail || 'sales@greaterworks.tech'}`} className="link-2">Talk To Sales <span className="menu-contact-us-card-link-info">{navbarData?.serviceSidbarContactEmail || 'sales@greaterworks.tech'}</span></Link>
                                    </div>
                                </div>
                                <div className="footer-header-card">
                                    <div className="footer-author">
                                        <Image src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="" width={40} height={40} className="footer-author-logo" />
                                        <Link href="https://share.google/eBCe9dSE8o3Y3MIwy" target="_blank" className="w-inline-block">
                                            <p style={{ color: '#ffffff', fontSize:"1.25rem" }} className="rating-brand-text">Google</p>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="footer-link-list-wrapper">
                            {/* Services Section */}
                            <div className="footer-link-wrapper footer-service">
                                <h5 className="footer-links-header">{navbarData?.serviceSidbarTitle || 'Services We Offer'}</h5>
                                {navbarData?.services && navbarData.services.length > 0 ? (
                                    navbarData.services.map((service, i) => (
                                        service.service && (
                                            <Link 
                                                key={i} 
                                                href={`/services/${service.service.slug}`} 
                                                className={`footer-link ${i === 0 ? "margin-top-0" : ""}`}
                                            >
                                                {service.service.serviceTitle}
                                            </Link>
                                        )
                                    ))
                                ) : (
                                    fallbackServices.map((service, i) => (
                                        <Link 
                                            key={i} 
                                            href={service.href} 
                                            className={`footer-link ${i === 0 ? "margin-top-0" : ""}`}
                                        >
                                            {service.label}
                                        </Link>
                                    ))
                                )}
                            </div>

                            {/* Industries Section */}
                            <div className="footer-link-wrapper footer-our-work">
                                <h5 className="footer-links-header">Industries We Work</h5>
                                {navbarData?.industries && navbarData.industries.length > 0 ? (
                                    navbarData.industries
                                        .filter(industry => industry.industryTitle) // Filter out null titles
                                        .map((industry, i) => (
                                            <Link 
                                                key={i} 
                                                href="/contact-us" 
                                                className={`footer-link ${i === 0 ? "margin-top-0" : ""}`}
                                            >
                                                {industry.industryTitle}
                                            </Link>
                                        ))
                                ) : (
                                    fallbackIndustries.map((industry, i) => (
                                        <Link 
                                            key={i} 
                                            href={industry.href} 
                                            className={`footer-link ${i === 0 ? "margin-top-0" : ""}`}
                                        >
                                            {industry.label}
                                        </Link>
                                    ))
                                )}
                            </div>

                            {/* Company Section */}
                            <div className="footer-link-wrapper footer-about-us">
                                <h5 className="footer-links-header">Company</h5>
                                {footerCompanyLinks.map((s, i) => (
                                    <Link key={i} href={s.href} target={s.target || undefined} className={`footer-link ${i === 0 ? "margin-top-0" : ""}`}>{s.label}</Link>
                                ))}
                            </div>

                            {/* Solutions Section */}
                            <div className="footer-link-wrapper footer-hire-dev">
                                <h5 className="footer-links-header">Our Solutions</h5>
                                {navbarData?.solution && navbarData.solution.length > 0 ? (
                                    navbarData.solution
                                        .filter(sol => sol.solutoinTitle) // Filter out null titles
                                        .map((sol, i) => (
                                            <Link 
                                                key={i} 
                                                href="/contact-us" 
                                                className={`footer-link ${i === 0 ? "margin-top-0" : ""}`}
                                            >
                                                {sol.solutoinTitle}
                                            </Link>
                                        ))
                                ) : (
                                    fallbackSolutions.map((solution, i) => (
                                        <Link 
                                            key={i} 
                                            href={solution.href} 
                                            className={`footer-link ${i === 0 ? "margin-top-0" : ""}`}
                                        >
                                            {solution.label}
                                        </Link>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-reserved">
                <div className="container-3">
                    <div className="footer-bottom-wrapper">
                        <div className="footer-copyright-wrap">
                            <div className="footer-copyright">{footerCopyright}</div>
                        </div>
                        <div className="footer-rights-wrapper">
                            <ul role="list" className="footer-nav">
                                <li className="footer-nav-item"><Link href="/privacy-policy" className="footer-nav-link">Privacy Policy</Link></li>
                                <li className="footer-nav-item-dot" />
                                <li className="footer-nav-item"><Link href="/terms-and-conditions" className="footer-nav-link">Terms Of Use</Link></li>
                                <li className="footer-nav-item-dot" />
                                <li className="footer-nav-item"><Link href="/gdpr-policy" className="footer-nav-link">GDPR</Link></li>
                            </ul>
                        </div>
                        <div className="footer-about-company-item">
                            <div className="footer-social-icons-wrapper">
                                {footerSocials.map((s, i) => (
                                    <Link key={i} href={s.href} target="_blank" className="footer-social-icon w-inline-block">
                                        <Image src={s.icon} alt="icon" width={16} height={16} className="twitter-white" />
                                        <Image src={s.hover} alt="icon" width={16} height={16} className="twitter-hover" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

<style>{`
    .rating-brand-text {
    color: #000000;
    font-family:  Satoshi, Arial, sans-serif;
    font-size: 24px;
    font-weight: 700;
    line-height: 1;
}
`}</style>