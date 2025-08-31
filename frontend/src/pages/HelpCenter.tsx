import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  HelpCircle, 
  MessageCircle, 
  Mail, 
  Phone, 
  Shield, 
  BookOpen, 
  Target, 
  Heart,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

const HelpCenter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I start tracking my mood?",
      answer: "Navigate to the Mood page from the main menu. You can log your daily mood using our simple 5-point scale, from very sad to very happy. Your mood history is saved and you can view trends over time."
    },
    {
      question: "Is my journal data private and secure?",
      answer: "Yes, your journal entries are completely private and encrypted. We use industry-standard security measures to protect your personal information. Only you can access your journal entries."
    },
    {
      question: "How many habits can I track on the free plan?",
      answer: "Free users can track up to 5 habits. Premium users get unlimited habit tracking with advanced analytics and insights."
    },
    {
      question: "What meditation features are available?",
      answer: "We offer guided breathing exercises and meditation timers. Premium users get access to our full library of guided meditations and advanced features."
    },
    {
      question: "How do I upgrade to Premium?",
      answer: "Visit the Pricing page to see our plans. You can upgrade anytime from your Profile page. We offer monthly ($2.99) and annual ($24.99) plans with regional pricing for African markets."
    },
    {
      question: "What if I'm in crisis and need immediate help?",
      answer: "If you're in crisis, please visit our SOS Support page immediately. We provide direct links to crisis hotlines and emergency resources. Remember, you're not alone and help is always available."
    }
  ];

  const supportChannels = [
    {
      title: "Crisis Support",
      description: "24/7 emergency mental health support",
      icon: Shield,
      link: "/sos",
      urgent: true
    },
    {
      title: "Email Support",
      description: "Get help via email within 24 hours",
      icon: Mail,
      link: "mailto:support@mindwell.com",
      urgent: false
    },
    {
      title: "Phone Support",
      description: "Call us during business hours",
      icon: Phone,
      link: "tel:+254722178177",
      urgent: false
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold gradient-text">Help Center</h1>
          <p className="text-xl text-muted-foreground">Find answers to your questions and get the support you need</p>
        </div>

        {/* Search */}
        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search for help articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4">
          {supportChannels.map((channel, index) => {
            const Icon = channel.icon;
            return (
              <Card key={index} className={channel.urgent ? "border-emergency bg-emergency/5" : ""}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className={`h-6 w-6 ${channel.urgent ? 'text-emergency' : 'text-primary'}`} />
                    <div>
                      <h3 className={`font-semibold ${channel.urgent ? 'text-emergency' : ''}`}>
                        {channel.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{channel.description}</p>
                    </div>
                  </div>
                  <Button 
                    asChild 
                    variant={channel.urgent ? "default" : "outline"}
                    className={channel.urgent ? "bg-emergency hover:bg-emergency/90" : ""}
                  >
                    <Link to={channel.link}>
                      {channel.urgent ? "Get Help Now" : "Contact"}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              Frequently Asked Questions
            </CardTitle>
            <CardDescription>
              Find answers to common questions about MindWell
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <div key={index} className="border rounded-lg">
                <button
                  className="w-full p-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <span className="font-medium">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-4 pb-4 text-muted-foreground">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Feature Guides */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-3">
                <Heart className="h-8 w-8 text-red-500 mx-auto" />
                <h3 className="font-semibold">Mood Tracking</h3>
                <p className="text-sm text-muted-foreground">Learn how to track and understand your emotional patterns</p>
                <Button asChild variant="outline" size="sm">
                  <Link to="/mood">Try It</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-3">
                <BookOpen className="h-8 w-8 text-blue-500 mx-auto" />
                <h3 className="font-semibold">Journaling</h3>
                <p className="text-sm text-muted-foreground">Discover the power of reflective writing</p>
                <Button asChild variant="outline" size="sm">
                  <Link to="/journal">Try It</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-3">
                <Target className="h-8 w-8 text-green-500 mx-auto" />
                <h3 className="font-semibold">Habit Tracking</h3>
                <p className="text-sm text-muted-foreground">Build healthy habits and track your progress</p>
                <Button asChild variant="outline" size="sm">
                  <Link to="/habits">Try It</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-3">
                <MessageCircle className="h-8 w-8 text-purple-500 mx-auto" />
                <h3 className="font-semibold">Meditation</h3>
                <p className="text-sm text-muted-foreground">Find peace with guided breathing and meditation</p>
                <Button asChild variant="outline" size="sm">
                  <Link to="/meditation">Try It</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Section */}
        <Card className="wellness-card-gradient">
          <CardContent className="pt-12 pb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Our support team is here to help you on your wellness journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/contact">
                  Contact Support
                  <Mail className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/sos">
                  Crisis Support
                  <Shield className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default HelpCenter;
