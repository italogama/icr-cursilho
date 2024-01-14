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
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Card } from "./ui/card";
import Swal from "sweetalert2";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import RegisterHeader from "./register-header";
import { civilStatusType, phoneRegex, tshirtSizes } from "@/lib/helpers/helpers";
import { TextDivider } from "./text-divider";
import PaymentHeader from "./payment-header";
import Link from "next/link";

interface PaymentFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const paymentFormSchema = z.object({
  email: z.string({ required_error: "Você deve informar seu email" }).email({ message: "Você deve preencher um email válido" }),
});

type RegisterFormValues = z.infer<typeof paymentFormSchema>;

const defaultValues: Partial<RegisterFormValues> = {
  email: undefined,
};

export function PaymentForm({ className, ...props }: PaymentFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues,
  });

  async function onSubmit(values: z.infer<typeof paymentFormSchema>) {
    try {
      setIsLoading(true);
      const response = await fetch("/api/checkEmail", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: values.email }),
      });

      const data = await response.json();

      if (data.data === "USER_NOT_FOUND") {
        setIsLoading(false);
        Swal.fire({
          title: "Erro!",
          text: "O email informado não existe no sistema!",
          icon: "error",
          confirmButtonText: "Ok",
        });
      } else if (data.data === "USER_PAYED_ALREADY") {
        setIsLoading(false);
        Swal.fire({
          title: "Erro!",
          text: "O email informado já realizou o pagamento!",
          icon: "warning",
          confirmButtonText: "Ok",
        });
      } else {
        const mercadopago = await fetch("/api/mercadopago", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: values.email }),
        });

        const url = await mercadopago.json();
        window.location.replace(url.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={cn("py-5 ", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mb-28">
          <PaymentHeader />
          <div className="md:flex md:flex-row md:gap-4">
            <div className="w-full">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input id="email" placeholder="Digite seu email" type="email" disabled={isLoading} {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
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
        </form>
      </Form>
    </div>
  );
}
