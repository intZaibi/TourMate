export interface TravelPreference {
  destination: string;
  duration: number;
  travelStyles: string[];
  interests: string[];
  budget: number;
  additionalInfo?: string;
}

export interface TravelRecommendation {
  destination: string;
  overview: string;
  matchPercentage: number;
  bestTimeToVisit: string;
  avgDailyCost: string;
  language: string;
  currency: string;
  destinationImageUrl: string;
  tags: string[];
  itinerary: {
    day: number;
    title: string;
    activities: {
      time: string;
      title: string;
      description: string;
      imageUrl: string
    }[];
  }[];
  accommodations: {
    name: string;
    type: string;
    priceRange: string;
    description: string;
    imageUrl: string
  }[];
  dining: {
    name: string;
    cuisine: string;
    priceRange: string;
    description: string;
    imageUrl: string
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