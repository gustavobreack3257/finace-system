import { z } from "zod";

export const CreateSolicitationRefundSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Digite pelo menos 3 caracteres para o nome da solicitação"),

  category: z.enum(["food", "hosting", "transport", "services", "other"], {
    message: "Selecione uma categoria válida",
  }),

  value: z
    .string()
    .trim()
    .min(1, "Digite o valor do reembolso")
    .refine((value) => {
      const parsedValue = Number(value.replace(",", "."));
      return Number.isFinite(parsedValue) && parsedValue > 0;
    }, "Digite um valor maior que zero"),

  receiptFile: z.instanceof(File, {
    message: "Selecione um comprovante",
  }),
});
