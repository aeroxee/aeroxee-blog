import Container from "@/components/container";
import { Metadata, ResolvingMetadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

import ppImage from "@/public/pp.jpeg";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const t = await getTranslations("About");

  return {
    title: `${t("title")} | aeroxee`,
    description: t("description"),
    openGraph: {
      title: `${t("title")} | aeroxee`,
      description: t("description"),
    },
  };
}

export default async function About() {
  return (
    <Container className="relative w-full min-h-screen min-w-full">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-[96%] md:w-[68%] lg:w-[60%] flex flex-col gap-2">
        <div className="flex flex-col items-center justify-center gap-4">
          <Image
            src={ppImage}
            alt="@aeroxee"
            className="w-[200px] h-[200px]"
            width={1200}
            height={800}
          />
          <div className="space-y-2 text-center">
            <p>
              I am an active student in the field of website programming. I am a
              Fullstack web developer working with{" "}
              <Link
                href="https://nextjs.org"
                className="text-sky-600 italic underline"
              >
                Next.js
              </Link>{" "}
              and{" "}
              <Link
                href="https://go.dev"
                className="text-sky-600 underline italic"
              >
                Go
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
