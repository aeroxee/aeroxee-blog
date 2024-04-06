import { ClientDB } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const result = await ClientDB.db("aeroxee-blog")
    .collection("articles")
    .findOne({
      _id: ObjectId.createFromHexString(id),
    });

  if (!result) {
    return Response.json(
      { status: "error", message: "not found" },
      { status: 404 }
    );
  } else {
    return Response.json({ status: "success", message: "", data: result });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const data = await request.json();

  try {
    await ClientDB.db("aeroxee-blog")
      .collection("articles")
      .updateOne(
        {
          _id: ObjectId.createFromHexString(params.id),
        },
        {
          $set: {
            categoryId: ObjectId.createFromHexString(data.categoryId),
            title: data.title,
            content: data.content,
            status: data.status,
            updatedAt: new Date(),
          },
        }
      );
    return Response.json({
      status: "success",
      message: "Successfully update your article.",
    });
  } catch (error) {
    return Response.json(
      {
        status: "error",
        message: error,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await ClientDB.db("aeroxee-blog")
      .collection("articles")
      .deleteOne({
        _id: ObjectId.createFromHexString(params.id),
      });
    return Response.json({
      status: "success",
      message: "Successfully delete your article.",
    });
  } catch (error) {
    return Response.json(
      {
        status: "error",
        message: error,
      },
      { status: 500 }
    );
  }
}
