import { Skeleton } from "@/components/ui/skeleton";
import TripDetailsComponent from "@/components/layout/TripDetailsComponent";
import React, { useState } from "react";
import { Button } from "@mui/material";
import { ArrowRightIcon, Trash2 } from "lucide-react";
import { apiRequest } from "../hooks/use-auth";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { getQueryClient } from "@/controllers/utils/getQueryClient";

export default function MyTrips({trips}:any) {
  const [clickedCard, setClickedCard] = useState(null)
  const mytrips = [
    {
      destination: "Islamabad",
      overview:
        "Islamabad, Pakistan's serene capital, offers a perfect blend of luxury, natural beauty, and culinary excellence...",
      matchPercentage: 95,
      tripDuration: 5,
      travelStyle: "luxury",
      approximateTotalCost: 20580000,
      bestTimeToVisit: "March to May (spring) or September to November (autumn)",
      avgDailyCost: "PKR 4,116,000",
      language: "Urdu, English",
      currency: "PKR",
      destinationImageKeyword: "Islamabad title:(Faisal Mosque)",
      tags: [
        "luxury travel",
        "Pakistani cuisine",
        "Margalla Hills",
        "cultural heritage",
        "nature retreat"
      ],
      accommodations: [
        {
          name: "Islamabad Serena Hotel",
          type: "5-Star Luxury",
          priceRange: "PKR 500,000–700,000/night",
          description:
            "Opulent rooms with handcrafted furniture, a world-class spa, and award-winning dining..."
        }
      ],
      dining: [
        {
          name: "Monal Restaurant",
          cuisine: "Pakistani/Continental",
          priceRange: "PKR 15,000–25,000/meal",
          description: "Iconic hilltop venue with live grill stations..."
        }
      ],
      budget: {
        accommodation: 2500000,
        food: 3000000,
        activities: 10000000,
        transportation: 2000000,
        shopping: 3000000,
        total: 20580000,
        perDay: 4116000
      },
      travelTips: [
        "Arrange VIP airport assistance for expedited immigration",
        "Hire a private security detail for remote hikes"
      ]
    }
  ];
  const formatCost = (costStr: string): string => {
    const numeric = parseFloat(costStr.replace(/[^\d]/g, ''));
    if (isNaN(numeric)) return "Invalid amount";
    
    return (numeric / 100).toLocaleString('en-US');
  };

  const queryClient = getQueryClient();

  const tripMutation = useMutation({
    mutationFn: async (_id: string) => {
      const res = await apiRequest("DELETE", "api/my-trips", _id);
      return await res.json();
    },
    onSuccess: (trips) => {
      queryClient.setQueryData(["my-trips"], trips);
      toast.success(`Deletion successful!`);
    },
    onError: (error: Error) => {
      console.log(error);
      toast.error(`Deletion failed!`);
    },
  });

  return (
    !clickedCard ? <div className="flex flex-wrap min-h-[70vh]">
      {trips?.map((trip:any, key:any) => (
        <div
          key={key}
          className="max-w-md mx-6 my-7 h-[33rem] bg-white rounded-xl shadow-md overflow-hidden hover:scale-[102%] transition duration-250"
        >
          <div className="relative h-40">
            <img
              src={trip.recommendation[0].destinationImageKeyword}
              alt={trip.recommendation[0].destination}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="p-4">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold mb-2">{trip.recommendation[0].destination}</h2>
          <Button size="small" sx={{textTransform:"none"}} onClick={()=>setClickedCard(trip.recommendation[0])}>Expand <ArrowRightIcon size={20}/></Button>
            </div>
            <p className="text-gray-700 mb-4 line-clamp-2">{trip.recommendation[0].overview}</p>

            <div className="mb-4">
              <span className="text-gray-500 text-sm">Tags:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {trip.recommendation[0].tags?.map((tag:any, index:any) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-2 flex">
              <span className="text-gray-500 text-sm min-w-20">Best Time:</span>{" "}
              <span className="text-black font-semibold line-clamp-1">
                {trip.recommendation[0].bestTimeToVisit}
              </span>
            </div>

            <div className="mb-2">
              <span className="text-gray-500 text-sm">Avg Daily Cost:</span>{" "}
              <span className="text-black font-semibold">
                PKR {formatCost(trip.recommendation[0].avgDailyCost)}
              </span>
            </div>

            <div className="mb-4">
              <span className="text-gray-500 text-sm">Currency:</span>{" "}
              <span className="text-black font-semibold">{trip.recommendation[0].currency}</span>
            </div>

            <div className="text-gray-400 text-sm flex justify-between items-center gap-1">
              <span>🕒 Saved {new Date().toLocaleDateString()}</span>
              <Button onClick={()=>tripMutation.mutate(trip._id)}>
                <Trash2 color="#FF0000" size={18}/>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>:
      <TripDetailsComponent recommendation={clickedCard}/>
  );
}
