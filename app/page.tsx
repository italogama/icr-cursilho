import { Footer } from "@/components/footer";
import { NavHeader } from "@/components/nav-header";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CircleDollarSign, MapPinned, UserPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const eventTitle = process.env.NEXT_PUBLIC_EVENT_TITLE;
  const eventDate = process.env.NEXT_PUBLIC_EVENT_DATE;
  const eventLocation = process.env.NEXT_PUBLIC_EVENT_LOCATION;
  const eventImage = process.env.NEXT_PUBLIC_EVENT_IMAGE || "";

  return (
    <div className="flex flex-col h-screen">
      <NavHeader />
      <section className="w-full h-full justify-center flex flex-col">
        <div className="container flex items-center gap-8 px-4 md:px-6">
          <div className="hidden sm:items-center sm:mt-5 sm:w-full sm:flex sm:flex-col">
            <Image alt="Logo event Image" className="aspect-[1/1] object-fill rounded-full" height="400" src={eventImage} width="350" />
            <blockquote className="space-y-2 mt-5">
              <p className="text-base indent-0">&ldquo;O Cursilho de Cristandade é uma jornada transformadora que ilumina corações, fortalece a fé e inspira ações cristãs, guiando cada passo rumo a uma vida plena no amor de Deus.&rdquo;</p>
              <footer className="text-sm">Pr. Bruno Moraes</footer>
            </blockquote>
          </div>
          <div className="space-y-4 w-full">
            <div className="flex flex-col sm:flex sm:flex-row items-center">
              <Image alt="Logo event Image" height="200" src="/newlogoicrpreta.png" width="300" className="hidden sm:block" />
              <Image alt="Logo event Image" height="150" src="/newlogoicrpreta.png" width="250" className="sm:hidden" />

              <div className="flex flex-col items-center">
                <h1 className="text-2xl font-bold tracking-wider sm:text-3xl">{eventTitle}</h1>

                <div className="flex flex-col w-full pt-5">
                  <div className="flex flex-row">
                    <p className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Data:</p>
                    <p className="text-xl text-zinc-900 dark:text-zinc-50 pl-2">{eventDate}</p>
                  </div>

                  <div className="flex flex-row">
                    <p className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Local:</p>
                    <p className="text-xl text-zinc-900 dark:text-zinc-50 pl-2">{eventLocation}</p>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link href="https://maps.app.goo.gl/Z2ksWdwRx8iSpmVc8" target="_blank">
                            <MapPinned className="ml-2" />
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Clique para ver a localização</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </div>
            </div>

            <Button asChild className="w-full h-12 text-sm rounded-md  text-zinc-50 shadow-sm dark:bg-zinc-50 dark:text-zinc-900">
              <Link href={"/register"}>
                <UserPlus className="mr-2" />
                Realizar inscrição
              </Link>
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground"> Já realizou sua inscrição? </span>
              </div>
            </div>

            <Button asChild className="w-full h-12 text-sm rounded-md  text-zinc-50 shadow-sm dark:bg-zinc-50  cursor-pointer">
              <Link href={"/payment"}>
                <CircleDollarSign className="mr-2" />
                Realizar pagamento
              </Link>
            </Button>

            <blockquote className="space-y-2 pt-10 sm:hidden">
              <p className="text-sm indent-0">&ldquo;O Cursilho de Cristandade é uma jornada transformadora que ilumina corações, fortalece a fé e inspira ações cristãs, guiando cada passo rumo a uma vida plena no amor de Deus.&rdquo;</p>
              <footer className="text-sm">Pr. Bruno Moraes</footer>
            </blockquote>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
