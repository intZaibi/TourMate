'use client'
import { useAuth } from "@/components/hooks/use-auth";
import { Header } from "@/components/layout/Header";
import { RecommendationsFooter } from "@/components/layout/RecommendationsFooter";
import { PreferencesForm } from "@/components/layout/PreferencesForm";
import { TravelPreference, TravelRecommendation } from "@/interfaces/OpenaiSchemas";
import { useState } from "react";

const recommendation = {
  "destination": "Islamabad",
  "overview": "Islamabad, the capital city of Pakistan, offers a perfect blend of natural beauty, cultural experiences, and modern luxury. With its serene surroundings, lush greenery, and vibrant food scene, it caters perfectly to travelers seeking a blend of food, shopping, and nature in a luxurious setting. The city is known for its high-end shopping malls, picturesque spots, and gourmet dining options, making it an excellent choice for a luxurious escape.",
  "matchPercentage": 92,
  "bestTimeToVisit": "March to May, and September to November",
  "avgDailyCost": "PKR 12,000",
  "language": "Urdu, English",
  "currency": "PKR",
  "destinationImageUrl": "https://api.openverse.org/v1/images/165aefa6-a35e-4e05-ab9e-5e30b06ac791/thumb/",
  "tags": ["Luxury", "Nature", "Food", "Shopping", "Sightseeing", "Culture", "Urban Escape"],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival and Exploration of Modern Islamabad",
      "activities": [
        {
          "time": "10:00",
          "title": "Arrival at Islamabad International Airport",
          "description": "Arrive in Islamabad and transfer to your luxury hotel. Start your exploration of the city with a relaxed arrival day, focusing on acclimatizing.",
          "imageUrl": "https://api.openverse.org/v1/images/165aefa6-a35e-4e05-ab9e-5e30b06ac791/thumb/"
        },
        {
          "time": "12:00",
          "title": "Visit Daman-e-Koh",
          "description": "Head to Daman-e-Koh for a panoramic view of Islamabad, nestled in the Margalla Hills National Park. The vista is stunning and provides a great introduction to the city’s natural beauty.",
          "imageUrl": "https://api.openverse.org/v1/images/165aefa6-a35e-4e05-ab9e-5e30b06ac791/thumb/"
        },
        {
          "time": "14:00",
          "title": "Lunch at Monal Restaurant",
          "description": "Enjoy a gourmet lunch at Monal Restaurant, located on the Margalla Hills, offering stunning views and a wide variety of continental and traditional dishes.",
          "imageUrl": "https://api.openverse.org/v1/images/165aefa6-a35e-4e05-ab9e-5e30b06ac791/thumb/"
        },
        {
          "time": "16:00",
          "title": "Visit Pakistan Monument and Museum",
          "description": "Explore the iconic Pakistan Monument and its museum, a national symbol. The monument’s design represents the four provinces, and the museum provides a deep insight into the country’s history.",
          "imageUrl": "https://api.openverse.org/v1/images/165aefa6-a35e-4e05-ab9e-5e30b06ac791/thumb/"
        }
      ]
    },
    {
      "day": 2,
      "title": "Shopping and Foodie Day",
      "activities": [
        {
          "time": "10:00",
          "title": "Visit Centaurus Mall",
          "description": "Start your day with a visit to the Centaurus Mall, Islamabad’s premier shopping destination. Explore luxury stores, fashion boutiques, and high-end brands.",
          "imageUrl": "https://api.openverse.org/v1/images/165aefa6-a35e-4e05-ab9e-5e30b06ac791/thumb/"
        },
        {
          "time": "13:00",
          "title": "Lunch at The Royal Orchid",
          "description": "Indulge in an exquisite lunch at The Royal Orchid, known for its authentic Pakistani cuisine and lavish ambiance.",
          "imageUrl": "https://api.openverse.org/v1/images/165aefa6-a35e-4e05-ab9e-5e30b06ac791/thumb/"
        },
        {
          "time": "15:00",
          "title": "Visit Saidpur Village",
          "description": "Explore Saidpur Village, a charming cultural and heritage village nestled in the Margalla Hills. This spot combines traditional Pakistani village life with modern attractions.",
          "imageUrl": "https://api.openverse.org/v1/images/165aefa6-a35e-4e05-ab9e-5e30b06ac791/thumb/"
        },
        {
          "time": "17:00",
          "title": "Dinner at the Capital Grill",
          "description": "End your day with a fine dining experience at the Capital Grill, offering a luxurious ambiance and a variety of gourmet dishes.",
          "imageUrl": "https://api.openverse.org/v1/images/165aefa6-a35e-4e05-ab9e-5e30b06ac791/thumb/"
        }
      ]
    },
    {
      "day": 3,
      "title": "Natural Wonders and Outdoor Adventures",
      "activities": [
        {
          "time": "08:00",
          "title": "Hiking at Margalla Hills",
          "description": "Embark on a morning hike in the Margalla Hills National Park, a haven for nature lovers. The trek to the top rewards you with breathtaking views of Islamabad.",
          "imageUrl": "https://api.openverse.org/v1/images/165aefa6-a35e-4e05-ab9e-5e30b06ac791/thumb/"
        },
        {
          "time": "13:00",
          "title": "Lunch at Café 7",
          "description": "Enjoy a light lunch at Café 7, offering a cozy environment and an array of international dishes.",
          "imageUrl": "https://api.openverse.org/v1/images/165aefa6-a35e-4e05-ab9e-5e30b06ac791/thumb/"
        },
        {
          "time": "15:00",
          "title": "Visit Rawal Lake",
          "description": "Spend the afternoon at Rawal Lake, a tranquil spot perfect for a relaxing boat ride or a walk along the shore.",
          "imageUrl": "https://api.openverse.org/v1/images/165aefa6-a35e-4e05-ab9e-5e30b06ac791/thumb/"
        },
        {
          "time": "18:00",
          "title": "Sunset at Lake View Park",
          "description": "Catch a stunning sunset at Lake View Park, a family-friendly park with beautiful scenery and a peaceful atmosphere.",
          "imageUrl": "https://api.openverse.org/v1/images/165aefa6-a35e-4e05-ab9e-5e30b06ac791/thumb/"
        }
      ]
    },
    {
      "day": 4,
      "title": "Cultural Exploration and Shopping",
      "activities": [
        {
          "time": "10:00",
          "title": "Visit Lok Virsa Museum",
          "description": "Start your day with a cultural immersion at Lok Virsa Museum, where you can explore traditional arts, crafts, and heritage.",
          "imageUrl": "https://api.openverse.org/v1/images/165aefa6-a35e-4e05-ab9e-5e30b06ac791/thumb/"
        },
        {
          "time": "13:00",
          "title": "Lunch at Khoka Khola",
          "description": "Enjoy a casual yet flavorful lunch at Khoka Khola, a local favorite known for its fusion of traditional and contemporary Pakistani cuisine.",
          "imageUrl": "https://api.openverse.org/v1/images/165aefa6-a35e-4e05-ab9e-5e30b06ac791/thumb/"
        },
        {
          "time": "15:00",
          "title": "Shopping at Rawalpindi's Saddar Market",
          "description": "Explore the bustling Saddar Market in Rawalpindi for souvenirs, antiques, and local handicrafts. A great place for unique finds.",
          "imageUrl": "https://api.openverse.org/v1/images/165aefa6-a35e-4e05-ab9e-5e30b06ac791/thumb/"
        },
        {
          "time": "18:00",
          "title": "Dinner at Benares",
          "description": "Wrap up your day with a dinner at Benares, an upscale dining experience offering a blend of South Asian flavors and contemporary dishes.",
          "imageUrl": "https://api.openverse.org/v1/images/165aefa6-a35e-4e05-ab9e-5e30b06ac791/thumb/"
        }
      ]
    },
    {
      "day": 5,
      "title": "Relaxation and Departure",
      "activities": [
        {
          "time": "10:00",
          "title": "Relaxing Morning at Shakarparian Park",
          "description": "Spend a peaceful morning at Shakarparian Park, a beautifully landscaped park with panoramic views of the city.",
          "imageUrl": "https://api.openverse.org/v1/images/165aefa6-a35e-4e05-ab9e-5e30b06ac791/thumb/"
        },
        {
          "time": "12:00",
          "title": "Final Lunch at Tandoor Restaurant",
          "description": "Enjoy a farewell lunch at Tandoor Restaurant, offering a delicious array of local and international cuisine.",
          "imageUrl": "https://api.openverse.org/v1/images/165aefa6-a35e-4e05-ab9e-5e30b06ac791/thumb/"
        },
        {
          "time": "14:00",
          "title": "Departure",
          "description": "After a final relaxing moment, depart for the Islamabad International Airport for your onward journey.",
          "imageUrl": "https://api.openverse.org/v1/images/165aefa6-a35e-4e05-ab9e-5e30b06ac791/thumb/"
        }
      ]
    }
  ],
  "accommodations": [
    {
      "name": "Serena Hotel",
      "type": "Luxury Hotel",
      "priceRange": "PKR 15,000 - PKR 25,000 per night",
      "description": "Serena Hotel is Islamabad's top luxury hotel offering world-class amenities, top-notch service, and an opulent atmosphere. Located centrally, it is ideal for both relaxation and access to city attractions.",
      "imageUrl": "https://api.openverse.org/v1/images/165aefa6-a35e-4e05-ab9e-5e30b06ac791/thumb/"
    },
    {
      "name": "Islamabad Marriott Hotel",
      "type": "Luxury Hotel",
      "priceRange": "PKR 18,000 - PKR 30,000 per night",
      "description": "The Islamabad Marriott is another premier luxury hotel known for its excellent service, upscale dining, and central location. The rooms are elegant, and the property offers various luxury services.",
      "imageUrl": "https://api.openverse.org/v1/images/165aefa6-a35e-4e05-ab9e-5e30b06ac791/thumb/"
    }
  ],
  "dining": [
    {
      "name": "Monal Restaurant",
      "cuisine": "Pakistani, Continental",
      "priceRange": "PKR 1,500 - PKR 3,000 per person",
      "description": "Offering exceptional views of Islamabad, Monal specializes in both Pakistani and international dishes. It’s a top dining spot for gourmet meals with a panoramic setting.",
      "imageUrl": "https://api.openverse.org/v1/images/165aefa6-a35e-4e05-ab9e-5e30b06ac791/thumb/"
    },
    {
      "name": "The Royal Orchid",
      "cuisine": "Pakistani, Continental",
      "priceRange": "PKR 2,000 - PKR 4,000 per person",
      "description": "The Royal Orchid is an upscale restaurant offering a blend of fine dining with a vast menu of Pakistani and international cuisine. It's perfect for a luxurious meal in an elegant setting.",
      "imageUrl": "https://api.openverse.org/v1/images/165aefa6-a35e-4e05-ab9e-5e30b06ac791/thumb/"
    }
  ],
  "budget": {
    "accommodation": 100000,
    "food": 25000,
    "activities": 15000,
    "transportation": 5000,
    "shopping": 20000,
    "total": 200000,
    "perDay": 40000
  },
  "travelTips": [
    "Islamabad is a safe city, but always keep an eye on your belongings, especially in crowded areas.",
    "The city has a wide range of public transportation options, but taxis or ride-hailing apps like Careem are more convenient for tourists.",
    "Always carry a local SIM card or mobile data for easier navigation and communication.",
    "Dress modestly, especially when visiting religious and cultural sites."
  ],
  "weather": {
    "days": [
      {
        "day": "Mon",
        "condition": "sunny",
        "temperature": "27°C"
      },
      {
        "day": "Tue",
        "condition": "partly cloudy",
        "temperature": "23°C"
      },
      {
        "day": "Wed",
        "condition": "sunny",
        "temperature": "26°C"
      },
      {
        "day": "Thu",
        "condition": "cloudy",
        "temperature": "24°C"
      },
      {
        "day": "Fri",
        "condition": "rainy",
        "temperature": "22°C"
      }
    ]
  }
}

export default function Recommendations() {
  const [popularDestination, setPopularDestination] = useState('')
  const { user } = useAuth();
  return (
    <>
      <Header user={user}/>
      <PreferencesForm popularDestination={popularDestination}/> 
      <RecommendationsFooter setPopularDestination={setPopularDestination}/>
    </>
  )
} 