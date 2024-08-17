import React, { useState } from 'react';
import { Box, Grid, Button, TextField, InputAdornment } from '@mui/material';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import BackgroundContainer from '../../shared/components/BackgroundContainer';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { StyledText } from '../../styles/StyledTexts/StyledText';
import { CustomContainerAlbum } from '../../styles/StyledContainer/CustomContainer';
import { AlbumCard } from '../../styles/StyledImagesAlbum/StyledAlbum';
import albumsData from '../../data/albums.json';
import CustomButtonHome from '../../styles/StyledButton/CustomButtonHome';

const hoverShadow = '0 4px 8px rgba(0, 0, 0, 0.3)'; // Sombra suave no hover

const SearchField = styled(TextField)(({ theme }) => ({
  marginBottom: '20px',
  width: '100%',
  maxWidth: '400px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '25px',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    paddingRight: 0,
    transition: 'box-shadow 0.3s, border 0.3s',
    '&:hover': {
      boxShadow: hoverShadow,
      border: '1px solid rgba(0, 0, 0, 0.2)',
    },
    '&.Mui-focused': {
      boxShadow: hoverShadow,
      border: '1px solid rgba(0, 0, 0, 0.5)',
    },
  },
  '& .MuiOutlinedInput-input': {
    paddingLeft: '12px',
  },
  '& .MuiInputAdornment-root': {
    marginRight: 0,
  },
}));

const StyledImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '10px',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: hoverShadow,
  },
}));

const StyledImage = styled('img')({
  width: '100%',
  height: 'auto',
  objectFit: 'cover',
  borderRadius: '10px',
  transition: 'opacity 0.3s, box-shadow 0.3s',
  '&:hover': {
    opacity: 0.9,
    boxShadow: hoverShadow,
  },
});

const StyledButton = styled(Button)({
  transition: 'box-shadow 0.3s',
  '&:hover': {
    boxShadow: hoverShadow,
  },
});

const Album: React.FC = () => {
  const [selectedAlbum, setSelectedAlbum] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [albums, setAlbums] = useState<{ title: string; images: string[] }[]>(albumsData);

  const filteredAlbums = albums.filter(album => album.title.toLowerCase().includes(searchTerm.toLowerCase()));

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

  const handleDownload = (url: string, fileName: string) => {
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
      })
      .catch(err => console.error('Erro ao fazer download da imagem:', err));
  };

  return (
    <BackgroundContainer>
      <CustomContainerAlbum>
        <SearchField
          variant="outlined"
          placeholder="Buscar álbuns..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ width: '100%', maxWidth: '800px', margin: '0 auto', marginBottom: '40px' }}>
          {selectedAlbum === null ? (
            <Grid container spacing={2}>
              {filteredAlbums.map((album, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <AlbumCard
                    variant="contained"
                    onClick={() => setSelectedAlbum(index)}
                  >
                    <StyledImageContainer>
                      <StyledImage src={album.images[0]} alt={`Capa do álbum ${album.title}`} />
                    </StyledImageContainer>
                    <StyledText variant="h6">{album.title}</StyledText>
                  </AlbumCard>
                </Grid>
              ))}
            </Grid>
          ) : (
            <>
              <Slider {...settings}>
                {albums[selectedAlbum].images.map((image, index) => (
                  <StyledImageContainer key={index}>
                    <StyledImage src={image} alt={`Foto ${index + 1}`} />
                    <CustomButtonHome
                      variant="contained"
                      onClick={() => handleDownload(image, `Foto${index + 1}.jpg`)}
                      sx={{ marginTop: '10px' }}
                    >
                      Download
                    </CustomButtonHome>
                  </StyledImageContainer>
                ))}
              </Slider>
              <CustomButtonHome variant="contained" onClick={() => setSelectedAlbum(null)} sx={{ marginTop: '20px' }}>
                Voltar para álbuns
              </CustomButtonHome>
              <Grid container spacing={2} sx={{ marginTop: '20px' }}>
                {albums[selectedAlbum].images.map((image, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <StyledImageContainer>
                      <StyledImage src={image} alt={`Foto ${index + 1}`} />
                      <CustomButtonHome
                        variant="contained"
                        onClick={() => handleDownload(image, `Foto${index + 1}.jpg`)}
                        sx={{ marginTop: '10px' }}
                      >
                        Download
                      </CustomButtonHome>
                    </StyledImageContainer>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Box>
      </CustomContainerAlbum>
    </BackgroundContainer>
  );
};

export default Album;
