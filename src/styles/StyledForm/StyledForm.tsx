import React from 'react';
import { styled } from '@mui/system';

const StyledForm = styled('form')({
  width: '100%',
  maxWidth: '600px',
  marginTop: '20px',
});

interface CustomFormProps extends React.FormHTMLAttributes<HTMLFormElement> {}

const CustomForm: React.FC<CustomFormProps> = (props) => {
  return <StyledForm {...props} />;
};

export default CustomForm;
