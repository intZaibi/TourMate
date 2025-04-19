'use client'
import { useEffect, useState } from "react";
import { Card, Select, Button, MenuItem } from "@mui/material";

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Trips</h1>
      
      <Select 
        value={filter}
        onChange={(e)=>setFilter(e.target.value)}
        className="mb-6"
      >
        <MenuItem value="all">All Trips</MenuItem>
        <MenuItem value="adventure">Adventure</MenuItem>
        <MenuItem value="relaxing">Relaxing</MenuItem>
        <MenuItem value="family">Family-friendly</MenuItem>
      </Select>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTrips.map(trip => (
          <Card key={trip.id} className="p-4">
            <h3 className="text-xl font-semibold">{trip.destination}</h3>
            <p className="text-gray-600">
              {new Date(trip.startDate).toLocaleDateString()} - 
              {new Date(trip.endDate).toLocaleDateString()}
            </p>
            <p className="capitalize text-sm font-medium mt-2">
              Status: {trip.status}
            </p>
            <Button className="mt-4">View Details</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
