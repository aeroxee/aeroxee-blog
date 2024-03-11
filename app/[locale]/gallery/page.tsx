import Container from "@/components/container";
import GalleryImage from "@/components/gallery-image";
import { getPlaiceholder } from "plaiceholder";

export default async function Gallery() {
  const images = [
    {
      src: "https://images.unsplash.com/photo-1683009426501-028aabdd7b8a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Title",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam architecto ipsum animi totam possimus vero itaque molestiae doloribus dicta odio, error iste, aut corporis eveniet esse quo labore nulla consequuntur?",
    },
    {
      src: "https://images.unsplash.com/photo-1708649290066-5f617003b93f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Title",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam architecto ipsum animi totam possimus vero itaque molestiae doloribus dicta odio, error iste, aut corporis eveniet esse quo labore nulla consequuntur?",
    },
    {
      src: "https://images.unsplash.com/photo-1683009426501-028aabdd7b8a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Title",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam architecto ipsum animi totam possimus vero itaque molestiae doloribus dicta odio, error iste, aut corporis eveniet esse quo labore nulla consequuntur?",
    },
    {
      src: "https://images.unsplash.com/photo-1709934645859-f1ed8d3a4954?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8",
      title: "Title",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam architecto ipsum animi totam possimus vero itaque molestiae doloribus dicta odio, error iste, aut corporis eveniet esse quo labore nulla consequuntur?",
    },
    {
      src: "https://images.unsplash.com/photo-1710003364549-de37d4ed3413?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Title",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam architecto ipsum animi totam possimus vero itaque molestiae doloribus dicta odio, error iste, aut corporis eveniet esse quo labore nulla consequuntur?",
    },
    {
      src: "https://images.unsplash.com/photo-1709973540503-77d699279634?q=80&w=1370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Title",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam architecto ipsum animi totam possimus vero itaque molestiae doloribus dicta odio, error iste, aut corporis eveniet esse quo labore nulla consequuntur?",
    },
    {
      src: "https://images.unsplash.com/photo-1710065574765-a685385c6d9a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHx8fA%3D%3D",
      title: "Title",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam architecto ipsum animi totam possimus vero itaque molestiae doloribus dicta odio, error iste, aut corporis eveniet esse quo labore nulla consequuntur?",
    },
    {
      src: "https://images.unsplash.com/photo-1708525736169-534ee3e24e99?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D",
      title: "Title",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam architecto ipsum animi totam possimus vero itaque molestiae doloribus dicta odio, error iste, aut corporis eveniet esse quo labore nulla consequuntur?",
    },
    {
      src: "https://images.unsplash.com/photo-1709516003202-7740fae429cb?q=80&w=1486&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Title",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam architecto ipsum animi totam possimus vero itaque molestiae doloribus dicta odio, error iste, aut corporis eveniet esse quo labore nulla consequuntur?",
    },
    {
      src: "https://images.unsplash.com/photo-1684359517532-6fbc3f0a53fd?q=80&w=1581&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Title",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam architecto ipsum animi totam possimus vero itaque molestiae doloribus dicta odio, error iste, aut corporis eveniet esse quo labore nulla consequuntur?",
    },
    {
      src: "https://images.unsplash.com/photo-1707894867963-b6b5b44de895?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDExfEpwZzZLaWRsLUhrfHxlbnwwfHx8fHw%3D",
      title: "Title",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam architecto ipsum animi totam possimus vero itaque molestiae doloribus dicta odio, error iste, aut corporis eveniet esse quo labore nulla consequuntur?",
    },
    {
      src: "https://images.unsplash.com/photo-1709699459517-5427f7f27c05?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Title",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam architecto ipsum animi totam possimus vero itaque molestiae doloribus dicta odio, error iste, aut corporis eveniet esse quo labore nulla consequuntur?",
    },
    {
      src: "https://images.unsplash.com/photo-1709390523242-43151724151f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE0fEpwZzZLaWRsLUhrfHxlbnwwfHx8fHw%3D",
      title: "Title",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam architecto ipsum animi totam possimus vero itaque molestiae doloribus dicta odio, error iste, aut corporis eveniet esse quo labore nulla consequuntur?",
    },
  ];

  const newImages = [];

  for (let i = 0; i < images.length; i++) {
    const buffer = await fetch(images[i].src).then(async (res) =>
      Buffer.from(await res.arrayBuffer())
    );
    const { base64 } = await getPlaiceholder(buffer);

    if (base64) {
      const n = {
        src: images[i].src,
        title: images[i].title,
        description: images[i].description,
        blurDataURL: base64,
      };
      newImages.push(n);
    }
  }

  return (
    <>
      {newImages.length > 0 && (
        <Container className="pt-[90px] pb-[90px] px-4 md:px-[50px] lg:px-[90px] mx-auto">
          <GalleryImage images={newImages} />
        </Container>
      )}
    </>
  );
}
