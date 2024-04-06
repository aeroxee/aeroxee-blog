import { type Article } from "./types/articles";

async function getArticles(
  status: "PUBLISHED" | "DRAFTED",
  sort: "views" | "createdAt",
  page: number,
  limit: number,
  q: string | null
): Promise<any> {
  try {
    if (q) {
      const response = await fetch(`${process.env.URL}/api/articles?q=${q}`, {
        cache: "no-cache",
      });
      const data = await response.json();

      return data;
    } else {
      const response = await fetch(
        `${process.env.URL}/api/articles?status=${status}&sort=${sort}&page=${page}&limit=${limit}}`,
        {
          cache: "no-cache",
        }
      );
      const data = await response.json();

      return data;
    }
  } catch (error) {
    return [];
  }
}

async function getArticleById(id: string): Promise<Article> {
  try {
    const response = await fetch(`${process.env.URL}/api/articles/${id}`, {
      cache: "no-cache",
    });
    const data = await response.json();

    return data.data;
  } catch (error) {
    const a: Article = {
      _id: "",
      userId: "",
      categoryId: "",
      title: "",
      content: "",
      views: 0,
      status: "PUBLISHED",
      updatedAt: null,
      createdAt: "",
      comments: undefined,
    };
    return a;
  }
}

async function getArticleByUserId(userId: string): Promise<Article[]> {
  try {
    const response = await fetch(
      `${process.env.URL}/api/articles?userId=${userId}`,
      {
        cache: "no-cache",
      }
    );
    const data = await response.json();

    return data.data;
  } catch (error) {
    return [];
  }
}

async function deleteArticle(id: string): Promise<boolean> {
  try {
    const response = await fetch(`${process.env.URL}/api/articles/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

async function getArticleByCategoryId(
  categoryId: string,
  status: "PUBLISHED" | "DRAFTED"
) {
  try {
    const response = await fetch(
      `${process.env.URL}/api/articles?categoryId=${categoryId}&status=${status}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-cache",
      }
    );

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      return null;
    }
  } catch {
    return null;
  }
}

export {
  deleteArticle,
  getArticleByCategoryId,
  getArticleById,
  getArticleByUserId,
  getArticles,
};
