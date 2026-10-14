import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRefundRequest } from "../services/refunds";

export function useDeleteRefunds() {
  const queryClient = useQueryClient();

  const deleteRefundMutation = useMutation({
    mutationFn: deleteRefundRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["/refunds"],
        exact: true,
      });
    },
  });

  return {
    deleteRefund: deleteRefundMutation.mutateAsync,
    isDeleting: deleteRefundMutation.isPending,
  };
}
