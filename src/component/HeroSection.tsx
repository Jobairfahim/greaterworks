"use client";

import { BannarSectionData } from "@/types/homepage";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function HeroSection({ data }: { data?: BannarSectionData }) {
    const [showVideo, setShowVideo] = useState(false);

    return (
        <>
            <section className="hero-section">
                <div className="home-banner-video-wrap">
                    <div data-poster-url="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026%2F694558fe4becfb4606b0c151_0_Office_Work_1280x672%20%281%29_poster.0000000.jpg"
                        data-video-urls="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026%2F694558fe4becfb4606b0c151_0_Office_Work_1280x672%20%281%29_mp4.mp4,https://cdn.prod.website-files.com/68d276a2319df5bdcc752026%2F694558fe4becfb4606b0c151_0_Office_Work_1280x672%20%281%29_webm.webm"
                        data-autoplay="true" data-loop="true" data-wf-ignore="true"
                        className="home-banner-video w-background-video w-background-video-atom">
                        <video
                            id="97bf2eed-053e-74a0-debc-29eaca7c8105-video"
                            autoPlay
                            loop
                            muted
                            style={{ backgroundImage: "url('https://cdn.prod.website-files.com/68d276a2319df5bdcc752026%2F694558fe4becfb4606b0c151_0_Office_Work_1280x672%20%281%29_poster.0000000.jpg')" }}
                            playsInline
                            data-wf-ignore="true"
                            data-object-fit="cover"
                        >
                            <source
                                src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026%2F694558fe4becfb4606b0c151_0_Office_Work_1280x672%20%281%29_mp4.mp4"
                                data-wf-ignore="true"
                            />
                            <source
                                src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026%2F694558fe4becfb4606b0c151_0_Office_Work_1280x672%20%281%29_webm.webm"
                                data-wf-ignore="true"
                            />
                        </video>
                    </div>
                    <div className="home-banner-video-bg-color" />
                    <div className="glass-filter services" />
                    <div className="glass-overlay services" />
                    <div className="glass-specular services" />
                </div>
                <div className="w-layout-blockcontainer container-3 hero-banner w-container">
                    <div className="hero-banner-content-wrap">
                        <div className="hero-banner-content-left">
                            <div className="section-head-content-subtitle subtitle-primary-content">
                                <div className="section-head-subtitle-dot" />
                                <p className="section-head-subtitle-content hero-primary-content">Creative Ideas That Inspire Growth</p>
                            </div>
                            <h2 className="hero-banner-title">{data?.bannarTitle || "Beyond Technology, We Build Trust"}</h2>
                            <div className="button-wrap hero-banner-button-wrap">
                                <Link href="/contact-us" className="button-primary-3 hero-banner w-inline-block">
                                    <div className="text-block-16">Get in touch</div>
                                    <Image alt="arrow-top-right" src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/68dd105094d90e0a289e4185_arrow-top-right-white.svg" width={16} height={16} className="button-icon" />
                                </Link>
                                <Link href="/contact-us" data-gn-book-meeting="modal" data-w-id="617f6bfb-f59f-e3a1-a068-c20d1b82a49a" className="button-secondary-light hero-secondary-button w-inline-block">
                                    <div className="button-secondary-light-text-2">Book a meeting</div>
                                    <div className="arrows-container cta">
                                        <Image alt="Icon" src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/6937e4382716cdf25ad0f3d5_date-icon-light.svg" width={16} height={16} className="dark-arrow _16" />
                                        <Image alt="Icon" src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/6937e33ae69eb8ce6ab3de51_date-icon-dark.svg" width={16} height={16} className="arrow-button _16" />
                                    </div>
                                </Link>
                            </div>
                            <button onClick={() => setShowVideo(true)} className="video-player-wrap responsive-style w-inline-block">
                                <div className="play-button-wrap">
                                    <div className="play-btn">
                                        <Image src="https://res.cloudinary.com/dsoilebvu/image/upload/v1777057659/poly_f74kga.svg" loading="lazy" alt="Play-icon" width={48} height={48} className="play-icon" />
                                    </div>
                                </div>
                                <div className="intro-text">Watch Intro</div>
                            </button>
                        </div>
                        <div className="hero-banner-content-right">
                            <button onClick={() => setShowVideo(true)} className="video-player-wrap w-inline-block">
                                <div className="play-button-wrap">
                                    <div className="play-btn">
                                        <Image src="https://res.cloudinary.com/dsoilebvu/image/upload/v1777057659/poly_f74kga.svg" loading="lazy" alt="Play-icon" width={48} height={48} className="play-icon" />
                                    </div>
                                </div>
                                <div className="intro-text">Watch Intro</div>
                            </button>
                            <p className="hero-banner-content-description">{data?.bannarDescription || "Crafting custom software that accelerates growth, solves complex challenges, and brings your vision to life through scalable, reliable solutions."}</p>
                            <div className="button-wrap hero-banner-button-wrap responsive-style">
                                <Link href="#" data-gn-book-meeting="modal" className="button-primary-3 hero-banner w-inline-block">
                                    <div className="text-block-16">Get in touch</div>
                                    <Image alt="arrow-top-right" src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/68dd105094d90e0a289e4185_arrow-top-right-white.svg" width={16} height={16} className="button-icon" />
                                </Link>
                                <Link href="#" data-gn-book-meeting="modal" data-w-id="0d0b2dc5-4f57-b369-2211-b496bc1f4e94" className="button-secondary-light hero-secondary-button w-inline-block">
                                    <div className="button-secondary-light-text-2">Book a meeting</div>
                                    <div className="arrows-container cta">
                                        <Image alt="Icon" src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/6937e4382716cdf25ad0f3d5_date-icon-light.svg" width={16} height={16} className="dark-arrow _16" />
                                        <Image alt="Icon" src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/6937e33ae69eb8ce6ab3de51_date-icon-dark.svg" width={16} height={16} className="arrow-button _16" />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <style>{`
                .hero-secondary-button:hover {
                    background: rgba(255, 255, 255, 0.1) !important;
                    border-color: rgba(255, 255, 255, 0.16) !important;
                }
                .hero-secondary-button:hover .button-secondary-light-text-2 {
                    color: #fff !important;
                }
                .hero-secondary-button:hover .dark-arrow._16,
                .hero-secondary-button:hover .arrow-button._16 {
                    filter: brightness(0) invert(1);
                }
                @media only screen and (min-width: 992px) and (max-width: 1280px) {
                    .hero-banner-content-wrap {
                        gap: 30px;
                    }
                    .button-secondary-light,
                    .button-primary-3 {
                        gap: 5px;
                    }
                    .button-secondary-light .button-secondary-light-text-2,
                    .button-primary-3 .text-block-16 {
                        font-size: 16px;
                    }
                }
            `}</style>

            {/* Video Popup */}
            {showVideo && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-75 z-40 flex items-center justify-center p-4"
                    onClick={() => setShowVideo(false)}
                >
                    <div 
                        className="relative w-full max-w-4xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setShowVideo(false)}
                            className="absolute -top-12 right-0 text-white hover:text-gray-300 text-2xl font-bold"
                        >
                            ×
                        </button>
                        <div className="relative pb-[56.25%] h-0">
                            <iframe
                                className="absolute top-0 left-0 w-full h-full"
                                src={data?.bannarIntroVideoUrl || "https://www.youtube.com/embed/x5Vmxo435Eg?autoplay=1"}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
