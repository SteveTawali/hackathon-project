import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Heart, BookOpen, Target, Sparkles, TrendingUp, Phone, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

const Dashboard = () => {
  const [currentMood, setCurrentMood] = useState(4);
  const [affirmation, setAffirmation] = useState("");
  
  const affirmations = [
    "You are capable of amazing things today.",
    "Your mental health journey is valid and important.",
    "Every small step forward is progress worth celebrating.",
    "You have the strength to overcome any challenge.",
    "Your feelings are valid, and it's okay to feel them."
  ];

  useEffect(() => {
    setAffirmation(affirmations[Math.floor(Math.random() * affirmations.length)]);
  }, []);

  const moodEmojis = ["😢", "😞", "😐", "😊", "😄"];
  const moodLabels = ["Very Sad", "Sad", "Neutral", "Happy", "Very Happy"];

  const habits = [
    { name: "Morning Meditation", progress: 85, streak: 12 },
    { name: "Gratitude Journal", progress: 60, streak: 8 },
    { name: "Daily Walk", progress: 90, streak: 15 },
    { name: "Read for 30min", progress: 45, streak: 3 }
  ];

  const recentEntries = [
    { title: "Morning Reflections", date: "Today", mood: "happy" },
    { title: "Grateful Thoughts", date: "Yesterday", mood: "very-happy" },
    { title: "Processing Change", date: "2 days ago", mood: "neutral" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto p-6 space-y-8">
        {/* Welcome Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold gradient-text">Welcome to Your Wellness Dashboard</h1>
          <p className="text-xl text-muted-foreground">Track your mental health journey with intention and care</p>
        </div>

        {/* Daily Affirmation */}
        <Card className="wellness-card-gradient">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Today's Affirmation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg italic text-center text-foreground/90">{affirmation}</p>
            <Button
              variant="ghost"
              onClick={() => setAffirmation(affirmations[Math.floor(Math.random() * affirmations.length)])}
              className="w-full mt-4"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Get New Affirmation
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-4">
          <Button asChild variant="outline" className="h-24 flex-col space-y-2">
            <Link to="/mood">
              <Heart className="h-8 w-8 text-primary" />
              <span>Log Mood</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-24 flex-col space-y-2">
            <Link to="/journal">
              <BookOpen className="h-8 w-8 text-secondary" />
              <span>Write Journal</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-24 flex-col space-y-2">
            <Link to="/meditation">
              <Target className="h-8 w-8 text-meditation" />
              <span>Meditate</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-24 flex-col space-y-2">
            <Link to="/habits">
              <TrendingUp className="h-8 w-8 text-tertiary" />
              <span>Track Habits</span>
            </Link>
          </Button>
        </div>

        {/* Emergency Support */}
        <Card className="border-emergency bg-emergency/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-emergency" />
                <div>
                  <h3 className="font-semibold text-emergency">Need Immediate Support?</h3>
                  <p className="text-sm text-muted-foreground">24/7 crisis support available</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open('tel:+254722178177', '_self')}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </Button>
                <Button asChild size="sm">
                  <Link to="/sos">
                    <Shield className="h-4 w-4 mr-2" />
                    Get Help
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Mood Overview */}
          <Card className="wellness-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                Mood Overview
              </CardTitle>
              <CardDescription>Your emotional wellbeing this week</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-6xl mb-2">{moodEmojis[currentMood - 1]}</div>
                <p className="text-lg font-medium">{moodLabels[currentMood - 1]}</p>
                <p className="text-sm text-muted-foreground">Current mood</p>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {moodEmojis.map((emoji, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl">{emoji}</div>
                    <div className="w-full bg-muted rounded-full h-2 mt-1">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${Math.random() * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Habit Progress */}
          <Card className="wellness-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-green-500" />
                Habit Progress
              </CardTitle>
              <CardDescription>Your daily wellness habits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {habits.map((habit, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{habit.name}</span>
                    <Badge variant="secondary">{habit.streak} day streak</Badge>
                  </div>
                  <Progress value={habit.progress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Journal Entries */}
        <Card className="wellness-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-500" />
              Recent Journal Entries
            </CardTitle>
            <CardDescription>Your latest thoughts and reflections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEntries.map((entry, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <h4 className="font-medium">{entry.title}</h4>
                    <p className="text-sm text-muted-foreground">{entry.date}</p>
                  </div>
                  <Badge variant={entry.mood === "very-happy" ? "default" : "secondary"}>
                    {entry.mood.replace("-", " ")}
                  </Badge>
                </div>
              ))}
            </div>
            <Button asChild variant="outline" className="w-full mt-4">
              <Link to="/journal">View All Entries</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;