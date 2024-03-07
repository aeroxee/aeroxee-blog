import { ClientDB } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");

  if (id) {
    try {
      const result = await ClientDB.db("aeroxee-blog")
        .collection("users")
        .findOne({
          _id: ObjectId.createFromHexString(id),
        });
      if (result) {
        return Response.json({ status: "success", message: "", data: result });
      } else {
        return Response.json(
          { status: "error", message: "not found", data: null },
          { status: 404 }
        );
      }
    } catch (error) {
      return Response.json(
        { status: "error", message: error },
        { status: 500 }
      );
    }
  }
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");

  if (!id) {
    return Response.json(
      { status: "error", message: "Not found" },
      { status: 404 }
    );
  }

  const formData = await request.formData();

  const avatar = formData.get("avatar");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const username = formData.get("username");
  const email = formData.get("email");
  const bio = formData.get("bio");

  try {
    if (avatar) {
      await ClientDB.db("aeroxee-blog")
        .collection("users")
        .updateOne(
          {
            _id: ObjectId.createFromHexString(id),
          },
          {
            $set: {
              firstName: firstName,
              lastName: lastName,
              username: username,
              email: email,
              avatar: avatar,
              bio: bio,
              updatedAt: new Date(),
            },
          }
        );
    } else {
      await ClientDB.db("aeroxee-blog")
        .collection("users")
        .updateOne(
          {
            _id: ObjectId.createFromHexString(id),
          },
          {
            $set: {
              firstName: firstName,
              lastName: lastName,
              username: username,
              email: email,
              bio: bio,
              updatedAt: new Date(),
            },
          }
        );
    }

    return Response.json({
      status: "success",
      message: "Successfully update your info.",
    });
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        status: "error",
        message: "Error on server.",
      },
      { status: 500 }
    );
  }
}
