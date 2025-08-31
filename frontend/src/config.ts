export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://hackathon-project-production-d817.up.railway.app';

export const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

export const config = {
  api: {
    baseUrl: API_BASE_URL,
    timeout: 10000,
  },
  payment: {
    paystackPublicKey: PAYSTACK_PUBLIC_KEY,
    currency: 'KES',
    amount: 47800, // KSh 478.00 in kobo
  },
  features: {
    enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    enableDebugMode: import.meta.env.VITE_ENABLE_DEBUG_MODE === 'true',
  },
};
