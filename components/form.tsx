"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Icons } from "./ui/icons";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Divider } from "./divider";
import { Card, CardContent, CardHeader } from "./ui/card";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  const [date, setDate] = React.useState<Date>();

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="" htmlFor="fullName">
              Nome completo
            </Label>
            <Input id="fullName" placeholder="Digite seu nome" type="text" autoCapitalize="none" autoComplete="email" autoCorrect="off" disabled={isLoading} />
          </div>

          <div className="grid gap-1">
            <Label className="" htmlFor="fullName">
              Como deseja ser chamado(a)?
            </Label>
            <Input id="fullName" placeholder="Digite seu apelido" type="text" autoCapitalize="none" autoComplete="email" autoCorrect="off" disabled={isLoading} />
          </div>

          <div className="grid gap-1">
            <Label className="" htmlFor="nickname">
              Email
            </Label>
            <Input id="fullName" placeholder="Digite seu email" type="email" autoCapitalize="none" autoComplete="email" autoCorrect="off" disabled={isLoading} />
          </div>

          <div className="flex flex-row gap-4 w-full">
            <div className="w-full">
              <Popover>
                <Label className="" htmlFor="nickname">
                  Data de nascimento
                </Label>
                <PopoverTrigger asChild>
                  <Button variant={"outline"} className={cn("w-[280px] justify-start text-left font-normal", !date && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="w-full">
              <Label className="" htmlFor="nickname">
                Estado Civil
              </Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione uma opção" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Solteiro(a)</SelectItem>
                  <SelectItem value="maried">Casado(a)</SelectItem>
                  <SelectItem value="windowed">Viúvo(a)</SelectItem>
                  <SelectItem value="divorced">Divorciado(a)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-1">
            <Label className="" htmlFor="nickname">
              Camisa inclusa escolha o tamanho
            </Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione uma opção" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">P</SelectItem>
                <SelectItem value="single">M</SelectItem>
                <SelectItem value="single">G</SelectItem>
                <SelectItem value="single">GG</SelectItem>
                <SelectItem value="single">XG</SelectItem>
                <SelectItem value="single">XGG</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Divider />

          <div className="grid gap-1">
            <Label className="" htmlFor="nickname">
              Endereço
            </Label>
            <Input id="address" placeholder="Digite seu endereço completo" type="text" autoCapitalize="none" autoComplete="email" autoCorrect="off" disabled={isLoading} />
          </div>

          <div className="flex flex-row gap-4">
            <div className="w-full">
              <Label className="" htmlFor="nickname">
                Telefone Residencial
              </Label>
              <Input id="address" placeholder="(xx) xxxxx-xxxx" type="text" autoCapitalize="none" autoComplete="email" autoCorrect="off" disabled={isLoading} />
            </div>
            <div className="w-full">
              <Label className="" htmlFor="nickname">
                Telefone Comercial
              </Label>
              <Input id="address" placeholder="(xx) xxxxx-xxxx" type="text" autoCapitalize="none" autoComplete="email" autoCorrect="off" disabled={isLoading} />
            </div>
          </div>

          <Card className="my-3">
            <p className="my-2 mx-10 text-center font-bold">Indique o Nome e Telefone do cônjugue ou/e Parente ou/e amigo próximo (2 opções de telefone)</p>
          </Card>

          <div className="flex flex-row gap-4">
            <div className="w-full">
              <Label className="" htmlFor="nickname">
                Nome
              </Label>
              <Input id="address" placeholder="Digite o nome" type="text" autoCapitalize="none" autoComplete="email" autoCorrect="off" disabled={isLoading} />
            </div>
            <div className="w-full">
              <Label className="" htmlFor="nickname">
                Tel. Fixo/Celular
              </Label>
              <Input id="address" placeholder="(xx) xxxxx-xxxx" type="text" autoCapitalize="none" autoComplete="email" autoCorrect="off" disabled={isLoading} />
            </div>
          </div>

          <div className="flex flex-row gap-4">
            <div className="w-full">
              <Label className="" htmlFor="nickname">
                Nome
              </Label>
              <Input id="address" placeholder="Digite o nome" type="text" autoCapitalize="none" autoComplete="email" autoCorrect="off" disabled={isLoading} />
            </div>
            <div className="w-full">
              <Label className="" htmlFor="nickname">
                Tel. Fixo/Celular
              </Label>
              <Input id="address" placeholder="(xx) xxxxx-xxxx" type="text" autoCapitalize="none" autoComplete="email" autoCorrect="off" disabled={isLoading} />
            </div>
          </div>

          <Card className="my-3">
            <p className="my-2 mx-10 text-center font-bold">Situação Alimentar e de Saúde</p>
          </Card>

          <Button disabled={isLoading}>
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Sign In with Email
          </Button>
        </div>
      </form>
    </div>
  );
}
