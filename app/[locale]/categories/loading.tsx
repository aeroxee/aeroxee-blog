import Container from "@/components/container";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Key } from "react";

export default async function LoadingCategories() {
  return (
    <Container className="w-[96%] lg:w-[70%] mx-auto py-[90px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {[0, 1, 2, 3, 4, 5].map((_v: number, key: Key) => (
          <Card key={key}>
            <CardHeader>
              <Skeleton className="w-[90%] h-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="w-full h-3 mb-2" />
              <Skeleton className="w-full h-3 mb-2" />
              <Skeleton className="w-full h-3 mb-2" />
              <Skeleton className="w-[70%] h-3 mb-2" />
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  );
}
