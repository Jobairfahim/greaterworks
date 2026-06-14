import type { Metadata } from "next";
import "./globals.css";
import "swiper/css";
import "swiper/css/navigation";
import './ckeditor-content.css'; // ✅ REQUIRED
import Navbar from "@/component/Navbar";
import CTASection from "@/component/CTASection";
import Footer from "@/component/Footer";
import FloatingCTA from "@/component/FloatingCTA";
import Preloader from "@/component/Preloader";
import { fetchNavbarDataServer } from "@/lib/navbar-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Greater Works Technologies | Custom Software, Web & Mobile App Development",
  description:
    "Greater Works Technologies is a leading software development company delivering custom web, mobile, and enterprise solutions. We help businesses innovate with scalable technology, expert engineering, and end-to-end digital transformation.",
  openGraph: {
    title: "Greater Works Technologies | Custom Software, Web & Mobile App Development",
    description:
      "Greater Works Technologies is a leading software development company delivering custom web, mobile, and enterprise solutions. We help businesses innovate with scalable technology, expert engineering, and end-to-end digital transformation.",
    images: [
      "https://res.cloudinary.com/dsoilebvu/image/upload/v1777048314/logo_kxjvlv.png",
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Greater Works Technologies | Custom Software, Web & Mobile App Development",
    description:
      "Greater Works Technologies is a leading software development company delivering custom web, mobile, and enterprise solutions. We help businesses innovate with scalable technology, expert engineering, and end-to-end digital transformation.",
  },
  verification: {
    google: "k0xE33C6K6KeRfdFUagvQ0oIqV3qXHQJwYes3eVixsM",
  },
  generator: "Next.js",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navbarData = await fetchNavbarDataServer();

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Self+Sand:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />

      </head>
      <body>
        <Preloader />
        <Navbar data={navbarData} />
        {children}
        <CTASection />
        <FloatingCTA />
        <Footer />
      </body>
    </html>
  );
}
