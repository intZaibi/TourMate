export default function HowItWorksSection() {
  return (
    <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">How TourMate Works</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Our AI-powered platform analyzes your preferences to create the perfect travel itinerary tailored just for you.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-gray-50 flex flex-col items-center text-center p-6 rounded-xl hover:shadow-lg transition duration-300">
              <div className="w-16 h-16 bg-[#1CDCE0] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-2">Share Your Preferences</h3>
              <p className="text-gray-600 text-sm">
                Tell us about your travel style, budget, and what experiences you're looking for.
              </p>
            </div>
            
            <div className="bg-gray-50 flex flex-col items-center text-center p-6 rounded-xl hover:shadow-lg transition duration-300">
              <div className="w-16 h-16 bg-[#51BAE0] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-2">AI Analysis</h3>
              <p className="text-gray-600 text-sm">
                Our AI engine analyzes thousands of destinations and activities to find your perfect match.
              </p>
            </div>
            
            <div className="bg-gray-50 flex flex-col items-center text-center p-6 rounded-xl hover:shadow-lg transition duration-300">
              <div className="w-16 h-16 bg-[#8699E0] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-2">Get Recommendations</h3>
              <p className="text-gray-600 text-sm">
                Receive personalized destination suggestions with activities, accommodations, and cost estimates.
              </p>
            </div>
            
            <div className="bg-gray-50 flex flex-col items-center text-center p-6 rounded-xl hover:shadow-lg transition duration-300">
              <div className="w-16 h-16 bg-[#BB77E0] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">4</span>
              </div>
              <h3 className="font-semibold mb-2">Plan Your Adventure</h3>
              <p className="text-gray-600 text-sm">
                Save your favorites, make adjustments, and start planning your dream vacation.
              </p>
            </div>
          </div>
        </div>
      </section>
  )
}