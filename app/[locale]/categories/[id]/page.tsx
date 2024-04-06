import Container from "@/components/container";
import ListBlogCard from "@/components/list-blog-card";
import { getArticleByCategoryId } from "@/lib/articles";
import { getCategoryById } from "@/lib/categories";
import { Article } from "@/lib/types/articles";
import { Metadata, ResolvingMetadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;

  const category = await getCategoryById(id);

  return {
    title: `${category?.title} | aeroxee`,
    description: category?.description,
    openGraph: {
      title: `${category?.title} | aeroxee`,
      description: category?.description,
      type: "website",
    },
  };
}

export default async function CategoryDetail({ params }: Props) {
  const id = params.id;
  const category = await getCategoryById(id);

  if (!category) {
    notFound();
  }

  const t = await getTranslations("Blog");

  const articles = await getArticleByCategoryId(category._id, "PUBLISHED");

  return (
    <Container className="w-[96%] lg:w-[70%] mx-auto py-[90px]">
      <div className="flex flex-col items-center justify-center text-center mb-5 pb-2 border-b">
        <div className="w-[95%] md:w-[70%] lg:w-[60%] space-y-3">
          <h1 className="text-2xl md:text-4xl lg:text-6xl font-extrabold">
            {category.title}
          </h1>
          <p className="text-lg md:text-lg lg:text-xl italic font-extralight">
            {category.description}
          </p>
          <span className="text-xl text-sky-600 font-bold">
            {articles.total} {t("article")}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {articles.data.map((article: Article, index: number) => (
          <ListBlogCard key={index} article={article} />
        ))}
      </div>
    </Container>
  );
}
