"use client";

import { useEffect, useState } from "react";
import { fetchPrivacyPolicyData } from "@/lib/api";
import { PrivacyPolicyData } from "@/types/privacy-policy";
 // ✅ REQUIRED

const defaultPrivacyContent = {
  title: "Privacy Policy",
  description:
    "At GreaterWorks, we value your trust and are committed to protecting your privacy. This Privacy Policy explains how GreaterWorks collect, use, store, and safeguard your information when you visit our website or interact with our services.",
  details: `<div class="privacy-content">
    <div class="privacy-content-title"><strong>1. Information We Collect</strong></div>
    <p>We may collect personal information that you choose to share with us, including but not limited to your name, email address, phone number, and company details.</p>
  </div>`,
  tag: "2026-01-01",
};

export default function PrivacyPolicyPage() {
  const [policyData, setPolicyData] = useState<PrivacyPolicyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPolicyData = async () => {
      try {
        const data = await fetchPrivacyPolicyData();
        setPolicyData(data);
      } catch (error) {
        console.error("Failed to load privacy policy data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPolicyData();
  }, []);
  if (loading) {
    return (
      <div className="section privacy-policy-banner">
        <div className="w-container">Loading...</div>
      </div>
    );
  }

  const policy = policyData || defaultPrivacyContent;



  return (
    <>
      {/* BANNER */}
      <section className="section privacy-policy-banner">
        <div className="w-layout-blockcontainer container-v2 w-container">
          <div className="section-head section-head-two privacy-head">
            <div className="section-head-content-subtitle privacy-page">
              <div className="section-head-subtitle-dot" />
              <p className="section-head-subtitle-content subtitle-secondary-content">
                  {policy?.tag}
              </p>
            </div>

            <div className="title title-two faq-title">
              <h2 className="title-h2-2 title-h2-two">{policy.title}</h2>
              <p className="section-title-description privacy-description">
                {policy.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="section privacy-policy-section">
        <div className="w-layout-blockcontainer container-v2 w-container">

          {/* IMPORTANT WRAPPER FIX */}
          <div
          className="ck-content ck-editor__editable privacy-ck-wrapper"
          >
            {policy.details && (
              <div 
              className="  ck-content" 
              dangerouslySetInnerHTML={{ __html: policy.details }} />
            )}
          </div>

        </div>
      </section>
    </>
  );
}