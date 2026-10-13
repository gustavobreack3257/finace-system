import type { GetRefundsProps } from "../services/refunds/types";
import { refundsQueryOptions } from "../services/refunds/index";
import { useQuery } from "@tanstack/react-query";

export function useRefunds({ page, search }: GetRefundsProps) {
  const refundsQuery = useQuery(
    refundsQueryOptions({
      page,
      search,
    }),
  );

  return {
    refunds: refundsQuery.data?.refunds.data,
    pagination: refundsQuery.data?.refunds.meta,
    isLoading: refundsQuery.isLoading,
    isError: refundsQuery.isError,
  };
}
