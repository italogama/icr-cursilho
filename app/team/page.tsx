import { Footer } from "@/components/footer";
import { NavHeader } from "@/components/nav-header";
import { TeamPaymentForm } from "@/components/team-payment-form";

export default function PaymentPage() {
  return (
    <div className="flex flex-col h-full">
      <NavHeader />
      <div className="mx-5 md:mx-40 lg:mx-40 h-full">
        <TeamPaymentForm />
      </div>
      <Footer />
    </div>
  );
}
