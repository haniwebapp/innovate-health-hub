
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PageService } from "@/services/page/PageService";
import { WebsitePage } from "@/types/pageTypes";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/home/Footer";

export default function DynamicPage() {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<WebsitePage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);
        setError(null);
        if (slug) {
          const pageData = await PageService.getPageBySlug(slug);
          setPage(pageData);
          if (!pageData) {
            setError("Page not found");
          }
        } else {
          setError("Invalid page URL");
        }
      } catch (err) {
        console.error("Error fetching page:", err);
        setError("Failed to load page");
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  // Render page sections based on their type
  const renderSection = (section: any, index: number) => {
    switch (section.type) {
      case "hero":
        return (
          <div 
            key={index}
            className={`py-24 px-4 text-center ${
              section.backgroundImage ? 
              'bg-cover bg-center text-white' : 
              'bg-moh-lightGreen/20'
            }`}
            style={
              section.backgroundImage ? 
              { backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${section.backgroundImage})` } : 
              {}
            }
          >
            <div className="container mx-auto max-w-3xl">
              <h1 className="text-4xl font-bold mb-6">{section.title}</h1>
              <p className="text-xl mb-8">{section.content}</p>
              {section.buttonText && (
                <button className="bg-moh-green hover:bg-moh-darkGreen text-white px-6 py-3 rounded-lg">
                  {section.buttonText}
                </button>
              )}
            </div>
          </div>
        );
      
      case "content":
        return (
          <div key={index} className="py-16 px-4">
            <div className="container mx-auto">
              <div className={`flex flex-col ${section.alignment === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}>
                {section.imageUrl && (
                  <div className="md:w-1/2">
                    <img 
                      src={section.imageUrl} 
                      alt={section.title} 
                      className="rounded-lg shadow-lg w-full"
                    />
                  </div>
                )}
                <div className={section.imageUrl ? "md:w-1/2" : "w-full"}>
                  {section.title && <h2 className="text-3xl font-bold mb-4">{section.title}</h2>}
                  <p className="text-lg">{section.content}</p>
                </div>
              </div>
            </div>
          </div>
        );

      case "features":
        return (
          <div key={index} className="py-16 px-4 bg-slate-50">
            <div className="container mx-auto">
              {section.title && (
                <h2 className="text-3xl font-bold mb-12 text-center">{section.title}</h2>
              )}
              <div className="grid md:grid-cols-3 gap-8">
                {section.items?.map((item: any, i: number) => (
                  <div key={i} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-moh-lightGreen rounded-full flex items-center justify-center mb-4">
                      <span className="text-moh-darkGreen text-xl">{item.icon ? item.icon.charAt(0).toUpperCase() : "#"}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "faq":
        return (
          <div key={index} className="py-16 px-4">
            <div className="container mx-auto max-w-4xl">
              {section.title && (
                <h2 className="text-3xl font-bold mb-8 text-center">{section.title}</h2>
              )}
              <div className="space-y-6">
                {section.items?.map((item: any, i: number) => (
                  <div key={i} className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "contact":
        return (
          <div key={index} className="py-16 px-4">
            <div className="container mx-auto max-w-4xl">
              {section.title && (
                <h2 className="text-3xl font-bold mb-4 text-center">{section.title}</h2>
              )}
              {section.content && (
                <p className="text-center text-gray-600 mb-8">{section.content}</p>
              )}
              <div className="grid md:grid-cols-3 gap-6">
                {section.items?.map((item: any, i: number) => (
                  <div key={i} className="bg-white p-6 rounded-lg border border-gray-200 text-center">
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                    <a 
                      href={`mailto:${item.email}`} 
                      className="text-moh-green hover:underline font-medium"
                    >
                      {item.email}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div key={index} className="py-8 px-4">
            <div className="container mx-auto">
              <p className="text-gray-500 italic">Unknown section type: {section.type}</p>
            </div>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">
          <p className="text-lg text-gray-500">Loading page...</p>
        </div>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-4">Page Not Found</h1>
          <p className="text-lg text-gray-500">{error || "The requested page could not be found."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {page.content.sections.map((section, index) => renderSection(section, index))}
      </main>
      
      <Footer />
    </div>
  );
}
