'use client'
import { useEffect, useState } from "react";
import MyTrip from '@/components/layout/MyTrips'
import { Card, Select, Button, MenuItem } from "@mui/material";
import {Header} from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface Trip {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: "booked" | "completed" | "upcoming";
  type: string;
}

export default function MyTrips() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // TODO: Fetch trips from API
  }, []);

  const filteredTrips = trips.filter(trip => 
    filter === "all" || trip.type === filter
  );

  return (
    <div>
      <Header/>
      <MyTrip/>
      <Footer/>
    </div>
  );
}
