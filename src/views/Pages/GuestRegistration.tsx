import React, { useState, useContext } from 'react';
import { GuestContext } from '../../context/GuestContext/GuestContext';
import { Box, Snackbar } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import BackgroundContainer from '../../shared/components/BackgroundContainer';
import { StyledText, CustomTextField } from '../../styles/StyledTexts/StyledText'; // Importe o StyledText
import { FamilyMember } from 'context-Family-Member';
import { CustomContainerRegister } from '../../styles/StyledContainer/CustomContainer';
import CustomButtonHome from '../../styles/StyledButton/CustomButtonHome';
import CustomForm from '../../styles/StyledForm/StyledForm';

const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID || '';
const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || '';
const userId = process.env.REACT_APP_EMAILJS_USER_ID || '';

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
            }, 1500);
        } catch (error) {
            console.error('Erro ao enviar o email:', error);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <BackgroundContainer>
            <CustomContainerRegister>
                <StyledText variant="h4" gutterBottom>
                    Cadastro de Convidados
                </StyledText>
                <CustomForm onSubmit={handleSubmit}>
                    <CustomTextField
                        label="Nome da Família"
                        variant="outlined"
                        fullWidth
                        value={localFamilyName}
                        onChange={(e) => setLocalFamilyName(e.target.value)}
                    />
                    {localMembers.map((member, index) => (
                        <Box key={index} display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <CustomTextField
                                label="Nome"
                                variant="outlined"
                                name="name"
                                value={member.name}
                                onChange={(e) => handleInputChange(index, e)}
                                sx={{ flex: 3, mr: 2 }}
                            />
                            <CustomButtonHome
                                variant="contained"
                                color="secondary"
                                onClick={() => removeMember(index)}
                            >
                                Remover
                            </CustomButtonHome>
                        </Box>
                    ))}
                    <CustomButtonHome type="button" onClick={addMember}>
                        Adicionar Membro
                    </CustomButtonHome>
                    <CustomButtonHome type="submit">
                        Enviar
                    </CustomButtonHome>
                </CustomForm>
                <StyledSnackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                    message="Obrigado por confirmar sua presença em nosso casamento"
                />
            </CustomContainerRegister>
        </BackgroundContainer>
    );
};

export default GuestRegistration;
