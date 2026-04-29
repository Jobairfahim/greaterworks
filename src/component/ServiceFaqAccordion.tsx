"use client";

import Image from "next/image";
import { useState } from "react";

const DEFAULT_CDN =
  "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026";

export type ServiceFaqItem = {
  q: string;
  a: string;
};

type ServiceFaqAccordionProps = {
  items: ServiceFaqItem[];
  cdnBase?: string;
  /** First open item index. Pass `null` to start with every panel closed. */
  defaultOpenIndex?: number | null;
};

export function ServiceFaqAccordion({
  items,
  cdnBase = DEFAULT_CDN,
  defaultOpenIndex,
}: ServiceFaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(() => {
    if (!items.length) return null;
    if (defaultOpenIndex === null) return null;
    if (typeof defaultOpenIndex === "number") return defaultOpenIndex;
    return 0;
  });

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="w-layout-vflex accordion-wrap service-accordion-wrap">
      {items.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={faq.q} className="accordion-panel-card">
            <button
              type="button"
              className={`accordion-panel-title-wrap${isOpen ? " open" : ""} service-accordion-panel-title-wrap`}
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              aria-controls={`service-faq-panel-${index}`}
              id={`service-faq-trigger-${index}`}
              style={{
                appearance: "none",
                WebkitAppearance: "none",
                margin: 0,
                width: "100%",
                boxSizing: "border-box",
                display: "flex",
                textAlign: "left",
              }}
            >
              <h3 className="accordion-panel-title service-accordion-panel-title">{faq.q}</h3>
              <div className="accordion-panel-title-icon-wrap">
                <Image
                  src={`${cdnBase}/694011d3bc5973f861427aea_minus-icon.svg`}
                  alt=""
                  width={16}
                  height={16}
                  className={`accordion-panel-title-icon-close${isOpen ? " accordion-panel-title-icon-close-two" : ""}`}
                />
                <Image
                  src={`${cdnBase}/694011fba4478e87df631290_plus-icon.svg`}
                  alt=""
                  width={16}
                  height={16}
                  className={`accordion-panel-title-icon${isOpen ? " accordion-panel-title-icon-two" : ""}`}
                />
              </div>
            </button>
            <div
              id={`service-faq-panel-${index}`}
              role="region"
              aria-labelledby={`service-faq-trigger-${index}`}
              className={`accordion-panel-content${isOpen ? " service-accordion-content" : ""}`}
              style={isOpen ? {} : { height: "0px" }}
            >
              <div className="accordion-panel-content-description service-accordion-panel-content-desc">
                <p className="accordion-panel-content-wrap service-accordion-panel-description">
                  {faq.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
