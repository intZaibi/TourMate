import { NextResponse } from 'next/server';

export async function GET(req: Request) {

    const response = NextResponse.json({ success: true });

    response.cookies.set('token', '', {
      httpOnly: true,
      path: '/',
      maxAge: 0,
    });

    return response;
}