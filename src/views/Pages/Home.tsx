import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import BackgroundContainer from '../../shared/components/BackgroundContainer';

const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  padding: '40px',
  borderRadius: '10px',
  minHeight: '100vh',
  position: 'relative',
});

const StyledButton = styled(Button)({
  backgroundColor: '#d4af37',
  color: '#fff',
  padding: '10px 20px',
  margin: '10px',
  opacity: 0.8,
  '&:hover': {
    backgroundColor: '#b8860b',
    opacity: 1,
  },
});

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
        <StyledButton variant="contained" onClick={() => navigate('/guestregistration')}>
          Cadastro
        </StyledButton>
        <StyledButton variant="contained" onClick={() => navigate('/felicidades')}>
          Comentarios
        </StyledButton>
        <StyledButton variant="contained" onClick={() => navigate('/giftlist')}>
          Lista de Presentes
        </StyledButton>
        <StyledButton variant="contained" onClick={() => navigate('/album')}>
          Álbum
        </StyledButton>
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
      <StyledContainer>
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
          <Typography variant="h2" gutterBottom align="center" sx={{ color: '#b8860b', fontFamily: 'serif', fontWeight: 'bold', zIndex: 1 }}>
            Bem-vindo ao Nosso Casamento
          </Typography>
          <Typography variant="h3" gutterBottom align="center" sx={{ color: '#b8860b', fontFamily: 'cursive', fontStyle: 'italic', zIndex: 1 }}>
            Sara & Tharsys
          </Typography>
          <ImageCarousel images={images} navigate={navigate} />
        </Box>
      </StyledContainer>
    </BackgroundContainer>
  );
};

export default Home;
