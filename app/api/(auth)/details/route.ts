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

    const currentUser = await prismadb.user.findUnique({
      where: { id: userId },
    });

    if (currentUser) {
      return Response.json(
        {
          currentUser: currentUser,
        },
        { status: 200 }
      );
    } else {
      return Response.json(
        {
          message: "no user exists with given userId",
        },
        { status: 404 }
      );
    }
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
