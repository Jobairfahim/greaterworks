"use client";

import Image from "next/image";

const logos = [
    "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/6955305202bd476435959515_brand-logo-white-01.png",
    "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/69553165826cac974927f6c9_brand-logo-white-03.png",
    "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/6955310d371ef5e2fc860603_brand-logo-white-10.png",
    "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/695530f295fb6e96bd01bf81_brand-logo-white-09.png",
    "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/695530d53a5307e89ec172b2_brand-logo-white-08.png",
    "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/695530c3cb577b102bc5b126_brand-logo-white-07.png",
    "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/695530b205ce517d28bd1871_brand-logo-white-06.png",
    "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/6955309f13912b7e4dd61803_brand-logo-white-05.png",
    "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/6955308a1708f1724aea0795_brand-logo-white-04.png",
    "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/69553065e5db8acfbebcc1d5_brand-logo-white-02.png",
];

export default function ApproachUsSection() {
    return (
        <>
            <section className="approach-us-section">
                <div className="container-4 w-container">
                    <div className="approach-us-wrap">
                        <div className="client-rating">
                            <div className="average-client-rating-wrap">
                                <div className="average-client-rating banner-clients-rating">
                                    <div className="award-winning hero-banner">
                                        <Image alt="Marquee Image" src="https://res.cloudinary.com/dsoilebvu/image/upload/v1777048239/rating-l_ngsvxg.svg" width={40} height={40} className="award-winning-shade-img" />
                                        <div className="rating-number-wrap hero-banner">
                                            <div className="rating-number">4.9</div>
                                            <div className="total-rating">/5</div>
                                        </div>
                                        <Image alt="Marquee Image" src="https://res.cloudinary.com/dsoilebvu/image/upload/v1777048240/rating-r_vlkuz4.svg" width={40} height={40} className="award-winning-shade-img hero-banner-shade" />
                                    </div>
                                    <div className="average-star-rating">
                                        <div className="rating-wrapper hero-banner-rating-wrap">
                                            {[...Array(5)].map((_, i) => (
                                                <Image key={i} loading="lazy" src="https://res.cloudinary.com/dsoilebvu/image/upload/v1777057659/star_o6pixh.svg" alt="star-svg" width={16} height={16} className="hero-banner-rating-star" />
                                            ))}
                                        </div>
                                        <div className="rating-remarks">Average client rating!</div>
                                    </div>
                                    <div className="seperator" />
                                    <div className="rating-brand">
                                        <Image
                                            src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                                            width={15}
                                            height={15}
                                            loading="lazy"
                                            alt="Google logo"
                                            className="rating-brand-icon"
                                        />
                                        <span className="rating-brand-text">Google</span>
                                    </div>
                                </div>
                            </div>
                            <Image src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/69428e9a31aeb6697c64a6fb_line-bar-img.png" width={758} height={20} loading="lazy" sizes="(max-width: 767px) 100vw, (max-width: 991px) 727.984375px, 758px, (max-width: 479px) 100vw, 239.921875px" alt="Line-bar-img" className="image-28" />
                        </div>
                        <div className="trusted-company">
                            <div className="section-head-content-subtitle trusted-company-content">
                                <div className="section-head-subtitle-dot" />
                                <p className="section-head-subtitle-content trusted-company-subtitle">Trusted by 500+ happy clients worldwide.</p>
                            </div>
                            <div className="logo-slider-wrap">
                                <div className="shadow-left" />
                                <div data-w-id="494f34f0-a343-cb2b-8edd-a4e71861bd23" className="logos-inner">
                                    <div className="logos-wrapper-3">
                                        {logos.map((src, i) => (
                                            <Image key={i} alt="Marquee Image" src={src} width={100} height={32} className={`ui-logo-marquee ${i === 0 ? "first-logo" : ""}`} />
                                        ))}
                                    </div>
                                    <div className="logos-wrapper-3-copy">
                                        {logos.map((src, i) => (
                                            <Image key={i} alt="Marquee Image" src={src} width={100} height={32} className={`ui-logo-marquee ${i === 0 ? "first-logo" : ""}`} />
                                        ))}
                                    </div>
                                </div>
                                <div className="shadow-right" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <style>{`
                .rating-brand {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                }
                .rating-brand-icon {
                    width: 36px;
                    height: 36px;
                    flex-shrink: 0;
                }
                .rating-brand-text {
                    color: #f7f7f7ff;
                    font-family: "DM Sans", sans-serif;
                    font-size: 24px;
                    font-weight: 700;
                    line-height: 1;
                }
                /* Pause marquee on hover */
                .logos-inner:hover .ui-logo-marquee {
                    animation-play-state: paused;
                }
                .logos-inner:hover {
                    cursor: pointer;
                }
                }
                @media only screen and (min-width: 992px) and (max-width: 1280px) {
                    .approach-us-wrap .trusted-company {
                        padding: 30px;
                    }
                    .approach-us-wrap .client-rating,
                    .approach-us-wrap .trusted-company {
                        max-width: 100%;
                        width: 50%;
                    }
                    .average-client-rating-wrap {
                        padding-left: 20px;
                    }
                }
            `}</style>
        </>
    );
}
