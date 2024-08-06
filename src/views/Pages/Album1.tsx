import React, { useState } from 'react';
import { Box, Grid, Button, TextField } from '@mui/material';
import { styled } from '@mui/system';
import BackgroundContainer from '../../shared/components/BackgroundContainer';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { StyledText, CustomTextField } from '../../styles/StyledTexts/StyledText';
import {CustomContainerAlbum} from '../../styles/StyledContainer/CustomContainer';
import { ImageContainer, Image, GalleryImage } from '../../styles/StyledImagesAlbum/StyledImagesAlbum';
import { AlbumCard, AlbumImage } from '../../styles/StyledImagesAlbum/StyledAlbum';

const SearchField = styled(TextField)({
  marginBottom: '20px',
  width: '100%',
  maxWidth: '400px',
});

const Album: React.FC = () => {
  const [selectedAlbum, setSelectedAlbum] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const albums = [
    {
      title: 'Familia Santos',
      images: [
        'https://static.vecteezy.com/system/resources/previews/011/850/801/non_2x/wedding-couple-love-atl-png.png',
        'https://static.vecteezy.com/system/resources/previews/011/850/801/non_2x/wedding-couple-love-atl-png.png',
      ],
    },
    {
      title: 'Familia Balbino',
      images: [
        'https://static.vecteezy.com/system/resources/previews/011/850/801/non_2x/wedding-couple-love-atl-png.png',
        'https://static.vecteezy.com/system/resources/previews/011/850/801/non_2x/wedding-couple-love-atl-png.png',
      ],
    },
    {
      title: 'Familia Rodolpho',
      images: [
        'https://static.vecteezy.com/system/resources/previews/011/850/801/non_2x/wedding-couple-love-atl-png.png',
        'https://static.vecteezy.com/system/resources/previews/011/850/801/non_2x/wedding-couple-love-atl-png.png',
      ],
    },

    {
      title: 'Familia Santiago',
      images: [
        'https://static.vecteezy.com/system/resources/previews/011/850/801/non_2x/wedding-couple-love-atl-png.png',
        'https://static.vecteezy.com/system/resources/previews/011/850/801/non_2x/wedding-couple-love-atl-png.png',
      ],
    },
  ];

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
                    <AlbumImage src={album.images[0]} alt={`Capa do álbum ${album.title}`} />
                    <StyledText variant="h6">{album.title}</StyledText>
                  </AlbumCard>
                </Grid>
              ))}
            </Grid>
          ) : (
            <>
              <Slider {...settings}>
                {albums[selectedAlbum].images.map((image, index) => (
                  <ImageContainer key={index}>
                    <Image src={image} alt={`Foto ${index + 1}`} />
                  </ImageContainer>
                ))}
              </Slider>
              <Button variant="contained" onClick={() => setSelectedAlbum(null)} sx={{ marginTop: '20px' }}>
                Voltar para álbuns
              </Button>
              <Grid container spacing={2} sx={{ marginTop: '20px' }}>
                {albums[selectedAlbum].images.map((image, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <GalleryImage src={image} alt={`Foto ${index + 1}`} />
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
