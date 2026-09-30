import { createFileRoute } from "@tanstack/react-router";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <main className="flex flex-col bg-gray-500 p-10">
        <header className="flex flex-col gap-6">
          <h1>Solicitação</h1>

          <div className="flex justify-between gap-3">
            <input
              type="text"
              className="flex border border-gray-300 w-full p-4 rounded-lg placeholder:text-accent-brand"
              placeholder="Pesquisar pelo nome"
            />

            <button className="flex items-center h-12 w-12 justify-center bg-accent-brand rounded-lg">
              <MagnifyingGlassIcon
                className="text-gray-500 h-6 w-6"
                weight="bold"
              />
            </button>
          </div>
        </header>
      </main>
    </div>
  );
}
