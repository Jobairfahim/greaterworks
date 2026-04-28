"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const techOptions = [
    "Node.JS", "Python", "ROR", "RUST", "GO", "PHP",
    "React JS(TypeScript)", "Next JS", "Vue JS", "Nuxt JS", "Angular JS",
    "Blockchain Development", "WordPress/Wix/Webflow", "UI(Tailwind/HTML5)",
    "Android(JAVA/Kotlin)", "iOS(Swift/Objective-C)", "Flutter", "React Native",
    "Terraform", "Docker", "AWS", "Azure",
    "UI/UX Designing", "AI/ML Engineering", "Project Management", "Other Custom Work",
];

export default function ContactSection() {
    const [engagementType, setEngagementType] = useState("Staff Augmentation");

    return (
        <>
            <section className="section section-contact-us services-page">
                <div className="container-3 w-container">
                    <div className="contact-us service-page flex ">
                        <div className="contact-us-info service-page">
                            <div className="service-contact-info">
                                <h2 className="contact-us-title service-title-wrap"><strong className="service-contact-us-title">Start Building Your Project Today, Get in Touch!</strong></h2>
                                <ul role="list" className="contact-us-list service-list">
                                    <li className="contact-us-list-item">
                                        <Image src="https://res.cloudinary.com/dsoilebvu/image/upload/v1777057659/check_a87gb5.svg" loading="lazy" alt="Icon" width={24} height={24} className="contact-us-list-icon" />
                                        <p className="contact-us-list-description service-page">NDA? Absolutely just ask.</p>
                                    </li>
                                    <li className="contact-us-list-item">
                                        <Image src="https://res.cloudinary.com/dsoilebvu/image/upload/v1777057659/check_a87gb5.svg" loading="lazy" alt="Icon" width={24} height={24} className="contact-us-list-icon" />
                                        <p className="contact-us-list-description service-page">We&apos;ll respond in 24 hours fast & focused.</p>
                                    </li>
                                    <li className="contact-us-list-item">
                                        <Image src="https://res.cloudinary.com/dsoilebvu/image/upload/v1777057659/check_a87gb5.svg" loading="lazy" alt="Icon" width={24} height={24} className="contact-us-list-icon" />
                                        <p className="contact-us-list-description service-page">Work with Senior Engineers.</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="service-contact-us-schedule-wrap responsive">
                                <div className="contact-us-schedule service-contact-us-schedule">
                                    <Link href="https://cal.com/amentotech/30min" target="_blank" className="contact-us-schedule-icon-wrap service-contact-us-schedule-icon-wrap w-inline-block">
                                        <Image src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/68e4b7bde312a6e238715c90_email.svg" loading="lazy" alt="Icon" width={20} height={20} className="contact-us-schedule-icon" />
                                    </Link>
                                    <div className="contact-us-ceo-name-title">
                                        <p className="from-prefer-email service-page">Talk To Sales <Link href="mailto:sales@greaterworks.tech  " className="link-3 service-link">sales@greaterworks.tech</Link></p>
                                    </div>
                                </div>
                                <div className={`contact-us-schedule staff-contact-us-schedule ${engagementType === "Custom Product Development" ? "is-active" : ""}`}>
                                    <Link href="https://cal.com/amentotech/30min" target="_blank" className="contact-us-schedule-icon-wrap staff-contact-us-schedule-icon-wrap w-inline-block">
                                        <Image src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/6941678ff02622c117747807_information-icon.png" loading="lazy" alt="Icon" width={20} height={20} className="contact-us-schedule-icon" />
                                    </Link>
                                    <div className="contact-us-ceo-name-title">
                                        <p className="from-prefer-email staff-description"><span className="text-span-20">Custom Product Development </span>Turn your ideas into fully functional digital products. We design and build tailored solutions that align with your goals, from initial concept to final launch.</p>
                                    </div>
                                </div>
                                <div className={`contact-us-schedule teams-contact-us-schedule ${engagementType === "End-to-End Product Delivery" ? "is-active" : ""}`}>
                                    <Link href="https://cal.com/amentotech/30min" target="_blank" className="contact-us-schedule-icon-wrap staff-contact-us-schedule-icon-wrap w-inline-block">
                                        <Image src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/6941678ff02622c117747807_information-icon.png" loading="lazy" alt="Icon" width={20} height={20} className="contact-us-schedule-icon" />
                                    </Link>
                                    <div className="contact-us-ceo-name-title">
                                        <div className="link-3 staff-title">End-to-End Product Delivery</div>
                                        <p className="from-prefer-email staff-description">We manage the entire product lifecycle, from planning and design to development and deployment, ensuring a seamless and efficient delivery process.</p>
                                    </div>
                                </div>
                                <div className={`contact-us-schedule project-contact-us-schedule ${engagementType === "Fixed Project" ? "is-active" : ""}`}>
                                    <Link href="https://cal.com/amentotech/30min" target="_blank" className="contact-us-schedule-icon-wrap staff-contact-us-schedule-icon-wrap w-inline-block">
                                        <Image src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/6941678ff02622c117747807_information-icon.png" loading="lazy" alt="Icon" width={20} height={20} className="contact-us-schedule-icon" />
                                    </Link>
                                    <div className="contact-us-ceo-name-title">
                                        <div className="link-3 staff-title">Fixed-Scoped Projects</div>
                                        <p className="from-prefer-email staff-description">Perfect for well-defined requirements, clear deliverables, timelines, and pricing from day one. We handle end-to-end delivery with predictable outcomes and zero surprises.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="contact-us-from-wrap service-page">
                            <div className="service-contact-info responsive-style">
                                <h2 className="contact-us-title service-title-wrap"><strong className="service-contact-us-title">Start Building Your Project Today, Get in Touch!</strong></h2>
                                <ul role="list" className="contact-us-list service-list">
                                    <li className="contact-us-list-item">
                                        <Image src="https://res.cloudinary.com/dsoilebvu/image/upload/v1777057659/check_a87gb5.svg" loading="lazy" alt="Icon" width={24} height={24} className="contact-us-list-icon" />
                                        <p className="contact-us-list-description service-page">NDA? Absolutely just ask.</p>
                                    </li>
                                    <li className="contact-us-list-item">
                                        <Image src="https://res.cloudinary.com/dsoilebvu/image/upload/v1777057659/check_a87gb5.svg" loading="lazy" alt="Icon" width={24} height={24} className="contact-us-list-icon" />
                                        <p className="contact-us-list-description service-page">We&apos;ll respond in 24 hours fast & focused.</p>
                                    </li>
                                    <li className="contact-us-list-item">
                                        <Image src="https://res.cloudinary.com/dsoilebvu/image/upload/v1777057659/check_a87gb5.svg" loading="lazy" alt="Icon" width={24} height={24} className="contact-us-list-icon" />
                                        <p className="contact-us-list-description service-page">Work with Senior Engineers.</p>
                                    </li>
                                </ul>
                            </div>
                            <h2 className="heading-13 service-form-title">Send us a message! </h2>
                            <p className="contact-us-description service-contact-description">Tell us about your project, your company & your goals!</p>
                            <div className="form-block-2 w-form">
                                <form id="wf-form-Contact-Us-From" name="wf-form-Contact-Us-From" data-name="Contact Us From" method="get" className="form-2">
                                    <div className="fields-wrap">
                                        <div className="form-group service-form-group">
                                            <p className="from-group-title service-form-title">Full Name*</p>
                                            <input className="field-form full text-field-2 service-form-field w-input" maxLength={256} name="Full-Name" data-name="Full Name" placeholder="Enter your full name" type="text" id="Full-Name" required />
                                        </div>
                                        <div className="form-group service-form-group">
                                            <p className="from-group-title service-form-title">Email*</p>
                                            <input className="field-form full service-form-field w-input" maxLength={256} name="Email-Address" data-name="Email Address" placeholder="Enter your email address" type="email" id="Email-Address" required />
                                        </div>
                                    </div>
                                    <div className="fields-wrap">
                                        <div className="form-group service-form-group">
                                            <p className="from-group-title service-form-title">Phone</p>
                                            <input className="field-form full text-field-2 service-form-field w-input" maxLength={256} name="Phone-Number" data-name="Phone Number" placeholder="Enter your phone number" type="tel" id="Phone-Number" />
                                        </div>
                                        <div className="form-group service-form-group">
                                            <p className="from-group-title service-form-title">Preferred Tech</p>
                                            <select id="Preferred" name="Preferred" data-name="Preferred" className="contact-form-select service-form-field w-select">
                                                <option value="">Select preferred tech stack</option>
                                                {techOptions.map((opt, i) => (
                                                    <option key={i} value={opt}>{opt}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group service-form-group">
                                        <p className="from-group-title service-form-title">Message*</p>
                                        <textarea id="Message" name="Message" maxLength={5000} data-name="Message" placeholder="Tel us how can we help" required className="field-form full-textarea service-form-field w-input" />
                                    </div>
                                    <div className="form-group service-form-group engagement-type">
                                        <p className="from-group-title service-form-title">Engagement type</p>
                                        <div className="radio-wrap service-radio-wrap">
                                            {["Custom Product Development", "End-to-End Product Delivery", "Fixed Project"].map((type) => (
                                                <label key={type} className="radio-button-field service-radio-field w-radio">
                                                    <input
                                                        type="radio"
                                                        name="From-Type"
                                                        value={type}
                                                        checked={engagementType === type}
                                                        onChange={() => setEngagementType(type)}
                                                        style={{ opacity: 0, position: "absolute", zIndex: -1 }}
                                                    />
                                                    <div className={`radio-button w-radio-input ${engagementType === type ? "w--redirected-checked" : ""}`} />
                                                    <span className="radio-button-label w-form-label">{type}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="from-footer">
                                        <input type="submit" data-wait="Please wait..." className="button-primary service-button-primary w-button" value="Submit your message" />
                                    </div>
                                </form>
                                <div className="success-message-4 responsive-style w-form-done">
                                    <div className="text-block-14">Thank you! Your submission has been received!</div>
                                </div>
                                <div className="w-form-fail">
                                    <div className="text-block-15">Oops! Something went wrong while submitting the form.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <style>{`
                .contact-us-ceo-name-title > p:empty {
                    display: none;
                }
                .staff-contact-us-schedule,
                .teams-contact-us-schedule,
                .project-contact-us-schedule {
                    display: none;
                    opacity: 0;
                    transform: translateY(12px);
                }
                .contact-us-schedule.is-active {
                    display: flex;
                    animation: fadeSlideIn 0.4s ease forwards;
                }
                @keyframes fadeSlideIn {
                    from {
                        opacity: 0;
                        transform: translateY(12px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .contact-form-select {
                    appearance: none;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='19' height='19' viewBox='0 0 19 19' fill='none'%3E%3Cpath d='M4.59863 6.89844L9.19753 11.4973L13.7964 6.89844' stroke='%23141414' stroke-opacity='0.4' stroke-width='1.27747' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: right 14px center;
                    background-size: 18px;
                    cursor: pointer;
                }
                .radio-button {
                    position: relative;
                    box-shadow: none !important;
                }
                .radio-button:before {
                    width: 10px;
                    opacity: 0;
                    content: "";
                    height: 10px;
                    background: #9433e9;
                    position: absolute;9433e9
                    top: 50%;
                    left: 50%;
                    margin: -5px 0 0 -5px;
                    border-radius: 100%;
                }
                .radio-button.w--redirected-checked:before {
                    opacity: 1;
                    border-radius: 50%;
                }
                .contact-form-select.service-form-field {
                    background-position: right 32px center;
                }
                .service-radio-wrap .radio-button {
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                    border: 2px solid #d1d5db;
                    background-color: #fff;
                }
                .service-radio-wrap .radio-button.w--redirected-checked {
                    background-color: #9433e9;
                    border-color: #9433e9;
                }
                .service-radio-wrap .radio-button.w--redirected-checked ~ span {
                    color: var(--heading);
                }
                .service-radio-wrap .radio-button::before {
                    background: #fff;
                    border-radius: 50%;
                }
                @media (max-width: 767px) {
                    .service-radio-wrap .radio-button {
                        width: 14px;
                        height: 14px;
                    }
                    .radio-button::before {
                        width: 6px;
                        height: 6px;
                        margin: 0;
                        transform: translate(-50%, -50%);
                    }
                }
                @media only screen and (min-width: 992px) and (max-width: 1280px) {
                    .contact-us-from-wrap.service-page,
                    .contact-us-info.service-page {
                        width: 50%;
                    }
                    .contact-us.service-page {
                        height: auto;
                        gap: 20px;
                    }
                    .radio-button-label {
                        font-size: 16px;
                        line-height: 26px;
                        margin-left: 8px;
                    }
                }
                @media only screen and (max-width: 1680px) {
                    .contact-form-select.service-form-field {
                        background-position: right 14px center;
                    }
                    .service-radio-wrap .radio-button {
                        height: 20px;
                        width: 20px;
                    }
                    .radio-button:before {
                        height: 7px;
                        width: 7px;
                        margin: 0;
                        transform: translate(-50%, -50%);
                    }
                }
            `}</style>
        </>
    );
}
