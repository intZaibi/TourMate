import { useAuth } from "@/components/hooks/use-auth";
import Footer from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { RecommendationsSection } from "@/components/layout/RecommendationsSection";

export default function Recommendations() {
    const { user, logoutMutation } = useAuth();
    
  
  return (
    <>
      <Header/>
      <RecommendationsSection isLoading={true} recommendation={[]}/>
      <Footer/>
    </>
  )
} 