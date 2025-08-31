import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  BookOpen, 
  Target, 
  Timer, 
  Shield, 
  BarChart3,
  Sparkles,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight
} from "lucide-react";

const Index = () => {
  // Check if user is authenticated
  const isAuthenticated = localStorage.getItem('authToken');
  const userName = localStorage.getItem('userName') || localStorage.getItem('userEmail');

  const features = [
    {
      icon: Heart,
      title: "Mood Tracking",
      description: "Monitor your emotional well-being with intuitive mood logging and pattern analysis.",
      color: "text-red-500"
    },
    {
      icon: BookOpen,
      title: "AI-Powered Journal",
      description: "Write and reflect with intelligent prompts and sentiment analysis to gain deeper insights.",
      color: "text-blue-500"
    },
    {
      icon: Target,
      title: "Habit Building",
      description: "Develop positive mental health habits with tracking, streaks, and progress visualization.",
      color: "text-green-500"
    },
    {
      icon: Timer,
      title: "Meditation & Breathing",
      description: "Find peace with guided breathing exercises and customizable meditation timers.",
      color: "text-purple-500"
    },
    {
      icon: BarChart3,
      title: "Wellness Dashboard",
      description: "Get a complete overview of your mental health journey with beautiful visualizations.",
      color: "text-orange-500"
    },
    {
      icon: Shield,
      title: "Crisis Support",
      description: "Access 24/7 resources, grounding techniques, and professional help when you need it most.",
      color: "text-red-600"
    }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      role: "Teacher",
      quote: "MindWell helped me understand my mood patterns and develop healthier coping strategies.",
      rating: 5
    },
    {
      name: "David L.",
      role: "Software Engineer",
      quote: "The meditation timer and breathing exercises have become essential parts of my daily routine.",
      rating: 5
    },
    {
      name: "Maya R.",
      role: "Healthcare Worker",
      quote: "Having crisis resources readily available gives me peace of mind during tough times.",
      rating: 5
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "50K+", label: "Journal Entries" },
    { number: "25K+", label: "Habits Tracked" },
    { number: "100K+", label: "Meditation Minutes" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Welcome Banner for Logged-in Users */}
      {isAuthenticated && (
        <section className="bg-primary/5 border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Welcome back, <span className="font-medium text-primary">{userName?.split('@')[0]}</span>! 
                Ready to continue your wellness journey?
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-10"></div>
        <div className="container mx-auto px-4 py-20 relative">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <Badge className="mb-4" variant="secondary">
              <Sparkles className="h-3 w-3 mr-1" />
              {isAuthenticated ? "Continue Your Wellness Journey" : "Your Mental Health Journey Starts Here"}
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight">
              <span className="gradient-text">MindWell</span>
              <br />
              <span className="text-foreground">Mental Wellness</span>
              <br />
              <span className="text-muted-foreground text-2xl sm:text-3xl md:text-5xl">Made Simple</span>
            </h1>
            
            {isAuthenticated ? (
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                Welcome back, {userName?.split('@')[0]}! Continue your mental wellness journey 
                with mood tracking, journaling, habit building, and mindfulness practices.
              </p>
            ) : (
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                Track your mood, build healthy habits, practice mindfulness, and access support 
                whenever you need it. Your comprehensive mental wellness companion.
              </p>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {isAuthenticated ? (
                <>
                  <Button asChild size="lg" className="text-lg px-8 py-6">
                    <Link to="/dashboard">
                      Go to Dashboard
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                    <Link to="/mood">
                      Track Your Mood
                      <Heart className="h-5 w-5 ml-2" />
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild size="lg" className="text-lg px-8 py-6">
                    <Link to="/register">
                      Start Your Journey
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                    <Link to="/meditation">
                      Try Meditation
                      <Timer className="h-5 w-5 ml-2" />
                    </Link>
                  </Button>
                </>
              )}
            </div>

            {!isAuthenticated ? (
              <>
                <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground pt-8">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Unlimited Journaling</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>5 Habits Tracking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Basic AI Analysis</span>
                  </div>
                </div>
                <div className="text-center mt-6">
                  <Link to="/pricing" className="text-primary hover:underline font-medium">
                    View all features and pricing →
                  </Link>
                </div>
              </>
            ) : (
              <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground pt-8">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Continue your progress</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Track your habits</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Practice mindfulness</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">Everything You Need for Mental Wellness</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools and resources to support your mental health journey, 
              all in one beautifully designed platform.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="wellness-card hover:shadow-strong transition-all duration-300 float-animation">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-lg bg-muted">
                        <Icon className={`h-6 w-6 ${feature.color}`} />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">Trusted by Thousands</h2>
            <p className="text-xl text-muted-foreground">
              Real stories from people on their mental wellness journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="wellness-card">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-500">★</span>
                    ))}
                  </div>
                  <blockquote className="text-lg italic mb-4">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Only show for non-authenticated users */}
      {!isAuthenticated && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <Card className="wellness-card-gradient max-w-4xl mx-auto text-center">
              <CardContent className="pt-12 pb-12">
                <h2 className="text-4xl font-bold mb-6">Ready to Start Your Wellness Journey?</h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join thousands of people who are taking control of their mental health with MindWell. 
                  Your journey to better mental wellness starts with a single step.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Button asChild size="lg" className="text-lg px-8 py-6">
                    <Link to="/register">
                      Get Started Free
                      <TrendingUp className="h-5 w-5 ml-2" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                    <Link to="/pricing">
                      View Pricing
                      <Shield className="h-5 w-5 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t bg-card/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-gradient-primary">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold gradient-text">MindWell</h3>
                  <p className="text-xs text-muted-foreground">Mental Wellness Platform</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Supporting your mental health journey with compassionate, evidence-based tools and resources.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/mood" className="hover:text-primary">Mood Tracking</Link></li>
                <li><Link to="/journal" className="hover:text-primary">Journal</Link></li>
                <li><Link to="/habits" className="hover:text-primary">Habit Tracker</Link></li>
                <li><Link to="/meditation" className="hover:text-primary">Meditation</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/sos" className="hover:text-emergency">Crisis Support</Link></li>
                <li><Link to="/pricing" className="hover:text-primary">Pricing</Link></li>
                <li><Link to="/help" className="hover:text-primary">Help Center</Link></li>
                <li><Link to="/contact" className="hover:text-primary">Contact Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Emergency</h4>
              <div className="space-y-2 text-sm">
                <p className="text-emergency font-medium">In Crisis?</p>
                <p className="text-muted-foreground">Call Befrienders Kenya for immediate support</p>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link to="/sos">Get Help Now</Link>
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  <a href="tel:+254722178177" className="text-emergency hover:underline">
                    Call: +254 722 178 177
                  </a>
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 MindWell. Supporting mental health with compassion and technology.</p>
            <p className="mt-2">Remember: You're not alone. Help is always available.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
