import { ForkKnifeIcon } from "@phosphor-icons/react";

export function RefundList() {
  return (
    <section className="flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <div className="flex rounded-full bg-gray-400 items-center justify-center h-8 w-8">
          <ForkKnifeIcon className="text-accent-brand" weight="fill" />
        </div>

        <div>
          <strong>Gustavo costa souza</strong>
          <p>Alimentação</p>
        </div>
      </div>
      <div>
        <p>R$ 31,52</p>
      </div>
    </section>
  );
}
