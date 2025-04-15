import mongoose from 'mongoose';

const SignUpSchema = new mongoose.Schema({
  username: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  createdAt: {type: Date, default: Date.now}
});
const SignInSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true}
});

export const SignUp = mongoose.model("SignUp", SignUpSchema);
export const SignIn = mongoose.model("SignIn", SignInSchema);