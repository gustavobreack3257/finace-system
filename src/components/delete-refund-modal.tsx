import * as Dialog from "@radix-ui/react-dialog";

type DeleteRefundModalProps = {
  onConfirm: () => void;
  isDeleting: boolean;
};

export function DeleteRefundModal({
  onConfirm,
  isDeleting,
}: DeleteRefundModalProps) {
  return (
    <Dialog.Content
      className="

        fixed
        left-1/2
        top-1/2
        z-50
        h-56
        w-full
        max-w-lg
        -translate-x-1/2
        -translate-y-1/2
        rounded-2xl
        bg-gray-500
        p-10
      "
    >
      <Dialog.Title className="text-xl font-bold text-gray-100">
        Excluir solicitação
      </Dialog.Title>

      <Dialog.Description className="mt-3 text-sm text-gray-200">
        Tem certeza que deseja excluir essa solicitação? Essa ação é
        irreversível.
      </Dialog.Description>

      <div className="mt-6 flex justify-end gap-3">
        <Dialog.Close asChild>
          <button
            type="button"
            className="rounded-lg px-4 py-2  hover:text-accent-brand"
          >
            Cancelar
          </button>
        </Dialog.Close>

        <button
          type="button"
          onClick={onConfirm}
          disabled={isDeleting}
          className="rounded-lg bg-accent-brand hover:bg-accent-brand-light px-4 py-2 text-white"
        >
          Confirmar
        </button>
      </div>
    </Dialog.Content>
  );
}
