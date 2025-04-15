import mongoose from "mongoose";

const TripSchema = new mongoose.Schema({
  preferences: [{
    destination: String,
    duration: Number,
    travelStyles: Array,
    interests: Array,
    budget: Number,
    additionalInfo: {type: String, required: false},
  }],
  recommendations: [{
    destination: String,
    overview: String,
    matchPercentage: Number,
    bestTimeToVisit: String,
    avgDailyCost: String,
    language: String,
    currency: String,
    destinationImageUrl: String,
    tags: Array,
    itinerary: [{
      day: Number,
      title: String,
      activities: [{
        time: String,
        title: String,
        description: String,
        imageUrl: String
      }],
    }],
    accommodations: [{
      name: String,
      type: String,
      priceRange: String,
      description: String,
      imageUrl: String
    }],
    dining: [{
      name: String,
      cuisine: String,
      priceRange: String,
      description: String,
      imageUrl: String
    }],
    budget: {
      accommodation: Number,
      food: Number,
      activities: Number,
      transportation: Number,
      shopping: Number,
      total: Number,
      perDay: Number,
    },
    travelTips: Array,
    weather: {
      days: [{
          day: String,
          condition: String,
          temperature: String,
        }],
      },
    }]
  }
)

const Trip = mongoose.model("Trip", TripSchema);

export default Trip;