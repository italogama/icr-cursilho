import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "react-day-picker/dist/style.css";

const SfProRegular = localFont({
  src: "../public/fonts/sf-pro-text-regular.ttf",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cursilho de Cristandade - Igreja Cristã em Recife",
  description: "Plataforma de cadastro dos cursilhistas da Igreja Cristã em Recife",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={SfProRegular.className}>{children}</body>
    </html>
  );
}
