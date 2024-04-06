"use client";

import { Link } from "@/navigation";
import { Button } from "./ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "./ui/pagination";

interface Props {
  currentPage: number;
  totalPages: number;
  next: boolean;
  nextMessage: string;
  prevMessage: string;
  locale: string;
}

export default function PaginationBlog({
  currentPage,
  totalPages,
  next,
  locale,
}: Props) {
  const prefUrl = `${currentPage - 1}`;
  const nextUrl = `${currentPage + 1}`;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Link
            href={`${currentPage === 1 ? "#" : "/blog?page=" + prefUrl}`}
            passHref
          >
            <Button variant="ghost">Prev</Button>
          </Link>
        </PaginationItem>

        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;

          if (page === currentPage) {
            return (
              <PaginationItem key={page}>
                <Link href={`/blog?page=${page}`} passHref>
                  <Button variant="outline">{page}</Button>
                </Link>
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={page}>
              <Link href={`/blog?page=${page}`} passHref>
                <Button variant="outline">{page}</Button>
              </Link>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>

        <PaginationItem>
          <Link href={`${next ? "/blog?page=" + nextUrl : "#"}`} passHref>
            <Button variant="ghost" size="icon">
              Next
            </Button>
          </Link>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
