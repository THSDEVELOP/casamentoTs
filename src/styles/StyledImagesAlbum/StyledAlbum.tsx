import React from 'react';
import { Button, ButtonProps } from '@mui/material';

const albumCardStyles: React.CSSProperties = {
  width: '100%',
  height: '100%',
  padding: '10px',
  borderRadius: '10px',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
};

const AlbumCard: React.FC<ButtonProps> = (props) => {
  return (
    <Button
      style={albumCardStyles}
      onMouseEnter={(e) => {
        const target = e.currentTarget as HTMLElement;
        target.style.transform = 'scale(1.05)';
        target.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
      }}
      onMouseLeave={(e) => {
        const target = e.currentTarget as HTMLElement;
        target.style.transform = 'scale(1)';
        target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
      }}
      {...props}
    />
  );
};

const albumImageStyles: React.CSSProperties = {
  width: '100%',
  height: '200px',
  objectFit: 'cover',
  borderRadius: '10px',
  marginBottom: '10px',
  transition: 'opacity 0.3s ease',
};

interface AlbumImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const AlbumImage: React.FC<AlbumImageProps> = (props) => {
  return (
    <img
      style={albumImageStyles}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.opacity = '0.9';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.opacity = '1';
      }}
      {...props}
    />
  );
};

export { AlbumCard, AlbumImage };
