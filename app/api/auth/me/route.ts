import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const cookie = req.headers.get('cookie') || '';
  const token = cookie
    .split(';')
    .find((c) => c.trim().startsWith('token='))
    ?.split('=')[1];
  if(token){
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET||'enc');
      if (typeof user === 'object') {
        return NextResponse.json({ id: user._id, username: user.username, email: user.email });
      }
    } catch (error) {
      console.log(error)
    }
  }
  return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
}