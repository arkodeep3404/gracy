import prismadb from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const userId = req.headers.get("userId");
    const blogId = req.headers.get("blogId");

    if (!userId || !blogId) {
      return Response.json(
        {
          message: "userId or blogId not found. please login or try again",
        },
        { status: 401 }
      );
    }

    const userBlog = await prismadb.blog.findUnique({
      where: { id: blogId, userId: userId },
    });

    return Response.json(
      {
        userBlog: userBlog,
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

export async function POST() {}
