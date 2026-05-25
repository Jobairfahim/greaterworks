import type { Metadata } from "next";
import "./globals.css";
import "swiper/css";
import "swiper/css/navigation";
import './ckeditor-content.css'; // ✅ REQUIRED
import Navbar from "@/component/Navbar";
import CTASection from "@/component/CTASection";
import Footer from "@/component/Footer";
import FloatingCTA from "@/component/FloatingCTA";
import { head } from "framer-motion/client";
import Preloader from "@/component/Preloader";
import { NavbarData } from "@/types/navbar";

async function getNavbarData(): Promise<NavbarData | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/navbar?populate[services][populate][serviceIcon]=true&populate[services][populate][service]=true&populate[industries][populate][industryIcon]=true&populate[approach][populate][approachIcon]=true&populate[solution][populate][solutionIcon]=true&populate[solutionSidbar]=true&populate[ServiceSidbarImage]=true&populate[navbarIcom]=true&populate[footerIcon]=true`,
      {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
        },
      }
    );
    if (!res.ok) {
      console.error(`Failed to fetch navbar data: ${res.status} ${res.statusText}`);
      return null;
    }
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Error fetching navbar data:", error);
    return null;
  }
}
export const dynamic = 'force-dynamic'; // Ensure the layout is always rendered on the server for dynamic data fetching

export const metadata: Metadata = {
  title: "Greater works technologies | Custom Software, Web & Mobile App Development",
  description:
    "Greater works technologies is a leading software development company delivering custom web, mobile, and enterprise solutions. We help businesses innovate with scalable technology, expert engineering, and end-to-end digital transformation.",
  openGraph: {
    title: "Greater works technologies | Custom Software, Web & Mobile App Development",
    description:
      "Greater works technologies is a leading software development company delivering custom web, mobile, and enterprise solutions. We help businesses innovate with scalable technology, expert engineering, and end-to-end digital transformation.",
    images: [
      "https://res.cloudinary.com/dsoilebvu/image/upload/v1777048314/logo_kxjvlv.png",
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Greater works technologies | Custom Software, Web & Mobile App Development",
    description:
      "Greater works technologies is a leading software development company delivering custom web, mobile, and enterprise solutions. We help businesses innovate with scalable technology, expert engineering, and end-to-end digital transformation.",
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
  const navbarData = await getNavbarData();

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Exo:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Inconsolata:wght@400;700&family=DM+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
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
