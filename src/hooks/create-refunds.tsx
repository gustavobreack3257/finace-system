import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createReceiptRequest,
  createRefundRequest,
} from "../services/refunds/index";

import { useMutation } from "@tanstack/react-query";
import { CreateSolicitationRefundSchema } from "../utils/create-solicitation-refund-schema";
import type z from "zod";

export function useCreateRefunds() {
  const form = useForm({
    resolver: zodResolver(CreateSolicitationRefundSchema),
    defaultValues: {
      title: "",
      category: undefined,
      value: "",
      receiptFile: undefined,
    },
  });

  const createReceiptMutation = useMutation({
    mutationFn: createReceiptRequest,
  });

  const createRefundMutation = useMutation({
    mutationFn: createRefundRequest,
  });

  async function createRefund(
    data: z.infer<typeof CreateSolicitationRefundSchema>,
  ) {
    const receiptResponse = await createReceiptMutation.mutateAsync(
      data.receiptFile,
    );

    const valueInCents = Math.round(Number(data.value.replace(",", ".")) * 100);

    const refundResponse = await createRefundMutation.mutateAsync({
      title: data.title,
      category: data.category,
      value: valueInCents,
      receipt: receiptResponse.receipt.id,
    });

    return refundResponse;
  }

  return {
    form,
    createReceiptMutation,
    createRefundMutation,
    createRefund,
    isCreating:
      createReceiptMutation.isPending || createRefundMutation.isPending,
  };
}
