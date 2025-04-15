'use client'
import { East } from "@mui/icons-material";
import { Button } from "@mui/material";

export function Hero() {
  const scrollToPreferences = () => {
    const element = document.getElementById("preferences");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      className="relative text-white" style={{
        backgroundImage: "url('/photo-1469854523086-cc02fe5d8800.avif')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Your AI-Powered Travel Companion</h1>
          <p className="text-xl md:text-2xl mb-10">Personalized travel recommendations based on your preferences</p>
          <Button 
            size="large" 
            variant="contained"
            sx={{borderRadius: 'calc(infinity*1px)', textTransform: 'none', padding: '12px 38px', fontWeight: "bolder"}}
            className="rounded-full px-8 py-6 text-base"
            endIcon={<East />}
            onClick={scrollToPreferences}
          >
            Plan Your Trip
          </Button>
        </div>
      </div>
    </section>
  );
}
