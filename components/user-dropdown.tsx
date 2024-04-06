"use client";

import { User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@/navigation";
import { deleteCookie } from "cookies-next";
import { useEffect, useRef, useState } from "react";

export default function UserDropdown({ locale }: { locale: string }) {
  const [show, setShow] = useState<boolean>(false);

  // handle logout user
  const handleLogout = () => {
    deleteCookie("isLogined");
    deleteCookie("user");
    window.location.href = "/" + locale + "/login";
  };

  const ref = useRef<any>(null);

  useEffect(() => {
    if (!ref.current) return;

    document.documentElement.addEventListener("click", (e) => {
      if (!ref.current?.contains(e.target as Element)) {
        setShow(false);
      }
    });
  });

  return (
    <DropdownMenu open={show}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" onClick={() => setShow(true)} size="icon">
          <User className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">User dropdown</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" ref={ref}>
        <DropdownMenuItem>
          <Link href="/dashboard" onClick={() => setShow(false)}>
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/dashboard/profile" onClick={() => setShow(false)}>
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/dashboard/settings" onClick={() => setShow(false)}>
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
