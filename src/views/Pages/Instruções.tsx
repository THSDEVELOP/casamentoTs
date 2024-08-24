import React from 'react';
import { Box, Typography } from '@mui/material';
import BackgroundContainer from '../../shared/components/BackgroundContainer';
import { StyledText } from '../../styles/StyledTexts/StyledText';
import { CustomContainerHome } from '../../styles/StyledContainer/CustomContainer';
import CustomButtonHome from '../../styles/StyledButton/CustomButtonHome';
import { useNavigate } from 'react-router-dom';

const Instrucoes: React.FC = () => {
  const navigate = useNavigate();

  return (
    <BackgroundContainer>
      <CustomContainerHome>
        <Box sx={{ padding: '20px', textAlign: 'center' }}>
          <StyledText variant="h2" gutterBottom>
            Instruções de Uso
          </StyledText>

          <StyledText variant="h3" gutterBottom>
            Bem-vindo ao site do nosso casamento!
          </StyledText>

          <Box sx={{ marginBottom: '20px' }}>
            <Typography variant="body1" gutterBottom>
              Esta página inicial contém quatro seções principais para ajudá-lo a navegar pelo site:
            </Typography>
            <Typography variant="body1" gutterBottom>
              1. <strong>Cadastro:</strong> Cadastre sua família e os membros que irão participar do evento. 
            </Typography>
            <Typography variant="body1" gutterBottom>
              2. <strong>Comentários:</strong> Deixe suas felicitações e mensagens para os noivos.
            </Typography>
            <Typography variant="body1" gutterBottom>
              3. <strong>Lista de Presentes:</strong> Veja os itens que os noivos desejam para a nova casa e contribua.
            </Typography>
            <Typography variant="body1" gutterBottom>
              4. <strong>Álbum:</strong> Visualize as fotos do casal e os álbuns compartilhados.
            </Typography>
          </Box>

          <StyledText variant="h4" gutterBottom>
            Como Utilizar:
          </StyledText>
          <Typography variant="body1" gutterBottom>
            - Na <strong>página de Cadastro</strong>, preencha o nome da sua família e os nomes dos membros para registrar sua presença.
          </Typography>
          <Typography variant="body1" gutterBottom>
            - Na <strong>página de Comentários</strong>, escreva uma mensagem especial para os noivos.
          </Typography>
          <Typography variant="body1" gutterBottom>
            - Na <strong>página da Lista de Presentes</strong>, escolha um presente que gostaria de oferecer aos noivos.
          </Typography>
          <Typography variant="body1" gutterBottom>
            - Na <strong>página do Álbum</strong>, veja as fotos do evento e compartilhe suas próprias fotos.
          </Typography>

          <CustomButtonHome variant="contained" onClick={() => navigate('/')}>
            Voltar para o Início
          </CustomButtonHome>
        </Box>
      </CustomContainerHome>
    </BackgroundContainer>
  );
};

export default Instrucoes;
