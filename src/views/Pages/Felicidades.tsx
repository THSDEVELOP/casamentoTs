import React, { useContext, useEffect, useState } from 'react';
import { GuestContext } from '../../context/GuestContext/GuestContext';
import { Container, Typography, List, ListItem, TextField, Button, Snackbar, Box } from '@mui/material';
import { styled } from '@mui/system';
import BackgroundContainer from '../../shared/components/BackgroundContainer';
import { db } from './firebase';
import firebase from 'firebase/compat/app'; // Adicione esta linha para importar firebase
import 'firebase/compat/firestore';

interface Wish {
  family: string;
  representative: string;
  wish: string;
}

const StyledContainer = styled(Container)({
  padding: '40px',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
});

const StyledTextField = styled(TextField)({
  marginBottom: '20px',
  '& .MuiInputBase-root': {
    backgroundColor: '#fff',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#d4af37',
    },
    '&:hover fieldset': {
      borderColor: '#b8860b',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#b8860b',
    },
  },
});

const StyledButton = styled(Button)({
  backgroundColor: '#d4af37',
  color: '#fff',
  padding: '10px 20px',
  margin: '10px',
  '&:hover': {
    backgroundColor: '#b8860b',
  },
});

const StyledSnackbar = styled(Snackbar)({
  '& .MuiSnackbarContent-root': {
    backgroundColor: '#d4af37',
    color: '#fff',
  },
});

const Felicidades: React.FC = () => {
  const { familyName, members } = useContext(GuestContext)!;
  const [wishes, setWishes] = useState('');
  const [representativeName, setRepresentativeName] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [wishesList, setWishesList] = useState<Wish[]>([]);

  useEffect(() => {
    const unsubscribe = db.collection('wishes')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        const wishesData = snapshot.docs.map(doc => doc.data() as { family: string, representative: string; wish: string });
        setWishesList(wishesData);
      });
  
    return () => unsubscribe();
  }, []); // Dependência vazia para rodar apenas uma vez ao montar

  const handleWishesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWishes(event.target.value);
  };

  const handleRepresentativeNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRepresentativeName(event.target.value);
  };

  const handleSubmit = async () => {
    if (representativeName && wishes) {
      try {
        await db.collection('wishes').add({
          family: familyName || '',
          representative: representativeName,
          wish: wishes,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setSnackbarOpen(true);
        setWishes('');
        setRepresentativeName('');
      } catch (error) {
        console.error('Error saving wish: ', error);
      }
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <BackgroundContainer>
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <StyledContainer>
          <Typography variant="h4" gutterBottom sx={{ color: '#b8860b', fontFamily: 'cursive', fontStyle: 'italic' }}>
            Família {familyName}
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ color: '#b8860b', fontFamily: 'cursive', fontStyle: 'italic' }}>
            Estamos felizes em convidar-los:
          </Typography>
          <List>
            {members.map((member, index) => (
              <ListItem key={index}>
                {member.name} (Idade: {member.age})
              </ListItem>
            ))}
          </List>
          <Typography variant="body1" gutterBottom sx={{ color: '#b8860b', fontFamily: 'cursive', fontStyle: 'italic' }}>
            Nome do Representante da Família:
          </Typography>
          <StyledTextField
            label="Nome do Representante"
            variant="outlined"
            fullWidth
            value={representativeName}
            onChange={handleRepresentativeNameChange}
          />
          <Typography variant="body1" gutterBottom sx={{ color: '#b8860b', fontFamily: 'cursive', fontStyle: 'italic' }}>
            Deixe suas felicitações aos noivos:
          </Typography>
          <StyledTextField
            label="Felicitações"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={wishes}
            onChange={handleWishesChange}
          />
          <StyledButton onClick={handleSubmit}>
            Enviar Felicitações
          </StyledButton>
          <StyledSnackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            message="Obrigado pelas felicitações!"
          />
          <Box mt={4}>
            <Typography variant="h5" gutterBottom sx={{ color: '#b8860b', fontFamily: 'cursive', fontStyle: 'italic' }}>
              Felicitações das Famílias Convidadas
            </Typography>
            <List>
              {wishesList.map((entry, index) => (
                <ListItem key={index}>
                  <strong>Família {entry.family} - {entry.representative}:</strong> {entry.wish}
                </ListItem>
              ))}
            </List>
          </Box>
        </StyledContainer>
      </Box>
    </BackgroundContainer>
  );
};

export default Felicidades;
