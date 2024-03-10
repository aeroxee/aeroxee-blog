import Container from "@/components/container";
import { Card } from "@/components/ui/card";
import { getArticleByUserId } from "@/lib/articles";
import { type User } from "@/lib/types/users";
import { Eye, Newspaper, ThumbsDown, ThumbsUp } from "lucide-react";
import { Metadata, ResolvingMetadata } from "next";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const t = await getTranslations("Dashboard");

  return {
    title: `${t("title")} | aeroxee`,
    description: t("description"),
  };
}

export default async function Dashboard() {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("user");

  if (!userCookie) return <></>;

  const user: User = JSON.parse(userCookie.value);

  const articles = await getArticleByUserId(user._id);

  let views = 0;
  for (let i = 0; i < articles.length; i++) {
    views += articles[i].views;
  }

  return (
    <>
      <Container className="pt-[90px] pb-[90px] px-4 md:px-[50px] lg:px-[90px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <Newspaper size={40} />
              <span className="text-xl">{articles.length}</span>
            </div>
          </Card>
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <Eye size={40} />
              <span className="text-xl">{views}</span>
            </div>
          </Card>
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <ThumbsUp size={40} />
              <span className="text-xl">50</span>
            </div>
          </Card>
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <ThumbsDown size={40} />
              <span className="text-xl">20</span>
            </div>
          </Card>
        </div>
      </Container>
    </>
  );
}
