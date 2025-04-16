import { getQueryClient } from '@/controllers/utils/getQueryClient';
import { SignInInterface, SignUpInterface, User } from '@/interfaces/UsersSchema';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const apiRequest = async (method:string, path: string, credentials?: SignInInterface | SignUpInterface | null) => {
  const res = await fetch(path, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: credentials? JSON.stringify(credentials): undefined
  })
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
  return res;  
}

const queryClient = getQueryClient();

const loginMutation = useMutation({
  mutationFn: async (credentials: SignInInterface) => {
    const res = await apiRequest("POST", "/api/login", credentials);
    return await res.json();
  },
  onSuccess: (user) => {
    queryClient.setQueryData(["/api/user"], user);
    toast.success(`Login successful! \n Welcome back, ${user.username}!`);
  },
  onError: (error: Error) => {
    toast.error(`Login failed! \n ${error.message}`);
  },
});

const registerMutation = useMutation({
  mutationFn: async (credentials: Omit<SignUpInterface, "confirmPassword">) => {
    const res = await apiRequest("POST", "/api/register", credentials);
    return await res.json();
  },
  onSuccess: (user) => {
    queryClient.setQueryData(["/api/user"], user);
    toast.success(`Registration successful! \n Welcome to TourMate, ${user.username}!`);
  },
  onError: (error: Error) => {
    toast.error(`Registration failed! \n ${error.message}`);
  },
});

const logoutMutation = useMutation({
  mutationFn: async () => {
    const res = await apiRequest("GET", "/api/logout");
    return await res.json();
  },
  onSuccess: () => {
    queryClient.setQueryData(["/api/user"], null);
    toast.success(`Logged out! \n You have been successfully logged out.`);
  },
  onError: (error: Error) => {
    toast.error(`Logout failed! \n ${error.message}`);
  },
});

export function useAuth() {
  const { data: user, error, isLoading, } = 
  useQuery<User | null, Error>({
    queryKey: ["/api/user"],
    queryFn: async () => {
      const res = await fetch('/api/me', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        const text = (await res.text()) || res.statusText;
        throw new Error(`${res.status}: ${text}`);
      }
      const data: User | null = await res.json();
      return data;
    },
  });
    return {user, error, isLoading, loginMutation, registerMutation, logoutMutation}
}


// type AuthContextType = {
//   user: SelectUser | null;
//   isLoading: boolean;
//   error: Error | null;
//   loginMutation: UseMutationResult<Omit<SelectUser, "password">, Error, LoginData>;
//   logoutMutation: UseMutationResult<void, Error, void>;
//   registerMutation: UseMutationResult<Omit<SelectUser, "password">, Error, InsertUser>;
// };