import { type User } from "./types/users";

async function getUserById(id: string): Promise<User | null> {
  try {
    const response = await fetch(`${process.env.URL}/api/users?id=${id}`, {
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

export { getUserById };
