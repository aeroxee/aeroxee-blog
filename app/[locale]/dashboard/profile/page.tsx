import Base64Image from "@/components/base64-image";
import Container from "@/components/container";
import { getUserById } from "@/lib/users";
import { Metadata, ResolvingMetadata } from "next";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import Image from "next/image";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const t = await getTranslations("Profile");

  const cookieStore = cookies();
  const userCookie = cookieStore.get("user");
  if (!userCookie) {
    notFound();
  }

  const userCookieJson = JSON.parse(userCookie.value);

  const user = await getUserById(userCookieJson._id);
  if (!user) {
    notFound();
  }

  return {
    title: `${t("title")} ${user.username} | aeroxee`,
    description: `${t("description")} ${user.username}`,
  };
}

export default async function Profile() {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("user");
  if (!userCookie) {
    window.location.href = "/login";
    return;
  }

  const userCookieJson = JSON.parse(userCookie.value);

  const user = await getUserById(userCookieJson._id);
  if (!user) {
    window.location.href = "/login";
    return;
  }

  return (
    <Container className="pt-[90px] pb-[90px] px-4 md:px-[50px] lg:px-[90px] mx-auto">
      <div className="my-10 flex flex-col items-center justify-center gap-4">
        {user.avatar ? (
          <Base64Image
            base64Data={user.avatar}
            alt=""
            width={1200}
            height={800}
            className="w-[200px] h-[200px] rounded-full"
          />
        ) : (
          <Image
            src="https://github.com/shadcn.png"
            alt={`profile ${user.username}`}
            width={1200}
            height={800}
            className="w-[200px] h-[200px] rounded-full"
            loading="lazy"
          />
        )}

        <h1 className="text-xl md:text-2xl lg:text-4xl font-extrabold text-center">
          {user.firstName} {user.lastName}
        </h1>
        {user.bio ? (
          <p className="text-sm md:text-lg italic text-center w-full md:w-[70%] lg:w-[45%]">
            {user.bio}
          </p>
        ) : (
          <p className="text-sm md:text-lg italic text-center w-full md:w-[70%] lg:w-[45%]">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste rem
            repellat aperiam laborum id eaque consequuntur possimus odio iusto
            aspernatur.
          </p>
        )}
      </div>
    </Container>
  );
}
