import Container from "@/components/container";
import ListBlogCard from "@/components/list-blog-card";
import PaginationBlog from "@/components/pagination-blog";
import PopularArticleList from "@/components/popular-article-list";
import { Input } from "@/components/ui/input";
import { getArticles } from "@/lib/articles";
import { Article } from "@/lib/types/articles";
import { Metadata, ResolvingMetadata } from "next";
import { getTranslations } from "next-intl/server";
import { Key } from "react";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const t = await getTranslations("Blog");

  return {
    title: `${t("title")} | aeroxee`,
    description: t("description"),
  };
}

export default async function Blog({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams: { [key: string]: string | undefined };
}) {
  const page = searchParams.page;
  const limit = searchParams.limit;
  const q = searchParams.q;

  const articles = await getArticles(
    "PUBLISHED",
    "createdAt",
    page ? parseInt(page) : 1,
    limit ? parseInt(limit) : 10,
    q ? q : null
  );

  const popularArticles = await getArticles("PUBLISHED", "views", 1, 5, null);

  const t = await getTranslations("Blog");

  return (
    <Container className="pt-[90px] pb-[90px] px-4 md:px-[50px] lg:px-[90px] mx-auto">
      <div className="flex items-start flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-8/12 mb-5 lg:mb-0">
          <h2 className="text-xl font-extrabold text-sky-600">
            {t("new_article")}
          </h2>
          <div className="my-5">
            <form action="">
              <Input
                type="search"
                name="q"
                placeholder={t("search")}
                defaultValue={q ? q : ""}
              />
            </form>
          </div>
          {articles.data.length < 1 ? (
            <h1 className="text-rose-600 font-extrabold text-2xl">
              {t("article_empty")}
            </h1>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-5">
              {articles.data.map((article: Article, key: Key) => (
                <ListBlogCard key={key} article={article} />
              ))}
            </div>
          )}
          <div className="my-5">
            <PaginationBlog
              next={articles.next}
              currentPage={page ? parseInt(page) : 1}
              totalPages={articles.totalPages}
              prevMessage={t("prev")}
              nextMessage={t("next")}
              locale={params.locale}
            />
          </div>
        </div>

        {/*  */}
        <div className="w-full lg:w-4/12">
          <h2 className="text-xl font-extrabold text-sky-600">
            {t("popular_article")}
          </h2>
          <div className="flex flex-col mt-5">
            {popularArticles.data.map((popularArticle: Article, key: Key) => (
              <PopularArticleList key={key} article={popularArticle} />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
