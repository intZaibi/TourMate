import { clsx, type ClassValue } from "clsx"
import mongoose from "mongoose"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const connectDB = async (DB_URL: string)=>{
  if (mongoose.connection.readyState >= 1) return;
  try {
    await mongoose.connect(process.env.DB_URL || '');
    console.log('DB connected...');
  } catch (error) {
    console.log('error connecting DB:', error);
  }
}