import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle, 
  Shield,
  CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Support",
      description: "support@mindwell.com",
      link: "mailto:support@mindwell.com",
      response: "Within 24 hours"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "+254 722 178 177",
      link: "tel:+254722178177",
      response: "Business hours"
    },
    {
      icon: MapPin,
      title: "Office Location",
      description: "Nairobi, Kenya",
      link: "#",
      response: "By appointment"
    },
    {
      icon: Clock,
      title: "Business Hours",
      description: "Mon-Fri: 9AM-6PM EAT",
      link: "#",
      response: "Weekend support available"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours.",
    });

    setIsSubmitted(true);
    setIsSubmitting(false);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto p-6">
          <Card className="max-w-md mx-auto mt-20">
            <CardContent className="pt-12 pb-12 text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
              <p className="text-muted-foreground mb-6">
                Your message has been sent successfully. We'll get back to you within 24 hours.
              </p>
              <div className="space-y-3">
                <Button asChild className="w-full">
                  <Link to="/">Back to Home</Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setIsSubmitted(false)}
                >
                  Send Another Message
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold gradient-text">Contact Us</h1>
          <p className="text-xl text-muted-foreground">
            Get in touch with our support team. We're here to help you on your wellness journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                Send us a Message
              </CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="How can we help?"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us more about your question or concern..."
                    rows={5}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
                <CardDescription>
                  Choose the best way to reach us based on your needs.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <Icon className="h-5 w-5 text-primary mt-0.5" />
                      <div className="flex-1">
                        <h3 className="font-medium">{info.title}</h3>
                        <p className="text-sm text-muted-foreground">{info.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Response time: {info.response}
                        </p>
                      </div>
                      <Button asChild variant="ghost" size="sm">
                        <Link to={info.link}>
                          Contact
                        </Link>
                      </Button>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Emergency Support */}
            <Card className="border-emergency bg-emergency/5">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="h-6 w-6 text-emergency" />
                  <div>
                    <h3 className="font-semibold text-emergency">Need Immediate Support?</h3>
                    <p className="text-sm text-muted-foreground">
                      If you're in crisis, please use our emergency resources
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link to="/sos">
                      <Shield className="h-4 w-4 mr-2" />
                      Crisis Support
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => window.open('tel:+254722178177', '_self')}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Emergency: +254 722 178 177
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Link */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-3">
                  <h3 className="font-semibold">Looking for Quick Answers?</h3>
                  <p className="text-sm text-muted-foreground">
                    Check our Help Center for frequently asked questions and guides.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/help">
                      Visit Help Center
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Information */}
        <Card className="wellness-card-gradient">
          <CardContent className="pt-12 pb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">We're Here to Support You</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Whether you have questions about our features, need technical support, 
              or want to share feedback, our team is committed to helping you on your 
              mental wellness journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/help">
                  Help Center
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/pricing">
                  View Pricing
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Contact;
