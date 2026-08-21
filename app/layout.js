import localFont from "next/font/local"
import "./globals.css";

export const metadata = {
  title: "Instituto de Nutrición Lala",
  description: "Lo que comes importa, entenderlo también",
};

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
