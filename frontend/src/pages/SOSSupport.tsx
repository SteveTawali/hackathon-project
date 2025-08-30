import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Heart, Shield, MessageCircle, Users, ExternalLink, AlertTriangle } from "lucide-react";
import Navigation from "@/components/Navigation";

const SOSSupport = () => {
  const [activeExercise, setActiveExercise] = useState<string | null>(null);

  const emergencyContacts = [
    {
      name: "Kenya Emergency Services",
      number: "999 / 112",
      description: "National emergency hotline",
      type: "emergency"
    },
    {
      name: "Kenya Red Cross Society",
      number: "1199",
      description: "Emergency response and crisis support",
      type: "emergency"
    },
    {
      name: "Befrienders Kenya",
      number: "+254 722 178 177",
      description: "24/7 emotional support and suicide prevention",
      type: "support"
    },
    {
      name: "Mental Health Kenya",
      number: "+254 722 518 497",
      description: "Mental health support and counseling",
      type: "support"
    },
    {
      name: "Kenya Association of Professional Counsellors",
      number: "+254 20 3877195",
      description: "Professional counseling referrals",
      type: "support"
    },
    {
      name: "Samaritans of Kenya",
      number: "+254 722 277 277",
      description: "Confidential emotional support",
      type: "text"
    }
  ];

  const groundingExercises = [
    {
      id: "5-4-3-2-1",
      title: "5-4-3-2-1 Grounding",
      description: "Use your senses to ground yourself",
      steps: [
        "5 things you can see",
        "4 things you can touch",
        "3 things you can hear",
        "2 things you can smell",
        "1 thing you can taste"
      ]
    },
    {
      id: "box-breathing",
      title: "Box Breathing",
      description: "Calm your nervous system",
      steps: [
        "Breathe in for 4 counts",
        "Hold for 4 counts",
        "Breathe out for 4 counts",
        "Hold for 4 counts",
        "Repeat 4-8 times"
      ]
    },
    {
      id: "progressive-muscle",
      title: "Progressive Muscle Relaxation",
      description: "Release physical tension",
      steps: [
        "Tense your toes for 5 seconds, then relax",
        "Tense your calves for 5 seconds, then relax",
        "Tense your thighs for 5 seconds, then relax",
        "Continue up your body to your head",
        "Notice the contrast between tension and relaxation"
      ]
    }
  ];

  const selfCareStrategies = [
    "Take a warm shower or bath",
    "Listen to calming music",
    "Call a trusted friend or family member",
    "Write in your journal",
    "Go for a walk outside",
    "Practice gentle stretching",
    "Watch a comforting movie",
    "Drink a cup of herbal tea",
    "Pet an animal if available",
    "Look at photos that make you smile"
  ];

  const warningSignsResources = [
    {
      title: "When to Seek Immediate Help",
      signs: [
        "Thoughts of suicide or self-harm",
        "Feeling like you're in immediate danger",
        "Severe panic attacks",
        "Complete inability to function",
        "Substance abuse as a coping mechanism"
      ]
    },
    {
      title: "Professional Support Options",
      signs: [
        "Therapists and counselors",
        "Psychiatrists for medication",
        "Support groups",
        "Mental health apps",
        "Employee assistance programs"
      ]
    }
  ];

  const getContactTypeIcon = (type: string) => {
    switch (type) {
      case "emergency": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "text": return <MessageCircle className="h-4 w-4 text-blue-500" />;
      case "support": return <Users className="h-4 w-4 text-green-500" />;
      default: return <Phone className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-emergency">Crisis Support & Resources</h1>
          <p className="text-xl text-muted-foreground">You're not alone. Help is available 24/7.</p>
        </div>

        {/* Emergency Alert */}
        <Card className="border-emergency bg-emergency/10">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 mb-4">
              <AlertTriangle className="h-8 w-8 text-emergency" />
              <div>
                <h3 className="text-lg font-semibold text-emergency">In Crisis? Get Immediate Help</h3>
                <p className="text-sm text-muted-foreground">If you're having thoughts of suicide or self-harm, reach out now.</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Button className="bg-emergency hover:bg-emergency/90" size="lg">
                <Phone className="h-4 w-4 mr-2" />
                Call 999 or 112 - Emergency Services
              </Button>
              <Button variant="outline" className="border-emergency text-emergency" size="lg">
                <MessageCircle className="h-4 w-4 mr-2" />
                Call +254 722 178 177 - Befrienders Kenya
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Emergency Contacts */}
          <Card className="wellness-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-red-500" />
                Emergency Contacts
              </CardTitle>
              <CardDescription>Professional crisis support available 24/7</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="p-4 rounded-lg border bg-card">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium">{contact.name}</h4>
                    {getContactTypeIcon(contact.type)}
                  </div>
                  <p className="text-lg font-mono text-primary mb-1">{contact.number}</p>
                  <p className="text-sm text-muted-foreground">{contact.description}</p>
                  <Button variant="outline" size="sm" className="mt-2 w-full">
                    <ExternalLink className="h-3 w-3 mr-2" />
                    Contact Now
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Grounding Exercises */}
          <Card className="wellness-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-500" />
                Grounding Exercises
              </CardTitle>
              <CardDescription>Techniques to help you feel more centered</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {groundingExercises.map((exercise) => (
                <div key={exercise.id} className="space-y-2">
                  <Button
                    variant={activeExercise === exercise.id ? "default" : "outline"}
                    onClick={() => setActiveExercise(activeExercise === exercise.id ? null : exercise.id)}
                    className="w-full justify-between"
                  >
                    <div className="text-left">
                      <div className="font-medium">{exercise.title}</div>
                      <div className="text-xs text-muted-foreground">{exercise.description}</div>
                    </div>
                  </Button>
                  
                  {activeExercise === exercise.id && (
                    <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                      <h5 className="font-medium">Follow these steps:</h5>
                      <ol className="space-y-1 text-sm">
                        {exercise.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className="flex items-start gap-2">
                            <span className="text-primary font-medium">{stepIndex + 1}.</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Self-Care Strategies */}
        <Card className="wellness-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-pink-500" />
              Self-Care Strategies
            </CardTitle>
            <CardDescription>Gentle activities to help you feel better</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {selfCareStrategies.map((strategy, index) => (
                <div key={index} className="p-3 rounded-lg bg-muted/50 text-sm">
                  {strategy}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Professional Resources */}
        <div className="grid md:grid-cols-2 gap-8">
          {warningSignsResources.map((resource, index) => (
            <Card key={index} className="wellness-card">
              <CardHeader>
                <CardTitle className="text-lg">{resource.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {resource.signs.map((sign, signIndex) => (
                    <li key={signIndex} className="flex items-start gap-2 text-sm">
                      <span className="text-primary">•</span>
                      <span>{sign}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Remember Section */}
        <Card className="wellness-card-gradient text-center">
          <CardContent className="pt-6">
            <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">You Matter</h3>
            <p className="text-lg text-muted-foreground mb-4">
              Your life has value. Your feelings are valid. Recovery is possible.
            </p>
            <p className="text-sm text-muted-foreground">
              Crisis moments are temporary. With support, you can get through this.
            </p>
          </CardContent>
        </Card>

        {/* Contact Us Section */}
        <Card className="wellness-card mt-12">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-center">Contact Us</CardTitle>
            <CardDescription className="text-center">Reach out for further support or questions</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4 max-w-lg mx-auto">
              <div>
                <label htmlFor="name" className="block mb-1 font-medium">Name</label>
                <input id="name" type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Your Name" />
              </div>
              <div>
                <label htmlFor="email" className="block mb-1 font-medium">Email</label>
                <input id="email" type="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Your Email" />
              </div>
              <div>
                <label htmlFor="message" className="block mb-1 font-medium">Message</label>
                <textarea id="message" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" rows={4} placeholder="How can we help?" />
              </div>
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
            <div className="mt-6 text-center text-muted-foreground text-sm">
              <p>Or email us directly: <a href="mailto:support@mindwell.com" className="text-primary hover:underline">support@mindwell.com</a></p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SOSSupport;