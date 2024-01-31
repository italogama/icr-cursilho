import { Footer } from "@/components/footer";
import { NavHeader } from "@/components/nav-header";
import { PaymentForm } from "@/components/payment-form";

export default function PaymentPage() {
  return (
    <div className="flex flex-col h-screen">
      <NavHeader />
      <div className="mx-5 md:mx-40 lg:mx-40 h-full">
        <PaymentForm />
      </div>
      <Footer />
    </div>
  );
}
