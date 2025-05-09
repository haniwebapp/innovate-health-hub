
import React, { useMemo } from 'react';
import { generateLogoSvg, svgToDataUrl } from '@/utils/logoGenerator';

interface GeneratedLogoProps {
  name: string;
  shape?: 'circle' | 'square' | 'hexagon' | 'triangle';
  style?: 'gradient' | 'outline' | 'solid' | 'pattern';
  primaryColor?: string;
  secondaryColor?: string;
  size?: number;
  className?: string;
}

const GeneratedLogo: React.FC<GeneratedLogoProps> = ({
  name,
  shape = 'circle',
  style = 'gradient',
  primaryColor = '#00814A',
  secondaryColor = '#C3A86B',
  size = 100,
  className = ''
}) => {
  const logoSvg = useMemo(() => {
    return generateLogoSvg({
      shape,
      style,
      primaryColor,
      secondaryColor,
      text: name,
      size
    });
  }, [name, shape, style, primaryColor, secondaryColor, size]);

  const logoDataUrl = svgToDataUrl(logoSvg);

  return (
    <img 
      src={logoDataUrl}
      alt={`${name} logo`}
      className={className}
      title={name}
    />
  );
};

export default GeneratedLogo;
