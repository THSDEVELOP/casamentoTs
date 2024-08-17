import React from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import BackgroundContainer from '../../shared/components/BackgroundContainer';
import { StyledText } from '../../styles/StyledTexts/StyledText'; // Importe o StyledText
import { CustomContainerHome } from '../../styles/StyledContainer/CustomContainer';

import CustomButtonHome from '../../styles/StyledButton/CustomButtonHome';

const ImageCarousel: React.FC<{ images: string[], navigate: (path: string) => void }> = ({ images, navigate }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '600px', margin: '0 auto', padding: '20px', position: 'relative' }}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index}`} style={{ width: '100%', height: 'auto' }} />
          </div>
        ))}
      </Slider>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 2 }}>
        <CustomButtonHome variant="contained" onClick={() => navigate('/guestregistration')}>
          Cadastro
        </CustomButtonHome>
        <CustomButtonHome variant="contained" onClick={() => navigate('/felicidades')}>
          Comentarios
        </CustomButtonHome>
        <CustomButtonHome variant="contained" onClick={() => navigate('/giftlist')}>
          Lista de Presentes
        </CustomButtonHome>
        <CustomButtonHome variant="contained" onClick={() => navigate('/album')}>
          Álbum
        </CustomButtonHome>
      </Box>
    </Box>
  );
};

const Home: React.FC = () => {
  const navigate = useNavigate();
  const images = [
    'https://static.vecteezy.com/system/resources/previews/011/850/801/non_2x/wedding-couple-love-atl-png.png',
    'https://static.vecteezy.com/system/resources/previews/011/850/801/non_2x/wedding-couple-love-atl-png.png',
    // Adicione mais URLs de imagens conforme necessário
  ];

  return (
    <BackgroundContainer>
      <CustomContainerHome>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            flexGrow: 1,
            width: '100%',
            position: 'relative',
          }}
        >
          <StyledText variant="h2" gutterBottom align="center">
            Bem-vindo ao Nosso Casamento
          </StyledText>
          <StyledText variant="h3" gutterBottom align="center">
            Sara & Tharsys
          </StyledText>
          <ImageCarousel images={images} navigate={navigate} />
        </Box>
      </CustomContainerHome>
    </BackgroundContainer>
  );
};

export default Home;
