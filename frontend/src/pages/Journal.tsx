import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Sparkles, Search, Calendar, Heart, Crown, Lock, Download, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import PremiumGuard from "@/components/PremiumGuard";

const Journal = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [promptsUsed, setPromptsUsed] = useState(0);
  const { toast } = useToast();

  // Check if user is premium
  const isPremium = localStorage.getItem('userPlan') === 'premium';
  const freePromptLimit = 3; // Free users get 3 prompts per day

  const journalPrompts = [
    "What are three things you're grateful for today?",
    "Describe a moment when you felt genuinely happy recently.",
    "What challenge are you currently facing, and how are you handling it?",
    "Write about someone who has positively impacted your life.",
    "What self-care activity would benefit you most right now?",
    "Reflect on a recent accomplishment and how it made you feel.",
    "What would you tell your younger self about mental health?",
    "Describe a time when you overcame a difficult situation.",
    "What does self-compassion mean to you?",
    "How do you practice mindfulness in your daily life?"
  ];

  const entries = [
    {
      id: 1,
      title: "Morning Reflections",
      content: "Started the day with meditation and felt more centered than usual. The breathing exercises really helped...",
      date: "Today",
      sentiment: "positive",
      wordCount: 245
    },
    {
      id: 2,
      title: "Gratitude Practice",
      content: "Grateful for my family's support during this transition. It's amazing how much their encouragement means...",
      date: "Yesterday",
      sentiment: "positive",
      wordCount: 189
    },
    {
      id: 3,
      title: "Processing Change",
      content: "Change is difficult, but I'm learning to embrace uncertainty as part of growth. Every day brings new lessons...",
      date: "2 days ago",
      sentiment: "neutral",
      wordCount: 156
    }
  ];

  const handleSaveEntry = () => {
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Please fill in all fields",
        description: "Both title and content are required for your journal entry.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Journal entry saved!",
      description: "Your thoughts have been recorded safely.",
    });

    // Reset form
    setTitle("");
    setContent("");
  };

  const getRandomPrompt = () => {
    // Check if user can use more prompts
    if (!isPremium && promptsUsed >= freePromptLimit) {
      toast({
        title: "Prompt limit reached",
        description: "Free users get 3 prompts per day. Upgrade to Premium for unlimited prompts!",
        variant: "destructive"
      });
      return;
    }

    const prompt = journalPrompts[Math.floor(Math.random() * journalPrompts.length)];
    setTitle("Prompted Reflection");
    setContent(`Prompt: ${prompt}\n\n`);
    
    // Increment prompt usage for free users
    if (!isPremium) {
      setPromptsUsed(prev => prev + 1);
    }
  };

  const handleUsePrompt = (prompt: string) => {
    // Check if user can use more prompts
    if (!isPremium && promptsUsed >= freePromptLimit) {
      toast({
        title: "Prompt limit reached",
        description: "Free users get 3 prompts per day. Upgrade to Premium for unlimited prompts!",
        variant: "destructive"
      });
      return;
    }

    setTitle("Prompted Reflection");
    setContent(`Prompt: ${prompt}\n\n`);
    
    // Increment prompt usage for free users
    if (!isPremium) {
      setPromptsUsed(prev => prev + 1);
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive": return "bg-green-100 text-green-800";
      case "negative": return "bg-red-100 text-red-800";
      case "neutral": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleExportData = () => {
    if (!isPremium) {
      toast({
        title: "Premium Feature",
        description: "Export functionality is available for Premium users only.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Exporting data...",
      description: "Your journal entries are being prepared for download.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold gradient-text">Journal</h1>
          <p className="text-xl text-muted-foreground">Reflect, process, and grow through writing</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Journal Entry Form */}
          <Card className="wellness-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-500" />
                New Journal Entry
              </CardTitle>
              <CardDescription>Write about your thoughts, feelings, and experiences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* AI Prompt Button */}
              <Button 
                variant="outline" 
                onClick={getRandomPrompt}
                className="w-full"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Get Writing Prompt
              </Button>

              {/* Title Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Entry Title</label>
                <Input
                  placeholder="Give your entry a title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Content Textarea */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Thoughts</label>
                <Textarea
                  placeholder="What's on your mind today? Write freely..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[200px]"
                />
                <p className="text-xs text-muted-foreground">
                  {content.split(' ').filter(word => word.length > 0).length} words
                </p>
              </div>

              {/* Save Button */}
              <Button onClick={handleSaveEntry} className="w-full" size="lg">
                <Heart className="h-4 w-4 mr-2" />
                Save Entry
              </Button>
            </CardContent>
          </Card>

          {/* Writing Prompts */}
          <Card className="wellness-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-500" />
                    Writing Prompts
                  </CardTitle>
                  <CardDescription>Inspiration for your journal entries</CardDescription>
                </div>
                {!isPremium && (
                  <Badge variant="secondary" className="text-xs">
                    {promptsUsed}/{freePromptLimit} used
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                {journalPrompts.slice(0, isPremium ? journalPrompts.length : 5).map((prompt, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors cursor-pointer ${
                      !isPremium && promptsUsed >= freePromptLimit ? 'opacity-50' : ''
                    }`}
                    onClick={() => handleUsePrompt(prompt)}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm">{prompt}</p>
                      {!isPremium && index >= 3 && (
                        <Crown className="h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {!isPremium && (
                <div className="text-center pt-2">
                  <p className="text-xs text-muted-foreground mb-2">
                    Free users get 3 prompts per day. Upgrade for unlimited access to all prompts.
                  </p>
                  <Button size="sm" variant="outline" asChild>
                    <a href="/pricing">
                      <Crown className="h-4 w-4 mr-2" />
                      Upgrade to Premium
                    </a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Journal Entries */}
        <Card className="wellness-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-green-500" />
                  Your Journal Entries
                </CardTitle>
                <CardDescription>Review your past reflections and insights</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleExportData}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                {!isPremium && (
                  <Badge variant="secondary" className="text-xs">
                    <Lock className="h-3 w-3 mr-1" />
                    Premium
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search your entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Entries List */}
            <div className="space-y-4">
              {entries.map((entry) => (
                <div key={entry.id} className="p-6 rounded-lg border bg-card hover:shadow-medium transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold">{entry.title}</h3>
                    <div className="flex items-center gap-2">
                      <Badge className={getSentimentColor(entry.sentiment)}>
                        {entry.sentiment}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{entry.date}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-3">{entry.content}</p>
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>{entry.wordCount} words</span>
                    <Button variant="ghost" size="sm">Read More</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Advanced Analytics - Premium Feature */}
        <PremiumGuard feature="Advanced Journal Analytics" description="Get deep insights into your writing patterns and emotional trends">
          <Card className="wellness-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-500" />
                Writing Analytics
              </CardTitle>
              <CardDescription>Advanced insights into your journaling patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-2">12</div>
                  <div className="text-sm text-muted-foreground">Entries This Month</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-500 mb-2">85%</div>
                  <div className="text-sm text-muted-foreground">Positive Sentiment</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-500 mb-2">245</div>
                  <div className="text-sm text-muted-foreground">Avg Words/Entry</div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">AI Insights</h4>
                <p className="text-sm text-muted-foreground">
                  Your writing shows a strong focus on gratitude and personal growth. 
                  Consider exploring deeper emotional themes in your next entries.
                </p>
              </div>
            </CardContent>
          </Card>
        </PremiumGuard>
      </main>
    </div>
  );
};

export default Journal;