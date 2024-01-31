import { Footer } from "@/components/footer";
import { NavHeader } from "@/components/nav-header";
import { RegisterForm } from "@/components/register-form";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="flex flex-col h-full">
      <NavHeader />
      <div className="mx-5 md:mx-40 lg:mx-40 h-full">
        <RegisterForm />
      </div>
      <Footer />
    </div>
  );
}
