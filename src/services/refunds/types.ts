export type RefundCategory =
  "food" | "hosting" | "transport" | "services" | "other";

export type RefundReceiptProps = {
  id: string;
  originalFilename: string;
  filename: string;
  path: string;
  extname: string;
  refundId: string;
  createdAt: string;
  updatedAt: string;
};

export type RefundProps = {
  id: string;
  title: string;
  category: string;
  value: number;
  createdAt: string;
  updatedAt: string;
  receipt: RefundReceiptProps;
};

export type GetRefundsProps = {
  page: number;
  search: string;
};

export type RefundPaginationProps = {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  firstPage: number;
  firstPageUrl: string;
  lastPageUrl: string;
};

export type GetRefundsResponse = {
  refunds: {
    meta: RefundPaginationProps;
    data: RefundProps[];
  };
};

export type CreateRefundProps = {
  title: string;
  category: RefundCategory;
  value: number;
  receipt: string;
};

export type CreateReceiptResponse = {
  receipt: Omit<RefundReceiptProps, "refundId">;
};

export type CreateRefundResponse = {
  refund: RefundProps;
};
