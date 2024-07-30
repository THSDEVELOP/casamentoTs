import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, Box, LinearProgress, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';
import BackgroundContainer from '../../shared/components/BackgroundContainer';
import axios from 'axios';
import ReconnectingWebSocket from 'reconnecting-websocket';

const StyledContainer = styled(Container)({
  padding: '40px',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  minHeight: '100vh',
  marginTop: '64px', // Considera a altura da AppBar
});

const StyledList = styled(List)({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
});

const StyledListItem = styled(ListItem)({
  color: '#b8860b', // Cor do texto dourada
  '&:hover': {
    color: '#d4af37', // Cor do texto ao passar o mouse
    cursor: 'pointer',
    transform: 'scale(1.05)', // Aumenta o tamanho do item ao passar o mouse
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Adiciona uma sombra ao passar o mouse
  },
  flexDirection: 'column',
  alignItems: 'center',
  width: '250px', // Largura fixa para os itens
  margin: '10px', // Margem para espaçar os itens
  border: '1px solid #d4af37', // Borda dourada
  borderRadius: '10px', // Borda arredondada
  padding: '10px', // Espaçamento interno
  backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fundo semitransparente
  transition: 'transform 0.2s, box-shadow 0.2s', // Adiciona uma transição suave
});

const ItemImage = styled('img')({
  width: '200px',
  height: '180px',
  objectFit: 'cover',
});

const CustomTypography = styled(Typography)({
  color: '#b8860b',
  fontFamily: 'cursive',
  fontStyle: 'italic',
  margin: '10px',
});

const GiftList: React.FC = () => {
  const [inputAmount, setInputAmount] = useState<number>(0);
  const [confirmedAmount, setConfirmedAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [pixQRCode, setPixQRCode] = useState<string | null>(null);
  const targetAmount = 100000;

  useEffect(() => {
    const ws = new ReconnectingWebSocket('ws://backend:5000'); // Atualize para 'ws://backend:5000'
  
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
        'http://backend:5000/api/create_pix_payment', // Atualize para 'http://backend:5000/api/create_pix_payment'
        { amount }
      );
      const qrCode = response.data.point_of_interaction.transaction_data.qr_code_base64;
      setPixQRCode(qrCode);
      setInputAmount(0); // Reset input amount after sending the request
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
      <StyledContainer>
        <CustomTypography variant="h4">Lista de Presentes</CustomTypography>
        <CustomTypography variant="subtitle1">
          Ajude-nos a mobiliar nossa nova casa! Contribua em nossa nova etapa :D
        </CustomTypography>
        <StyledList>
          {giftItems.map((item, index) => (
            <StyledListItem key={index} onClick={() => handleItemClick(item.url)}>
              <Typography>{item.name}</Typography>
              <ItemImage src={item.imageUrl} alt={item.name} />
            </StyledListItem>
          ))}
        </StyledList>
        <Box mt={4} textAlign="center">
          <CustomTypography variant="h5" gutterBottom>
            Deseja Enviar um presente em dinheiro?
          </CustomTypography>
          <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
            <TextField
              type="number"
              value={inputAmount}
              onChange={handleInputAmountChange}
              inputProps={{ min: 0, max: targetAmount }}
              variant="outlined"
              size="small"
              placeholder="Digite o valor"
              style={{ marginRight: '10px' }}
            />
            <Button variant="contained" onClick={handlePixPayment} sx={{ backgroundColor: '#b8860b', color: '#fff', '&:hover': { backgroundColor: '#d4af37' } }}>
              {loading ? 'Processando...' : 'Enviar'}
            </Button>
          </Box>
          <Typography variant="body2" color="textSecondary">{`R$ ${confirmedAmount.toLocaleString('pt-BR')} / R$ ${targetAmount.toLocaleString('pt-BR')}`}</Typography>
        </Box>
        {pixQRCode && (
          <Box mt={4} textAlign="center" display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h6" gutterBottom>
              Escaneie o código QR com seu aplicativo de banco para fazer o pagamento via PIX:
            </Typography>
            <img src={`data:image/png;base64,${pixQRCode}`} alt="PIX QR Code" style={{ width: '200px', height: '200px' }} />
          </Box>
        )}
        <CustomTypography variant="body1" gutterBottom>
          Caso você seja nosso chefe um aumento salarial seria o suficiente! kk
        </CustomTypography>
        <CustomTypography variant="body1" gutterBottom>
          Ou envie um presente em dinheiro pela chave PIX: 123.456.789-00
        </CustomTypography>
        <CustomTypography variant="body2" gutterBottom>
          Endereço para a entrega dos itens: Rua Oswaldo Mezadri, 619 - Jardim Mirante dos Ovnis - Bloco 2B apartamento 202B Votorantim
        </CustomTypography>
        <CustomTypography variant="body2" gutterBottom>
          Quem irá receber: Tharsys Da Silva De Oliveira Santos
        </CustomTypography>
        <CustomTypography variant="body2" gutterBottom>
          Obrigado! :D
        </CustomTypography>
      </StyledContainer>
    </BackgroundContainer>
  );
};

export default GiftList;
