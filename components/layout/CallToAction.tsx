import { Button } from "@mui/material";
import { MapPin, Info } from "lucide-react";

export function CallToAction() {
  const scrollToPreferences = () => {
    const element = document.getElementById("preferences");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Plan Your Dream Trip?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Get personalized travel recommendations powered by AI that match your unique preferences and budget
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            size="large"
            variant="contained"
            sx={{textTransform: 'none', paddingX: '20px', fontWeight: 'semibold', bgcolor: 'white', borderRadius: '50px', color: '#1565c0', ":hover": {bgcolor: 'whitesmoke'}}}
            onClick={scrollToPreferences}
          >
            <MapPin className="mr-2 h-5 w-5" />
            <span>Plan Your Trip</span>
          </Button>
          <Button
            size="large"
            variant="outlined"
            sx={{border: '2px solid white', paddingX: '20px', borderRadius: '50px', color: 'white',textTransform: 'none', fontWeight: 'bolder', ":hover": {border: '2px solid white', bgcolor: 'white', borderRadius: '50px', color: '#1565c0'}}}
          >
            <Info className="mr-2 h-5 w-5" />
            <span>Learn More</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
