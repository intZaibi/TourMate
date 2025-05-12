'use client'
import { useEffect } from "react";
import MyTrip from '@/components/layout/MyTrips'
import {Header} from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { apiRequest, useAuth } from "@/components/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import TripsSkeleton from "@/components/layout/TripsSkeleton";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function MyTrips() {
  const router = useRouter();
  const { user } = useAuth();
  const { data: trips, error, isLoading, } = useQuery({
    queryKey: ["my-trips"],
    queryFn: async () => {
      const res = await apiRequest('GET', '/api/my-trips');
      if (!res.ok) {
        const text = (await res.text()) || res.statusText;
        throw new Error(`${res.status}: ${text}`);
      }
      return await res.json();
    },
    staleTime: 1000 * 60 * 5,
  });

  useEffect(()=>{
    if (error) {
      console.log(error)
      toast.error(error.message);
    if (error?.message.includes('User')) {
        router.push('/auth')
      }
    }
  }, [error])

  return (
    <>
      <Toaster/>
      <Header user={user}/>
      <div className="min-h-[80vh]">
        {isLoading ? <TripsSkeleton/> : trips?.trips?.length > 0 ? <MyTrip trips={trips.trips}/> : 
        <div className="flex justify-center items-center h-[80vh]">
          <h1 className="text-3xl">{error?.message || 'No trip found!'}</h1>
        </div>}
      </div>
      <Footer/>
    </>
  );
}
