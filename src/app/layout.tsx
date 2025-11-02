import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import ContactFAB from '@/components/layout/contact-fab';

export const metadata: Metadata = {
  title: {
    default: 'Luv Yoga - Yêu Yoga hơn mỗi ngày',
    template: '%s | Luv Yoga'
  },
  description:
    'Yoga định tuyến và hỗ trợ trị liệu phục hồi, đề cao sức khoẻ và sự an toàn trong tập luyện. Tham gia các lớp yoga cộng đồng tại Đồng Nai.',
  keywords: ['yoga', 'đồng nai', 'trị liệu', 'phục hồi', 'sức khỏe', 'thiền', 'meditation', 'luv yoga'],
  authors: [{ name: 'Luv Yoga' }],
  creator: 'IVS JSC',
  publisher: 'IVS JSC',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://luvyoga.online'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Luv Yoga - Yêu Yoga hơn mỗi ngày',
    description: 'Yoga định tuyến và hỗ trợ trị liệu phục hồi, đề cao sức khoẻ và sự an toàn trong tập luyện.',
    url: 'https://luvyoga.online',
    siteName: 'Luv Yoga',
    images: [
      {
        url: '/images/banner-luvyoga.jpg',
        width: 1200,
        height: 630,
        alt: 'Luv Yoga - Yoga studio tại Đồng Nai',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luv Yoga - Yêu Yoga hơn mỗi ngày',
    description: 'Yoga định tuyến và hỗ trợ trị liệu phục hồi, đề cao sức khoẻ và sự an toàn trong tập luyện.',
    images: ['/images/banner-luvyoga.jpg'],
    creator: '@luvyoga',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <head>
        <link rel="icon" href="/images/logo-luvyoga.png" type="image/png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Luv Yoga",
              "description": "Yoga định tuyến và hỗ trợ trị liệu phục hồi, đề cao sức khoẻ và sự an toàn trong tập luyện",
              "url": "https://luvyoga.online",
              "telephone": "+84-35-251-8855",
              "email": "luvyoga.official@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Ấp Nhân Hoà",
                "addressLocality": "Xã Tây Hoà",
                "addressRegion": "Huyện Trảng Bom",
                "addressCountry": "VN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 10.949783655970549,
                "longitude": 107.04734257583961
              },
              "openingHours": [
                "Mo-Fr 04:45-08:00",
                "Mo-Fr 17:30-20:25",
                "Sa-Su 04:45-08:00",
                "Sa-Su 17:30-20:25"
              ],
              "priceRange": "$$",
              "image": "https://luvyoga.online/images/banner-luvyoga.jpg",
              "sameAs": [
                "https://www.facebook.com/LuvYoga.Official",
                "https://www.instagram.com/luvyoga.official"
              ]
            })
          }}
        />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased'
        )}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Skip to main content
        </a>
        {children}
        <ContactFAB />
        <Toaster />
      </body>
    </html>
  );
}
