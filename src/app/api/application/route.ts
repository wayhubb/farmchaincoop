import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // your logic here
  return NextResponse.json({ message: "ok" });
}
