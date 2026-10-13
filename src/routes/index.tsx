import { createFileRoute } from "@tanstack/react-router";
import {
  MagnifyingGlassIcon,
  CaretRightIcon,
  CaretLeftIcon,
} from "@phosphor-icons/react";
import { RefundList } from "../components/refund-list";
import z from "zod";
import { refundsQueryOptions } from "../services/refunds";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const refundSearchParamsSchema = z.object({
  page: z.number().optional(),
  q: z.string().optional(),
});

export const Route = createFileRoute("/")({
  component: RouteComponent,

  validateSearch: (search) => refundSearchParamsSchema.parse(search),
  loaderDeps: ({ search }) => ({
    page: search.page,
    q: search.q,
  }),

  loader: async ({ context, deps }) => {
    const { page, q } = deps;
    const { queryClient } = context;

    await queryClient.ensureQueryData(
      refundsQueryOptions({
        page: page || 1,
        search: q || "",
      }),
    );
  },
});

function RouteComponent() {
  const { page, q } = Route.useSearch();

  const navigate = Route.useNavigate();

  const [search, setSearch] = useState(q || "");

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate({
        search: (prev) => ({
          ...prev,
          q: search,
          page: 1,
        }),
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [search, navigate]);

  const { data } = useSuspenseQuery(
    refundsQueryOptions({
      page: page || 1,
      search: q || "",
    }),
  );

  const refunds = data.refunds.data;
  const pagination = data.refunds.meta;
  return (
    <div className="flex flex-col gap-6">
      <main className="flex flex-col bg-gray-500 p-10 rounded-2xl gap-6">
        <header className="flex flex-col gap-6">
          <h1 className="font-bold text-xl text-gray-100">Solicitação</h1>

          <div className="flex justify-between gap-3">
            <input
              type="text"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
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

        {refunds.map((refund) => (
          <button
            key={refund.id}
            type="button"
            onClick={() =>
              navigate({
                to: "/reembolso/$id",
                params: {
                  id: refund.id,
                },
              })
            }
            className="hover:bg-gray-400"
          >
            <RefundList refund={refund} />
          </button>
        ))}
      </main>

      <div className="flex items-center justify-center gap-4 mb-6">
        <button
          type="button"
          onClick={() => {
            navigate({
              search: (prev) => ({
                ...prev,
                page: Math.max(1, pagination.currentPage - 1),
              }),
            });
          }}
          disabled={pagination.currentPage === 1}
          className="flex h-8 w-8 bg-accent-brand rounded-lg items-center justify-center cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <CaretLeftIcon className="text-gray-500 h-6 w-6" weight="bold" />
        </button>
        <div className="flex items-center gap-1">
          <span
            className={
              pagination.currentPage === 1 ? "opacity-100" : "opacity-40"
            }
          >
            {pagination.currentPage}
          </span>

          <span>/</span>

          <span
            className={
              pagination.currentPage === pagination.lastPage
                ? "opacity-100"
                : "opacity-40"
            }
          >
            {pagination.lastPage}
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            navigate({
              search: (prev) => ({
                ...prev,
                page: Math.min(pagination.lastPage, pagination.currentPage + 1),
              }),
            });
          }}
          disabled={pagination.currentPage === pagination.lastPage}
          className="flex h-8 w-8 bg-accent-brand rounded-lg items-center justify-center cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <CaretRightIcon className="text-gray-500 h-6 w-6" weight="bold" />
        </button>
      </div>
    </div>
  );
}
