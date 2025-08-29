import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setError("");
    // Add login logic here
    alert("Login successful (demo)");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="absolute top-8 left-0 right-0 flex justify-center">
        <div className="flex flex-col items-center">
          <div className="p-2 rounded-lg bg-gradient-primary mb-2">
            {/* You can use your Sparkles icon here if desired */}
          </div>
          <h1 className="text-2xl font-bold gradient-text">MindWell</h1>
          <p className="text-xs text-muted-foreground">Mental Wellness Platform</p>
        </div>
      </div>
      <Card className="max-w-md w-full p-8 shadow-lg mt-24">
        <CardHeader>
          <CardTitle className="text-3xl font-bold gradient-text text-center mb-2">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block mb-2 font-medium">Email</label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 font-medium">Password</label>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <Button type="submit" className="w-full text-lg">Login</Button>
          </form>
          <div className="mt-6 text-center">
            <span className="text-muted-foreground">Don't have an account?</span>
            <a href="/register" className="ml-2 text-primary font-medium hover:underline">Register</a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
