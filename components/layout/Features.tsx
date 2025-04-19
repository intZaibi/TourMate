import { LightbulbIcon, MapPinIcon, Calculator, BrainCircuit, BarChart2, DollarSign, Map } from "lucide-react";

interface FeatureCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

export function Features() {
  const features: FeatureCard[] = [
    {
      icon: <BarChart2 className="h-6 w-6 text-blue-500"/>,
      title: "Personalized Recommendations",
      description: "Receive tailored suggestions for destinations, activities, accommodations, and more based on your unique preferences.",
      color: "bg-blue-100"
    },
    {
      icon: <DollarSign className="h-6 w-6 text-emerald-500"/>,
      title: "Cost Estimation",
      description: "Get estimated travel costs based on your preferences, including accommodations, transportation, activities, and dining options.",
      color: "bg-emerald-100"
    },
    {
      icon: <Map className="h-6 w-6 text-amber-500"/>,
      title: "Complete Information",
      description: "Comprehensive details about destinations, attractions, local customs, and travel requirements",
      color: "bg-amber-100"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">AI-Powered Travel Planning</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 flex flex-col items-center text-center p-6 rounded-xl hover:shadow-lg transition duration-300">
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
