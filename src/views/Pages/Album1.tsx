import React, { useState } from 'react';
import { Box, Grid, TextField, InputAdornment, SvgIcon, Modal, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import BackgroundContainer from '../../shared/components/BackgroundContainer';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { StyledText } from '../../styles/StyledTexts/StyledText';
import { CustomContainerAlbum } from '../../styles/StyledContainer/CustomContainer';
import { AlbumCard } from '../../styles/StyledImagesAlbum/StyledAlbum';
import albumsData from '../../data/albums.json';
import CustomButtonHome from '../../styles/StyledButton/CustomButtonHome';

const CrownIcon = (props: any) => (
  <SvgIcon {...props}>
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </SvgIcon>
);

const hoverShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';

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

const StyledImage = styled('img')<{
  isChacara?: boolean;
}>({
  width: '1200px',
  height: '500px',
  objectFit: 'cover',
  borderRadius: '10px',
  transition: 'opacity 0.3s, box-shadow 0.3s',
  cursor: 'pointer',
  '&:hover': {
    opacity: 0.9,
    boxShadow: hoverShadow,
  },
});

const CrownContainer = styled(Box)({
  position: 'absolute',
  top: '10px',
  right: '10px',
  color: '#b8860b',
  zIndex: 1,
  fontSize: '2rem',
});

const ModalImage = styled('img')({
  width: '100%',
  maxWidth: '90vw',
  maxHeight: '80vh',
  objectFit: 'contain',
  borderRadius: '10px',
});

const ModalContent = styled(Box)({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  outline: 'none',
});

const NavigationButton = styled(IconButton)({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  color: '#fff',
  zIndex: 2,
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
});

const Album: React.FC = () => {
  const [selectedAlbum, setSelectedAlbum] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [albums, setAlbums] = useState<{ title: string; images: string[] }[]>(albumsData);

  const filteredAlbums = albums.filter(album => album.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const settings = {
    dots: false,
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

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleNextImage = () => {
    if (selectedAlbum !== null) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % albums[selectedAlbum].images.length);
    }
  };

  const handlePrevImage = () => {
    if (selectedAlbum !== null) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + albums[selectedAlbum].images.length) % albums[selectedAlbum].images.length);
    }
  };

  // Dentro do componente Album, substitua a renderização do SearchField por essa condicional
return (
  <BackgroundContainer>
    <CustomContainerAlbum>
      {/* Condicional para exibir a barra de busca apenas quando nenhum álbum estiver selecionado */}
      {selectedAlbum === null && (
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
      )}
      <Box sx={{ width: '100%', maxWidth: '800px', margin: '0 auto', marginBottom: '40px' }}>
        {selectedAlbum === null ? (
          <Grid container spacing={2}>
            {filteredAlbums.map((album, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <AlbumCard
                  variant="contained"
                  onClick={() => setSelectedAlbum(index)}
                >
                  {index < 5 && (
                    <CrownContainer>
                      <CrownIcon fontSize="large" />
                    </CrownContainer>
                  )}
                  <StyledImageContainer>
                    <StyledImage
                      src={album.images[0]}
                      alt={`Capa do álbum ${album.title}`}
                      isChacara={album.title.toLowerCase() === 'chácara'}
                    />
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
                  <StyledImage
                    src={image}
                    alt={`Foto ${index + 1}`}
                    isChacara={albums[selectedAlbum].title.toLowerCase() === 'chácara'}
                    onClick={() => openModal(index)}
                  />
                  {albums[selectedAlbum].title.toLowerCase() !== 'chácara' && (
                    <CustomButtonHome
                      variant="contained"
                      onClick={() => handleDownload(image, `Foto${index + 1}.jpg`)}
                      sx={{ marginTop: '10px' }}
                    >
                      Download
                    </CustomButtonHome>
                  )}
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
                    <StyledImage
                      src={image}
                      alt={`Foto ${index + 1}`}
                      isChacara={albums[selectedAlbum].title.toLowerCase() === 'chácara'}
                      onClick={() => openModal(index)}
                    />
                    {albums[selectedAlbum].title.toLowerCase() !== 'chácara' && (
                      <CustomButtonHome
                        variant="contained"
                        onClick={() => handleDownload(image, `Foto${index + 1}.jpg`)}
                        sx={{ marginTop: '10px' }}
                      >
                        Download
                      </CustomButtonHome>
                    )}
                  </StyledImageContainer>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Box>
    </CustomContainerAlbum>

    {/* Modal para visualizar a imagem */}
    <Modal
      open={isModalOpen}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalContent>
        <NavigationButton onClick={handlePrevImage} sx={{ left: '10px' }}>
          <ArrowBackIosNewIcon />
        </NavigationButton>
        <ModalImage src={selectedAlbum !== null ? albums[selectedAlbum].images[currentImageIndex] : ''} alt="Imagem ampliada" />
        <NavigationButton onClick={handleNextImage} sx={{ right: '10px' }}>
          <ArrowForwardIosIcon />
        </NavigationButton>
        <IconButton onClick={closeModal} sx={{ position: 'absolute', top: '10px', right: '10px', color: '#fff' }}>
          <CloseIcon />
        </IconButton>
      </ModalContent>
    </Modal>
  </BackgroundContainer>
);

};

export default Album;
