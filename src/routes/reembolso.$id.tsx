import { createFileRoute } from "@tanstack/react-router";
import NoteSVG from "../assets/Note.svg";
export const Route = createFileRoute("/reembolso/$id")({
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
              <label htmlFor="" className="flex flex-col gap-2 text-gray-200">
                Categoria
                <input
                  type="text"
                  className="flex p-4 w-full min-w-2xs rounded-lg border border-gray-300 h-12 text-gray-200 placeholder:text-gray-200 focus:border-2 focus:border-accent-brand-light"
                  placeholder="Escolha as opções de Categoria"
                />
              </label>

              <label htmlFor="" className="flex flex-col gap-2 text-gray-200">
                Valor
                <input
                  type="text"
                  className="flex p-4 rounded-lg border border-gray-300 h-12 text-gray-200 placeholder:text-gray-200 focus:border-2 focus:border-accent-brand-light"
                  placeholder="Digite o valor do reembolso"
                />
              </label>
            </div>

            <div className="flex justify-center gap-2">
              <img src={NoteSVG} alt="" />
              <button type="button" className="cursor-pointer">
                <span className="font-semibold text-accent-brand text-sm">
                  Abrir comprovante
                </span>
              </button>
            </div>

            <button
              type="button"
              className="flex justify-center items-center bg-accent-brand h-12 text-white text-sm font-bold"
            >
              Excluir
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
