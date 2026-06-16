import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";
import { authOptions } from "@/lib/auth";
import { getContent, setContent } from "@/lib/content";
import type { SiteContent } from "@/types/content";

export async function GET() {
  const content = await getContent();
  return NextResponse.json(content);
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body: SiteContent = await request.json();
  await setContent(body);
  revalidateTag("site-content");

  return NextResponse.json({ ok: true });
}
