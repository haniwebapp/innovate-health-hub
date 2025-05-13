
import { Lightbulb, Users, Target, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function StatsSection() {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-moh-lightGreen"
          >
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-lg bg-moh-lightGreen flex items-center justify-center mr-3">
                <Lightbulb className="h-4 w-4 text-moh-green" />
              </div>
              <span className="text-2xl font-bold text-moh-darkGreen">
                100+
              </span>
            </div>
            <p className="text-sm text-gray-600">Active Innovations</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-moh-lightGreen"
          >
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-lg bg-moh-lightGreen flex items-center justify-center mr-3">
                <Users className="h-4 w-4 text-moh-green" />
              </div>
              <span className="text-2xl font-bold text-moh-darkGreen">
                50+
              </span>
            </div>
            <p className="text-sm text-gray-600">Healthcare Partners</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-moh-lightGreen"
          >
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-lg bg-moh-lightGreen flex items-center justify-center mr-3">
                <Target className="h-4 w-4 text-moh-green" />
              </div>
              <span className="text-2xl font-bold text-moh-darkGreen">
                6+
              </span>
            </div>
            <p className="text-sm text-gray-600">Categories</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-moh-lightGreen"
          >
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-lg bg-moh-lightGreen flex items-center justify-center mr-3">
                <Sparkles className="h-4 w-4 text-moh-green" />
              </div>
              <span className="text-2xl font-bold text-moh-darkGreen">
                30%
              </span>
            </div>
            <p className="text-sm text-gray-600">Avg Impact Rate</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
