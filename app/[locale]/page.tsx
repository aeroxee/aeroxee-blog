import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { cookies } from "next/headers";

export default function Home() {
  const t = useTranslations("Index");

  const cookieStore = cookies();
  const userCookie = cookieStore.get("user");

  return (
    <Container className="relative w-full min-h-screen min-w-full">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-[96%] md:w-[68%] lg:w-[60%] flex flex-col gap-2">
        <h1 className="text-2xl md:text-4xl lg:text-6xl font-extrabold">
          {t("title")}
        </h1>
        <p className="text-sm md:text-lg font-extralight italic">
          {t("description")}
        </p>
        <div className="flex items-center justify-center gap-4">
          {!userCookie && (
            <>
              <Link href="/" passHref>
                <Button variant="default" disabled>
                  {t("get_started")}
                </Button>
              </Link>
              <Link href="/login" passHref>
                <Button variant="outline">{t("login")}</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </Container>
  );
}
