import {z} from 'zod';
export const UsersSignUp = z.object({
  username: z.string(),
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }) 
  .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" }) 
  .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" }) 
  .regex(/\d/, { message: "Password must contain at least one number" }) 
  .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "Password must contain at least one special character" }),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, { message: "Passwords do not match!", path: ["confirmPassword"]});

export const UsersSignIn = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string()
});

export type SignUpInterface = z.infer<typeof UsersSignUp>
export type SignInInterface = z.infer<typeof UsersSignIn>
export type User = { id: string, username: string, email: string }

// console.log(UsersSignUp.safeParse({username: 'Zaibi', email: 'abc@x.yz', password: 'Qadri..2', confirmPassword: 'Qadri..2'}))