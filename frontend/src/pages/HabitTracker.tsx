import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Target, Plus, TrendingUp, Calendar, Award, Crown, Lock, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import PremiumGuard from "@/components/PremiumGuard";

interface Habit {
  id: string;
  name: string;
  category: string;
  target: number;
  unit: string;
  streak: number;
  completed: boolean;
  progress: number;
  todayCompleted: boolean;
  createdAt: number;
  completionHistory: { date: string; completed: boolean }[];
}

const HabitTracker = () => {
  const [newHabit, setNewHabit] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("wellness");
  const [habits, setHabits] = useState<Habit[]>([]);
  const { toast } = useToast();

  // Check if user is premium
  const isPremium = localStorage.getItem('userPlan') === 'premium';
  const currentHabitCount = habits.length; // Free users can have 5 habits

  // Load habits from localStorage on component mount
  useEffect(() => {
    const savedHabits = localStorage.getItem('habitHistory');
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    } else {
      // Initialize with default habits if none exist
      const defaultHabits: Habit[] = [
        {
          id: "1",
          name: "Morning Meditation",
          category: "mindfulness",
          streak: 12,
          completed: true,
          target: 1,
          unit: "session",
          progress: 85,
          todayCompleted: true,
          createdAt: Date.now() - 12 * 24 * 60 * 60 * 1000,
          completionHistory: []
        },
        {
          id: "2",
          name: "Gratitude Journal",
          category: "wellness",
          streak: 8,
          completed: false,
          target: 3,
          unit: "entries",
          progress: 60,
          todayCompleted: false,
          createdAt: Date.now() - 8 * 24 * 60 * 60 * 1000,
          completionHistory: []
        },
        {
          id: "3",
          name: "Daily Walk",
          category: "physical",
          streak: 15,
          completed: true,
          target: 30,
          unit: "minutes",
          progress: 90,
          todayCompleted: true,
          createdAt: Date.now() - 15 * 24 * 60 * 60 * 1000,
          completionHistory: []
        },
        {
          id: "4",
          name: "Call a Friend",
          category: "social",
          streak: 3,
          completed: false,
          target: 1,
          unit: "call",
          progress: 45,
          todayCompleted: false,
          createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
          completionHistory: []
        },
        {
          id: "5",
          name: "Read for Growth",
          category: "wellness",
          streak: 7,
          completed: false,
          target: 20,
          unit: "minutes",
          progress: 70,
          todayCompleted: false,
          createdAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
          completionHistory: []
        }
      ];
      setHabits(defaultHabits);
    }
  }, []);

  // Save habits to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('habitHistory', JSON.stringify(habits));
  }, [habits]);

  const categories = [
    { id: "wellness", label: "Wellness", color: "bg-green-500" },
    { id: "mindfulness", label: "Mindfulness", color: "bg-purple-500" },
    { id: "physical", label: "Physical", color: "bg-blue-500" },
    { id: "social", label: "Social", color: "bg-pink-500" }
  ];



  const handleAddHabit = () => {
    if (!newHabit.trim()) {
      toast({
        title: "Please enter a habit name",
        description: "Give your new habit a descriptive name.",
        variant: "destructive"
      });
      return;
    }

    // Check if user can add more habits
    if (!isPremium && currentHabitCount >= 5) {
      toast({
        title: "Habit limit reached",
        description: "Free users can track up to 5 habits. Upgrade to Premium for unlimited habits!",
        variant: "destructive"
      });
      return;
    }

    // Create new habit
    const newHabitEntry: Habit = {
      id: Date.now().toString(),
      name: newHabit.trim(),
      category: selectedCategory,
      streak: 0,
      completed: false,
      target: 1,
      unit: "time",
      progress: 0,
      todayCompleted: false,
      createdAt: Date.now(),
      completionHistory: []
    };

    // Add to habits list
    setHabits(prev => [...prev, newHabitEntry]);

    toast({
      title: "New habit added!",
      description: `"${newHabit}" has been added to your ${selectedCategory} habits.`,
    });

    setNewHabit("");
  };

  const toggleHabitCompletion = (habitId: string) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === habitId) {
        const today = new Date().toDateString();
        const wasCompleted = habit.todayCompleted;
        
        // Update completion history
        const updatedHistory = [...habit.completionHistory];
        const existingEntryIndex = updatedHistory.findIndex(entry => entry.date === today);
        
        if (existingEntryIndex >= 0) {
          updatedHistory[existingEntryIndex].completed = !wasCompleted;
        } else {
          updatedHistory.push({ date: today, completed: !wasCompleted });
        }

        // Calculate new streak
        let newStreak = habit.streak;
        if (!wasCompleted) {
          // Marking as completed - increase streak
          newStreak += 1;
        } else {
          // Unmarking - decrease streak
          newStreak = Math.max(0, newStreak - 1);
        }

        // Calculate progress (last 7 days completion rate)
        const last7Days = updatedHistory.slice(-7);
        const completedDays = last7Days.filter(entry => entry.completed).length;
        const newProgress = Math.round((completedDays / 7) * 100);

        return {
          ...habit,
          todayCompleted: !wasCompleted,
          streak: newStreak,
          progress: newProgress,
          completionHistory: updatedHistory
        };
      }
      return habit;
    }));

    const habit = habits.find(h => h.id === habitId);
    if (habit) {
      toast({
        title: habit.todayCompleted ? "Habit unchecked" : "Great job!",
        description: habit.todayCompleted 
          ? "Habit unchecked for today." 
          : "Habit completed for today. Keep up the momentum!",
      });
    }
  };

  const deleteHabit = (habitId: string) => {
    setHabits(prev => prev.filter(habit => habit.id !== habitId));
    toast({
      title: "Habit deleted",
      description: "The habit has been removed from your tracker.",
    });
  };

  const getCategoryColor = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.color || "bg-gray-500";
  };

  const totalHabits = habits.length;
  const completedToday = habits.filter(h => h.todayCompleted).length;
  const completionRate = Math.round((completedToday / totalHabits) * 100);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold gradient-text">Habit Tracker</h1>
          <p className="text-xl text-muted-foreground">Build positive habits for better mental health</p>
        </div>

        {/* Today's Overview */}
        <Card className="wellness-card-gradient">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Today's Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">{completedToday}/{totalHabits}</div>
                <p className="text-sm text-muted-foreground">Habits Completed</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-secondary">{completionRate}%</div>
                <p className="text-sm text-muted-foreground">Completion Rate</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-tertiary">12</div>
                <p className="text-sm text-muted-foreground">Best Streak</p>
              </div>
            </div>
            <Progress value={completionRate} className="mt-4 h-3" />
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Add New Habit */}
          <Card className="wellness-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-green-500" />
                Add New Habit
              </CardTitle>
              <CardDescription>Create a new positive habit to track</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Habit Name</label>
                <Input
                  placeholder="e.g., Morning journaling"
                  value={newHabit}
                  onChange={(e) => setNewHabit(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className="justify-start"
                    >
                      <div className={`w-3 h-3 rounded-full ${category.color} mr-2`}></div>
                      {category.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Habits: {currentHabitCount}/5</span>
                  {!isPremium && (
                    <Badge variant="secondary" className="text-xs">
                      <Lock className="h-3 w-3 mr-1" />
                      Free Limit
                    </Badge>
                  )}
                </div>
                <Button onClick={handleAddHabit} className="w-full" disabled={!isPremium && currentHabitCount >= 5}>
                  <Plus className="h-4 w-4 mr-2" />
                  {!isPremium && currentHabitCount >= 5 ? "Upgrade for More" : "Add Habit"}
                </Button>
                {!isPremium && currentHabitCount >= 5 && (
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a href="/pricing">
                      <Crown className="h-4 w-4 mr-2" />
                      Upgrade to Premium
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Habit Categories */}
          <Card className="wellness-card lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                Your Habits
              </CardTitle>
              <CardDescription>Track your daily wellness habits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {habits.map((habit) => (
                  <div key={habit.id} className="p-4 rounded-lg border bg-card">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={habit.todayCompleted}
                          onCheckedChange={() => toggleHabitCompletion(habit.id)}
                        />
                        <div>
                          <h4 className="font-medium">{habit.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Target: {habit.target} {habit.unit}/day
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${getCategoryColor(habit.category)}`}></div>
                        <Badge variant="secondary">
                          <Award className="h-3 w-3 mr-1" />
                          {habit.streak} days
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Weekly Progress</span>
                        <span>{habit.progress}%</span>
                      </div>
                      <Progress value={habit.progress} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Premium Features Section - Moved to Bottom */}
        <div className="mt-8 space-y-6">
          {/* Weekly Overview - Premium Feature */}
          <PremiumGuard feature="Advanced Analytics" description="Get detailed insights into your habit patterns and trends">
            <Card className="wellness-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-purple-500" />
                  Weekly Overview
                </CardTitle>
                <CardDescription>Your habit completion patterns this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-4 mb-4">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                    <div key={day} className="text-center">
                      <p className="text-sm font-medium mb-2">{day}</p>
                      <div className="space-y-1">
                        {habits.slice(0, 3).map((habit, habitIndex) => (
                          <div
                            key={habitIndex}
                            className={`h-6 rounded-sm ${
                              Math.random() > 0.3 ? 'bg-green-200' : 'bg-gray-200'
                            }`}
                            title={habit.name}
                          ></div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-200 rounded-sm"></div>
                    <span>Completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-200 rounded-sm"></div>
                    <span>Missed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </PremiumGuard>
        </div>
      </main>
    </div>
  );
};

export default HabitTracker;