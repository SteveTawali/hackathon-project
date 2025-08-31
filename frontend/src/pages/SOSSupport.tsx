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
      name: "Befrienders Kenya",
      number: "+254 722 178 177",
      description: "24/7 suicide prevention & emotional support",
      type: "emergency"
    },
    {
      name: "Nairobi Women's Hospital",
      number: "+254 20 272 6000",
      description: "Mental health crisis support",
      type: "emergency"
    },
    {
      name: "Kenya Red Cross",
      number: "+254 20 395 0000",
      description: "Emergency support & crisis intervention",
      type: "support"
    },
    {
      name: "Mental Health Kenya",
      number: "+254 700 000 000",
      description: "Mental health information & referrals",
      type: "support"
    },
    {
      name: "Crisis Text Line Kenya",
      number: "Text HOME to 741741",
      description: "Text-based crisis support",
      type: "text"
    }
  ];

  const groundingExercises = [
    {
      id: "5-4-3-2-1",
      title: "5-4-3-2-1 Grounding",
      description: "Use your senses to stay present",
      steps: [
        "Name 5 things you can see",
        "Name 4 things you can touch",
        "Name 3 things you can hear",
        "Name 2 things you can smell",
        "Name 1 thing you can taste"
      ]
    },
    {
      id: "breathing",
      title: "4-7-8 Breathing",
      description: "Calm your nervous system",
      steps: [
        "Breathe in for 4 counts",
        "Hold for 7 counts",
        "Breathe out for 8 counts",
        "Repeat 4 times"
      ]
    },
    {
      id: "progressive",
      title: "Progressive Muscle Relaxation",
      description: "Release physical tension",
      steps: [
        "Tense your toes for 5 seconds",
        "Release and feel the relaxation",
        "Move up to your calves",
        "Continue through your body",
        "End with your face and head"
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
      case 'emergency':
        return <Phone className="h-4 w-4" />;
      case 'text':
        return <MessageCircle className="h-4 w-4" />;
      case 'support':
        return <Users className="h-4 w-4" />;
      default:
        return <Phone className="h-4 w-4" />;
    }
  };

  const handleCall = (number: string, name: string) => {
    // Remove any non-numeric characters except + for phone numbers
    const cleanNumber = number.replace(/[^\d+]/g, '');
    
    if (number.includes('Text')) {
      // For text-based support, show instructions
      alert(`To use ${name}:\n\n${number}\n\nThis will connect you to a crisis counselor via text message.`);
    } else {
      // For phone calls, use tel: protocol
      window.open(`tel:${cleanNumber}`, '_self');
    }
  };

  const handleEmergencyCall = () => {
    const number = "+254 722 178 177";
    const name = "Befrienders Kenya";
    handleCall(number, name);
  };

  const handleTextSupport = () => {
    const number = "Text HOME to 741741";
    const name = "Crisis Text Line Kenya";
    handleCall(number, name);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-emergency">Crisis Support & Resources</h1>
          <p className="text-lg sm:text-xl text-muted-foreground">You're not alone. Help is available 24/7 in Kenya.</p>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <Button 
                className="bg-emergency hover:bg-emergency/90 w-full" 
                size="lg"
                onClick={handleEmergencyCall}
              >
                <Phone className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Call Befrienders Kenya: +254 722 178 177</span>
                <span className="sm:hidden">Call Now</span>
              </Button>
              <Button 
                variant="outline" 
                className="border-emergency text-emergency w-full" 
                size="lg"
                onClick={handleTextSupport}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Text HOME to 741741</span>
                <span className="sm:hidden">Text Support</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Emergency Contacts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Emergency Contacts
              </CardTitle>
              <CardDescription>
                Professional help available 24/7 in Kenya
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getContactTypeIcon(contact.type)}
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-muted-foreground">{contact.description}</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleCall(contact.number, contact.name)}
                  >
                    {contact.type === 'text' ? 'Text' : 'Call'}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Grounding Exercises */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Grounding Exercises
              </CardTitle>
              <CardDescription>
                Techniques to help you stay present and calm
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {groundingExercises.map((exercise) => (
                <div key={exercise.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{exercise.title}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setActiveExercise(activeExercise === exercise.id ? null : exercise.id)}
                    >
                      {activeExercise === exercise.id ? 'Hide' : 'Show Steps'}
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{exercise.description}</p>
                  {activeExercise === exercise.id && (
                    <ol className="text-sm space-y-1 mt-3">
                      {exercise.steps.map((step, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary font-medium">{index + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
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
      </main>
    </div>
  );
};

export default SOSSupport;