import React, { useState } from 'react';
import { List, ListItem, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/system';
import BackgroundContainer from '../../shared/components/BackgroundContainer';
import { StyledText } from '../../styles/StyledTexts/StyledText';
import { CustomContainerGiftList } from '../../styles/StyledContainer/CustomContainer';
import presentesData from '../../data/presentes.json';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const StyledList = styled(List)({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '20px',
  padding: '0 10px',
});

const StyledListItem = styled(ListItem)({
  color: '#b8860b',
  '&:hover': {
    color: '#d4af37',
    cursor: 'pointer',
    transform: 'scale(1.05)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: '280px',
  height: '240px',
  margin: '10px auto',
  border: '1px solid #d4af37',
  borderRadius: '10px',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  transition: 'transform 0.2s, box-shadow 0.2s',
});

const ItemImage = styled('img')({
  width: '100%',
  height: '100%',
  padding: '10px',
  objectFit: 'contain',
  maxWidth: '240px',
  maxHeight: '200px',
});

const GiftList: React.FC = () => {
  const [giftItems] = useState(presentesData);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleItemClick = (url: string) => {
    window.location.href = url;
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: false,
    adaptiveHeight: true,
  };

  return (
    <BackgroundContainer>
      <CustomContainerGiftList>
        <StyledText variant="h4">Lista de Presentes</StyledText>
        <StyledText variant="subtitle1">
          Ajude-nos a mobiliar nossa nova casa! Contribua em nossa nova etapa :D
        </StyledText>

        {giftItems.map((comodo, comodoIndex) => (
          <div key={comodoIndex}>
            <StyledText variant="h5" gutterBottom>{comodo.comodo}</StyledText>
            {isMobile && comodo.moveis.length > 1 ? (
              <Slider {...sliderSettings}>
                {comodo.moveis.map((item, itemIndex) => (
                  <StyledListItem key={itemIndex} onClick={() => handleItemClick(item.url)}>
                    <StyledText>{item.name}</StyledText>
                    <ItemImage src={item.imageUrl} alt={item.name} />
                  </StyledListItem>
                ))}
              </Slider>
            ) : (
              <StyledList>
                {comodo.moveis.map((item, itemIndex) => (
                  <StyledListItem key={itemIndex} onClick={() => handleItemClick(item.url)}>
                    <StyledText>{item.name}</StyledText>
                    <ItemImage src={item.imageUrl} alt={item.name} />
                  </StyledListItem>
                ))}
              </StyledList>
            )}
          </div>
        ))}

        <StyledText variant="body1" gutterBottom  paddingTop={"1rem"} gap={"1rem"}>
          Obrigado por confirmar sua presença em nosso casamento! :D, todos os itens acima são apenas sugestões de presentes, 
          fique à vontade para escolher o que achar melhor mesmo que o item não esteja acima, lembranças são bem-vindas, 
          o importante é sua presença em nosso dia especial!
        </StyledText>
        <StyledText variant="body1" gutterBottom>
          Endereço para a entrega: Rua Oswaldo Mezadri, 619 - Jardim Mirante dos Ovnis - Bloco 2B apartamento 202B Votorantim.
        </StyledText>
        <StyledText variant="body1" gutterBottom>
          Quem irá receber: Tharsys Da Silva De Oliveira Santos
        </StyledText>
      </CustomContainerGiftList>
    </BackgroundContainer>
  );
};

export default GiftList;
