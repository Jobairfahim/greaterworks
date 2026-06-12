"use client";

import { fetchGDPRPolicyData } from "@/lib/api";
import { PrivacyPolicyData } from "@/types/privacy-policy";
import { Metadata } from "next";
import { useEffect, useState } from "react";

const defaultPrivacyContent = {
  title: "GDPR Policy",
  description:
    "At Greater Works Technologies, we are committed to protecting the privacy of our website users. This GDPR policy explains how we collect, use, and protect the personal data of our users in accordance with the General Data Protection Regulation (GDPR).",
  details: `<section className="section privacy-policy-section">
        <div className="w-layout-blockcontainer container-v2 w-container">
          <div className="ck-content ck-editor__editable privacy-ck-wrapper">
            <div className="privacy-content-wrap">
              
             
              <div className="privacy-content">
                <div className="privacy-content-title">
                  <strong>What personal data do we collect?</strong>
                </div>
                <p className="privacy-content-description">
                  We collect the following types of personal data from our website users:
                </p>
                <ul className="privacy-content-description" style={{ listStyleType: "disc", paddingLeft: "24px", marginTop: "10px" }}>
                  <li>Contact information, such as name, email address, and phone number</li>
                  <li>Demographic information, such as age and gender</li>
                  <li>IP address and browser information</li>
                  <li>Any other personal data that you choose to provide to us through our website or other channels</li>
                </ul>
              </div>

              
              <div className="privacy-content">
                <div className="privacy-content-title">
                  <strong>How do we use your personal data?</strong>
                </div>
                <p className="privacy-content-description">
                  We use the personal data that we collect from our website users for the following purposes:
                </p>
                <ul className="privacy-content-description" style={{ listStyleType: "disc", paddingLeft: "24px", marginTop: "10px" }}>
                  <li>To respond to inquiries and requests for information</li>
                  <li>To provide updates and news about our products and services</li>
                  <li>To analyze website usage and improve our services</li>
                  <li>To send marketing materials, if you have opted in to receive them</li>
                </ul>
              </div>

        
              <div className="privacy-content">
                <div className="privacy-content-title">
                  <strong>How do we protect your personal data?</strong>
                </div>
                <p className="privacy-content-description">
                  We take the protection of your personal data seriously and have implemented appropriate technical and organizational measures to ensure the security of your personal data. These measures include:
                </p>
                <ul className="privacy-content-description" style={{ listStyleType: "disc", paddingLeft: "24px", marginTop: "10px" }}>
                  <li>Encrypting data in transit and at rest</li>
                  <li>Implementing secure servers and firewalls</li>
                  <li>Restricting access to personal data to authorized personnel only</li>
                </ul>
              </div>

              
              <div className="privacy-content">
                <div className="privacy-content-title">
                  <strong>Your rights under GDPR</strong>
                </div>
                <p className="privacy-content-description">
                  Under GDPR, you have the following rights with respect to your personal data:
                </p>
                <ul className="privacy-content-description" style={{ listStyleType: "disc", paddingLeft: "24px", marginTop: "10px" }}>
                  <li>The right to be informed about the collection and use of your personal data</li>
                  <li>The right of access to your personal data</li>
                  <li>The right to rectification of your personal data</li>
                  <li>The right to erasure of your personal data (also known as the “right to be forgotten”)</li>
                  <li>The right to restrict processing of your personal data</li>
                  <li>The right to data portability</li>
                  <li>The right to object to the processing of your personal data</li>
                  <li>The right not to be subject to automated decision-making, including profiling</li>
                </ul>
                <p className="privacy-content-description" style={{ marginTop: "15px" }}>
                  If you would like to exercise any of these rights, please contact us using the contact information provided below.
                </p>
              </div>

            
              <div className="privacy-content">
                <div className="privacy-content-title">
                  <strong>Contact us</strong>
                </div>
                <p className="privacy-content-description">
                  If you have any questions about this GDPR policy or our handling of your personal data, please contact us at:
                </p>
                <ul className="privacy-content-description" style={{ listStyleType: "none", paddingLeft: "0", marginTop: "10px" }}>
                  <li style={{ marginBottom: "6px" }}><strong>Email:</strong> <a href="mailto:support@greaterworks.tech" style={{ textDecoration: "underline", color: "inherit" }}>support@greaterworks.tech</a></li>
                  <li><strong>Phone:</strong> <a href="tel:+233322499177" style={{ textDecoration: "underline", color: "inherit" }}>+233322499177</a></li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </section>`,
  tag: "2026-01-01",
};

export default function GDPRPolicyPage() {
  const [policyData, setPolicyData] = useState<PrivacyPolicyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPolicyData = async () => {
      try {
        const data = await fetchGDPRPolicyData();
        setPolicyData(data);
      } catch (error) {
        console.error("Failed to load GDPR policy data:", error);
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
          <div className="ck-content ck-editor__editable privacy-ck-wrapper">
            {policy.details && (
              <div
                className="  ck-content"
                dangerouslySetInnerHTML={{ __html: policy.details }}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
