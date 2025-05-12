
import React from "react";
import { ArabicVerticalText } from "@/components/animations/ArabicVerticalText";

interface BackgroundDecorationsProps {
  verticalTexts: string[];
}

export function BackgroundDecorations({ verticalTexts }: BackgroundDecorationsProps) {
  return (
    <>
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-moh-lightGreen opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-moh-lightGold opacity-10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
      
      {/* Decorative vertical text elements */}
      <div className="absolute left-2 top-1/3 hidden lg:block">
        <ArabicVerticalText 
          text={verticalTexts[0]} 
          className="text-moh-green/10 font-bold tracking-widest"
        />
      </div>
      <div className="absolute right-4 top-1/4 hidden lg:block">
        <ArabicVerticalText 
          text={verticalTexts[1]} 
          className="text-moh-gold/10 font-bold tracking-widest"
        />
      </div>
      <div className="absolute left-1/2 bottom-12 hidden lg:block">
        <ArabicVerticalText 
          text={verticalTexts[2]} 
          className="text-moh-darkGreen/10 font-bold tracking-widest"
        />
      </div>
    </>
  );
}
