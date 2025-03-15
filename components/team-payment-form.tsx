"use client";

import * as React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Icons } from "./ui/icons";
import { Card } from "./ui/card";
import Swal from "sweetalert2";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface RegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const teamPaymentFormSchema = z.object({
  fullName: z.string({ required_error: "Você deve preencher seu nome completo" }).min(5, { message: "Seu nome precisa ter mais de 5 caracteres" }),
  paymentType: z.enum(["full"], {
    invalid_type_error: "Selecione o tipo de pagamento",
    required_error: "Você deve selecionar o tipo de pagamento",
  }),
});

type TeamPaymentFormValues = z.infer<typeof teamPaymentFormSchema>;

const defaultValues: Partial<TeamPaymentFormValues> = {
  fullName: "",
  paymentType: "full",
};

export function TeamPaymentForm({ className, ...props }: RegisterFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const eventTitle = process.env.NEXT_PUBLIC_EVENT_TITLE;
  const eventDate = process.env.NEXT_PUBLIC_EVENT_DATE;
  const valueTax = process.env.NEXT_PUBLIC_TAX_TEAM_PAYMENT;

  const form = useForm<TeamPaymentFormValues>({
    resolver: zodResolver(teamPaymentFormSchema),
    defaultValues,
  });

  async function onSubmit(values: z.infer<typeof teamPaymentFormSchema>) {
    try {
      setIsLoading(true);

      const form = {
        fullName: values.fullName,
        paymentType: values.paymentType,
      };

      setIsLoading(true);

      const response = await fetch("/api/mercadopagoteam", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ form }),
      });

      const data = await response.json();
      console.log(data);
      if (data.url) {
        window.location.replace(data.url);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ocorreu um erro ao processar, tente novamente mais tarde",
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  return (
    <div className={cn("py-5", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <Card className="w-full px-3 rounded-md border mt-3 mb-5 py-3">
            <Label className="block uppercase tracking-wide text-red-500 text-base font-bold text-center animate-bounce">LEIA COM ATENÇÃO</Label>

            <h3 className="text-base  font-medium tracking-tighter md:text-lg text-center py-5">
              Se você está nessa página, pressupomos que você faz parte da Equipe do {eventTitle} de {eventDate} da Igreja Cristã em Recife e está aqui para realizar o seu pagamento.
            </h3>

            <h2 className="text-base font-medium text-center pt-2 tracking-wide">SÓ PROSSIGA SE VOCÊ FAZ PARTE DA EQUIPE</h2>
          </Card>
          <label className="block tracking-wide text-white text-sm font-bold mb-2 text-center py-3 bg-red-500 rounded-md mt-3">ATENÇÃO: Você deve informar o seu nome completo para constar que o pagamento foi feito por você.</label>
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="fullName">Nome completo</FormLabel>
                <FormControl>
                  <Input id="fullName" placeholder="Digite seu nome completo" type="text" disabled={isLoading} {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="paymentType"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Pagamento</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={"full"}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione uma opção" />
                  </SelectTrigger>
                  <SelectContent defaultValue={"full"}>
                    <SelectItem
                      value={"full"}
                      onSelect={() => {
                        form.setValue("paymentType", "full");
                      }}
                    >
                      Taxa R$:{valueTax},00
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isLoading} type="submit" className="w-full mt-5">
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Confirmar
          </Button>
          <Link href="/">
            <Button disabled={isLoading} variant={"link"} type="submit" className="w-full mt-3">
              {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              Voltar para página inicial
            </Button>
          </Link>
          <Card className="p-2 text-center mt-4">
            <p className="text-xs font-bold tracking-wider text-muted-foreground md:text-sm">Endereço: Av. Estância, n° 330 / Areias / Recife - PE / Fones: (81) 99971-6016 / 99936-5151</p>
          </Card>
        </form>
      </Form>
    </div>
  );
}
