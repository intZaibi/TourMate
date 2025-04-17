import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (email === 'user@example.com' && password === 'password') {
    const response = NextResponse.json({ success: true });

    response.cookies.set('token', 'valid-token', {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60, // 1 hour
    });

    return response;
  }

  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}