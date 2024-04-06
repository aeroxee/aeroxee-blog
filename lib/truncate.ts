export default function stripHtmlAndTruncate(text: string, maxWords: number) {
  const withoutFigcaptionText = text.replace(
    /<figcaption\b[^>]*>[\s\S]*<\/figcaption>/g,
    (match) => {
      // Mengganti teks dalam elemen figcaption dengan string kosong
      return match.replace(/<figcaption\b[^>]*>([\s\S]*)<\/figcaption>/g, "");
    }
  );

  // const plainText = text.replace(/<[^>]*>|&nbsp;/g, "");
  const plainText = withoutFigcaptionText.replace(/<[^>]*>|&nbsp;/g, "");

  const words = plainText.split(/\s+/);
  const truncatedText = words.slice(0, maxWords).join(" ");

  return truncatedText;
}
