import Container from "@/components/container";
import FormUpdateUser from "@/components/form-update-user";
import { getUserById } from "@/lib/users";
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
  const t = await getTranslations("Settings");

  return {
    title: `${t("title")} | aeroxee`,
    description: t("description"),
  };
}

export default async function Settings() {
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

  const t = await getTranslations("Settings");

  return (
    <>
      <Container className="pt-[90px] pb-[90px] w-[96%] md:w-[70%] lg:w-[40%] mx-auto">
        <FormUpdateUser
          user={user}
          avatar={t("avatar")}
          bio={t("bio")}
          current_avatar={t("current_avatar")}
          email={t("email")}
          error={t("error")}
          firstName={t("first_name")}
          lastName={t("last_name")}
          image_size={t("image_size")}
          max_bio={t("max_bio")}
          required={t("required")}
          save={t("save")}
          success={t("success")}
          username={t("username")}
        />
      </Container>
    </>
  );
}
