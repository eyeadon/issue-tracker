import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { postCommentSchema } from "../validationSchemas";
import { getServerSession } from "next-auth";
import authOptions from "../auth/authOptions";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();

  const validation = postCommentSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error, { status: 400 });

  const newComment = await prisma.comment.create({
    data: {
      description: body.description,
      authorId: body.authorId,
      issueId: body.issueId,
    },
  });

  return NextResponse.json(newComment, { status: 201 });
}
