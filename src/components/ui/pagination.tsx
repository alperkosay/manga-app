"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Url } from "url";
import { Button } from "./button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { Meta } from "~/types/payload";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationLinkType = {
  href: Partial<Url>;
  className?: string;
  children?: React.ReactNode;
  disabled: boolean;
};
const PaginationLink = ({
  href,
  children,
  className,
  disabled,
}: PaginationLinkType) => {
  return (
    <Button disabled={disabled} asChild>
      <Link
        href={href}
        className={
          disabled ? "pointer-events-none !cursor-not-allowed opacity-50" : ""
        }
      >
        {children}
      </Link>
    </Button>
  );
};

const Pagination = ({
  meta,
  searchParams,
}: {
  meta: Meta;
  searchParams?: {
    category?: string;
    page?: string;
  };
}) => {
  const pathname = usePathname();
  const { pagination } = meta;

  return (
    !!pagination && (
      <div className="flex justify-center py-4">
        <TooltipProvider>
          <ul className="flex flex-wrap items-center gap-2">
            <li>
              <PaginationLink
                href={{
                  pathname,
                  query: `page=${pagination.page - 1}${searchParams?.category ? `&category=${searchParams.category}` : ""}`,
                }}
                disabled={pagination.page === 1}
              >
                <ChevronLeft />
              </PaginationLink>
            </li>

            {Array.from({ length: pagination.pageCount }).map((_, index) => {
              const page = index + 1;
              const isCurrentPage = page === pagination.page;
              const isLastPage = page === pagination.pageCount;

              if (
                (page >= pagination.page + 4 &&
                  page !== pagination.pageCount) ||
                (page <= pagination.page - 4 && page !== 1)
              ) {
                return null;
              }

              if (
                page >= pagination.page + 3 &&
                page !== pagination.pageCount
              ) {
                return (
                  <li className="flex h-full items-end px-2" key={index}>
                    ...
                  </li>
                );
              }

              if (page <= pagination.page - 3 && page !== 1) {
                return (
                  <li className="flex h-full items-end px-2" key={index}>
                    ...
                  </li>
                );
              }
              return (
                <li
                  key={index}
                  className={`${isCurrentPage ? "font-bold" : "font-medium"}`}
                >
                  <Tooltip>
                    <TooltipTrigger>
                      <Button
                        asChild
                        variant={isCurrentPage ? "outline" : "default"}
                        size={"icon"}
                      >
                        <Link
                          href={{
                            pathname,
                            query: `page=${page}${searchParams?.category ? `&category=${searchParams.category}` : ""}`,
                          }}
                        >
                          {page}
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{isCurrentPage ? "Mevcut sayfa" : `Sayfa ${page}`}</p>
                    </TooltipContent>
                  </Tooltip>
                </li>
              );
            })}
            <li>
              <PaginationLink
                href={{
                  pathname,
                  query: `page=${pagination.page + 1}${searchParams?.category ? `&category=${searchParams.category}` : ""}`,
                }}
                disabled={pagination.page === pagination.pageCount}
                className="h-10 w-10 p-0"
              >
                <ChevronRight />
              </PaginationLink>
            </li>
          </ul>
        </TooltipProvider>
      </div>
    )
  );
};

export default Pagination;
