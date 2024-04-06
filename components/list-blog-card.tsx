import { getCategoryById } from "@/lib/categories";
import getMoment from "@/lib/get-moment";
import parseTimeToMonthYear from "@/lib/parseTimeMonthYear";
import stripHtmlAndTruncate from "@/lib/truncate";
import { type Article } from "@/lib/types/articles";
import { getUserById } from "@/lib/users";
import { Link } from "@/navigation";
import { Book, CalendarDays, Clock, Eye, User } from "lucide-react";
import { cookies } from "next/headers";
import Showdown from "showdown";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

const articleMarkdown = (content: string) => {
  const converter = new Showdown.Converter();

  return (
    <p className="text-sm font-extralight">
      {stripHtmlAndTruncate(converter.makeHtml(content), 20)}...
    </p>
  );
};

type ListBlogCardProps = {
  article: Article;
};

export default async function ListBlogCard({ article }: ListBlogCardProps) {
  const category = await getCategoryById(article.categoryId);
  const owner = await getUserById(article.userId);
  if (!owner) return;

  const cookieStore = cookies();
  const LOCALE = cookieStore.get("NEXT_LOCALE");
  if (!LOCALE) return;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Link href={`/blog/${article._id}`} className="text-sky-600">
            {article.title}
          </Link>
        </CardTitle>
        <div className="flex items-center gap-2 flex-wrap">
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
            <HoverCardContent className="w-80">
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
      </CardHeader>
      <CardContent>{articleMarkdown(article.content)}</CardContent>
    </Card>
  );
}
