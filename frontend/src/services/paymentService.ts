import { API_BASE_URL } from '../config';

export interface PaymentVerificationRequest {
  reference: string;
}

export interface PaymentVerificationResponse {
  message: string;
  subscription_status: string;
  expires_at: string;
}

export interface SubscriptionStatus {
  subscription_status: string;
  is_premium: boolean;
  expires_at: string | null;
}

export interface PaymentHistoryItem {
  id: number;
  reference: string;
  amount: number;
  currency: string;
  status: string;
  created_at: string;
  payment_type: string;
}

export interface PaymentHistoryResponse {
  payments: PaymentHistoryItem[];
}

class PaymentService {
  private baseUrl = `${API_BASE_URL}/api/payment`;

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = localStorage.getItem('authToken');
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async verifyPayment(reference: string): Promise<PaymentVerificationResponse> {
    return this.makeRequest<PaymentVerificationResponse>('/verify-payment', {
      method: 'POST',
      body: JSON.stringify({ reference }),
    });
  }

  async getSubscriptionStatus(): Promise<SubscriptionStatus> {
    return this.makeRequest<SubscriptionStatus>('/subscription-status');
  }

  async cancelSubscription(): Promise<{ message: string; subscription_status: string }> {
    return this.makeRequest<{ message: string; subscription_status: string }>('/cancel-subscription', {
      method: 'POST',
    });
  }

  async getPaymentHistory(): Promise<PaymentHistoryResponse> {
    return this.makeRequest<PaymentHistoryResponse>('/payment-history');
  }
}

export const paymentService = new PaymentService();
