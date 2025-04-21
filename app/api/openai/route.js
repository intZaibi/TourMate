import generateTravelRecommendation from "@/controllers/openAi";
import { NextResponse } from "next/server";
// import OpenAI from "openai";

// const openai = new OpenAI({
//   baseURL: "https://openrouter.ai/api/v1",
//   apiKey: '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'
// });

// async function generateTravelRecommendation(preferences) {
  const prompt = `
    Generate a comprehensive travel recommendation based on the following user preferences:
    
    Destination: Dera Ismail Khan
    Trip Duration: 5 days
    Budget: PKR 10000 
    
    Create a detailed travel plan with the following information:
    1. A brief overview of the destination and why it matches the user's preferences
    2. A day-by-day itinerary with activities and attractions: - Include suggestions for historical landmarks, local food experiences, cultural events, religious sites, outdoor activities, shopping, and entertainment.
    3. A budget breakdown estimating costs for accommodations, food, activities, local transportation, and shopping
    4. Recommended accommodations based on the travel style
    5. Dining options that match the user's interests
    6. Practical travel tips
    7. Weather forecast (fictional but realistic for the destination)
    8. Tags that describe the destination
    Note: An common.wikimedia.org api will be used for images so suggest a precise keyword for image from common.wikimedia.org to search the particular image e.g: "Islamabad title:(Faisal Mosque)".
    
    Return the information in a structured JSON format with the following structure:
    {
      "destination": string,
      "overview": string,
      "matchPercentage": number (between 80-98),
      "bestTimeToVisit": string,
      "avgDailyCost": string,
      "language": string,
      "currency": string,
      "destinationImageKeyword": string (a precise keyword for image of the destination),
      "tags": string[],
      "itinerary": [
        {
          "day": number,
          "title": string,
          "activities": [
            {
              "time": string (e.g., "09:00"),
              "title": string,
              "description": string
              "imageKeyword": string (optional, a precise keyword for image of the activity)
            }
          ]
        }
      ],
      "accommodations": [
        {
          "name": string,
          "type": string,
          "priceRange": string,
          "description": string
          "imageKeyword": string (optional, a precise keyword for image of the accommodation)
        }
      ],
      "dining": [
        {
          "name": string,
          "cuisine": string,
          "priceRange": string,
          "description": string
          "imageKeyword": string (optional, a precise keyword for image of the restaurant or food)
        }
      ],
      "budget": {
        "accommodation": number,
        "food": number,
        "activities": number,
        "transportation": number,
        "shopping": number,
        "total": number,
        "perDay": number
      },
      "travelTips": string[],
      "weather": {
        "days": [
          {
            "day": string (e.g., "Mon"),
            "condition": string (e.g., "sunny", "cloudy", "rainy"),
            "temperature": string (e.g., "25°C")
          }
        ]
      }
    }
  `;
  
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

export async function POST(req) {
  const {preferences} = await req.json();
  try {
    const result = await generateTravelRecommendation(preferences);
    return NextResponse.json({result}, {status: 200})
  } catch (error) {
    console.log(error);
    return NextResponse.json({error}, {status: 502});
  }
}
