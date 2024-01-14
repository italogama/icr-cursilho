import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { FormLabel } from "./ui/form";
import { Label } from "./ui/label";

const RegisterHeader = () => {
  return (
    <Card className="w-full px-3 rounded-md border mt-3 mb-5 py-3">
      <Label className="block uppercase tracking-wide text-red-500 text-base font-bold text-center animate-bounce">LEIA COM ATENÇÃO</Label>

      <h3 className="text-base pb-1 font-medium tracking-tighter md:text-lg ">O Cursilho destina-se a pessoas capazes de:</h3>
      <div className="gap-1 flex flex-col mt-1 mb-2">
        <div className="flex flex-row items-start space-x-3 space-y-0">
          <Checkbox checked={true} className="cursor-default" />
          <Label> Captar a mensagem CRISTÃ e comprometer-se;</Label>
        </div>
        <div className="flex flex-row items-start space-x-3 space-y-0">
          <Checkbox checked={true} className="cursor-default" />
          <Label> Descobrir seus dons e pô-los a serviço da comunidade;</Label>
        </div>
        <div className="flex flex-row items-start space-x-3 space-y-0">
          <Checkbox checked={true} className="cursor-default" />
          <Label> Ser fermento do EVANGELHO em seus ambientes;</Label>
        </div>
        <div className="flex flex-row items-start space-x-3 space-y-0">
          <Checkbox checked={true} className="cursor-default" />
          <Label> Demonstrar inquietação social.</Label>
        </div>
      </div>

      <p className="text-xs pt-1 tracking-wider text-muted-foreground md:text-sm">* O preenchimento desta ficha não implica na aceitação imediata e consequente participação</p>

      <h2 className="text-base font-medium text-center pt-2 tracking-wide">PREENCHA TODOS OS CAMPOS ABAIXO COM ATENÇÃO</h2>
    </Card>
  );
};

export default RegisterHeader;
