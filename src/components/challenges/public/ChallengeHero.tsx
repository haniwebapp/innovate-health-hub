
import { ReactNode } from "react";

interface ChallengeHeroProps {
  title: ReactNode;
  description: ReactNode;
}

export default function ChallengeHero({ title, description }: ChallengeHeroProps) {
  return (
    <section className="py-12 md:py-16 bg-moh-lightGreen/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-moh-darkGreen">
            {title}
          </h1>
          <p className="text-lg text-gray-700">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
