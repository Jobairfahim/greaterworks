"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Preloader() {
    const [hidden, setHidden] = useState(false);
    const [isNavigation, setIsNavigation] = useState(false);
    const preloaderRef = useRef<HTMLDivElement>(null);
    const svgPathRef = useRef<SVGPathElement>(null);
    const logoTextRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.body.classList.add("loading");

        const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
        const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

        const tl = gsap.timeline({
            delay: 0.3,
            onComplete: () => {
                document.body.classList.remove("loading");
                setHidden(true);
            },
        });

        if (logoTextRef.current) {
            tl.to(logoTextRef.current, {
                delay: 0.6,
                y: -100,
                opacity: 0,
                duration: 0.5,
                ease: "power2.inOut",
            });
        }

        if (svgPathRef.current) {
            tl.to(
                svgPathRef.current,
                {
                    duration: 0.5,
                    attr: { d: curve },
                    ease: "power2.in",
                },
                "-=0.2"
            );
            tl.to(svgPathRef.current, {
                duration: 0.5,
                attr: { d: flat },
                ease: "power2.out",
            });
        }

        if (preloaderRef.current) {
            tl.to(preloaderRef.current, {
                y: -1500,
                duration: 0.8,
                ease: "power2.inOut",
            });
            tl.set(preloaderRef.current, {
                zIndex: -1,
                display: "none",
            });
        }

        // Add navigation click detection
        const handleNavigationClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const link = target.closest('a');
            
            if (link && 
                link.href && 
                link.href !== window.location.href &&
                !link.href.includes('mailto:') &&
                !link.href.includes('tel:') &&
                !link.href.includes('#') &&
                link.hostname === window.location.hostname) {
                
                // Prevent default navigation temporarily
                e.preventDefault();
                
                // Show preloader for navigation
                setHidden(false);
                setIsNavigation(true);
                document.body.classList.add("loading");
                
                // Navigate after showing preloader
                setTimeout(() => {
                    window.location.href = link.href;
                }, 800);
            }
        };

        document.addEventListener('click', handleNavigationClick);
        
        return () => {
            document.removeEventListener('click', handleNavigationClick);
        };
    }, []);

    if (hidden) return null;

    return (
        <>
            <div ref={preloaderRef} className="preloader amt-loading">
                <div className="loader-svg">
                    <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
                        <path
                            ref={svgPathRef}
                            id="svg"
                            d="M0 971.8326S175 947.3259 500 947.3259s500 19.8363 500 19.8363V0H0Z"
                        />
                    </svg>
                </div>
                <div ref={logoTextRef} className="logo-text-wrapper">
                    <div className="logo-text-inner">
                        {"Greater Works Technologies".split("").map((char, i) => (
                            <div key={i} className="logo-text-span">
                                {char}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <style>{`
                html.wf-design-mode .preloader {
                    display: none;
                }
                .loader-svg:before,
                .loader-svg:after {
                    content: none;
                }
                .loader-svg svg {
                    position: absolute;
                    top: 0;
                    width: 100%;
                    height: 110vh;
                    fill: #121212;
                }
                .logo-text-inner .logo-text-span {
                    -webkit-animation: loading 1s infinite alternate;
                    animation: loading 1s infinite alternate;
                    display: inline-block;
                }
                .logo-text-inner .logo-text-span:nth-child(2) {
                    -webkit-animation-delay: 0.1s;
                    animation-delay: 0.1s;
                }
                .logo-text-inner .logo-text-span:nth-child(3) {
                    -webkit-animation-delay: 0.2s;
                    animation-delay: 0.2s;
                }
                .logo-text-inner .logo-text-span:nth-child(4) {
                    -webkit-animation-delay: 0.3s;
                    animation-delay: 0.3s;
                }
                .logo-text-inner .logo-text-span:nth-child(5) {
                    -webkit-animation-delay: 0.4s;
                    animation-delay: 0.4s;
                }
                .logo-text-inner .logo-text-span:nth-child(6) {
                    -webkit-animation-delay: 0.5s;
                    animation-delay: 0.5s;
                }
                .logo-text-inner .logo-text-span:nth-child(7) {
                    -webkit-animation-delay: 0.6s;
                    animation-delay: 0.6s;
                }
                .logo-text-inner .logo-text-span:nth-child(8) {
                    -webkit-animation-delay: 0.7s;
                    animation-delay: 0.7s;
                }
                .logo-text-inner .logo-text-span:nth-child(9) {
                    -webkit-animation-delay: 0.8s;
                    animation-delay: 0.8s;
                }
                .logo-text-inner .logo-text-span:nth-child(10) {
                    -webkit-animation-delay: 0.9s;
                    animation-delay: 0.9s;
                }
                body:has(.preloader.amt-loading) {
                    overflow: hidden;
                }
                body:has(.preloader.amt-loading[style*="display: none"]) {
                    overflow: auto;
                }
                @keyframes loading {
                    0% {
                        opacity: 1;
                    }
                    100% {
                        opacity: 0;
                    }
                }
                @media (max-width: 768px) {
                    .logo-text-inner {
                        font-size: clamp(16px, 5vw, 32px);
                        gap: 2px;
                    }
                    .logo-text-wrapper {
                        padding: 15px;
                    }
                }
                @media (max-width: 480px) {
                    .logo-text-inner {
                        font-size: clamp(18px, 5vw, 36px);
                        gap: 1px;
                    }
                    .logo-text-wrapper {
                        padding: 10px;
                    }
                }
            `}</style>
        </>
    );
}
