"use client"
import { QueryClientProvider } from '@tanstack/react-query'
import { getQueryClient } from './getQueryClient'
interface Props {
  children: React.ReactNode
}
export default async function QueryProvider({children}:Props) {
  const queryClient = getQueryClient();
 return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider> 
}