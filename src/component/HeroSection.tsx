"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
    const lightboxJson = JSON.stringify({
        items: [{
            url: "https://www.youtube.com/watch?v=PZXhLjXE88o",
            originalUrl: "https://www.youtube.com/watch?v=PZXhLjXE88o",
            width: 940,
            height: 528,
            thumbnailUrl: "https://i.ytimg.com/vi/PZXhLjXE88o/hqdefault.jpg",
            html: "<iframe class=\"embedly-embed\" src=\"//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2FPZXhLjXE88o%3Ffeature%3Doembed&display_name=YouTube&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DPZXhLjXE88o&image=https%3A%2F%2Fi.ytimg.com%2Fvi%2FPZXhLjXE88o%2Fhqdefault.jpg&type=text%2Fhtml&schema=youtube\" width=\"940\" height=\"528\" scrolling=\"no\" title=\"YouTube embed\" frameborder=\"0\" allow=\"autoplay; fullscreen; encrypted-media; picture-in-picture;\" allowfullscreen=\"true\"></iframe>",
            type: "video"
        }],
        group: ""
    });

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
                            <h2 className="hero-banner-title">Beyond Technology, We Build Trust</h2>
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
                            <a href="#" className="video-player-wrap responsive-style w-inline-block w-lightbox">
                                <div className="play-button-wrap">
                                    <div className="play-btn">
                                        <Image src="https://res.cloudinary.com/dsoilebvu/image/upload/v1777057659/poly_f74kga.svg" loading="lazy" alt="Play-icon" width={48} height={48} className="play-icon" />
                                    </div>
                                </div>
                                <div className="intro-text">Watch Intro</div>
                                <script type="application/json" className="w-json" dangerouslySetInnerHTML={{ __html: lightboxJson }}></script>
                            </a>
                        </div>
                        <div className="hero-banner-content-right">
                            <a href="#" className="video-player-wrap w-inline-block w-lightbox">
                                <div className="play-button-wrap">
                                    <div className="play-btn">
                                        <Image src="https://res.cloudinary.com/dsoilebvu/image/upload/v1777057659/poly_f74kga.svg" loading="lazy" alt="Play-icon" width={48} height={48} className="play-icon" />
                                    </div>
                                </div>
                                <div className="intro-text">Watch Intro</div>
                                <script type="application/json" className="w-json" dangerouslySetInnerHTML={{ __html: lightboxJson }}></script>
                            </a>
                            <p className="hero-banner-content-description">Crafting custom software that accelerates growth, solves complex challenges, and brings your vision to life through scalable, reliable solutions.</p>
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
        </>
    );
}
