import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const cookie = req.headers.get('cookie') || '';
  const token = cookie
    .split(';')
    .find((c) => c.trim().startsWith('token='))
    ?.split('=')[1];

  if (token === 'valid-token') {
    return NextResponse.json({ id: 'zaibi', username: 'John Doe', email: 'user@example.com' });
  }

  return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
}