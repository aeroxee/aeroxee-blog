import Container from "@/components/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingBlogDetail() {
  return (
    <Container className="pt-[90px] w-[96%] lg:w-[70%] mx-auto">
      <div className="flex flex-col">
        <Skeleton className="h-7 w-full mb-5" />

        <div className="mb-4">
          <Skeleton className="h-3 w-full mb-3" />
          <Skeleton className="h-3 w-full mb-3" />
          <Skeleton className="h-3 w-full mb-3" />
          <Skeleton className="h-3 w-[60%]" />
        </div>
        <div className="mb-4">
          <Skeleton className="h-3 w-full mb-3" />
          <Skeleton className="h-3 w-full mb-3" />
          <Skeleton className="h-3 w-full mb-3" />
          <Skeleton className="h-3 w-[60%]" />
        </div>
        <div className="mb-4">
          <Skeleton className="h-3 w-full mb-3" />
          <Skeleton className="h-3 w-full mb-3" />
          <Skeleton className="h-3 w-full mb-3" />
          <Skeleton className="h-3 w-[60%]" />
        </div>
        <div className="mb-4">
          <Skeleton className="h-3 w-full mb-3" />
          <Skeleton className="h-3 w-full mb-3" />
          <Skeleton className="h-3 w-full mb-3" />
          <Skeleton className="h-3 w-[60%]" />
        </div>
        <div className="mb-4">
          <Skeleton className="h-3 w-full mb-3" />
          <Skeleton className="h-3 w-full mb-3" />
          <Skeleton className="h-3 w-full mb-3" />
          <Skeleton className="h-3 w-[60%]" />
        </div>
        <div className="mb-4">
          <Skeleton className="h-3 w-full mb-3" />
          <Skeleton className="h-3 w-full mb-3" />
          <Skeleton className="h-3 w-full mb-3" />
          <Skeleton className="h-3 w-[60%]" />
        </div>
        <div className="mb-4">
          <Skeleton className="h-3 w-full mb-3" />
          <Skeleton className="h-3 w-full mb-3" />
          <Skeleton className="h-3 w-full mb-3" />
          <Skeleton className="h-3 w-[60%]" />
        </div>
        <div className="mb-4">
          <Skeleton className="h-3 w-full mb-3" />
          <Skeleton className="h-3 w-full mb-3" />
          <Skeleton className="h-3 w-full mb-3" />
          <Skeleton className="h-3 w-[60%]" />
        </div>
        <div className="mb-4">
          <Skeleton className="h-3 w-full mb-3" />
          <Skeleton className="h-3 w-full mb-3" />
          <Skeleton className="h-3 w-full mb-3" />
          <Skeleton className="h-3 w-[60%]" />
        </div>
      </div>
    </Container>
  );
}
