import { NextResponse } from "next/server";

export async function POST(res) {
  return NextResponse.json({messsage: 'Got the req'},{status: 200})
}