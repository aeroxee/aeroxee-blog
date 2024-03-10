import ArticleDeleteAction from "@/components/article-delete-action";
import Container from "@/components/container";
import FormInsertArticle from "@/components/form-insert-article";
import FormUpdateArticle from "@/components/form-update-article";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getArticleByUserId } from "@/lib/articles";
import { getAllCategories } from "@/lib/categories";
import { Article } from "@/lib/types/articles";
import { User } from "@/lib/types/users";
import { Link } from "@/navigation";
import { Pen, Plus } from "lucide-react";
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
  const t = await getTranslations("Overview");

  return {
    title: `${t("title")} | aeroxee`,
    description: t("description"),
  };
}

export default async function Overview() {
  const categories = await getAllCategories();

  const cookieStore = cookies();
  const userCookies = cookieStore.get("user");
  if (!userCookies) return;
  const user: User = JSON.parse(userCookies.value);

  const articles = await getArticleByUserId(user._id);

  const t = await getTranslations("Overview");

  return (
    <>
      <Container className="pt-[90px] pb-[90px] px-4 md:px-[50px] lg:px-[90px] mx-auto">
        <div className="mb-5 flex items-center justify-between">
          <h1 className="text-2xl font-extrabold">{t("head")}</h1>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                <Plus size={20} />
                {t("article")}
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="min-w-[96%] lg:min-w-[90%] h-[calc(100vh-10%)] overflow-auto">
              <AlertDialogHeader>
                <AlertDialogTitle>{t("input.title_insert")}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t("input.description_insert")}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <FormInsertArticle
                categories={categories}
                title={t("input.input_title")}
                title_placeholder={t("input.input_title_placeholder")}
                select_category={t("input.select_category")}
                select_status={t("input.select_status")}
                cancel={t("input.cancel")}
                content={t("input.input_content")}
                content_placeholder={t("input.input_content_placeholder")}
                drafted={t("input.status_drafted")}
                published={t("input.status_published")}
                save={t("input.save")}
                alert_success={t("input.alert_success")}
                alert_error={t("input.alert_error")}
                required={t("input.forms.required")}
                max_title={t("input.forms.max_title")}
              />
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((article: Article, index: number) => (
            <Card key={index} className="md:relative group">
              <CardHeader>
                <CardTitle>{article.title}</CardTitle>
                <CardDescription>Status: {article.status}</CardDescription>
              </CardHeader>
              <CardContent className="static md:absolute md:top-0 md:left-0 md:bottom-0 md:right-0 md:bg-background/50 md:filter md:backdrop-blur-md md:rounded-md opacity-100 visible md:opacity-0 md:invisible md:group-hover:opacity-100 md:group-hover:visible transition-all ease-in-out">
                <div className="static md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">
                  <div className="flex items-center justify-center gap-2">
                    <Link href={`/blog/${article._id}`} passHref>
                      <Button variant="outline">{t("view")}</Button>
                    </Link>
                    {/* Edit */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="default"
                          className="flex items-center gap-1"
                        >
                          <Pen size={20} />
                          {t("update")}
                        </Button>
                      </AlertDialogTrigger>

                      <AlertDialogContent className="min-w-[96%] lg:min-w-[90%] h-[calc(100vh-10%)] overflow-auto">
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            {t("input.title_update")}
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            {t("input.description_update")}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <FormUpdateArticle
                          categories={categories}
                          article={article}
                          title_placeholder={t("input.input_title_placeholder")}
                          select_category={t("input.select_category")}
                          select_status={t("input.select_status")}
                          cancel={t("input.cancel")}
                          content={t("input.input_content")}
                          content_placeholder={t(
                            "input.input_content_placeholder"
                          )}
                          drafted={t("input.status_drafted")}
                          published={t("input.status_published")}
                          alert_success_update={t("input.alert_success_update")}
                          alert_error_update={t("input.alert_error_update")}
                          required={t("input.forms.required")}
                          max_title={t("input.forms.max_title")}
                          title={t("input.input_title")}
                        />
                      </AlertDialogContent>
                    </AlertDialog>
                    {/* Delete */}
                    <ArticleDeleteAction
                      title={t("delete")}
                      id={article._id}
                      alert_error_delete={t("input.alert_error_delete")}
                      alert_success_delete={t("input.alert_success_delete")}
                      delete={t("delete")}
                      delete_description={t("delete_description")}
                      delete_title={t("delete_title")}
                      cancel={t("input.cancel")}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
}
