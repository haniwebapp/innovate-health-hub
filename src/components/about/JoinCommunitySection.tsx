
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronRight } from "lucide-react";

export default function JoinCommunitySection() {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 bg-gradient-to-br from-moh-lightGreen to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-moh-darkGreen">{t('about.joinCommunity')}</h2>
        <p className="max-w-2xl mx-auto mb-8 text-gray-700">
          {t('about.joinDescription')}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="bg-moh-green hover:bg-moh-darkGreen text-white px-6 py-3 rounded-md font-medium inline-flex items-center">
            {t('about.registerNow')} 
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
          <button className="border border-moh-green text-moh-green hover:bg-moh-lightGreen px-6 py-3 rounded-md font-medium">
            {t('about.learnMore')}
          </button>
        </div>
      </div>
    </section>
  );
}
