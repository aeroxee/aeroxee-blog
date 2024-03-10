import Container from "@/components/container";
import { cn } from "@/lib/utils";
import { Mail, Phone } from "lucide-react";
import { Metadata, ResolvingMetadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const t = await getTranslations("Contact");

  return {
    title: `${t("title")} | aeroxee`,
    description: t("description"),
  };
}

export default function About() {
  const t = useTranslations("Contact");

  return (
    <Container className="relative w-full min-h-screen min-w-full">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-[96%] md:w-[68%] lg:w-[80%] flex flex-col gap-2">
        <div className="flex flex-col items-center justify-center w-full gap-4">
          <h1 className="text-4xl font-extrabold mb-4">{t("head")}</h1>
          <div className="space-y-2 text-center">
            <div className={cn("pb-4 border-b flex items-center w-full gap-4")}>
              <Mail size={20} />
              <span className="font-light">fathfajhri40@gmail.com</span>
            </div>
            <div className={cn("pb-4 border-b flex items-center w-full gap-4")}>
              <Phone size={20} />
              <span className="font-light">+62 831 9932 9020</span>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
