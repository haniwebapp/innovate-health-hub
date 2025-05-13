
import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";

export function HeroStats() {
  const stats = [
    { value: 250, label: "Active Innovations", icon: "🚀" },
    { value: 85, label: "Global Partners", icon: "🌍" },
    { value: 120, label: "Funded Projects", icon: "💰" },
    { value: 45, label: "Approved Products", icon: "✅" }
  ];

  return (
    <motion.div 
      className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto mt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.8 }}
    >
      {stats.map((stat, index) => (
        <motion.div 
          key={index}
          className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center"
          whileHover={{ y: -5, scale: 1.03 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
        >
          <span className="text-2xl mb-1">{stat.icon}</span>
          <AnimatedCounter 
            value={stat.value}
            className="text-2xl md:text-3xl font-bold text-moh-darkGreen" 
          />
          <span className="text-sm text-gray-600 mt-1">{stat.label}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}
