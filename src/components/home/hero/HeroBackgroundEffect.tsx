
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function HeroBackgroundEffect() {
  const [rotation, setRotation] = useState(0);
  
  // Subtle background rotation effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxRotation = 5; // Maximum rotation in degrees
      const rotationValue = (scrollY / (document.body.scrollHeight - window.innerHeight)) * maxRotation;
      setRotation(rotationValue);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <>
      {/* Background patterns */}
      <motion.div 
        className="absolute top-0 right-0 w-full h-full bg-[url('/pattern.svg')] opacity-10 bg-repeat"
        style={{ 
          rotate: rotation,
          transition: 'rotate 0.5s ease-out'
        }}
      />
      
      {/* Gradient circles */}
      <motion.div 
        className="absolute top-20 -left-40 w-96 h-96 rounded-full bg-moh-green/10 blur-3xl"
        animate={{ 
          scale: [0.9, 1.1, 0.9],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-moh-gold/10 blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      {/* DNA mover */}
      <motion.div
        className="absolute top-1/4 right-1/4 hidden lg:block"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.path 
            d="M30,20 C45,35 55,35 70,20" 
            stroke="#00814A" 
            strokeWidth="2"
            strokeDasharray="100"
            strokeDashoffset="100"
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 2, delay: 0.8 }}
          />
          <motion.path 
            d="M30,40 C45,55 55,55 70,40" 
            stroke="#C3A86B" 
            strokeWidth="2"
            strokeDasharray="100"
            strokeDashoffset="100"
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 2, delay: 1 }}
          />
          <motion.path 
            d="M30,60 C45,75 55,75 70,60" 
            stroke="#00814A" 
            strokeWidth="2"
            strokeDasharray="100"
            strokeDashoffset="100"
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 2, delay: 1.2 }}
          />
          <motion.path 
            d="M30,80 C45,95 55,95 70,80" 
            stroke="#C3A86B" 
            strokeWidth="2"
            strokeDasharray="100"
            strokeDashoffset="100"
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 2, delay: 1.4 }}
          />
          
          {/* Connecting vertical lines */}
          <motion.path 
            d="M30,20 L30,80" 
            stroke="#00814A" 
            strokeWidth="1"
            strokeDasharray="100"
            strokeDashoffset="100"
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 2, delay: 1.6 }}
          />
          <motion.path 
            d="M70,20 L70,80" 
            stroke="#C3A86B" 
            strokeWidth="1"
            strokeDasharray="100"
            strokeDashoffset="100"
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 2, delay: 1.6 }}
          />
          
          {/* DNA circles */}
          <motion.circle cx="30" cy="20" r="3" fill="#00814A" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          />
          <motion.circle cx="70" cy="20" r="3" fill="#C3A86B" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.1 }}
          />
          <motion.circle cx="30" cy="40" r="3" fill="#00814A" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
          />
          <motion.circle cx="70" cy="40" r="3" fill="#C3A86B" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.3 }}
          />
          <motion.circle cx="30" cy="60" r="3" fill="#00814A" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4 }}
          />
          <motion.circle cx="70" cy="60" r="3" fill="#C3A86B" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
          />
          <motion.circle cx="30" cy="80" r="3" fill="#00814A" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.6 }}
          />
          <motion.circle cx="70" cy="80" r="3" fill="#C3A86B" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.7 }}
          />
        </svg>
      </motion.div>
    </>
  );
}
