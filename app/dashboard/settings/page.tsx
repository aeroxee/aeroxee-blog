import Container from "@/components/container";
import FormUpdateUser from "@/components/form-update-user";
import { getUserById } from "@/lib/users";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Settings | aeroxee",
  description: "",
};

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
  return (
    <>
      <Container className="pt-[90px] pb-[90px] w-[96%] md:w-[70%] lg:w-[40%] mx-auto">
        <FormUpdateUser user={user} />
      </Container>
    </>
  );
}
