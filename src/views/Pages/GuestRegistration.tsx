import React, { useState, useContext } from 'react';
import { GuestContext } from '../../context/GuestContext';
import { Box, Button, Container, TextField, Typography, Snackbar } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import BackgroundContainer from '../../shared/components/BackgroundContainer';

interface FamilyMember {
    name: string;
    age: number;
}

const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID || '';
const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || '';
const userId = process.env.REACT_APP_EMAILJS_USER_ID || '';

const StyledContainer = styled(Container)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    minHeight: '100vh',
    borderRadius: '10px',
    padding: '40px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    marginTop: '64px', // Considera a altura da CustomBar
});

const StyledForm = styled('form')({
    width: '100%',
    maxWidth: '600px',
    marginTop: '20px', // Espaçamento entre o título e o formulário
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
    padding: '10px',
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

const GuestRegistration: React.FC = () => {
    const context = useContext(GuestContext);
    const navigate = useNavigate();

    if (!context) {
        throw new Error('GuestRegistration must be used within a GuestProvider');
    }

    const { setFamilyName, setMembers } = context;
    const [localFamilyName, setLocalFamilyName] = useState('');
    const [localMembers, setLocalMembers] = useState<FamilyMember[]>([{ name: '', age: 0 }]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const addMember = () => {
        setLocalMembers([...localMembers, { name: '', age: 0 }]);
    };

    const removeMember = (index: number) => {
        const newMembers = localMembers.filter((_, i) => i !== index);
        setLocalMembers(newMembers);
    };

    const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        const newMembers = localMembers.map((member, i) =>
            i === index ? { ...member, [name]: value } : member
        );
        setLocalMembers(newMembers);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setFamilyName(localFamilyName);
        setMembers(localMembers);

        console.log('Enviando dados:', { familyName: localFamilyName, members: localMembers });

        const templateParams = {
            from_name: localFamilyName,
            to_name: localMembers.map(member => `${member.name}, Idade: ${member.age}`).join('\n')
        };

        try {
            const response = await emailjs.send(serviceId, templateId, templateParams, userId);
            console.log('SUCCESS!', response.status, response.text);
            setSnackbarOpen(true);
            setTimeout(() => {
                navigate('/felicidades');
            }, 1500); // Espera 1.5 segundos antes de navegar
        } catch (error) {
            console.error('Erro ao enviar o email:', error);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <BackgroundContainer>
            <StyledContainer>
                <Typography variant="h4" gutterBottom sx={{ color: '#b8860b', fontFamily: 'cursive', fontStyle: 'italic' }}>
                    Cadastro de Convidados
                </Typography>
                <StyledForm onSubmit={handleSubmit}>
                    <StyledTextField
                        label="Nome da Família"
                        variant="outlined"
                        fullWidth
                        value={localFamilyName}
                        onChange={(e) => setLocalFamilyName(e.target.value)}
                    />
                    {localMembers.map((member, index) => (
                        <Box key={index} display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <StyledTextField
                                label="Nome"
                                variant="outlined"
                                name="name"
                                value={member.name}
                                onChange={(e) => handleInputChange(index, e)}
                                sx={{ flex: 3, mr: 2 }} // Aumentar a largura do campo Nome
                            />
                            <StyledTextField
                                label="Idade"
                                variant="outlined"
                                name="age"
                                type="number"
                                value={member.age.toString()}
                                onChange={(e) => handleInputChange(index, e)}
                                sx={{ flex: 1, mr: 2 }} // Diminuir a largura do campo Idade
                            />
                            <StyledButton
                                variant="contained"
                                color="secondary"
                                onClick={() => removeMember(index)}
                            >
                                Remover
                            </StyledButton>
                        </Box>
                    ))}
                    <StyledButton type="button" onClick={addMember}>
                        Adicionar Membro
                    </StyledButton>
                    <StyledButton type="submit">
                        Enviar
                    </StyledButton>
                </StyledForm>
                <StyledSnackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                    message="Obrigado por confirmar sua presença em nosso casamento"
                />
            </StyledContainer>
        </BackgroundContainer>
    );
};

export default GuestRegistration;
