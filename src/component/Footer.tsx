"use client";

import Image from "next/image";
import Link from "next/link";

const footerServices = [
    { label: "Custom Software Development", href: "/custom-software-development" },
    { label: "Web Development", href: "/web-app-development" },
    { label: "Mobile App development", href: "/mobile-app-development" },
    { label: "Cloud Computing", href: "/devops-it-consulting" },
    { label: "UI/UX Design", href: "/ui-ux-design" },
    { label: "Enterprise Solutions", href: "/enterprise-solutions" },
    { label: "Artificial Intelligence & Machine Learning", href: "/artificial-intelligence-machine-learning" },
    { label: "DevOps & IT Consulting", href: "/devops-it-consulting" },
    { label: "Blockchain Development", href: "/blockchain-development" },
    { label: "Quality Assurance & Testing", href: "/quality-assurance-testing" },
];

const footerIndustries = [
    { label: "E-commerce", href: "/contact-us" },
    { label: "Fintech", href: "/contact-us" },
    { label: "Healthcare", href: "/contact-us" },
    { label: "Ed-tech", href: "/contact-us" },
    { label: "On-Demand", href: "/contact-us" },
    { label: "Food & Groceries", href: "/contact-us" },
    { label: "Real Estate", href: "/contact-us" },
    { label: "Blockchain", href: "/contact-us" },
];

const footerCompany = [
    { label: "About Us", href: "/contact-us" },
    { label: "Work Portfolio", href: "/contact-us" },
    { label: "Career", href: "https://www.notion.so/amentotech/Job-Board-AMENTO-TECH-2951664c06b48032a384e228b1deb169", target: "_blank" },
    { label: "Pricing", href: "/contact-us" },
    { label: "Contact Us", href: "/contact-us" },
];

const footerHire = [
    { label: "Python Developer", href: "/contact-us" },
    { label: "Flutter Developer", href: "/contact-us" },
    { label: "SaaS Developer", href: "/contact-us" },
    { label: "Elixir Developer", href: "/contact-us" },
    { label: "React Js Developer", href: "/contact-us" },
    { label: "Node Js Developer", href: "/contact-us" },
    { label: "ROR Developer", href: "/contact-us" },
    { label: "MERN Stack Developer", href: "/contact-us" },
];

const socials = [
    { icon: "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/68e4c5c9fbdfaf41fb328b75_linkedin.svg", hover: "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/68e4c650d294d24baad93e63_linkedin-white.svg", href: "https://www.linkedin.com/company/amento-tech" },
    { icon: "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/69008193d2fcbc0bc3d256c5_youtube.svg", hover: "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/690081f11fd831d2aa593a98_youtube-white.svg", href: "https://www.youtube.com/@amentotech" },
    { icon: "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/68e4c5c963753d1948850474_instagram.svg", hover: "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/68e4c6501992c6b0b7d4220a_instagram-white.svg", href: "https://www.instagram.com/amentotech" },
    { icon: "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/69008182dfcd3ca8a63d756b_x.svg", hover: "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/690081f116941397490b48b8_x-white.svg", href: "https://x.com/amentotech" },
];

export default function Footer() {
    return (
        <div className="footer">
            <div className="container-3 w-container">
                <div className="footer-wrapper">
                    <div className="footer-links-wrapper">
                        <div className="footer-header-wrapper">
                            <div className="footer-header-left-side">
                                <Link href="/home-page-v2" className="footer-brand w-nav-brand">
                                    <Image src="https://res.cloudinary.com/dsoilebvu/image/upload/v1777048314/logo_kxjvlv.png" height={30} alt="" width={140} className="logo-footer-image" />
                                </Link>
                                <p className="footer-description">We help businesses scale and stay competitive with cloud, AI, software & cybersecurity.</p>
                            </div>
                            <div className="footer-header-right-side">
                                <div className="footer-header-card">
                                    <div className="contact-us-card">
                                        <div className="contact-us-card-icon">
                                            <Image src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/68e4b7bde312a6e238715c90_email.svg" alt="icon" width={20} height={20} className="image-22" />
                                        </div>
                                        <Link href="mailto:sales@greaterworks.tech" className="link-2">Talk To Sales <span className="menu-contact-us-card-link-info">sales@greaterworks.tech</span></Link>
                                    </div>
                                </div>
                                <div className="footer-header-card">
                                    <div className="footer-author">
                                        <Image src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/693686de8bf6a11d6c5e4739_Elite%20Badge.svg" alt="" width={40} height={40} className="footer-author-logo" />
                                        <Link href="https://themeforest.net/user/amentotech/portfolio" target="_blank" className="w-inline-block">
                                            <Image src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/693686decf47d76c7fffa679_Envato%20Logo.svg" alt="" width={80} height={20} className="footer-author-logo-2" />
                                            <p className="footer-author-info">Elite Author Since 2018</p>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="footer-link-list-wrapper">
                            <div className="footer-link-wrapper footer-service">
                                <h5 className="footer-links-header">Services We Offer</h5>
                                {footerServices.map((s, i) => (
                                    <Link key={i} href={s.href} className={`footer-link ${i === 0 ? "margin-top-0" : ""}`}>{s.label}</Link>
                                ))}
                            </div>
                            <div className="footer-link-wrapper footer-our-work">
                                <h5 className="footer-links-header">Industries we work</h5>
                                {footerIndustries.map((s, i) => (
                                    <Link key={i} href={s.href} className={`footer-link ${i === 0 ? "margin-top-0" : ""}`}>{s.label}</Link>
                                ))}
                            </div>
                            <div className="footer-link-wrapper footer-about-us">
                                <h5 className="footer-links-header">Company</h5>
                                {footerCompany.map((s, i) => (
                                    <Link key={i} href={s.href} target={s.target || undefined} className={`footer-link ${i === 0 ? "margin-top-0" : ""}`}>{s.label}</Link>
                                ))}
                            </div>
                            <div className="footer-link-wrapper footer-hire-dev">
                                <h5 className="footer-links-header">Hire devs</h5>
                                {footerHire.map((s, i) => (
                                    <Link key={i} href={s.href} className={`footer-link ${i === 0 ? "margin-top-0" : ""}`}>{s.label}</Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-reserved">
                <div className="container-3">
                    <div className="footer-bottom-wrapper">
                        <div className="footer-copyright-wrap">
                            <div className="footer-copyright">Copyright 2026 &copy; Greater Works Technologies | All rights reserved</div>
                        </div>
                        <div className="footer-rights-wrapper">
                            <ul role="list" className="footer-nav">
                                <li className="footer-nav-item"><Link href="/privacy-policy" className="footer-nav-link">Privacy Policy</Link></li>
                                <li className="footer-nav-item-dot" />
                                <li className="footer-nav-item"><Link href="/terms-and-conditions" className="footer-nav-link">Terms Of Use</Link></li>
                            </ul>
                        </div>
                        <div className="footer-about-company-item">
                            <div className="footer-social-icons-wrapper">
                                {socials.map((s, i) => (
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
