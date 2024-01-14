import { RegisterForm } from "@/components/register-form";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="mx-5 md:mx-40 lg:mx-40 flex h-full">
      <RegisterForm />
    </div>
  );
}
