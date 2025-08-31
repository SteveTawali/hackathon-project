import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  BookOpen, 
  Target, 
  Timer, 
  Shield, 
  BarChart3, 
  Menu,
  Home,
  Sparkles,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";
import DarkModeSwitch from "@/components/ui/DarkModeSwitch";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { path: "/mood", label: "Mood", icon: Heart },
  { path: "/journal", label: "Journal", icon: BookOpen },
  { path: "/habits", label: "Habits", icon: Target },
  { path: "/meditation", label: "Meditation", icon: Timer },
  { path: "/community", label: "Community", icon: Users },
  { path: "/sos", label: "SOS Support", icon: Shield, urgent: true },
  { path: "/login", label: "Login", icon: Sparkles }
  ];

  const NavItems = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        
        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => mobile && setIsOpen(false)}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
              mobile ? "w-full" : "relative",
              isActive 
                ? "bg-primary text-primary-foreground" 
                : "hover:bg-muted",
              item.urgent && "text-emergency hover:bg-emergency/10"
            )}
          >
            <Icon className="h-5 w-5" />
            <span className={mobile ? "text-base" : "hidden lg:inline"}>{item.label}</span>
            {item.urgent && (
              <Badge variant="destructive" className="ml-auto">
                24/7
              </Badge>
            )}
          </Link>
        );
      })}
    </>
  );

  return (
    <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold gradient-text">MindWell</h1>
              <p className="text-xs text-muted-foreground">Mental Wellness Platform</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <NavItems />
            <DarkModeSwitch />
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex items-center gap-2 mb-8">
                <div className="p-2 rounded-lg bg-gradient-primary">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold gradient-text">MindWell</h1>
                  <p className="text-xs text-muted-foreground">Mental Wellness Platform</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <NavItems mobile />
              </div>

              <div className="mt-8 p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground mb-2">
                  Remember: You're not alone in this journey.
                </p>
                <p className="text-xs text-muted-foreground">
                  If you're in crisis, tap SOS Support above for immediate help.
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;