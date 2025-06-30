import { string, z } from "zod";


export const TravelPreferenceValidationSchema = z.object({
  destination: z.string().refine(value => /^[a-zA-Z\s]*$/.test(value), {
    message: "Destination should not include numbers or special characters."
  }),
  duration: z.number(),
  travelStyles: z.array(z.string()).min(1, {
    message: "Choose at least one travel style."
  }),
  interests: z.array(z.string()).min(1, {
    message: "Choose at least one interest field."
  }),
  budget: z.number(),
  additionalInfo: z.string().optional()
})
export type TravelPreference = z.infer<typeof TravelPreferenceValidationSchema>

export interface TravelRecommendation {
  destination: string;
  overview: string;
  matchPercentage: number;
  tripDuration: number,
  travelStyle: string,
  approximateTotalCost: number,
  bestTimeToVisit: string;
  avgDailyCost: string;
  language: string;
  currency: string;
  destinationImageKeyword: string;
  tags: string[];
  itinerary: {
    day: number;
    title: string;
    activities: {
      time: string;
      title: string;
      description: string;
      imageKeyword: string
    }[];
  }[];
  accommodations: {
    name: string;
    type: string;
    priceRange: string;
    description: string;
    imageKeyword: string
  }[];
  dining: {
    name: string;
    cuisine: string;
    priceRange: string;
    description: string;
    imageKeyword: string
  }[];
  budget: {
    accommodation: number;
    food: number;
    activities: number;
    transportation: number;
    shopping: number;
    total: number;
    perDay: number;
  };
  travelTips: string[];
  weather: {
    days: {
      day: string;
      condition: string;
      temperature: string;
    }[];
  };
}
