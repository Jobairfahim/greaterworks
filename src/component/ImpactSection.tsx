"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const stats = [
    { title: "Years of experience", value: 10, suffix: "+", display: "10+", decimals: 0, desc: "Years of experience building custom software solutions." },
    { title: "Client retention rate", value: 98, suffix: "%", display: "98%", decimals: 0, desc: "Client retention rate, & longterm partnerships built on trust." },
    { title: "Projects delivered", value: 300, suffix: "+", display: "300+", decimals: 0, desc: "Projects delivered successfully across various industries." },
    { title: "Users worldwide", value: 50, suffix: "M+", display: "50M+", decimals: 0, desc: "Empowering 50M+ users with seamless digital experiences" },
];

export default function ImpactSection() {
    const countersRef = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
        const triggers: ScrollTrigger[] = [];

        countersRef.current.forEach((counter, i) => {
            if (!counter) return;
            const target = stats[i].value;
            const obj = { val: 0 };

            const tween = gsap.to(obj, {
                val: target,
                duration: 2,
                ease: "power2.out",
                delay: 0.3,
                snap: { val: stats[i].decimals > 0 ? 0.1 : 1 },
                onUpdate: () => {
                    const formatted =
                        stats[i].decimals > 0
                            ? obj.val.toFixed(stats[i].decimals)
                            : Math.floor(obj.val).toString();
                    counter.textContent = formatted + stats[i].suffix;
                },
            });

            const st = ScrollTrigger.create({
                trigger: counter,
                start: "top 90%",
                once: true,
                onEnter: () => tween.play(),
            });
            tween.pause();
            triggers.push(st);
        });

        return () => {
            triggers.forEach((st) => st.kill());
        };
    }, []);

    return (
        <>
            <section className="our-impact">
                <div className="container-3 w-container">
                    <div className="section-head section-head-two">
                        <div className="section-head-content-subtitle subtitle-primary-content">
                            <div className="section-head-subtitle-dot" />
                            <p className="section-head-subtitle-content subtitle-primary-content">Impact that speaks for Itself</p>
                        </div>
                        <div id="w-node-_91e32355-7776-50bb-abb0-7dd1d2bcce8f-d2bcce88" className="title title-two">
                            <h2 data-amt="text-reveal" className="title-h2 title-h2-two why-choose-us-title-h2">From Concept to Industry Impact, We Build World Class Experiences</h2>
                            <div className="button-wrap service-banner-button none">
                                <Link href="/contact-us" className="button-primary-dark w-inline-block">
                                    <div className="text-block-12">Get in touch</div>
                                    <Image alt="arrow-top-right" src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/68dd105094d90e0a289e4185_arrow-top-right-white.svg" width={16} height={16} className="button-icon" />
                                </Link>
                                <Link href="/contact-us" data-gn-book-meeting="modal" className="button-secondary-dark w-inline-block">
                                    <div className="button-secondary-dark-text">Book a meeting</div>
                                    <div className="arrows-container cta">
                                        <Image src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/6937e4382716cdf25ad0f3d5_date-icon-light.svg" alt="Icon" width={16} height={16} className="arrow-button _16" />
                                        <Image src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/6937e33ae69eb8ce6ab3de51_date-icon-dark.svg" alt="Icon" width={16} height={16} className="dark-arrow _16" />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <ul role="list" className="quality-stats-list-two">
                        {stats.map((s, i) => (
                            <li key={i} className="quality-stats-item-two">
                                <div className={`quality-stats-card-two ${i === stats.length - 1 ? "last-item" : ""}`}>
                                    <p className="quality-stats-card-title-two">{s.title}</p>
                                    <p className="quality-stats-card-counter">
                                        <span
                                            ref={(el) => { countersRef.current[i] = el; }}
                                            data-suffix={s.suffix}
                                            data-target={s.value}
                                            className="amt-counter amt-counter-two"
                                        >
                                            0{s.suffix}
                                        </span>
                                    </p>
                                    <p className="quality-stats-card-info-two">{s.desc}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="button-wrap service-banner-button v2">
                        <Link href="/contact-us" data-gn-book-meeting="modal" className="button-primary-dark button-primary-dark-responsive w-inline-block">
                            <div className="text-block-12 text-block-12-responsive">Start a project</div>
                            <Image alt="arrow-top-right" src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/68dd105094d90e0a289e4185_arrow-top-right-white.svg" width={16} height={16} className="button-icon" />
                        </Link>
                        <Link href="/contact-us" data-gn-book-meeting="modal" className="button-secondary-dark button-secondary-dark-responsive w-inline-block">
                            <div className="button-secondary-dark-text button-secondary-dark-text-responsive">Book a meeting</div>
                            <div className="arrows-container cta">
                                <Image src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/6937e4382716cdf25ad0f3d5_date-icon-light.svg" alt="Icon" width={16} height={16} className="arrow-button _16 v2" />
                                <Image src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/6937e33ae69eb8ce6ab3de51_date-icon-dark.svg" alt="Icon" width={16} height={16} className="dark-arrow _16" />
                            </div>
                        </Link>
                    </div>
                </div>
            </section>
            <style>{`
                .button-secondary-dark {
                    transition:
                        background-color 0.3s ease-in-out,
                        border-color 0.3s ease-in-out;
                }
                .button-secondary-dark:hover {
                    background-color: #e6e6e6;
                    border-color: #cfcfcf;
                }
                .button-secondary-dark .button-secondary-dark-text {
                    transition: color 0.3s ease-in-out;
                }
                .button-secondary-dark:hover .button-secondary-dark-text {
                    color: #152423;
                }
                .button-secondary-dark .arrow-button._16 {
                    transition: opacity 0.3s ease-in-out;
                }
                .button-secondary-dark:hover .arrow-button._16 {
                    opacity: 0;
                }
                .button-secondary-dark .dark-arrow._16 {
                    transition: opacity 0.3s ease-in-out;
                }
                .button-secondary-dark:hover .dark-arrow._16 {
                    opacity: 1;
                }
                .quality-stats-card-info-two .amt-counter {
                    font-weight: 500;
                }
                .stats-toasts {
                    -webkit-animation: floating 1.3s infinite;
                    animation: floating 1.3s infinite;
                }
                .stats-toasts-two {
                    -webkit-animation: floating 1.4s infinite;
                    animation: floating 1.4s infinite;
                }
                .stats-toasts-three {
                    -webkit-animation: floating 1.5s infinite;
                    animation: floating 1.5s infinite;
                }
                @keyframes floating {
                    0% {
                        transform: scale(0.9);
                    }
                    50% {
                        transform: scale(1);
                    }
                    100% {
                        transform: scale(0.9);
                    }
                }
            `}</style>
        </>
    );
}
