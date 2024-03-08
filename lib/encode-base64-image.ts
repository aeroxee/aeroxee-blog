export default function EncodeBase64Image(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Data: string = reader.result as string;
      const [, data] = base64Data.split(",");

      if (data) {
        resolve(data);
      } else {
        reject(new Error("Failed create base64 data from image."));
      }
    };

    reader.onerror = () => {
      reject(new Error("An error while read file image."));
    };

    reader.readAsDataURL(file);
  });
}
