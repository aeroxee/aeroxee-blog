import { ArrowUp } from "lucide-react";
import { Button } from "./ui/button";

export default function ButtonToTop({ show }: { show: boolean }) {
  return (
    <div
      className={`fixed z-[5] bottom-2 right-2 ${
        show ? "opacity-100 visible ease-in" : "opacity-0 invisible ease-out"
      } transition-all duration-200`}
    >
      <Button
        variant="default"
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        <ArrowUp />
      </Button>
    </div>
  );
}
