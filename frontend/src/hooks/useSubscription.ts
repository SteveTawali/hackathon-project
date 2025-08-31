import { useState, useEffect } from 'react';
import { paymentService, SubscriptionStatus } from '@/services/paymentService';

export const useSubscription = () => {
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscriptionStatus = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('authToken');
      if (!token) {
        setSubscriptionStatus(null);
        setLoading(false);
        return;
      }

      const status = await paymentService.getSubscriptionStatus();
      setSubscriptionStatus(status);
      
      // Update localStorage to keep frontend in sync
      localStorage.setItem('userPlan', status.is_premium ? 'premium' : 'free');
      
    } catch (err) {
      console.error('Failed to fetch subscription status:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch subscription status');
      
      // Fallback to localStorage
      const localPlan = localStorage.getItem('userPlan') || 'free';
      setSubscriptionStatus({
        subscription_status: localPlan,
        is_premium: localPlan === 'premium',
        expires_at: null
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptionStatus();
  }, []);

  const refreshSubscription = () => {
    fetchSubscriptionStatus();
  };

  return {
    subscriptionStatus,
    loading,
    error,
    refreshSubscription,
    isPremium: subscriptionStatus?.is_premium ?? false,
    subscriptionStatusText: subscriptionStatus?.subscription_status ?? 'free'
  };
};
