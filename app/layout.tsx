import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Joshua Camacho — Full-Stack Systems Engineer & Creative Developer",
  description:
    "Interactive 3D Command Center & Portfolio. Specializing in high-performance full-stack architectures (Next.js, TypeScript, Supabase), real-time systems, and procedural WebGL/Three.js graphics.",
  keywords: [
    "Joshua Camacho",
    "Full-Stack Engineer",
    "Systems Engineer",
    "Creative Developer",
    "Three.js",
    "React Three Fiber",
    "Next.js",
    "TypeScript",
    "Supabase",
    "WebDev",
    "Portfolio",
  ],
  authors: [{ name: "Joshua Camacho", url: "https://github.com/schneizel" }],
  creator: "Joshua Camacho",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://schneizel.webdev",
    title: "Joshua Camacho — Full-Stack Systems Engineer & Creative Developer",
    description:
      "Interactive 3D Command Center & Portfolio. High-performance web architectures, real-time data engines, and procedural 3D graphics.",
    siteName: "Joshua Camacho Command Center",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joshua Camacho — Systems Engineer & Creative Developer",
    description:
      "Interactive 3D Command Center & Portfolio powered by Next.js, React Three Fiber, and TypeScript.",
    creator: "@schneizel",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Structured Data (JSON-LD) for Search Engine Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Joshua Camacho",
              jobTitle: "Full-Stack Systems Engineer & Creative Developer",
              url: "https://schneizel.webdev",
              sameAs: ["https://github.com/schneizel"],
              knowsAbout: [
                "Full-Stack Development",
                "Next.js",
                "TypeScript",
                "Three.js",
                "React Three Fiber",
                "Distributed Systems",
                "PostgreSQL",
                "Supabase",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#05070a] text-slate-100 selection:bg-cyan-500 selection:text-black`}
      >
        {children}
      </body>
    </html>
  );
}