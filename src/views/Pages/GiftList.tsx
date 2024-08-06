import React, { useState, useEffect } from 'react';
import { Container, List, ListItem, Box, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';
import BackgroundContainer from '../../shared/components/BackgroundContainer';
import axios from 'axios';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { StyledText } from '../../styles/StyledTexts/StyledText'; // Importe o StyledText
import {CustomContainerGiftList} from '../../styles/StyledContainer/CustomContainer';

const StyledList = styled(List)({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
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
  width: '250px',
  margin: '10px',
  border: '1px solid #d4af37',
  borderRadius: '10px',
  padding: '10px',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  transition: 'transform 0.2s, box-shadow 0.2s',
});

const ItemImage = styled('img')({
  width: '200px',
  height: '180px',
  objectFit: 'cover',
});

const GiftList: React.FC = () => {
  const [inputAmount, setInputAmount] = useState<number>(0);
  const [confirmedAmount, setConfirmedAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [pixQRCode, setPixQRCode] = useState<string | null>(null);
  const targetAmount = 100000;

  useEffect(() => {
    const ws = new ReconnectingWebSocket('ws://backend:5000');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setConfirmedAmount((prevAmount) => prevAmount + data.amount);
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleItemClick = (url: string) => {
    window.location.href = url;
  };

  const handleInputAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!isNaN(Number(value)) && Number(value) >= 0 && Number(value) <= targetAmount) {
      setInputAmount(Number(value));
    } else if (value === '') {
      setInputAmount(0);
    }
  };

  const handlePixPayment = async () => {
    setLoading(true);
    const amount = inputAmount;
    try {
      const response = await axios.post(
        'http://backend:5000/api/create_pix_payment',
        { amount }
      );
      const qrCode = response.data.point_of_interaction.transaction_data.qr_code_base64;
      setPixQRCode(qrCode);
      setInputAmount(0);
    } catch (error) {
      console.error('Erro ao criar pagamento PIX', error);
    } finally {
      setLoading(false);
    }
  };

  const progress = confirmedAmount ? (confirmedAmount / targetAmount) * 100 : 0;

  const giftItems = [
    { name: 'Lava e Seca', imageUrl: 'https://imgs.extra.com.br/55048501/1g.jpg', url: 'https://www.extra.com.br/lava-e-seca-samsung-wd11m-3-em-1-inox-look-com-lavagem-a-seco-wd11m4473px-11-kg-55048501/p/55048501?utm_medium=cpc&utm_source=GP_PLA&IdSku=55048501&idLojista=228168&tipoLojista=3P&gclsrc=aw.ds&&utm_campaign=3p_gg_pmax_eldo&gad_source=1&gclid=CjwKCAjwhvi0BhA4EiwAX25uj5IArz1FhcobpOnBVvUnh9Qfyf4XXOhd-jTgnesCabTWwJcC7qr87RoC2d0QAvD_BwE' },
    { name: 'Geladeira', imageUrl: 'https://brastemp.vtexassets.com/arquivos/ids/242082-500-500?v=638461236485470000&width=500&height=500&aspect=true.png', url: 'https://www.brastemp.com.br/geladeira-brastemp-frost-free-inverse-a-479-litros-cor-inox-com-super-capacidade-e-smart-flow-bre58fk/p?idsku=326125829&utmi_cp=cpc&utmi_campaign=cpc&gad_source=1&gclid=CjwKCAjwhvi0BhA4EiwAX25uj465Wqa7vt13uBnZkbzLzy06qiNAyc31_kl_VPdwvPikhd-sbXrqSxoCiOoQAvD_BwE' },
    // Adicione mais itens conforme necessário
  ];

  return (
    <BackgroundContainer>
      <CustomContainerGiftList>
        <StyledText variant="h4">Lista de Presentes</StyledText>
        <StyledText variant="subtitle1">
          Ajude-nos a mobiliar nossa nova casa! Contribua em nossa nova etapa :D
        </StyledText>
        <StyledList>
          {giftItems.map((item, index) => (
            <StyledListItem key={index} onClick={() => handleItemClick(item.url)}>
              <StyledText>{item.name}</StyledText>
              <ItemImage src={item.imageUrl} alt={item.name} />
            </StyledListItem>
          ))}
        </StyledList>
        <StyledText variant="body1" gutterBottom>
          Caso você seja nosso chefe, um aumento salarial seria o suficiente! kk
        </StyledText>
        <StyledText variant="body1" gutterBottom>
          Ou envie um presente em dinheiro pela chave PIX: 123.456.789-00
        </StyledText>
        <StyledText variant="body2" gutterBottom>
          Endereço para a entrega dos itens: Rua Oswaldo Mezadri, 619 - Jardim Mirante dos Ovnis - Bloco 2B apartamento 202B Votorantim
        </StyledText>
        <StyledText variant="body2" gutterBottom>
          Quem irá receber: Tharsys Da Silva De Oliveira Santos
        </StyledText>
        <StyledText variant="body2" gutterBottom>
          Obrigado! :D
        </StyledText>
      </CustomContainerGiftList>
    </BackgroundContainer>
  );
};

export default GiftList;
