"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

interface Props {
  currentPage: number;
  totalPages: number;
  next: boolean;
  nextMessage: string;
  prevMessage: string;
}

export default function PaginationBlog({
  currentPage,
  totalPages,
  next,
}: Props) {
  const prefUrl = `${currentPage - 1}`;
  const nextUrl = `${currentPage + 1}`;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            title="d"
            href={`${currentPage === 1 ? "#" : "/blog?page=" + prefUrl}`}
            aria-disabled={currentPage === 1}
          />
        </PaginationItem>

        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;

          if (page === currentPage) {
            return (
              <PaginationItem key={page}>
                <PaginationLink href={`/blog?page=${page}`} isActive>
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={page}>
              <PaginationLink href={`/blog?page=${page}`}>
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>

        <PaginationItem>
          <PaginationNext href={`${next ? "/blog?page=" + nextUrl : "#"}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
