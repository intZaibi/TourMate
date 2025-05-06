import { Users } from "@/models/Users";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, email, password } = await req.json();

  try {
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }
    const user = await Users.create({ username, email, password });
    
    return NextResponse.json({ user: { id: user._id, username, email } }, { status: 200 });
  } catch (error) {
    console.error("Error creating account:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
