import { useQuery } from "@tanstack/react-query";
import { getRefundByIdRequest } from "../services/refunds";

export function useRefundDetails(id: string) {
  const refundQuery = useQuery({
    queryKey: ["/refunds", id],
    queryFn: () => getRefundByIdRequest(id),
  });

  return {
    refund: refundQuery.data?.refund,
    isLoading: refundQuery.isLoading,
    isError: refundQuery.isError,
  };
}
