"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const engagements = [
    {
        counter: "01",
        title: "Staff Augmentation",
        desc: "Extend your team with top-tier developers and IT specialists.",
        items: [
            "On-demand access to expert talent across stacks",
            "Seamless integration with existing workflows",
            "Flexible scaling for projects & deadlines",
            "Cost-effective resourcing without quality compromise",
        ],
    },
    {
        counter: "02",
        title: "Product Development",
        desc: "End-to-end product engineering, from concept to launch.",
        items: [
            "Strategic Roadmaps for market-ready solutions",
            "MVP Creation & Risk-Free Validation",
            "Agile Development for faster delivery",
            "Scalable, Cross-Platform Architecture",
        ],
    },
    {
        counter: "03",
        title: "Dedicated Teams",
        desc: "Fully managed teams aligned with your vision and goals.",
        items: [
            "End-to-End Project Ownership with measurable outcomes",
            "Deep integration with your culture & workflows",
            "Multi-domain expertise across industries",
            "Long-term collaboration ensuring consistent innovation",
        ],
    },
];

// Individual Parallax Card Component
function ParallaxCard({ content, index, totalCards, scrollYProgress }: {
  content: React.ReactNode;
  index: number;
  totalCards: number;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  const step = 1 / Math.max(totalCards, 1);
  const start = index * step * 0.9;
  const end = start + step * 0.9;
  const y = useTransform(scrollYProgress, [start, end], [120, 0]);
  const opacity = useTransform(scrollYProgress, [start, end], [1, 1]);
  const scale = useTransform(scrollYProgress, [start, end], [0.94, 1]);

  return (
    <div
      className={`sticky top-20 ${index === 0 ? '' : '-mt-20 sm:-mt-24'}`.trim()}
      style={{ zIndex: index + 1 }}
    >
      <motion.div
        style={{ y, opacity, scale }}
        className="rounded-[28px] bg-white p-6 sm:p-8 lg:p-10"
      >
        {content}
      </motion.div>
    </div>
  );
}

// Parallax Cards Container Component
type ParallaxCardData = {
  content: React.ReactNode;
};

type ParallaxCardsProps = {
  cards: ParallaxCardData[];
  className?: string;
};

function ParallaxCards({ cards, className = '' }: ParallaxCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 20%'],
  });

  return (
    <div ref={containerRef} className={`relative ${className}`.trim()}>
      <div className="space-y-0">
        {cards.map((card, index) => (
          <ParallaxCard
            key={index}
            content={card.content}
            index={index}
            totalCards={cards.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
      <div className="h-24 sm:h-28" />
    </div>
  );
}

export default function EngagementSection() {
    // Create cards data for parallax component
    const cards = engagements.map((engagement) => ({
        content: (
            <div>
                <div className="counter">{engagement.counter}</div>
                <h3 className="on-demand-title engangement-titel">{engagement.title}</h3>
                <p className="section-title-description">{engagement.desc}</p>
                <div className="on-demand-list engagement-sub-list">
                    {engagement.items.map((item) => (
                        <div key={item} className="on-demand-list-item">
                            <div className="on-demand-list-dot" />
                            <div className="on-demand-list-title">{item}</div>
                        </div>
                    ))}
                </div>
            </div>
        ),
    }));

    return (
        <>
            {/* Web Version with Parallax */}
            <section className="overflow-x-clip py-16 sm:py-20 md:py-24 bg-white text-[#0a1a0f]">
                <div className="max-w-full mx-auto px-12 sm:px-16 lg:px-48">
                    <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-12 items-start">
                        <div>
                            <div className="section-head section-head-two sticky-header">
                                <div className="section-head-content-subtitle">
                                    <div className="section-head-subtitle-dot" />
                                    <p className="section-head-subtitle-content subtitle-secondary-content">Engagement models</p>
                                </div>
                                <div className="title title-two">
                                    <h2 className="title-h2-2 title-h2-two engagement-modal-title">Strategic Engagement Models Designed to Scale Your Business with Confidence</h2>
                                </div>
                            </div>
                            <ParallaxCards cards={cards} />
                        </div>

                        <div className="sticky top-24 self-start z-10">
                            <div className="relative flex justify-center overflow-hidden">
                                <div className="relative aspect-square w-full max-w-[700px] sm:max-w-[700px] md:max-w-[800px] lg:h-[800px] lg:w-[1000px] xl:h-[900px] xl:w-[1100px]">
                                    <Image
                                        src="https://res.cloudinary.com/dsoilebvu/image/upload/v1777048316/hire_yvjiek.png"
                                        alt="Hire developers"
                                        fill
                                        className="object-contain rounded-2xl"
                                    />
                                    <div className="absolute bottom-[25%] left-1/2 -translate-x-1/2">
                                        <Link href="/contact-us" className="flex items-center gap-2 whitespace-nowrap rounded-full bg-[#0a1a0f] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1a3525] sm:px-7 sm:py-3.5">
                                            Get in touch
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile Version - Original Layout */}
            <section className="section engagement-section lg:hidden hidden">
                <div className="container-3 engagement-container responsive-style w-container">
                    <div className="section-head section-head-two sticky-header">
                        <div className="section-head-content-subtitle">
                            <div className="section-head-subtitle-dot" />
                            <p className="section-head-subtitle-content subtitle-secondary-content">Engagement models</p>
                        </div>
                        <div className="title title-two">
                            <h2 className="title-h2-2 title-h2-two engagement-modal-title">Strategic Engagement Models Designed to Scale Your Business with Confidence</h2>
                        </div>
                    </div>
                    <div className="engagement-content-wrap">
                        <div className="engagement-list">
                            {engagements.map((e, i) => (
                                <div key={i} className={`engagement-list-item ${i > 0 ? `engagement-list-item-${i + 1}` : ""}`}>
                                    <div className="counter">{e.counter}</div>
                                    <h3 className="on-demand-title engangement-titel">{e.title}</h3>
                                    <p className="section-title-description">{e.desc}</p>
                                    <div className="on-demand-list engagement-sub-list">
                                        {e.items.map((item, j) => (
                                            <div key={j} className="on-demand-list-item">
                                                <div className="on-demand-list-dot" />
                                                <div className="on-demand-list-title">{item}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="engagement-image-wrap figure">
                            <Image src="https://res.cloudinary.com/dsoilebvu/image/upload/v1777048316/hire_yvjiek.png" loading="lazy" alt="CTA-img" width={400} height={400} className="engagement-image" />
                            <div className="engagement-btn-wrap">
                                <Link href="/contact-us" className="button-primary engangement-cta w-inline-block">
                                    <div className="text-block-16">Get in touch</div>
                                    <Image alt="arrow-top-right" src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/68dd105094d90e0a289e4185_arrow-top-right-white.svg" width={16} height={16} className="button-icon" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <Link href="/contact-us" className="button-primary engangement-cta responsive-style w-inline-block">
                        <div className="text-block-16">Get in touch</div>
                        <Image alt="arrow-top-right" src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/68dd105094d90e0a289e4185_arrow-top-right-white.svg" width={16} height={16} className="button-icon" />
                    </Link>
                </div>
            </section>
            
            <style>{`
                /* Original section styles */
                .overflow-x-clip {
                    overflow-x: clip;
                }
                
                /* Basic parallax container styles */
                .space-y-0 > * + * {
                    margin-top: 0;
                }
                
                .sticky {
                    position: sticky;
                }
                
                .rounded-\[28px\] {
                    border-radius: 28px;
                    background: white;
                }
                
                html.w-mod-js:not(.w-mod-ix3) :is(.engagement-list-item-2, .engagement-list-item-3) {
                    visibility: hidden !important;
                }
                @media only screen and (max-width: 991px) {
                    .engagement-list {
                        padding: 30px 30px 0 30px;
                    }
                }
            `}</style>
        </>
    );
}
