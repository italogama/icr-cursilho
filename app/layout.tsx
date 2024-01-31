import "./globals.css";
import type { Metadata } from "next";
import { Instagram, Youtube } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import localFont from "next/font/local";
import "react-day-picker/dist/style.css";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Image from "next/image";
import { NavHeader } from "@/components/nav-header";

// Font files can be colocated inside of `app`
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
