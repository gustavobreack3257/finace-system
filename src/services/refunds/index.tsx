import { api } from "../axios";
import type {
  GetRefundsProps,
  GetRefundsResponse,
  CreateReceiptResponse,
  CreateRefundProps,
  CreateRefundResponse,
  RefundProps,
} from "../refunds/types";
import { queryOptions } from "@tanstack/react-query";

export async function getRefundsRequest({
  page,
  search = "",
}: GetRefundsProps) {
  const { data } = await api.get<GetRefundsResponse>("/refunds", {
    params: {
      page,
      q: search,
    },
  });

  return data;
}

export async function getRefundByIdRequest(id: string) {
  const { data } = await api.get<{ refund: RefundProps }>(`/refunds/${id}`);

  return data;
}

export const refundsQueryOptions = ({ page, search = "" }: GetRefundsProps) =>
  queryOptions({
    queryKey: ["/refunds", { page, search }],
    queryFn: () => getRefundsRequest({ page, search }),
  });

export async function createReceiptRequest(
  receiptFile: File,
): Promise<CreateReceiptResponse> {
  const formData = new FormData();

  formData.append("receiptFile", receiptFile);

  const { data } = await api.post<CreateReceiptResponse>("/receipts", formData);

  return data;
}

export async function createRefundRequest(
  refund: CreateRefundProps,
): Promise<CreateRefundResponse> {
  const { data } = await api.post<CreateRefundResponse>("/refunds", refund);

  return data;
}

export async function getReceiptDownloadUrlRequest(id: string) {
  const { data } = await api.get<{ url: string }>(`/receipts/download/${id}`);

  return data.url;
}

export async function deleteRefundRequest(id: string) {
  const { data } = await api.delete(`/refunds/${id}`);

  return data;
}
