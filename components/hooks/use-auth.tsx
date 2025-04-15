import toast, from 'react-hot-toast';

type AuthContextType = {
  user: SelectUser | null;
  isLoading: boolean;
  error: Error | null;
  loginMutation: UseMutationResult<Omit<SelectUser, "password">, Error, LoginData>;
  logoutMutation: UseMutationResult<void, Error, void>;
  registerMutation: UseMutationResult<Omit<SelectUser, "password">, Error, InsertUser>;
};

async function useAuth(credentials) {
  // login
  const loginMutation = () => {
    try {
      const res = await fetch("/api/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer your-token'
        },
        body: JSON.stringify(credentials) // Only for methods like POST or PUT
      })
        const result = await res.json()
        toast(`Login successful Welcome back, ${result.user.username}!`)
        return result.user;  
      
    } catch (error) {
        toast(`Login failed! Something went wrong!`)
        return error
    }
  }
}