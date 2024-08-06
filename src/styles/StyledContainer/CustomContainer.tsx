import React from 'react';
import { Container, ContainerProps } from '@mui/material';

const customStylesHome: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  padding: '40px',
  borderRadius: '10px',
  minHeight: '100vh',
  position: 'relative',
};

const CustomContainerHome: React.FC<ContainerProps> = (props) => {
  return <Container style={customStylesHome} {...props} />;
};

const customStylesAlbum: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  textAlign: 'center',
  padding: '40px',
  borderRadius: '10px',
  minHeight: '100vh',
};

const CustomContainerAlbum: React.FC<ContainerProps> = (props) => {
  return <Container style={customStylesAlbum} {...props} />;
};

const customStylesFelicidades: React.CSSProperties = {
  padding: '40px',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
};

const CustomContainerFelicidades: React.FC<ContainerProps> = (props) => {
  return <Container style={customStylesFelicidades} {...props} />;
};

const customStylesGiftList: React.CSSProperties = {
  padding: '40px',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  minHeight: '100vh',
  marginTop: '64px',
};

const CustomContainerGiftList: React.FC<ContainerProps> = (props) => {
  return <Container style={customStylesGiftList} {...props} />;
};

const customStylesRegister: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  minHeight: '100vh',
  borderRadius: '10px',
  padding: '40px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  marginTop: '64px',
};

const CustomContainerRegister: React.FC<ContainerProps> = (props) => {
  return <Container style={customStylesRegister} {...props} />;
};

export { CustomContainerHome, CustomContainerAlbum, CustomContainerFelicidades, CustomContainerGiftList, CustomContainerRegister };
