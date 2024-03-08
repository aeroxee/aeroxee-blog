"use client";

import { getCookie } from "cookies-next";
import { ArrowLeft, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ButtonToTop from "./button-to-top";
import LoginDialog from "./login-dialog";
import ModeToggle from "./mode-toggle";
import { Button } from "./ui/button";
import UserDropdown from "./user-dropdown";

export default function Navbar() {
  const links = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "About",
      url: "/about",
    },
    {
      name: "Blog",
      url: "/blog",
    },
    {
      name: "Category",
      url: "/categories",
    },
    {
      name: "Contact",
      url: "/contact",
    },
  ];

  const dashboardLinks = [
    {
      name: "Dashboard",
      url: "/dashboard",
    },
    {
      name: "Overview",
      url: "/dashboard/overview",
    },
    {
      name: "Profile",
      url: "/dashboard/profile",
    },
    {
      name: "Settings",
      url: "/dashboard/settings",
    },
  ];

  const pathname = usePathname();
  const router = useRouter();

  const isBlogDetail = /^\/blog\/.*/.test(pathname);

  const [show, setShow] = useState<boolean>(false);
  const [showButtonToTop, setShowButtonToTop] = useState<boolean>(false);

  useEffect(() => {
    // If navbar link is clicked, close the navbar.
    const navbarLinks = document.querySelectorAll("#navbarLinks");
    if (!navbarLinks) return;
    navbarLinks.forEach((link: Element) => {
      link.addEventListener("click", () => {
        setShow(false);
      });
    });
  });

  useEffect(() => {
    if (show) {
      document.documentElement.classList.add("overflow-hidden");
    } else {
      document.documentElement.classList.remove("overflow-hidden");
    }
  });

  // navbarRef
  const navbarRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!navbarRef) return;

    document.documentElement.addEventListener("click", (e) => {
      if (!navbarRef.current?.contains(e.target as Element)) {
        setShow(false);
      }
    });
  });

  useEffect(() => {
    const nav = document.getElementById("nav");
    if (!nav) return;

    window.onscroll = () => {
      if (window.scrollY > 100) {
        nav.classList.add("border-b", "border-gray-300");
        setShowButtonToTop(true);
      } else {
        nav.classList.remove("border-b", "border-gray-300");
        setShowButtonToTop(false);
      }
    };
  });

  // cookie user
  const user = getCookie("user");

  return (
    <>
      {pathname.startsWith("/login") || pathname.startsWith("/register") ? (
        ""
      ) : (
        <>
          <nav
            id="nav"
            className="dark:border-gray-600 p-2 fixed top-0 left-0 right-0 z-10 bg-white/50 dark:bg-background/50 filter backdrop-blur-md"
          >
            {/* Shadow if navbar collapse is show */}
            <div
              className={`z-10 fixed top-0 left-0 right-0 bottom-0 bg-background/50 filter backdrop-blur-md min-w-full min-h-screen ${
                show ? "opacity-100 visible" : "opacity-0 invisible"
              } transition-all ease-in-out duration-200`}
            ></div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-5">
                  {isBlogDetail && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => router.back()}
                    >
                      <ArrowLeft size={20} />
                    </Button>
                  )}
                  <Link
                    href={"/"}
                    className="text-lg lg:text-xl font-extrabold lg:me-3"
                  >
                    Aeroxee
                  </Link>
                </div>

                <div
                  ref={navbarRef}
                  className={`flex items-start md:items-center gap-5 flex-col md:flex-row absolute z-50  md:static top-0 ${
                    show ? "left-0" : "-left-[1000px]"
                  } transition-all ease-in-out w-[50%] md:w-auto bg-background md:bg-inherit min-h-screen md:min-h-0 border-r md:border-r-0 p-5 md:p-0`}
                >
                  <div className="mb-6 flex items-center justify-between w-full md:hidden">
                    <Link href={"/"} className="text-2xl font-extrabold">
                      aeroxee
                    </Link>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setShow(false)}
                    >
                      <X />
                    </Button>
                  </div>
                  {/* Links */}
                  {pathname.startsWith("/dashboard") ? (
                    <>
                      {dashboardLinks.map(
                        (link: { name: string; url: string }, key: number) => (
                          <Link
                            key={key}
                            id="navbarLinks"
                            href={link.url}
                            className={`font-extralight text-sm ${
                              pathname === link.url
                                ? "text-gray-900 dark:text-gray-300"
                                : "text-gray-500"
                            } hover:text-gray-900 dark:hover:text-gray-300`}
                          >
                            {link.name}
                          </Link>
                        )
                      )}
                    </>
                  ) : (
                    <>
                      {links.map(
                        (link: { name: string; url: string }, key: number) => (
                          <Link
                            key={key}
                            id="navbarLinks"
                            href={link.url}
                            className={`font-extralight text-sm ${
                              pathname === link.url
                                ? "text-gray-900 dark:text-gray-300"
                                : "text-gray-500"
                            } hover:text-gray-900 dark:hover:text-gray-300`}
                          >
                            {link.name}
                          </Link>
                        )
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center">
                <ModeToggle />
                {user && <UserDropdown />}
                {/* User login dialog button  */}
                {!user && <LoginDialog />}
                <Button
                  type="button"
                  variant="ghost"
                  className="md:hidden"
                  onClick={() => setShow(true)}
                >
                  <Menu />
                </Button>
              </div>
            </div>
          </nav>
          <ButtonToTop show={showButtonToTop} />
        </>
      )}
    </>
  );
}
