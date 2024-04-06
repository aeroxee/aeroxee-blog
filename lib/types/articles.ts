type Article = {
  _id: string;
  userId: string;
  categoryId: string;
  title: string;
  content: string;
  views: number;
  status: "PUBLISHED" | "DRAFTED";
  updatedAt: string | null;
  createdAt: string;
  comments: any;
};

export { type Article };
