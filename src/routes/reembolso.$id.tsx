import { createFileRoute, useNavigate } from "@tanstack/react-router";
import NoteSVG from "../assets/Note.svg";
import { CaretDownIcon } from "@phosphor-icons/react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Select from "@radix-ui/react-select";

import { DeleteRefundModal } from "../components/delete-refund-modal";
import { useRefundDetails } from "../hooks/use-refund-details";
import { getReceiptDownloadUrlRequest } from "../services/refunds";
import { useDeleteRefunds } from "../hooks/delete-refunds";
import { useState } from "react";
export const Route = createFileRoute("/reembolso/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { refund, isLoading, isError } = useRefundDetails(id);

  const { deleteRefund, isDeleting } = useDeleteRefunds();

  if (isLoading) {
    return <p>Carregando reembolso...</p>;
  }

  if (isError || !refund) {
    return <p>Não foi possível carregar o reembolso.</p>;
  }

  const categoryLabels: Record<string, string> = {
    food: "Alimentação",
    hosting: "Hospedagem",
    transport: "Transporte",
    services: "Serviços",
    other: "Outros",
  };

  async function handleOpenReceipt() {
    try {
      const url = await getReceiptDownloadUrlRequest(refund.receipt.id);

      const receiptUrl = new URL(url, import.meta.env.VITE_API_URL).href;

      window.open(receiptUrl, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("Erro ao abrir comprovante:", error);
    }
  }

  async function handleDeleteRefund() {
    try {
      await deleteRefund(id);
      setIsDeleteModalOpen(false);
      await navigate({ to: "/" });
    } catch (error) {
      console.error("Erro ao excluir reembolso:", error);
    }
  }

  return (
    <div className="flex flex-col gap-6 items-center">
      <main className="flex flex-col max-w-3xl bg-gray-500 p-10 rounded-2xl ">
        <div className="flex flex-col gap-10">
          <header className="flex flex-col w-lg gap-3">
            <h1 className="font-bold text-xl text-gray-100 ">
              Solicitação de reembolso
            </h1>
            <p className="text-sm text-gray-200">
              Dados da despesa para solicitar reembolso.
            </p>
          </header>

          <div className="flex flex-col gap-8">
            <label htmlFor="" className="flex flex-col gap-2 text-gray-200">
              Nome da solicitação
              <input
                type="text"
                value={refund.title}
                disabled
                className="flex p-4 w-full rounded-lg border border-gray-300 h-12 text-gray-200 placeholder:text-gray-200 focus:border-2 focus:border-accent-brand-light"
                placeholder="Digite o nome da solicitação"
              />
            </label>

            <div className="flex justify-between">
              <Select.Root value={refund.category} disabled>
                <Select.Group>
                  <div className="flex flex-col gap-2">
                    <Select.Label className="flex flex-col gap-2 text-gray-200">
                      Categoria
                    </Select.Label>
                    <Select.Trigger className="flex p-4 w-full min-w-2xs rounded-lg border border-gray-300 h-12 text-gray-200 placeholder:text-gray-200 focus:border-2 focus:border-accent-brand-light justify-between items-center">
                      <Select.Value>
                        {categoryLabels[refund.category] ??
                          "Categoria desconhecida"}
                      </Select.Value>

                      <Select.Icon className="flex items-center justify-center">
                        <CaretDownIcon />
                      </Select.Icon>
                    </Select.Trigger>
                  </div>

                  <Select.Portal>
                    <Select.Content className=" z-50 rounded-lg border border-gray-300 bg-gray-500 shadow-lg ">
                      <Select.Viewport className="flex flex-col gap-2 p-5">
                        <Select.Item value="alimentação">
                          <Select.ItemText>Alimentação</Select.ItemText>
                        </Select.Item>

                        <Select.Item value="hospedagem">
                          <Select.ItemText>Hospedagem</Select.ItemText>
                        </Select.Item>

                        <Select.Item value="transporte">
                          <Select.ItemText>Transporte</Select.ItemText>
                        </Select.Item>

                        <Select.Item value="servicos">
                          <Select.ItemText>Serviços</Select.ItemText>
                        </Select.Item>

                        <Select.Item value="outros">
                          <Select.ItemText>Outros</Select.ItemText>
                        </Select.Item>
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Group>
              </Select.Root>

              {/*  <label htmlFor="" className="flex flex-col gap-2 text-gray-200">
                Categoria
                <input
                  type="text"
                  className="flex p-4 w-full min-w-2xs rounded-lg border border-gray-300 h-12 text-gray-200 placeholder:text-gray-200 focus:border-2 focus:border-accent-brand-light"
                  placeholder="Escolha as opções de Categoria"
                />
              </label> */}

              <label htmlFor="" className="flex flex-col gap-2 text-gray-200">
                Valor
                <input
                  type="text"
                  value={(refund.value / 100).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                  disabled
                  className="flex p-4 rounded-lg border border-gray-300 h-12 text-gray-200 placeholder:text-gray-200 focus:border-2 focus:border-accent-brand-light"
                  placeholder="Digite o valor do reembolso"
                />
              </label>
            </div>

            <div className="flex justify-center gap-2">
              <img src={NoteSVG} alt="" />
              <button
                type="button"
                onClick={handleOpenReceipt}
                className="cursor-pointer"
              >
                <span className="font-semibold text-accent-brand text-sm">
                  Abrir comprovante
                </span>
              </button>
            </div>
            <Dialog.Root
              open={isDeleteModalOpen}
              onOpenChange={setIsDeleteModalOpen}
            >
              <Dialog.Trigger asChild>
                <button
                  type="button"
                  className="flex w-full justify-center items-center bg-accent-brand h-12 text-white text-sm font-bold rounded-lg hover:bg-accent-brand-light"
                >
                  Excluir
                </button>
              </Dialog.Trigger>

              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50" />

                <DeleteRefundModal
                  onConfirm={handleDeleteRefund}
                  isDeleting={isDeleting}
                />
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </div>
      </main>
    </div>
  );
}
