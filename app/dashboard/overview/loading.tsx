import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus } from "lucide-react";

export default async function LoadingOverview() {
  return (
    <>
      <Container className="pt-[90px] pb-[90px] px-4 md:px-[50px] lg:px-[90px] mx-auto">
        <div className="mb-5 flex items-center justify-between">
          <h1 className="text-2xl font-extrabold">Overview</h1>

          <Button variant="outline" className="flex items-center gap-1">
            <Plus size={20} />
            Article
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(
            (_value: number, index: number) => (
              <Card key={index} className="">
                <CardHeader>
                  <Skeleton className="w-full h-3.5 mb-2" />
                  <Skeleton className="w-[30%] h-2" />
                </CardHeader>
                <CardContent className="md:hidden">
                  <div className="flex items-center justify-center gap-2">
                    <Skeleton className="w-[80px] h-6" />
                    <Skeleton className="w-[80px] h-6" />
                    <Skeleton className="w-[80px] h-6" />
                  </div>
                </CardContent>
              </Card>
            )
          )}
        </div>
      </Container>
    </>
  );
}
