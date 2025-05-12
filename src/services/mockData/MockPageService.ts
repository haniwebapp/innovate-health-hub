
import { supabase } from "@/integrations/supabase/client";
import { WebsitePageFormData } from "@/types/pageTypes";

export class MockPageService {
  /**
   * Generates and inserts mock website pages into the database
   */
  static async generateMockPages(): Promise<number> {
    try {
      const mockPages: WebsitePageFormData[] = [
        {
          slug: "home",
          title: "Home Page",
          published: true,
          metaDescription: "Welcome to the Ministry of Health Innovation Platform",
          content: {
            sections: [
              {
                type: "hero",
                title: "Transforming Healthcare Together",
                content: "Join our platform to accelerate healthcare innovation in Saudi Arabia",
                buttonText: "Learn More",
                backgroundImage: "https://images.unsplash.com/photo-1631217872822-40d0e39f6694?q=80&w=1800&auto=format&fit=crop",
                alignment: "center"
              },
              {
                type: "features",
                title: "What We Offer",
                items: [
                  {
                    title: "Connect with Experts",
                    description: "Network with healthcare leaders and innovators",
                    icon: "users"
                  },
                  {
                    title: "Access Funding",
                    description: "Find investment opportunities for your healthcare solutions",
                    icon: "banknote"
                  },
                  {
                    title: "Navigate Regulations",
                    description: "Get support through the regulatory approval process",
                    icon: "shield"
                  }
                ]
              },
              {
                type: "content",
                title: "About Our Platform",
                content: "The Ministry of Health Innovation Platform is designed to accelerate healthcare transformation in Saudi Arabia by connecting innovators, investors, and regulators in one unified ecosystem.",
                imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop",
                alignment: "left"
              }
            ]
          }
        },
        {
          slug: "about",
          title: "About Us",
          published: true,
          metaDescription: "Learn about the Ministry of Health Innovation Platform and our mission",
          content: {
            sections: [
              {
                type: "hero",
                title: "Our Mission",
                content: "Accelerating healthcare innovation to improve lives across Saudi Arabia",
                backgroundImage: "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1800&auto=format&fit=crop",
                alignment: "center"
              },
              {
                type: "content",
                title: "Who We Are",
                content: "The Ministry of Health Innovation Platform was established in 2023 to create a unified ecosystem for healthcare innovation. We bring together healthcare professionals, entrepreneurs, investors, and regulators to transform the Saudi healthcare landscape.",
                imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop",
                alignment: "right"
              },
              {
                type: "content",
                title: "Our Vision",
                content: "To make Saudi Arabia a global leader in healthcare innovation and improve the quality of care for all citizens in line with Vision 2030.",
                imageUrl: "https://images.unsplash.com/photo-1576091160110-aa486e7f895e?q=80&w=800&auto=format&fit=crop",
                alignment: "left"
              }
            ]
          }
        },
        {
          slug: "contact",
          title: "Contact Us",
          published: true,
          metaDescription: "Get in touch with the Ministry of Health Innovation Platform team",
          content: {
            sections: [
              {
                type: "hero",
                title: "Contact Us",
                content: "We'd love to hear from you. Reach out with any questions or ideas.",
                backgroundImage: "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=1800&auto=format&fit=crop",
                alignment: "center"
              },
              {
                type: "contact",
                title: "Get In Touch",
                content: "Fill out the form below and our team will get back to you as soon as possible.",
                items: [
                  {
                    title: "General Inquiries",
                    description: "For general questions and information",
                    email: "info@mohinnovation.sa"
                  },
                  {
                    title: "Innovation Submissions",
                    description: "For questions about submitting your innovation",
                    email: "innovations@mohinnovation.sa"
                  },
                  {
                    title: "Investor Relations",
                    description: "For investment opportunities and partnerships",
                    email: "investors@mohinnovation.sa"
                  }
                ]
              }
            ]
          }
        },
        {
          slug: "privacy-policy",
          title: "Privacy Policy",
          published: true,
          metaDescription: "Privacy Policy for the Ministry of Health Innovation Platform",
          content: {
            sections: [
              {
                type: "hero",
                title: "Privacy Policy",
                content: "Last updated: May 10, 2025",
                alignment: "center"
              },
              {
                type: "content",
                title: "Introduction",
                content: "At the Ministry of Health Innovation Platform, we take your privacy seriously. This Privacy Policy outlines how we collect, use, and protect your personal information when you use our services."
              },
              {
                type: "content",
                title: "Information We Collect",
                content: "We collect information that you provide directly to us, such as when you create an account, submit an innovation, or contact us. This may include your name, email address, organization, and professional details."
              },
              {
                type: "content",
                title: "How We Use Your Information",
                content: "We use your information to provide and improve our services, communicate with you, and facilitate connections between innovators, investors, and other stakeholders within the healthcare ecosystem."
              }
            ]
          }
        },
        {
          slug: "terms",
          title: "Terms of Service",
          published: true,
          metaDescription: "Terms of Service for the Ministry of Health Innovation Platform",
          content: {
            sections: [
              {
                type: "hero",
                title: "Terms of Service",
                content: "Last updated: May 10, 2025",
                alignment: "center"
              },
              {
                type: "content",
                title: "Acceptance of Terms",
                content: "By accessing or using the Ministry of Health Innovation Platform, you agree to be bound by these Terms of Service and all applicable laws and regulations."
              },
              {
                type: "content",
                title: "User Accounts",
                content: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account."
              },
              {
                type: "content",
                title: "Intellectual Property",
                content: "The content, features, and functionality of the Platform, including but not limited to text, graphics, logos, and software, are owned by the Ministry of Health and are protected by Saudi Arabian and international copyright, trademark, and other intellectual property laws."
              }
            ]
          }
        },
        {
          slug: "help-center",
          title: "Help Center",
          published: false,
          metaDescription: "Get help and support for using the Ministry of Health Innovation Platform",
          content: {
            sections: [
              {
                type: "hero",
                title: "Help Center",
                content: "Find answers to common questions and learn how to get the most out of our platform.",
                backgroundImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1800&auto=format&fit=crop",
                alignment: "center"
              },
              {
                type: "faq",
                title: "Frequently Asked Questions",
                items: [
                  {
                    title: "How do I submit my innovation?",
                    content: "To submit your innovation, log in to your account and click on the 'Submit Innovation' button on your dashboard. Follow the step-by-step instructions to complete your submission."
                  },
                  {
                    title: "How are innovations evaluated?",
                    content: "Innovations are evaluated based on their potential impact, feasibility, alignment with healthcare priorities, and market potential. Our team of experts reviews each submission carefully."
                  },
                  {
                    title: "How can I connect with investors?",
                    content: "Once your innovation is approved, you can access the investor network through your dashboard. You can also participate in our regular innovation showcases and networking events."
                  }
                ]
              }
            ]
          }
        }
      ];
      
      // Check if pages already exist
      const { data: existingPages } = await supabase
        .from('website_pages')
        .select('slug');
      
      const existingSlugs = existingPages?.map(page => page.slug) || [];
      
      // Only insert pages that don't already exist
      const pagesToInsert = mockPages.filter(page => !existingSlugs.includes(page.slug));
      
      if (pagesToInsert.length === 0) {
        console.log('All mock pages already exist in the database');
        return 0;
      }
      
      // Convert to database format - fix the type issue with content
      const dbPages = pagesToInsert.map(page => ({
        slug: page.slug,
        title: page.title,
        // Convert the content object to a JSON-compatible format
        content: page.content as unknown as Record<string, any>,
        meta_description: page.metaDescription,
        published: page.published || false,
        last_updated_by: null // Will be updated if user is authenticated
      }));
      
      // Insert all mock pages
      const { data, error } = await supabase
        .from('website_pages')
        .insert(dbPages)
        .select();
        
      if (error) {
        console.error("Error inserting mock pages:", error);
        throw error;
      }
      
      console.log(`Successfully inserted ${data?.length || 0} mock pages`);
      return data?.length || 0;
    } catch (error) {
      console.error("Error generating mock pages:", error);
      throw error;
    }
  }
}
