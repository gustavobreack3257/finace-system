import * as Dialog from "@radix-ui/react-dialog";

export function DeleteRefundModal() {
  return (
    <Dialog.Content
      className="
        fixed
        left-1/2
        top-1/2
        z-50
        w-full
        max-w-md
        -translate-x-1/2
        -translate-y-1/2
        rounded-2xl
        bg-gray-500
        p-8
      "
    >
      <Dialog.Title className="text-xl font-bold text-gray-100">
        Excluir solicitação
      </Dialog.Title>

      <Dialog.Description className="mt-3 text-sm text-gray-200">
        Tem certeza que deseja excluir essa solicitação? Essa ação é
        irreversível.
      </Dialog.Description>

      <div className="mt-8 flex justify-end gap-3">
        <Dialog.Close asChild>
          <button type="button" className="rounded-lg px-4 py-2">
            Cancelar
          </button>
        </Dialog.Close>

        <button
          type="button"
          className="rounded-lg bg-accent-brand px-4 py-2 text-white"
        >
          Confirmar
        </button>
      </div>
    </Dialog.Content>
  );
}
