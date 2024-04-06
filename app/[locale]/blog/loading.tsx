import Container from "@/components/container";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";
import { Key } from "react";

export default function LoadingBlog() {
  const t = useTranslations("Blog");

  return (
    <Container className="pt-[90px] pb-[90px] px-4 md:px-[50px] lg:px-[90px] mx-auto">
      <div className="flex items-start flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-8/12 mb-5 lg:mb-0">
          <h2 className="text-xl font-extrabold text-sky-600">
            {t("new_article")}
          </h2>
          <div className="my-5">
            <form action="">
              <Input type="search" name="q" placeholder={t("search")} />
            </form>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-5">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((_v: number, key: Key) => (
              <Card key={key} className="p-5">
                <Skeleton className="h-5 w-[90%] mb-4" />
                <Skeleton className="h-2 w-full mb-2" />
                <Skeleton className="h-2 w-full mb-2" />
                <Skeleton className="h-2 w-full mb-2" />
                <Skeleton className="h-2 w-[60%] mb-2" />
              </Card>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-4/12">
          <h2 className="text-xl font-extrabold text-sky-600">
            {t("popular_article")}
          </h2>
          <div className="flex flex-col mt-5">
            {[0, 1, 2, 3].map((_value: number, key: Key) => (
              <div
                key={key}
                className="py-2 border-b border-b-gray-300 dark:border-b-gray-600"
              >
                <Skeleton className="w-[70%] h-3.5 mb-3" />
                <Skeleton className="w-full h-2 mb-2" />
                <Skeleton className="w-[70%] h-2 mb-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
