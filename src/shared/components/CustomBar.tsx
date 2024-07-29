import React from 'react';
import { AppBar, Toolbar, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled } from '@mui/system';

const StyledAppBar = styled(AppBar)({
    backgroundImage: 'url(https://www.transparenttextures.com/patterns/diamond-upholstery.png)', // Textura sutil de fundo
    backgroundColor: 'transparent',
});

const CustomBar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleHomeClick = () => {
        navigate('/');
    };

    // Não renderiza a CustomBar se estiver na página inicial
    if (location.pathname === '/') {
        return null;
    }

    return (
        <StyledAppBar position="static">
            <Toolbar>
                <IconButton edge="start" sx={{ color: 'black' }} aria-label="back" onClick={handleHomeClick}>
                    <ArrowBackIcon />
                </IconButton>
            </Toolbar>
        </StyledAppBar>
    );
};

export default CustomBar;
