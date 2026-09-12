import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans, Oxanium } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import siteDetails from "@/config/publicSiteData";
import QueryProvider from "@/providers/query.provider";
import { toast, Toaster } from "sonner";

const oxaniumHeading = Oxanium({
  subsets: ["latin"],
  variable: "--font-heading",
});

const notoSans = Noto_Sans({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fixitnow.com"),

  title: {
    default: `${siteDetails.name} - Trusted Home Services`,
    template: "%s | FixItNow",
  },

  description:
    "Find trusted technicians and book reliable home services with FixItNow. Browse services, compare technicians, choose available time slots, and manage your bookings with ease.",

  keywords: [
    "home services",
    "home service marketplace",
    "technicians",
    "plumbers",
    "electricians",
    "cleaning services",
    "home repair",
    "FixItNow",
  ],

  authors: [{ name: siteDetails.name }],
  creator: siteDetails.name,
  publisher: siteDetails.name,

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteDetails.name,
    title: `${siteDetails.name} - Trusted Home Services`,
    description:
      "Find trusted technicians and book reliable home services with FixItNow.",
    images: [
      {
        url: "/ogimg.jfif",
        width: 1200,
        height: 630,
        alt: siteDetails.name,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${siteDetails.name} - Trusted Home Services`,
    description:
      "Find trusted technicians and book reliable home services with FixItNow.",
    images: ["/ogimg.jfif"],
  },

  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        notoSans.variable,
        oxaniumHeading.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          {children}
          <Toaster
            toastOptions={{
              style: {
                borderRadius: 0,
              },
            }}
          />
        </QueryProvider>
      </body>
    </html>
  );
}
