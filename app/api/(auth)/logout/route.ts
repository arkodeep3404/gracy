import { cookies } from "next/headers";

export async function POST(req: Request) {
  cookies().delete("gracy_auth");

  return Response.json(
    {
      message: "cookie deleted successfully",
    },
    { status: 200 },
  );
}