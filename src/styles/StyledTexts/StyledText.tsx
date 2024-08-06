import React from 'react';
import { TextField, TextFieldProps, Typography, TypographyProps } from '@mui/material';
import { styled } from '@mui/system';

const StyledText = styled((props: TypographyProps) => <Typography {...props} />)({
  color: '#b8860b',
  fontFamily: 'cursive',
  fontStyle: 'italic',
});

const StyledTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
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
}));

const CustomTextField: React.FC<TextFieldProps> = (props) => {
  return <StyledTextField {...props} />;
};

export { StyledText, CustomTextField };
