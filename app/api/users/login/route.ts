import { ClientDB } from "@/lib/db";
import { compareSync } from "bcrypt-ts";

export async function POST(request: Request) {
  const data = await request.json();

  const user = await ClientDB.db("aeroxee-blog").collection("users").findOne({
    username: data.username,
  });

  if (user) {
    if (compareSync(data.password, user.password)) {
      return Response.json({
        status: "success",
        message: "Login successfully",
        data: user,
      });
    } else {
      return Response.json(
        {
          status: "error",
          message: "Username or password is incorrect.",
        },
        { status: 400 }
      );
    }
  } else {
    return Response.json(
      {
        status: "error",
        message: "Username or password is incorrect.",
      },
      { status: 400 }
    );
  }
}
