
import React from "react";

interface BackgroundDecorationsProps {
  verticalTexts: string[];
}

export function BackgroundDecorations({ verticalTexts }: BackgroundDecorationsProps) {
  return (
    <>
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-moh-lightGreen opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-moh-lightGold opacity-10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
    </>
  );
}
