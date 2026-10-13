import {
  ForkKnifeIcon,
  BedIcon,
  PoliceCarIcon,
  WrenchIcon,
  ReceiptIcon,
} from "@phosphor-icons/react";
import type { RefundProps } from "../services/refunds/types";

type RefundsListProps = {
  refund: RefundProps;
};

const categoryConfig = {
  food: {
    label: "Alimentação",
    icon: ForkKnifeIcon,
  },
  hosting: {
    label: "Hospedagem",
    icon: BedIcon,
  },
  transport: {
    label: "Transporte",
    icon: PoliceCarIcon,
  },
  services: {
    label: "Serviços",
    icon: WrenchIcon,
  },
  other: {
    label: "Outros",
    icon: ReceiptIcon,
  },
};

export function RefundList({ refund }: RefundsListProps) {
  const category =
    categoryConfig[refund.category as keyof typeof categoryConfig];

  const Icon = category.icon;

  function capitalizeFirstLetter(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  return (
    <section className="flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <div className="flex rounded-full bg-gray-400 items-center justify-center h-8 w-8">
          <Icon className="text-accent-brand" weight="fill" />
        </div>

        <div className="flex flex-col items-start">
          <strong className="text-sm font-bold">
            {capitalizeFirstLetter(refund.title)}
          </strong>
          <p className="text-xs">{category.label}</p>
        </div>
      </div>
      <div>
        <p>R$ {(refund.value / 100).toFixed(2).replace(".", ",")}</p>
      </div>
    </section>
  );
}
