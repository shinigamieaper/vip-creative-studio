import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { StaggeredMenu, Footer } from "@/components";
import { siteConfig } from "@/lib/site-config";
import { getClient } from "@/lib/sanity/client";
import { siteSettingsQuery } from "@/lib/sanity/queries";

// Fonts are provided via Satoshi CDN link in <head> and CSS variables in globals.css

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Fractional Marketing for Credit Unions`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [...siteConfig.authors],
  creator: siteConfig.creator,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Fractional Marketing for Credit Unions`,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Fractional Marketing Partners`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Fractional Marketing for Credit Unions`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/viplogocircle.png",
    shortcut: "/viplogocircle.png",
    apple: "/viplogocircle.png",
  },
  manifest: "/site.webmanifest",
  
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getClient().fetch(siteSettingsQuery);

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@900,500,400&display=swap"
        />
      </head>
      <body className="antialiased min-h-screen bg-linear-to-br from-[hsl(var(--accent-primary)/0.15)] to-[hsl(var(--accent-secondary)/0.15)]" suppressHydrationWarning>
        {GTM_ID && (
          <>
            <Script
              id="gtm-base"
              strategy="afterInteractive"
            >{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}</Script>
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
              />
            </noscript>
          </>
        )}
        {CLARITY_ID && (
          <Script
            id="ms-clarity"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "${CLARITY_ID}");
              `,
            }}
          />
        )}
        <StaggeredMenu
          isFixed={true}
          position="right"
          items={[
            { label: "Home", ariaLabel: "Go to home page", link: "/" },
            { label: "About", ariaLabel: "Learn about us", link: "/about" },
            { label: "Partnership", ariaLabel: "View our partnership model", link: "/our-partnership-model" },
            { label: "Content\u00a0Hub", ariaLabel: "Explore insights, success stories, and resources", link: "/resources" },
            { label: "Contact", ariaLabel: "Get in touch", link: "/contact" },
          ]}
          socialItems={[]}
          displaySocials={false}
          displayItemNumbering={true}
          menuButtonColor={"hsl(var(--text-primary))"}
          openMenuButtonColor={"hsl(var(--text-primary))"}
          changeMenuColorOnOpen={true}
          colors={["hsl(var(--accent-secondary))", "hsl(var(--accent-primary))"]}
          logoUrl="/viplogotransparentblack.png"
          accentColor={"hsl(var(--accent-primary))"}
        />
        {children}

        <Footer footer={siteSettings?.footer} />
      </body>
    </html>
  );
}
