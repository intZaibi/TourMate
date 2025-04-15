import { clsx, type ClassValue } from "clsx"
import mongoose from "mongoose"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const connectDB = async (DB_URL: string)=>{
  try {
    await mongoose.connect(DB_URL);
    console.log('DB connected...');
  } catch (error) {
    console.log('error connecting DB:', error);
  }
}