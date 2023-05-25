import React, { useState, useEffect } from 'react';
import { Logo } from '@/assets/img';
import { themeBasic } from '@/styles/theme';
import Image from 'next/image';
import {
  Box, Button, Container, Grid, ThemeProvider, Typography,
} from '@mui/material';
import { BasicInput } from '@/components/inputs';
import { ButtonBasic } from '@/components/buttons';
import { validationText } from '@/src/helpers/validation';
import ModalScanner from '@/components/scanners/ModalScanner';
import styles from '../../styles/pages/login.module.css';
import LoginViewModel from './login-view-model';
import { BasicAlerts, SeverityType } from '@/components/alerts';
import { Loading } from '@/components/Loading';

enum ErrorMessage {
  NULL = "Tidak boleh kosong!"
}
interface FromInput {
   [key : string] : {
     name: string,
      label: string,
      value: any,
      require: boolean,
      error: boolean,
      message: string,
      type: string,
      errorMessage : string,
      placeholder: string,
   }
}

function LoginPage() {
  const [visiblePassword, setVisiblePassword] = useState(true);
  const {
 onLoginClicked, isOpenAlert, alertMessage, onOpenAlertClicked, isLoading
} = LoginViewModel();
  const [form, setForm] = useState<FromInput>({
    userId: {
      name: 'userId',
      label: 'Staff Id',
      value: '',
      require: false,
      error: false,
      message: '',
      errorMessage: '',
      type: 'text',
      placeholder: 'Silahkan Masukan Id anda',
    },
    password: {
      name: 'password',
      label: 'Password',
      value: '',
      require: false,
      error: false,
      message: '',
      type: 'password',
      errorMessage: '',
      placeholder: 'Silahkan Masukan Password anda',
    },
  });

  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const name: 'userId' | 'password' = e.target.name as 'userId' | 'password';
    onOpenAlertClicked(false, "");
    setForm({
      ...form,
      [name]: {
        ...form[name],
        error: false,
        value: name === "password" ? e.target.value : validationText(e.target.value),
        errorMessage: ""
      },
    });
  };

  const handleDetected = (result:any) => {
    setForm({
      ...form,
      password: {
        ...form.password,
        value: result,
        error: false,
        errorMessage: ""
      },
    });
  };

  const handleInputError = () => {
    const { userId, password } = form;
    const userIdValue = userId.value;
    const passwordValue = password.value;
      setForm({
        ...form,
       userId: {
        ...form.userId,
        error: userIdValue === "" && true,
        errorMessage: userIdValue === "" ? `Staff Id ${ErrorMessage.NULL}` : "",
       },
       password: {
        ...form.password,
        error: passwordValue === "" && true,
        errorMessage: passwordValue === "" ? `Password ${ErrorMessage.NULL}` : "",
       }
      });
  };

  const handleSubmit = () => {
    const { userId, password } = form;
    if (userId.value === "" || password.value === "") {
      handleInputError();
    } else {
      onOpenAlertClicked(false, "");
      onLoginClicked(form.userId.value, form.password.value);
    }
  };

  return (
    <ThemeProvider theme={themeBasic}>
      <Container>
        <Grid display="flex" justifyContent="center">
          <Box
            component="form"
            className={styles['container-basic-center']}
            autoComplete="off"
          >
            <Box display="flex" justifyContent="center" marginBottom={5}>
              <Image
                src={Logo}
                alt="logo superindo"
              />
            </Box>
            <Box marginBottom={3}>
              <BasicInput
                disabled={false}
                startIcon={undefined}
                defaultValue={undefined}
                {...form.userId}
                error={form.userId.error || isOpenAlert}
                onChange={onChange}
                type="text"
                endIcon={undefined}
              />
            </Box>
            <Box>
              <BasicInput
                disabled={false}
                startIcon={undefined}
                defaultValue={undefined}
                {...form.password}
                error={form.password.error || isOpenAlert}
                onChange={onChange}
                type={visiblePassword ? 'password' : 'text'}
                endIcon={(
                  <ModalScanner onDetected={handleDetected} />
                )} // endIconAction={undefined}
              />
            </Box>
            <Box marginTop={5}>
              <ButtonBasic
                label="Login"
                onClick={() => handleSubmit()}
              />
            </Box>
            <Box marginTop={5} display="flex" justifyContent="center">
              <Typography className={styles.copyright}>PT Lion Super Indo © 2023</Typography>
            </Box>
            <Loading isLoading={isLoading} />
          </Box>
          <BasicAlerts severity="error" message={alertMessage} isOpen={isOpenAlert} onClose={() => onOpenAlertClicked(false, "")} />
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export const getStaticProps = async () => ({
  props: { noLayout: true },
});

export default LoginPage;
