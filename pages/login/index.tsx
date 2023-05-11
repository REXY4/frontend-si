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
import { validationText } from '@/src/helpers/validation';
import ModalScanner from '@/components/scanners/ModalScanner';
import styles from '../../styles/pages/login.module.css';
import { useRouter } from 'next/router';

function LoginPage() {
  const [visiblePassword, setVisiblePassword] = useState(true);
  let router = useRouter();
  const [form, setForm] = useState({
    username: {
      name: 'username',
      label: 'Username',
      value: '',
      require: false,
      error: false,
      message: '',
      type: 'text',
      placeholder: 'Silahkan Masukan id anda',
    },
    password: {
      name: 'password',
      label: 'Password',
      value: '',
      require: false,
      error: false,
      message: '',
      type: 'password',
      placeholder: 'Silahkan Masukan Password anda',
    },
  });

  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const name: 'username' | 'password' = e.target.name as 'username' | 'password';
    setForm({
      ...form,
      [name]: {
        ...form[name],
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

  const handleDetected = (result:any) => {
    setForm({
      ...form,
      username: {
        ...form.username,
        value: result,
      },
    });
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
                startIcon={undefined}
                defaultValue={undefined}
                {...form.username}
                onChange={onChange}
                type="text"
                endIcon={(
                  <ModalScanner onDetected={handleDetected} />)}
              />
            </Box>
            <Box>
              <BasicInput
                startIcon={undefined}
                defaultValue={undefined}
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
                )} // endIconAction={undefined}
              />
            </Box>
            <Box marginTop={5}>
              <ButtonBasic label="Login" onClick={() => router.push("/home")} />
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
