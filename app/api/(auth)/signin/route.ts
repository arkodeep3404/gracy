import prismadb from "@/lib/prisma";
import zod from "zod";
import sendLoginEmail from "@/lib/sendEmail";
import { v4 } from "uuid";

const signinBody = zod.object({
  email: zod.string().email(),
});

export async function POST(req: Request) {
  try {
    const parsedBody = await req.json();
    const { success } = signinBody.safeParse(parsedBody);

    if (!success) {
      return Response.json(
        {
          message: "incorrect email",
        },
        { status: 411 }
      );
    }

    const { email } = parsedBody;

    const user = await prismadb.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return Response.json(
        {
          message: "no user exists with given email",
        },
        { status: 404 }
      );
    }

    const origin = req.headers.get("origin") || "";
    const token = v4();

    await prismadb.user.update({
      where: { email: email },
      data: { token: token },
    });

    await sendLoginEmail(email, user.firstName, token, origin);

    return Response.json(
      {
        message: "please check email to login.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        message: "something went wrong. please try again",
      },
      { status: 500 }
    );
  }
}
