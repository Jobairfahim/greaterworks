"use client";

import { useEffect, useRef } from "react";
import {
  IndustrySectionData,
  OnDemandSectionData,
  Industry,
} from "@/types/homepage";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { LuMoveUpRight } from "react-icons/lu";

const industries = [
  {
    title: "E-Commerce",
    icon: "https://res.cloudinary.com/dsoilebvu/image/upload/v1777061222/e-commercee_ehrqku.svg",
    bg: "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/694929087a7c485aa351d3c0_e-commerce-bg.png",
    items: [
      "AI-powered recommendation engines",
      "Omnichannel retail integration",
      "Custom payment gateway integration",
      "Product catalog management",
      "Customer loyalty program integration",
    ],
  },
  {
    title: "FinTech",
    icon: "https://res.cloudinary.com/dsoilebvu/image/upload/v1777061146/fin_vl07rb.svg",
    bg: "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/694934fc1f5beb93c3bbc666_fintech.png",
    items: [
      "Blockchain for secure transactions",
      "Regulatory compliance solutions",
      "Real-time fraud detection systems",
      "Digital wallets and payment systems",
      "Peer-to-peer lending platforms",
    ],
  },
  {
    title: "Healthcare",
    icon: "https://res.cloudinary.com/dsoilebvu/image/upload/v1777061147/health_idmkig.svg",
    bg: "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/694937f5af34b90e4d37f74d_healthcare.png",
    items: [
      "EHR system integration",
      "Telemedicine platform development",
      "Patient data analytics solutions",
      "Appointment scheduling systems",
      "Medical billing and coding software",
    ],
  },
  {
    title: "EdTech",
    icon: "https://res.cloudinary.com/dsoilebvu/image/upload/v1777061145/ed_dnafdh.svg",
    bg: "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/6949390b0d45772d0676dc17_edtech.png",
    items: [
      "Custom LMS development",
      "Interactive e-learning tools",
      "Virtual classroom integration",
      "Student performance tracking systems",
      "Gamified learning experiences",
    ],
  },
  {
    title: "Food & Groceries",
    icon: "https://res.cloudinary.com/dsoilebvu/image/upload/v1777061148/Food_tsvbyc.svg",
    bg: "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/694939839a76bc11a20b34e7_food-groceries.png",
    items: [
      "Food supply chain optimization",
      "Grocery delivery app development",
      "Inventory management systems for groceries",
      "Real-time order tracking systems",
      "Dynamic pricing models for perishable goods",
    ],
  },
  {
    title: "Real Estate",
    icon: "https://res.cloudinary.com/dsoilebvu/image/upload/v1777061148/real-state_sksj1b.svg",
    bg: "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/69493a171d4d9be9fe1e059f_real-estate.png",
    items: [
      "Property listing platforms",
      "Real estate CRM integration",
      "Virtual property tours",
      "Real estate transaction management systems",
      "Real-time property valuation tools",
    ],
  },
  {
    title: "Fashion",
    icon: "https://res.cloudinary.com/dsoilebvu/image/upload/v1777061148/fashion_xjz7wh.svg",
    bg: "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/69493aa5788b5d7fb9065d4e_fashion.png",
    items: [
      "Virtual try-on solutions",
      "Fashion e-commerce platforms",
      "Inventory management for fashion",
      "Trend forecasting analytics",
      "Custom design visualization tools",
    ],
  },
  {
    title: "Blockchain",
    icon: "https://res.cloudinary.com/dsoilebvu/image/upload/v1777061595/block_zyz4vf.svg",
    bg: "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/69493aa5788b5d7fb9065d4e_blockchain.png",
    items: [
      "Smart contract development",
      "Private blockchain solutions",
      "Decentralized finance (DeFi) platforms",
      "Tokenization platforms",
      "Blockchain-based identity verification systems",
    ],
  },
];

const DEFAULT_ICONS = [
  "https://res.cloudinary.com/dsoilebvu/image/upload/v1777061222/e-commercee_ehrqku.svg",
  "https://res.cloudinary.com/dsoilebvu/image/upload/v1777061146/fin_vl07rb.svg",
  "https://res.cloudinary.com/dsoilebvu/image/upload/v1777061147/health_idmkig.svg",
  "https://res.cloudinary.com/dsoilebvu/image/upload/v1777061145/ed_dnafdh.svg",
  "https://res.cloudinary.com/dsoilebvu/image/upload/v1777061148/Food_tsvbyc.svg",
  "https://res.cloudinary.com/dsoilebvu/image/upload/v1777061148/real-state_sksj1b.svg",
  "https://res.cloudinary.com/dsoilebvu/image/upload/v1777061148/fashion_xjz7wh.svg",
  "https://res.cloudinary.com/dsoilebvu/image/upload/v1777061595/block_zyz4vf.svg",
];

function getIndustryIcon(title: string, index: number): string {
  const lower = title.toLowerCase();
  if (lower.includes("commerce") || lower.includes("shop"))
    return DEFAULT_ICONS[0];
  if (lower.includes("fin") || lower.includes("pay") || lower.includes("bank"))
    return DEFAULT_ICONS[1];
  if (
    lower.includes("health") ||
    lower.includes("med") ||
    lower.includes("clinic")
  )
    return DEFAULT_ICONS[2];
  if (
    lower.includes("ed") ||
    lower.includes("learn") ||
    lower.includes("school")
  )
    return DEFAULT_ICONS[3];
  if (lower.includes("food") || lower.includes("grocery"))
    return DEFAULT_ICONS[4];
  if (
    lower.includes("estate") ||
    lower.includes("property") ||
    lower.includes("home")
  )
    return DEFAULT_ICONS[5];
  if (
    lower.includes("fashion") ||
    lower.includes("style") ||
    lower.includes("wear")
  )
    return DEFAULT_ICONS[6];
  if (
    lower.includes("block") ||
    lower.includes("chain") ||
    lower.includes("crypto")
  )
    return DEFAULT_ICONS[7];
  return DEFAULT_ICONS[index % DEFAULT_ICONS.length];
}

export default function IndustriesSection({
  data,
  onDemand,
  industries: fetchedIndustries = [],
}: {
  data?: IndustrySectionData;
  onDemand?: OnDemandSectionData;
  industries?: Industry[];
}) {
  const activeIndustries =
    fetchedIndustries.length > 0
      ? fetchedIndustries.map((ind, i) => {
          const bgUrl = ind.image?.url
            ? ind.image.url.startsWith("http")
              ? ind.image.url
              : `${process.env.NEXT_PUBLIC_SERVER_URL}${ind.image.url}`
            : "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/694929087a7c485aa351d3c0_e-commerce-bg.png";

          return {
            title: ind.title,
            icon: getIndustryIcon(ind.title, i),
            bg: bgUrl,
            items: ind.details ? ind.details.map((d) => d.details) : [],
          };
        })
      : industries;
  return (
    <>
      <section className="section section-box p">
        <div className="container-3 w-container">
          <div className="section-head section-head-two">
            <div className="section-head-content-subtitle">
              <div className="section-head-subtitle-dot" />
              <p className="section-head-subtitle-content subtitle-secondary-content">
                Industries we serve
              </p>
            </div>
            <div
              id="w-node-c97fd2b9-5442-167c-a940-0206d67d1c11-28eb60ed"
              className="title title-two"
            >
              <h2 data-amt="text-reveal" className="title-h2-2 title-h2-two">
                {data?.industrySectionTitle ||
                  "Empowering Industries with Advanced Digital Solutions"}
              </h2>
              <p className="section-title-description">
                {data?.industrySectionDetails ||
                  "Delivering intelligent technology solutions to optimize efficiency, foster innovation, and propel sustainable growth across every sector we serve."}
              </p>
            </div>
          </div>
          <div id="industries-wrapper" className="industries-slider-wrap">
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={20}
              loop={true}
              speed={600}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                320: { slidesPerView: 1 },
                481: { slidesPerView: 1.5 },
                900: { slidesPerView: 2 },
                1280: { slidesPerView: 3 },
              }}
              onSlideChange={(swiper) => {
                swiper.slides.forEach((slide) =>
                  slide.classList.remove("current"),
                );
                const originals = swiper.slides.filter(
                  (sl) => !sl.classList.contains("swiper-slide-duplicate"),
                );
                const active = originals[swiper.realIndex];
                if (active) active.classList.add("current");
              }}
              onInit={(swiper) => {
                swiper.slides.forEach((slide) =>
                  slide.classList.remove("current"),
                );
                const originals = swiper.slides.filter(
                  (sl) => !sl.classList.contains("swiper-slide-duplicate"),
                );
                const active = originals[swiper.realIndex];
                if (active) active.classList.add("current");
              }}
            >
              {activeIndustries.map((ind, i) => (
                <SwiperSlide key={i}>
                  <li className="industries-slider-list-item">
                    <figure className="industries-slider-card">
                      <div className="industry-card-bg" />
                      <div className="industries-card-gradient" />
                      <Image
                        src={ind.bg}
                        loading="lazy"
                        alt="Image"
                        width={544}
                        height={450}
                        unoptimized
                        className="industries-card-bg-img"
                      />
                      <div className="industries-slider-content-wrap">
                        <div className="industries-slider-content">
                          <div className="industries-list-item-icon-wrap">
                            <Image
                              alt="icon"
                              src={ind.icon}
                              width={48}
                              height={48}
                              className="industry-list-item-icon"
                            />
                          </div>
                          <div className="industries-card-content">
                            <h3 className="industries-title">{ind.title}</h3>
                            <ul role="list" className="list-4 industries-list">
                              {ind.items.map((item, j) => (
                                <li
                                  key={j}
                                  className="list-item-7 industries-list-item"
                                >
                                  <div className="on-demand-list-dot" />
                                  <p className="paragraph-17 industries-list-item-content">
                                    {item}
                                  </p>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <Link
                            href="/coming-soon"
                            className="title-button transition-none active-button w-inline-block"
                          >
                            <div className="title-button-text">View More</div>

                            <LuMoveUpRight className="title-button-text" />
                          </Link>
                        </div>
                      </div>
                    </figure>
                  </li>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="on-demand-content-wrap">
            <div className="on-demand-content">
              <h3 className="on-demand-title">On-Demand Solutions</h3>
              <div className="on-demand-list">
                {onDemand?.onDemandDetails &&
                onDemand.onDemandDetails.length > 0
                  ? onDemand.onDemandDetails.map((item) => (
                      <div key={item.id} className="on-demand-list-item">
                        <div className="on-demand-list-dot" />
                        <div className="on-demand-list-title">
                          {item.details}
                        </div>
                      </div>
                    ))
                  : [
                      "Service booking apps",
                      "Subscription-based service platforms",
                      "Real-time delivery tracking",
                      "On-demand ride-sharing solutions",
                    ].map((item, i) => (
                      <div key={i} className="on-demand-list-item">
                        <div className="on-demand-list-dot" />
                        <div className="on-demand-list-title">{item}</div>
                      </div>
                    ))}
              </div>
            </div>
            <div className="button-wrap hero-banner-button-wrap on-demand-cta">
              <Link
                href="/contact-us"
                className="button-primary on-demand-cta w-inline-block"
              >
                <div className="text-block-16">Get in touch</div>
                <Image
                  alt="arrow-top-right"
                  src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/68dd105094d90e0a289e4185_arrow-top-right-white.svg"
                  width={16}
                  height={16}
                  className="button-icon"
                />
              </Link>
              <Link
                href="/contact-us"
                data-gn-book-meeting="modal"
                data-w-id="2508fbb2-8c84-a30d-a44c-a22c87bd4b73"
                className="button-secondary-light hero-secondary-button w-inline-block"
              >
                <div className="button-secondary-light-text-2">
                  Book a meeting
                </div>
                <div className="arrows-container cta">
                  <Image
                    alt="Icon"
                    src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/6937e4382716cdf25ad0f3d5_date-icon-light.svg"
                    width={16}
                    height={16}
                    className="dark-arrow _16"
                  />
                  <Image
                    alt="Icon"
                    src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/6937e33ae69eb8ce6ab3de51_date-icon-dark.svg"
                    width={16}
                    height={16}
                    className="arrow-button _16"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <style>{`
                .industries-list-item-content {
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    transition: all 0.3s ease;
                    transition: overflow 0.3s ease-in-out;
                }
                .industries-slider-list-item:active .industries-list-item-content,
                .industries-slider-list-item:hover .industries-list-item-content {
                    overflow: visible;
                    -webkit-line-clamp: none;
                }
                #industry-container.new-container {
                    padding-left: calc((100vw - 1710px) / -2);
                }
                .industries-slider-list-item .industry-card-bg {
                    transition: opacity 0.3s ease-in-out;
                }
                .industries-slider-list-item .industries-slider-content {
                    transition: transform 0.3s ease-in-out;
                }
                .industries-slider-list-item:hover .industries-slider-content {
                    transform: translateY(0);
                }
                .industries-slider-list-item:hover .industry-card-bg {
                    opacity: 1 !important;
                }
                .industries-slider-list-item .industries-title {
                    margin-bottom: 48px;
                    transition: margin 0.3s ease-in-out;
                }
                .industries-slider-list-item:hover .industries-title {
                    margin-bottom: 16px;
                }
                .swiper-slide-active .industries-slider-card .image-20.industries-list-item-img,
                .swiper-slide-active .industries-slider-card .industries-list-item-icon,
                .industries-slider-card:hover .image-20.industries-list-item-img,
                .industries-slider-card:hover .industries-list-item-icon {
                    opacity: 0;
                }
                .swiper-slide-active .industries-slider-card .industries-list-item-img-hover,
                .swiper-slide-active .industries-slider-card .industries-list-item-icon-hover,
                .industries-slider-card:hover .industries-list-item-img-hover,
                .industries-slider-card:hover .industries-list-item-icon-hover {
                    display: block;
                }
                .swiper-slide-active .industries-slider-card .industries-list-item-content,
                .swiper-slide-active .industries-slider-card .industries-title,
                .industries-slider-card:hover .industries-list-item-content,
                .industries-slider-card:hover .industries-title {
                    color: #fff;
                }
                .swiper-slide-active .industries-slider-card .button-primary,
                .industries-slider-card:hover .button-primary {
                    background: var(--primary);
                }
                .swiper-slide-active
                    .industries-slider-card
                    .industries-card-bg:not(.industries-card-bg-hover),
                .industries-slider-card:hover
                    .industries-card-bg:not(.industries-card-bg-hover) {
                    opacity: 0;
                }
                .swiper-slide-active
                    .industries-slider-card
                    .industries-card-bg.industries-card-bg-hover,
                .industries-slider-card:hover .industries-card-bg.industries-card-bg-hover {
                    transform: translate(0, 0%);
                }
                #industry-container {
                    padding-left: calc((100vw - 1320px) / -2);
                }
                @media (max-width: 991px) {
                    #industry-container.new-container {
                        padding-left: 20px !important;
                    }
                    .industries-slider-wrap {
                        max-width: 100vw !important;
                    }
                }
                @media only screen and (min-width: 992px) and (max-width: 1280px) {
                    .on-demand-content-wrap {
                        gap: 30px;
                        padding: 30px;
                        flex-wrap: wrap;
                    }
                    .industries-slider-content {
                        transform: translate(0, 305px);
                    }
                }
                /* Override View More button hover effect */
                .title-button:hover {
                    background-color: transparent !important;
                    background-image: none !important;
                }
                .active-button:hover {
                    background-color: transparent !important;
                    background-image: none !important;
                }
                .title-button.transition-none.active-button:hover {
                    background-color: transparent !important;
                    color: var(--primary) !important;
                }
                .industries-slider-content .title-button.transition-none.active-button:hover {
                    background-color: transparent !important;
                    color: var(--primary) !important;
                }
                @media only screen and (max-width: 1320px) {
                    #industry-container {
                        padding-left: 0 !important;
                        overflow: hidden;
                    }
                }
                @media only screen and (max-width: 1680px) {
                    .industries-slider-wrap {
                        max-width: calc(100vw - 80px);
                    }
                    #industry-container.new-container {
                        padding-left: calc((100vw - 1320px) / -2);
                    }
                }
                @media only screen and (max-width: 1440px) {
                    .industries-slider-wrap {
                        max-width: calc(100vw - 63px);
                    }
                }
            `}</style>
    </>
  );
}
