"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

const testimonials = [
    {
        desc: "The most extensive and well-designed theme of this type that I've seen available. Constantly updated, great support, feature requests added to the theme and constantly getting better. Really hope it keeps improving and evolving for a long time. Great work!",
        name: "Raustyle",
        designation: "Envato Customer",
    },
    {
        desc: "Outstanding Code Quality & Exceptional Support! Working with the Amentotech team has been an absolute pleasure. The code quality of their Lernen LMS and related addons is clean, well-documented, and thoughtfully structured, making integration seamless.",
        name: "Briskinventions",
        designation: "Envato Customer",
    },
    {
        desc: "We are very satisfied with the Workreap template, it is very functional and flexible for our work. We have even bought it twice to use it for a second project. In addition, the support team helps us with all our questions until they are solved.",
        name: "Cbasauric",
        designation: "Envato Customer",
    },
    {
        desc: "The guys at AmentoTech have taken the project seriously and are working hard on correcting and improving the script every day. The best thing of all is the speed and seriousness of the support. My congratulations to the AmentoTech Team.",
        name: "Puntotango",
        designation: "Envato Customer",
    },
    {
        desc: "This is quite an excellent theme, its design and comfort make it quite compact, its support and customer service is quite good, only if you are a user with little knowledge this will be a bit complicated for beginners, but otherwise this is a pretty good topic.",
        name: "Enmanuel",
        designation: "Envato Customer",
    },
];

export default function TestimonialsSection() {
    return (
        <>
            <section className="section section-box pb-120">
                <div className="container-3 w-container">
                    <div className="section-head section-head-two">
                        <div className="section-head-content-subtitle">
                            <div className="section-head-subtitle-dot" />
                            <p className="section-head-subtitle-content subtitle-secondary-content">What Our Clients Testify</p>
                        </div>
                        <div id="w-node-f45bf615-749c-f206-010c-cf24ca47f6e0-28eb60ed" className="title title-two">
                            <h2 data-amt="text-reveal" className="title-h2-2 title-h2-two client-review">Endorsed by Industry Leaders for Delivering Unmatched Value</h2>
                            <div className="average-client-rating">
                                <div className="award-winning">
                                    <Image alt="Marquee Image" src="https://res.cloudinary.com/dsoilebvu/image/upload/v1777048239/rating-l_ngsvxg.svg" width={40} height={40} className="award-winning-shade-img" />
                                    <div className="rating-number-wrap">
                                        <div className="rating-number client-review">4.9</div>
                                        <div className="total-rating client-review">/5</div>
                                    </div>
                                    <Image alt="Marquee Image" src="https://res.cloudinary.com/dsoilebvu/image/upload/v1777048240/rating-r_vlkuz4.svg" width={40} height={40} className="award-winning-shade-img hero-banner-shade" />
                                </div>
                                <div className="average-star-rating">
                                    <div className="rating-wrapper hero-banner-rating-wrap">
                                        {[...Array(5)].map((_, i) => (
                                            <Image key={i} loading="lazy" src="https://res.cloudinary.com/dsoilebvu/image/upload/v1777057659/star_o6pixh.svg" alt="star-svg" width={16} height={16} className="hero-banner-rating-star" />
                                        ))}
                                    </div>
                                    <div className="rating-remarks client-review">Average client rating!</div>
                                </div>
                                <div className="seperator client-review" />
                                <Image src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/69440c812b834803ed4f2260_envato-logo-dark.png" loading="lazy" alt="logo" width={80} height={24} className="brand-logo" />
                            </div>
                        </div>
                    </div>
                    <div id="client-wrapper" className="clients-slider-wrap">
                        <Swiper
                            modules={[Navigation, Autoplay]}
                            spaceBetween={50}
                            loop={true}
                            speed={600}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true
                            }}
                            breakpoints={{
                                320: { slidesPerView: 1 },
                                481: { slidesPerView: 1 },
                                900: { slidesPerView: 2 },
                                1280: { slidesPerView: 2 },
                            }}
                        >
                            {testimonials.map((t, i) => (
                                <SwiperSlide key={i}>
                                    <li className="clients-review-slider-item">
                                        <div className="rating-wrapper">
                                            {[...Array(5)].map((_, j) => (
                                                <Image key={j} loading="lazy" src="https://res.cloudinary.com/dsoilebvu/image/upload/v1777057659/star_o6pixh.svg" alt="star-svg" width={16} height={16} className="star-icon-filled" />
                                            ))}
                                        </div>
                                        <div className="client-review-description">{t.desc}</div>
                                        <div className="client-profile-wrap  mt-20!">
                                            <Image src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/6953e25f2b41648999029475_Avatar.svg" loading="lazy" alt="Client Profile" width={48} height={48} className="client-image" />
                                            <div className="client-description">
                                                <h3 className="client-name">{t.name}</h3>
                                                <div className="client-designation">{t.designation}</div>
                                            </div>
                                        </div>
                                    </li>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </section>
            <style>{`
                .clients-slider-wrap:active {
                    cursor: grabbing;
                }
                .clients-slider-wrap .clients-review-slider-item {
                    display: flex;
                    flex-direction: column;
                    min-height: 320px;
                }
                .clients-review-slider-list {
                    display: flex;
                    transition: transform 0.45s ease;
                    will-change: transform;
                }
                .clients-review-slider-item {
                    flex: 0 0 100%;
                    list-style: none;
                    user-select: none;
                }
                .clients-slider-wrap .clients-review-slider-item {
                    flex: none;
                }
                @media (max-width: 480px) {
                    .clients-slider-wrap .clients-review-slider-item {
                        min-height: 250px;
                    }
                }
                @media (max-width: 1680px) {
                    .clients-slider-wrap .clients-review-slider-item {
                        min-height: 250px;
                    }
                }
            `}</style>
        </>
    );
}
