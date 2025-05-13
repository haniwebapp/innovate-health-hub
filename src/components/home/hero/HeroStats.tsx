
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import { Users, Award, Globe, Lightbulb, HeartPulse } from "lucide-react";

export function HeroStats() {
  const { t } = useLanguage();
  
  return (
    <motion.div 
      className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6" 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <StatCard 
        icon={<Users className="h-6 w-6 text-moh-green" />}
        value={500}
        suffix="+"
        label="Registered Innovators"
        color="text-moh-green"
        delay={0}
      />
      
      <StatCard 
        icon={<Award className="h-6 w-6 text-moh-darkGold" />}
        value={250}
        suffix="M+"
        label="Investment Funding"
        color="text-moh-darkGold"
        delay={0.2}
      />
      
      <StatCard 
        icon={<Globe className="h-6 w-6 text-moh-green" />}
        value={40}
        suffix="+"
        label="Active Challenges"
        color="text-moh-green"
        delay={0.4}
      />
      
      <StatCard 
        icon={<Lightbulb className="h-6 w-6 text-moh-gold" />}
        value={125}
        suffix="+"
        label="Solutions Launched"
        color="text-moh-gold"
        delay={0.6}
      />
      
      <StatCard 
        icon={<HeartPulse className="h-6 w-6 text-moh-darkGreen" />}
        value={1.5}
        suffix="M+"
        label="Patients Impacted"
        color="text-moh-darkGreen"
        delay={0.8}
      />
    </motion.div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
  color: string;
  delay: number;
}

function StatCard({ icon, value, suffix, label, color, delay }: StatCardProps) {
  return (
    <motion.div 
      className="text-center p-4 rounded-lg bg-white/40 backdrop-blur-sm border border-white/20 hover:bg-white/60 transition-colors"
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div className="flex justify-center mb-2">
        {icon}
      </div>
      <div className={`font-bold text-2xl md:text-3xl ${color}`}>
        <AnimatedCounter value={value} suffix={suffix} duration={2.5} delay={delay} />
      </div>
      <div className="text-sm md:text-base text-gray-600">{label}</div>
      
      {/* Add subtle animation */}
      <motion.div 
        className={`w-12 h-1 rounded-full mx-auto mt-2 bg-opacity-60 ${color.replace('text-', 'bg-')}`}
        initial={{ width: 0 }}
        whileInView={{ width: 48 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.5, duration: 0.8 }}
      />
    </motion.div>
  );
}
