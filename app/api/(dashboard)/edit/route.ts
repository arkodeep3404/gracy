import prismadb from "@/lib/prisma";
import zod from "zod";

const editBody = zod.object({
  blogId: zod.string(),
  content: zod.string(),
});

export async function POST(req: Request) {
  try {
    const userId = req.headers.get("userId");

    if (!userId) {
      return Response.json(
        {
          message: "userId not found. please login",
        },
        { status: 401 }
      );
    }

    const parsedBody = await req.json();
    const { success } = editBody.safeParse(parsedBody);

    if (!success) {
      return Response.json(
        {
          message: "incorrect content",
        },
        { status: 400 }
      );
    }

    const { content, blogId } = parsedBody;

    await prismadb.blog.update({
      where: { id: blogId, userId: userId },
      data: { content: content },
    });

    return Response.json(
      {
        message: "blog content updated",
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        message: "something went wrong. please try again",
        error: error,
      },
      { status: 500 }
    );
  }
}
