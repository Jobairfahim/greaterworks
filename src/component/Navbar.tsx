//eslint
"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiMenu } from "react-icons/hi";
import { fetchNavbarData } from "@/lib/api";
import { hasNavbarCmsContent } from "@/lib/navbar-data";
import { NavbarData } from "@/types/navbar";

const services = [
  {
    title: "Custom Software Development",
    desc: "Tailored solutions to boost your business growth and success.",
    icon: "https://res.cloudinary.com/dsoilebvu/image/upload/v1777048245/custom_kyjfrj.svg",
    href: "/services/custom-software-development",
  },
  {
    title: "Web Development",
    desc: "Robust and responsive websites to enhance online presence.",
    icon: "https://res.cloudinary.com/dsoilebvu/image/upload/v1777048243/web_bvejup.svg",
    href: "/services/web-app-development",
  },
  {
    title: "Mobile App development",
    desc: "High-performance mobile apps to strengthen user experience across platforms.",
    icon: "https://res.cloudinary.com/dsoilebvu/image/upload/v1777048242/mobile_ndbr6y.svg",
    href: "/services/mobile-app-development",
  },
  {
    title: "UI/UX Design",
    desc: "intuitive interfaces to deliver seamless experiences, driving customer satisfaction",
    icon: "https://res.cloudinary.com/dsoilebvu/image/upload/v1777048243/ui-ux_jmvfmm.svg",
    href: "/services/ui-ux-design",
  },
  {
    title: "Enterprise Solutions",
    desc: "Custom enterprise solutions to optimize your business operations",
    icon: "https://res.cloudinary.com/dsoilebvu/image/upload/v1777048240/enterprise_fzmrry.svg",
    href: "/services/enterprise-solutions",
  },
  {
    title: "Artificial Intelligence & Machine Learning",
    desc: "Leverage AI and ML to enhance predictive capabilities for smarter business decisions",
    icon: "https://res.cloudinary.com/dsoilebvu/image/upload/v1777048244/ai_ml_uof8se.svg",
    href: "/services/artificial-intelligence-machine-learning",
  },
  {
    title: "DevOps & IT Consulting",
    desc: "Optimize your SDLC with expert DevOps solutions and IT strategy consulting",
    icon: "https://res.cloudinary.com/dsoilebvu/image/upload/v1777048239/devops_yytzvd.svg",
    href: "/services/devops-it-consulting",
  },
  {
    title: "Blockchain Development",
    desc: "Secure, scalable blockchain solutions and DApps, fostering trust and innovation across industries.",
    icon: "https://res.cloudinary.com/dsoilebvu/image/upload/v1777048244/block-chain_jyxqsp.svg",
    href: "/services/blockchain-development",
  },
  {
    title: "Quality Assurance & Testing",
    desc: "Ensure software quality with SQA and automated testing for flawless performance",
    icon: "https://res.cloudinary.com/dsoilebvu/image/upload/v1777048239/qa_gfbujp.svg",
    href: "/services/quality-assurance-testing",
  },
];

const industries = [
  {
    title: "E-commerce",
    icon: "https://res.cloudinary.com/dsoilebvu/image/upload/v1777048239/e-commerce_w4jeni.svg",
    href: "/contact-us",
  },
  {
    title: "Fintech",
    icon: "https://res.cloudinary.com/dsoilebvu/image/upload/v1777048241/fintech_zot6im.svg",
    href: "/contact-us",
  },
  {
    title: "Healthcare",
    icon: "https://res.cloudinary.com/dsoilebvu/image/upload/v1777048241/healthcare_kge1kk.svg",
    href: "/contact-us",
  },
  {
    title: "Ed-tech",
    icon: "https://res.cloudinary.com/dsoilebvu/image/upload/v1777048239/edtech_itagwl.svg",
    href: "/contact-us",
  },
  {
    title: "On-Demand",
    icon: "https://res.cloudinary.com/dsoilebvu/image/upload/v1777048242/ondemand_di1yay.svg",
    href: "/contact-us",
  },
  {
    title: "Food & Groceries",
    icon: "https://res.cloudinary.com/dsoilebvu/image/upload/v1777048239/food_e1kwys.svg",
    href: "/contact-us",
  },
  {
    title: "Real Estate",
    icon: "https://res.cloudinary.com/dsoilebvu/image/upload/v1777048241/real-state_hrrvkv.svg",
    href: "/contact-us",
  },
  {
    title: "Blockchain",
    icon: "https://res.cloudinary.com/dsoilebvu/image/upload/v1777048244/block-chain_jyxqsp.svg",
    href: "/contact-us",
  },
];

const approaches = [
  {
    title: "Product Development",
    desc: "Developing strategic roadmaps, MVPs, and agile solutions for faster time-to-market, scalable growth, and cross-platform reach.",
    icon: "https://res.cloudinary.com/dsoilebvu/image/upload/v1777057659/box_xpqyic.svg",
    href: "/contact-us",
  },
  {
    title: "Custom Product Development",
    desc: "Turn your ideas into fully functional digital products. We design and build tailored solutions that align with your goals, from initial concept to final launch.",
    icon: "https://res.cloudinary.com/dsoilebvu/image/upload/v1777057660/arrow-right_vll07y.svg",
    href: "/contact-us",
  },
  {
    title: "Dedicated Teams",
    desc: "End-to-end project ownership with smooth integration, diverse expertise, and continuous delivery for long-term innovation.",
    icon: "https://res.cloudinary.com/dsoilebvu/image/upload/v1777048239/qa_gfbujp.svg",
    href: "/contact-us",
  },
];

const hireTabs = [
  {
    label: "Management Systems",
    icon: "https://res.cloudinary.com/dsoilebvu/image/upload/v1777048243/web_bvejup.svg",
    items: [
      {
        title: "Restaurant Management System",
        desc: "Complete restaurant operations management with ordering, inventory, and billing.",
      },
      {
        title: "Booking & Reservation System",
        desc: "Streamlined booking and reservation management for businesses and services.",
      },
      {
        title: "Real Estate Management System",
        desc: "Comprehensive property management with listings, bookings, and client management.",
      },
      {
        title: "ERP System",
        desc: "Enterprise Resource Planning system for integrated business process management.",
      },
    ],
  },
  {
    label: "Business Solutions",
    icon: "https://res.cloudinary.com/dsoilebvu/image/upload/v1777048239/qa_gfbujp.svg",
    items: [
      {
        title: "E-commerce Website",
        desc: "Full-featured online shopping platform with payment integration and inventory management.",
      },
      {
        title: "Livestock Management System",
        desc: "Digital solution for livestock tracking, health monitoring, and farm management.",
      },
      {
        title: "School Management System",
        desc: "Complete educational institution management with student records and academic tracking.",
      },
      {
        title: "StitchMate",
        desc: "Tailored garment and textile management solution for fashion businesses.",
      },
    ],
  },
  {
    label: "Healthcare Solutions",
    icon: "https://res.cloudinary.com/dsoilebvu/image/upload/v1777048241/healthcare_kge1kk.svg",
    items: [
      {
        title: "Hospital Management System",
        desc: "Complete healthcare facility management with patient records and appointments.",
      },
      {
        title: "Telemedicine Platform",
        desc: "Remote healthcare consultation platform with video calls and prescriptions.",
      },
      {
        title: "Pharmacy Management System",
        desc: "Digital pharmacy operations with inventory and prescription management.",
      },
      {
        title: "Healthcare CRM",
        desc: "Patient relationship management system for healthcare providers.",
      },
    ],
  },
  {
    label: "Financial Solutions",
    icon: "https://res.cloudinary.com/dsoilebvu/image/upload/v1777048241/fintech_zot6im.svg",
    items: [
      {
        title: "Banking Management System",
        desc: "Comprehensive banking operations with accounts, loans, and transactions.",
      },
      {
        title: "Payment Gateway",
        desc: "Secure online payment processing platform for businesses.",
      },
      {
        title: "Investment Management Platform",
        desc: "Digital investment tracking and portfolio management system.",
      },
      {
        title: "Insurance Management System",
        desc: "Complete insurance operations with policies and claims management.",
      },
    ],
  },
  {
    label: "Educational Platforms",
    icon: "https://res.cloudinary.com/dsoilebvu/image/upload/v1777048239/edtech_itagwl.svg",
    items: [
      {
        title: "Learning Management System",
        desc: "Online learning platform with courses, assessments, and progress tracking.",
      },
      {
        title: "Virtual Classroom",
        desc: "Interactive online classroom with live sessions and collaboration tools.",
      },
      {
        title: "Student Information System",
        desc: "Comprehensive student data management with academic records.",
      },
      {
        title: "E-learning Platform",
        desc: "Customizable e-learning solution with multimedia content delivery.",
      },
    ],
  },
];

interface DropdownProps {
  children: React.ReactNode;
  className?: string;
}

function Dropdown({ children, className = "" }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const clearPendingClose = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const handleEnter = useCallback(() => {
    clearPendingClose();
    setOpen(true);
  }, [clearPendingClose]);

  const handleLeave = useCallback(() => {
    clearPendingClose();
    closeTimeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 200);
  }, [clearPendingClose]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        clearPendingClose();
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      clearPendingClose();
    };
  }, [clearPendingClose]);

  return (
    <div
      ref={containerRef}
      className={`dropdown w-dropdown ${className} ${open ? "w--open" : ""}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  );
}

function DropdownToggle({ children }: { children: React.ReactNode }) {
  return <div className="dropdown-toggle w-dropdown-toggle">{children}</div>;
}

function DropdownList({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <nav className={`w-dropdown-list ${className}`}>{children}</nav>;
}

export default function Navbar({ data: initialData }: { data?: NavbarData | null }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHireTab, setActiveHireTab] = useState(0);
  const [cmsData, setCmsData] = useState<NavbarData | null>(initialData ?? null);

  // Check if current page is homepage
  const isHomepage = pathname === "/";

  useEffect(() => {
    setCmsData(initialData ?? null);
  }, [initialData]);

  // Same source as Footer: refetch via /api/navbar when server data is missing/empty
  useEffect(() => {
    if (hasNavbarCmsContent(initialData)) return;

    let cancelled = false;

    const loadNavbar = async () => {
      try {
        const fresh = await fetchNavbarData();
        if (!cancelled && fresh) {
          setCmsData(fresh);
        }
      } catch (error) {
        console.error("Navbar: failed to load CMS data", error);
      }
    };

    loadNavbar();

    return () => {
      cancelled = true;
    };
  }, [initialData]);

  const data = cmsData;
console.log(data);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Mobile accordion dropdown
  const [mobileDropdowns, setMobileDropdowns] = useState<
    Record<string, boolean>
  >({});
  const toggleMobileDropdown = (key: string) => {
    setMobileDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Dynamic brand logo URL and fallback logic
  const logoUrl = data?.navbarIcom?.url
    ? `${process.env.NEXT_PUBLIC_SERVER_URL}${data.navbarIcom.url}`
    : isHomepage || scrolled
      ? "https://res.cloudinary.com/dsoilebvu/image/upload/v1777048314/logo_kxjvlv.png"
      : "https://res.cloudinary.com/dsoilebvu/image/upload/v1778082292/Logo_-_Black_oysy60.png";

  const logoUnoptimized = !!data?.navbarIcom?.url;

  // Services dynamic mapping and filtering
  const mappedServices =
    data?.services
      ?.filter((s) => s.service?.serviceTitle && s.service?.slug)
      .map((s) => {
        const slug = s.service!.slug.startsWith("/")
          ? s.service!.slug.slice(1)
          : s.service!.slug;
        return {
          title: s.service!.serviceTitle,
          desc: s.serviceDescription || "",
          icon: s.serviceIcon?.url
            ? `${process.env.NEXT_PUBLIC_SERVER_URL}${s.serviceIcon.url}`
            : "https://res.cloudinary.com/dsoilebvu/image/upload/v1777048245/custom_kyjfrj.svg",
          href: `/services/${slug}`,
          isLocalIcon: !!s.serviceIcon?.url,
        };
      }) ?? [];

  const displayServices =
    mappedServices.length > 0
      ? mappedServices
      : services.map((s) => ({ ...s, isLocalIcon: false }));

  // Services Sidebar dynamic data
  const serviceSidebarTitle =
    data?.serviceSidbarTitle || "Not Sure where to start?";
  const serviceSidebarDescription =
    data?.serviceSidbarDescription ||
    "Connect with our experts to receive a free estimate and streamline your workflow at no extra cost. Why wait? Give it a try today!";
  const serviceSidebarContactEmail =
    data?.serviceSidbarContactEmail || "sales@greaterworks.tech";

  const serviceSidebarImageUrl = data?.ServiceSidbarImage?.url
    ? `${process.env.NEXT_PUBLIC_SERVER_URL}${data.ServiceSidbarImage.url}`
    : "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/68e51d8ba178421e5a3e8949_header%20menu%20image.jpg";
  const serviceSidebarImageUnoptimized = !!data?.ServiceSidbarImage?.url;

  const serviceSidebarContactLink = data?.contactLink || "/contact-us";

  // Industries dynamic mapping and filtering
  const displayIndustries =
    data?.industries && data.industries.length > 0
      ? data.industries
          .filter((ind) => ind.industryTitle)
          .map((ind) => {
            const title = ind.industryTitle!;
            const icon = ind.industryIcon?.url
              ? `${process.env.NEXT_PUBLIC_SERVER_URL}${ind.industryIcon.url}`
              : "https://res.cloudinary.com/dsoilebvu/image/upload/v1777048239/e-commerce_w4jeni.svg";
            const href = "/contact-us";
            return { title, icon, href, isLocalIcon: !!ind.industryIcon?.url };
          })
      : industries.map((ind) => ({ ...ind, isLocalIcon: false }));

  // Approaches dynamic mapping and filtering
  const displayApproaches =
    data?.approach && data.approach.length > 0
      ? data.approach
          .filter((a) => a.approachTitle)
          .map((a) => {
            const title = a.approachTitle!;
            const desc = a.approachDescription || "";
            const icon = a.approachIcon?.url
              ? `${process.env.NEXT_PUBLIC_SERVER_URL}${a.approachIcon.url}`
              : "https://res.cloudinary.com/dsoilebvu/image/upload/v1777057659/box_xpqyic.svg";
            const href = "/contact-us";
            return {
              title,
              desc,
              icon,
              href,
              isLocalIcon: !!a.approachIcon?.url,
            };
          })
      : approaches.map((a) => ({ ...a, isLocalIcon: false }));

  // Solutions Categories (for Our Solutions dropdown) - matching hireTabs structure
  // If CMS provides solutionCategories, use them; otherwise fallback to static hireTabs
  const solutionCategories =
    data?.solution && data.solution.length > 0
      ? data.solution.map((cat) => ({
          label: cat.solutoinTitle,
          icon: cat.solutionIcon?.url
            ? `${process.env.NEXT_PUBLIC_SERVER_URL}${cat.solutionIcon.url}`
            : "https://res.cloudinary.com/dsoilebvu/image/upload/v1777048243/web_bvejup.svg",
          items: cat.sidbar.map((item) => ({
            title: item.solutionSidbarTitle,
            desc: item.solutionSdibarDescription,
          })),
          isLocalIcon: !!cat.icon?.url,
        }))
      : data?.solution && data.solution.length > 0
        ? [
            {
              label: "Our Solutions",
              icon:
                data.solution[0]?.solutionIcon?.url
                  ? `${process.env.NEXT_PUBLIC_SERVER_URL}${data.solution[0].solutionIcon.url}`
                  : "https://res.cloudinary.com/dsoilebvu/image/upload/v1777048243/web_bvejup.svg",
              items: data.solution
                .filter((item) => item.solutoinTitle)
                .map((item) => ({
                  title: item.solutoinTitle || "Solution",
                  desc: "Tailored software solution designed for your business goals.",
                })),
              isLocalIcon: !!data.solution[0]?.solutionIcon?.url,
            },
          ]
      : hireTabs.map((tab) => ({ ...tab, isLocalIcon: false }));

  // Solution sidebar data for contact link
  const solutionSidebarDescription =
    data?.solutionSidbarDescription ||
    "Get in touch with our 24/7 active support team to get your query resolve.";
console.log("solutionCategories", solutionCategories);
  return (
    <div
      data-animation="default"
      data-collapse="medium"
      data-duration="400"
      data-easing="ease"
      data-easing2="ease"
      role="banner"
      className={`navbar-2 navbar-transparent w-nav ${scrolled ? "scrolled" : ""} ${!isHomepage ? "navbar-dark-text" : ""}`}
    >
      <div className="container-2 full-with-text-container w-container">
        {/* Desktop menu */}
        <div className="nav-menu-wrapper hidden-responsive">
          <div className="header-logo">
            <Link
              href="/"
              aria-current="page"
              className="w-nav-brand w--current"
            >
              <Image
                src={logoUrl}
                alt=""
                width={100}
                height={40}
                className="image-34"
                unoptimized={logoUnoptimized}
              />
            </Link>
          </div>
          <nav role="navigation" className="nav-menu-2 w-nav-menu">
            {/* Our Services */}
            <Dropdown className="mega-menu-wrap-dropdown">
              <DropdownToggle>
                <div className="link-text-wrap">
                  <p className="nav-item-title nav-title-white">Our services</p>
                </div>
                <svg
                  className="nav-dropdown-icon nav-dropdown-icon-white w-icon-dropdown-toggle"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
                <div className="nav-hover" />
              </DropdownToggle>
              <DropdownList className="mega-menu-wrap">
                <div className="mega-menu-container">
                  <div className="nav-dropdown-column menu-left-side">
                    <div className="nav-dropdown-link-wrapper">
                      <ul role="list" className="menu-service-list">
                        {displayServices.map((s, i) => (
                          <li key={i} className="menu-service-list-item">
                            <Link
                              href={s.href}
                              className="menu-service-list-card w-inline-block"
                            >
                              <Image
                                src={s.icon}
                                alt="icon"
                                width={24}
                                height={24}
                                className="menu-service-list-icon"
                                unoptimized={s.isLocalIcon}
                              />
                              <p className="menu-service-list-title">
                                <strong className="bold-text-2">
                                  {s.title}{" "}
                                </strong>
                                {s.desc}
                              </p>
                              <Image
                                src="https://res.cloudinary.com/dsoilebvu/image/upload/v1777048244/arrow_kaivth.svg"
                                alt="icon"
                                width={16}
                                height={16}
                                className="menu-service-list-arrow-icon"
                              />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="menu-right-side">
                    <div className="menu-company-header">
                      <h3 className="menu-company-header-title">
                        {serviceSidebarTitle}
                      </h3>
                      <p className="menu-company-header-description">
                        {serviceSidebarDescription}
                      </p>
                    </div>
                    <div className="header-link-wrapper">
                      <div className="contact-us-card">
                        <div className="contact-us-card-icon menu-contact-us-card-icon">
                          <Image
                            src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/68e51aa310530dbf53f8f4c2_email-black.svg"
                            alt="icon"
                            width={20}
                            height={20}
                            className="image-22 menu-contact-us-card-icon-img"
                          />
                        </div>
                        <Link
                          href={`mailto:${serviceSidebarContactEmail}`}
                          className="link-2 menu-contact-us-card-link"
                        >
                          Talk To Sales{" "}
                          <span className="menu-contact-us-card-link-info menu-contact-us-card-link-info-header">
                            {serviceSidebarContactEmail}
                          </span>
                        </Link>
                      </div>
                    </div>
                    <figure className="menu-contact-wrap">
                      <Link
                        href={serviceSidebarContactLink}
                        className="w-inline-block"
                      >
                        <Image
                          src={serviceSidebarImageUrl}
                          alt=""
                          width={1000}
                          height={1000}
                          className="menu-contact-wrap-image"
                          unoptimized={serviceSidebarImageUnoptimized}
                        />
                      </Link>
                    </figure>
                  </div>
                </div>
              </DropdownList>
            </Dropdown>

            {/* Industries */}
            <Dropdown>
              <DropdownToggle>
                <div className="link-text-wrap">
                  <p className="nav-item-title nav-title-white">Industries</p>
                </div>
                <svg
                  className="nav-dropdown-icon nav-dropdown-icon-white w-icon-dropdown-toggle"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
                <div className="nav-hover" />
              </DropdownToggle>
              <DropdownList className="nav-dropdown-list">
                <div className="nav-dropdown-column">
                  <div className="nav-dropdown-link-wrapper nav-dropdown-link-wrapper-single">
                    <ul
                      role="list"
                      className="menu-service-list menu-service-list-single"
                    >
                      {displayIndustries.map((ind, i) => (
                        <li
                          key={i}
                          className="menu-service-list-item menu-service-list-item-single"
                        >
                          <Link
                            href={ind.href}
                            className="menu-service-list-card w-inline-block"
                          >
                            <Image
                              src={ind.icon}
                              alt="icon"
                              width={24}
                              height={24}
                              className="menu-service-list-icon"
                              unoptimized={ind.isLocalIcon}
                            />
                            <p className="menu-service-list-title">
                              <strong className="bold-text-2 mb-0">
                                {ind.title}
                              </strong>
                            </p>
                            <Image
                              src="https://res.cloudinary.com/dsoilebvu/image/upload/v1777048244/arrow_kaivth.svg"
                              alt="icon"
                              width={16}
                              height={16}
                              className="menu-service-list-arrow-icon"
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </DropdownList>
            </Dropdown>

            {/* Our Approach */}
            <Dropdown>
              <DropdownToggle>
                <div className="link-text-wrap">
                  <p className="nav-item-title nav-title-white">Our approach</p>
                </div>
                <svg
                  className="nav-dropdown-icon nav-dropdown-icon-white w-icon-dropdown-toggle"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
                <div className="nav-hover" />
              </DropdownToggle>
              <DropdownList className="nav-dropdown-list">
                <div className="nav-dropdown-column">
                  <div className="nav-dropdown-link-wrapper nav-dropdown-link-wrapper-single">
                    <ul
                      role="list"
                      className="menu-service-list menu-service-list-single"
                    >
                      {displayApproaches.map((a, i) => (
                        <li
                          key={i}
                          className="menu-service-list-item menu-service-list-item-single"
                        >
                          <Link
                            href={a.href}
                            className="menu-service-list-card w-inline-block"
                          >
                            <Image
                              src={a.icon}
                              alt="icon"
                              width={24}
                              height={24}
                              className="menu-service-list-icon"
                              unoptimized={a.isLocalIcon}
                            />
                            <p className="menu-service-list-title">
                              <strong className="bold-text-2">{a.title}</strong>
                              {a.desc}
                            </p>
                            <Image
                              src="https://res.cloudinary.com/dsoilebvu/image/upload/v1777048244/arrow_kaivth.svg"
                              alt="icon"
                              width={16}
                              height={16}
                              className="menu-service-list-arrow-icon"
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </DropdownList>
            </Dropdown>

            {/* Our Solutions - matching unintegrated design exactly with tab structure */}
            <Dropdown className="mega-menu-wrap-dropdown">
              <DropdownToggle>
                <div className="link-text-wrap">
                  <p className="nav-item-title nav-title-white">
                    Our Solutions
                  </p>
                </div>
                <svg
                  className="nav-dropdown-icon nav-dropdown-icon-white w-icon-dropdown-toggle"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
                <div className="nav-hover" />
              </DropdownToggle>
              <DropdownList className="mega-menu-wrap">
                <div className="mega-menu-container">
                  <div className="mega_menu-tab-wrap w-tabs">
                    <div className="mega_menu-tab-items w-tab-menu">
                      {solutionCategories.map((tab, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setActiveHireTab(i)}
                          className={`mega_menu-tab-item w-inline-block w-tab-link ${activeHireTab === i ? "w--current" : ""}`}
                        >
                          <div className="menu-tab-card">
                            <Image
                              src={tab.icon}
                              alt="icon"
                              width={24}
                              height={24}
                              className="menu-service-list-icon"
                              unoptimized={tab.isLocalIcon}
                            />
                            <p className="menu-service-list-title">
                              <strong className="bold-text-2 mb-0">
                                {tab.label}
                              </strong>
                            </p>
                            <Image
                              src="https://res.cloudinary.com/dsoilebvu/image/upload/v1777048244/arrow_kaivth.svg"
                              alt="icon"
                              width={16}
                              height={16}
                              className="menu-service-list-arrow-icon"
                            />
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="tabs-content-3 w-tab-content">
                      <div className="w-tab-pane w--tab-active">
                        <div className="menu-approach-list">
                          <ul role="list" className="menu-service-list">
                            {solutionCategories[activeHireTab]?.items.map(
                              (item, i) => (
                                <li key={i} className="menu-service-list-item">
                                  <Link
                                    href="/contact-us"
                                    className="menu-service-list-card w-inline-block"
                                  >
                                    <Image
                                      src="https://res.cloudinary.com/dsoilebvu/image/upload/v1777048244/arrow_kaivth.svg"
                                      alt="icon"
                                      width={16}
                                      height={16}
                                      className="menu-service-list-arrow-icon"
                                    />
                                    <p className="menu-service-list-title">
                                      <strong className="bold-text-2">
                                        {item.title}
                                      </strong>
                                      {item.desc}
                                    </p>
                                  </Link>
                                </li>
                              ),
                            )}
                          </ul>
                        </div>
                        <Link
                          href="/contact-us"
                          className="contact-us-link w-inline-block"
                        >
                          <div className="menu-contact-us-info">
                            <Image
                              src="https://res.cloudinary.com/dsoilebvu/image/upload/v1777048239/qa_gfbujp.svg"
                              alt="image"
                              width={24}
                              height={24}
                              className="menu-service-list-icon"
                            />
                            <Image
                              src="https://res.cloudinary.com/dsoilebvu/image/upload/v1777048244/arrow_kaivth.svg"
                              alt="icon"
                              width={16}
                              height={16}
                              className="menu-service-list-arrow-icon"
                            />
                            <p className="menu-service-list-title">
                              <strong className="bold-text-2">
                                Contact Us
                              </strong>
                              {solutionSidebarDescription}
                            </p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </DropdownList>
            </Dropdown>

            <Link
              href="/insights"
              target="_blank"
              className="nav-link nav-title-white w-nav-link"
            >
              Insights
            </Link>
            <Link
              href="https://portal.greaterworks.tech/company/careers"
              target="_blank"
              className="nav-link nav-title-white w-nav-link"
            >
              Careers
            </Link>
          </nav>
          <div className="div-block-3 contact-us header-contact-us">
            <Link
              href="/contact-us"
              data-gn-book-meeting="modal"
              data-w-id="18496b83-ef74-3196-87a5-0e0002e3ed11"
              className="button-secondary-light nav-btn w-inline-block"
            >
              <div className="arrows-container cta">
                <Image
                  alt="Icon"
                  src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/68e4b7bde312a6e238715c90_email.svg"
                  width={16}
                  height={16}
                  className="dark-arrow _16 nav-icon-dark"
                />
                <Image
                  alt="Icon"
                  src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/68e51aa310530dbf53f8f4c2_email-black.svg"
                  width={16}
                  height={16}
                  className="arrow-button _16 nav-icon-dark"
                />
              </div>
              <div className="button-secondary-light-text-3 nav-btn">
                Get in Touch
              </div>
            </Link>
          </div>
        </div>

        {/* Responsive menu */}
        {mobileOpen && (
          <div
            className="mobile-nav-backdrop"
            onClick={() => setMobileOpen(false)}
          />
        )}
        <div className="nav-menu-wrapper nav-menu-wrapper-responsive">
          <div className="header-logo">
            <Link
              href="/"
              aria-current="page"
              className="brand-2 w-nav-brand w--current"
            >
              <Image
                alt=""
                src={logoUrl}
                width={100}
                height={30}
                className="image-37"
                unoptimized={logoUnoptimized}
              />
            </Link>
          </div>
          <nav
            role="navigation"
            className={`nav-menu-2 w-nav-menu ${mobileOpen ? "w--nav-menu-open" : ""}`}
          >
            {/* Mobile Our Services */}
            <div
              className={`dropdown mega-menu-wrap-dropdown ${mobileDropdowns.services ? "w--open" : ""}`}
            >
              <button
                type="button"
                className="dropdown-toggle w-dropdown-toggle"
                onClick={() => toggleMobileDropdown("services")}
              >
                <svg
                  className="nav-dropdown-icon w-icon-dropdown-toggle"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
                <div className="link-text-wrap">
                  <p className="nav-item-title">Our services</p>
                </div>
                <div className="nav-hover" />
              </button>
              <nav
                className={`mega-menu-wrap w-dropdown-list ${mobileDropdowns.services ? "w--open" : ""}`}
              >
                <div className="mega-menu-container">
                  <div className="nav-dropdown-column menu-left-side">
                    <div className="nav-dropdown-link-wrapper">
                      <ul role="list" className="menu-service-list">
                        {displayServices.map((s, i) => (
                          <li key={i} className="menu-service-list-item">
                            <Link
                              href={s.href}
                              className="menu-service-list-card w-inline-block"
                            >
                              <Image
                                src={s.icon}
                                alt="icon"
                                width={24}
                                height={24}
                                className="menu-service-list-icon"
                                unoptimized={s.isLocalIcon}
                              />
                              <p className="menu-service-list-title">
                                <strong className="bold-text-2">
                                  {s.title}{" "}
                                </strong>
                                {s.desc}
                              </p>
                              <Image
                                src="https://res.cloudinary.com/dsoilebvu/image/upload/v1777048244/arrow_kaivth.svg"
                                alt="icon"
                                width={16}
                                height={16}
                                className="menu-service-list-arrow-icon"
                              />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="menu-right-side">
                    <div className="menu-company-header">
                      <h3 className="menu-company-header-title">
                        {serviceSidebarTitle}
                      </h3>
                      <p className="menu-company-header-description">
                        {serviceSidebarDescription}
                      </p>
                    </div>
                    <div className="header-link-wrapper">
                      <div className="contact-us-card">
                        <div className="contact-us-card-icon menu-contact-us-card-icon">
                          <Image
                            src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/68e51aa310530dbf53f8f4c2_email-black.svg"
                            alt="icon"
                            width={20}
                            height={20}
                            className="image-22 menu-contact-us-card-icon-img"
                          />
                        </div>
                        <Link
                          href={`mailto:${serviceSidebarContactEmail}`}
                          className="link-2 menu-contact-us-card-link"
                        >
                          Talk To Sales{" "}
                          <span className="menu-contact-us-card-link-info menu-contact-us-card-link-info-header">
                            {serviceSidebarContactEmail}
                          </span>
                        </Link>
                      </div>
                    </div>
                    <figure className="menu-contact-wrap">
                      <Link
                        href={serviceSidebarContactLink}
                        className="w-inline-block"
                      >
                        <Image
                          loading="lazy"
                          src={serviceSidebarImageUrl}
                          alt=""
                          width={280}
                          height={160}
                          className="menu-contact-wrap-image"
                          unoptimized={serviceSidebarImageUnoptimized}
                        />
                      </Link>
                    </figure>
                  </div>
                </div>
              </nav>
            </div>

            {/* Mobile Industries */}
            <div
              className={`dropdown ${mobileDropdowns.industries ? "w--open" : ""}`}
            >
              <button
                type="button"
                className="dropdown-toggle w-dropdown-toggle"
                onClick={() => toggleMobileDropdown("industries")}
              >
                <svg
                  className="nav-dropdown-icon w-icon-dropdown-toggle"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
                <div className="link-text-wrap">
                  <p className="nav-item-title">Who we serve</p>
                </div>
                <div className="nav-hover" />
              </button>
              <nav
                className={`nav-dropdown-list w-dropdown-list ${mobileDropdowns.industries ? "w--open" : ""}`}
              >
                <div className="nav-dropdown-column">
                  <div className="nav-dropdown-link-wrapper nav-dropdown-link-wrapper-single">
                    <ul
                      role="list"
                      className="menu-service-list menu-service-list-single"
                    >
                      {displayIndustries.map((ind, i) => (
                        <li
                          key={i}
                          className="menu-service-list-item menu-service-list-item-single"
                        >
                          <Link
                            href={ind.href}
                            className="menu-service-list-card w-inline-block"
                          >
                            <Image
                              src={ind.icon}
                              alt="icon"
                              width={24}
                              height={24}
                              className="menu-service-list-icon"
                              unoptimized={ind.isLocalIcon}
                            />
                            <p className="menu-service-list-title">
                              <strong className="bold-text-2">
                                {ind.title}
                              </strong>
                              Tailored solutions to boost your business growth
                              in the new market of technology.
                            </p>
                            <Image
                              src="https://res.cloudinary.com/dsoilebvu/image/upload/v1777048244/arrow_kaivth.svg"
                              alt="icon"
                              width={16}
                              height={16}
                              className="menu-service-list-arrow-icon"
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </nav>
            </div>

            {/* Mobile Our Approach */}
            <div
              className={`dropdown mega-menu-wrap-dropdown ${mobileDropdowns.approach ? "w--open" : ""}`}
            >
              <button
                type="button"
                className="dropdown-toggle w-dropdown-toggle"
                onClick={() => toggleMobileDropdown("approach")}
              >
                <svg
                  className="nav-dropdown-icon w-icon-dropdown-toggle"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
                <div className="link-text-wrap">
                  <p className="nav-item-title">Our approach</p>
                </div>
                <div className="nav-hover" />
              </button>
              <nav
                className={`mega-menu-wrap w-dropdown-list ${mobileDropdowns.approach ? "w--open" : ""}`}
              >
                <div className="mega-menu-container">
                  <ul
                    role="list"
                    className="menu-service-list menu-service-list-single"
                  >
                    {displayApproaches.map((a, i) => (
                      <li
                        key={i}
                        className="menu-service-list-item menu-service-list-item-single"
                      >
                        <Link
                          href={a.href}
                          className="menu-service-list-card w-inline-block"
                        >
                          <Image
                            src={a.icon}
                            alt="icon"
                            width={24}
                            height={24}
                            className="menu-service-list-icon"
                            unoptimized={a.isLocalIcon}
                          />
                          <p className="menu-service-list-title">
                            <strong className="bold-text-2">{a.title}</strong>
                            {a.desc}
                          </p>
                          <Image
                            src="https://res.cloudinary.com/dsoilebvu/image/upload/v1777048244/arrow_kaivth.svg"
                            alt="icon"
                            width={16}
                            height={16}
                            className="menu-service-list-arrow-icon"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>
            </div>

            {/* Mobile Our Solutions - matching unintegrated tab structure */}
            <div
              className={`dropdown mega-menu-wrap-dropdown ${mobileDropdowns.hire ? "w--open" : ""}`}
            >
              <button
                type="button"
                className="dropdown-toggle w-dropdown-toggle"
                onClick={() => toggleMobileDropdown("hire")}
              >
                <svg
                  className="nav-dropdown-icon w-icon-dropdown-toggle"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
                <div className="link-text-wrap">
                  <p className="nav-item-title">Our Solutions</p>
                </div>
                <div className="nav-hover" />
              </button>
              <nav
                className={`mega-menu-wrap w-dropdown-list ${mobileDropdowns.hire ? "w--open" : ""}`}
              >
                <div className="mega-menu-container">
                  <div className="mega_menu-tab-wrap w-tabs">
                    <div className="mega_menu-tab-items w-tab-menu">
                      {solutionCategories.map((tab, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setActiveHireTab(i)}
                          className={`mega_menu-tab-item w-inline-block w-tab-link ${activeHireTab === i ? "w--current" : ""}`}
                        >
                          <div className="menu-tab-card">
                            <Image
                              src={tab.icon}
                              alt="icon"
                              width={24}
                              height={24}
                              className="menu-service-list-icon"
                              unoptimized={tab.isLocalIcon}
                            />
                            <Image
                              src="https://res.cloudinary.com/dsoilebvu/image/upload/v1777048244/arrow_kaivth.svg"
                              alt="icon"
                              width={16}
                              height={16}
                              className="menu-service-list-arrow-icon"
                            />
                            <p className="menu-service-list-title">
                              <strong className="bold-text-2 mb-0">
                                {tab.label}
                              </strong>
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="tabs-content-3 w-tab-content">
                      <div className="w-tab-pane w--tab-active">
                        <div className="menu-approach-list">
                          <ul role="list" className="menu-service-list">
                            {solutionCategories[activeHireTab]?.items.map(
                              (item, i) => (
                                <li key={i} className="menu-service-list-item">
                                  <Link
                                    href="/contact-us"
                                    className="menu-service-list-card w-inline-block"
                                  >
                                    <Image
                                      src="https://res.cloudinary.com/dsoilebvu/image/upload/v1777048244/arrow_kaivth.svg"
                                      alt="icon"
                                      width={16}
                                      height={16}
                                      className="menu-service-list-arrow-icon"
                                    />
                                    <p className="menu-service-list-title">
                                      <strong className="bold-text-2">
                                        {item.title}
                                      </strong>
                                      {item.desc}
                                    </p>
                                  </Link>
                                </li>
                              ),
                            )}
                          </ul>
                        </div>
                        <Link
                          href="/contact-us"
                          className="contact-us-link w-inline-block"
                        >
                          <div className="menu-contact-us-info">
                            <Image
                              src="https://res.cloudinary.com/dsoilebvu/image/upload/v1777048239/qa_gfbujp.svg"
                              alt="image"
                              width={24}
                              height={24}
                              className="menu-service-list-icon"
                            />
                            <p className="menu-service-list-title">
                              <strong className="bold-text-2">
                                Contact Us
                              </strong>
                              {solutionSidebarDescription}
                            </p>
                            <Image
                              src="https://res.cloudinary.com/dsoilebvu/image/upload/v1777048244/arrow_kaivth.svg"
                              alt="icon"
                              width={16}
                              height={16}
                              className="menu-service-list-arrow-icon"
                            />
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </div>

            <Link
              href="/insights"
              target="_blank"
              className="nav-link w-nav-link"
            >
              Insights
            </Link>
            <Link
              href="https://portal.greaterworks.tech/company/careers"
              target="_blank"
              className="nav-link w-nav-link"
            >
              Careers
            </Link>
            <div className="div-block-3 contact-us">
              <Link href="/contact-us" className="link-block w-inline-block">
                <div className="div-block-4">
                  <Image
                    loading="lazy"
                    src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/68e51aa310530dbf53f8f4c2_email-black.svg"
                    alt="icon"
                    width={20}
                    height={20}
                    className="image-7"
                  />
                </div>
                <div className="button-text">
                  <span className="text-span-7">Contact Us</span> Get in Touch
                </div>
              </Link>
            </div>
          </nav>
          <button
            type="button"
            className="menu-button-2 w-nav-button"
            aria-expanded={mobileOpen}
            aria-label="menu"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {!isHomepage && !scrolled ? (
              <HiMenu size={28} color="black" className="menu-button-icon" />
            ) : (
              <HiMenu size={28} color="white" className="menu-button-icon" />
            )}
            <Image
              alt="icon"
              src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/68ff282557646735ec3746f4_close.svg"
              width={24}
              height={24}
              className="menu-button-icon-open"
            />
            <div className="icon w-icon-nav-menu" />
          </button>
        </div>
      </div>
      <style>{`
                .arrows-container.cta:has(.nav-icon-dark) {
                    display: flex;
                    align-items: center;
                }
                .nav-link.nav-title-white,
                .nav-item-title.nav-title-white {
                    color: #fff !important;
                }
                .navbar-2 {
                    position: sticky;
                    top: 0;
                    width: 100%;
                    z-index: 1100;
                }
                .navbar-2.navbar-dark-text .nav-item-title.nav-title-white,
                .navbar-2.navbar-dark-text .nav-link.nav-title-white {
                    color: #666 !important;
                }
                .navbar-2.navbar-dark-text .nav-dropdown-icon-white {
                    color: #666 !important;
                }
                .navbar-2.navbar-dark-text .button-secondary-light.nav-btn {
                    background: rgba(0, 0, 0, 0.1);
                    border: 1px solid rgba(0, 0, 0, 0.2);
                }
                .navbar-2.navbar-dark-text .button-secondary-light-text-3.nav-btn {
                    color: #666 !important;
                }
                .navbar-2.navbar-dark-text .nav-icon-dark {
                    filter: none !important;
                }
                .navbar-2.scrolled {
                    background: rgba(17, 24, 39, 0.78) !important;
                    backdrop-filter: blur(20px) saturate(180%) !important;
                    -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18) !important;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.12) !important;
                }
                .navbar-2.scrolled .nav-item-title.nav-title-white,
                .navbar-2.scrolled .nav-link.nav-title-white {
                    color: #fff !important;
                }
                .navbar-2.scrolled .nav-dropdown-icon-white {
                    color: #fff !important;
                }
                .navbar-2.scrolled .button-secondary-light.nav-btn {
                    background: #000;
                    border: 1px solid #000;
                }
                .navbar-2.scrolled .button-secondary-light.nav-btn .button-secondary-light-text-3 {
                    color: #fff !important;
                }
                .navbar-2.scrolled .button-secondary-light.nav-btn .nav-icon-dark {
                    filter: brightness(0) invert(1);
                }
                .nav-menu-wrapper-responsive .nav-link,
                .nav-menu-wrapper-responsive nav .nav-link {
                    padding-left: 10px !important;
                    margin-left: 0 !important;
                    display: block;
                    width: 100%;
                }
                                .header-contact-us .button-secondary-light.nav-btn:hover {
                    background: rgba(255, 255, 255, 0.1) !important;
                    border-color: rgba(255, 255, 255, 0.16) !important;
                }
                .header-contact-us .button-secondary-light.nav-btn:hover .button-secondary-light-text-3.nav-btn {
                    color: #fff !important;
                }
                .header-contact-us .button-secondary-light.nav-btn:hover .nav-icon-dark {
                    filter: brightness(0) invert(1);
                }
                .dropdown {
                    position: relative;
                    display: inline-block;
                }
                .dropdown .w-dropdown-list {
                    display: block !important;
                    opacity: 0;
                    visibility: hidden;
                    transition:
                        opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1),
                        visibility 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                    pointer-events: none;
                    will-change: opacity, visibility;
                    z-index: 999;
                    min-width: 400px;
                    padding: 40px;
                    border-radius: 8px;
                }
                .dropdown.w--open .w-dropdown-list {
                    opacity: 1 !important;
                    visibility: visible !important;
                    pointer-events: auto;
                }
                .dropdown .nav-dropdown-icon {
                    width: 20px;
                    height: 20px;
                }
                .dropdown-toggle {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    cursor: default;
                }
                .mega-menu-wrap {
                    max-height: none;
                    overflow: visible;
                }
                .menu-service-list-card {
                    transition: background-color 0.2s ease;
                }
                .menu-service-list-card:hover {
                    background-color: rgba(255, 255, 255, 0.05);
                }
                .menu-service-list-arrow-icon {
                    transition: opacity 0.2s ease;
                }
                .menu-service-list-card:hover .menu-service-list-arrow-icon {
                    opacity: 1;
                }
                /* menu-contact-us-card-link hover effect removed */
                @media (max-width: 767px) {
                    .button-icon.service-listing-icon-white {
                        right: 0;
                    }
                    .services-listing-item:active,
                    .services-listing-item:hover {
                        background-color: transparent !important;
                    }
                    .services-listing-item:active .services-listing-title,
                    .services-listing-item:hover .services-listing-title {
                        color: #828282 !important;
                    }
                }
                @media (min-width: 992px) {
                    .nav-menu-wrapper.hidden-responsive {
                        display: flex !important;
                    }
                    .nav-menu-wrapper-responsive {
                        display: none !important;
                    }
                }
                .mobile-nav-backdrop {
                    position: fixed;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.4);
                    z-index: 998;
                }
                @media (max-width: 991px) {
                    .nav-menu-wrapper.hidden-responsive {
                        display: none !important;
                    }
                    .nav-menu-wrapper-responsive {
                        display: flex !important;
                        align-items: center;
                        justify-content: space-between;
                        width: 100%;
                        position: relative;
                        z-index: 1002;
                    }
                    /* Override global CSS that hides mobile menu */
                    .navbar-2[data-collapse="medium"] .nav-menu-wrapper-responsive .nav-menu-2 {
                        display: flex !important;
                    }
                    /* Full-width panel slides down from the top */
                    .nav-menu-wrapper-responsive .nav-menu-2 {
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: auto;
                        width: 100%;
                        max-width: 100%;
                        max-height: 100vh;
                        max-height: 100dvh;
                        height: auto;
                        min-height: 0;
                        background: #ffffff;
                        z-index: 1000;
                        flex-direction: column;
                        align-items: flex-start !important;
                        justify-content: flex-start !important;
                        padding: max(72px, calc(env(safe-area-inset-top, 0px) + 56px)) 20px
                            max(32px, env(safe-area-inset-bottom, 0px));
                        overflow-y: auto;
                        overflow-x: hidden;
                        -webkit-overflow-scrolling: touch;
                        transform: translateY(-100%);
                        transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
                        display: flex;
                        gap: 0;
                        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
                        border-bottom-left-radius: 12px;
                        border-bottom-right-radius: 12px;
                    }
                    .nav-menu-wrapper-responsive .nav-menu-2.w--nav-menu-open {
                        transform: translateY(0);
                    }
                    .nav-menu-wrapper-responsive .menu-button-2 {
                        position: relative;
                        z-index: 1002;
                        background: none;
                        border: none;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 8px;
                    }
                    .menu-button-icon-open {
                        display: none;
                    }
                    .menu-button-2[aria-expanded="true"] .menu-button-icon {
                        display: none;
                    }
                    .menu-button-2[aria-expanded="true"] .menu-button-icon-open {
                        display: block;
                    }
                    .nav-menu-wrapper-responsive .dropdown {
                        display: block;
                        width: 100%;
                    }
                    .nav-menu-wrapper-responsive .dropdown-toggle {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        width: 100%;
                        padding: 14px 0;
                        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
                        cursor: pointer;
                        background: none;
                        border-left: none;
                        border-right: none;
                        border-top: none;
                    }
                    .nav-menu-wrapper-responsive .w-dropdown-list {
                        position: static !important;
                        display: block !important;
                        opacity: 1 !important;
                        visibility: visible !important;
                        transform: none !important;
                        pointer-events: auto;
                        min-width: unset;
                        box-shadow: none;
                        background: transparent;
                        max-height: 0;
                        overflow: hidden;
                        transition:
                            max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                            padding 0.35s cubic-bezier(0.4, 0, 0.2, 1);
                        padding: 0;
                    }
                    .nav-menu-wrapper-responsive .dropdown.w--open .w-dropdown-list {
                        max-height: min(3200px, 92vh);
                        padding: 8px 0 16px;
                    }
                    .nav-menu-wrapper-responsive .dropdown.w--open .nav-dropdown-icon {
                        transform: rotate(180deg);
                    }
                    .nav-menu-wrapper-responsive .mega-menu-wrap {
                        width: 100%;
                    }
                    .nav-menu-wrapper-responsive .mega-menu-container {
                        flex-direction: column;
                    }
                    .nav-menu-wrapper-responsive .nav-dropdown-column.menu-left-side {
                        width: 100%;
                    }
                    .nav-menu-wrapper-responsive .menu-right-side {
                        display: none;
                    }
                    .nav-menu-wrapper-responsive .mega_menu-tab-wrap {
                        flex-direction: column;
                    }
                    .nav-menu-wrapper-responsive .mega_menu-tab-items {
                        display: flex;
                        flex-direction: row;
                        gap: 8px;
                        overflow-x: auto;
                        margin-bottom: 12px;
                        padding-bottom: 4px;
                        -webkit-overflow-scrolling: touch;
                    }
                    .nav-menu-wrapper-responsive .mega_menu-tab-items::-webkit-scrollbar {
                        display: none;
                    }
                    .nav-menu-wrapper-responsive .mega_menu-tab-item {
                        white-space: nowrap;
                        flex-shrink: 0;
                    }
                    .nav-menu-wrapper-responsive .nav-link {
                        display: block;
                        padding: 14px 0;
                        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
                        text-align: left !important;
                    }
                    .nav-menu-wrapper-responsive .div-block-3.contact-us {
                        margin-top: 16px;
                        justify-content: flex-start !important;
                        align-items: flex-start !important;
                        padding: 14px 0;
                        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
                    }
                }
                @media only screen and (min-width: 992px) and (max-width: 1280px) {
                    .nav-menu-wrapper .header-logo {
                        padding-right: 15px;
                    }
                    .nav-menu-2 .dropdown {
                        margin: 0 5px;
                    }
                    .nav-menu-wrapper .nav-link,
                    .nav-menu-wrapper .nav-item-title {
                        font-size: 14px;
                    }
                }
            `}</style>
    </div>
  );
}