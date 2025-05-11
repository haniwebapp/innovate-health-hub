
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Lightbulb, Award, FileText } from "lucide-react";

interface AdminStatCardsProps {
  userCount: number;
  isLoading?: boolean;
}

export function AdminStatCards({ userCount, isLoading = false }: AdminStatCardsProps) {
  const cards = [
    {
      title: "Total Users",
      value: userCount,
      icon: <Users className="h-8 w-8 text-blue-500" />,
      color: "bg-blue-50 border-blue-100",
      textColor: "text-blue-600",
    },
    {
      title: "Active Challenges",
      value: 5, // Placeholder
      icon: <Award className="h-8 w-8 text-amber-500" />,
      color: "bg-amber-50 border-amber-100",
      textColor: "text-amber-600",
    },
    {
      title: "Innovation Submissions",
      value: 28, // Placeholder
      icon: <Lightbulb className="h-8 w-8 text-green-500" />,
      color: "bg-green-50 border-green-100",
      textColor: "text-green-600",
    },
    {
      title: "Content Items",
      value: 42, // Placeholder
      icon: <FileText className="h-8 w-8 text-purple-500" />,
      color: "bg-purple-50 border-purple-100",
      textColor: "text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {cards.map((card, i) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: i * 0.1 }}
        >
          <Card className={`border ${card.color}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">{card.title}</p>
                  {isLoading ? (
                    <div className="h-7 w-16 bg-muted animate-pulse rounded"></div>
                  ) : (
                    <h3 className={`text-2xl font-bold ${card.textColor}`}>{card.value}</h3>
                  )}
                </div>
                <div className={`p-2 rounded-full ${card.color}`}>
                  {card.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
