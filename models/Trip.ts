import mongoose from "mongoose";
mongoose.connect(process.env.DB_URL || 'mongodb://127.0.0.1:27017/test');

const TripSchema = new mongoose.Schema({
  recommendation: [{
    destination: String,
    overview: String,
    matchPercentage: Number,
    tripDuration: Number,
    travelStyle: String,
    approximateTotalCost: Number,
    bestTimeToVisit: String,
    avgDailyCost: String,
    language: String,
    currency: String,
    destinationImageKeyword: String,
    tags: [String],
    itinerary: [{
      day: Number,
      title: String,
      activities: [{
        time: String,
        title: String,
        description: String,
        imageKeyword: String
      }],
    }],
    accommodations: [{type: mongoose.Schema.Types.Mixed}],
    // accommodations: [{
    //   name: String,
    //   type: String,
    //   priceRange: String,
    //   description: String,
    //   imageKeyword: String
    // }],
    dining: [{
      name: String,
      cuisine: String,
      priceRange: String,
      description: String,
      imageKeyword: String
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
    travelTips: [String],
    weather: {
      days: [{
          day: String,
          condition: String,
          temperature: String,
        }],
      },
    }],
  userId: String
  }
)

const Trip = mongoose.models.Trip || mongoose.model("Trip", TripSchema);

export default Trip;
