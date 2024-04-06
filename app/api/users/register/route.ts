import { ClientDB } from "@/lib/db";
import { genSaltSync, hashSync } from "bcrypt-ts";

async function CheckUserUsername(username: string) {
  const result = await ClientDB.db("aeroxee-blog")
    .collection("users")
    .findOne({ username: username });
  if (result) {
    return true;
  } else {
    return false;
  }
}

export async function POST(request: Request) {
  const data = await request.json();

  const userAlreadyExist = await CheckUserUsername(data.username);
  if (userAlreadyExist) {
    return Response.json(
      {
        status: "error_username",
        message: "Username already exists",
      },
      { status: 400 }
    );
  }

  try {
    const salt = genSaltSync(10);
    const hash = hashSync(data.password, salt);
    const resultInsertedId = await ClientDB.db("aeroxee-blog")
      .collection("users")
      .insertOne({
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        email: data.email,
        password: hash,
        is_active: true,
        updated_at: null,
        created_at: new Date(),
      });

    const resultUser = await ClientDB.db("aeroxee-blog")
      .collection("users")
      .findOne({
        _id: resultInsertedId.insertedId,
      });

    return Response.json(
      {
        status: "success",
        message:
          "Successfully register account with username: " + data.username,
        data: resultUser,
      },
      { status: 201 }
    );
  } catch (error) {
    return Response.json({
      status: "error",
      message: error,
    });
  }
}
