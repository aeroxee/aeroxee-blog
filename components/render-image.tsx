import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  blurDataURL: string;
  onClick?: () => void;
}

export default function RenderImage({
  src,
  alt,
  width,
  height,
  className,
  blurDataURL,
  onClick,
}: Props) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      placeholder="blur"
      blurDataURL={blurDataURL}
      loading="lazy"
      onClick={onClick}
    />
  );
}
