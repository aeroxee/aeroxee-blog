import Code from "@/components/code";
import Container from "@/components/container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { getArticleById } from "@/lib/articles";
import { getCategoryById } from "@/lib/categories";
import { ClientDB } from "@/lib/db";
import getMoment from "@/lib/get-moment";
import parseTimeToMonthYear from "@/lib/parseTimeMonthYear";
import stripHtmlAndTruncate from "@/lib/truncate";
import { getUserById } from "@/lib/users";
import { Link } from "@/navigation";
import { Book, CalendarDays, Clock, Eye, User } from "lucide-react";
import { ObjectId } from "mongodb";
import { Metadata, ResolvingMetadata } from "next";
import { cookies } from "next/headers";
import Showdown from "showdown";

export async function generateMetadata(
  { params }: { params: { id: string } },
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;

  const article = await getArticleById(id);

  return {
    title: `${article.title} | Aeroxee`,
    description: stripHtmlAndTruncate(article.content, 20),
    openGraph: {
      title: `${article.title} | Aeroxee`,
      description: stripHtmlAndTruncate(article.content, 20),
      type: "article",
    },
  };
}

const articleMarkdown = (content: string) => {
  const converter = new Showdown.Converter();

  return (
    <article
      className="markdown lg:markdown-lg dark:markdown-invert w-full lg:w-auto"
      dangerouslySetInnerHTML={{ __html: converter.makeHtml(content) }}
    />
  );
};

export default async function BlogDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;

  const article = await getArticleById(id);

  const owner = await getUserById(article.userId);
  const category = await getCategoryById(article.categoryId);

  if (!owner) return;

  await ClientDB.db("aeroxee-blog")
    .collection("articles")
    .updateOne(
      { _id: ObjectId.createFromHexString(article._id) },
      {
        $set: {
          views: (article.views += 1),
        },
      }
    );

  const cookieStore = cookies();
  const LOCALE = cookieStore.get("NEXT_LOCALE");
  if (!LOCALE) return;

  return (
    <>
      <Code />
      <Container className="py-[90px] w-[96%] lg:w-[70%] mx-auto">
        <div className="flex items-center justify-center gap-4 flex-wrap my-5 border-b pb-3">
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="flex items-center gap-1 text-xs font-extralight cursor-pointer">
                <User size="20" />
                <Link href={`/profile/${owner._id}`}>
                  <span>{owner?.username}</span>
                </Link>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex space-x-4">
                <Avatar>
                  {owner.avatar ? (
                    <AvatarImage
                      src={`data:image/png;base64,${owner.avatar}`}
                    />
                  ) : (
                    <AvatarImage src="https://github.com/shadcn.png" />
                  )}
                  <AvatarFallback>VC</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">{owner.username}</h4>
                  {owner.bio ? (
                    <p className="text-sm">{owner.bio}</p>
                  ) : (
                    <p className="text-sm">
                      The React Framework created and maintained by @vercel.
                    </p>
                  )}
                  <div className="flex items-center pt-2">
                    <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                    <span className="text-xs text-muted-foreground">
                      Joined {parseTimeToMonthYear(owner.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="flex items-center gap-1 text-xs font-extralight cursor-pointer">
                <Book size="20" />
                <Link href={`/categories/${category?._id}`}>
                  <span>{category?.title}</span>
                </Link>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 space-y-1">
              <h4 className="text-sm font-semibold">{category?.title}</h4>
              <p className="text-sm">{category?.description}</p>
            </HoverCardContent>
          </HoverCard>

          <div className="flex items-center gap-1 text-xs font-extralight">
            <Eye size="20" />
            <span>{article.views}</span>
          </div>
          <div className="flex items-center gap-1 text-xs font-extralight">
            <Clock size="20" />
            <span>{getMoment(article.createdAt, LOCALE.value)}</span>
          </div>
        </div>
        <div className="flex items-center justify-center w-full">
          {articleMarkdown(article.content)}
        </div>
      </Container>
    </>
  );
}
