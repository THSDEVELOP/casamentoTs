import React, { useState, useEffect } from 'react';
import { Box, Grid, Button, TextField } from '@mui/material';
import { styled } from '@mui/system';
import BackgroundContainer from '../../shared/components/BackgroundContainer';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { StyledText } from '../../styles/StyledTexts/StyledText';
import { CustomContainerAlbum } from '../../styles/StyledContainer/CustomContainer';
import { AlbumCard } from '../../styles/StyledImagesAlbum/StyledAlbum';

// Estilo do campo de busca
const SearchField = styled(TextField)({
  marginBottom: '20px',
  width: '100%',
  maxWidth: '400px',
});

// Estilo para o contêiner das imagens
const StyledImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
  },
}));

// Estilo para as imagens
const StyledImage = styled('img')({
  width: '100%',
  height: 'auto',
  borderRadius: '10px',
  objectFit: 'cover',
  transition: 'opacity 0.3s',
  '&:hover': {
    opacity: 0.9,
  },
});

const Album: React.FC = () => {
  const [selectedAlbum, setSelectedAlbum] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [albums, setAlbums] = useState<{ title: string; images: string[] }[]>([
    {
      title: 'Familia Rodolpho',
      images: ['http://casamento.thcinesantos.shop/images/familia-rodolpho/sara1.jpg']
    },
    {
      title: 'Familia Santos',
      images: ['https://static.vecteezy.com/system/resources/previews/011/850/801/non_2x/wedding-couple-love-atl-png.png']
    },
    {
      title: 'Familia Balbino',
      images: ['https://static.vecteezy.com/system/resources/previews/011/850/801/non_2x/wedding-couple-love-atl-png.png']
    },
    {
      title: 'Familia Santiago',
      images: ['https://static.vecteezy.com/system/resources/previews/011/850/801/non_2x/wedding-couple-love-atl-png.png']
    }
  ]);

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
                    <Button
                      variant="contained"
                      onClick={() => handleDownload(image, `Foto${index + 1}.jpg`)}
                      sx={{ marginTop: '10px' }}
                    >
                      Download
                    </Button>
                  </StyledImageContainer>
                ))}
              </Slider>
              <Button variant="contained" onClick={() => setSelectedAlbum(null)} sx={{ marginTop: '20px' }}>
                Voltar para álbuns
              </Button>
              <Grid container spacing={2} sx={{ marginTop: '20px' }}>
                {albums[selectedAlbum].images.map((image, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <StyledImageContainer>
                      <StyledImage src={image} alt={`Foto ${index + 1}`} />
                      <Button
                        variant="contained"
                        onClick={() => handleDownload(image, `Foto${index + 1}.jpg`)}
                        sx={{ marginTop: '10px' }}
                      >
                        Download
                      </Button>
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
