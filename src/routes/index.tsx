import { createFileRoute } from "@tanstack/react-router";
import {
  MagnifyingGlassIcon,
  CaretRightIcon,
  CaretLeftIcon,
} from "@phosphor-icons/react";
import { RefundList } from "../components/refund-list";
export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-6">
      <main className="flex flex-col bg-gray-500 p-10 rounded-2xl gap-6">
        <header className="flex flex-col gap-6">
          <h1 className="font-bold text-xl text-gray-100">Solicitação</h1>

          <div className="flex justify-between gap-3">
            <input
              type="text"
              className="flex border border-gray-300 w-full p-4 rounded-lg placeholder:text-accent-brand"
              placeholder="Pesquisar pelo nome"
            />

            <button
              type="button"
              className="flex items-center h-12 w-12 justify-center bg-accent-brand rounded-lg"
            >
              <MagnifyingGlassIcon
                className="text-gray-500 h-6 w-6"
                weight="bold"
              />
            </button>
          </div>
        </header>

        <RefundList />
        <RefundList />
        <RefundList />
        <RefundList />
        <RefundList />
        <RefundList />
        <RefundList />
      </main>

      <div className="flex items-center justify-center gap-4 mb-6">
        <button
          type="button"
          className="flex h-8 w-8 bg-accent-brand rounded-lg items-center justify-center cursor-pointer"
        >
          <CaretLeftIcon className="text-gray-500 h-6 w-6" weight="bold" />
        </button>
        <p>1/3</p>
        <button
          type="button"
          className="flex h-8 w-8 bg-accent-brand rounded-lg items-center justify-center cursor-pointer"
        >
          <CaretRightIcon className="text-gray-500 h-6 w-6" weight="bold" />
        </button>
      </div>
    </div>
  );
}
