import ContactSection from "@/component/ContactSection";
import ImpactSection from "@/component/ImpactSection";
import { ServiceFaqAccordion } from "@/component/ServiceFaqAccordion";
import Image from "next/image";
import Link from "next/link";

const CDN = "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026";
const CDN1 = "https://res.cloudinary.com/dsoilebvu/image/upload/v1778074604";

const qaServices = [
  {
    num: "S / 001",
    icon: "69565d4fb25c83fd6c44cc5e_choose-us-icon-06_1_l97vth.svg",
    title: "Manual Testing",
    desc: "Expert human feedback ensures a user-friendly design and optimal usability.",
  },
  {
    num: "S / 002",
    icon: "69567ca9c55d1fbc25f25ff8_m-service-card-02_1_wziwfc.svg",
    title: "Automation Testing",
    desc: "Automated CI/CD pipelines enable faster, more reliable software release cycles.",
  },
  {
    num: "S / 003",
    icon: "6956718eb13e5f18c934b25d_q-service-card-img-02_1_ar2mrb.svg",
    title: "Performance & Load Testing",
    desc: "Robust testing ensures your product remains performant under increasing user load.",
  },
  {
    num: "S / 004",
    icon: "69567cbe0dcd01b4b10faea0_m-service-card-03_1_iuflmd.svg",
    title: "API Testing",
    desc: "Rigorous API testing guarantees seamless and error-free system communication always.",
  },
  {
    num: "S / 005",
    icon: "69567c9a2c612e8ca6f24b8f_m-service-card-01_1_zjo3xx.svg",
    title: "Functional Testing",
    desc: "Comprehensive testing confirms every feature delivers the intended user experience.",
  },
  {
    num: "S / 006",
    icon: "69566d029643f586cf9f0265_d-service-card-06_4_lnqdyd.svg",
    title: "Security Testing",
    desc: "Advanced security protocols protect your data and infrastructure from cyber threats.",
  },
];

const whyChooseUs = [
  {
    icon: "6956795c5eaa5f8c9854795e_q-choose-us-img-01.svg",
    title: "Experienced QA Engineers",
    desc: "Dedicated QA engineers with proven expertise across multiple industries.",
  },
  {
    icon: "6956795cc329e420ceeece35_q-choose-us-img-02.svg",
    title: "DevOps-Integrated Testing",
    desc: "Early DevOps integration enabling faster, smoother, and more reliable releases.",
  },
  {
    icon: "6956795c442124017de1f80c_q-choose-us-img-03.svg",
    title: "Scalable QA Teams",
    desc: "Scalable QA teams supporting agile startups and large enterprise projects.",
  },
  {
    icon: "6956795c0dcd01b4b10f3ebc_q-choose-us-img-04.svg",
    title: "Transparent Reporting & Insights",
    desc: "Clear test reports with transparent metrics and real-time quality insights.",
  },
  {
    icon: "6956795cefff705e95398b21_q-choose-us-img-05.svg",
    title: "Continuous Quality Improvement",
    desc: "Continuous improvement focused on long-term stability and product excellence.",
  },
  {
    icon: "6956795c71f029ddccc74c2f_q-choose-us-img-06.svg",
    title: "Risk-Focused Testing Approach",
    desc: "Proactively identify critical risks early to prevent costly defects and delays.",
  },
];

export default function QualityAssuranceTestingPage() {
  return (
    <>
      <div className="service-details-banner-wrap">
        <div className="w-layout-blockcontainer container-3 service-banner w-container">
          <div className="banner-content service-banner-content">
            <div className="section-head-content-subtitle">
              <div className="section-head-subtitle-dot" />
              <p className="section-head-subtitle-content">Booking for Q1 2026</p>
            </div>
            <h2 className="banner-title-2 service-banner-content-title">
              Ensuring Flawless Performance Through Expert QA &amp; Testing
            </h2>
            <p className="service-banner-content-description">
              Delivering software isn&apos;t just about building features, it&apos;s about flawless
              user experiences. We ensure every line of code performs perfectly.
            </p>
            <div className="button-wrap service-banner-button">
              <Link href="/contact-us" className="button-primary w-inline-block">
                <div className="text-block-12">Get in touch</div>
                <Image
                  alt="arrow-top-right"
                  src={`https://res.cloudinary.com/dsoilebvu/image/upload/v1778080440/68dd105094d90e0a289e4185_arrow-top-right-white_2_m9d15r.svg`}
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
          </div>

          <div className="w-layout-hflex banner-images service-banner-image-wrap">
            <Image
              src={`${CDN}/695229417510a7e65f18d077_banner-lines-bg.png`}
              loading="lazy"
              alt="banner background lines"
              width={900}
              height={700}
              className="banner-line-image"
            />
            <Image
              src={`${CDN}/6957636894209566fde707b6_quality-assurance-banner-img.png`}
              alt="QA service banner"
              width={620}
              height={760}
              className="image-10 service-banner-image qa-page"
            />
          </div>
        </div>
      </div>

      <section className="section-approach">
        <div className="approach-wrap">
          <div className="award-winning-wrap">
            <div className="award-winning">
              <Image
                alt="left shade"
                src={`https://res.cloudinary.com/dsoilebvu/image/upload/v1777048239/rating-l_ngsvxg.svg`}
                width={40}
                height={40}
                className="award-winning-shade-img"
              />
              <p className="award-winning-description">
                Delivering top-notch software solutions since 2012
              </p>
              <Image
                alt="right shade"
                src={`https://res.cloudinary.com/dsoilebvu/image/upload/v1777048240/rating-r_vlkuz4.svg`}
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
                Our QA experts make sure your product performs seamlessly across every platform,
                every device, every time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="section we-offer-section sec-spacing">
        <div className="container-3 w-container">
          <div className="section-head section-head-two">
            <div className="section-head-content-subtitle">
              <div className="section-head-subtitle-dot" />
              <p className="section-head-subtitle-content subtitle-secondary-content">
                What we offer
              </p>
            </div>
            <div className="title title-two">
              <h2 className="title-h2 title-h2-two">Comprehensive Quality Assurance Services</h2>
              <p className="section-title-description">
                We cover every aspect of testing, manual to automated, functional to security, so
                your product meets the highest standards before it reaches users.
              </p>
            </div>
          </div>

          <ul role="list" className="our-technology-list w-list-unstyled">
            {qaServices.map((service) => (
              <li key={service.num} className="our-technology-listi-tem">
                <div className="our-technology-card">
                  <div className="technology-shade" />
                  <figure className="our-technology-list-image">
                    <Image
                      src={`${CDN1}/${service.icon}`}
                      alt={service.title}
                      width={48}
                      height={48}
                      className="technology-icon"
                    />
                  </figure>
                  <div className="our-technology-list-content-wrap">
                    <div className="our-technology-list-content">
                      <p className="our-technology-list-counter">{service.num}</p>
                      <h3 className="our-technology-list-title">{service.title}</h3>
                      <div className="our-technology-list-description-wrap">
                        <p className="our-technology-list-description">{service.desc}</p>
                        <div className="button-wrap our-technology-list-buttons">
                          <Link
                            href="/contact-us"
                            className="title-button transition-none active-button w-inline-block"
                          >
                            <div className="button-text active-button-text">Start a project</div>
                            <div className="arrows-container cta">
                              <Image
                                src={`https://res.cloudinary.com/dsoilebvu/image/upload/v1777064837/arrow-up_ktln9z.svg`}
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
        </div>
      </div>

      <ImpactSection />

      <section className="section choose-us-section choose-us-section-two">
        <div className="w-layout-blockcontainer container-3 w-container">
          <div className="why-choose-us-header">
            <div className="section-head-content-subtitle">
              <div className="section-head-subtitle-dot" />
              <p className="section-head-subtitle-content subtitle-secondary-content">
                Why choose us
              </p>
            </div>
            <h2 className="title-h2 title-h2-two choose-us choose-us-two-title">
              Partner With Us for Quality Assurance and Testing
            </h2>
          </div>
          <div className="choose-us-content">
            {whyChooseUs.map((item) => (
              <div key={item.title} className="choose-us-item">
                <Image
                  src={`${CDN}/${item.icon}`}
                  loading="lazy"
                  alt={item.title}
                  width={48}
                  height={48}
                  className="choose-us-icon"
                />
                <div className="choose-us-item-content">
                  <h3 className="choose-us-title">{item.title}</h3>
                  <p className="choose-us-description">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section process-section">
        <div className="w-layout-blockcontainer container-3 process-container w-container">
          <div className="protfolio-header responsive-style">
            <div className="section-head-content-subtitle subtitle-primary-content">
              <div className="section-head-subtitle-dot" />
              <p className="section-head-subtitle-content subtitle-primary-content">Our process</p>
            </div>
            <h2 className="title-h2 title-h2-two process-title">
              From Concept to Perfection: The QA &amp; Testing Journey
            </h2>
          </div>

          <div className="process-cycle-wrapper">
            {[
              {
                num: "01.",
                title: "Requirement Analysis & QA Strategy",
                desc: "Understand goals, risks, success factors, and align QA with business objectives.",
              },
              {
                num: "02.",
                title: "Test Case Design & Planning",
                desc: "Create detailed test plans ensuring full functional, performance, and quality coverage.",
              },
              {
                num: "03.",
                title: "Test Execution & Reporting",
                desc: "Execute tests, log defects, report outcomes, and provide continuous feedback loops.",
              },
              {
                num: "04.",
                title: "Post-Deployment Validation",
                desc: "Validate stability and reliability after launch through monitoring and regression tests.",
              },
            ].map((step) => (
              <div key={step.num} className="process-cycle-items">
                <div className="process-cycle-number">{step.num}</div>
                <div className="process-cycle-content">
                  <div className="process-cycle-title">{step.title}</div>
                  <p className="process-cycle-description">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />

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
              <div className="title title-two faq-title">
                <h2 className="title-h2 title-h2-two">Get All Your Questions Answered Here!</h2>
                <p className="section-title-description service-faq-description">
                  If you have other questions feel free to reach out at{" "}
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
                  q: "What types of testing do you provide?",
                  a: "We offer functional, regression, performance, security, usability, and compatibility testing.",
                },
                {
                  q: "When should QA be involved in a project?",
                  a: "Ideally from the beginning. Early QA reduces risks, catches issues sooner, and lowers costs.",
                },
                {
                  q: "Do you work with our existing development team?",
                  a: "Yes. Our QA engineers collaborate closely with your developers and workflows.",
                },
                {
                  q: "How do you report bugs and test results?",
                  a: "We provide clear reports with priorities, reproduction steps, screenshots, and dashboards.",
                },
                {
                  q: "Can you scale QA efforts as our project grows?",
                  a: "Absolutely. Our QA teams scale up or down based on scope, timeline, and release cycles.",
                },
              ]}
            />
          </div>
        </div>
      </div>


    </>
  );
}