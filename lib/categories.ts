import { Category } from "./types/category";

async function getAllCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${process.env.URL}/api/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });

    const data = await response.json();

    return data.data;
  } catch (error) {
    return [];
  }
}

async function getCategoryById(id: string): Promise<Category | null> {
  try {
    const response = await fetch(`${process.env.URL}/api/categories?id=${id}`, {
      cache: "no-cache",
    });
    const data = await response.json();

    if (response.ok) {
      return data.data;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

export { getAllCategories, getCategoryById };
