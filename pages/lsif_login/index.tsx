import { AccountCircle, Key, Password } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import getConfig from "next/config";
import Head from "next/head";
import { useRouter } from "next/router";
import React, {
    useState,
    useEffect,
    KeyboardEventHandler,
    useRef,
} from "react";
import Image from "next/image";
import Card from "@mui/material/Card";
import { FieldEntity } from "@/src/domain/entity/field-entity";
import LoginViewModel from "./lsif-login-view-model";
import { Loading } from "@/components/Loading";

export const getStaticProps = async () => {
    return {
        props: { noLayout: true },
    };
};

const LsifLoginPage = () => {
    const router = useRouter();
    const { publicRuntimeConfig } = getConfig();
    const applicationName = `${publicRuntimeConfig.applicationName} - Login`;
    const appLogo = publicRuntimeConfig.appLogo;
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [step1, setStep1] = useState<boolean>(false);
    const [submit, setSubmit] = useState<boolean>(false);
    const [usernameValidation, setUsernameValidation] = useState<FieldEntity>();
    const usernameRef = useRef<HTMLDivElement>(null as any);
    const { auth, isLoading, onGetDomainClicked, onLoginClicked } =
        LoginViewModel();

    const theme = createTheme({
        palette: {
            mode: "light",
            primary: {
                main: "#26116c",
            },
            secondary: {
                main: "#d80202",
            },
            success: {
                main: "#009688",
            },
            info: {
                main: "#0091ea",
            },
            warning: {
                main: "#ffab40",
            },
            error: {
                main: "#ec407a",
            },
            background: {
                default: "#cccccc",
                paper: "#ffffff",
            },
        },
    });

    const onUsernameEntered = (usernameParameter: string) => {
        console.log(usernameParameter);
        const uName = {
            name: "username",
            error: false,
            errorMessage: "",
        };

        setUsernameValidation(uName);

        if (usernameParameter === "") {
            const uName = {
                name: "username",
                error: true,
                errorMessage: "Username is incorrect!",
            };

            setUsernameValidation(uName);

            return;
        }

        setStep1(true);
    };

    const onPasswordEntered = (passwordParameter: string) => {
        setSubmit(true);
    };

    const onChangeUserId = () => {
        setStep1(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === "Enter") {
            onUsernameEntered(username);
            onGetDomainClicked(username);
            console.log("auth di index", auth);
        }
    };

    const handleKeyDownPassword = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === "Enter") {
            onPasswordEntered(username);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.id === "username") {
            setUsername(event.currentTarget.value);
        }

        if (event.currentTarget.id === "password") {
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
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <Box
                    component="form"
                    sx={{
                        "& .MuiTextField-root": { m: 1.5, width: "30ch" },
                        alignContent: "center",
                        marginBottom: "100px",
                    }}
                    noValidate
                    onSubmit={e => {
                        e.preventDefault();
                    }}
                    autoComplete="off"
                >
                    <Card
                        sx={{
                            margin: "20px",
                            padding: "20px",
                            borderBottom: "10px",
                            borderBottomColor: "red",
                        }}
                    >
                        <Grid
                            item
                            xs={12}
                            md={12}
                            marginTop={5}
                            marginBottom={1}
                        >
                            <img src={appLogo} width={350} />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                label="Please enter your User ID"
                                placeholder="Username"
                                color="primary"
                                id="username"
                                disabled={step1}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                }}
                                style={{ width: "100%", marginLeft: 0 }}
                                error={usernameValidation?.error}
                                helperText={usernameValidation?.errorMessage}
                                inputRef={usernameRef}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            {step1 ? (
                                <TextField
                                    label="Password"
                                    type={"password"}
                                    placeholder="Password"
                                    color="primary"
                                    id="password"
                                    onChange={handleChange}
                                    onKeyDown={handleKeyDownPassword}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Key />
                                            </InputAdornment>
                                        ),
                                    }}
                                    style={{ width: "100%", marginLeft: 0 }}
                                />
                            ) : null}
                        </Grid>
                        <Grid item xs={12} md={12} marginBottom={2}>
                            {!step1 ? (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ width: "100%", margin: 0 }}
                                    onClick={() => onUsernameEntered(username)}
                                >
                                    Next
                                </Button>
                            ) : null}
                        </Grid>
                        <Grid item xs={12} md={12} marginBottom={2}>
                            {step1 ? (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ width: "100%", margin: 0 }}
                                >
                                    Login
                                </Button>
                            ) : null}
                        </Grid>
                        <Grid item xs={12} md={12} marginBottom={2}>
                            {step1 ? (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ width: "100%", margin: 0 }}
                                    onClick={() => {
                                        onChangeUserId();
                                    }}
                                >
                                    Change User ID
                                </Button>
                            ) : null}
                        </Grid>
                    </Card>
                    <Grid item xs={12} md={12}>
                        <div
                            style={{
                                textAlign: "center",
                                fontFamily: "system-ui",
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
        </ThemeProvider>
    );
};

export default LsifLoginPage;
