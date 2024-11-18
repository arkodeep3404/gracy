import prismadb from "@/lib/prisma";

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

    const newBlog = await prismadb.blog.create({
      data: {
        userId: userId,
      },
    });

    return Response.json(
      {
        message: "new blog created",
        blogId: newBlog.id,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        message: "something went wrong. please try again",
      },
      { status: 500 }
    );
  }
}
