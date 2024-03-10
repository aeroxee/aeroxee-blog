import Container from "@/components/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingProfile() {
  return (
    <Container className="pt-[90px] pb-[90px] px-4 md:px-[50px] lg:px-[90px] mx-auto">
      <div className="my-10 flex flex-col items-center justify-center gap-4 w-full">
        <Skeleton className="w-[200px] h-[200px] rounded-full" />
        <Skeleton className="w-[180px] h-4" />

        <div className="w-[96%] md:w-[70%] lg:w-[40%] flex items-center flex-col gap-2 justify-center">
          <Skeleton className="w-full h-2.5" />
          <Skeleton className="w-full h-2.5" />
          <Skeleton className="w-[60%] h-2.5" />
        </div>
      </div>
    </Container>
  );
}
