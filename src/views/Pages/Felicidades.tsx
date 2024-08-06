import React, { useContext, useEffect, useState } from 'react';
import { GuestContext } from '../../context/GuestContext/GuestContext';
import { Container, List, ListItem, TextField, Button, Snackbar, Box } from '@mui/material';
import { styled } from '@mui/system';
import BackgroundContainer from '../../shared/components/BackgroundContainer';
import { db } from './firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { StyledText, CustomTextField } from '../../styles/StyledTexts/StyledText';
import {CustomContainerFelicidades} from '../../styles/StyledContainer/CustomContainer';
import CustomButtonHome from '../../styles/StyledButton/CustomButtonHome';

interface Wish {
  family: string;
  representative: string;
  wish: string;
}

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
  }, []);

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
        <CustomContainerFelicidades>
          <StyledText variant="h4" gutterBottom>
            Família {familyName}
          </StyledText>
          <StyledText variant="body1" gutterBottom>
            Estamos felizes em convidar-los:
          </StyledText>
          <List>
            {members.map((member, index) => (
              <ListItem key={index}>
                {member.name} (Idade: {member.age})
              </ListItem>
            ))}
          </List>
          <StyledText variant="body1" gutterBottom>
            Nome do Representante da Família:
          </StyledText>
          <CustomTextField
            label="Nome do Representante"
            variant="outlined"
            fullWidth
            value={representativeName}
            onChange={handleRepresentativeNameChange}
          />
          <StyledText variant="body1" gutterBottom>
            Deixe suas felicitações aos noivos:
          </StyledText>
          <CustomTextField
            label="Felicitações"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={wishes}
            onChange={handleWishesChange}
          />
          <CustomButtonHome onClick={handleSubmit}>
            Enviar Felicitações
          </CustomButtonHome>
          <StyledSnackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            message="Obrigado pelas felicitações!"
          />
          <Box mt={4}>
            <StyledText variant="h5" gutterBottom>
              Felicitações das Famílias Convidadas
            </StyledText>
            <List>
              {wishesList.map((entry, index) => (
                <ListItem key={index}>
                  <strong>Família {entry.family} - {entry.representative}:</strong> {entry.wish}
                </ListItem>
              ))}
            </List>
          </Box>
        </CustomContainerFelicidades>
      </Box>
    </BackgroundContainer>
  );
};

export default Felicidades;
