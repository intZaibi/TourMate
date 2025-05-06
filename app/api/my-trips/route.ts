import Trip from "@/models/Trip";
import { Users } from "@/models/Users";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
  const {recommendation} = await req.json();
  console.clear()
  console.log(recommendation)
  try {
    const id = await getIdFromCookie(req)
    const me = await Users.findOne({_id: id})
    if (!me) {
      throw new Error('User Not Found!')
    }
    await Trip.insertOne({recommendation, userId: id});
    return NextResponse.json({status:200});
  } catch (error) {
    console.log('error inserting trip into db:', error)
    return NextResponse.json({error}, {status: 500});
  }
}

export async function GET(req:Request) {
  
  try {
    const id = await getIdFromCookie(req)
    const me = await Users.findOne({_id: id})
    if (!me) {
      throw new Error('404! User Not Found!')
    }
    const trips = await Trip.find({userId: id})
    if (!trips) {
      throw new Error("404! No trip Found!");
    }
    console.log(trips)
    return NextResponse.json({trips}, {status:200});
  } catch (error) {
    if (error instanceof Error) {
      console.log('error finding trip:', error)
      return NextResponse.json({error: error?.message}, {status: 404});
    }
  }
}

export async function DELETE(req:Request) {
  const {_id} = await req.json();

  try {
    await Trip.deleteOne({_id});
    const trips = await Trip.find();
    return NextResponse.json({trips}, {status : 200})
  } catch (error) {
    console.log(error)
    return NextResponse.json({error}, {status: 500})
  }
}


const getIdFromCookie = async (req:Request)=>{
  const cookie = req.headers.get('cookie') || '';
  const token = cookie
    .split(';')
    .find((c) => c.trim().startsWith('token='))
    ?.split('=')[1];

  if(token){
      const user = jwt.verify(token, process.env.JWT_SECRET||'enc');

      if (typeof user === 'object') {
        return user._id
      }
  }
}