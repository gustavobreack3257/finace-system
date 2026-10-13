import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import * as Select from "@radix-ui/react-select";
import { CaretDownIcon, CloudArrowUpIcon } from "@phosphor-icons/react";

import type { z } from "zod";

import type { CreateSolicitationRefundSchema } from "../utils/create-solicitation-refund-schema";
import { useCreateRefunds } from "../hooks/create-refunds";

export const Route = createFileRoute("/solicitacao")({
  component: RouteComponent,
});

type SolicitationFormData = z.infer<typeof CreateSolicitationRefundSchema>;

function RouteComponent() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");

  const { form, createRefund, isCreating } = useCreateRefunds();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const selectedCategory = watch("category");

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    setFileName(file.name);

    setValue("receiptFile", file, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }

  async function onSubmit(data: SolicitationFormData) {
    try {
      await createRefund(data);

      await navigate({
        to: "/sucesso",
      });
    } catch (error) {
      console.error("Erro ao criar reembolso", error);
    }
  }

  return (
    <div className="min-h-screen bg-[#E5EDEA] px-4 py-10">
      <main className="mx-auto w-full max-w-lg rounded-2xl bg-[#F8FAF9] p-6 sm:p-10">
        <header className="mb-10">
          <h1 className="text-xl font-bold text-[#252C29]">
            Nova solicitação de reembolso
          </h1>

          <p className="mt-2 text-sm text-[#65716C]">
            Dados da despesa para solicitar reembolso.
          </p>
        </header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="title"
              className="text-[10px] uppercase text-[#52615C]"
            >
              Nome da solicitação
            </label>

            <input
              id="title"
              {...register("title")}
              className="h-12 w-full rounded-lg border border-[#CBD5D1] bg-transparent px-4 text-sm text-[#52615C] outline-none focus:border-2 focus:border-[#20885D]"
            />

            {errors.title && (
              <p className="text-xs text-accent-brand-light">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-[1fr_155px] gap-4">
            <div className="flex min-w-0 flex-col gap-2">
              <label className="text-[10px] uppercase text-[#52615C]">
                Categoria
              </label>

              <Select.Root
                value={selectedCategory}
                onValueChange={(value) =>
                  setValue(
                    "category",
                    value as SolicitationFormData["category"],
                    {
                      shouldValidate: true,
                      shouldDirty: true,
                    },
                  )
                }
              >
                <Select.Trigger className="flex h-12 w-full items-center justify-between rounded-lg border border-[#CBD5D1] bg-transparent px-4 text-sm text-[#52615C] outline-none focus:border-2 focus:border-[#20885D]">
                  <Select.Value placeholder="Selecione" />
                  <Select.Icon>
                    <CaretDownIcon />
                  </Select.Icon>
                </Select.Trigger>

                <Select.Portal>
                  <Select.Content className="z-50 rounded-lg border border-[#CBD5D1] bg-[#F8FAF9] shadow-lg">
                    <Select.Viewport className="p-2">
                      <Select.Item
                        value="food"
                        className="cursor-pointer rounded px-3 py-2 text-sm outline-none hover:bg-[#E5EDEA]"
                      >
                        <Select.ItemText>Alimentação</Select.ItemText>
                      </Select.Item>

                      <Select.Item
                        value="hosting"
                        className="cursor-pointer rounded px-3 py-2 text-sm outline-none hover:bg-[#E5EDEA]"
                      >
                        <Select.ItemText>Hospedagem</Select.ItemText>
                      </Select.Item>

                      <Select.Item
                        value="transport"
                        className="cursor-pointer rounded px-3 py-2 text-sm outline-none hover:bg-[#E5EDEA]"
                      >
                        <Select.ItemText>Transporte</Select.ItemText>
                      </Select.Item>

                      <Select.Item
                        value="services"
                        className="cursor-pointer rounded px-3 py-2 text-sm outline-none hover:bg-[#E5EDEA]"
                      >
                        <Select.ItemText>Serviços</Select.ItemText>
                      </Select.Item>

                      <Select.Item
                        value="other"
                        className="cursor-pointer rounded px-3 py-2 text-sm outline-none hover:bg-[#E5EDEA]"
                      >
                        <Select.ItemText>Outros</Select.ItemText>
                      </Select.Item>
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>

              {errors.category && (
                <p className="text-xs text-accent-brand-light">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div className="flex min-w-0 flex-col gap-2">
              <label
                htmlFor="value"
                className="text-[10px] uppercase text-[#52615C]"
              >
                Valor
              </label>

              <input
                id="value"
                {...register("value")}
                type="text"
                inputMode="decimal"
                placeholder="0,00"
                className="h-12 w-full rounded-lg border border-[#CBD5D1] bg-transparent px-4 text-sm text-[#52615C] outline-none placeholder:text-[#52615C] focus:border-2 focus:border-[#20885D]"
              />

              {errors.value && (
                <p className="text-xs text-accent-brand-light">
                  {errors.value.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="input-file"
              className="text-[10px] uppercase text-[#52615C]"
            >
              Comprovante
            </label>

            <div className="flex h-12 w-full items-center overflow-hidden rounded-lg border border-[#CBD5D1]">
              <span
                className="min-w-0 flex-1 truncate px-4 text-sm text-[#52615C]"
                title={fileName}
              >
                {fileName || "Nome do arquivo.pdf"}
              </span>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                className="hidden"
                onChange={handleFileChange}
              />

              <button
                type="button"
                aria-label="Selecionar comprovante"
                onClick={() => fileInputRef.current?.click()}
                className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#20885D] text-white hover:bg-[#176F4B]"
              >
                <CloudArrowUpIcon size={24} />
              </button>
            </div>

            {errors.receiptFile && (
              <p className="text-xs text-accent-brand-light">
                {errors.receiptFile.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="mt-1 flex h-12 w-full items-center justify-center rounded-lg bg-[#20885D] text-sm font-bold text-white hover:bg-[#176F4B] cursor-pointer"
          >
            Enviar
          </button>
        </form>
      </main>
    </div>
  );
}
