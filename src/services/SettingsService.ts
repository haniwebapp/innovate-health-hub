
import { AdminSettings, GeneralSettings, ChallengeSettings, NotificationSettings, IntegrationSettings } from '@/types/admin';
import { supabase } from '@/integrations/supabase/client';

export class SettingsService {
  static async getSettings(): Promise<AdminSettings> {
    try {
      // This would fetch settings from Supabase
      // For now, returning mock data
      const mockSettings: AdminSettings = {
        general: {
          allowNewRegistrations: true,
          requireEmailVerification: true,
          enableNotifications: true,
          maintenanceMode: false
        },
        challenges: {
          requireApproval: true,
          allowPublicSubmissions: false,
          autoCloseExpiredChallenges: true,
          submissionTimeLimit: "30"
        },
        notifications: {
          enableEmailNotifications: true,
          enableInAppNotifications: true,
          notificationTemplates: [
            {
              id: '1',
              name: 'Welcome Email',
              type: 'email',
              subject: 'Welcome to the Healthcare Innovation Platform',
              content: 'Hello {firstName}, welcome to the Healthcare Innovation Platform...',
              active: true
            },
            {
              id: '2',
              name: 'Challenge Submission',
              type: 'email',
              subject: 'Your Challenge Submission',
              content: 'Thank you for submitting your solution to {challengeName}...',
              active: true
            }
          ]
        },
        integrations: [
          {
            id: '1',
            name: 'OpenAI Integration',
            enabled: true,
            apiKey: '********',
            endpoint: 'https://api.openai.com/v1',
            config: {
              models: ['gpt-4', 'gpt-3.5-turbo']
            }
          },
          {
            id: '2',
            name: 'SendGrid Email',
            enabled: true,
            apiKey: '********',
            config: {
              fromEmail: 'no-reply@healthcare-innovation.sa'
            }
          }
        ]
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      return mockSettings;
    } catch (error) {
      console.error('Error fetching settings:', error);
      throw error;
    }
  }
  
  static async updateGeneralSettings(settings: GeneralSettings): Promise<GeneralSettings> {
    try {
      // Would update database in real implementation
      console.log('Updating general settings:', settings);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      return settings;
    } catch (error) {
      console.error('Error updating general settings:', error);
      throw error;
    }
  }
  
  static async updateChallengeSettings(settings: ChallengeSettings): Promise<ChallengeSettings> {
    try {
      // Would update database in real implementation
      console.log('Updating challenge settings:', settings);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      return settings;
    } catch (error) {
      console.error('Error updating challenge settings:', error);
      throw error;
    }
  }
  
  static async updateNotificationSettings(settings: NotificationSettings): Promise<NotificationSettings> {
    try {
      // Would update database in real implementation
      console.log('Updating notification settings:', settings);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      return settings;
    } catch (error) {
      console.error('Error updating notification settings:', error);
      throw error;
    }
  }
  
  static async updateIntegrationSettings(settings: IntegrationSettings): Promise<IntegrationSettings> {
    try {
      // Would update database in real implementation
      console.log('Updating integration settings:', settings);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      return settings;
    } catch (error) {
      console.error('Error updating integration settings:', error);
      throw error;
    }
  }
}
