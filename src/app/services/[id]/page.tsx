import { Metadata } from "next";
import ContactSection from "@/component/ContactSection";
import { ServiceFaqAccordion } from "@/component/ServiceFaqAccordion";
import Image from "next/image";
import Link from "next/link";
import { getServiceBySlug } from "@/lib/api";
import { LuMoveUpRight } from "react-icons/lu";

export type CmsRecord = Record<string, unknown>;

interface CmsImage {
  url?: string;
  alternativeText?: string | null;
  formats?: Record<string, { url?: string } | undefined>;
}

interface ServicePageProps {
  params: Promise<{ id: string }>;
}

const FALLBACK_BANNER_IMAGE =
  "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/695227c7f17e6a5a37ecaea8_banner-image.png";

function isRecord(value: unknown): value is CmsRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asRecord(value: unknown): CmsRecord {
  return isRecord(value) ? value : {};
}

export function asArray(value: unknown): CmsRecord[] {
  return Array.isArray(value) ? value.filter(isRecord) : [];
}

function getString(source: CmsRecord, keys: string[], fallback = "") {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === "string" && value.trim()) return value;
    if (typeof value === "number") return String(value);
  }
  return fallback;
}

function getNumber(source: CmsRecord, keys: string[], fallback = 0) {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === "number") return value;
    if (
      typeof value === "string" &&
      value.trim() &&
      !Number.isNaN(Number(value))
    ) {
      return Number(value);
    }
  }
  return fallback;
}

function getImageUrl(image: unknown, fallback: string) {
  if (!isRecord(image)) return fallback;
  const cmsImage = image as CmsImage;
  const url =
    cmsImage.formats?.large?.url ||
    cmsImage.formats?.medium?.url ||
    cmsImage.formats?.small?.url ||
    cmsImage.url;

  if (!url) return fallback;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${process.env.NEXT_PUBLIC_SERVER_URL ?? ""}${url}`;
}

function getNestedArray(source: CmsRecord, keys: string[]) {
  for (const key of keys) {
    const value = source[key];
    if (Array.isArray(value)) return asArray(value);
  }
  return [];
}

function getServiceSeo(service: CmsRecord | null, slug: string) {
  const seo = asRecord(service?.seo);
  const title =
    getString(seo, ["metaTitle", "title", "seoTitle"]) ||
    getString(service ?? {}, ["serviceTitle", "title"], "") ||
    slug
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  const description =
    getString(seo, ["metaDescription", "description", "seoDescription"]) ||
    "Custom software services designed to scale your business.";

  return { title, description };
}

// export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
//   const { id } = await params;
//   const service = await getServiceBySlug(id);
//   const seo = getServiceSeo(service, id);

//   return {
//     title: seo.title,
//     description: seo.description,
//     openGraph: {
//       title: seo.title,
//       description: seo.description,
//       type: "website",
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: seo.title,
//       description: seo.description,
//     },
//   };
// }

export default async function CustomSoftwareDevelopmentPage({
  params,
}: ServicePageProps) {
  const { id } = await params;
  const service = (await getServiceBySlug(id)) ?? {};

  const bannar = asRecord(service.bannar);
  const chooseUs = asRecord(service.chooseUs);
  const selectedWork = asRecord(service.selectedWork);
  const ourProcess = asRecord(service.ourProcess);
  const faq = asRecord(service.faq);

  const bannerTitle = getString(
    bannar,
    ["title", "bannarTitle", "bannerTitle", "heading"],
    "Custom Software Development Built for Innovation & Growth",
  );
  const bannerSubtitle = getString(
    bannar,
    ["subtitle", "tagline", "bannarSubTitle", "bannerSubTitle"],
    "Booking for Q1 2026",
  );
  const bannerDescription = getString(
    bannar,
    ["description", "bannarDescription", "bannerDescription"],
    "Beyond Code, Delivering Impact! We don't just build apps, we create solutions that drive business results and delight users.",
  );
  const brandTitle = getString(
    bannar,
    ["brandsTitle", "brandTitle"],
    "Trusted by 500+ happy clients worldwide.",
  );
  const bannerImage = getImageUrl(bannar.bannarImage, FALLBACK_BANNER_IMAGE);
  const brandImages = asArray(bannar.brandsImages);

  const offerItems = getNestedArray(service, ["offer"]);
  const chooseUsItems = getNestedArray(chooseUs, ["chooseUsSectionData"]);
  const workItems = getNestedArray(selectedWork, ["selectedWorkSectionData"]);
  const processItems = getNestedArray(ourProcess, ["process"]);
  const testimonials = getNestedArray(ourProcess, ["testimonial"]);
  const faqItems = getNestedArray(faq, ["faqs"]);

  const fallbackOfferItems = [
    {
      num: "S / 001",
      icon: "69566f0cfd5b251dab6cb856_d-choose-us-img-02_3_kfjzqz.svg",
      title: "Web Application Development",
      desc: "Secure, responsive web applications built for scalability, cross-device compatibility, and custom feature integration.",
    },
    {
      num: "S / 002",
      icon: "69566d02b993d21fb5c04f20_d-service-card-01_3_pq3sxg.svg",
      title: "API & System Integration",
      desc: "Robust APIs and seamless integration of legacy systems with new tools, supporting real-time or batch sync and microservices.",
    },
    {
      num: "S / 003",
      icon: "6956795cc329e420ceeece35_q-choose-us-img-02_1_p4uwvo.svg",
      title: "Enterprise Data Solutions & Analytics",
      desc: "End-to-end data solutions including ETL pipelines, real-time dashboards, predictive analytics, and data warehousing.",
    },
    {
      num: "S / 004",
      icon: "695654920fcdb2da81023066_bussiness_1_fvajfy.svg",
      title: "Cloud & Infrastructure Engineering",
      desc: "Cloud migration (AWS, Azure, GCP), server less architectures, containerization, DevOps pipelines, infrastructure as code, and monitoring.",
    },
    {
      num: "S / 005",
      icon: "69567c9a2c612e8ca6f24b8f_m-service-card-01_1_zjo3xx.svg",
      title: "UI/UX Design & Prototyping",
      desc: "User research, journey mapping, wireframes, interactive prototypes, visual and interaction design, and usability testing.",
    },
    {
      num: "S / 006",
      icon: "69566d029643f586cf9f0265_d-service-card-06_5_v692hw.svg",
      title: "Maintenance & Support",
      desc: "Comprehensive maintenance including bug fixes, feature updates, performance optimization, security compliance, and managed SLA support.",
    },
  ];

  const offerDisplayItems =
    offerItems.length > 0
      ? offerItems.map((item, index) => ({
          num: getString(
            item,
            ["num", "number", "counter"],
            `S / ${String(index + 1).padStart(3, "0")}`,
          ),
          icon: fallbackOfferItems[index % fallbackOfferItems.length].icon,
          title: getString(
            item,
            ["title", "offerTitle", "heading"],
            fallbackOfferItems[index % fallbackOfferItems.length].title,
          ),
          desc: getString(
            item,
            ["description", "offerDescription", "details"],
            fallbackOfferItems[index % fallbackOfferItems.length].desc,
          ),
        }))
      : fallbackOfferItems;

  const fallbackChooseUsItems = [
    {
      icon: "69567b82006c105bfc41926e_w-choose-us-img-05_4_bujohb.svg",
      alt: "Octagon Icon",
      title: "Full Ownership & IP Rights",
      desc: "You have complete ownership and all intellectual property rights to your product.",
    },
    {
      icon: "695657cc93405ab37a5e556b_choose-us-icon-03_1_ecehat.svg",
      alt: "Quality-standard-icon",
      title: "Assured Quality Standards",
      desc: "Dependable software solutions through strong design, careful testing, and clear maintenance.",
    },
    {
      icon: "69567b82049528fdedba9c45_w-choose-us-img-02_4_gxzfoe.svg",
      alt: "Globe",
      title: "Flexible Engagement Models",
      desc: "Choose from flexible models, dedicated teams, staff augmentation, or project-based solutions.",
    },
    {
      icon: "69567b827695f581f7b31b50_w-choose-us-img-03_4_cgot6w.svg",
      alt: "communication-icon",
      title: "Transparent Communication",
      desc: "Stay informed with transparent project tracking, frequent updates, and concise agile reports.",
    },
    {
      icon: "69567b820738559f1070439c_w-choose-us-img-04_2_o3bngu.svg",
      alt: "business-icon",
      title: "Business-Centric Solutions",
      desc: "Solutions crafted to mirror your business strategy, ensuring alignment with your industry landscape.",
    },
    {
      icon: "69566d029643f586cf9f0265_d-service-card-06_4_lnqdyd.svg",
      alt: "settings-icon",
      title: "Ongoing Support & Growth",
      desc: "Reliable maintenance, continuous updates, and scalable solutions for performance and growth.",
    },
  ];

  const chooseUsDisplayItems =
    chooseUsItems.length > 0
      ? chooseUsItems.map((item, index) => ({
          icon: getImageUrl(
            item.icon,
            `https://res.cloudinary.com/dsoilebvu/image/upload/v1778074611/${fallbackChooseUsItems[index % fallbackChooseUsItems.length].icon}`,
          ),
          alt: getString(
            item,
            ["alt", "title"],
            fallbackChooseUsItems[index % fallbackChooseUsItems.length].alt,
          ),
          title: getString(
            item,
            ["title", "chooseUsTitle", "heading"],
            fallbackChooseUsItems[index % fallbackChooseUsItems.length].title,
          ),
          desc: getString(
            item,
            ["description", "chooseUsDescription", "details"],
            fallbackChooseUsItems[index % fallbackChooseUsItems.length].desc,
          ),
        }))
      : fallbackChooseUsItems.map((item) => ({
          ...item,
          icon: `https://res.cloudinary.com/dsoilebvu/image/upload/v1778074611/${item.icon}`,
        }));

  const fallbackWorks = [
    {
      title: "Lernen - Key Challenges & Value Delivered",
      description:
        "We built Lernen to connect students with expert tutors seamlessly. With a mobile-friendly, intuitive platform, customizable sessions, real-time messaging, and scheduling tools, it empowers students and tutors in a complete marketplace.",
      image: {
        url: "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/695622ae093c1cca3a5e771d_lernen-works.png",
      },
      impact:
        "Improved learning efficiency, smoother session management, and higher student satisfaction.",
      impactNumber: 70,
      impactSuffix: "%",
    },
    {
      title: "Workreap - Powerful Freelance Marketplaces",
      description:
        "We built Workreap to create feature-rich, user-friendly freelance marketplaces, enabling freelancers and employers to connect, collaborate, and grow efficiently with a scalable, engaging, and intuitive platform.",
      image: {
        url: "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/695d1bbd7d1a666f4f84bb62_img-09.jpg",
      },
      impact:
        "Faster hiring cycles, improved freelancer engagement, and smoother project collaboration.",
      impactNumber: 55,
      impactSuffix: "%",
    },
    {
      title: "Doctreat - Transforming Online Healthcare",
      description:
        "We built Doctreat to connect patients and doctors seamlessly. With a user-friendly, research-backed design, it has enabled 5,000+ patients and 1,000+ doctors to complete 20,000+ consultations efficiently.",
      image: {
        url: "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/69576f55b4cbbc51040f438a_doctreat-work.png",
      },
      impact:
        "Improved appointment efficiency and enhanced patient engagement.",
      impactNumber: 40,
      impactSuffix: "%",
    },
  ];

  const selectedWorksToDisplay =
    workItems.length >= 3 ? workItems : fallbackWorks;
  const selectedWorksDisplay = selectedWorksToDisplay.map((item, index) => ({
    title: getString(
      item,
      ["title", "selectedWorkTitle", "heading"],
      `Project ${index + 1}`,
    ),
    description: getString(
      item,
      ["description", "selectedWorkDescription", "details"],
      "",
    ),
    image: getImageUrl(
      item.image,
      getImageUrl(asRecord(item).selectedWorkImage, FALLBACK_BANNER_IMAGE),
    ),
    impact: getString(item, ["impact", "impactDescription", "result"], ""),
    impactNumber: getNumber(item, ["impactNumber", "impactValue", "target"], 0),
    impactSuffix: getString(item, ["impactSuffix", "suffix"], "%"),
  }));

  const processDisplayItems = (
    processItems.length > 0
      ? processItems
      : [
          {
            num: "01.",
            title: "Discovery & Planning",
            desc: "We align on business goals, user needs, scope, feasibility, and a clear roadmap.",
          },
          {
            num: "02.",
            title: "Design & Prototyping",
            desc: "User-first UX/UI and interactive prototypes that reflect your brand and drive adoption.",
          },
          {
            num: "03.",
            title: "Agile Development & Testing",
            desc: "Iterative development with continuous testing to ensure stability, security, and performance.",
          },
          {
            num: "04.",
            title: "Launch, Support & Growth",
            desc: "Smooth deployment, team training, system integration, and ongoing improvements as you scale.",
          },
        ]
  ).map((item, index) => ({
    num: getString(
      item,
      ["num", "number", "counter"],
      `${String(index + 1).padStart(2, "0")}.`,
    ),
    title: getString(item, ["title", "processTitle", "heading"], ""),
    desc: getString(item, ["description", "processDescription", "details"], ""),
  }));

  const testimonialDisplayItems = (
    testimonials.length > 0
      ? testimonials
      : [
          {
            name: "Raustyle",
            role: "Google Customer",
            text: "The most extensive and well-designed theme of this type that I've seen available. Constantly updated, great support, feature requests added to the theme and constantly getting better. Really hope it keeps improving and evolving for a long time. Great work!",
            image: {
              url: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",
            },
          },
          {
            name: "paulthinkgrow",
            role: "Google Customer",
            text: "Very GREAT customer support. I am blown away. Great price for the template and very beautiful. I contacted support for something I thought was impossible and they were so kind and helped me without any hesitation. Thank you so much.",
            image: {
              url: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",
            },
          },
          {
            name: "BuxRecord",
            role: "Google Customer",
            text: "Great job. I have use many other freelancers script theme, fiverr clone script and theme since years, and no one like this in design, and features. So i decide to remove previous script from my domain and install workreap. Now i am happy. Thanks for your support too",
            image: {
              url: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",
            },
          },
        ]
  ).map((item) => ({
    name: getString(item, ["name", "authorName", "title"], "Client"),
    role: getString(item, ["role", "designation", "company"], "Customer"),
    text: getString(item, ["text", "feedback", "description"], ""),
    image: getImageUrl(
      item.image,
      "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",
    ),
  }));

  const faqDisplayItems = (
    faqItems.length > 0
      ? faqItems
      : [
          {
            q: "How long does a custom software project take?",
            a: "Timelines vary depending on complexity but typically range from 3 to 9 months.",
          },
          {
            q: "How much does it cost to build software?",
            a: "Costs depend on features, technology stack, and engagement model. We provide transparent estimates after the discovery phase.",
          },
          {
            q: "Do you offer ongoing support?",
            a: "Yes, we offer long-term maintenance, upgrades, and technical assistance.",
          },
          {
            q: "How do you ensure software security?",
            a: "We follow global compliance standards (ISO, GDPR, HIPAA) with advanced encryption and data protection.",
          },
        ]
  ).map((item) => ({
    q: getString(item, ["q", "question", "title"], ""),
    a: getString(item, ["a", "answer", "description"], ""),
  }));

  return (
    <>
      {/* ── SERVICE BANNER ─────────────────────────────────────────────── */}
      <div className="service-details-banner-wrap">
        <div className="w-layout-blockcontainer container-3 service-banner w-container">
          <div className="banner-content service-banner-content">
            <div className="section-head-content-subtitle">
              <div className="section-head-subtitle-dot" />
              <p className="section-head-subtitle-content">{bannerSubtitle}</p>
            </div>
            <h2 className="banner-title-2 service-banner-content-title">
              {bannerTitle}
            </h2>
            <p className="service-banner-content-description">
              {bannerDescription}
            </p>
            <div className="button-wrap service-banner-button">
              <Link
                href="/contact-us"
                className="button-primary w-inline-block"
              >
                <div className="text-block-12">Get in touch</div>
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
                className="button-secondary-light w-inline-block"
              >
                <div className="button-secondary-light-text">
                  Book a meeting
                </div>
                <div className="arrows-container cta">
                  <Image
                    src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/6937e4382716cdf25ad0f3d5_date-icon-light.svg"
                    alt="Icon"
                    width={16}
                    height={16}
                    className="dark-arrow _16"
                  />
                  <Image
                    src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/6937e33ae69eb8ce6ab3de51_date-icon-dark.svg"
                    alt="Icon"
                    width={16}
                    height={16}
                    className="arrow-button _16"
                  />
                </div>
              </Link>
            </div>

            <div className="service-banner-slider-wrap">
              <p className="service-banner-slider-title">{brandTitle}</p>
              <div className="service-banner-slider">
                <div className="div-block-7" />
                <div className="logos-inner">
                  {[...Array(2)].map((_, wi) => (
                    <div key={wi} className="logos-wrapper-2">
                      {(brandImages.length > 0
                        ? brandImages
                        : [
                            "69552209697458f39f276182_brand-logo-09.png",
                            "695521f2049528fded9affb5_brand-logo-07.png",
                            "695521dbd94b315853a77d52_brand-logo-06.png",
                            "695521c4f8ed10005799b610_brand-logo-05.png",
                            "695521b2d8f2354c8950b959_brand-logo-04.png",
                            "6955219ccc4fd93ce49be32e_brand-logo-03.png",
                            "69552189254a8420d72304ef_brand-logo-02.png",
                            "69552172be8c60bdacafcb8e_brand-logo-01.png",
                          ]
                      ).map((img, index) => (
                        <Image
                          key={`${wi}-${index}`}
                          alt="Marquee Image"
                          src={
                            typeof img === "string"
                              ? `https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/${img}`
                              : getImageUrl(
                                  img,
                                  "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/69552209697458f39f276182_brand-logo-09.png",
                                )
                          }
                          width={120}
                          height={40}
                          className="ui-logo-marquee"
                        />
                      ))}
                    </div>
                  ))}
                </div>
                <div className="div-block-9" />
              </div>
            </div>
          </div>

          <div className="w-layout-hflex banner-images service-banner-image-wrap">
            <Image
              src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/695229417510a7e65f18d077_banner-lines-bg.png"
              loading="lazy"
              alt=""
              width={800}
              height={600}
              className="banner-line-image"
            />
            
            <img
              src={bannerImage}
              alt="Banner-Image"
              width={600}
              height={700}
              className="image-10 service-banner-image"
            />
          </div>

          {/* Responsive slider */}
          <div className="service-banner-slider-wrap service-responsive-style">
            <p className="service-banner-slider-title">{brandTitle}</p>
            <div className="service-banner-slider">
              <div className="div-block-7" />
              <div className="logos-inner">
                {[...Array(2)].map((_, wi) => (
                  <div key={wi} className="logos-wrapper-2">
                    {(brandImages.length > 0
                      ? brandImages
                      : [
                          "690de578a40bbc5e28f07ff7_company-log-01.svg",
                          "690de578260bf9d8ad326a39_company-log-06.svg",
                          "690de5776d576c549f14a836_company-log-05.svg",
                          "690de577601a71c5dda230d2_company-log-03.svg",
                          "690dea3a770a43473b7adcfc_company-log-07.svg",
                          "690dea3ac3e4e38c07808ad9_company-log-08.svg",
                          "690de577364336678dfbafd3_company-log-02.svg",
                          "690de577aea71afed07b710b_company-log-04.svg",
                        ]
                    ).map((img, index) => (
                      <Image
                        key={`${wi}-${index}`}
                        alt="Marquee Image"
                        src={
                          typeof img === "string"
                            ? `https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/${img}`
                            : getImageUrl(
                                img,
                                "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/690de578a40bbc5e28f07ff7_company-log-01.svg",
                              )
                        }
                        width={100}
                        height={36}
                        className="ui-logo-marquee"
                      />
                    ))}
                  </div>
                ))}
              </div>
              <div className="div-block-9" />
            </div>
          </div>
        </div>
      </div>

      {/* ── APPROACH ────────────────────────────────────────────────────── */}
      <section className="section-approach">
        <div className="approach-wrap">
          <div className="award-winning-wrap">
            <div className="award-winning">
              <Image
                alt="Marquee Image"
                src="https://res.cloudinary.com/dsoilebvu/image/upload/v1777048239/rating-l_ngsvxg.svg"
                width={40}
                height={40}
                className="award-winning-shade-img"
              />
              <p className="award-winning-description">
                Delivering top-notch software solutions since 2012
              </p>
              <Image
                alt="Marquee Image"
                src="https://res.cloudinary.com/dsoilebvu/image/upload/v1777048240/rating-r_vlkuz4.svg"
                width={40}
                height={40}
                className="award-winning-shade-img"
              />
            </div>
          </div>
          <div className="approach-content-wrap">
            <div className="approach-content-subtitle">
              <div className="section-head-subtitle-dot" />
              <p className="approach-content-subtitle-content">Our Approach</p>
            </div>
            <div className="approach-content">
              <p className="approach-content-description-content">
                Off-the-shelf solutions are fine until your business needs more.
                We build custom software that aligns with your workflows and
                scales securely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE OFFER ───────────────────────────────────────────────── */}
      <div className="section we-offer-section">
        <div className="container-3 w-container">
          <div className="section-head section-head-two">
            <div className="section-head-content-subtitle">
              <div className="section-head-subtitle-dot" />
              <p className="section-head-subtitle-content subtitle-secondary-content">
                {getString(
                  service,
                  ["offerTagline", "offerSubtitle"],
                  "What we offer",
                )}
              </p>
            </div>
            <div
              id="w-node-_93788805-22ef-a1fe-12a4-2d6f1fc25549-1494fcae"
              className="title title-two"
            >
              <h2 className="title-h2 title-h2-two">
                {getString(
                  service,
                  ["offerTitle"],
                  "Driving Growth Through Tailored Technology",
                )}
              </h2>
              <p className="section-title-description">
                {getString(
                  service,
                  ["offerDescription"],
                  "Our apps are customized for your sector, addressing unique workflows, compliance needs, and user expectations.",
                )}
              </p>
            </div>
          </div>

          <ul role="list" className="our-technology-list w-list-unstyled">
            {offerDisplayItems.map((s) => (
              <li key={s.num} className="our-technology-listi-tem">
                <div className="our-technology-card">
                  <div className="technology-shade" />
                  <figure className="our-technology-list-image">
                    <Image
                      src={`https://res.cloudinary.com/dsoilebvu/image/upload/v1778074611/${s.icon}`}
                      alt="image description"
                      width={48}
                      height={48}
                      className="technology-icon"
                    />
                  </figure>
                  <div className="our-technology-list-content-wrap">
                    <div className="our-technology-list-content">
                      <p className="our-technology-list-counter">{s.num}</p>
                      <h3 className="our-technology-list-title">{s.title}</h3>
                      <div className="our-technology-list-description-wrap">
                        <p className="our-technology-list-description">
                          {s.desc}
                        </p>
                        <div className="button-wrap our-technology-list-buttons">
                          <Link
                            href="/contact-us"
                            className="title-button transition-none active-button w-inline-block no-hover"
                          >
                            <div className="button-text active-button-text">
                              Start a project
                            </div>
                            <LuMoveUpRight />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="our-technology-footer">
            <div className="section-head-content-subtitle our-technology-footer-title">
              <div className="section-head-subtitle-content-wrap">
                <div className="section-head-subtitle-dot responsive-style" />
                <p className="section-head-subtitle-content tagline">
                  Looking for something specific? Let&apos;s discuss a custom
                  solution!
                </p>
              </div>
              <Link
                href="/contact-us"
                className="title-button transition-none active-button w-inline-block no-hover"
              >
                <div className="button-text active-button-text">
                  Book a meeting
                </div>
                <LuMoveUpRight />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── WHY CHOOSE US ───────────────────────────────────────────────── */}
      <section className="section choose-us-section">
        <div className="w-layout-blockcontainer container-3 w-container">
          <div className="why-choose-us-header">
            <div className="section-head-content-subtitle">
              <div className="section-head-subtitle-dot" />
              <p className="section-head-subtitle-content subtitle-secondary-content">
                Why choose us
              </p>
            </div>
            <h2 className="title-h2 title-h2-two choose-us choose-us-two-title">
              {getString(
                chooseUs,
                ["title", "chooseUsTitle", "heading"],
                "Partner With Us for Custom Software Development",
              )}
            </h2>
          </div>
          <div className="choose-us-content">
            {chooseUsDisplayItems.map((w) => (
              <div key={w.title} className="choose-us-item">
                <Image
                  src={w.icon}
                  loading="lazy"
                  alt={w.alt}
                  width={48}
                  height={48}
                  className="choose-us-icon"
                />
                <div className="choose-us-item-content">
                  <h3 className="choose-us-title">{w.title}</h3>
                  <p className="choose-us-description">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR IMPACT ──────────────────────────────────────────────────── */}
      <section className="our-impact">
        <div className="w-layout-blockcontainer container-3 w-container">
          <div className="section-head section-head-two">
            <div className="section-head-content-subtitle subtitle-primary-content">
              <div className="section-head-subtitle-dot" />
              <p className="section-head-subtitle-content subtitle-primary-content">
                Impact that speaks for Itself
              </p>
            </div>
            <div
              id="w-node-_91e32355-7776-50bb-abb0-7dd1d2bcce8f-d2bcce88"
              className="title title-two"
            >
              <h2 className="title-h2 title-h2-two why-choose-us-title-h2">
                From Concept to Industry Impact, We Build World Class
                Experiences
              </h2>
              <div className="button-wrap service-banner-button none">
                <Link
                  href="/contact-us"
                  className="button-primary-dark w-inline-block"
                >
                  <div className="text-block-12">Get in touch</div>
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
                  className="button-secondary-dark w-inline-block"
                >
                  <div className="button-secondary-dark-text">
                    Book a meeting
                  </div>
                  <div className="arrows-container cta">
                    <Image
                      src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/6937e4382716cdf25ad0f3d5_date-icon-light.svg"
                      alt="Icon"
                      width={16}
                      height={16}
                      className="arrow-button _16"
                    />
                    <Image
                      src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/6937e33ae69eb8ce6ab3de51_date-icon-dark.svg"
                      alt="Icon"
                      width={16}
                      height={16}
                      className="dark-arrow _16"
                    />
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <ul role="list" className="quality-stats-list-two">
            {[
              {
                label: "Years of experience",
                target: 10,
                suffix: "+",
                desc: "Years of experience building custom software solutions.",
              },
              {
                label: "Client retention rate",
                target: 98,
                suffix: "%",
                desc: "Client retention rate, & longterm partnerships built on trust.",
              },
              {
                label: "Projects delivered",
                target: 300,
                suffix: "+",
                desc: "Projects delivered successfully across various industries.",
              },
              {
                label: "Users worldwide",
                target: 50,
                suffix: "M+",
                desc: "Empowering 50M+ users with seamless digital experiences",
              },
            ].map((s, i) => (
              <li key={s.label} className="quality-stats-item-two">
                <div
                  className={`quality-stats-card-two${i === 3 ? " last-item" : ""}`}
                >
                  <p className="quality-stats-card-title-two">{s.label}</p>
                  <p className="quality-stats-card-counter">
                    <span
                      data-suffix={s.suffix}
                      data-target={String(s.target)}
                      className="amt-counter amt-counter-two"
                    >
                      {s.target}
                      {s.suffix}
                    </span>
                  </p>
                  <p className="quality-stats-card-info-two">{s.desc}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="button-wrap service-banner-button v2">
            <Link
              href="/contact-us"
              className="button-primary-dark button-primary-dark-responsive w-inline-block"
            >
              <div className="text-block-12 text-block-12-responsive">
                Start a project
              </div>
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
              className="button-secondary-dark button-secondary-dark-responsive w-inline-block no-hover"
            >
              <div className="button-secondary-dark-text button-secondary-dark-text-responsive">
                Book a meeting
              </div>
              <div className="arrows-container cta">
                <Image
                  src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/6937e4382716cdf25ad0f3d5_date-icon-light.svg"
                  alt="Icon"
                  width={16}
                  height={16}
                  className="arrow-button _16 v2"
                />
                <Image
                  src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/6937e33ae69eb8ce6ab3de51_date-icon-dark.svg"
                  alt="Icon"
                  width={16}
                  height={16}
                  className="dark-arrow _16"
                />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ───────────────────────────────────────────────────── */}
      <section className="section portfolio-section">
        <div className="w-layout-blockcontainer container-3 w-container">
          <div className="protfolio-header">
            <div className="section-head-content-subtitle">
              <div className="section-head-subtitle-dot" />
              <p className="section-head-subtitle-content subtitle-secondary-content">
                {getString(
                  selectedWork,
                  ["subtitle", "tagline"],
                  "Selected works ( 2024 - 2025 )",
                )}
              </p>
            </div>
            <h2 className="title-h2 title-h2-two portfolio">
              {getString(
                selectedWork,
                ["title", "selectedWorkTitle", "heading"],
                "Empowering businesses worldwide with measurable results",
              )}
            </h2>
          </div>

          <div className="portfolio-case-studies">
            {/* Lernen – full width */}
            <div className="portfolio-case-study-item full-width">
              <div className="portfolio-case-study-figure">
                <Image
                  src={selectedWorksDisplay[0].image}
                  loading="lazy"
                  alt="Portfolio Case Study Image"
                  width={800}
                  height={500}
                  className="portfolio-case-study-image v2"
                />
                <Link
                  href="/contact-us"
                  className="button-primary-dark portfolio-primary-btn responsive w-inline-block"
                >
                  <div className="text-block-12">Read case study</div>
                  <Image
                    alt="arrow-top-right"
                    src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/68dd105094d90e0a289e4185_arrow-top-right-white.svg"
                    width={16}
                    height={16}
                    className="button-icon"
                  />
                </Link>
              </div>
              <div className="portfolio-case-study-content v2">
                <div className="portfolio-case-study-content-head">
                  <h3 className="portfolio-case-study-title">
                    {selectedWorksDisplay[0].title}
                  </h3>
                  <p className="portfolio-case-study-sub-title">
                    {selectedWorksDisplay[0].description}
                  </p>
                </div>
                <div className="portfolio-case-study-content-footer">
                  <div className="portfolio-stat-card">
                    <p className="portfolio-stat-card-title">
                      <strong className="bold-text-4">Our Impact</strong>
                    </p>
                    <p className="portfolio-stat-card-info">
                      <span
                        data-suffix={selectedWorksDisplay[0].impactSuffix}
                        data-target={String(
                          selectedWorksDisplay[0].impactNumber,
                        )}
                        className="amt-counter amt-counter-two portfolio"
                      >
                        {selectedWorksDisplay[0].impactNumber}
                        {selectedWorksDisplay[0].impactSuffix}
                      </span>
                      {selectedWorksDisplay[0].impact}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Workreap + Doctreat */}
            <div
              id="w-node-b0faa46a-4a6e-54fb-bafc-3a1a241d348d-1494fcae"
              className="portfolio-case-study-item v2"
            >
              <div className="portfolio-case-study-sub-item">
                <div className="portfolio-case-study-figure">
                  <Image
                    src={selectedWorksDisplay[1].image}
                    loading="lazy"
                    alt="Portfolio Case Study Image"
                    width={600}
                    height={400}
                    className="portfolio-case-study-image"
                  />
                  <Link
                    href="/contact-us"
                    className="button-primary-dark portfolio-primary-btn responsive w-inline-block"
                  >
                    <div className="text-block-12">Read case study</div>
                    <Image
                      alt="arrow-top-right"
                      src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/68dd105094d90e0a289e4185_arrow-top-right-white.svg"
                      width={16}
                      height={16}
                      className="button-icon"
                    />
                  </Link>
                </div>
                <div className="portfolio-case-study-content">
                  <div className="portfolio-case-study-content-head">
                    <h3 className="portfolio-case-study-title">
                      {selectedWorksDisplay[1].title}
                    </h3>
                    <p className="section-head-subtitle-content portfolio">
                      {selectedWorksDisplay[1].description}
                    </p>
                  </div>
                  <div className="portfolio-case-study-content-footer">
                    <div className="portfolio-stat-card">
                      <p className="portfolio-stat-card-title">Our Impact</p>
                      <p className="portfolio-stat-card-info">
                        <span
                          data-suffix={selectedWorksDisplay[1].impactSuffix}
                          data-target={String(
                            selectedWorksDisplay[1].impactNumber,
                          )}
                          className="amt-counter amt-counter-two portfolio"
                        >
                          {selectedWorksDisplay[1].impactNumber}
                          {selectedWorksDisplay[1].impactSuffix}
                        </span>
                        {selectedWorksDisplay[1].impact}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="portfolio-case-study-sub-item">
                <div className="portfolio-case-study-figure">
                  <Image
                    src={selectedWorksDisplay[2].image}
                    loading="lazy"
                    alt="Portfolio Case Study Image"
                    width={600}
                    height={400}
                    className="portfolio-case-study-image"
                  />
                  <Link
                    href="/contact-us"
                    className="button-primary-dark portfolio-primary-btn responsive w-inline-block"
                  >
                    <div className="text-block-12">Read case study</div>
                    <Image
                      alt="arrow-top-right"
                      src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/68dd105094d90e0a289e4185_arrow-top-right-white.svg"
                      width={16}
                      height={16}
                      className="button-icon"
                    />
                  </Link>
                </div>
                <div className="portfolio-case-study-content">
                  <div className="portfolio-case-study-content-head">
                    <h3 className="portfolio-case-study-title">
                      {selectedWorksDisplay[2].title}
                    </h3>
                    <p className="section-head-subtitle-content portfolio">
                      {selectedWorksDisplay[2].description}
                    </p>
                  </div>
                  <div className="portfolio-case-study-content-footer">
                    <div className="portfolio-stat-card">
                      <p className="portfolio-stat-card-title">Our Impact</p>
                      <p className="portfolio-stat-card-info">
                        <span
                          data-suffix={selectedWorksDisplay[2].impactSuffix}
                          data-target={String(
                            selectedWorksDisplay[2].impactNumber,
                          )}
                          className="amt-counter amt-counter-two portfolio"
                        >
                          {selectedWorksDisplay[2].impactNumber}
                          {selectedWorksDisplay[2].impactSuffix}
                        </span>
                        {selectedWorksDisplay[2].impact}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Portfolio CTA */}
          <div className="portfolio-cta">
            <div className="portfolio-cta-content-wrap">
              <h3 className="portfolio-cta-content-title">
                Looking for something similar? We&apos;re always excited about
                starting a new project.
              </h3>
              <div className="button-wrap portfolio-cta-button-wrap">
                <Link
                  href="/contact-us"
                  className="button-primary-dark w-inline-block"
                >
                  <div className="text-block-12">Start a project</div>
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
                  className="button-secondary-dark w-inline-block"
                >
                  <div className="button-secondary-dark-text">
                    Book a meeting
                  </div>
                  <div className="arrows-container cta">
                    <Image
                      src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/6937e4382716cdf25ad0f3d5_date-icon-light.svg"
                      alt="Icon"
                      width={16}
                      height={16}
                      className="arrow-button _16"
                    />
                    <Image
                      src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/6937e33ae69eb8ce6ab3de51_date-icon-dark.svg"
                      alt="Icon"
                      width={16}
                      height={16}
                      className="dark-arrow _16"
                    />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS + TESTIMONIALS ──────────────────────────────────────── */}
      <section className="section process-section">
        <div className="w-layout-blockcontainer container-3 process-container w-container">
          <div className="protfolio-header responsive-style">
            <div className="section-head-content-subtitle subtitle-primary-content">
              <div className="section-head-subtitle-dot" />
              <p className="section-head-subtitle-content subtitle-primary-content">
                Our process
              </p>
            </div>
            <h2 className="title-h2 title-h2-two process-title">
              {getString(
                ourProcess,
                ["title", "ourProcessTitle", "heading"],
                "Our Transparent Process for Developing Custom Software",
              )}
            </h2>
          </div>

          <div className="process-cycle-wrapper">
            {processDisplayItems.map((p) => (
              <div key={p.num} className="process-cycle-items">
                <div className="process-cycle-number">{p.num}</div>
                <div className="process-cycle-content">
                  <div className="process-cycle-title">{p.title}</div>
                  <p className="process-cycle-description">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonials – Webflow slider, JS initialised by webflow.js in layout */}
          <div className="testimonial-slider-wrapper">
            <div
              data-delay="4000"
              data-animation="slide"
              className="testimonial-slider w-slider"
              data-autoplay="false"
              data-easing="ease"
              data-hide-arrows="true"
              data-disable-swipe="false"
              data-autoplay-limit="0"
              data-nav-spacing="3"
              data-duration="500"
              data-infinite="true"
            >
              <div className="w-slider-mask">
                {testimonialDisplayItems.map((t) => (
                  <div key={t.name} className="w-slide">
                    <div className="div-block-17">
                      <div className="rating-wrapper">
                        {[...Array(5)].map((_, i) => (
                          <Image
                            key={i}
                            src="https://res.cloudinary.com/dsoilebvu/image/upload/v1777057659/star_o6pixh.svg"
                            loading="lazy"
                            alt="star-svg"
                            width={16}
                            height={16}
                            className="testimonial-rating"
                          />
                        ))}
                      </div>
                      <p className="testimonial-description">{t.text}</p>
                      <div className="testimonial-profile-content">
                        <Image
                          src={t.image}
                          loading="lazy"
                          alt="Client Profile Image"
                          width={48}
                          height={48}
                          className="testimonial-profile-img"
                        />
                        <div className="testimonial-user-info">
                          <h5 className="testimonial-user-name">{t.name}</h5>
                          <div className="testimonial-user-designation">
                            {t.role}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="left-arrow-2 w-slider-arrow-left">
                <div className="icon-2 w-icon-slider-left" />
              </div>
              <div className="right-arrow w-slider-arrow-right">
                <div className="icon-3 w-icon-slider-right" />
              </div>
              <div className="testimonial-slider-nav w-slider-nav w-round" />
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT SECTION ─────────────────────────────────────────────── */}
      <ContactSection />

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <div className="section">
        <div className="container-3 w-container">
          <div className="faq-section-wrap">
            <div className="section-head section-head-two faq-head">
              <div className="section-head-content-subtitle">
                <div className="section-head-subtitle-dot" />
                <p className="section-head-subtitle-content subtitle-secondary-content">
                  Frequently asked questions
                </p>
              </div>
              <div
                id="w-node-d329edd4-9e27-731a-dad8-b3b5b4765177-1494fcae"
                className="title title-two faq-title"
              >
                <h2 className="title-h2 title-h2-two">
                  {getString(
                    faq,
                    ["title", "faqTitle", "heading"],
                    "Get All Your Questions Answered Here!",
                  )}
                </h2>
                <p className="section-title-description service-faq-description">
                  {getString(
                    faq,
                    ["description", "faqDescription"],
                    "If you have other questions or want to know anything else feel free to reach out at:",
                  )}{" "}
                  <a
                    href="mailto:sales@greaterworks.tech"
                    className="faq-heading-description-link"
                  >
                    sales@greaterworks.tech
                  </a>
                </p>
              </div>
            </div>

            <ServiceFaqAccordion items={faqDisplayItems} />
          </div>
        </div>
      </div>
      <style>{`
        .button-secondary-light.no-hover:hover {
          transform: none !important;
          background-color: #e6e6e6 !important;
          border-color: #cfcfcf !important;
          box-shadow: none !important;
        }
        .button-secondary-light.no-hover:hover .button-secondary-light-text {
          color: var(--secondary) !important;
        }

        .title-button.transition-none.active-button.no-hover:hover {
          background-color: transparent !important;
          background-image: none !important;
          color: inherit !important;
        }
        .title-button.transition-none.active-button.no-hover:hover .active-button-text {
          color: var(--primary) !important;
        }
        .title-button.transition-none.active-button.no-hover:hover svg {
          color: var(--primary) !important;
        }

        .button-secondary-dark.no-hover:hover {
          background-color: #fcfcfc1a !important;
          border-color: #fcfcfc1a !important;
          transform: none !important;
          box-shadow: none !important;
        }
        .button-secondary-dark.no-hover:hover .button-secondary-dark-text {
          color: #fcfcfc !important;
        }
        .button-secondary-dark.no-hover:hover .arrow-button._16 {
          opacity: 1 !important;
        }
        .button-secondary-dark.no-hover:hover .dark-arrow._16 {
          opacity: 0 !important;
        }
      `}</style>
    </>
  );
}
