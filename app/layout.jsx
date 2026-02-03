import 'bootstrap/dist/css/bootstrap.min.css';
import "yet-another-react-lightbox/styles.css";
import "../public/sass/main.scss";
import 'animate.css';
import InitAnimations from '../components/containers/InitAnimations';
import LayoutWrapper from './LayoutWrapper';
import Script from 'next/script';

export const metadata = {
  title: 'Tech Cloud ERP – Cloud ERP Software for Indian Businesses',
  description: 'Tech Cloud ERP provides cloud-based ERP solutions to streamline operations and boost efficiency for businesses of all sizes.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.ico', type: 'image/ico' },
    ]
  },
  keywords: [
    "ERP software",
    "cloud ERP",
    "business management",
    "enterprise resource planning",
    "inventory management",
    "accounting software",
    "business solutions",
    "SaaS ERP",
    "business automation",
    "Tech Cloud ERP"
  ],
  authors: [
    {
      name: 'Tech Cloud ERP Software Pvt Ltd',
      url: 'https://techclouderp.com',
      sameAs: [
        'https://www.instagram.com/techclouderp/',
        'https://www.facebook.com/TechCloudERPSoftwareSolutions',
        'https://www.linkedin.com/company/13619340',
        'https://in.pinterest.com/techclouderp/',
        'https://www.youtube.com/channel/UChUCWRHTzZkYEPRR-AauNkA',
        'https://twitter.com/TechCloudERP'
      ]
    }
  ],
  openGraph: {
    title: 'Tech Cloud ERP | Best Cloud-Based ERP Software in India',
    type: 'website',
    url: 'https://techclouderp.com/',
    images: [{
      url: 'https://techclouderp.com/logo.webp',
      width: 1200,
      height: 630,
      alt: 'Tech Cloud ERP - Business Management Solutions',
    }],
    description: 'Tech Cloud ERP offers scalable, cloud-based ERP solutions tailored for small and mid-sized businesses. Streamline operations, enhance productivity and gain real-time insights with our customizable modules.',
    siteName: 'Tech Cloud ERP',
    locale: 'en_IN',
    publishedTime: '2023-01-01T00:00:00.000Z',
    modifiedTime: new Date().toISOString(),
    authors: ['Tech Cloud ERP Software Pvt Ltd'],
    tags: ['ERP Software', 'Cloud ERP', 'Business Management', 'India']
  },
  twitter: {
    card: 'summary_large_image',
    site: '@TechCloudERP',
    creator: '@TechCloudERP',
    title: 'Tech Cloud ERP - Cloud-Based Business Management Solutions',
    description: 'Streamline your business operations with our comprehensive cloud-based ERP solutions.',
    images: [{
      url: 'https://techclouderp.com/images/twitter-image.jpg',
      alt: 'Tech Cloud ERP - Transform Your Business',
      width: 1200,
      height: 628,
    }],
    domain: 'techclouderp.com'
  },
  // Additional social media meta
  other: {
    'fb:app_id': 'YOUR_FACEBOOK_APP_ID', // Add your Facebook App ID if available
    'instagram:username': 'techclouderp',
    'youtube:channel': 'UChUCWRHTzZkYEPRR-AauNkA',
    'pinterest:username': 'techclouderp',
    'linkedin:company': '13619340',
    'google-site-verification': 'tYN1pLqI0Tr2O39pXENnpPijDUfufS4bOQM0sne-r38',
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
    google: 'YOUR_GOOGLE_VERIFICATION_CODE', // Add your Google Search Console verification code
    yandex: 'YOUR_YANDEX_VERIFICATION_CODE', // Add your Yandex verification code if needed
  },
  metadataBase: new URL('https://techclouderp.com'),
  alternates: {
    canonical: '/',
     languages: {
      'en-US': 'https://techclouderp.com/us/',
      'en-IN': 'https://techclouderp.com/in/',
      'en-OM': 'https://techclouderp.com/oman/',
      'en-AE': 'https://techclouderp.com/uae/',
      'en-KW': 'https://techclouderp.com/kuwait/',
      'en-BH': 'https://techclouderp.com/bahrain/',
      'en-QA': 'https://techclouderp.com/qatar/',
      'x-default': 'https://techclouderp.com/'
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LayoutWrapper>
          <InitAnimations />
          {children}
        </LayoutWrapper>
        {/* Start of ChatBot (www.chatbot.com) code */}
        <Script
          id="chatbot-widget"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
           window.__ow = window.__ow || {};
  window.__ow.organizationId = "e7940194-7b02-49a8-b1c3-0ddc09ad5321";
  window.__ow.template_id = "1d1893fd-4f5e-486e-bd10-0af0bb91251f";
  window.__ow.integration_name = "manual_settings";
  window.__ow.product_name = "chatbot";   
  ;(function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[OpenWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.openwidget.com/openwidget.js",t.head.appendChild(n)}};!n.__ow.asyncInit&&e.init(),n.OpenWidget=n.OpenWidget||e}(window,document,[].slice))
 `
          }}
        />
        {/* End of ChatBot code */}
      </body>
    </html>
  );
}