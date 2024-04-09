"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.log(error);
  });

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-background w-full min-h-screen">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center space-y-5">
        <h2 className="text-rose-600 text-4xl font-extrabold uppercase">
          something went wrong!
        </h2>
        <Button onClick={() => reset()}>Try Again</Button>
      </div>
    </div>
  );
}
