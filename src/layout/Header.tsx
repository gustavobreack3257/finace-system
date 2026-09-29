import LogoSVG from "../assets/Logo.svg";
export function Header() {
  return (
    <div className="flex justify-between items-center sm:w-full">
      <img src={LogoSVG} alt="Logo" />

      <div className="flex gap-2 items-center">
        <p>Solicitação de reembolso</p>

        <button
          type="button"
          className="items-center h-12 w-38 rounded-lg bg-accent-brand text-sm text-white font-bold"
        >
          Nova solicitação
        </button>
      </div>
    </div>
  );
}
