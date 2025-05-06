'use client'
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@mui/material";
import { Edit, PlusCircle, Save, Share2, MapPin, Bed, Utensils, Calculator, Info, MinusCircle } from "lucide-react";
import { apiRequest } from "../hooks/use-auth";
import toast, { Toaster } from "react-hot-toast";

interface RecommendationsSectionProps {
  recommendation: any | null;
}

export default function RecommendationsSection({ recommendation }: RecommendationsSectionProps) {
  const [expandedDays, setExpandedDays] = useState(1);

  if (!recommendation) {
    return null;
  }
  console.log(recommendation)
  return (
    <section id="recommendations" className="py-16 bg-white">
      <Toaster/>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Your Personalized Recommendations</h2>
            {recommendation && (
              <p className="text-center text-neutral-500 mb-12 max-w-2xl mx-auto">
                Based on your preferences, we've created a custom travel plan for {recommendation.destination}
              </p>
            )}
            
            {/* Results State */}
            {recommendation && (
              <>
                {/* Destination Overview */}
                <div className="bg-neutral-100 rounded-xl p-6 mb-12">
                  <div className="md:flex items-start">
                    <div className="md:w-1/3 mb-6 md:mb-0 md:pr-6">
                      <div className="rounded-lg w-full h-60 bg-gray-200 overflow-hidden relative">
                        {recommendation.destinationImageKeyword ? (
                          <img 
                            src={recommendation.destinationImageKeyword} 
                            alt={recommendation.destination}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                            <MapPin className="h-20 w-20 opacity-30" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <div className="flex items-center mb-4">
                        <h3 className="text-2xl font-bold mr-3">{recommendation.destination}</h3>
                        <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                          {recommendation.matchPercentage}% Match
                        </span>
                      </div>
                      <p className="text-neutral-600 mb-4">{recommendation.overview}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white p-3 rounded-md shadow-sm">
                          <div className="text-neutral-500 text-sm mb-1">Best Time to Visit</div>
                          <div className="font-medium">{recommendation.bestTimeToVisit}</div>
                        </div>
                        <div className="bg-white p-3 rounded-md shadow-sm">
                          <div className="text-neutral-500 text-sm mb-1">Avg. Daily Cost</div>
                          <div className="font-medium">{recommendation.avgDailyCost}</div>
                        </div>
                        <div className="bg-white p-3 rounded-md shadow-sm">
                          <div className="text-neutral-500 text-sm mb-1">Language</div>
                          <div className="font-medium">{recommendation.language}</div>
                        </div>
                        <div className="bg-white p-3 rounded-md shadow-sm">
                          <div className="text-neutral-500 text-sm mb-1">Local Currency</div>
                          <div className="font-medium">{recommendation.currency}</div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {recommendation.tags && recommendation.tags?.map((tag:string, index:number) => (
                          <span key={index} className="bg-primary bg-opacity-10 text-white px-3 py-1 rounded-full text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Tabs Navigation */}
                <Tabs defaultValue="itinerary" className="mb-8">
                  <TabsList className="w-full bg-none border-b border-neutral-300 h-auto p-0 bg-transparent justify-start">
                    <TabsTrigger 
                      value="itinerary" 
                      className={"p-4 rounded-none border-b-2 border-neutral-200  data-[state=active]:border-primary data-[state=inactive]:text-neutral-500 data-[state=active]:text-primary data-[state=active]:bg-white"}
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      Itinerary
                    </TabsTrigger>
                    <TabsTrigger 
                      value="accommodations" 
                      className={"p-4 rounded-none border-b-2 border-neutral-200  data-[state=active]:border-primary data-[state=inactive]:text-neutral-500 data-[state=active]:text-primary data-[state=active]:bg-white"}
                    >
                      <Bed className="h-4 w-4 mr-2" />
                      Accommodations
                    </TabsTrigger>
                    <TabsTrigger 
                      value="dining" 
                      className={"p-4 rounded-none border-b-2 border-neutral-200  data-[state=active]:border-primary data-[state=inactive]:text-neutral-500 data-[state=active]:text-primary data-[state=active]:bg-white"}
                    >
                      <Utensils className="h-4 w-4 mr-2" />
                      Dining
                    </TabsTrigger>
                    <TabsTrigger 
                      value="budget" 
                      className={"p-4 rounded-none border-b-2 border-neutral-200  data-[state=active]:border-primary data-[state=inactive]:text-neutral-500 data-[state=active]:text-primary data-[state=active]:bg-white"}
                    >
                      <Calculator className="h-4 w-4 mr-2" />
                      Budget
                    </TabsTrigger>
                    <TabsTrigger 
                      value="tips" 
                      className={"p-4 rounded-none border-b-2 border-neutral-200  data-[state=active]:border-primary data-[state=inactive]:text-neutral-500 data-[state=active]:text-primary data-[state=active]:bg-white"}
                    >
                      <Info className="h-4 w-4 mr-2" />
                      Travel Tips
                    </TabsTrigger>
                  </TabsList>
                  
                  {/* Itinerary Content */}
                  <TabsContent value="itinerary" className="mt-6">
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="flex flex-col md:w-3/5">
                        <h4 className="text-xl font-semibold mb-6">Your {recommendation.itinerary.length}-Day Itinerary</h4>
                        
                        {recommendation.itinerary?.slice(0, expandedDays)?.map((day:any, index:number) => (
                          <Card key={index} className="mb-8 border-neutral-200">
                            <CardContent className="p-5">
                              <div className="flex items-center mb-4">
                                <div className="bg-primary h-10 w-10 rounded-full flex items-center justify-center text-white font-medium mr-3">
                                  {day.day}
                                </div>
                                <h5 className="text-lg font-semibold">{day.title}</h5>
                              </div>
                              
                              <ul className="space-y-4 mb-4">
                                {day.activities?.map((activity:any, actIndex:number) => (
                                  <li key={actIndex} className="flex">
                                    <div className="text-neutral-500 w-16 flex-shrink-0">{activity.time}</div>
                                    <div className="flex-grow">
                                      <div className="font-medium">{activity.title}</div>
                                      <p className="text-sm text-neutral-500">{activity.description}</p>
                                      {activity.imageKeyword && (
                                        <div className="mt-2 rounded-md overflow-hidden h-32 w-full md:w-3/4">
                                          <img 
                                            src={activity.imageKeyword} 
                                            alt={activity.title}
                                            className="h-full w-full object-cover"
                                          />
                                        </div>
                                      )}
                                    </div>
                                  </li>
                                ))}
                              </ul>
                              
                              <div className="text-right">
                                <Button sx={{textTransform: 'none'}} variant="text" className="text-primary">
                                  <Edit className="h-4 w-4 mr-1" />
                                  Customize Day
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                        
                        {expandedDays < recommendation.itinerary.length && (
                          <Card className="mb-8 border-2 border-dashed border-gray-300">
                            <CardContent className="p-5">
                              <div className="flex items-center mb-4">
                                <div className="bg-neutral-300 h-10 w-10 rounded-full flex items-center justify-center text-neutral-600 font-medium mr-3">
                                  {expandedDays + 1}
                                </div>
                                <h5 className="text-lg font-semibold text-neutral-500">
                                  {recommendation.itinerary[expandedDays].title}
                                </h5>
                              </div>
                              
                              <div className="text-center py-4">
                                <Button sx={{textTransform: 'none'}} 
                                  variant="text" 
                                  className="text-primary"
                                  onClick={() => setExpandedDays(recommendation.itinerary.length)}
                                >
                                  <PlusCircle className="h-4 w-4 mr-1" />
                                  View More Days
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        )}
    
                          {expandedDays!==1 && <Button sx={{textTransform: 'none'}} 
                            variant="text" 
                            className="text-primary self-center"
                            onClick={() => setExpandedDays(1)}
                          >
                            <MinusCircle className="h-4 w-4 mr-1" />
                            View Less Days
                          </Button>}
                      </div>
                      
                      <div className="md:w-2/5">
                        {/* Cost breakdown */}
                        <Card className="mb-8 border-neutral-200">
                          <CardContent className="p-5">
                            <h4 className="text-xl font-semibold mb-4">Estimated Budget</h4>
                            
                            <div className="space-y-3 mb-6">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                  <Bed className="text-neutral-400 w-6 h-6" />
                                  <span className="ml-2">Accommodation</span>
                                </div>
                                <span className="font-medium">PKR {recommendation.budget.accommodation/100}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                  <Utensils className="text-neutral-400 w-6 h-6" />
                                  <span className="ml-2">Food & Dining</span>
                                </div>
                                <span className="font-medium">PKR {recommendation.budget.food/100}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="text-neutral-400 w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6" />
                                    <path d="M12 12V8l2 2" />
                                    <path d="M12 12V8l-2 2" />
                                    <path d="M12 12v4" />
                                    <path d="M18 2H6a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
                                  </svg>
                                  <span className="ml-2">Activities & Attractions</span>
                                </div>
                                <span className="font-medium">PKR {recommendation.budget.activities/100}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="text-neutral-400 w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 15v-6l7-3v6" />
                                    <path d="M9 9h7" />
                                    <path d="M4.5 4.5h15v15h-15z" />
                                  </svg>
                                  <span className="ml-2">Local Transportation</span>
                                </div>
                                <span className="font-medium">PKR {recommendation.budget.transportation/100}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="text-neutral-400 w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M6 2h12a2 2 0 0 1 2 2v4H4V4a2 2 0 0 1 2-2z" />
                                    <path d="M4 10h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10z" />
                                    <path d="M12 6v12" />
                                  </svg>
                                  <span className="ml-2">Shopping & Misc</span>
                                </div>
                                <span className="font-medium">PKR {recommendation.budget.shopping/100}</span>
                              </div>
                            </div>
                            
                            <div className="border-t border-neutral-200 pt-3">
                              <div className="flex justify-between items-center font-bold">
                                <span>Total ({recommendation.itinerary.length} days)</span>
                                <span className="text-lg">PKR {recommendation.budget.total/100}</span>
                              </div>
                              <div className="text-sm text-neutral-500 text-right">PKR {recommendation.budget.perDay/100} per day</div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        {/* Map */}
                        <Card className="mb-8 border-neutral-200">
                          <CardContent className="p-5">
                            <h4 className="text-xl font-semibold mb-4">Trip Map</h4>
                            <div className="aspect-video bg-neutral-200 rounded-md overflow-hidden relative">
                              <div className="absolute inset-0 flex items-center justify-center bg-neutral-200 bg-opacity-30">
                                <Button sx={{textTransform: 'none', backgroundColor: 'white', ':hover': { background: '#3c83f6', color: 'white'}, fontWeight: '600', padding: '10px 16px', borderRadius: '8px'}}>
                                  <MapPin className="mr-2 h-4 w-4" />
                                  Open Interactive Map
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        {/* Weather info */}
                        <Card className="border-neutral-200">
                          <CardContent className="p-5">
                            <h4 className="text-xl font-semibold mb-4">Weather Forecast</h4>
                            <div className="grid grid-cols-5 gap-2 text-center">
                              {recommendation.weather.days?.map((day:any, index:number) => (
                                <div key={index} className="p-2">
                                  <div className="text-sm font-medium mb-1">{day.day}</div>
                                  <div className="text-base">
                                    {day.condition === "Sunny" && "☀️"}
                                    {day.condition === "Partly Cloudy" && "⛅"}
                                    {day.condition === "Cloudy" && "☁️"}
                                    {day.condition === "Rainy" && "🌧️"}
                                    {day.condition === "Stormy" && "⛈️"}
                                  </div>
                                  <div className="text-sm mt-1">{day.temperature}</div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                        
                        {/* Travel Tips Section */}
                        <div className="mt-6">
                          <h4 className="text-xl font-semibold mb-4">Travel Tips</h4>
                          <ul className="space-y-3">
                            {recommendation.travelTips?.map((tip:string, index:number) => (
                              <li key={index} className="flex items-start">
                                <svg className="text-primary w-5 h-5 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  {/* Accommodations Content */}
                  <TabsContent value="accommodations" className="mt-6">
                    <h4 className="text-xl font-semibold mb-6">Recommended Accommodations</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {recommendation.accommodations?.map((accommodation:any, index:number) => (
                        <Card key={index}>
                          {accommodation.imageKeyword && (
                            <div className="relative h-40 w-full overflow-hidden">
                              <img 
                                src={accommodation.imageKeyword} 
                                alt={accommodation.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <CardContent className="p-5">
                            <h5 className="text-lg font-semibold mb-1">{accommodation.name}</h5>
                            <div className="flex items-center mb-3">
                              <div className="bg-neutral-100 text-neutral-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">
                                {accommodation.type}
                              </div>
                              <div className="text-neutral-500 text-sm">{accommodation.priceRange}</div>
                            </div>
                            <p className="text-neutral-600 text-sm">{accommodation.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  {/* Dining Content */}
                  <TabsContent value="dining" className="mt-6">
                    <h4 className="text-xl font-semibold mb-6">Recommended Dining Options</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {recommendation.dining?.map((restaurant:any, index:number) => (
                        <Card key={index}>
                          {restaurant.imageKeyword && (
                            <div className="relative h-40 w-full overflow-hidden">
                              <img 
                                src={restaurant.imageKeyword} 
                                alt={restaurant.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <CardContent className="p-5">
                            <h5 className="text-lg font-semibold mb-1">{restaurant.name}</h5>
                            <div className="flex items-center mb-3">
                              <div className="bg-neutral-100 text-neutral-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">
                                {restaurant.cuisine}
                              </div>
                              <div className="text-neutral-500 text-sm">{restaurant.priceRange}</div>
                            </div>
                            <p className="text-neutral-600 text-sm">{restaurant.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  {/* Budget Content */}
                  <TabsContent value="budget" className="mt-6">
                    <div className="max-w-3xl mx-auto">
                      <h4 className="text-xl font-semibold mb-6">Budget Breakdown</h4>
                      <Card className="border-neutral-200">
                        <CardContent className="p-5">
                          <div className="space-y-6">
                            <div>
                              <h5 className="text-lg font-medium mb-3">Total Trip Budget</h5>
                              <div className="flex justify-between items-center text-2xl font-bold mb-2">
                                <span>Total Cost</span>
                                <span className="text-primary">PKR {recommendation.budget.total/100}</span>
                              </div>
                              <div className="flex justify-between items-center text-sm text-neutral-500">
                                <span>{recommendation.itinerary.length} days</span>
                                <span>PKR {recommendation.budget.perDay/100} per day</span>
                              </div>
                            </div>
                            
                            <div className="border-t pt-3">
                              <h5 className="text-lg font-medium mb-3">Category Breakdown</h5>
                              <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center">
                                    <Bed className="text-neutral-400 w-5 h-5 mr-2" />
                                    <span>Accommodation</span>
                                  </div>
                                  <div className="flex flex-col items-end">
                                    <span className="font-medium">PKR {recommendation.budget.accommodation/100}</span>
                                    <span className="text-xs text-neutral-500">
                                      {Math.round(recommendation.budget.accommodation / recommendation.budget.total * 100)}% of total
                                    </span>
                                  </div>
                                </div>
                                
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center">
                                    <Utensils className="text-neutral-400 w-5 h-5 mr-2" />
                                    <span>Food & Dining</span>
                                  </div>
                                  <div className="flex flex-col items-end">
                                    <span className="font-medium">PKR {recommendation.budget.food/100}</span>
                                    <span className="text-xs text-neutral-500">
                                      {Math.round(recommendation.budget.food / recommendation.budget.total * 100)}% of total
                                    </span>
                                  </div>
                                </div>
                                
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="text-neutral-400 w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6" />
                                      <path d="M12 12V8l2 2" />
                                      <path d="M12 12V8l-2 2" />
                                      <path d="M12 12v4" />
                                      <path d="M18 2H6a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
                                    </svg>
                                    <span>Activities</span>
                                  </div>
                                  <div className="flex flex-col items-end">
                                    <span className="font-medium">PKR {recommendation.budget.activities/100}</span>
                                    <span className="text-xs text-neutral-500">
                                      {Math.round(recommendation.budget.activities / recommendation.budget.total * 100)}% of total
                                    </span>
                                  </div>
                                </div>
                                
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="text-neutral-400 w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M9 15v-6l7-3v6" />
                                      <path d="M9 9h7" />
                                      <path d="M4.5 4.5h15v15h-15z" />
                                    </svg>
                                    <span>Transportation</span>
                                  </div>
                                  <div className="flex flex-col items-end">
                                    <span className="font-medium">PKR {recommendation.budget.transportation/100}</span>
                                    <span className="text-xs text-neutral-500">
                                      {Math.round(recommendation.budget.transportation / recommendation.budget.total * 100)}% of total
                                    </span>
                                  </div>
                                </div>
                                
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="text-neutral-400 w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M6 2h12a2 2 0 0 1 2 2v4H4V4a2 2 0 0 1 2-2z" />
                                      <path d="M4 10h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10z" />
                                      <path d="M12 6v12" />
                                    </svg>
                                    <span>Shopping & Misc</span>
                                  </div>
                                  <div className="flex flex-col items-end">
                                    <span className="font-medium">PKR {recommendation.budget.shopping/100}</span>
                                    <span className="text-xs text-neutral-500">
                                      {Math.round(recommendation.budget.shopping / recommendation.budget.total * 100)}% of total
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="border-t pt-3">
                              <h5 className="text-lg font-medium mb-3">Budget Tips</h5>
                              <ul className="space-y-2">
                                <li className="flex items-start">
                                  <svg className="text-primary w-5 h-5 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                  </svg>
                                  <span>Look for accommodations with kitchen access to save on dining costs</span>
                                </li>
                                <li className="flex items-start">
                                  <svg className="text-primary w-5 h-5 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                  </svg>
                                  <span>Consider purchasing a city pass for major attractions</span>
                                </li>
                                <li className="flex items-start">
                                  <svg className="text-primary w-5 h-5 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                  </svg>
                                  <span>Use public transportation instead of taxis when possible</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  {/* Travel Tips Content */}
                  <TabsContent value="tips" className="mt-6">
                    <div className="max-w-3xl mx-auto">
                      <h4 className="text-xl font-semibold mb-6">Essential Travel Tips for {recommendation.destination}</h4>
                      
                      <Card className="mb-8 border-neutral-200">
                        <CardContent className="p-5">
                          <h5 className="text-lg font-medium mb-4">Local Customs & Etiquette</h5>
                          <ul className="space-y-3">
                            {recommendation.travelTips?.slice(0, 3)?.map((tip:string, index:number) => (
                              <li key={index} className="flex items-start">
                                <svg className="text-primary w-5 h-5 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <Card className="mb-8 border-neutral-200">
                        <CardContent className="p-5">
                          <h5 className="text-lg font-medium mb-4">Getting Around</h5>
                          <ul className="space-y-3">
                            {recommendation.travelTips?.slice(3, 6)?.map((tip:string, index:number) => (
                              <li key={index} className="flex items-start">
                                <svg className="text-primary w-5 h-5 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-neutral-200">
                        <CardContent className="p-5">
                          <h5 className="text-lg font-medium mb-4">Safety & Health</h5>
                          <ul className="space-y-3">
                            {recommendation.travelTips?.slice(6)?.map((tip:string, index:number) => (
                              <li key={index} className="flex items-start">
                                <svg className="text-primary w-5 h-5 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </>
            )}
          </div>
        </section>
  );
}
