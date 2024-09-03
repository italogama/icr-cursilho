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
import Swal from "sweetalert2";
import Link from "next/link";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import PaymentHeader from "./payment-header";

interface PaymentFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const paymentFormSchema = z.object({
  email: z
    .string({ required_error: "Você deve informar seu email" })
    .email({ message: "Você deve preencher um email válido" }),
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
        const result = await Swal.fire({
          title: "Pagamento",
          text: "Deseja continuar para a página de pagamento?",
          icon: "warning",
          html: `
          <div style="display: flex; align-items: center;">
            <img height="150px" width="150px" src="https://firebasestorage.googleapis.com/v0/b/icr-members-c94f2.appspot.com/o/qrcode-pix.png?alt=media&token=d0520ae3-ebd3-4f31-a84c-23ae16047172" alt="QRCodeICR" style="margin-right: 20px;">
            <p>Utilize este QRCode para realizar o pagamento via <b>PIX</b>. Se o método de pagamento for outro, por favor prossiga para a próxima tela.</p>
          </div>
          <p><b>Pix Copia-e-cola:</b></p>
          <p>
          00020126430014BR.GOV.BCB.PIX0121cursilhoicr@gmail.com5204000053039865406350.005802BR5901N6001C62150511CursilhoICR63044AC8</p>
          <p style="color:red;"><b>Atenção</b>:</p>
          <p>Enviar o comprovante do PIX para: (81) 99971-6016</p>
        `,
          showCancelButton: true,
          confirmButtonText: "Prosseguir para pagamento ",
          cancelButtonText: "Fechar",
        });

        if (result.isConfirmed) {
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
        }

        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
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
                      <Input
                        id="email"
                        placeholder="Digite seu email"
                        type="email"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button disabled={isLoading} type="submit" className="w-full mt-5">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Confirmar
          </Button>
          <Link href="/">
            <Button
              disabled={isLoading}
              variant={"link"}
              type="submit"
              className="w-full mt-3"
            >
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Voltar para página inicial
            </Button>
          </Link>
        </form>
      </Form>
    </div>
  );
}
