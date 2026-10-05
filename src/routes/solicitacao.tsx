import { createFileRoute, Link } from "@tanstack/react-router";

import * as Dialog from "@radix-ui/react-dialog";
import * as Select from "@radix-ui/react-select";

import { CaretDownIcon, CloudArrowUpIcon } from "@phosphor-icons/react";

import { DeleteRefundModal } from "../components/delete-refund-modal";

export const Route = createFileRoute("/solicitacao")({
  component: RouteComponent,
});

function RouteComponent() {
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
                className="flex p-4 w-full rounded-lg border border-gray-300 h-12 text-gray-200 placeholder:text-gray-200 focus:border-2 focus:border-accent-brand-light"
                placeholder="Digite o nome da solicitação"
              />
            </label>

            <div className="flex justify-between">
              <Select.Root>
                <Select.Group>
                  <div className="flex flex-col gap-2">
                    <Select.Label className="flex flex-col gap-2 text-gray-200">
                      Categoria
                    </Select.Label>
                    <Select.Trigger className="flex p-4 w-full min-w-2xs rounded-lg border border-gray-300 h-12 text-gray-200 placeholder:text-gray-200 focus:border-2 focus:border-accent-brand-light justify-between items-center">
                      <Select.Value placeholder="Escolha a categoria" />

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

              <label htmlFor="" className="flex flex-col gap-2 text-gray-200">
                Valor
                <input
                  type="text"
                  className="flex p-4 rounded-lg border border-gray-300 h-12 text-gray-200 placeholder:text-gray-200 focus:border-2 focus:border-accent-brand-light"
                  placeholder="Digite o valor do reembolso"
                />
              </label>
            </div>

            <div className="flex items-center">
              <label className="flex flex-col w-full gap-2 text-gray-200">
                Comprovante
                <div className="flex items-center justify-end">
                  <input
                    type="text"
                    className="flex p-4 w-full rounded-lg border border-gray-300 h-12 text-gray-200 placeholder:text-gray-200 focus:border-2 focus:border-accent-brand-light"
                    placeholder="Nome do arquivo .pdf"
                  />

                  <button
                    type="button"
                    className="flex h-12 w-12 p-3 bg-accent-brand rounded-lg absolute hover:bg-accent-brand-light"
                  >
                    <CloudArrowUpIcon className="h-6 w-6 text-gray-500 " />
                  </button>
                </div>
              </label>
            </div>
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <Link to="/sucesso">
                  <button
                    type="button"
                    className="flex w-full justify-center items-center bg-accent-brand h-12 text-white text-sm font-bold rounded-lg hover:bg-accent-brand-light cursor-pointer"
                  >
                    Enviar
                  </button>
                </Link>
              </Dialog.Trigger>

              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50" />

                <DeleteRefundModal />
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </div>
      </main>
    </div>
  );
}
