"use client";

import Link from "next/link";

export default function FloatingCTA() {
    return (
        <>
            <Link href="/contact-us" className="floating-cta" aria-label="Talk to us">
                <span className="floating-cta__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3.5" y="5.5" width="17" height="15" rx="3" />
                        <path d="M8 3.5v4" />
                        <path d="M16 3.5v4" />
                        <path d="M3.5 9.5h17" />
                    </svg>
                </span>
                <span className="floating-cta__text">Talk To Us</span>
            </Link>

            <style>{`
                .floating-cta {
                    position: fixed;
                    right: 24px;
                    bottom: 24px;
                    z-index: 950;
                    display: inline-flex;
                    align-items: center;
                    gap: 14px;
                    min-width: 154px;
                    padding: 16px 24px;
                    border-radius: 999px;
                    background: linear-gradient(135deg, #a855f7 0%, #7e22ce 100%);
                    color: #fff;
                    box-shadow: 0 16px 32px rgba(126, 34, 206, 0.32);
                    text-decoration: none;
                    transition:
                        transform 0.25s ease,
                        box-shadow 0.25s ease,
                        background 0.25s ease;
                }

                .floating-cta:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 22px 38px rgba(126, 34, 206, 0.4);
                    background: linear-gradient(135deg, #9333ea 0%, #6b21a8 100%);
                    color: #fff;
                }

                .floating-cta__icon {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 24px;
                    height: 24px;
                    flex-shrink: 0;
                }

                .floating-cta__icon svg {
                    width: 24px;
                    height: 24px;
                }

                .floating-cta__text {
                    font-family: "DM Sans", sans-serif;
                    font-size: 16px;
                    font-weight: 700;
                    line-height: 1;
                    letter-spacing: -0.02em;
                }

                @media (max-width: 767px) {
                    .floating-cta {
                        right: 16px;
                        bottom: 16px;
                        gap: 12px;
                        min-width: auto;
                        padding: 14px 20px;
                    }

                    .floating-cta__text {
                        font-size: 16px;
                    }
                }
            `}</style>
        </>
    );
}
