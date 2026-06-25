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
  title: "Prajwal N J | AI Developer & Software Engineer",
  description:
    "Portfolio of Prajwal N J — AI Developer, Web Developer, and Software Engineer based in Bengaluru, India. Specializing in Deep Learning, Computer Vision, Next.js, and Full Stack Development.",
  keywords: [
    "Prajwal N J",
    "AI Developer",
    "Software Engineer",
    "Deep Learning",
    "Computer Vision",
    "Next.js Developer",
    "Full Stack Developer",
    "Bengaluru Developer",
    "TensorFlow",
    "OpenCV",
    "Machine Learning",
    "Portfolio",
  ],
  authors: [{ name: "Prajwal N J", url: "https://github.com/Prajwalnj19" }],
  creator: "Prajwal N J",
  metadataBase: new URL("https://prajwalnj.vercel.app"),
  openGraph: {
    title: "Prajwal N J | AI Developer & Software Engineer",
    description:
      "Explore the portfolio of Prajwal N J — AI projects, web applications, and software solutions built with Deep Learning, Computer Vision, and Next.js.",
    url: "https://prajwalnj.vercel.app",
    siteName: "Prajwal N J Portfolio",
    images: [
      {
        url: "/Projects/photo.jpg",
        width: 800,
        height: 800,
        alt: "Prajwal N J - AI Developer",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prajwal N J | AI Developer & Software Engineer",
    description:
      "AI Developer and Software Engineer based in Bengaluru. Building Deep Learning, Computer Vision, and Full Stack projects.",
    images: ["/Projects/photo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://prajwalnj.vercel.app" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Prajwal N J",
              jobTitle: "AI Developer & Software Engineer",
              url: "https://prajwalnj.vercel.app",
              email: "njkanchi@gmail.com",
              sameAs: [
                "https://github.com/Prajwalnj19",
                "https://linkedin.com/in/prajwal-nj-994aa1228",
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bengaluru",
                addressCountry: "IN",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}