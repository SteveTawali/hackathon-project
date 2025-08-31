import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Crown
} from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";

interface PremiumGuardProps {
  children: ReactNode;
  feature: string;
  description?: string;
}

const PremiumGuard = ({ children, feature, description }: PremiumGuardProps) => {
  const navigate = useNavigate();
  const { isPremium, loading } = useSubscription();
  
  // Show loading state while checking subscription
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isPremium) {
    return <>{children}</>;
  }



  const handleUpgradeClick = () => {
    navigate('/pricing');
    // Scroll to top of the page
    window.scrollTo(0, 0);
  };

  return (
    <div className="relative">
      {/* Blurred content */}
      <div className="blur-sm pointer-events-none">
        {children}
      </div>
      
      {/* Simple upgrade button overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
        <Button onClick={handleUpgradeClick} size="lg" className="shadow-lg">
          <Crown className="h-4 w-4 mr-2" />
          Upgrade to Premium
        </Button>
      </div>
    </div>
  );
};

export default PremiumGuard;
