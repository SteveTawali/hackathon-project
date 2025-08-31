import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RotateCcw, Timer, Heart, Wind, Crown, Lock, Headphones, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import PremiumGuard from "@/components/PremiumGuard";

const Meditation = () => {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes default
  const [selectedDuration, setSelectedDuration] = useState(300);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale' | 'hold2'>('inhale');
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathingPattern, setBreathingPattern] = useState('4-4-4-4');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const breathingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  // Check if user is premium
  const isPremium = localStorage.getItem('userPlan') === 'premium';

  const durations = [
    { label: "5 min", value: 300 },
    { label: "10 min", value: 600 },
    { label: "15 min", value: 900 },
    { label: "20 min", value: 1200 },
    { label: "30 min", value: 1800 }
  ];

  const breathingPatterns = [
    { label: "4-4-4-4 (Box)", value: "4-4-4-4", description: "Equal breathing", premium: false },
    { label: "4-7-8", value: "4-7-8", description: "Relaxing breath", premium: false },
    { label: "6-2-6-2", value: "6-2-6-2", description: "Calming rhythm", premium: true },
    { label: "5-5-5-5", value: "5-5-5-5", description: "Extended box", premium: true },
    { label: "8-4-8-4", value: "8-4-8-4", description: "Deep relaxation", premium: true }
  ];

  const guidedMeditations = [
    { title: "Morning Mindfulness", duration: "10 min", category: "Mindfulness", premium: true },
    { title: "Stress Relief", duration: "15 min", category: "Relaxation", premium: true },
    { title: "Sleep Preparation", duration: "20 min", category: "Sleep", premium: true },
    { title: "Anxiety Relief", duration: "12 min", category: "Anxiety", premium: true },
    { title: "Self-Compassion", duration: "18 min", category: "Compassion", premium: true }
  ];

  const getPatternTiming = (pattern: string) => {
    const [inhale, hold1, exhale, hold2] = pattern.split('-').map(Number);
    return { inhale: inhale * 1000, hold1: hold1 * 1000, exhale: exhale * 1000, hold2: hold2 * 1000 };
  };

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      toast({
        title: "Meditation Complete! 🧘‍♀️",
        description: "Well done! Take a moment to notice how you feel.",
      });
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, timeLeft, toast]);

  useEffect(() => {
    if (breathingActive) {
      const timing = getPatternTiming(breathingPattern);
      const phases = [
        { phase: 'inhale', duration: timing.inhale },
        { phase: 'hold', duration: timing.hold1 },
        { phase: 'exhale', duration: timing.exhale },
        { phase: 'hold2', duration: timing.hold2 }
      ];
      
      let currentPhaseIndex = 0;
      
      const cycleBreathing = () => {
        const currentPhase = phases[currentPhaseIndex];
        setBreathingPhase(currentPhase.phase as any);
        
        breathingIntervalRef.current = setTimeout(() => {
          currentPhaseIndex = (currentPhaseIndex + 1) % phases.length;
          cycleBreathing();
        }, currentPhase.duration);
      };
      
      cycleBreathing();
    }

    return () => {
      if (breathingIntervalRef.current) clearTimeout(breathingIntervalRef.current);
    };
  }, [breathingActive, breathingPattern]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(selectedDuration);
  };

  const selectDuration = (duration: number) => {
    setSelectedDuration(duration);
    setTimeLeft(duration);
    setIsActive(false);
  };

  const toggleBreathing = () => {
    setBreathingActive(!breathingActive);
    if (!breathingActive) {
      toast({
        title: "Breathing Exercise Started",
        description: "Follow the circle and breathe naturally.",
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getBreathingText = () => {
    switch (breathingPhase) {
      case 'inhale': return 'Breathe In';
      case 'hold': return 'Hold';
      case 'exhale': return 'Breathe Out';
      case 'hold2': return 'Hold';
      default: return 'Breathe';
    }
  };

  const progress = ((selectedDuration - timeLeft) / selectedDuration) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold gradient-text">Meditation & Breathing</h1>
          <p className="text-xl text-muted-foreground">Find peace and calm your mind</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Breathing Exercise */}
          <Card className="wellness-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wind className="h-5 w-5 text-blue-500" />
                Breathing Exercise
              </CardTitle>
              <CardDescription>Follow the guided breathing pattern</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Breathing Pattern Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Breathing Pattern</label>
                <div className="grid gap-2">
                  {breathingPatterns.map((pattern) => (
                    <div key={pattern.value} className="relative">
                      <Button
                        variant={breathingPattern === pattern.value ? "default" : "outline"}
                        onClick={() => {
                          if (pattern.premium && !isPremium) {
                            toast({
                              title: "Premium Feature",
                              description: "This breathing pattern is available for Premium users only.",
                              variant: "destructive"
                            });
                            return;
                          }
                          setBreathingPattern(pattern.value);
                        }}
                        className="justify-between h-auto p-3 w-full"
                        disabled={pattern.premium && !isPremium}
                      >
                        <div className="text-left">
                          <div className="font-medium">{pattern.label}</div>
                          <div className="text-xs text-muted-foreground">{pattern.description}</div>
                        </div>
                        {pattern.premium && (
                          <Badge variant="secondary" className="text-xs">
                            <Crown className="h-3 w-3 mr-1" />
                            Premium
                          </Badge>
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
                {!isPremium && (
                  <p className="text-xs text-muted-foreground">
                    Free users get 2 breathing patterns. Upgrade to Premium for 5 advanced patterns.
                  </p>
                )}
              </div>

              {/* Breathing Circle */}
              <div className="flex flex-col items-center space-y-6">
                <div className="relative flex items-center justify-center">
                  <div 
                    className={`breathing-circle w-32 h-32 flex items-center justify-center ${
                      breathingPhase === 'inhale' ? 'scale-130' : 
                      breathingPhase === 'exhale' ? 'scale-75' : 'scale-100'
                    }`}
                  >
                    <div className="text-white font-medium text-center">
                      <div className="text-lg">{getBreathingText()}</div>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={toggleBreathing}
                  size="lg"
                  variant={breathingActive ? "destructive" : "default"}
                >
                  {breathingActive ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                  {breathingActive ? "Stop Breathing" : "Start Breathing"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Meditation Timer */}
          <Card className="wellness-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Timer className="h-5 w-5 text-purple-500" />
                Meditation Timer
              </CardTitle>
              <CardDescription>Set a timer for your meditation session</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Duration Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Session Duration</label>
                <div className="grid grid-cols-5 gap-2">
                  {durations.map((duration) => (
                    <Button
                      key={duration.value}
                      variant={selectedDuration === duration.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => selectDuration(duration.value)}
                    >
                      {duration.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Timer Display */}
              <div className="text-center space-y-4">
                <div className="text-6xl font-mono font-bold text-primary">
                  {formatTime(timeLeft)}
                </div>
                <Progress value={progress} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  {Math.round(progress)}% complete
                </p>
              </div>

              {/* Timer Controls */}
              <div className="flex gap-3">
                <Button onClick={toggleTimer} size="lg" className="flex-1">
                  {isActive ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                  {isActive ? "Pause" : "Start"}
                </Button>
                <Button onClick={resetTimer} variant="outline" size="lg">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Meditation Stats */}
        <Card className="wellness-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              Your Meditation Journey
            </CardTitle>
            <CardDescription>Track your mindfulness practice</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-primary">7</div>
                <p className="text-sm text-muted-foreground">Days Streak</p>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-secondary">42</div>
                <p className="text-sm text-muted-foreground">Total Sessions</p>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-tertiary">8.5h</div>
                <p className="text-sm text-muted-foreground">Time Meditated</p>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-accent">12min</div>
                <p className="text-sm text-muted-foreground">Average Session</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Guided Meditation Library - Premium Feature */}
        <PremiumGuard feature="Guided Meditation Library" description="Access professional guided meditations for different needs">
          <Card className="wellness-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Headphones className="h-5 w-5 text-purple-500" />
                Guided Meditations
              </CardTitle>
              <CardDescription>Professional guided sessions for different needs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {guidedMeditations.map((meditation, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:shadow-medium transition-shadow cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{meditation.title}</h4>
                      <Badge variant="secondary" className="text-xs">
                        <Crown className="h-3 w-3 mr-1" />
                        Premium
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{meditation.category}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{meditation.duration}</span>
                      <Button size="sm" variant="outline">
                        <Play className="h-3 w-3 mr-1" />
                        Start
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </PremiumGuard>

        {/* Meditation Tips */}
        <Card className="wellness-card">
          <CardHeader>
            <CardTitle>Meditation Tips</CardTitle>
            <CardDescription>Make the most of your practice</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium">For Beginners</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Start with just 5 minutes daily</li>
                  <li>• Find a quiet, comfortable space</li>
                  <li>• Focus on your breath, not emptying your mind</li>
                  <li>• It's normal for thoughts to wander</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium">Benefits</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Reduced anxiety and stress</li>
                  <li>• Improved focus and concentration</li>
                  <li>• Better emotional regulation</li>
                  <li>• Enhanced self-awareness</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Meditation;