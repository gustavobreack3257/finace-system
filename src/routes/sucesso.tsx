import { createFileRoute, Link } from "@tanstack/react-router";

import LogoSuccessSVG from "../assets/LogoFeedback.svg";
export const Route = createFileRoute("/sucesso")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex justify-center">
      <main className="flex flex-col w-full max-w-3xl bg-gray-500 p-10 rounded-2xl gap-10">
        <div className="flex flex-col gap-6 justify-center items-center">
          <header className="flex justify-center w-full">
            <h1 className="font-bold text-2xl text-accent-brand ">
              Solicitação enviada !
            </h1>
          </header>

          <img
            src={LogoSuccessSVG}
            alt="Imagem de sucesso"
            // className="h-16 w-16"
          />

          <p className="block line-clamp-2 text-gray-200 text-sm text-center">
            Agora é apenas aguardar! Sua solicitação será analisada e, em <br />{" "}
            breve, o setor financeiro irá entrar em contato com você.
          </p>
        </div>

        <Link to="/solicitacao">
          <button
            type="button"
            className="flex w-full justify-center items-center bg-accent-brand h-12 text-white text-sm font-bold rounded-lg hover:bg-accent-brand-light cursor-pointer"
          >
            Nova solicitação
          </button>
        </Link>
      </main>
    </div>
  );
}
