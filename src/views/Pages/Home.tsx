import React, { useState } from 'react';
import { Box, Modal, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BackgroundContainer from '../../shared/components/BackgroundContainer';
import { StyledText } from '../../styles/StyledTexts/StyledText';
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

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-instrucoes-title"
            aria-describedby="modal-instrucoes-description"
          >
            <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80%',
              maxHeight: '75%',
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
              backgroundImage: 'url(/path-to-papiro-image.png)',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              overflowY: 'auto',
            }}>
              <StyledText id="modal-instrucoes-title" variant="h4" component="h2">
                Instruções
              </StyledText>
              <Typography id="modal-instrucoes-description" sx={{ mt: 2 }}>
                <strong>Registro:</strong> Registre sua família e os membros que irão participar do evento clicando no "botão registro", em sobrenome da familia digite apenas o sobrenome sem a necessidade de escrever a palavra familia, ao adicionar os membros e clicado no botão enviar você será redirecionado a seção de comentários, é importante seu registro para nosso controle de participações e o envio do convite formal posteriormente.
              </Typography>
              <Typography sx={{ mt: 2 }}>
                <strong>Comentários:</strong> Caso deseje, deixe suas felicitações aos noivos.
              </Typography>
              <Typography sx={{ mt: 2 }}>
                <strong>Lista de Presentes:</strong> Veja os itens que os noivos desejam para a nova casa e contribua, os itens listados dentro da seção "Lista de Presentes" não são obrigatórios, o que nos importa é sua presença para compartilhar de nossa felicidade.
              </Typography>
              <Typography sx={{ mt: 2 }}>
                <strong>Álbum:</strong> Na seção Álbum, após o casamento todas as fotos serão disponibilizadas, cada família terá seu álbum individualizado para recordação do nosso casamento onde será possível realizar o download das imagens.
              </Typography>
            </Box>
          </Modal>
        <CustomButtonHome variant="contained" onClick={handleOpen} sx={{ marginBottom: '1rem' }}>
          Instruções
        </CustomButtonHome>
        <CustomButtonHome variant="contained" onClick={() => navigate('/guestregistration')} sx={{ marginBottom: '1rem' }}>
          Cadastro
        </CustomButtonHome>
        <CustomButtonHome variant="contained" onClick={() => navigate('/felicidades')} sx={{ marginBottom: '1rem' }}>
          Comentários
        </CustomButtonHome>
        <CustomButtonHome variant="contained" onClick={() => navigate('/giftlist')} sx={{ marginBottom: '1rem' }}>
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
  ];

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
            Nosso Casamento
          </StyledText>
          <StyledText variant="h3" gutterBottom align="center" sx={{ marginBottom: '3rem' }}>
            Sara & Tharsys
          </StyledText>
          <ImageCarousel images={images} navigate={navigate} />
        </Box>
      </CustomContainerHome>
    </BackgroundContainer>
  );
};

export default Home;
