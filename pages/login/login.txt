/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import {
  AccountCircle, Key,
  // Password
} from '@mui/icons-material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import getConfig from 'next/config';
import Head from 'next/head';
// import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef } from 'react';
import Card from '@mui/material/Card';
import { FieldEntity } from '@/src/domain/entity/field-entity';
import { Loading } from '@/components/Loading';
import { Container } from '@mui/material';
// import { BasicAlerts } from '@/components/alerts';
import LoginViewModel from './login-view-model';

export const getStaticProps = async () => ({
  props: { noLayout: true },
});

function LoginPage() {
//   const router = useRouter();
  const { publicRuntimeConfig } = getConfig();
  const applicationName = `${publicRuntimeConfig.applicationName} - Login`;
  const { appLogo } = publicRuntimeConfig;
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [submit, setSubmit] = useState<boolean>(false);
  const [usernameValidation, setUsernameValidation] = useState<FieldEntity>();
  const usernameRef = useRef<HTMLDivElement>(null as any);
  const {
    // auth,
    // alertMessage,
    isLoading,
    // onGetDomainClicked,
    onLoginClicked,
    // isOpenAlert,
  } = LoginViewModel();

  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#26116c',
      },
      secondary: {
        main: '#d80202',
      },
      success: {
        main: '#009688',
      },
      info: {
        main: '#0091ea',
      },
      warning: {
        main: '#ffab40',
      },
      error: {
        main: '#ec407a',
      },
      background: {
        default: '#cccccc',
        paper: '#ffffff',
      },
    },
  });

  const onUsernameEntered = (usernameParameter: string) => {
    const uName = {
      name: 'username',
      error: false,
      errorMessage: '',
    };
    setUsernameValidation(uName);
    if (usernameParameter === '') {
      const uName = {
        name: 'username',
        error: true,
        errorMessage: 'Username is incorrect!',
      };
      setUsernameValidation(uName);
    }
  };

  const onSubmitLogin = (passwordParameter: string) => {
    setSubmit(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter') {
      onUsernameEntered(username);
      onSubmitLogin(username);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.id === 'username') {
      setUsername(event.currentTarget.value);
    }

    if (event.currentTarget.id === 'password') {
      setPassword(event.currentTarget.value);
    }
  };

  //     if (event.target.id === "password") {
  //       setPassword(event.target.value);
  //     }
  //   };

  //   useEffect(() => {
  //     if (isSuccess) initFunction();
  //   }, [isSuccess]);

  //   useEffect(() => {
  //     if (isSuccessInit) handleNavigate();
  //   }, [isSuccessInit]);

  useEffect(() => {
    if (usernameValidation?.error) {
      usernameRef.current?.focus();
    }
  }, [usernameValidation]);

  useEffect(() => {
    if (submit) {
      onLoginClicked(username, password);
    }
  }, [submit]);
  // console.log("ini alert message", alertMessage)
  // console.log("ini open alert", isOpenAlert)
  return (
    <ThemeProvider theme={theme}>
      {/* {isSuccess && initFunction()} */}
      {/* {isSuccessInit && navigateToHome()} */}
      <Head>
        <title>{applicationName}</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        />
        <link rel="icon" href={appLogo} />
      </Head>
      <Container>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{
            marginTop: '50px',
          }}
        >
          {/* <BasicAlerts severity="error" message={alertMessage} isOpen={isOpenAlert}/> */}
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': {
                m: 1.5,
                //  width: "30ch"
              },
              alignContent: 'center',
              marginTop: '50px',
              margin: 0,
            }}
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
            }}
            autoComplete="off"
          >
            {/* <Card
              sx={{
                padding: '40px',
                borderBottom: '10px',
                borderBottomColor: 'red',
                maxWidth: '100%',
              }}
            > */}
            <Grid
              item
              xs={12}
              md={12}
              marginTop={5}
              marginBottom={1}
            >
              <img
                src={appLogo}
                style={{
                  width: '80vw',
                  maxWidth: '350px',
                }}
              />
            </Grid>
            <Grid
              item
            >
              <TextField
                label="Please enter your User ID"
                placeholder="Username"
                color="primary"
                id="username"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                style={{ width: '100%', marginLeft: 0 }}
                error={usernameValidation?.error}
                helperText={
                                        usernameValidation?.errorMessage
                                    }
                inputRef={usernameRef}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                label="Password"
                type="password"
                placeholder="Password"
                color="primary"
                id="password"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Key />
                    </InputAdornment>
                  ),
                }}
                style={{ width: '100%', marginLeft: 0 }}
              />
            </Grid>
            <Grid item xs={12} md={12} marginBottom={2}>
              <Button
                variant="contained"
                color="primary"
                style={{ width: '100%', margin: 0 }}
                onClick={() => {
                  onSubmitLogin(username);
                }}
              >
                Login
              </Button>
            </Grid>
            {/* </Card> */}
            <Grid item xs={12} md={12}>
              <div
                style={{
                  textAlign: 'center',
                  fontFamily: 'system-ui',
                  marginTop: '30px',
                }}
              >
                PT Lion Super Indo &copy; 2023
              </div>
            </Grid>
          </Box>
          <Grid item xs={12} md={12}>
            <Loading isLoading={isLoading} />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default LoginPage;
