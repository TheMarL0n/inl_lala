import localFont from "next/font/local"
import "./globals.css";

const miFuente = localFont({
  src: [
    {
      path: "../public/fonts/Program_OT_Book.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Program_OT_Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Program_Nar_OT_Medium.otf",
      weight: "500",
      
    },
    {
      path: "../public/fonts/Program_Nar_OT_Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-mi-fuente",
});

export const metadata = {
  metadataBase: new URL('https://www.institutolala.com.mx/'),
  title: {
    default: "Instituto de Nutrición Lala",
    template: "%s | Lala",
  },
  description: "Lo que comes importa, entenderlo también",
  openGraph: {
    title: "Instituto de Nutrición Lala",
    description: "Lo que comes importa, entenderlo también",
    url: 'https://www.institutolala.com.mx/',
    siteName: 'Lala',
    images: [
      {
        url: '/logo.svg',
        width: 158,
        height: 81,
        alt: 'Lala - Lo que comes importa, entenderlo también',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${miFuente.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
