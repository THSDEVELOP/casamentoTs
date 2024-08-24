import React, { useContext, useEffect, useState } from 'react';
import { GuestContext } from '../../context/GuestContext/GuestContext';
import { Container, List, ListItem, TextField, Button, Snackbar, Box } from '@mui/material';
import { styled } from '@mui/system';
import BackgroundContainer from '../../shared/components/BackgroundContainer';
import { db } from './firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { StyledText, CustomTextField } from '../../styles/StyledTexts/StyledText';
import { CustomContainerFelicidades } from '../../styles/StyledContainer/CustomContainer';
import CustomButtonHome from '../../styles/StyledButton/CustomButtonHome';

interface Wish {
  family: string;
  representative: string;
  wish: string;
}

const CommentContainer = styled('div')(({ theme }) => ({
  textAlign: 'center',
  marginBottom: '10px',
}));

const StyledSnackbar = styled(Snackbar)({
  '& .MuiSnackbarContent-root': {
    backgroundColor: '#d4af37',
    color: '#fff',
  },
});

const StyledListItem = styled(ListItem)(({ theme }) => ({
  fontFamily: 'cursive',
  color: '#b8860b',
  fontStyle: 'italic',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '20px',
}));

const WishContent = styled('div')(({ theme }) => ({
  textAlign: 'justify',
  padding: '0 16px',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  overflowWrap: 'break-word',
  color: '#000000',
}));


const Felicidades: React.FC = () => {
  const { familyName, members } = useContext(GuestContext)!;
  const [wishes, setWishes] = useState('');
  const [representativeName, setRepresentativeName] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [wishesList, setWishesList] = useState<Wish[]>([]);

  // Remove "Família" do nome da família, se presente
  const cleanFamilyName = familyName?.replace(/família/i, '').trim();

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
          family: cleanFamilyName || '',
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
            Família {cleanFamilyName}
          </StyledText>
          <StyledText variant="body1" gutterBottom>
            Estamos felizes em convidar-los:
          </StyledText>
          <List>
            {members.map((member, index) => (
              <StyledListItem key={index}>
                {member.name}
              </StyledListItem>
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
            label="Felicidades!"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={wishes}
            onChange={handleWishesChange}
          />
          <CustomButtonHome onClick={handleSubmit}>
            Enviar Comentário
          </CustomButtonHome>
          <StyledSnackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            message="Obrigado pelas felicitações!"
          />
          <Box mt={4}>
            <StyledText variant="h5" gutterBottom>
              Comentários das Famílias Convidadas
            </StyledText>
            <List>
              {wishesList.map((entry, index) => {
                const cleanEntryFamilyName = entry.family.replace(/família/i, '').trim();
                return (
                  <StyledListItem key={index}>
                    <CommentContainer>
                      <strong>{cleanEntryFamilyName} - {entry.representative}:</strong>
                      <WishContent>{entry.wish}</WishContent>
                    </CommentContainer>
                  </StyledListItem>
                );
              })}
            </List>
          </Box>
        </CustomContainerFelicidades>
      </Box>
    </BackgroundContainer>
  );
};

export default Felicidades;
