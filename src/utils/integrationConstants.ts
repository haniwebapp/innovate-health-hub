
export const INTEGRATION_CATEGORIES = [
  { id: "api", name: "APIs", description: "FHIR, HL7, REST APIs" },
  { id: "communication", name: "Communication", description: "SMS, WhatsApp, Email" },
  { id: "payment", name: "Payments", description: "Stripe, PayPal, SADAD" },
  { id: "auth", name: "Authentication", description: "National ID, OAuth2, SSO" },
  { id: "storage", name: "Storage & Files", description: "Supabase, AWS S3, Dropbox" },
  { id: "analytics", name: "Analytics", description: "Redash, Metabase, Google Analytics" },
  { id: "ai", name: "AI & NLP", description: "OpenAI, Hugging Face, Custom Models" },
  { id: "meetings", name: "Meetings", description: "Zoom, Teams, Jitsi" }
];

export const MOCK_INTEGRATIONS = {
  api: [
    { id: "fhir", name: "FHIR API", connected: true, endpoint: "https://fhir.example.org/api/v1" },
    { id: "hl7", name: "HL7 Interface", connected: false, endpoint: "https://hl7.example.org" },
    { id: "rest", name: "Custom REST API", connected: true, endpoint: "https://api.example.org/v2" },
  ],
  communication: [
    { id: "twilio", name: "Twilio SMS", connected: true, endpoint: "https://api.twilio.com" },
    { id: "whatsapp", name: "WhatsApp Business", connected: false, endpoint: "https://graph.facebook.com" },
    { id: "email", name: "Email Service", connected: true, endpoint: "https://api.sendgrid.com" },
  ],
  payment: [
    { id: "stripe", name: "Stripe", connected: true, endpoint: "https://api.stripe.com" },
    { id: "paypal", name: "PayPal", connected: false, endpoint: "https://api.paypal.com" },
    { id: "sadad", name: "SADAD", connected: true, endpoint: "https://api.sadad.com" },
  ],
  auth: [
    { id: "oauth", name: "OAuth2 Provider", connected: true, endpoint: "https://auth.example.org" },
    { id: "sso", name: "Single Sign-On", connected: false, endpoint: "https://sso.example.org" },
    { id: "nationalid", name: "National ID (Absher)", connected: true, endpoint: "https://api.absher.sa" },
  ],
  storage: [
    { id: "supabase", name: "Supabase Storage", connected: true, endpoint: "https://supabase.co" },
    { id: "s3", name: "AWS S3", connected: false, endpoint: "https://s3.amazonaws.com" },
    { id: "dropbox", name: "Dropbox", connected: true, endpoint: "https://api.dropbox.com" },
  ],
  analytics: [
    { id: "redash", name: "Redash", connected: true, endpoint: "https://redash.example.org" },
    { id: "metabase", name: "Metabase", connected: false, endpoint: "https://metabase.example.org" },
    { id: "ga", name: "Google Analytics", connected: true, endpoint: "https://analytics.google.com" },
  ],
  ai: [
    { id: "openai", name: "OpenAI", connected: true, endpoint: "https://api.openai.com" },
    { id: "huggingface", name: "Hugging Face", connected: false, endpoint: "https://api.huggingface.co" },
    { id: "customai", name: "Custom AI Model", connected: true, endpoint: "https://ai.example.org" },
  ],
  meetings: [
    { id: "zoom", name: "Zoom", connected: true, endpoint: "https://api.zoom.us" },
    { id: "teams", name: "Microsoft Teams", connected: false, endpoint: "https://graph.microsoft.com" },
    { id: "jitsi", name: "Jitsi Meet", connected: true, endpoint: "https://meet.jit.si" },
  ],
};

export interface Integration {
  id: string;
  name: string;
  connected: boolean;
  endpoint: string;
}

export interface Log {
  id: string;
  timestamp: string;
  status: "success" | "error" | "info";
  message: string;
  details?: string;
}

export const generateMockLogs = (count: number): Log[] => {
  const statuses: ("success" | "error" | "info")[] = ["success", "error", "info"];
  const now = new Date();
  
  return Array.from({ length: count }).map((_, index) => {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const timestamp = new Date(now.getTime() - (index * 600000)).toISOString(); // 10 minutes apart
    
    return {
      id: `log-${index}`,
      timestamp,
      status,
      message: status === "success" 
        ? "Request completed successfully" 
        : status === "error" 
          ? "Error processing request" 
          : "Connection established",
      details: status === "error" 
        ? "API returned status code 500 - Internal Server Error" 
        : status === "success" 
          ? "Response received in 230ms with 2KB payload" 
          : "Handshake completed with remote endpoint"
    };
  });
};
