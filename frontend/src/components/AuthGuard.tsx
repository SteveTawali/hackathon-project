import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, LogIn, UserPlus } from "lucide-react";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  // For now, we'll use a simple localStorage check
  // In a real app, you'd check JWT tokens or session state
  const isAuthenticated = localStorage.getItem('authToken');

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>
              Please log in or create an account to access this feature
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-muted-foreground text-center">
              <p>This feature requires you to be logged in to:</p>
              <ul className="mt-2 space-y-1 text-left">
                <li>• Save your progress</li>
                <li>• Access your personal data</li>
                <li>• Get personalized insights</li>
                <li>• Track your wellness journey</li>
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <Button asChild>
                <Link to="/login">
                  <LogIn className="h-4 w-4 mr-2" />
                  Log In
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/register">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Create Account
                </Link>
              </Button>
            </div>
            <div className="text-center">
              <Link to="/" className="text-sm text-primary hover:underline">
                Back to Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;
