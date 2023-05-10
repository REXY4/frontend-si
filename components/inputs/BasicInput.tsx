/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import TextField, { TextFieldProps } from '@mui/material/TextField';

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
  value : any
  defaultValue :any
  onChange : any
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
} : Props) {
  return (
    <CssTextField
      name={name}
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      defaultValue={defaultValue}
      autoComplete="false"
      id="custom-css-outlined-input"
      placeholder="Insert your username"
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
