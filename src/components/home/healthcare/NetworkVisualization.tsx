import { motion } from "framer-motion";

interface NetworkNode {
  id: string;
  size?: number; // Relative size (default 1)
  activity?: number; // Activity level 0-100
  color?: string; // Custom color
}

interface NetworkConnection {
  source: string;
  target: string;
  strength?: number; // Connection strength 0-100
  dataFlow?: number; // Data flow rate 0-100
}

interface NetworkVisualizationProps {
  isVisible: boolean;
  nodes?: NetworkNode[];
  connections?: NetworkConnection[];
  activityLevel?: number; // Overall network activity 0-100
}

export function NetworkVisualization({ 
  isVisible,
  nodes = [],
  connections = [], 
  activityLevel = 70
}: NetworkVisualizationProps) {
  // Default network if no data provided
  const defaultNodes = [
    { id: 'node1', position: { x: 100, y: 20 } },
    { id: 'node2', position: { x: 60, y: 80 } },
    { id: 'node3', position: { x: 140, y: 80 } },
    { id: 'node4', position: { x: 100, y: 180 } }
  ];
  
  // Map network activity to animation speed
  const getAnimationDuration = (baseSpeed: number) => {
    // Lower activity = slower animations
    const activityFactor = Math.max(0.5, Math.min(1.5, activityLevel / 50));
    return baseSpeed / activityFactor;
  };
  
  // Calculate size for nodes based on activity
  const getNodeSize = (node?: NetworkNode) => {
    if (!node || node.size === undefined) return 3;
    return 2 + (node.size * 1.5);
  };
  
  // Get color based on activity
  const getNodeColor = (node?: NetworkNode, defaultColor: string = "#C3A86B") => {
    if (!node || !node.activity) return defaultColor;
    if (node.color) return node.color;
    
    // Otherwise color based on activity level using only MOH colors
    if (node.activity > 75) return "#00814A"; // High activity - MOH green
    if (node.activity > 40) return "#C3A86B"; // Medium activity - MOH gold
    return "#00814A"; // Low activity - MOH green (darker variant)
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-72 md:h-72"
    >
      <svg viewBox="0 0 200 200" width="100%" height="100%" className="fill-none">
        {/* Base network connections */}
        <motion.path 
          d="M100,20 L60,80 L100,180 L140,80 Z" 
          stroke="#E5DEFF"
          strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        />
        <motion.path 
          d="M60,80 L140,80" 
          stroke="#D3E4FD"
          strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        />
        <motion.path 
          d="M40,60 C60,100 140,100 160,60" 
          stroke="#E5DEFF"
          strokeWidth="1.5"
          strokeDasharray="4,4"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 0.7 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        />
        
        {/* Data-driven paths - more active = faster animations */}
        <motion.path 
          d="M100,20 C130,50 130,150 100,180" 
          stroke="#C3A86B" /* Changed from blue to MOH gold */
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={isVisible ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ 
            duration: getAnimationDuration(3),
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <motion.path 
          d="M140,80 C110,50 110,150 60,80" 
          stroke="#00814A" /* Changed from blue to MOH green */
          strokeWidth={(connections[0]?.strength || 50) > 70 ? 4 : 3}
          initial={{ pathLength: 0 }}
          animate={isVisible ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ 
            duration: getAnimationDuration(
              connections[0]?.dataFlow ? 6 - (connections[0].dataFlow / 25) : 3
            ),
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <motion.path 
          d="M40,60 C80,110 120,90 160,60" 
          stroke="#00814A" /* Using MOH green */
          strokeWidth={(connections[1]?.strength || 40) > 60 ? 3 : 2}
          initial={{ pathLength: 0 }}
          animate={isVisible ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ 
            duration: getAnimationDuration(
              connections[1]?.dataFlow ? 7 - (connections[1].dataFlow / 20) : 4
            ),
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Network nodes with pulse effect based on activity */}
        {(nodes.length > 0 ? nodes : defaultNodes.map((n, i) => ({ 
          id: n.id, 
          activity: [85, 60, 70, 40][i % 4]
        }))).map((node, i) => {
          const positions = [
            { cx: 100, cy: 20 },
            { cx: 60, cy: 80 },
            { cx: 140, cy: 80 },
            { cx: 100, cy: 180 }
          ];
          const position = positions[i % positions.length];
          
          return (
            <motion.circle
              key={node.id}
              cx={position.cx}
              cy={position.cy}
              r={getNodeSize(node)}
              fill={getNodeColor(node, i % 2 === 0 ? "#00814A" : "#C3A86B")} /* Alternating between MOH green and gold */
              initial={{ scale: 0 }}
              animate={isVisible ? {
                scale: [1, node.activity && node.activity > 60 ? 1.8 : 1.3, 1],
                opacity: [0.7, 1, 0.7]
              } : { scale: 0 }}
              transition={{
                duration: getAnimationDuration(node.activity ? 3 - (node.activity / 50) : 2),
                delay: 0.2 * i,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          );
        })}
        
        {/* Central node - reflects overall network activity */}
        <motion.circle 
          cx="100" 
          cy="100" 
          r={activityLevel > 80 ? 25 : activityLevel > 50 ? 20 : 15}
          fill={activityLevel > 80 ? "#00814A" : activityLevel > 50 ? "#C3A86B" : "#00814A"} /* Using MOH colors */
          initial={{ opacity: 0, scale: 0 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />
        
        <motion.circle 
          cx="100" 
          cy="100" 
          r={activityLevel > 80 ? 18 : activityLevel > 50 ? 15 : 12}
          fill={activityLevel > 80 ? "#006B3E" : activityLevel > 50 ? "#A38A56" : "#006B3E"} /* Darker variants of MOH colors */
          animate={isVisible ? {
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7],
          } : {}}
          transition={{
            duration: getAnimationDuration(2),
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Central pulse effect - speed reflects activity level */}
        <motion.circle
          cx="100"
          cy="100"
          r="5"
          fill="white"
          animate={isVisible ? {
            scale: [1, activityLevel / 25, 1],
            opacity: [0.8, 0, 0.8]
          } : {}}
          transition={{
            duration: getAnimationDuration(2.5),
            repeat: Infinity
          }}
        />
      </svg>
    </motion.div>
  );
}
