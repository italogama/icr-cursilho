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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Card } from "./ui/card";
import Swal from "sweetalert2";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import RegisterHeader from "./register-header";
import { civilStatusType, tshirtSizes } from "@/lib/helpers/helpers";
import { TextDivider } from "./text-divider";
import Link from "next/link";
import { registerFormSchema } from "./registerUtils";

interface RegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type RegisterFormValues = z.infer<typeof registerFormSchema>;

const defaultValues: Partial<RegisterFormValues> = {
  fullName: "",
  nickname: "",
  cpf: "",
  profession: "",
  email: "",
  instagram: "",
  birthDate: undefined,
  civilStatus: "",
  shirtSize: "",
  addressStreet: "",
  addressNumber: "",
  addressComplement: "",
  addressNeighborhood: "",
  addressCity: "",
  addressZipCode: "",
  homePhone: "",
  workPhone: "",
  contact1Name: "",
  contact1Phone: "",
  contact2Name: "",
  contact2Phone: "",
  diet: undefined,
  dietSpec: undefined,
  healthProblem: undefined,
  medication: undefined,
  inviterName: undefined,
  inviterPhone: undefined,
  inviterCursillo: undefined,
};

export function RegisterForm({ className, ...props }: RegisterFormProps) {
  const eventDate = process.env.NEXT_PUBLIC_EVENT_DATE;
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues,
  });

  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    try {
      setIsLoading(true);

      const formattedCpf = values.cpf.replace(
        /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
        "$1.$2.$3-$4"
      );
      const formmatedZipCode = values.addressZipCode.replace(
        /^(\d{5})(\d{3})$/,
        "$1-$2"
      );

      const form = {
        fullName: values.fullName,
        nickname: values.nickname,
        instagram: values.instagram,
        email: values.email,
        profession: values.profession,
        birthDate: values.birthDate.toLocaleDateString("pt-BR"),
        civilStatus: values.civilStatus,
        cpf: formattedCpf,
        shirtSize: values.shirtSize,
        addressStreet: values.addressStreet,
        addressNumber: values.addressNumber,
        addressComplement: values.addressComplement,
        addressNeighborhood: values.addressNeighborhood,
        addressCity: values.addressCity,
        addressZipCode: formmatedZipCode,
        homePhone: values.homePhone.replace(
          /^(\d{2})(\d{5})(\d{4})$/,
          "($1) $2-$3"
        ),
        workPhone: values.workPhone?.replace(
          /^(\d{2})(\d{5})(\d{4})$/,
          "($1) $2-$3"
        ),
        contact1Name: values.contact1Name,
        contact1Phone: values.contact1Phone.replace(
          /^(\d{2})(\d{5})(\d{4})$/,
          "($1) $2-$3"
        ),
        contact2Name: values.contact2Name,
        contact2Phone: values.contact2Phone.replace(
          /^(\d{2})(\d{5})(\d{4})$/,
          "($1) $2-$3"
        ),
        diet: values.diet === "yes" ? "Sim" : "Não",
        dietSpec: values.diet === "yes" ? values.dietSpec : "Nenhuma",
        healthProblem: values.healthProblem === "yes" ? "Sim" : "Não",
        healthProblemSpec:
          values.healthProblem === "yes" ? values.healthProblemSpec : "Nenhuma",
        medication: values.medication === "yes" ? "Sim" : "Não",
        medicationSpec:
          values.medication === "yes" ? values.medicationSpec : "Nenhuma",
        terms: values.terms === true ? "Aceito" : "Não aceito",
        inviterName: values.inviterName,
        inviterPhone: values.inviterPhone.replace(
          /^(\d{2})(\d{5})(\d{4})$/,
          "($1) $2-$3"
        ),
        inviterCursillo: values.inviterCursillo === "yes" ? "Sim" : "Não",
      };

      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.status === 200) {
        Swal.fire({
          title: "Sucesso!!",
          text: "Parabéns você realizou o seu cadastro! Agora é só aguardar o nosso contato!",
          icon: "success",
          confirmButtonText: "Ok",
        });
        setIsLoading(false);

        Swal.fire({
          title: "Pagamento",
          text: "Desejar ser redirecionado para realizar o pagamento? Se você cancelar, você deverá realizar o pagamento até 5 dias ANTES do cursilho.",
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#65a30d",
          cancelButtonColor: "#d33",
          confirmButtonText: "Realizar pagamento",
          cancelButtonText: "Cancelar",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const checkout = await fetch("/api/mercadopago", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email: form.email }),
            });
            const url = await checkout.json();
            window.location.replace(url.data);
          } else {
            // resetFields();
            Swal.fire({
              title: "Sucesso!!",
              text: "Seu cadastro foi realizado com sucesso!",
              icon: "success",
              confirmButtonText: "Retornar para a página inicial",
            }).then((result) => {
              if (result.value) {
                const homepageUrl = `${window.location.origin}/`;
                window.location.href = homepageUrl;
              }
            });
          }
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
          <RegisterHeader />
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="fullName">Nome completo *</FormLabel>
                <FormControl>
                  <Input
                    id="fullName"
                    placeholder="Digite seu nome completo"
                    type="text"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="md:flex md:flex-row md:gap-4">
            <div className="w-full">
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="cpf">CPF (apenas números) *</FormLabel>
                    <FormControl>
                      <Input
                        id="cpf"
                        maxLength={11}
                        placeholder="Digite seu CPF"
                        type="text"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="nickname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="nickname">
                      Como deseja ser chamado(a)? *
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="nickname"
                        placeholder="Digite seu apelido"
                        type="text"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="profession"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="profession">Profissão *</FormLabel>
                    <FormControl>
                      <Input
                        id="profession"
                        placeholder="Digite sua profissão"
                        type="text"
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

          <div className="md:flex md:flex-row md:gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="email">Email *</FormLabel>
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

            <FormField
              control={form.control}
              name="instagram"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="instagram">Instagram</FormLabel>
                  <FormControl>
                    <Input
                      id="instagram"
                      placeholder="Digite seu instagram (deixe em branco se não tiver)"
                      type="text"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="md:flex md:flex-row md:gap-4 md:w-full">
            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full pt-2">
                  <FormLabel>Data de Nascimento *</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP", { locale: ptBR })
                          ) : (
                            <span>Selecione uma data</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="civilStatus"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Estado Civil *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>
                    <SelectContent>
                      {civilStatusType.map((civilStatus) => (
                        <SelectItem
                          value={civilStatus.value}
                          key={civilStatus.value}
                          onSelect={() => {
                            form.setValue("civilStatus", civilStatus.value);
                          }}
                        >
                          {civilStatus.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shirtSize"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Camisa inclusa escolha o tamanho *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>
                    <SelectContent>
                      {tshirtSizes.map((size) => (
                        <SelectItem
                          value={size.value}
                          key={size.value}
                          onSelect={() => {
                            form.setValue("shirtSize", size.value);
                          }}
                        >
                          {size.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="md:flex md:flex-row md:gap-4">
            <FormField
              control={form.control}
              name="addressStreet"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="addressStreet">Nome da Rua *</FormLabel>
                  <FormControl>
                    <Input
                      id="addressStreet"
                      placeholder="Digite sua rua"
                      type="text"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="addressNumber"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="addressNumber">Número Casa *</FormLabel>
                  <FormControl>
                    <Input
                      id="addressNumber"
                      placeholder="Digite o número da sua casa"
                      type="text"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="addressComplement"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="addressComplement">
                    Complemento *
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="addressComplement"
                      placeholder="Digite o seu complemento"
                      type="text"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="md:flex md:flex-row md:gap-4">
            <FormField
              control={form.control}
              name="addressNeighborhood"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="addressNeighborhood">Bairro *</FormLabel>
                  <FormControl>
                    <Input
                      id="addressNeighborhood"
                      placeholder="Digite o seu bairro"
                      type="text"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="addressCity"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="addressCity">Cidade *</FormLabel>
                  <FormControl>
                    <Input
                      id="addressCity"
                      placeholder="Digite sua cidade"
                      type="text"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="addressZipCode"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="addressZipCode">CEP *</FormLabel>
                  <FormControl>
                    <Input
                      id="addressZipCode"
                      placeholder="Digite seu CEP"
                      type="text"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="md:flex md:flex-row md:gap-4">
            <div className="w-full">
              <FormField
                control={form.control}
                name="homePhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="homePhone">
                      Telefone Residencial *
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="homePhone"
                        placeholder="(xx) xxxxx-xxxx"
                        maxLength={11}
                        type="tel"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="workPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="workPhone">
                      Telefone Comercial
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="workPhone"
                        placeholder="(xx) xxxxx-xxxx"
                        maxLength={11}
                        type="tel"
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

          <TextDivider text="Indique o Nome e Telefone do cônjugue ou/e parente ou/e amigo próximo (2 opções de telefone)" />

          <div className="md:flex md:flex-row md:gap-4">
            <div className="w-full">
              <FormField
                control={form.control}
                name="contact1Name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="contact1Name">
                      Nome (primeiro contato) *
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="contact1Name"
                        placeholder="Digite o nome do primeiro contato"
                        type="text"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="contact1Phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="contact1Phone">
                      Tel. Fixo/Celular (primeiro contato) *
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="contact1Phone"
                        placeholder="(xx) xxxxx-xxxx"
                        maxLength={11}
                        type="tel"
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
          <div className="md:flex md:flex-row md:gap-4">
            <div className="w-full">
              <FormField
                control={form.control}
                name="contact2Name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="contact2Name">
                      Nome (segundo contato) *
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="contact2Name"
                        placeholder="Digite o nome do segundo contato"
                        type="text"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="contact2Phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="contact2Phone">
                      Tel. Fixo/Celular (segundo contato) *
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="contact2Phone"
                        placeholder="(xx) xxxxx-xxxx"
                        maxLength={11}
                        type="tel"
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

          <TextDivider text="Situação Alimentar e de Saúde" />

          <div className="md:flex md:flex-row md:gap-4">
            <div className="w-full">
              <FormField
                control={form.control}
                name="diet"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Faz dieta prescrita por médico? *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione uma opção" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem
                            value={"yes"}
                            onSelect={() => {
                              form.setValue("diet", "yes");
                            }}
                          >
                            Sim
                          </SelectItem>
                          <SelectItem
                            value={"no"}
                            onSelect={() => {
                              form.setValue("diet", "no");
                            }}
                          >
                            Não
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="dietSpec"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="dietSpec">Especifique</FormLabel>
                    <FormControl>
                      <Input
                        id="dietSpec"
                        placeholder="Se faz dieta prescrita por médico, especifique aqui"
                        type="text"
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
          <div className="md:flex md:flex-row md:gap-4">
            <div className="w-full">
              <FormField
                control={form.control}
                name="healthProblem"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Tem problema de Saúde? *</FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione uma opção" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem
                            value={"yes"}
                            onSelect={() => {
                              form.setValue("healthProblem", "yes");
                            }}
                          >
                            Sim
                          </SelectItem>
                          <SelectItem
                            value={"no"}
                            onSelect={() => {
                              form.setValue("healthProblem", "no");
                            }}
                          >
                            Não
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="healthProblemSpec"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="healthProblemSpec">
                      Especifique
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="healthProblemSpec"
                        placeholder="Se tem problema de saúde, especifique aqui"
                        type="text"
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

          <div className="md:flex md:flex-row md:gap-4">
            <div className="w-full">
              <FormField
                control={form.control}
                name="medication"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Usa medicação ou é alérgico? *</FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione uma opção" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem
                            value={"yes"}
                            onSelect={() => {
                              form.setValue("medication", "yes");
                            }}
                          >
                            Sim
                          </SelectItem>
                          <SelectItem
                            value={"no"}
                            onSelect={() => {
                              form.setValue("medication", "no");
                            }}
                          >
                            Não
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="medicationSpec"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="medicationSpec">Especifique</FormLabel>
                    <FormControl>
                      <Input
                        id="medicationSpec"
                        placeholder="Se usa medicação ou é alérgico, especifique aqui"
                        type="text"
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

          <TextDivider text="Aceite dos Termos de condições" />

          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <>
                <Card className="p-4 text-left">
                  <p className="text-sm tracking-wider text-muted-foreground font-bold">
                    Eu{" "}
                    <span className="font-bold text-black">
                      {form.getValues("fullName")
                        ? form.getValues("fullName")
                        : "seu nome aparece aqui"}{" "}
                    </span>
                    reafirmo todos os dados por mim acima citado,
                    responsabilizando-me a pela minha ida ao movimento
                    Cursilhista nos dias:{" "}
                    <span className="font-bold text-black">{eventDate}</span> e
                    chegarei na igreja{" "}
                    <span className="font-bold text-black">30 minutos</span>{" "}
                    antes do horário de saída para o evento.
                  </p>
                  <p className="text-sm tracking-wider text-muted-foreground font-bold">
                    Estou ciente de que a Igreja{" "}
                    <span className="font-bold text-red-500">NÃO</span> realiza
                    devolução/estorno do valor pago após o mesmo ser realizado.
                  </p>
                  <div className="pt-2 flex flex-row items-center gap-2 justify-end">
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="leading-none">
                        <FormLabel>Confirmar *</FormLabel>
                      </div>
                    </FormItem>
                  </div>
                </Card>
                <FormMessage className="flex items-end justify-end pr-2 pt-1" />
              </>
            )}
          />

          <TextDivider text="Espaço reservado para quem estiver lhe convidando" />

          <div className="md:flex md:flex-row md:gap-4">
            <div className="w-full">
              <FormField
                control={form.control}
                name="inviterName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="inviterName">Nome *</FormLabel>
                    <FormControl>
                      <Input
                        id="inviterName"
                        placeholder="Digite o nome de quem lhe convidou"
                        type="text"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="inviterPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="inviterPhone">
                      Tel. Fixo/Celular *
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="inviterPhone"
                        placeholder="(xx) xxxxx-xxxx"
                        maxLength={11}
                        type="tel"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="inviterCursillo"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Ja fez cursilho? *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione uma opção" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          value={"yes"}
                          onSelect={() => {
                            form.setValue("inviterCursillo", "yes");
                          }}
                        >
                          Sim
                        </SelectItem>
                        <SelectItem
                          value={"no"}
                          onSelect={() => {
                            form.setValue("inviterCursillo", "no");
                          }}
                        >
                          Não
                        </SelectItem>
                      </SelectContent>
                    </Select>
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
          <Card className="p-2 text-center mt-4">
            <p className="text-xs font-bold tracking-wider text-muted-foreground md:text-sm">
              Endereço: Av. Estância, n° 330 / Areias / Recife -
              PE / Fones: (81) 99971-6016 / 99936-5151
            </p>
          </Card>
        </form>
      </Form>
    </div>
  );
}
