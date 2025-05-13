
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselNavButtonProps {
  direction: "left" | "right";
  onClick: () => void;
  disabled?: boolean;
}

export const CarouselNavButton = ({ direction, onClick, disabled }: CarouselNavButtonProps) => {
  return (
    <Button 
      variant="outline" 
      size="icon"
      className="absolute top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm border-moh-lightGreen hover:bg-moh-lightGreen/20 shadow-md"
      onClick={onClick}
      disabled={disabled}
      style={{
        [direction === 'left' ? 'left' : 'right']: 0
      }}
    >
      {direction === 'left' ? (
        <ChevronLeft className="h-5 w-5" />
      ) : (
        <ChevronRight className="h-5 w-5" />
      )}
    </Button>
  );
};
