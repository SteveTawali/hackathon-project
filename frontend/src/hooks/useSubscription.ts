import { useState, useEffect } from 'react';

interface Subscription {
  id: string;
  status: 'active' | 'inactive' | 'cancelled';
  plan: 'basic' | 'premium';
  startDate: string;
  endDate: string;
}

export function useSubscription() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setSubscription(null);
          setLoading(false);
          return;
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/payment/subscription`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSubscription(data.subscription);
        } else {
          setSubscription(null);
        }
      } catch (err) {
        setError('Failed to fetch subscription');
        setSubscription(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, []);

  const isPremium = subscription?.status === 'active' && subscription?.plan === 'premium';

  return {
    subscription,
    loading,
    error,
    isPremium,
  };
}
