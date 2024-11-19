import prismadb from "@/lib/prisma";

export async function GET(req: Request) {
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

    const userBlogs = await prismadb.blog.findMany({
      where: { userId: userId },
    });

    return Response.json(
      {
        userBlogs: userBlogs,
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
