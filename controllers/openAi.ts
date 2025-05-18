import { TravelPreference, TravelRecommendation } from "@/interfaces/OpenaiSchemas";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://models.github.ai/inference",
  apiKey: process.env.GITHUB_KEY
});
export default async function generateTravelRecommendation(preferences: TravelPreference): Promise<TravelRecommendation> {
  const prompt = `
    Generate a comprehensive travel recommendation based on the following user preferences:
    
    Destination: ${preferences.destination}
    Trip Duration: ${preferences.duration} days
    Travel Styles: ${preferences.travelStyles.join(", ")}
    Interests: ${preferences.interests.join(", ")}
    Budget: PKR${preferences.budget}
    Additional Information: ${preferences.additionalInfo || "null"}
    
    Create a detailed travel plan with the following information:
    1. A brief overview of the destination and why it matches the user's preferences
    2. A day-by-day itinerary with activities and attractions
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
      "ratings": number (between 1-5),
      "overview": string,
      "matchPercentage": number (between 80-98),
      "tripDuration": number (same as provided),
      "travelStyle": string,
      "approximateTotalCost": number (in PKR),
      "bestTimeToVisit": string,
      "avgDailyCost": string (in PKR),
      "language": string,
      "currency": string,
      "destinationImageKeyword": string (a precise keyword for image from common.wikimedia.org for the destination),
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
              "imageKeyword": string (optional, a precise keyword for image from common.wikimedia.org for the activity)
            }
          ]
        }
      ],
      "accommodations": [
        {
          "name": string,
          "type": string,
          "priceRange": string (in PKR),
          "description": string
          "imageKeyword": string (optional, a precise keyword for image from common.wikimedia.org for the accommodation)
        }
      ],
      "dining": [
        {
          "name": string,
          "cuisine": string,
          "priceRange": string (in PKR),
          "description": string
          "imageKeyword": string (optional, a precise keyword for image from common.wikimedia.org for the restaurant or food)
        }
      ],
      "budget" (in PKR): {
        "accommodation": number (in PKR),
        "food": number (in PKR),
        "activities": number (in PKR),
        "transportation": number (in PKR),
        "shopping": number (in PKR),
        "total": number (in PKR),
        "perDay": number (in PKR)
      },
      "reviews": [
        {
          "name": string (destination specific names only),
          "reviewerName": string,
          "rating": number (between 1-5),
          "comment": string,
        }
      ],
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
  
  console.log('sending api...');

  try {
    const response = await openai.chat.completions.create({
      // model: "deepseek/deepseek-r1:free",
      model: "openai/gpt-4.1",
      messages: [
        {
          role: "system",
          content:
            "You are a travel expert AI that creates personalized travel recommendations based on user preferences. Your recommendations should be detailed, realistic, and tailored to the user's interests and budget.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: { type: "json_object" },
    });
    console.log('resp:',response.choices[0].message.content)
    if (typeof response.choices[0].message.content === "string") {  // checking if AI has sent a response or not
      
      if (response.choices[0].message.content) {
        const result = await JSON.parse(response.choices[0].message.content);
        return result;
      } else {  // if unexpected response
        console.log(response.choices[0].message.content)
        throw new Error('Unexpected response form AI!!!');
      }
      
    } else { // if couldn't get any response form AI
      throw response.choices[0].message
    }
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to generate travel recommendation");
  }
}