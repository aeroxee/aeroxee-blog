import Container from "@/components/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllCategories } from "@/lib/categories";
import { Category } from "@/lib/types/category";
import { Metadata } from "next";
import Link from "next/link";
import { Key } from "react";

export const metadata: Metadata = {
  title: "Categories | aeroxee",
  description: "This page to show Categories of blog.",
};

export default async function Categories() {
  const categories = await getAllCategories();

  return (
    <Container className="w-[96%] lg:w-[70%] mx-auto py-[90px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((category: Category, key: Key) => (
          <Card key={key}>
            <CardHeader>
              <CardTitle>
                <Link
                  href={`/categories/${category._id}`}
                  className="text-sky-600"
                >
                  {category.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{category.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  );
}
