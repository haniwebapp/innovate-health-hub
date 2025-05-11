
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, Search, Trophy } from "lucide-react";

interface EmptyStateProps {
  icon: "search" | "trophy" | "check";
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
  buttonLink?: string;
}

export default function EmptyState({
  icon,
  title,
  description,
  buttonText,
  onButtonClick,
  buttonLink
}: EmptyStateProps) {
  const IconComponent = {
    search: Search,
    trophy: Trophy,
    check: Check
  }[icon];

  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 mx-auto rounded-full bg-muted/20 flex items-center justify-center">
        <IconComponent className="h-8 w-8 text-muted" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="text-muted-foreground mt-2 mb-4">
        {description}
      </p>
      {buttonLink ? (
        <Button asChild variant="outline" onClick={onButtonClick}>
          <Link to={buttonLink}>
            {buttonText}
          </Link>
        </Button>
      ) : (
        <Button variant="outline" onClick={onButtonClick}>
          {buttonText}
        </Button>
      )}
    </div>
  );
}
