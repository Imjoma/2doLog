import Idea from "@/models/Idea";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connect();
    const ideas = await Idea.find().sort({ createdAt: -1 });
    return new NextResponse(JSON.stringify(ideas), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (request) => {
  const body = await request.json();

  const newIdea = new Idea(body);

  try {
    await connect();

    await newIdea.save();

    return new NextResponse("Idea created successfully", { status: 201 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
