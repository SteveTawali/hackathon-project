import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Heart, Calendar, TrendingUp, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  const moods = [
    { value: 1, emoji: "😢", label: "Very Sad", color: "mood-very-sad" },
    { value: 2, emoji: "😞", label: "Sad", color: "mood-sad" },
    { value: 3, emoji: "😐", label: "Neutral", color: "mood-neutral" },
    { value: 4, emoji: "😊", label: "Happy", color: "mood-happy" },
    { value: 5, emoji: "😄", label: "Very Happy", color: "mood-very-happy" }
  ];

  const recentMoods = [
    { date: "Today", mood: 4, emoji: "😊", notes: "Had a productive morning" },
    { date: "Yesterday", mood: 5, emoji: "😄", notes: "Great day with friends" },
    { date: "Dec 26", mood: 3, emoji: "😐", notes: "Quiet day at home" },
    { date: "Dec 25", mood: 4, emoji: "😊", notes: "Christmas with family" },
    { date: "Dec 24", mood: 2, emoji: "😞", notes: "Feeling overwhelmed" }
  ];

  const handleSaveMood = () => {
    if (selectedMood === null) {
      toast({
        title: "Please select a mood",
        description: "Choose how you're feeling before saving.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Mood logged successfully!",
      description: `Your ${moods[selectedMood - 1].label.toLowerCase()} mood has been recorded.`,
    });

    // Reset form
    setSelectedMood(null);
    setNotes("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold gradient-text">Mood Tracker</h1>
          <p className="text-xl text-muted-foreground">How are you feeling today?</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Mood Logger */}
          <Card className="wellness-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                Log Your Mood
              </CardTitle>
              <CardDescription>Select how you're feeling right now</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Mood Selection */}
              <div className="grid grid-cols-5 gap-4">
                {moods.map((mood) => (
                  <Button
                    key={mood.value}
                    variant={selectedMood === mood.value ? "default" : "outline"}
                    className="h-20 flex-col space-y-2"
                    onClick={() => setSelectedMood(mood.value)}
                  >
                    <span className="text-3xl">{mood.emoji}</span>
                    <span className="text-xs">{mood.label}</span>
                  </Button>
                ))}
              </div>

              {/* Selected Mood Display */}
              {selectedMood && (
                <div className="text-center p-4 rounded-lg bg-primary/10">
                  <div className="text-6xl mb-2">{moods[selectedMood - 1].emoji}</div>
                  <p className="text-lg font-medium">{moods[selectedMood - 1].label}</p>
                </div>
              )}

              {/* Notes */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Optional Notes</label>
                <Textarea
                  placeholder="What's contributing to your mood today? (optional)"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[100px]"
                />
                <p className="text-xs text-muted-foreground">{notes.length}/500 characters</p>
              </div>

              {/* Save Button */}
              <Button onClick={handleSaveMood} className="w-full" size="lg">
                <Save className="h-4 w-4 mr-2" />
                Save Mood Entry
              </Button>
            </CardContent>
          </Card>

          {/* Mood History */}
          <Card className="wellness-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                Recent Mood History
              </CardTitle>
              <CardDescription>Your mood patterns over the past few days</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentMoods.map((entry, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 rounded-lg bg-muted/50">
                  <div className="text-3xl">{entry.emoji}</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">{entry.date}</span>
                      <Badge variant="secondary">{moods[entry.mood - 1].label}</Badge>
                    </div>
                    {entry.notes && (
                      <p className="text-sm text-muted-foreground">{entry.notes}</p>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Mood Insights */}
        <Card className="wellness-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Mood Insights
            </CardTitle>
            <CardDescription>Understanding your emotional patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <div className="text-3xl">😊</div>
                <h4 className="font-medium">Most Common Mood</h4>
                <p className="text-sm text-muted-foreground">Happy (40% of entries)</p>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl">📈</div>
                <h4 className="font-medium">Weekly Trend</h4>
                <p className="text-sm text-muted-foreground">Improving (+0.5 avg)</p>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl">🎯</div>
                <h4 className="font-medium">Streak</h4>
                <p className="text-sm text-muted-foreground">5 days of logging</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default MoodTracker;