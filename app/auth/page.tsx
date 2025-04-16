// 'use client'
// import { useState, useEffect } from 'react';
// // import { useLocation } from 'wouter';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { useAuth } from '@/hooks/use-auth';
// import { Globe, LogIn, User, UserPlus } from 'lucide-react';

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from '@/components/ui/tabs';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Input } from '@mui/material';
// import { useRouter } from 'next/navigation';
// import { Button } from '@mui/material';

// // Login form schema
// const loginSchema = z.object({
//   username: z.string().min(3, 'Username must be at least 3 characters'),
//   password: z.string().min(6, 'Password must be at least 6 characters'),
// });

// // Registration form schema
// const registerSchema = z.object({
//   username: z.string().min(3, 'Username must be at least 3 characters'),
//   email: z.string().email('Please enter a valid email'),
//   password: z.string().min(6, 'Password must be at least 6 characters'),
//   confirmPassword: z.string(),
// }).refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords don't match",
//   path: ['confirmPassword'],
// });

// type LoginFormValues = z.infer<typeof loginSchema>;
// type RegisterFormValues = z.infer<typeof registerSchema>;

// export default function AuthPage() {
//   const [activeTab, setActiveTab] = useState('login');
//   const { user, loginMutation, registerMutation } = useAuth();
//   // const [_, setLocation] = useLocation();
//   const router = useRouter();

//   // Redirect to home if already logged in
//   useEffect(() => {
//     if (user) {
//       router.push('/');
//     }
//   }, [user]);

//   // Login form
//   const loginForm = useForm<LoginFormValues>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       username: '',
//       password: '',
//     },
//   });

//   // Registration form
//   const registerForm = useForm<RegisterFormValues>({
//     resolver: zodResolver(registerSchema),
//     defaultValues: {
//       username: '',
//       email: '',
//       password: '',
//       confirmPassword: '',
//     },
//   });

//   // Handle login form submission
//   const onLoginSubmit = (values: LoginFormValues) => {
//     loginMutation.mutate(values);
//   };

//   // Handle registration form submission
//   const onRegisterSubmit = (values: RegisterFormValues) => {
//     registerMutation.mutate({
//       username: values.username,
//       email: values.email,
//       password: values.password,
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
//       {/* Left Column - Auth Forms */}
//       <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-12">
//         <div className="w-full max-w-md">
//           <div className="text-center mb-8">
//             <div className="flex items-center justify-center mb-4">
//               <Globe className="h-10 w-10 text-primary-600" />
//               <span className="font-bold text-2xl text-primary-600 ml-2">TourMate</span>
//             </div>
//             <h1 className="text-2xl font-bold">Welcome to TourMate</h1>
//             <p className="text-gray-600 mt-2">
//               {activeTab === 'login' 
//                 ? 'Sign in to your account to access your travel recommendations and saved trips' 
//                 : 'Create an account to get personalized travel recommendations and save your favorite trips'}
//             </p>
//           </div>

//           <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
//             <TabsList className="grid grid-cols-2 w-full mb-8">
//               <TabsTrigger value="login" className="flex items-center gap-2">
//                 <LogIn className="h-4 w-4" />
//                 Sign In
//               </TabsTrigger>
//               <TabsTrigger value="register" className="flex items-center gap-2">
//                 <UserPlus className="h-4 w-4" />
//                 Sign Up
//               </TabsTrigger>
//             </TabsList>

//             <TabsContent value="login">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Sign In</CardTitle>
//                   <CardDescription>
//                     Enter your credentials to access your account
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <Form {...loginForm}>
//                     <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
//                       <FormField
//                         control={loginForm.control}
//                         name="username"
//                         render={({ field }: any) => (
//                           <FormItem>
//                             <FormLabel>Username</FormLabel>
//                             <FormControl>
//                               <Input
//                                 placeholder="Enter your username" 
//                                 {...field} 
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
                      
//                       <FormField
//                         control={loginForm.control}
//                         name="password"
//                         render={({ field }: any) => (
//                           <FormItem>
//                             <FormLabel>Password</FormLabel>
//                             <FormControl>
//                               <Input 
//                                 type="password" 
//                                 placeholder="Enter your password" 
//                                 {...field} 
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
                      
//                       <Button
//                         type="submit" 
//                         className="w-full"
//                         disabled={loginMutation.isPending}
//                       >
//                         {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
//                       </Button>
//                     </form>
//                   </Form>
                  
//                   <div className="mt-4 text-center text-sm text-gray-500">
//                     <p>
//                       Don't have an account?{' '}
//                       <button
//                         onClick={() => setActiveTab('register')}
//                         className="text-primary-600 hover:underline"
//                       >
//                         Sign up
//                       </button>
//                     </p>
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             <TabsContent value="register">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Create an Account</CardTitle>
//                   <CardDescription>
//                     Fill in your details to create a new account
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <Form {...registerForm}>
//                     <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
//                       <FormField
//                         control={registerForm.control}
//                         name="username"
//                         render={({ field }: any ) => (
//                           <FormItem>
//                             <FormLabel>Username</FormLabel>
//                             <FormControl>
//                               <Input 
//                                 placeholder="Choose a username" 
//                                 {...field} 
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
                      
//                       <FormField
//                         control={registerForm.control}
//                         name="email"
//                         render={({ field }:any ) => (
//                           <FormItem>
//                             <FormLabel>Email</FormLabel>
//                             <FormControl>
//                               <Input 
//                                 type="email" 
//                                 placeholder="Your email address" 
//                                 {...field} 
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
                      
//                       <FormField
//                         control={registerForm.control}
//                         name="password"
//                         render={({ field }:any ) => (
//                           <FormItem>
//                             <FormLabel>Password</FormLabel>
//                             <FormControl>
//                               <Input 
//                                 type="password" 
//                                 placeholder="Create a password" 
//                                 {...field} 
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
                      
//                       <FormField
//                         control={registerForm.control}
//                         name="confirmPassword"
//                         render={({ field }:any ) => (
//                           <FormItem>
//                             <FormLabel>Confirm Password</FormLabel>
//                             <FormControl>
//                               <Input 
//                                 type="password" 
//                                 placeholder="Confirm your password" 
//                                 {...field} 
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
                      
//                       <Button 
//                         type="submit" 
//                         className="w-full"
//                         disabled={registerMutation.isPending}
//                       >
//                         {registerMutation.isPending ? 'Creating Account...' : 'Create Account'}
//                       </Button>
//                     </form>
//                   </Form>
                  
//                   <div className="mt-4 text-center text-sm text-gray-500">
//                     <p>
//                       Already have an account?{' '}
//                       <button
//                         onClick={() => setActiveTab('login')}
//                         className="text-primary-600 hover:underline"
//                       >
//                         Sign in
//                       </button>
//                     </p>
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </div>

//       {/* Right Column - Hero */}
//       <div className="hidden md:flex md:w-1/2 bg-primary-600 text-black/80 p-12 flex-col justify-center relative">
//         <div className="absolute inset-0 bg-cover bg-center" 
//              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80')" }} />
        
//         <div className="relative z-10 bg-white/40 p-6 rounded-xl">
//           <h2 className="text-3xl font-bold mb-6">Discover Your Perfect Trip with AI</h2>
//           <p className="text-xl mb-8">
//             TourMate helps you find personalized travel recommendations based on your preferences
//           </p>
          
//           <div className="space-y-6">
//             <div className="flex items-start space-x-4">
//               <div className="bg-white/10 p-2 rounded-full">
//                 <Globe className="h-6 w-6" />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-lg">Personalized Recommendations</h3>
//                 <p className="text-black/80">
//                   Get tailored destination suggestions that match your travel style and interests
//                 </p>
//               </div>
//             </div>
            
//             <div className="flex items-start space-x-4">
//               <div className="bg-white/10 p-2 rounded-full">
//                 <User className="h-6 w-6" />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-lg">Save Your Favorites</h3>
//                 <p className="text-black/80">
//                   Store your preferred destinations, create wishlists, and track your travel history
//                 </p>
//               </div>
//             </div>
            
//             <br className="bg-white/20 my-8" />
            
//             <div className="bg-white/40 p-6 rounded-xl">
//               <p className="italic text-black/80">
//                 "TourMate helped me discover amazing places I never would have found on my own. The personalized
//                 recommendations were spot on for my travel style!"
//               </p>
//               <p className="mt-4 font-medium">— Sarah T., Adventure Traveler</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }








'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/components/hooks/use-auth';
import { useRouter } from 'next/navigation';

// MUI components
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Container,
  Grid,
  InputLabel,
  TextField,
  Tabs,
  Tab,
  Typography,
  Paper,
} from '@mui/material';
import { Globe, LogIn, User, UserPlus } from 'lucide-react';
import { SignInInterface, SignUpInterface, UsersSignIn, UsersSignUp } from '@/interfaces/UsersSchema';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState(0);
  const { user, loginMutation, registerMutation } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push('/');
  }, [user]);

  const loginForm = useForm<SignInInterface>({
    resolver: zodResolver(UsersSignIn),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const registerForm = useForm<SignUpInterface>({
    resolver: zodResolver(UsersSignUp),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onLoginSubmit = (values: SignInInterface) => {
    loginMutation.mutate(values);
  };

  const onRegisterSubmit = (values: Omit<SignUpInterface, "confirmPassword">) => {
    registerMutation.mutate({
      username: values.username,
      email: values.email,
      password: values.password,
    });
  };

  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      {/* Left Column - Form */}
      <Grid item xs={12} md={6}>
        <Container maxWidth="sm" sx={{ py: 8 }}>
          <Box textAlign="center" mb={4}>
            <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
              <Globe size={32} />
              <Typography variant="h5" ml={1} color="primary">
                TourMate
              </Typography>
            </Box>
            <Typography variant="h4" fontWeight="bold">
              Welcome to TourMate
            </Typography>
            <Typography variant="body1" color="textSecondary" mt={1}>
              {activeTab === 0
                ? 'Sign in to your account to access your travel recommendations and saved trips'
                : 'Create an account to get personalized travel recommendations and save your favorite trips'}
            </Typography>
          </Box>

          <Tabs value={activeTab} onChange={(_, val) => setActiveTab(val)} centered>
            <Tab icon={<LogIn size={20} />} iconPosition="start" label="Sign In" />
            <Tab icon={<UserPlus size={20} />} iconPosition="start" label="Sign Up" />
          </Tabs>

          {activeTab === 0 && (
            <Card variant="outlined" sx={{ mt: 4 }}>
              <CardHeader title="Sign In" subheader="Enter your credentials to access your account" />
              <CardContent component="form" onSubmit={loginForm.handleSubmit(onLoginSubmit)}>
                <TextField
                  fullWidth
                  label="Email"
                  margin="normal"
                  {...loginForm.register('email')}
                  error={!!loginForm.formState.errors.email}
                  helperText={loginForm.formState.errors.email?.message}
                />
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  {...loginForm.register('password')}
                  error={!!loginForm.formState.errors.password}
                  helperText={loginForm.formState.errors.password?.message}
                />
                <CardActions>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loginMutation.isPending}
                  >
                    {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
                  </Button>
                </CardActions>
              </CardContent>
              <Box textAlign="center" pb={2}>
                <Typography variant="body2">
                  Don&apos;t have an account?{' '}
                  <Button variant="text" onClick={() => setActiveTab(1)}>
                    Sign up
                  </Button>
                </Typography>
              </Box>
            </Card>
          )}

          {activeTab === 1 && (
            <Card variant="outlined" sx={{ mt: 4 }}>
              <CardHeader
                title="Create an Account"
                subheader="Fill in your details to create a new account"
              />
              <CardContent component="form" onSubmit={registerForm.handleSubmit(onRegisterSubmit)}>
                <TextField
                  fullWidth
                  label="Username"
                  margin="normal"
                  {...registerForm.register('username')}
                  error={!!registerForm.formState.errors.username}
                  helperText={registerForm.formState.errors.username?.message}
                />
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  margin="normal"
                  {...registerForm.register('email')}
                  error={!!registerForm.formState.errors.email}
                  helperText={registerForm.formState.errors.email?.message}
                />
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  {...registerForm.register('password')}
                  error={!!registerForm.formState.errors.password}
                  helperText={registerForm.formState.errors.password?.message}
                />
                <TextField
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  margin="normal"
                  {...registerForm.register('confirmPassword')}
                  error={!!registerForm.formState.errors.confirmPassword}
                  helperText={registerForm.formState.errors.confirmPassword?.message}
                />
                <CardActions>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={registerMutation.isPending}
                  >
                    {registerMutation.isPending ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </CardActions>
              </CardContent>
              <Box textAlign="center" pb={2}>
                <Typography variant="body2">
                  Already have an account?{' '}
                  <Button variant="text" onClick={() => setActiveTab(0)}>
                    Sign in
                  </Button>
                </Typography>
              </Box>
            </Card>
          )}
        </Container>
      </Grid>

      {/* Right Column - Hero Section */}
      <Grid
        item
        md={6}
        sx={{
          display: { xs: 'none', md: 'flex' },
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            padding: 6,
            margin: 4,
            borderRadius: 2,
            height: 'fit-content',
          }}
        >
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Discover Your Perfect Trip with AI
          </Typography>
          <Typography variant="body1" paragraph>
            TourMate helps you find personalized travel recommendations based on your preferences.
          </Typography>
          <Box display="flex" alignItems="flex-start" gap={2} mb={2}>
            <Globe />
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                Personalized Recommendations
              </Typography>
              <Typography variant="body2">
                Get tailored destination suggestions that match your travel style and interests.
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="flex-start" gap={2} mb={4}>
            <User />
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                Save Your Favorites
              </Typography>
              <Typography variant="body2">
                Store your preferred destinations, create wishlists, and track your travel history.
              </Typography>
            </Box>
          </Box>

          <Paper elevation={3} sx={{ p: 3, backgroundColor: 'rgba(255, 255, 255, 0.4)' }}>
            <Typography variant="body1" fontStyle="italic">
              "TourMate helped me discover amazing places I never would have found on my own. The
              personalized recommendations were spot on for my travel style!"
            </Typography>
            <Typography variant="subtitle2" mt={2}>
              — Sarah T., Adventure Traveler
            </Typography>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
}

