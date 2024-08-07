import React, { ReactNode } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/system';

const StyledImageContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  maxHeight: '400px',
  overflow: 'hidden',
});

interface ImageContainerProps {
  children: ReactNode;
}

const ImageContainer: React.FC<ImageContainerProps> = ({ children }) => {
  return <StyledImageContainer>{children}</StyledImageContainer>;
};

const StyledImage = styled('img')({
  width: 'auto',
  height: '100%',
  objectFit: 'contain',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

interface StyledImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const Image: React.FC<StyledImageProps> = (props) => {
  return <StyledImage {...props} />;
};

const StyledGalleryImage = styled('img')({
  width: '100%',
  height: 'auto',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  marginBottom: '20px',
});

interface GalleryImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const GalleryImage: React.FC<GalleryImageProps> = (props) => {
  return <StyledGalleryImage {...props} />;
};

// Exportação nomeada de todos os componentes
export { ImageContainer, Image, GalleryImage };
