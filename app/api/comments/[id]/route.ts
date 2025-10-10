import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { patchCommentSchema } from "../../validationSchemas";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const body = await request.json();
  const validation = patchCommentSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error, { status: 400 });

  const { description, authorId, issueId } = body;

  // check that valid user exists
  if (authorId) {
    const user = await prisma.user.findUnique({
      where: { id: authorId },
    });
    if (!user)
      return NextResponse.json({ error: "Invalid user" }, { status: 400 });
  }

  // check that valid issue exists
  if (issueId) {
    const issue = await prisma.user.findUnique({
      where: { id: issueId },
    });
    if (!issue)
      return NextResponse.json({ error: "Invalid issue" }, { status: 400 });
  }

  const comment = await prisma.comment.findUnique({
    where: { id: parseInt(id) },
  });

  if (!comment)
    return NextResponse.json({ error: "Invalid comment" }, { status: 404 });

  const updatedIssue = await prisma.comment.update({
    where: { id: comment.id },
    data: {
      description,
      authorId,
      issueId,
    },
  });

  return NextResponse.json(updatedIssue);
}
