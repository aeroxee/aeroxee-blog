import Container from "@/components/container";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Eye, Newspaper, ThumbsDown, ThumbsUp } from "lucide-react";

export default async function Loading() {
  return (
    <>
      <Container className="pt-[90px] pb-[90px] px-4 md:px-[50px] lg:px-[90px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <Newspaper size={40} />
              <Skeleton className="w-10 h-10 rounded-full" />
            </div>
          </Card>
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <Eye size={40} />
              <Skeleton className="w-10 h-10 rounded-full" />
            </div>
          </Card>
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <ThumbsUp size={40} />
              <Skeleton className="w-10 h-10 rounded-full" />
            </div>
          </Card>
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <ThumbsDown size={40} />
              <Skeleton className="w-10 h-10 rounded-full" />
            </div>
          </Card>
        </div>
      </Container>
    </>
  );
}
