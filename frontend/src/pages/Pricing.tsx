import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, Star, Crown, Heart, BookOpen, Target, Timer, BarChart3, Download, Users } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";
import { paymentService } from "@/services/paymentService";
import { config } from "@/config";

const Pricing = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  
  // Check if user is authenticated
  const isAuthenticated = localStorage.getItem('authToken');
  const userPlan = localStorage.getItem('userPlan') || 'free';
  const userEmail = localStorage.getItem('userEmail') || 'user@example.com';
  const freeFeatures = [
    { text: "Unlimited basic journaling", included: true },
    { text: "Unlimited mood tracking history", included: true },
    { text: "5 habits tracking", included: true },
    { text: "Basic sentiment analysis", included: true },
    { text: "2 breathing patterns", included: true },
    { text: "Basic dashboard", included: true },
    { text: "Crisis support resources", included: true },
    { text: "Unlimited habits", included: false },
    { text: "Advanced analytics", included: false },
    { text: "Guided meditation library", included: false },
    { text: "Export/backup features", included: false },
    { text: "Professional integrations", included: false },
  ];

  const premiumFeatures = [
    { text: "Everything in Free", included: true },
    { text: "Unlimited habits", included: true },
    { text: "Advanced analytics & insights", included: true },
    { text: "Guided meditation library", included: true },
    { text: "Export & backup data", included: true },
    { text: "Professional integrations", included: true },
    { text: "Priority support", included: true },
    { text: "Custom themes", included: true },
    { text: "Advanced AI insights", included: true },
  ];

  // Paystack Configuration
  const paystackConfig = {
    key: config.payment.paystackPublicKey,
    email: userEmail,
    amount: config.payment.amount,
    currency: config.payment.currency,
    ref: new Date().getTime().toString(),
    callback: function(response: any) {
      onSuccess(response);
    },
    onClose: function() {
      onClose();
    }
  };

  const onSuccess = async (response: any) => {
    try {
      // Verify payment with backend
      const verificationResult = await paymentService.verifyPayment(response.reference);
      
      setIsProcessingPayment(false);
      localStorage.setItem('userPlan', 'premium');
      
      toast({
        title: "Payment Successful!",
        description: "You have been upgraded to Premium. Welcome!",
      });
      
      // Redirect to dashboard after successful payment
      navigate('/dashboard');
    } catch (error) {
      setIsProcessingPayment(false);
      console.error('Payment verification failed:', error);
      toast({
        title: "Payment Verification Failed",
        description: "Please contact support if you were charged.",
        variant: "destructive",
      });
    }
  };

  const onClose = () => {
    setIsProcessingPayment(false);
    toast({
      title: "Payment Cancelled",
      description: "You can try again anytime.",
    });
  };

  const handlePayment = () => {
    if (!config.payment.paystackPublicKey) {
      toast({
        title: "Configuration Error",
        description: "Payment service is not configured. Please contact support.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessingPayment(true);
    // Use Paystack directly without the hook to avoid configuration issues
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.onload = () => {
      // @ts-ignore
      const handler = PaystackPop.setup(paystackConfig);
      handler.openIframe();
    };
    document.body.appendChild(script);
  };



  const handleAnnualPayment = () => {
    if (!config.payment.paystackPublicKey) {
      toast({
        title: "Configuration Error",
        description: "Payment service is not configured. Please contact support.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessingPayment(true);
    
    // Annual pricing configuration (2499 cents = $24.99)
    const annualConfig = {
      ...paystackConfig,
      amount: 249900, // $24.99 in cents
      ref: new Date().getTime().toString() + '_annual',
    };

    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.onload = () => {
      // @ts-ignore
      const handler = PaystackPop.setup(annualConfig);
      handler.openIframe();
    };
    document.body.appendChild(script);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 sm:space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold">
            {isAuthenticated ? "Your Current Plan" : "Choose Your Plan"}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground">
            {isAuthenticated 
              ? "Review your current plan and explore premium features"
              : "Start your mental wellness journey with our flexible pricing options"
            }
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {/* Free Tier */}
          <Card className="relative">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Heart className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl">Free</CardTitle>
              </div>
              <CardDescription>
                Perfect for getting started with mental wellness
              </CardDescription>
              <div className="text-4xl font-bold mt-4">$0</div>
              <p className="text-muted-foreground">Forever free</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {freeFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    {feature.included ? (
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                    ) : (
                      <X className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    )}
                    <span className={feature.included ? "text-foreground" : "text-muted-foreground"}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
              <Button className="w-full" variant="outline" asChild>
                {isAuthenticated ? (
                  <Link to="/dashboard">Go to Dashboard</Link>
                ) : (
                  <Link to="/register">Get Started Free</Link>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Premium Tier */}
          <Card className="relative border-primary">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-primary text-primary-foreground px-3 py-1">
                <Crown className="h-3 w-3 mr-1" />
                Most Popular
              </Badge>
            </div>
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="h-6 w-6 text-yellow-500" />
                <CardTitle className="text-2xl">Premium</CardTitle>
              </div>
              <CardDescription>
                Advanced features for deeper mental wellness insights
              </CardDescription>
              <div className="text-4xl font-bold mt-4">$2.99</div>
              <p className="text-muted-foreground">per month</p>
              <div className="text-sm text-muted-foreground">
                <span className="line-through">$4.99</span> - 40% off
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {premiumFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-foreground">{feature.text}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full" asChild>
                {isAuthenticated ? (
                  userPlan === 'premium' ? (
                    <Link to="/dashboard">Manage Premium</Link>
                  ) : (
                    <Button onClick={handlePayment} disabled={isProcessingPayment}>
                      {isProcessingPayment ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Crown className="h-4 w-4 mr-2" />
                          Upgrade to Premium
                        </>
                      )}
                    </Button>
                  )
                ) : (
                  <Link to="/register">Start Premium Trial</Link>
                )}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                7-day free trial • Cancel anytime
              </p>
            </CardContent>
          </Card>

          {/* Annual Plan Tier */}
          <Card className="relative border-blue-500">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-blue-500 text-white px-3 py-1">
                💰 Best Value
              </Badge>
            </div>
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="h-6 w-6 text-blue-500" />
                <CardTitle className="text-2xl">Annual</CardTitle>
              </div>
              <CardDescription>
                Save 30% with annual billing
              </CardDescription>
              <div className="text-4xl font-bold mt-4">$24.99</div>
              <p className="text-muted-foreground">per year</p>
              <div className="text-sm text-blue-600 font-medium">
                30% discount • $2.08/month
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <p className="text-sm font-medium text-blue-700">
                  💰 Save $10.89 per year
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Same premium features, better value
                </p>
              </div>
              <ul className="space-y-3">
                {premiumFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-blue-500 flex-shrink-0" />
                    <span className="text-foreground">{feature.text}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                {isAuthenticated ? (
                  userPlan === 'premium' ? (
                    <Link to="/dashboard">Manage Premium</Link>
                  ) : (
                    <Button onClick={handleAnnualPayment} disabled={isProcessingPayment} className="bg-blue-600 hover:bg-blue-700">
                      {isProcessingPayment ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Star className="h-4 w-4 mr-2" />
                          Choose Annual Plan
                        </>
                      )}
                    </Button>
                  )
                ) : (
                  <Link to="/register">Start Annual Trial</Link>
                )}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                7-day free trial • Cancel anytime
              </p>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-2">Can I switch between plans?</h3>
              <p className="text-muted-foreground">
                Yes! You can upgrade to Premium anytime, and downgrade back to Free at any time. Your data is always preserved.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-2">Is my data secure?</h3>
              <p className="text-muted-foreground">
                Absolutely. We use industry-standard encryption and never share your personal data with third parties.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-2">What's included in the free trial?</h3>
              <p className="text-muted-foreground">
                The 7-day free trial gives you full access to all Premium features. No credit card required to start.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-2">Do you offer refunds?</h3>
              <p className="text-muted-foreground">
                Yes, we offer a 30-day money-back guarantee. If you're not satisfied, we'll refund your payment.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">
            {isAuthenticated ? "Continue Your Wellness Journey" : "Ready to Start Your Wellness Journey?"}
          </h2>
          <p className="text-muted-foreground">
            {isAuthenticated
              ? "Keep tracking your progress and explore premium features to enhance your experience"
              : "Join thousands of users who are already improving their mental health with MindWell"
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <>
                <Button size="lg" asChild>
                  <Link to="/dashboard">Go to Dashboard</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/profile">View Profile</Link>
                </Button>
              </>
            ) : (
              <>
                <Button size="lg" asChild>
                  <Link to="/register">Get Started Free</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/">Learn More</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Pricing;
