import Container from "@/components/container";
import { Loader2 } from "lucide-react";

export default function LoadingSetting() {
  return (
    <Container className="w-full min-h-screen fixed z-[10000]">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Loader2 size={50} className="animate-spin" />
      </div>
    </Container>
  );
}
