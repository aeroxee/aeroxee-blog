import { ClientDB } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const categoryId = searchParams.get("categoryId");
  const userId = searchParams.get("userId");
  const status = searchParams.get("status");
  const sort = searchParams.get("sort");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const q = searchParams.get("q");

  if (categoryId) {
    const result = await ClientDB.db("aeroxee-blog")
      .collection("articles")
      .find({
        categoryId: ObjectId.createFromHexString(categoryId),
      })
      .toArray();

    return Response.json({ status: "success", message: "", data: result });
  }

  if (userId) {
    const result = await ClientDB.db("aeroxee-blog")
      .collection("articles")
      .find({
        userId: ObjectId.createFromHexString(userId),
      })
      .sort({
        createdAt: -1,
      })
      .toArray();

    return Response.json({ status: "success", message: "", data: result });
  }

  if (status && sort) {
    const filter = {
      status: status,
    };
    const totalItems = await ClientDB.db("aeroxee-blog")
      .collection("articles")
      .countDocuments(filter);
    const totalPages = Math.ceil(totalItems / limit);

    const result = await ClientDB.db("aeroxee-blog")
      .collection("articles")
      .find(
        {
          status: status,
        },
        {
          sort: sort === "views" ? { views: -1 } : { createdAt: -1 },
        }
      )
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    return Response.json({
      status: "success",
      message: "",
      data: result,
      totalPages: totalPages,
      next: page === totalPages ? false : true,
    });
  }

  if (q) {
    const result = await ClientDB.db("aeroxee-blog")
      .collection("articles")
      .find({ $text: { $search: q }, status: "PUBLISHED" })
      .toArray();
    return Response.json({ status: "success", message: "", data: result });
  }

  const result = await ClientDB.db("aeroxee-blog")
    .collection("articles")
    .find({})
    .toArray();

  return Response.json({ status: "success", message: "", data: result });
}

export async function POST(request: Request) {
  const data = await request.json();

  try {
    const resultInserted = await ClientDB.db("aeroxee-blog")
      .collection("articles")
      .insertOne({
        categoryId: ObjectId.createFromHexString(data.categoryId),
        userId: ObjectId.createFromHexString(data.userId),
        title: data.title,
        content: data.content,
        views: 0,
        status: data.status,
        comments: null,
        updatedAt: null,
        createdAt: new Date(),
      });

    return Response.json(
      {
        status: "success",
        message:
          "Successfully insert new article with id: " +
          resultInserted.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return Response.json({ status: "error", message: error }, { status: 400 });
  }
}
