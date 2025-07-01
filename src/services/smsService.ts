export interface SMSResponse {
  success: boolean;
  message: string;
  messageId?: string;
}

export interface SMSVerificationResponse {
  success: boolean;
  message: string;
  isValid?: boolean;
}

export const smsService = {
  // Send SMS verification code
  sendVerificationCode: async (phoneNumber: string): Promise<SMSResponse> => {
    return new Promise((resolve) => {
      // Simulate API call delay
      setTimeout(() => {
        // In a real application, this would integrate with SMS providers like:
        // - Twilio
        // - AWS SNS
        // - Azure Communication Services
        // - Polish providers like SMSApi, SerwerSMS, etc.
        
        console.log(`[SMS Service] Sending verification code to ${phoneNumber}`);
        
        // Mock successful response
        resolve({
          success: true,
          message: 'Kod weryfikacyjny został wysłany',
          messageId: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        });
      }, 1500);
    });
  },

  // Verify SMS code
  verifyCode: async (phoneNumber: string, code: string): Promise<SMSVerificationResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`[SMS Service] Verifying code ${code} for ${phoneNumber}`);
        
        // Mock verification - in demo, accept 123456
        const isValid = code === '123456';
        
        resolve({
          success: true,
          message: isValid ? 'Kod został zweryfikowany pomyślnie' : 'Nieprawidłowy kod weryfikacyjny',
          isValid
        });
      }, 1000);
    });
  },

  // Resend verification code
  resendVerificationCode: async (phoneNumber: string): Promise<SMSResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`[SMS Service] Resending verification code to ${phoneNumber}`);
        
        resolve({
          success: true,
          message: 'Kod weryfikacyjny został wysłany ponownie',
          messageId: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        });
      }, 1500);
    });
  },

  // Send notification SMS (for future use)
  sendNotification: async (phoneNumber: string, message: string): Promise<SMSResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`[SMS Service] Sending notification to ${phoneNumber}: ${message}`);
        
        resolve({
          success: true,
          message: 'Powiadomienie zostało wysłane',
          messageId: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        });
      }, 1000);
    });
  },

  // Check SMS service status
  getServiceStatus: async (): Promise<{ available: boolean; provider: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          available: true,
          provider: 'Mock SMS Provider (Demo)'
        });
      }, 500);
    });
  }
};

// SMS Templates for different scenarios
export const smsTemplates = {
  verification: (code: string) => 
    `Twój kod weryfikacyjny do iVi Market: ${code}. Kod jest ważny przez 10 minut.`,
  
  welcome: (firstName: string) => 
    `Witaj ${firstName}! Twoje konto w iVi Market zostało utworzone pomyślnie.`,
  
  vehicleInquiry: (vehicleName: string, buyerName: string) => 
    `Nowe zapytanie o ${vehicleName} od ${buyerName}. Sprawdź szczegóły w aplikacji.`,
  
  priceAlert: (vehicleName: string, price: number) => 
    `Cena ${vehicleName} została obniżona do ${price.toLocaleString('pl-PL')} zł!`
};