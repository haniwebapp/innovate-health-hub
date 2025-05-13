
import { useRef } from "react";
import { useInView } from "framer-motion";
import { StatItem } from "./StatItem";

export interface Stat {
  value: number;
  label: string;
  suffix: string;
}

interface StatsSectionProps {
  stats: Stat[];
}

export const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, {
    once: true,
    margin: "-100px"
  });

  return (
    <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
      {stats.map((stat, index) => (
        <StatItem 
          key={index}
          value={stat.value} 
          label={stat.label} 
          suffix={stat.suffix} 
          index={index}
          inView={statsInView}
        />
      ))}
    </div>
  );
};
