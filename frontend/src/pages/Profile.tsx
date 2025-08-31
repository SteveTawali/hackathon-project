import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Calendar,
  Shield,
  Settings,
  LogOut,
  Edit,
  Save,
  X,
  Crown,
  Heart,
  BookOpen,
  Target,
  BarChart3,
  Download,
  Eye,
  Bell,
  Check
} from "lucide-react";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";
import { paymentService } from "@/services/paymentService";
import { config } from "@/config";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);

  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Calculate member since data
  const calculateMemberSince = () => {
    const joinTimestamp = localStorage.getItem('userJoinDate');
    if (joinTimestamp) {
      const joinDate = new Date(parseInt(joinTimestamp));
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - joinDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) return 'Today';
      if (diffDays === 1) return 'Yesterday';
      if (diffDays < 7) return `${diffDays} days`;
      if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks`;
      if (diffDays < 365) return `${Math.floor(diffDays / 30)} months`;
      return `${Math.floor(diffDays / 365)} years`;
    }
    return 'Recently';
  };

  const formatJoinDate = () => {
    const joinTimestamp = localStorage.getItem('userJoinDate');
    if (joinTimestamp) {
      const joinDate = new Date(parseInt(joinTimestamp));
      return joinDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long' 
      });
    }
    return 'January 2025';
  };

  // User data
  const [userData, setUserData] = useState({
    name: localStorage.getItem('userName') || 'User',
    email: localStorage.getItem('userEmail') || 'user@example.com',
    joinDate: formatJoinDate(),
    plan: localStorage.getItem('userPlan') === 'premium' ? 'Premium' : 'Free',
    memberSince: calculateMemberSince()
  });

  const [editData, setEditData] = useState({ ...userData });

  // Update user data when component mounts to get fresh member since data
  useEffect(() => {
    setUserData({
      name: localStorage.getItem('userName') || 'User',
      email: localStorage.getItem('userEmail') || 'user@example.com',
      joinDate: formatJoinDate(),
      plan: localStorage.getItem('userPlan') === 'premium' ? 'Premium' : 'Free',
      memberSince: calculateMemberSince()
    });
  }, []);

  // Paystack Configuration
  const config = {
    key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
    email: userData.email,
    amount: 47800, // $2.99 ≈ KSh 478 (478 * 100 cents)
    currency: 'KES',
    ref: new Date().getTime().toString(),
    callback: function(response: any) {
      onSuccess(response);
    },
    onClose: function() {
      onClose();
    }
  };

  // Pricing options based on your pricing page (Kenyan Shilling)
  const pricingOptions = {
    monthly: {
      amount: 47800, // $2.99 ≈ KSh 478
      label: 'KSh 478/month',
      description: 'Monthly Premium Plan'
    },
    annual: {
      amount: 399800, // $24.99 ≈ KSh 3,998
      label: 'KSh 3,998/year',
      description: 'Annual Premium Plan (30% discount)'
    },
    regional: {
      amount: 31800, // $1.99 ≈ KSh 318
      label: 'KSh 318/month',
      description: 'Regional Pricing (African markets)'
    }
  };

  const onSuccess = (reference: any) => {
    setIsProcessingPayment(false);
    localStorage.setItem('userPlan', 'premium');
    setUserData(prev => ({ ...prev, plan: 'Premium' }));
    toast({
      title: "Payment Successful!",
      description: "You have been upgraded to Premium. Welcome!",
    });
  };

  const onClose = () => {
    setIsProcessingPayment(false);
    toast({
      title: "Payment Cancelled",
      description: "You can try again anytime.",
    });
  };

  const handlePayment = () => {
    if (!import.meta.env.VITE_PAYSTACK_PUBLIC_KEY) {
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
      const handler = PaystackPop.setup(config);
      handler.openIframe();
    };
    document.body.appendChild(script);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userPlan');
    navigate('/');
  };

  const handleUpgradeToPremium = () => {
    navigate('/pricing');
    // Scroll to top of the page
    window.scrollTo(0, 0);
  };

  const handleCancelPremium = async () => {
    try {
      await paymentService.cancelSubscription();
      localStorage.setItem('userPlan', 'free');
      setUserData(prev => ({ ...prev, plan: 'Free' }));
      toast({
        title: "Premium Cancelled",
        description: "You have been downgraded to the Free plan. You can upgrade again anytime.",
      });
    } catch (error) {
      console.error('Failed to cancel subscription:', error);
      toast({
        title: "Error",
        description: "Failed to cancel subscription. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setUserData(editData);
      localStorage.setItem('userName', editData.name);
      localStorage.setItem('userEmail', editData.email);
      setIsEditing(false);
      setIsLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    setEditData({ ...userData });
    setIsEditing(false);
  };

  const handlePrivacySettings = () => {
    toast({
      title: "Privacy Settings",
      description: "Privacy settings page will be available soon.",
    });
  };

  const handleEmailPreferences = () => {
    toast({
      title: "Email Preferences",
      description: "Email preferences page will be available soon.",
    });
  };

  const handleExportData = async (format: 'text' | 'csv' = 'text') => {
    setIsExporting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    let exportContent = '';
    let fileName = '';
    let mimeType = '';

    if (format === 'text') {
      exportContent = `MINDWELL - WELLNESS DATA EXPORT\nGenerated on: ${currentDate}\n\nUSER PROFILE\n============\nName: ${userData.name}\nEmail: ${userData.email}\nPlan: ${userData.plan}\nMember Since: ${userData.memberSince}\nJoin Date: ${userData.joinDate}\n\nWELLNESS STATISTICS\n==================\n${stats.map(stat => `${stat.label}: ${stat.value}`).join('\n')}\n\nDATA SUMMARY\n===========\n• Mood Entries: ${stats.find(s => s.label === "Mood Entries")?.value || "0"} entries tracked\n• Journal Entries: ${stats.find(s => s.label === "Journal Entries")?.value || "0"} entries written\n• Habits Tracked: ${stats.find(s => s.label === "Habits Tracked")?.value || "0"} habits monitored\n• Days Active: ${stats.find(s => s.label === "Days Active")?.value || "0"} days on platform\n\nPLAN FEATURES\n============\n${userData.plan} Plan includes:\n${planFeatures[userData.plan as keyof typeof planFeatures]?.map(feature => `• ${feature}`).join('\n') || 'No features listed'}\n\nEXPORT INFORMATION\n=================\nThis export contains your wellness data from MindWell.\nData types included: Mood tracking, Journal entries, Habit progress, Meditation sessions\n\nFor privacy and security:\n• Your data is encrypted and secure\n• This export is for your personal use only\n• Contact support if you need assistance\n\n---\nGenerated by MindWell Mental Wellness Platform`;
      fileName = `mindwell-wellness-report-${new Date().toISOString().split('T')[0]}.txt`;
      mimeType = 'text/plain';
    } else if (format === 'csv') {
      exportContent = `Category,Value\nName,${userData.name}\nEmail,${userData.email}\nPlan,${userData.plan}\nMember Since,${userData.memberSince}\nJoin Date,${userData.joinDate}\n${stats.map(stat => `${stat.label},${stat.value}`).join('\n')}\nExport Date,${currentDate}`;
      fileName = `mindwell-wellness-data-${new Date().toISOString().split('T')[0]}.csv`;
      mimeType = 'text/csv';
    }

    const dataBlob = new Blob([exportContent], { type: mimeType });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setIsExporting(false);
    setShowExportOptions(false);

    const formatNames = {
      text: 'readable text file',
      csv: 'CSV spreadsheet'
    };

    toast({
      title: "Wellness Report Exported!",
      description: `Your wellness data has been downloaded as a ${formatNames[format]}.`,
    });
  };

  const stats = [
    { label: "Mood Entries", value: "24", icon: Heart, color: "text-red-500" },
    { label: "Journal Entries", value: "12", icon: BookOpen, color: "text-blue-500" },
    { label: "Habits Tracked", value: "5", icon: Target, color: "text-green-500" },
    { label: "Days Active", value: "14", icon: BarChart3, color: "text-purple-500" }
  ];

  const planFeatures = {
    Free: [
      "Unlimited basic journaling",
      "Unlimited mood tracking",
      "5 habits tracking",
      "Basic sentiment analysis",
      "2 breathing patterns",
      "Crisis support resources"
    ],
    Premium: [
      "Everything in Free",
      "Unlimited habits",
      "Advanced analytics",
      "Guided meditation library",
      "Export & backup data",
      "Professional integrations",
      "Priority support",
      "Custom themes"
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold gradient-text">Your Profile</h1>
          <p className="text-xl text-muted-foreground">Manage your account and wellness journey</p>
        </div>

        {/* Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button onClick={handleSave} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                  <Button variant="outline" onClick={handleCancel}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{userData.name}</p>
                  </div>
                  <div className="ml-auto">
                    <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{userData.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Member Since</p>
                    <p className="font-medium">{userData.memberSince}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Crown className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Current Plan</p>
                    <p className="font-medium">{userData.plan}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Wellness Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Plan Features */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5" />
              Your Plan: {userData.plan}
            </CardTitle>
            <CardDescription>
              {userData.plan === 'Premium' 
                ? 'You have access to all premium features'
                : 'Upgrade to unlock advanced features and unlimited access'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Current Features:</h4>
              <ul className="space-y-2">
                {planFeatures[userData.plan as keyof typeof planFeatures]?.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              {userData.plan === 'Premium' && (
                <div className="pt-4">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
                    <p className="text-sm text-green-800">
                      ✅ You're currently on the Premium plan with access to all features.
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={handleCancelPremium} 
                    className="w-full border-red-200 text-red-600 hover:bg-red-50"
                    size="lg"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel Premium Subscription
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    You can cancel anytime and downgrade to the Free plan. Your data will be preserved.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Account Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handlePrivacySettings}
            >
              <Shield className="h-4 w-4 mr-2" />
              Privacy Settings
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleEmailPreferences}
            >
              <Bell className="h-4 w-4 mr-2" />
              Email Preferences
            </Button>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => setShowExportOptions(!showExportOptions)}
                disabled={isExporting}
              >
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>

              {showExportOptions && (
                <div className="pl-4 space-y-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-sm"
                    onClick={() => handleExportData('text')}
                    disabled={isExporting}
                  >
                    {isExporting ? (
                      <>
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-primary mr-2"></div>
                        Exporting...
                      </>
                    ) : (
                      <>
                        📄 Text Report (.txt)
                      </>
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-sm"
                    onClick={() => handleExportData('csv')}
                    disabled={isExporting}
                  >
                    📊 CSV Spreadsheet (.csv)
                  </Button>
                </div>
              )}
            </div>
            <Button
              variant="destructive"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </CardContent>
        </Card>


      </main>
    </div>
  );
};

export default Profile;
