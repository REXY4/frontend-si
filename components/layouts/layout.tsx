/* eslint-disable react/jsx-no-undef */
import React, { ReactNode, useState } from 'react';
import Head from 'next/head';
import { Logo } from '@/assets/img';
import Box from '@mui/material/Box';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import LayoutModel from './layout-model';
import HomeIcon from '@mui/icons-material/Home';

const drawerWidth = 240;

interface PropsLayout {
    children: ReactNode;
}

interface AppBarProps extends Omit<MuiAppBarProps, 'open'> {
    open?: boolean;
}

export default function Layout({ children }: PropsLayout) {
  const { logout } = LayoutModel();
  const router = useRouter();
  const currentUrl = router.asPath;
  const { publicRuntimeConfig } = getConfig();
  const applicationName = `${publicRuntimeConfig.applicationName}`;
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
    components: {
      MuiListItemButton: {
        styleOverrides: {
          root: {
            '&.Mui-selected': {
              backgroundColor: '#ddd6e9',
              '&:hover': {
                backgroundColor: '#ddd6e9',
              },
            },
            '&:hover': {
              backgroundColor: '#ddd6e9',
            },
          },
        },
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const Main = styled('main', {
    shouldForwardProp: (prop) => prop !== 'open',
  })<AppBarProps>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
    height: '100%',
  }));

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

  const handleRoute = (url:string) => {
   
    router.push(`/${url.toLowerCase()}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>{applicationName}</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        />
        {/* <link rel="icon" href={appLogo} /> */}
      </Head>
      <Box
        sx={{
          display: 'flex',
          backgroundColor: '#ffffff',
          color: '#242564',
          height: "100%"
        }}
      >
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar sx={{
            display: "flex",
            justifyContent: "space-between"
          }}
          >
            <Box display="flex">
              <IconButton
                color="inherit"
                aria-label="open drawer"
              // onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 1, ...(open && { display: 'none' }) }}
              >
                <Image src={Logo} alt="logo" width={25} height={25} />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                marginTop: "5px"
              }}
              >
                {applicationName}
              </Typography>
            </Box>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {['Home', 'Logout'].map(
              (text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton onClick={() => (text === "Logout" ? logout() : handleRoute(text))}>
                    {text === 'Home' && <HomeIcon />}
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ),
            )}
          </List>
          <Divider />
          {/* <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? (
                      <InboxIcon />
                    ) : (
                      <MailIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List> */}
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          {children}
        </Main>
      </Box>
    </ThemeProvider>
  );
}
