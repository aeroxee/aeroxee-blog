"use client";

import { User as UserType } from "@/lib/types/users";
import { User } from "lucide-react";

export default function OwnerHover({ owner }: { owner: UserType }) {
  // const router = useRouter();
  return (
    <div className="flex items-center gap-1 text-xs font-extralight cursor-pointer">
      <User size="20" />
      <span>{owner?.username}</span>
    </div>
  );
}
