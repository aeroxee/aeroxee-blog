"use client";

import { Link, usePathname, useRouter } from "@/navigation";
import { getCookie } from "cookies-next";
import { ArrowLeft, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ButtonToTop from "./button-to-top";
import LocaleToggle from "./locale-toggle";
import LoginDialog from "./login-dialog";
import ModeToggle from "./mode-toggle";
import { Button } from "./ui/button";
import UserDropdown from "./user-dropdown";

interface NavbarProps {
  home: string;
  about: string;
  blog: string;
  category: string;
  contact: string;
  dashboard: string;
  overview: string;
  profile: string;
  settings: string;
  locale: any;
  light: string;
  dark: string;
  system: string;
  gallery: string;
}

export default function Navbar(props: NavbarProps) {
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
                    locale={props.locale}
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
                    <Link
                      href={"/"}
                      className="text-2xl font-extrabold"
                      locale={props.locale}
                    >
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
                  {pathname.startsWith(`/dashboard`) ? (
                    <>
                      <Link
                        id="navbarLinks"
                        href="/dashboard"
                        className={`font-extralight text-sm ${
                          pathname === "/dashboard"
                            ? "text-gray-900 dark:text-gray-300"
                            : "text-gray-500"
                        } hover:text-gray-900 dark:hover:text-gray-300`}
                      >
                        {props.dashboard}
                      </Link>
                      <Link
                        id="navbarLinks"
                        href="/dashboard/overview"
                        className={`font-extralight text-sm ${
                          pathname.startsWith("/dashboard/overview")
                            ? "text-gray-900 dark:text-gray-300"
                            : "text-gray-500"
                        } hover:text-gray-900 dark:hover:text-gray-300`}
                      >
                        {props.overview}
                      </Link>
                      <Link
                        id="navbarLinks"
                        href="/dashboard/profile"
                        className={`font-extralight text-sm ${
                          pathname.startsWith("/dashboard/profile")
                            ? "text-gray-900 dark:text-gray-300"
                            : "text-gray-500"
                        } hover:text-gray-900 dark:hover:text-gray-300`}
                      >
                        {props.profile}
                      </Link>
                      <Link
                        id="navbarLinks"
                        href="/dashboard/settings"
                        className={`font-extralight text-sm ${
                          pathname.startsWith("/dashboard/settings")
                            ? "text-gray-900 dark:text-gray-300"
                            : "text-gray-500"
                        } hover:text-gray-900 dark:hover:text-gray-300`}
                      >
                        {props.settings}
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        id="navbarLinks"
                        href="/"
                        className={`font-extralight text-sm ${
                          pathname === "/"
                            ? "text-gray-900 dark:text-gray-300"
                            : "text-gray-500"
                        } hover:text-gray-900 dark:hover:text-gray-300`}
                      >
                        {props.home}
                      </Link>
                      <Link
                        id="navbarLinks"
                        href="/about"
                        className={`font-extralight text-sm ${
                          pathname.startsWith("/about")
                            ? "text-gray-900 dark:text-gray-300"
                            : "text-gray-500"
                        } hover:text-gray-900 dark:hover:text-gray-300`}
                      >
                        {props.about}
                      </Link>
                      <Link
                        id="navbarLinks"
                        href="/blog"
                        className={`font-extralight text-sm ${
                          pathname.startsWith("/blog")
                            ? "text-gray-900 dark:text-gray-300"
                            : "text-gray-500"
                        } hover:text-gray-900 dark:hover:text-gray-300`}
                      >
                        {props.blog}
                      </Link>
                      <Link
                        id="navbarLinks"
                        href="/categories"
                        className={`font-extralight text-sm ${
                          pathname.startsWith("/categories")
                            ? "text-gray-900 dark:text-gray-300"
                            : "text-gray-500"
                        } hover:text-gray-900 dark:hover:text-gray-300`}
                      >
                        {props.category}
                      </Link>
                      <Link
                        id="navbarLinks"
                        href="/contact"
                        className={`font-extralight text-sm ${
                          pathname.startsWith("/contact")
                            ? "text-gray-900 dark:text-gray-300"
                            : "text-gray-500"
                        } hover:text-gray-900 dark:hover:text-gray-300`}
                      >
                        {props.contact}
                      </Link>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center">
                <ModeToggle
                  light={props.light}
                  dark={props.dark}
                  system={props.system}
                />
                {user && <UserDropdown locale={props.locale} />}
                <LocaleToggle />
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
