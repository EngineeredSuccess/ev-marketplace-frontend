export interface SMSResponse {
success: boolean;
code?: string;
expiresAt?: Date;
error?: string;
}

export class SMSService {
private static generateVerificationCode(): string {
return Math.floor(100000 + Math.random() * 900000).toString();
}

static async sendVerificationCode(phoneNumber: string): Promise<SMSResponse> {
try {
// Simulate network delay
await new Promise(resolve => setTimeout(resolve, 2000));

```
  const code = this.generateVerificationCode();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
  
  // In development, log the code
  console.log(`SMS Code sent to ${phoneNumber}: ${code}`);
  
  // In a real app, this would call an SMS API like Twilio
  // await twilioClient.messages.create({
  //   body: `Twój kod weryfikacyjny: ${code}`,
  //   from: '+48XXXXXXXXX',
  //   to: phoneNumber
  // });
  
  return {
    success: true,
    code,
    expiresAt
  };
} catch (error) {
  return {
    success: false,
    error: 'Nie udało się wysłać kodu SMS'
  };
}
```

}

static isCodeExpired(expiresAt: Date): boolean {
return new Date() > expiresAt;
}
}