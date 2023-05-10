/* eslint-disable react/jsx-props-no-multi-spaces */
import React, { useState, useEffect } from 'react';
import { Logo } from '@/assets/img';
import { themeBasic } from '@/styles/theme';
import Image from 'next/image';
import {
  Box, Container, Grid, IconButton, ThemeProvider, Typography,
} from '@mui/material';
import { BasicInput } from '@/components/inputs';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { ButtonBasic } from '@/components/buttons';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
// import { useFrom,  } from '@/src/helpers/
import { validationText } from '@/src/helpers/validation';
import { ScannerBasic } from '@/components/scanners';
import styles from '../../styles/pages/login.module.css';
// import { validateEmail } from '../../src/helpers/validation';

function LoginPage() {
  const [visiblePassword, setVisiblePassword] = useState(true);
  const [form, setForm] = useState({
    username: {
      name: 'username',
      label: 'Username',
      value: null,
      require: false,
      error: false,
      message: '',
      type: 'text',
      placeholder: 'Silahkan Masukan id anda',
    },
    password: {
      name: 'password',
      label: 'Password',
      value: null,
      require: false,
      error: false,
      message: '',
      type: 'password',
      placeholder: 'Silahkan Masukan Password anda',
    },
  });

  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: {
        ...form[e.target.name],
        value: validationText(e.target.value),
      },
    });
  };

  const handleVisibilePassword = () => {
    if (visiblePassword) {
      return setVisiblePassword(false);
    }
    setVisiblePassword(true);
  };

  return (
    <ThemeProvider theme={themeBasic}>
      <Container>
        <Grid display="flex" justifyContent="center">
          <Box className={styles['container-basic-center']}>
            <Box display="flex" justifyContent="center" marginBottom={5}>
              <Image
                src={Logo}
                alt="logo superindo"
              />
            </Box>
            <Box marginBottom={3}>
              <BasicInput
                {...form.username}
                onChange={onChange}
                type="text"
                endIcon={<ScannerBasic />}
              />
            </Box>
            <Box>
              <BasicInput
                {...form.password}
                onChange={onChange}
                type={visiblePassword ? 'password' : 'text'}
                endIcon={!visiblePassword ? (
                  <IconButton onClick={handleVisibilePassword}>
                    {' '}
                    <VisibilityOffIcon />
                    {' '}
                  </IconButton>
                ) : (
                  <IconButton onClick={handleVisibilePassword}>
                    {' '}
                    <VisibilityIcon />
                    {' '}
                  </IconButton>
                )}
                endIconAction={undefined}
              />
            </Box>
            <Box marginTop={5}>
              <ButtonBasic label="Login" />
            </Box>
            <Box marginTop={5} display="flex" justifyContent="center">
              <Typography className={styles.copyright}>PT Lion Super Indo © 2023</Typography>
            </Box>
          </Box>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export const getStaticProps = async () => ({
  props: { noLayout: true },
});

export default LoginPage;
