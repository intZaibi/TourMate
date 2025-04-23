import generateTravelRecommendation from "@/controllers/openAi";
import { NextResponse } from "next/server";
// import OpenAI from "openai";

// const openai = new OpenAI({
//   baseURL: "https://openrouter.ai/api/v1",
//   apiKey: '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'
// });

// async function generateTravelRecommendation(preferences) {
//   const prompt = `
//     Generate a comprehensive travel recommendation based on the following user preferences:
    
//     Destination: Dera Ismail Khan
//     Trip Duration: 5 days
//     Budget: PKR 10000 
    
//     Create a detailed travel plan with the following information:
//     1. A brief overview of the destination and why it matches the user's preferences
//     2. A day-by-day itinerary with activities and attractions: - Include suggestions for historical landmarks, local food experiences, cultural events, religious sites, outdoor activities, shopping, and entertainment.
//     3. A budget breakdown estimating costs for accommodations, food, activities, local transportation, and shopping
//     4. Recommended accommodations based on the travel style
//     5. Dining options that match the user's interests
//     6. Practical travel tips
//     7. Weather forecast (fictional but realistic for the destination)
//     8. Tags that describe the destination
//     Note: An common.wikimedia.org api will be used for images so suggest a precise keyword for image from common.wikimedia.org to search the particular image e.g: "Islamabad title:(Faisal Mosque)".
    
//     Return the information in a structured JSON format with the following structure:
//     {
//       "destination": string,
//       "overview": string,
//       "matchPercentage": number (between 80-98),
//       "bestTimeToVisit": string,
//       "avgDailyCost": string,
//       "language": string,
//       "currency": string,
//       "destinationImageKeyword": string (a precise keyword for image of the destination),
//       "tags": string[],
//       "itinerary": [
//         {
//           "day": number,
//           "title": string,
//           "activities": [
//             {
//               "time": string (e.g., "09:00"),
//               "title": string,
//               "description": string
//               "imageKeyword": string (optional, a precise keyword for image of the activity)
//             }
//           ]
//         }
//       ],
//       "accommodations": [
//         {
//           "name": string,
//           "type": string,
//           "priceRange": string,
//           "description": string
//           "imageKeyword": string (optional, a precise keyword for image of the accommodation)
//         }
//       ],
//       "dining": [
//         {
//           "name": string,
//           "cuisine": string,
//           "priceRange": string,
//           "description": string
//           "imageKeyword": string (optional, a precise keyword for image of the restaurant or food)
//         }
//       ],
//       "budget": {
//         "accommodation": number,
//         "food": number,
//         "activities": number,
//         "transportation": number,
//         "shopping": number,
//         "total": number,
//         "perDay": number
//       },
//       "travelTips": string[],
//       "weather": {
//         "days": [
//           {
//             "day": string (e.g., "Mon"),
//             "condition": string (e.g., "sunny", "cloudy", "rainy"),
//             "temperature": string (e.g., "25°C")
//           }
//         ]
//       }
//     }
//   `;
  
//   console.log('sending api...');

//   try {
//     const response = await openai.chat.completions.create({
//       model: "deepseek/deepseek-r1:free",
//       messages: [
//         {
//           role: "system",
//           content:
//             "You are a travel expert AI that creates personalized travel recommendations based on user preferences. Your recommendations should be detailed, realistic, and tailored to the user's interests and budget.",
//         },
//         {
//           role: "user",
//           content: prompt,
//         },
//       ],
//       response_format: { type: "json_object" },
//     });

//     if (response.choices[0].message.content.includes("```")) {
//       const arr = response.choices[0].message.content.split('```')[1].split('json')[1]
//       const result = await JSON.parse(arr);
//       console.log('result:', result )
//       return result;
//     }
    
//   } catch (error) {
//     console.error("OpenAI API error:", error);
//     throw new Error("Failed to generate travel recommendation");
//   }
// }

// generateTravelRecommendation();

// const recommendation = {
//   "data": {
//     "destination": "Islamabad",
//     "overview": "Islamabad, Pakistan's serene capital, perfectly blends adventure, culture, and nature. With lush Margalla Hills for hiking, vibrant food scenes, and UNESCO sites like Taxila, it caters to solo travelers seeking authentic experiences. Public transportation and budget-friendly local eateries align with your preferences.",
//     "matchPercentage": 95,
//     "bestTimeToVisit": "October to April",
//     "avgDailyCost": "$250-$350",
//     "language": "Urdu, English",
//     "currency": "PKR (Pakistani Rupee)",
//     "destinationImageKeyword": "https://upload.wikimedia.org/wikipedia/commons/5/52/Faisal_Mosque_in_Islamabad.jpg",
//     "tags": [
//       "Adventure",
//       "Cultural",
//       "Solo Travel",
//       "Nature",
//       "Foodie"
//     ],
//     "itinerary": [
//       {
//         "day": 1,
//         "title": "Arrival & Cultural Immersion",
//         "activities": [
//           {
//             "time": "14:00",
//             "title": "Check-in at Hotel",
//             "description": "Settle into a boutique hotel in the heart of Islamabad."
//           },
//           {
//             "time": "16:00",
//             "title": "Faisal Mosque Visit",
//             "description": "Explore the iconic marble mosque, the largest in South Asia.",
//             "imageKeyword": "https://upload.wikimedia.org/wikipedia/commons/5/52/Faisal_Mosque_in_Islamabad.jpg"
//           },
//           {
//             "time": "19:00",
//             "title": "Dinner at Monal Restaurant",
//             "description": "Enjoy traditional Pakistani cuisine with panoramic city views.",
//             "imageKeyword": "https://upload.wikimedia.org/wikipedia/commons/f/ff/View_of_Islamabad_at_night._Monal.jpg"
//           }
//         ]
//       },
//       {
//         "day": 2,
//         "title": "Nature & History",
//         "activities": [
//           {
//             "time": "08:00",
//             "title": "Hike Trail 3, Margalla Hills",
//             "description": "Moderate hike with scenic vistas and wildlife spotting.",
//             "imageKeyword": "https://upload.wikimedia.org/wikipedia/commons/2/2f/Margalla_Hills_Islamabad_06.jpg"
//           },
//           {
//             "time": "13:00",
//             "title": "Lok Virsa Museum",
//             "description": "Discover Pakistan’s cultural heritage through artifacts and crafts.",
//             "imageKeyword": "https://upload.wikimedia.org/wikipedia/commons/6/69/Islamabad_Lok_Virsa_Museum_exterior_01.jpg"
//           },
//           {
//             "time": "18:00",
//             "title": "Street Food at Melody Market",
//             "description": "Savor chaat, samosas, and sugarcane juice."
//           }
//         ]
//       },
//       {
//         "day": 3,
//         "title": "Day Trip to Taxila",
//         "activities": [
//           {
//             "time": "09:00",
//             "title": "Taxila Museum & Ruins",
//             "description": "Explore ancient Gandhara civilization artifacts.",
//             "imageKeyword": "https://upload.wikimedia.org/wikipedia/commons/0/08/Taxila_Ruins_Map.jpg"
//           },
//           {
//             "time": "15:00",
//             "title": "Julian Village Visit",
//             "description": "Interact with local artisans and buy handmade pottery."
//           }
//         ]
//       },
//       {
//         "day": 4,
//         "title": "Rawalpindi Heritage",
//         "activities": [
//           {
//             "time": "10:00",
//             "title": "Raja Bazaar Exploration",
//             "description": "Wander through bustling markets for spices and textiles."
//           },
//           {
//             "time": "14:00",
//             "title": "Army Museum Visit",
//             "description": "Learn about Pakistan’s military history."
//           }
//         ]
//       },
//       {
//         "day": 5,
//         "title": "Adventure in Margalla Hills",
//         "activities": [
//           {
//             "time": "07:00",
//             "title": "Rock Climbing at Daman-e-Koh",
//             "description": "Guided session for beginners and intermediates.",
//             "imageKeyword": "https://upload.wikimedia.org/wikipedia/commons/8/83/View_of_the_7th_Avenue_from_Dam-e-Koh%2C_Islamabad.jpg"
//           },
//           {
//             "time": "16:00",
//             "title": "Bird Watching at Rawal Lake",
//             "description": "Spot migratory birds in a tranquil setting."
//           }
//         ]
//       },
//       {
//         "day": 6,
//         "title": "Culinary Day",
//         "activities": [
//           {
//             "time": "10:00",
//             "title": "Cooking Class",
//             "description": "Learn to make biryani and kebabs with a local chef."
//           },
//           {
//             "time": "19:00",
//             "title": "Fine Dining at Savour Foods",
//             "description": "Indulge in gourmet Pakistani dishes."
//           }
//         ]
//       },
//       {
//         "day": 7,
//         "title": "Northern Escape: Murree",
//         "activities": [
//           {
//             "time": "08:00",
//             "title": "Scenic Drive to Murree",
//             "description": "2-hour journey through pine forests.",
//             "imageKeyword": "https://upload.wikimedia.org/wikipedia/commons/c/c0/Murree_Hills_%28Bhurban%2C_Pakistan%29.jpg"
//           },
//           {
//             "time": "12:00",
//             "title": "Hike to Pindi Point",
//             "description": "Panoramic views of the Himalayas."
//           }
//         ]
//       },
//       {
//         "day": 8,
//         "title": "Nathia Gali Exploration",
//         "activities": [
//           {
//             "time": "09:00",
//             "title": "Mushkpuri Peak Trek",
//             "description": "Challenging hike with rewarding mountain vistas."
//           },
//           {
//             "time": "15:00",
//             "title": "Relax at Dungagali",
//             "description": "Picnic in a serene meadow."
//           }
//         ]
//       },
//       {
//         "day": 9,
//         "title": "Relaxation & Shopping",
//         "activities": [
//           {
//             "time": "11:00",
//             "title": "Visit Centaurus Mall",
//             "description": "Shop for local handicrafts and designer wear."
//           },
//           {
//             "time": "16:00",
//             "title": "Spa Session",
//             "description": "Traditional Pakistani massage for relaxation."
//           }
//         ]
//       },
//       {
//         "day": 10,
//         "title": "Departure",
//         "activities": [
//           {
//             "time": "10:00",
//             "title": "Last-minute Souvenir Shopping",
//             "description": "Buy dried fruits and spices from Jinnah Super Market."
//           }
//         ]
//       }
//     ],
//     "accommodations": [
//       {
//         "name": "The Envoy Hotel",
//         "type": "Boutique Hotel",
//         "priceRange": "$80-$120/night",
//         "description": "Charming stay with modern amenities and rooftop views.",
//         "imageKeyword": ""
//       },
//       {
//         "name": "Roomy Guesthouse",
//         "type": "Budget Guesthouse",
//         "priceRange": "$30-$50/night",
//         "description": "Cozy, social atmosphere ideal for solo travelers."
//       }
//     ],
//     "dining": [
//       {
//         "name": "Monal Restaurant",
//         "cuisine": "Pakistani/BBQ",
//         "priceRange": "$15-$25",
//         "description": "Famous for its karahi and view of the city.",
//         "imageKeyword": "https://upload.wikimedia.org/wikipedia/commons/1/18/BBQ_Platter.jpg"
//       },
//       {
//         "name": "Kabul Restaurant",
//         "cuisine": "Afghani",
//         "priceRange": "$8-$12",
//         "description": "Authentic Afghani kebabs and pulao."
//       }
//     ],
//     "budget": {
//       "accommodation": 1000,
//       "food": 500,
//       "activities": 400,
//       "transportation": 200,
//       "shopping": 300,
//       "total": 2400,
//       "perDay": 240
//     },
//     "travelTips": [
//       "Use ride-hailing apps like Careem for affordable transport.",
//       "Dress modestly to respect local customs.",
//       "Carry cash for markets and small eateries."
//     ],
//     "weather": {
//       "days": [
//         {
//           "day": "Mon",
//           "condition": "sunny",
//           "temperature": "24°C"
//         },
//         {
//           "day": "Tue",
//           "condition": "partly cloudy",
//           "temperature": "22°C"
//         },
//         {
//           "day": "Wed",
//           "condition": "sunny",
//           "temperature": "25°C"
//         }
//       ]
//     }
//   }
// }


export async function POST(req) {
  const {preferences} = await req.json();
  try {
    const data = await generateTravelRecommendation(preferences);
    const extractedKeywords = extractImageKeywords(data);
    console.log('sending images request...')
    const images = await getImages(extractedKeywords);
    const result = insertImageKeywords(data, images);
    return NextResponse.json({result}, {status: 200})
  } catch (error) {
    console.log(error);
    return NextResponse.json({error}, {status: 502});
  }
}

function extractImageKeywords(data) {
  const keywords = {
    destinationImageKeyword: data.destinationImageKeyword || null,
    itinerary: [],
    accommodations: [],
    dining: [],
  };

  // Extract from itinerary
  if (data.itinerary) {
    data.itinerary.forEach((day, dayIndex) => {
      if (day.activities) {
        day.activities.forEach((activity, activityIndex) => {
          if (activity.imageKeyword) {
            keywords.itinerary.push({
              day: dayIndex,
              activity: activityIndex,
              imageKeyword: activity.imageKeyword,
            });
          }
        });
      }
    });
  }

  // Extract from accommodations
  if (data.accommodations) {
    data.accommodations.forEach((acc, index) => {
      if (acc.imageKeyword) {
        keywords.accommodations.push({
          index,
          imageKeyword: acc.imageKeyword,
        });
      }
    });
  }

  // Extract from dining
  if (data.dining) {
    data.dining.forEach((restaurant, index) => {
      if (restaurant.imageKeyword) {
        keywords.dining.push({
          index,
          imageKeyword: restaurant.imageKeyword,
        });
      }
    });
  }

  return keywords;
}

async function getImages(images) {
  async function fetchImage(keyword) {
    try {
      const response = await fetch(
        `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=filetype:bitmap ${keyword}&gsrnamespace=6&prop=imageinfo&iiprop=url|user|extmetadata&format=json&origin=*`
      );
      const data = await response.json();
      if (data.query && data.query.pages) {
        for (let page of Object.values(data.query.pages)) {
          const imageInfo = page.imageinfo?.[0];
          const url = imageInfo?.url;
          if (url && (url.endsWith('.jpg') || url.endsWith('.png'))) {
            return url;
          }
        }
      }

      return null;
    } catch (error) {
      console.error("Fetch error for keyword:", keyword, error);
      return null;
    }
  }

  // Replace image keyword or set empty string if no image found
  async function processAndReplace(entry, key = 'imageKeyword') {
    if (entry[key]) {
      const url = await fetchImage(entry[key]);
      entry[key] = url || "";
    }
  }

  // Process destination
  if (images.destinationImageKeyword) {
    const url = await fetchImage(images.destinationImageKeyword);
    images.destinationImageKeyword = url || "";
  }

  // Process itinerary
  for (const item of images.itinerary) {
    await processAndReplace(item);
  }

  // Process accommodations
  for (const acc of images.accommodations) {
    await processAndReplace(acc);
  }

  // Process dining
  for (const dine of images.dining) {
    await processAndReplace(dine);
  }

  return images;
}

function insertImageKeywords(data, keywords) {
  // Insert destinationImageKeyword
  if (keywords.destinationImageKeyword) {
    data.destinationImageKeyword = keywords.destinationImageKeyword;
  }

  // Insert into itinerary
  keywords.itinerary.forEach(({ day, activity, imageKeyword }) => {
    if (data.itinerary[day] && data.itinerary[day].activities[activity]) {
      data.itinerary[day].activities[activity].imageKeyword = imageKeyword;
    }
  });

  // Insert into accommodations
  keywords.accommodations.forEach(({ index, imageKeyword }) => {
    if (data.accommodations[index]) {
      data.accommodations[index].imageKeyword = imageKeyword;
    }
  });

  // Insert into dining
  keywords.dining.forEach(({ index, imageKeyword }) => {
    if (data.dining[index]) {
      data.dining[index].imageKeyword = imageKeyword;
    }
  });

  return data;
}

