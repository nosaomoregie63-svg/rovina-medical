import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "react-datepicker/dist/react-datepicker.css";

export const metadata = {
  title: "Rovina Medical Diagnostic Services - Quality Healthcare in Lagos",
  description:
    "Leading diagnostic healthcare provider in Lagos, Nigeria. Offering ultrasound, echocardiography, laboratory services, mammography, and more. Book your appointment today.",
  keywords:
    "Rovina Medical, diagnostic services Lagos, ultrasound Lagos, echocardiography, laboratory services Nigeria, mammography, medical imaging, healthcare Lagos, Satellite Town hospital, diagnostic center Nigeria",
  authors: [{ name: "Rovina Medical Diagnostic Services" }],
  creator: "Rovina Medical Diagnostic Services",
  publisher: "Rovina Medical Diagnostic Services",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://rovinamedical.ng",
    siteName: "Rovina Medical Diagnostic Services",
    title: "Rovina Medical Diagnostic Services - Quality Healthcare in Lagos",
    description:
      "Leading diagnostic healthcare provider in Lagos, Nigeria. Expert medical imaging, laboratory services, and comprehensive health screening.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Rovina Medical Diagnostic Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rovina Medical Diagnostic Services",
    description: "Quality diagnostic healthcare services in Lagos, Nigeria",
    images: ["/images/twitter-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  manifest: "/site.webmanifest",
  themeColor: "#1E3A8A",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="canonical" href="https://rovinamedical.ng" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Navbar />
        {children}
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
}
