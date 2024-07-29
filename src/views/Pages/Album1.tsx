import React from 'react';
import { Container, Box, Grid } from '@mui/material';
import { styled } from '@mui/system';
import BackgroundContainer from '../../shared/components/BackgroundContainer';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  textAlign: 'center',
  padding: '40px',
  borderRadius: '10px',
  minHeight: '100vh',
});

const StyledImageContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  maxHeight: '500px',
  overflow: 'hidden',
});

const StyledImage = styled('img')({
  width: 'auto',
  height: '100%',
  objectFit: 'contain',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const GalleryImage = styled('img')({
  width: '100%',
  height: 'auto',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  marginBottom: '20px',
});

const Album: React.FC = () => {
  const images = [
    'https://static.vecteezy.com/system/resources/previews/011/850/801/non_2x/wedding-couple-love-atl-png.png',
    'https://static.vecteezy.com/system/resources/previews/011/850/801/non_2x/wedding-couple-love-atl-png.png',
    'https://static.vecteezy.com/system/resources/previews/011/850/801/non_2x/wedding-couple-love-atl-png.png',
    'https://static.vecteezy.com/system/resources/previews/011/850/801/non_2x/wedding-couple-love-atl-png.png',
    'https://static.vecteezy.com/system/resources/previews/011/850/801/non_2x/wedding-couple-love-atl-png.png',
    'https://static.vecteezy.com/system/resources/previews/011/850/801/non_2x/wedding-couple-love-atl-png.png',
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <BackgroundContainer>
      <StyledContainer>
        <Box sx={{ width: '100%', maxWidth: '800px', margin: '0 auto', marginBottom: '40px' }}>
          <Slider {...settings}>
            {images.map((image, index) => (
              <StyledImageContainer key={index}>
                <StyledImage src={image} alt={`Foto ${index + 1}`} />
              </StyledImageContainer>
            ))}
          </Slider>
        </Box>
        <Grid container spacing={2}>
          {images.map((image, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <GalleryImage src={image} alt={`Foto ${index + 1}`} />
            </Grid>
          ))}
        </Grid>
      </StyledContainer>
    </BackgroundContainer>
  );
};

export default Album;
