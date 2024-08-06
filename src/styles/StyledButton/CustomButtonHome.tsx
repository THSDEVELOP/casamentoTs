import React from 'react';
import { Button, ButtonProps } from '@mui/material';

const customButtonStyles: React.CSSProperties = {
  backgroundColor: '#d4af37',
  color: '#fff',
  padding: '10px 20px',
  margin: '10px',
  opacity: 0.8,
  transition: 'background-color 0.3s ease, opacity 0.3s ease', // Suave transição de cor e opacidade
};

const CustomButtonHome: React.FC<ButtonProps> = (props) => {
  return (
    <Button
      style={customButtonStyles}
      onMouseEnter={(e) => {
        const target = e.currentTarget as HTMLElement;
        target.style.backgroundColor = '#b8860b';
        target.style.opacity = '1';
      }}
      onMouseLeave={(e) => {
        const target = e.currentTarget as HTMLElement;
        target.style.backgroundColor = '#d4af37';
        target.style.opacity = '0.8';
      }}
      {...props}
    />
  );
};

export default CustomButtonHome;
