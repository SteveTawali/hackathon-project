import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Sparkles, Search, Calendar, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";

const Journal = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const journalPrompts = [
    "What are three things you're grateful for today?",
    "Describe a moment when you felt genuinely happy recently.",
    "What challenge are you currently facing, and how are you handling it?",
    "Write about someone who has positively impacted your life.",
    "What self-care activity would benefit you most right now?"
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
    const prompt = journalPrompts[Math.floor(Math.random() * journalPrompts.length)];
    setTitle("Prompted Reflection");
    setContent(`Prompt: ${prompt}\n\n`);
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive": return "bg-green-100 text-green-800";
      case "negative": return "bg-red-100 text-red-800";
      case "neutral": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
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
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-500" />
                Writing Prompts
              </CardTitle>
              <CardDescription>Inspiration for your journal entries</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {journalPrompts.map((prompt, index) => (
                <div 
                  key={index} 
                  className="p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors cursor-pointer"
                  onClick={() => {
                    setTitle("Prompted Reflection");
                    setContent(`Prompt: ${prompt}\n\n`);
                  }}
                >
                  <p className="text-sm">{prompt}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Journal Entries */}
        <Card className="wellness-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-500" />
              Your Journal Entries
            </CardTitle>
            <CardDescription>Review your past reflections and insights</CardDescription>
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
      </main>
    </div>
  );
};

export default Journal;