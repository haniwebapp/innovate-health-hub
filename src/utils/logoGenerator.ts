
/**
 * Simple utility to generate SVG logos with consistent branding
 */

type LogoShape = 'circle' | 'square' | 'hexagon' | 'triangle';
type LogoStyle = 'gradient' | 'outline' | 'solid' | 'pattern';

interface LogoOptions {
  shape?: LogoShape;
  style?: LogoStyle;
  primaryColor?: string;
  secondaryColor?: string;
  text?: string;
  size?: number;
}

export const generateLogoSvg = ({
  shape = 'circle',
  style = 'gradient',
  primaryColor = '#00814A',
  secondaryColor = '#C3A86B',
  text = '',
  size = 100
}: LogoOptions): string => {
  // Generate a pseudo-random but deterministic pattern based on text
  const getHashCode = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  };
  
  const hash = getHashCode(text);
  const patternType = hash % 4; // 0-3 pattern variations

  // Shape paths
  const shapePath = () => {
    switch (shape) {
      case 'circle':
        return `<circle cx="${size/2}" cy="${size/2}" r="${size*0.4}" />`;
      case 'square':
        return `<rect x="${size*0.1}" y="${size*0.1}" width="${size*0.8}" height="${size*0.8}" />`;
      case 'hexagon': {
        const points = [];
        for (let i = 0; i < 6; i++) {
          const angle = (i * 60) * (Math.PI / 180);
          const x = size/2 + size*0.4 * Math.cos(angle);
          const y = size/2 + size*0.4 * Math.sin(angle);
          points.push(`${x},${y}`);
        }
        return `<polygon points="${points.join(' ')}" />`;
      }
      case 'triangle':
        return `<polygon points="${size/2},${size*0.1} ${size*0.9},${size*0.9} ${size*0.1},${size*0.9}" />`;
    }
  };

  // Style definitions
  const getStyleDef = () => {
    switch (style) {
      case 'gradient':
        return `<linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${primaryColor}" />
          <stop offset="100%" stop-color="${secondaryColor}" />
        </linearGradient>`;
      case 'pattern':
        if (patternType === 0) {
          return `<pattern id="pat" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="10" stroke="${primaryColor}" stroke-width="2" />
          </pattern>`;
        } else if (patternType === 1) {
          return `<pattern id="pat" patternUnits="userSpaceOnUse" width="10" height="10">
            <circle cx="5" cy="5" r="2" fill="${primaryColor}" />
          </pattern>`;
        } else if (patternType === 2) {
          return `<pattern id="pat" patternUnits="userSpaceOnUse" width="20" height="20">
            <rect x="0" y="0" width="10" height="10" fill="${primaryColor}" />
            <rect x="10" y="10" width="10" height="10" fill="${primaryColor}" />
          </pattern>`;
        } else {
          return `<pattern id="pat" patternUnits="userSpaceOnUse" width="15" height="15">
            <path d="M0,7.5 L15,7.5 M7.5,0 L7.5,15" stroke="${primaryColor}" stroke-width="2" />
          </pattern>`;
        }
      default:
        return '';
    }
  };

  // Fill style
  const getFill = () => {
    switch (style) {
      case 'gradient': return 'url(#grad)';
      case 'pattern': return 'url(#pat)';
      case 'solid': return primaryColor;
      case 'outline': return 'none';
    }
  };

  // Text styling
  const getTextElement = () => {
    if (!text) return '';
    
    // Use first letter or first two letters
    const displayText = text.length > 0 ? 
      (text.includes(' ') ? 
        text.split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase() : 
        text.slice(0, 2).toUpperCase()) 
      : '';
      
    return `<text x="50%" y="50%" dy=".3em" 
      text-anchor="middle" 
      font-family="Arial, sans-serif" 
      font-weight="bold"
      font-size="${size * 0.3}"
      fill="${style === 'outline' ? primaryColor : '#ffffff'}">${displayText}</text>`;
  };

  // Generate the SVG
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
    <defs>${getStyleDef()}</defs>
    <g fill="${getFill()}" ${style === 'outline' ? `stroke="${primaryColor}" stroke-width="${size/20}"` : ''}>
      ${shapePath()}
    </g>
    ${getTextElement()}
  </svg>`;
  
  return svg;
};

export const svgToDataUrl = (svg: string): string => {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};
