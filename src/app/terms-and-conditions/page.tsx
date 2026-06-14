"use client";

import { useEffect, useState } from "react";
import { fetchTermsAndConditionData } from "@/lib/api";
import { TermsAndConditionData } from "@/types/terms-and-condition";

const defaultTermsContent = {
  title: "Terms and Conditions",
  description:
    "Welcome to GreaterWorks. These Terms and Conditions govern your use of the GreaterWorks website and any services provided by us. By accessing or using our website, you agree to comply with and be bound by these Terms and Conditions.",
  details: `<div class="privacy-content">
    <div class="privacy-content-title"><strong>1. Definitions</strong></div>
    <p>For the purpose of these Terms and Conditions, the following definitions apply.</p>
  </div>`,
  tag: "2026-01-01",
};

export default function TermsAndConditionsPage() {
  const [termsData, setTermsData] = useState<TermsAndConditionData | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTermsData = async () => {
      try {
        const data = await fetchTermsAndConditionData();
        setTermsData(data);
      } catch (error) {
        console.error("Failed to load terms and conditions data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTermsData();
  }, []);

  if (loading) {
    return (
      <div className="section privacy-policy-banner">
        <div className="w-container">Loading...</div>
      </div>
    );
  }

  const terms = termsData || defaultTermsContent;

  return (
    <>
      {/* ── TERMS AND CONDITIONS BANNER ───────────────────────────────────────── */}
      <section className="section privacy-policy-banner">
        <div className="w-layout-blockcontainer container-v2 w-container">
          <div className="section-head section-head-two privacy-head">
            <div className="section-head-content-subtitle privacy-page">
              <div className="section-head-subtitle-dot" />
              <p className="section-head-subtitle-content subtitle-secondary-content">
                {terms?.tag}
              </p>
            </div>
            <div
              id="w-node-_7621ded6-f804-b825-f4d0-1349017d52d0-f971dcdd"
              className="title title-two faq-title"
            >
              <h2 className="title-h2-2 title-h2-two">{terms.title}</h2>
              <p className="section-title-description privacy-description">
                {terms.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TERMS AND CONDITIONS CONTENT ──────────────────────────────────────── */}
      <section className="section privacy-policy-section">
        <div className="w-layout-blockcontainer container-v2 w-container">
          <div className="privacy-content-wrap">
            {terms.details && (
              <div className="content-wrapper rich-text ck-content" dangerouslySetInnerHTML={{ __html: terms.details }} />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
