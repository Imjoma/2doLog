import Idea from "@/models/Idea";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { id } = params;
  try {
    await connect();
    const idea = await Idea.findById(id);
    return new NextResponse(JSON.stringify(idea), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const PUT = async (request, { params }) => {
  const { id } = params;
  const { title, description, visibility, image } = await request.json();

  try {
    await connect();
    await Idea.findByIdAndUpdate(id, {
      title,
      description,
      visibility,
      image,
    });
    return NextResponse.json(
      {
        title,
        description,
        visibility,
        image,
      },
      { status: 200 }
    );
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  const { id } = params;
  try {
    await connect();
    await Idea.findByIdAndDelete(id);
    return new NextResponse("Idea deleted successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
