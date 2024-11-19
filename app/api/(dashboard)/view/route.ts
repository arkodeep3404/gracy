import prismadb from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const blogId = req.headers.get("blogId");

    if (!blogId) {
      return Response.json(
        {
          message: "blogId not found. please try again",
        },
        { status: 401 }
      );
    }

    const userBlog = await prismadb.blog.findUnique({
      where: { id: blogId },
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
