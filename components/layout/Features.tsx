import { LightbulbIcon, MapPinIcon, Calculator, BrainCircuit } from "lucide-react";

interface FeatureCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

export function Features() {
  const features: FeatureCard[] = [
    {
      icon: <BrainCircuit className="h-6 w-6 text-blue-500" />,
      title: "AI Analysis",
      description: "Our AI engine analyzes thousands of destinations and activities to find your perfect match.",
      color: "bg-blue-100"
    },
    {
      icon: <Calculator className="h-6 w-6 text-emerald-500" />,
      title: "Cost Estimation",
      description: "Accurate budget planning with detailed breakdowns for accommodations, activities, and more",
      color: "bg-emerald-100"
    },
    {
      icon: <MapPinIcon className="h-6 w-6 text-amber-500" />,
      title: "Complete Information",
      description: "Comprehensive details about destinations, attractions, local customs, and travel requirements",
      color: "bg-amber-100"
    },
    {
      icon: <LightbulbIcon className="h-6 w-6 text-pink-500" />,
      title: "Plan Your Adventure",
      description: "Save and share your favorites, make adjustments, and start planning your dream vacation.",
      color: "bg-pink-100"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How Tourmate Helps You</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-xl hover:shadow-lg transition duration-300"
            >
              <div className={`bg-opacity-10 p-4 rounded-full mb-4 ${feature.color}`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
              <p className="text-neutral-500 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
