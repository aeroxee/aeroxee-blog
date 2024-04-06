"use client";

import Image from "next/image";

interface Base64ImageProps {
  base64Data: string | null;
  alt: string;
  width: number;
  height: number;
  className: string;
}

const Base64Image: React.FC<Base64ImageProps> = ({
  base64Data,
  alt,
  width,
  height,
  className,
}) => {
  return (
    <Image
      src={`data:image/png;base64,${base64Data}`}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
};

export default Base64Image;
