import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* ── PRIVACY POLICY BANNER ───────────────────────────────────────── */}
      <section className="section privacy-policy-banner">
        <div className="w-layout-blockcontainer container-v2 w-container">
          <div className="section-head section-head-two privacy-head">
            <div className="section-head-content-subtitle privacy-page">
              <div className="section-head-subtitle-dot" />
              <p className="section-head-subtitle-content subtitle-secondary-content">
                Last updated: January 01, 2026
              </p>
            </div>
            <div
              id="w-node-_7621ded6-f804-b825-f4d0-1349017d52d0-f971dcdd"
              className="title title-two faq-title"
            >
              <h2 className="title-h2-2 title-h2-two">Privacy Policy</h2>
              <p className="section-title-description privacy-description">
                At <strong>GreaterWorks</strong>, we value your trust and are committed to protecting
                your privacy. This Privacy Policy explains how <strong>GreaterWorks</strong>{" "}
                (&quot;GreaterWorks&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) collect,
                use, store, and safeguard your information when you visit our website or interact
                with our services. By using our website, you agree to the practices described in
                this policy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRIVACY POLICY CONTENT ──────────────────────────────────────── */}
      <section className="section privacy-policy-section">
        <div className="w-layout-blockcontainer container-v2 w-container">
          <div className="privacy-content-wrap">

            {/* 1 */}
            <div className="privacy-content">
              <div className="privacy-content-title">
                <strong className="bold-text-6">1. Information We Collect</strong>
              </div>
              <p className="privacy-content-description">
                We may collect personal information that you choose to share with us, including but
                not limited to:
              </p>
              <ul role="list" className="list-8">
                <li>
                  <p className="privacy-list-description">
                    Your name, email address, phone number, and company details
                  </p>
                </li>
                <li>
                  <p className="privacy-list-description">
                    Information submitted through contact forms, inquiry forms, or job applications
                  </p>
                </li>
                <li>
                  <p className="privacy-list-description">
                    Any details you provide when communicating with us via email or other channels
                  </p>
                </li>
              </ul>
              <p className="privacy-content-description">
                In addition, certain non-personal information may be collected automatically, such as
                browser type, device information, IP address, and website usage data.
              </p>
            </div>

            {/* 2 */}
            <div className="privacy-content">
              <div className="privacy-content-title">
                <strong className="bold-text-6">2. How We Use Your Information</strong>
              </div>
              <p className="privacy-content-description">
                The information we collect is used to:
              </p>
              <ul role="list" className="list-8">
                <li>
                  <p className="privacy-list-description">
                    Respond to your inquiries and communicate with you
                  </p>
                </li>
                <li>
                  <p className="privacy-list-description">Provide and improve our services</p>
                </li>
                <li>
                  <p className="privacy-list-description">
                    Review job applications and recruitment submissions
                  </p>
                </li>
                <li>
                  <p className="privacy-list-description">
                    Maintain and enhance website performance and user experience
                  </p>
                </li>
                <li>
                  <p className="privacy-list-description">
                    Analyze usage trends and visitor behavior
                  </p>
                </li>
                <li>
                  <p className="privacy-list-description">
                    Meet legal and regulatory obligations
                  </p>
                </li>
              </ul>
              <p className="privacy-content-description">
                We only use your information for purposes that are relevant and necessary.
              </p>
            </div>

            {/* 3 */}
            <div className="privacy-content">
              <div className="privacy-content-title">
                <strong className="bold-text-6">3. Cookies and Similar Technologies</strong>
              </div>
              <p className="privacy-content-description">
                Our website uses cookies and similar tracking technologies to improve functionality
                and user experience. Cookies help us understand how visitors interact with our site
                and allow us to remember preferences for future visits.
              </p>
              <p className="privacy-content-description">
                You can control or disable cookies through your browser settings. Please note that
                disabling cookies may affect certain features of the website.
              </p>
            </div>

            {/* 4 */}
            <div className="privacy-content">
              <div className="privacy-content-title">
                <strong className="bold-text-6">4. Use of Third-Party Services</strong>
              </div>
              <p className="privacy-content-description">
                We may use trusted third-party tools such as analytics providers to better
                understand website usage and performance. These third parties may collect information
                in accordance with their own privacy policies. <strong>GreaterWorks</strong> does not
                control how third-party services handle your data.
              </p>
            </div>

            {/* 5 */}
            <div className="privacy-content">
              <div className="privacy-content-title">
                <strong className="bold-text-6">5. Sharing and Disclosure of Information</strong>
              </div>
              <p className="privacy-content-description">
                We do not sell or rent your personal information. However, we may share information
                when required to:
              </p>
              <ul role="list" className="list-8">
                <li>
                  <p className="privacy-list-description">
                    Comply with legal obligations or lawful requests
                  </p>
                </li>
                <li>
                  <p className="privacy-list-description">
                    Protect the rights, safety, or property of <strong>GreaterWorks</strong> or others
                  </p>
                </li>
                <li>
                  <p className="privacy-list-description">
                    Support business operations such as mergers or asset transfers
                  </p>
                </li>
                <li>
                  <p className="privacy-list-description">
                    Prevent fraud or misuse of our website and services
                  </p>
                </li>
              </ul>
            </div>

            {/* 6 */}
            <div className="privacy-content">
              <div className="privacy-content-title">
                <strong className="bold-text-6">6. Data Retention</strong>
              </div>
              <p className="privacy-content-description">
                We retain personal information only for as long as it is necessary to fulfill the
                purposes outlined in this policy, or as required by law. Once information is no
                longer needed, we take reasonable steps to securely delete or anonymize it.
              </p>
            </div>

            {/* 7 */}
            <div className="privacy-content">
              <div className="privacy-content-title">
                <strong className="bold-text-6">7. Children&apos;s Privacy</strong>
              </div>
              <p className="privacy-content-description">
                Our website is not intended for individuals under the age of 18. We do not knowingly
                collect personal information from children. If we become aware that such information
                has been collected, we will take appropriate steps to remove it promptly.
              </p>
            </div>

            {/* 8 */}
            <div className="privacy-content">
              <div className="privacy-content-title">
                <strong className="bold-text-6">8. Updates to This Policy</strong>
              </div>
              <p className="privacy-content-description">
                We may update this Privacy Policy from time to time to reflect changes in our
                practices or legal requirements. Any updates will be posted on this page, and
                continued use of the website indicates acceptance of the revised policy.
              </p>
            </div>

            {/* 9 */}
            <div className="privacy-content">
              <div className="privacy-content-title">
                <strong className="bold-text-6">9. Contact Information</strong>
              </div>
              <p className="privacy-content-description">
                If you have any questions or concerns regarding this Privacy Policy or how we handle
                your information, please contact us:{" "}
                <a
                  href="mailto:sales@greaterworks.tech"
                  className="faq-heading-description-link-2"
                >
                  sales@greaterworks.tech
                </a>
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}