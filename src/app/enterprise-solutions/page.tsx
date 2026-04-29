import ContactSection from "@/component/ContactSection";
import ImpactSection from "@/component/ImpactSection";
import { ServiceFaqAccordion } from "@/component/ServiceFaqAccordion";
import Image from "next/image";
import Link from "next/link";

const CDN = "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026";

export default function MobileAppDevelopmentPage() {
  return (
    <>
      {/* ── SERVICE BANNER ─────────────────────────────────────────────── */}
      <div className="service-details-banner-wrap">
        <div className="w-layout-blockcontainer container-3 service-banner w-container">
          <div className="banner-content service-banner-content">
            <div className="section-head-content-subtitle">
              <div className="section-head-subtitle-dot" />
              <p className="section-head-subtitle-content">Booking for Q1 2026</p>
            </div>
            <h2 className="banner-title-2 service-banner-content-title">
              Enterprise Solutions to Optimise Your Business Operations
            </h2>
            <p className="service-banner-content-description">
             We build scalable, secure, and fully integrated systems that streamline processes, reduce operational bottlenecks, and empower your teams to work smarter.
            </p>
            <div className="button-wrap service-banner-button">
              <Link href="/contact-us" className="button-primary w-inline-block">
                <div className="text-block-12">Get in touch</div>
                <Image
                  alt="arrow-top-right"
                  src={`${CDN}/68dd105094d90e0a289e4185_arrow-top-right-white.svg`}
                  width={16}
                  height={16}
                  className="button-icon"
                />
              </Link>
              <Link href="/contact-us" className="button-secondary-light w-inline-block">
                <div className="button-secondary-light-text">Book a meeting</div>
                <div className="arrows-container cta">
                  <Image
                    src={`${CDN}/6937e4382716cdf25ad0f3d5_date-icon-light.svg`}
                    alt="Icon"
                    width={16}
                    height={16}
                    className="dark-arrow _16"
                  />
                  <Image
                    src={`${CDN}/6937e33ae69eb8ce6ab3de51_date-icon-dark.svg`}
                    alt="Icon"
                    width={16}
                    height={16}
                    className="arrow-button _16"
                  />
                </div>
              </Link>
            </div>

            <div className="service-banner-slider-wrap">
              <p className="service-banner-slider-title">Trusted by 500+ happy clients worldwide.</p>
              <div className="service-banner-slider">
                <div className="div-block-7" />
                <div className="logos-inner">
                  {[...Array(2)].map((_, wi) => (
                    <div key={wi} className="logos-wrapper-2">
                      {[
                        "69552209697458f39f276182_brand-logo-09.png",
                        "695521f2049528fded9affb5_brand-logo-07.png",
                        "695521dbd94b315853a77d52_brand-logo-06.png",
                        "695521c4f8ed10005799b610_brand-logo-05.png",
                        "695521b2d8f2354c8950b959_brand-logo-04.png",
                        "6955219ccc4fd93ce49be32e_brand-logo-03.png",
                        "69552189254a8420d72304ef_brand-logo-02.png",
                        "69552172be8c60bdacafcb8e_brand-logo-01.png",
                      ].map((img) => (
                        <Image
                          key={img}
                          alt="Marquee Image"
                          src={`${CDN}/${img}`}
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
              src={`${CDN}/695229417510a7e65f18d077_banner-lines-bg.png`}
              loading="lazy"
              alt="linr-bar-img"
              width={800}
              height={600}
              className="banner-line-image"
            />
            <Image
              src={`${CDN}/69562e8e1649a35ec5e91f45_mobile-app-banner-img.png`}
              alt="Banner-Image"
              width={600}
              height={700}
              className="image-10 service-banner-image"
            />
          </div>

          {/* Responsive slider */}
          <div className="service-banner-slider-wrap service-responsive-style">
            <p className="service-banner-slider-title">Trusted by 500+ happy clients worldwide.</p>
            <div className="service-banner-slider">
              <div className="div-block-7" />
              <div className="logos-inner">
                {[...Array(2)].map((_, wi) => (
                  <div key={wi} className="logos-wrapper-2">
                    {[
                      "690de578a40bbc5e28f07ff7_company-log-01.svg",
                      "690de578260bf9d8ad326a39_company-log-06.svg",
                      "690de5776d576c549f14a836_company-log-05.svg",
                      "690de577601a71c5dda230d2_company-log-03.svg",
                      "690dea3a770a43473b7adcfc_company-log-07.svg",
                      "690dea3ac3e4e38c07808ad9_company-log-08.svg",
                      "690de577364336678dfbafd3_company-log-02.svg",
                      "690de577aea71afed07b710b_company-log-04.svg",
                    ].map((img) => (
                      <Image
                        key={img}
                        alt="Marquee Image"
                        src={`${CDN}/${img}`}
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
                src={`${CDN}/6937d7440f57acbe2b3fb811_award-shade.svg`}
                width={40}
                height={40}
                className="award-winning-shade-img"
              />
              <p className="award-winning-description">
                Delivering top-notch software solutions since 2012
              </p>
              <Image
                alt="Marquee Image"
                src={`${CDN}/6937d852b619fec95dcec38d_award-shade-right.svg`}
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
                Greater Works Technologies delivers enterprise software that transforms operations, enhances scalability, and secures your data.
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
                What we offer
              </p>
            </div>
            <div
              id="w-node-_93788805-22ef-a1fe-12a4-2d6f1fc25549-6dea9209"
              className="title title-two"
            >
              <h2 className="title-h2 title-h2-two our-app-title">
               Enterprise Solutions That Deliver Measurable Results
              </h2>
              <p className="section-title-description">
                Our mobile app solutions are built around your specific industry, guaranteeing a
                match for your workflow, regulations, and user expectations.
              </p>
            </div>
          </div>

          <ul role="list" className="our-technology-list w-list-unstyled">
            {[
              {
                num: "S / 001",
                icon: "69567e155eaa5f8c9854daf3_Mobile-service-card-01.svg",
                title: "Enterprise Resource Planning (ERP) Systems",
                desc: "Centralized ERP systems streamlining operations, finance, supply chain, and decision-making across your organization",
              },
              {
                num: "S / 002",
                icon: "69567e1500edc02978a81b0f_Mobile-service-card-02.svg",
                title: "Customer Relationship Management Solutions",
                desc: "CRM platforms to manage leads, customers, sales pipelines, and long-term client relationships effectively.",
              },
              {
                num: "S / 003",
                icon: "69562ff469e9daf9f20bb00e_cross-platform-icon.png",
                title: "Custom Workflow Automation Platforms",
                desc: "Automate internal processes to reduce manual work, errors, and operational delays at scale.",
              },
              {
                num: "S / 004",
                icon: "695630b97d4a0e93dab04e5e_ai-technology-icon.png",
                title: "Intranet & Employee Portals",
                desc: "Secure internal portals enabling communication, collaboration, document access, and employee self-service.",
              },
              {
                num: "S / 005",
                icon: "69567e151fd4da55fde4cc11_Mobile-service-card-05.svg",
                title: "Data Analytics,BI Dashboards & Reporting Systems",
                desc: "Real-time dashboards transforming complex data into clear insights for faster, smarter decisions.",
              },
              {
                num: "S / 006",
                icon: "69566d029643f586cf9f0265_d-service-card-06.svg",
                title: "Legacy System Modernization",
                desc: "Upgrade outdated systems into modern, scalable platforms without disrupting business operations.",
              },
            ].map((s) => (
              <li key={s.num} className="our-technology-listi-tem">
                <div className="our-technology-card">
                  <div className="technology-shade" />
                  <figure className="our-technology-list-image">
                    <Image
                      src={`${CDN}/${s.icon}`}
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
                        <p className="our-technology-list-description">{s.desc}</p>
                        <div className="button-wrap our-technology-list-buttons">
                          <Link
                            href="/contact-us"
                            className="title-button transition-none active-button w-inline-block"
                          >
                            <div className="button-text active-button-text">Start a project</div>
                            <div className="arrows-container cta">
                              <Image
                                src={`${CDN}/68dd0ede1e60a7db30b19932_arrow-top-right.svg`}
                                alt="icon"
                                width={16}
                                height={16}
                                className="dark-arrow _16 active-button-arrow"
                              />
                              <Image
                                src={`${CDN}/68dbd9d8c78e82683455072e_arrow-top-right.svg`}
                                alt="icon"
                                width={16}
                                height={16}
                                className="arrow-button _16 active-button-arrow-two"
                              />
                            </div>
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
                  Looking for something specific? Let&apos;s discuss a custom solution!
                </p>
              </div>
              <Link
                href="/contact-us"
                className="title-button transition-none active-button w-inline-block"
              >
                <div className="button-text active-button-text">Book a meeting</div>
                <div className="arrows-container cta tagline-button-icon">
                  <Image
                    src={`${CDN}/68dd0ede1e60a7db30b19932_arrow-top-right.svg`}
                    alt="icon"
                    width={16}
                    height={16}
                    className="dark-arrow _16 active-button-arrow"
                  />
                  <Image
                    src={`${CDN}/68dbd9d8c78e82683455072e_arrow-top-right.svg`}
                    alt="icon"
                    width={16}
                    height={16}
                    className="arrow-button _16 active-button-arrow-two"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* ── OUR IMPACT ──────────────────────────────────────────────────── */}
      <ImpactSection />

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
            <h2 className="title-h2 title-h2-two choose-us choose-us-two-title-two">
              Partner With Us for Mobile App Development
            </h2>
          </div>
          <div className="choose-us-content">
            {[
              {
                icon: "69567b82006c105bfc41926e_w-choose-us-img-05.svg",
                alt: "Octagon Icon",
                title: "Full IP Ownership",
                desc: "You retain full rights to your code, product, and IP complete control, always.",
              },
              {
                icon: "69567b827695f581f7b31b50_w-choose-us-img-03.svg",
                alt: "Quality-standard-icon",
                title: "Agile Collaboration",
                desc: "Transparent communication, and iterative development keep you involved at every stage.",
              },
              {
                icon: "69567b82049528fdedba9c45_w-choose-us-img-02.svg",
                alt: "Globe",
                title: "Quality Engineering",
                desc: "Secure, scalable, high-performance apps built to meet user expectations and enterprise standards.",
              },
              {
                icon: "695632a1744dc836e5123af3_mentoring.png",
                alt: "communication-icon",
                title: "Design-Led Approach",
                desc: "Screens and interactions crafted for usability, and engaging user experiences.",
              },
              {
                icon: "69566d029643f586cf9f0265_d-service-card-06.svg",
                alt: "business-icon",
                title: "Dedicated Support",
                desc: "Post-launch updates, and feature enhancements ensure your app grows successfully over time.",
              },
              {
                icon: "695632c6d77988747920302e_continuous-icon.png",
                alt: "settings-icon",
                title: "Continuous Optimization",
                desc: "Post-deployment monitoring, retraining, and fine-tuning for lasting performance.",
              },
            ].map((w) => (
              <div key={w.title} className="choose-us-item">
                <Image
                  src={`${CDN}/${w.icon}`}
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



      {/* ── PORTFOLIO ───────────────────────────────────────────────────── */}


      {/* ── PROCESS + TESTIMONIALS ──────────────────────────────────────── */}
      <section className="section process-section">
        <div className="w-layout-blockcontainer container-3 process-container w-container">
          <div className="protfolio-header responsive-style">
            <div className="section-head-content-subtitle subtitle-primary-content">
              <div className="section-head-subtitle-dot" />
              <p className="section-head-subtitle-content subtitle-primary-content">Our process</p>
            </div>
            <h2 className="title-h2 title-h2-two process-title">
              How We Build Powerful Mobile Applications
            </h2>
          </div>

          <div className="process-cycle-wrapper">
            {[
              {
                num: "01.",
                title: "Discovery & Planning",
                desc: "Align goals, users, and success metrics into a clear, prioritized roadmap guiding every decision.",
              },
              {
                num: "02.",
                title: "Design & Prototyping",
                desc: "User-first interfaces and tested prototypes focused on clarity, accessibility, and real-world conversion.",
              },
              {
                num: "03.",
                title: "Agile Development & QA",
                desc: "Iterative sprints with continuous testing ensure stable, secure, high-performing software.",
              },
              {
                num: "04.",
                title: "Launch, Support & Growth",
                desc: "Smooth deployment, monitoring, and ongoing improvements keep your product evolving with users.",
              },
            ].map((p) => (
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
                {[
                  {
                    name: "Raustyle",
                    role: "Envato Customer",
                    text: "The most extensive and well-designed theme of this type that I've seen available. Constantly updated, great support, feature requests added to the theme and constantly getting better. Really hope it keeps improving and evolving for a long time. Great work!",
                  },
                  {
                    name: "paulthinkgrow",
                    role: "Envato Customer",
                    text: "Very GREAT customer support. I am blown away. Great price for the template and very beautiful. I contacted support for something I thought was impossible and they were so kind and helped me without any hesitation. Thank you so much.",
                  },
                  {
                    name: "BuxRecord",
                    role: "Envato Customer",
                    text: "Great job. I have use many other freelancers script theme, fiverr clone script and theme since years, and no one like this in design, and features. So i decide to remove previous script from my domain and install workreap. Now i am happy. Thanks for your support too",
                  },
                ].map((t) => (
                  <div key={t.name} className="w-slide">
                    <div className="div-block-17">
                      <div className="rating-wrapper">
                        {[...Array(5)].map((_, i) => (
                          <Image
                            key={i}
                            src={`${CDN}/693ff758fbcd58bad0d563bc_star.svg`}
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
                          src={`${CDN}/6953e25f2b41648999029475_Avatar.svg`}
                          loading="lazy"
                          alt="Client Profile Image"
                          width={48}
                          height={48}
                          className="testimonial-profile-img"
                        />
                        <div className="testimonial-user-info">
                          <h3 className="testimonial-user-name">{t.name}</h3>
                          <div className="testimonial-user-designation">{t.role}</div>
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
                id="w-node-d329edd4-9e27-731a-dad8-b3b5b4765177-6dea9209"
                className="title title-two faq-title"
              >
                <h2 className="title-h2 title-h2-two">Get All Your Questions Answered Here!</h2>
                <p className="section-title-description service-faq-description">
                  If you have other questions or want to know anything else feel free to reach out
                  at:{" "}
                  <a href="mailto:sales@greaterworks.tech" className="faq-heading-description-link">
                    sales@greaterworks.tech
                  </a>
                </p>
              </div>
            </div>

            <ServiceFaqAccordion
              cdnBase={CDN}
              items={[
                {
                  q: "Do you build apps for both iOS and Android?",
                  a: "Yes, we develop for both platforms, natively or through cross-platform frameworks.",
                },
                {
                  q: "Can you integrate third-party APIs or legacy systems?",
                  a: "Absolutely. Our team specializes in seamless integrations and system modernization.",
                },
                {
                  q: "What is the typical cost and timeline for a mobile app?",
                  a: "It depends on complexity and scope — we provide a tailored estimate after discovery.",
                },
                {
                  q: "Do you handle publishing to app stores?",
                  a: "Yes, we manage testing, submission, and deployment for both the App Store and Play Store.",
                },
                {
                  q: "Do you offer maintenance and post-launch support?",
                  a: "Yes, ongoing monitoring, updates, and scaling support are part of every engagement.",
                },
              ]}
            />
          </div>
        </div>
      </div>

      {/* ── CTA SECTION ─────────────────────────────────────────────────── */}
      <div className="section section-bg cta-section">
        <div className="container-3 w-container">
          <div
            id="w-node-_013008c0-fd1a-1dd3-788c-0a0474a3a8e1-6dea9209"
            className="title center-title-2 cta-title-wrap"
          >
            <div className="call-to-action-tag-wrap">
              <Image
                src={`${CDN}/691c33cdf7bd671c4f9ffdfc_call-to-action.svg`}
                alt="image"
                width={24}
                height={24}
                className="call-to-action-tag-img"
              />
              <p className="call-to-action-tag call-to-action-tag-two">Pull the Trigger!</p>
            </div>
            <h2 className="title-h2 center-title-h2-2">
              Let&apos;s Shape the Future of{" "}
              <span className="text-span-19">Your Web Application</span>
            </h2>
            <p className="paragraph-large center-title-description">
              Your vision deserves more than code, it deserves a partner who understands growth,
              scalability, and long-term value.
            </p>
          </div>
          <div className="button-wrap cta-buttons">
            <Link href="/contact-us" className="button-primary w-inline-block">
              <div className="text-block-12">Start Your Web App Journey</div>
              <Image
                alt="arrow-top-right"
                src={`${CDN}/68dd105094d90e0a289e4185_arrow-top-right-white.svg`}
                width={16}
                height={16}
                className="button-icon"
              />
            </Link>
            <Link href="/contact-us" className="title-button transition-none w-inline-block">
              <div className="button-text">Talk to Our Experts</div>
              <div className="arrows-container cta">
                <Image
                  src={`${CDN}/68dd0ede1e60a7db30b19932_arrow-top-right.svg`}
                  alt="Icon"
                  width={16}
                  height={16}
                  className="dark-arrow _16"
                />
                <Image
                  src={`${CDN}/68dbd9d8c78e82683455072e_arrow-top-right.svg`}
                  alt="Icon"
                  width={16}
                  height={16}
                  className="arrow-button _16"
                />
              </div>
            </Link>
          </div>
        </div>
        <figure className="figure-6 service-banner-bg-1">
          <Image
            src={`${CDN}/691b1e5bb78f2cc930ef1e56_bg-img-01.png`}
            alt="Banner BG"
            width={1000}
            height={600}
          />
        </figure>
      </div>
    </>
  );
}