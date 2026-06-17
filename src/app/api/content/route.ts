import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth";
import { getContent, getPrevContent, setContent } from "@/lib/content";
import type { SiteContent } from "@/types/content";

export async function GET() {
  const result = await getContent();
  return NextResponse.json(result.content);
}

function isValidContent(body: unknown): body is SiteContent {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.contact === "object" && b.contact !== null &&
    typeof b.images === "object" && b.images !== null &&
    typeof b.hero === "object" && b.hero !== null &&
    typeof b.about === "object" && b.about !== null &&
    typeof b.process === "object" && b.process !== null &&
    typeof b.pricing === "object" && b.pricing !== null &&
    typeof b.trust === "object" && b.trust !== null &&
    typeof b.testimonials === "object" && b.testimonials !== null &&
    typeof b.cta === "object" && b.cta !== null &&
    typeof b.footer === "object" && b.footer !== null
  );
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!isValidContent(body)) {
    return NextResponse.json({ error: "Invalid content structure" }, { status: 400 });
  }

  try {
    await setContent(body);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Save failed" },
      { status: 500 }
    );
  }

  revalidatePath("/");
  return NextResponse.json({ ok: true });
}

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { action: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (body.action !== "restore-prev") {
    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  }

  const prev = await getPrevContent();
  if (!prev) {
    return NextResponse.json({ error: "No previous save found" }, { status: 404 });
  }

  try {
    await setContent(prev);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Restore failed" },
      { status: 500 }
    );
  }

  revalidatePath("/");
  return NextResponse.json({ ok: true, content: prev });
}
