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
    <Grid container sx={{ minHeight: '100vh', width: '100vw' }}>
      {/* Left Column - Form */}
      <Grid sx={{maxWidth: "40%"}}>
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
            <Tab icon={<LogIn size={16} />} iconPosition="start" label="Sign In" />
            <Tab icon={<UserPlus size={16} />} iconPosition="start" label="Sign Up" />
          </Tabs>
          {activeTab === 0 && (
            <Card variant="elevation" sx={{ mt: 4 }}>
              <CardHeader title="Sign In" subheader="Enter your credentials to access your account" />
              <CardContent component="form" onSubmit={loginForm.handleSubmit(onLoginSubmit)}>
                <TextField
                  fullWidth
                  label="Email"
                  margin="normal"
                  {...loginForm.register('email')}
                  error={!!loginForm.formState.errors.email}
                  helperText={loginForm.formState.errors.email?.message}
                  sx={{height: '5%'}}
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
        sx={{
          display: { xs: 'none', md: 'flex' },
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          width: '60%',
          // display: "flex",
          alignItems: 'center',
          justifyContent: 'center'
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

