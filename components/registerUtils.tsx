import { phoneRegex } from "@/lib/helpers/helpers";
import { z } from "zod";

export const registerFormSchema = z
  .object({
    fullName: z
      .string({ required_error: "Você deve preencher seu nome completo" })
      .min(5, { message: "Seu nome precisa ter mais de 5 caracteres" }),
    cpf: z
      .string({ required_error: "Você deve preencher seu CPF" })
      .min(3, { message: "Seu cpf precisa ter 11 digitos" }),
    profession: z
      .string({ required_error: "Você deve preencher sua profissão" })
      .min(3, { message: "Sua profissão precisa ter mais de 3 caracteres" }),
    nickname: z
      .string({ required_error: "Você deve preencher como deseja ser chamado" })
      .min(3, { message: "Seu apelido precisa ter mais de 3 caracteres" }),
    email: z
      .string({ required_error: "Você deve preencher seu email" })
      .email({ message: "Você deve preencher um email válido" }),
    instagram: z.string().optional(),
    birthDate: z.date({
      required_error: "Você deve preencher sua data de nascimento",
    }),
    civilStatus: z
      .string({ required_error: "Você deve preencher seu estado civil" })
      .min(3, { message: "Você deve preencher seu estado civil" }),
    shirtSize: z
      .string({ required_error: "Escolha um tamanho de camisa" })
      .min(1, { message: "Você deve escolher um tamanho de camisa" }),
    addressStreet: z
      .string({ required_error: "Você deve preencher sua rua" })
      .min(3, { message: "Você deve preencher sua rua" }),
    addressNumber: z
      .string({ required_error: "Você deve preencher o número da sua residência" })
      .min(1, { message: "Você deve preencher o número da sua residência" }),
    addressComplement: z
      .string({ required_error: "Você deve preencher seu complemento" })
      .min(3, { message: "Você deve preencher seu complemento" }),
    addressNeighborhood: z
      .string({ required_error: "Você deve preencher seu bairro" })
      .min(3, { message: "Você deve preencher seu bairro" }),
    addressCity: z
      .string({ required_error: "Você deve preencher sua cidade" })
      .min(3, { message: "Você deve preencher sua cidade" }),
    addressZipCode: z
      .string({ required_error: "Você deve preencher seu CEP" })
      .min(3, { message: "Você deve preencher seu CEP" }),
    homePhone: z
      .string({ required_error: "Você deve preencher um número de telefone" })
      .regex(phoneRegex, "Número invalido"),
    workPhone: z.string().regex(phoneRegex, "Número invalido").optional(),
    contact1Name: z
      .string({ required_error: "Você deve preencher o nome do contato" })
      .min(3, {
        message: "O nome do contato precisar ter mais de 3 caracteres",
      }),
    contact1Phone: z
      .string({ required_error: "Você deve preencher o telefone do contato" })
      .regex(phoneRegex, "Número invalido"),
    contact2Name: z
      .string({ required_error: "Você deve preencher o nome do contato" })
      .min(3, {
        message: "O nome do contato precisar ter mais de 3 caracteres",
      }),
    contact2Phone: z
      .string({ required_error: "Você deve preencher o telefone do contato" })
      .regex(phoneRegex, "Número invalido"),
    diet: z.enum(["yes", "no"], {
      invalid_type_error: "Selecione sim ou não",
      required_error: "Você deve preencher se faz dieta ou não",
    }),
    dietSpec: z.string().optional(),
    healthProblem: z.enum(["yes", "no"], {
      invalid_type_error: "Selecione sim ou não",
      required_error: "Você deve preencher se faz dieta ou não",
    }),
    healthProblemSpec: z.string().optional(),
    medication: z.enum(["yes", "no"], {
      invalid_type_error: "Selecione sim ou não",
      required_error: "Você deve preencher se tem problema de saúde ou não",
    }),
    medicationSpec: z.string().optional(),
    terms: z.boolean({ required_error: "Você deve aceitar os termos" }),
    inviterName: z
      .string({
        required_error: "Você deve preencher o nome de quem lhe convidou",
      })
      .min(3, {
        message: "O nome do contato precisar ter mais de 3 caracteres",
      }),
    inviterPhone: z
      .string({
        required_error: "Você deve preencher o telefone de quem lhe convidou",
      })
      .regex(phoneRegex, "Número invalido"),
    inviterCursillo: z.enum(["yes", "no"], {
      invalid_type_error: "Selecione sim ou não",
      required_error: "Você deve preencher ja fez cursilho ou não",
    }),
  })
  .superRefine(
    (
      {
        diet,
        dietSpec,
        healthProblem,
        healthProblemSpec,
        medication,
        medicationSpec,
      },
      refinementContext
    ) => {
      if (diet === "yes" && dietSpec === "") {
        return refinementContext.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Você deve especificar a dieta",
          path: ["dietSpec"],
        });
      }

      if (healthProblem === "yes" && dietSpec === "") {
        return refinementContext.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Você deve especificar o problema de saúde",
          path: ["dietSpec"],
        });
      }

      if (medication === "yes" && medicationSpec === "") {
        return refinementContext.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Você deve especificar a medicação/alergia",
          path: ["medicationSpec"],
        });
      }
    }
  );
