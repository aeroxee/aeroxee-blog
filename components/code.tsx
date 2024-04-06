"use client";

import hljs from "highlight.js";
import { useEffect } from "react";

export default function Code() {
  useEffect(() => {
    hljs.highlightAll();
  });

  return <></>;
}
