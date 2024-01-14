import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { FormLabel } from "./ui/form";
import { Label } from "./ui/label";

const PaymentHeader = () => {
  return (
    <Card className="w-full px-3 rounded-md border mt-3 mb-5 py-3">
      <Label className="block uppercase tracking-wide text-red-500 text-base font-bold text-center animate-bounce">LEIA COM ATENÇÃO</Label>

      <h3 className="text-base pb-1 pt-2 font-medium tracking-tighter md:text-lg ">Se você está nessa página, pressupomos que você já fez o seu cadastro anteriormente mas NÃO realizou o pagamento.</h3>

      <h2 className="text-base font-medium text-center pt-2 tracking-wide">SÓ PROSSIGA SE VOCÊ JÁ FEZ O CADASTRO ANTERIORMENTE E NÃO REALIZOU O PAGAMENTO</h2>
    </Card>
  );
};

export default PaymentHeader;
