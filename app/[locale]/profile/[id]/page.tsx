import Base64Image from "@/components/base64-image";
import Container from "@/components/container";
import { getUserById } from "@/lib/users";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateMetadata(
  { params }: { params: { id: string } },
  _resolve: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;
  const user = await getUserById(id);

  if (!user) {
    notFound();
  }

  return {
    title: `${user.username} | aeroxee`,
    description: `Profile of ${user.username}`,
  };
}

export default async function Profile({ params }: { params: { id: string } }) {
  const id = params.id;
  const user = await getUserById(id);

  if (!user) {
    notFound();
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
