import { clsx, type ClassValue } from "clsx"
import mongoose from "mongoose"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const connectDB = async (DB_URL: string)=>{
  if (mongoose.connection.readyState >= 1) return;
  try {
    await mongoose.connect(DB_URL || 'mongodb://127.0.0.1:27017/test');
    console.log('DB connected...');
  } catch (error) {
    console.log('error connecting DB:', error);
  }
}