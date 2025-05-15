import generateTravelRecommendation from "@/controllers/openAi";
import { NextResponse } from "next/server";


export async function POST(req) {
  const {preferences} = await req.json();
  try {
    const data = await generateTravelRecommendation(preferences);
    const extractedKeywords = extractImageKeywords(data);
    console.log('sending images request...', data)
    console.log(extractedKeywords)
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
        `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=filetype:bitmap ${keyword}&gsrnamespace=6&prop=imageinfo&iiprop=url|user|extmetadata&format=json`
      );
      const data = await response.json();
      console.log('image data', data);
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

