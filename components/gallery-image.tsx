"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import RenderImage from "./render-image";

interface Props {
  images: any;
}

export default function GalleryImage({ images }: Props) {
  const [index, setIndex] = useState<number>(-1);

  return (
    <>
      <div className="columns-3 gap-2">
        {images.map((image: any, index: any) => (
          <RenderImage
            key={index}
            src={image.src}
            alt={image.title}
            width={1200}
            height={800}
            blurDataURL={image.blurDataURL}
            className="w-full mb-2 cursor-pointer"
            onClick={() => setIndex(index)}
          />
        ))}
      </div>

      <Lightbox
        slides={images}
        open={index >= 0}
        close={() => setIndex(-1)}
        plugins={[Captions, Thumbnails]}
      />
    </>
  );
}
