import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  LogIn,
  LogOut,
  User,
  DollarSign,
  Phone
} from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if user is authenticated
  const isAuthenticated = localStorage.getItem('authToken');
  const userName = localStorage.getItem('userName') || localStorage.getItem('userEmail');

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    navigate('/');
  };

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/dashboard", label: "Dashboard", icon: BarChart3, requiresAuth: true },
    { path: "/mood", label: "Mood", icon: Heart, requiresAuth: true },
    { path: "/journal", label: "Journal", icon: BookOpen, requiresAuth: true },
    { path: "/habits", label: "Habits", icon: Target, requiresAuth: true },
    { path: "/meditation", label: "Meditation", icon: Timer },
    { path: "/pricing", label: "Pricing", icon: DollarSign },
    { path: "/sos", label: "SOS", icon: Shield, urgent: true, action: "call" }
  ];

  const NavItems = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {navItems.map((item) => {
        // Skip auth-required items if not authenticated
        if (item.requiresAuth && !isAuthenticated) return null;
        
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        
        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted",
              item.urgent && "text-emergency hover:text-emergency"
            )}
            onClick={() => mobile && setIsOpen(false)}
          >
            <Icon className="h-4 w-4" />
            <span>{item.label}</span>
            {item.action === "call" && (
              <Button
                size="sm"
                variant="ghost"
                className="ml-auto p-1 h-6 w-6"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open('tel:+254722178177', '_self');
                }}
              >
                <Phone className="h-3 w-3" />
              </Button>
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
          <div className="hidden lg:flex items-center space-x-2">
            <NavItems />
            
            {/* Auth Buttons */}
            <div className="ml-4 flex items-center gap-2">
              {isAuthenticated ? (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/profile">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/login">
                      <LogIn className="h-4 w-4 mr-2" />
                      Login
                    </Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link to="/register">
                      <User className="h-4 w-4 mr-2" />
                      Get Started
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
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

              {/* Mobile Auth Buttons */}
              <div className="mt-8 space-y-2">
                {isAuthenticated ? (
                  <>
                    <Button variant="ghost" size="sm" asChild className="w-full">
                      <Link to="/profile">
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleLogout} className="w-full">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" size="sm" asChild className="w-full">
                      <Link to="/login">
                        <LogIn className="h-4 w-4 mr-2" />
                        Login
                      </Link>
                    </Button>
                    <Button size="sm" asChild className="w-full">
                      <Link to="/register">
                        <User className="h-4 w-4 mr-2" />
                        Sign Up
                      </Link>
                    </Button>
                  </>
                )}
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