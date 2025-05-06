import { NextResponse } from 'next/server';
import {Users} from '@/models/Users'
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'enc';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  if (email && password) {
    const user = await Users.findOne({ email })
    console.log('user:', user )
    if (!user) {
      return NextResponse.json({ error: 'User not found!' }, { status: 404 });
    }
    const token = jwt.sign(
      {
        _id: user._id,
        username: user.username,
        email: user.email
      },
      JWT_SECRET,
      { expiresIn: '1d' }
    );
    const response = NextResponse.json({ success: true });

    response.cookies.set('token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60, // 1 hour
    });

    return response;
  }

  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}