"use client";

import Image from "next/image";
import Link from "next/link";

export default function CTASection() {
    return (
        <>
            <div className="section cta-section-two">
                <div className="container-3 w-container">
                    <div className="cta-content-wrap">
                        <h3 className="cta-content-title">Lets bring your idea to life? We&apos;re always excited about starting a new project. </h3>
                        <div className="button-wrap cta-buttons-two">
                            <Link href="/contact-us" className="button-primary-5 cta-button-primary w-inline-block">
                                <div className="text-block-22">Start a project</div>
                                <Image alt="arrow-top-right" src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/68dd105094d90e0a289e4185_arrow-top-right-white.svg" width={16} height={16} className="button-icon" />
                            </Link>
                            <Link href="/contact-us" className="button-secondary-light hero-secondary-button w-inline-block no-hover">
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
            <style>{`
                @media (max-width: 480px) {
                    .section.cta-section-two {
                        padding-top: 32px;
                        padding-bottom: 32px;
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
