import { Link } from "@tanstack/react-router";
import LogoSVG from "../assets/Logo.svg";
export function Header() {
  return (
    <div className="flex justify-between items-center w-full">
      <Link to="/">
        <img src={LogoSVG} alt="Logo" />
      </Link>

      <div className="flex gap-4 items-center">
        <p>Solicitação de reembolso</p>

        <Link to="/reembolso/$id" params={{ id: "refund-id" }}>
          <button
            type="button"
            className="items-center h-12 w-38 rounded-lg bg-accent-brand text-sm text-white font-bold cursor-pointer hover:bg-accent-brand-light transition duration-200"
          >
            Nova solicitação
          </button>
        </Link>
      </div>
    </div>
  );
}
