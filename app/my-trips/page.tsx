'use client'
import { useEffect, useState } from "react";
import MyTrip from '@/components/layout/MyTrips'
import { Card, Select, Button, MenuItem } from "@mui/material";
import {Header} from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { apiRequest } from "@/components/hooks/use-auth";

interface Trip {
  _id: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: "booked" | "completed" | "upcoming";
  type: string;
}

export default function MyTrips() {
  // const [trips, setTrips] = useState<Trip[]>([]);
  const [trips, setTrips] = useState([]);
  const [filter, setFilter] = useState("all");
  console.log(trips)

  useEffect(() => {
    (async function fetchTrips() {
      const res = await apiRequest('GET', '/api/my-trips');
      const result = await res.json();
      setTrips(result.trips);
    })();
  }, []);

  // const filteredTrips = trips.filter(trip => 
  //   filter === "all" || trip.type === filter
  // );

  return (
    <div>
      <Header/>
      <MyTrip trips={trips}/>
      <Footer/>
    </div>
  );
}
