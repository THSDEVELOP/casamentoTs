import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/system';

const Background = styled(Box)({
  backgroundImage: 'url(https://www.transparenttextures.com/patterns/diamond-upholstery.png)', // Textura sutil de fundo
  backgroundColor: '#fffaf0', // Cor de fundo creme
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  width: '100%',
  height: '100%',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: -1,
});

interface BackgroundContainerProps {
  children: React.ReactNode;
}

const BackgroundContainer: React.FC<BackgroundContainerProps> = ({ children }) => {
  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <Background />
      {children}
    </Box>
  );
};

export default BackgroundContainer;
