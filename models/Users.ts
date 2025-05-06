import { connectDB } from '@/controllers/utils/utils';
import mongoose from 'mongoose';

await connectDB(process.env.DB_URL || 'mongodb://127.0.0.1:27017/test');

const SignUpSchema = new mongoose.Schema({
  username: {type: String, required: true},
  email: {type: String, required: true, unique: true, lowercase: true, trim: true},
  password: {type: String, required: true},
  createdAt: {type: Date, default: Date.now}
});

export const Users = mongoose.models.User || mongoose.model("User", SignUpSchema);
