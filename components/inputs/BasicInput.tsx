/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import TextField from '@mui/material/TextField';

const CssTextField = styled(TextField)({
  width: '100%',
  '& label.Mui-focused': {
    // color: '#d7130a',
    color: '#26116C',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#EEEEEE',
    },
    '&:hover fieldset': {
      borderColor: '#26116C',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#26116C',
    },
  },
});

interface Props {
  label : string
  startIcon : any
  endIcon : any
  type : string
  name : string
  value : string | undefined
  defaultValue :string | undefined
  onChange :any
  error : boolean
  placeholder : string
  errorMessage : string
  disabled : boolean
}

export default function BasicInput({
  label = 'Outlined',
  startIcon,
  endIcon,
  type = 'text',
  name = '',
  value,
  defaultValue,
  onChange,
  error,
  errorMessage,
  placeholder,
  disabled
} : Props) {
  return (
    <CssTextField
      disabled={disabled}
      error={error}
      name={name}
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      defaultValue={defaultValue}
      autoComplete="false"
      id="custom-css-outlined-input"
      placeholder={placeholder}
      helperText={errorMessage}
      InputProps={{
        startAdornment: (
          startIcon !== undefined
          && startIcon
        ),
        endAdornment: (
          endIcon !== undefined
          && endIcon
        ),
      }}
    />
  );
}
