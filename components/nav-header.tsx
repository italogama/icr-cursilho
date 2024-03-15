import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Instagram, Youtube } from "lucide-react";

export const NavHeader = () => {
  return (
    <nav className="bg-primary p-3">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link href="/">
          <div className="flex justify-center items-center">
            <Avatar className="bg-white">
              <AvatarImage src="/newlogoicrpretamedium.png" />
              <AvatarFallback>IC</AvatarFallback>
            </Avatar>

            <div className="text-sm pl-2 font-bold tracking-wide text-primary-foreground md:text-lg">
              Cursilho de Cristandade - Igreja Cristã em Recife
            </div>
          </div>
        </Link>
        <div className="flex mt-4 gap-2 md:mt-0 md:space-x-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="https://www.instagram.com/igrejacristaemrecife" target="_blank">
                  <Instagram style={{ color: "white" }} className="w-6 md:w-8" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Siga nosso instagram</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="https://www.youtube.com/@igrejacristaemrecife3669" target="_blank">
                  <Youtube style={{ color: "white" }} className="w-6 md:w-8" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Inscreva-se no canal do youtube</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </nav>
  );
};
