import {
  Box,
   Card,
   CardContent,
   Container, Grid, Typography,
} from '@mui/material';
import styles from "@/styles/pages/home.module.css";
import CollapsePrimary from '@/components/colapse/CollapsePrimary';

import { BoxCardButton } from '@/components/cards';
import { withAuth } from '@/src/helpers/PrivateRoute';
import HomeViewModel from './home-view-model';
import { useRouter } from 'next/router';
import { Loading } from '@/components/Loading';
import { useCallback } from 'react';

import SummarizeIcon from '@mui/icons-material/Summarize';

interface StateMenu {
    icon : any
    title : string
    link : string
}

const StoreOrder:StateMenu[] = [
    {
      icon: <SummarizeIcon />,
      title: "PB DC",
      link: "/pbdc"
    },
    {
      icon: <SummarizeIcon />,
      title: "PB Supplier",
      link: '/home'
    },
    {
      icon: <SummarizeIcon />,
      title: "PO Canvas",
       link: "/home"
    }
  ];

export {
    StoreOrder
  };

function Home() {
  const {
 onLoadData, isLoading, store_code, nameUser, storeName
} = HomeViewModel();
  let router = useRouter();

  const handleNext = useCallback(async (link:string) => {
    onLoadData(link);
    if(!isLoading) {
      router.push(link);
    }
  }, [isLoading]);

  return (
    <Container>
      <Grid
        xs={12}
        sx={{
          paddingTop: '10px',
        }}
      >
        <p className={styles["text-name"]}>
          Selamat Datang,
          {' '}
        </p>
        <p className={styles["text-name"]}>
          {`${String(nameUser).toLocaleUpperCase()} (${store_code}-${storeName})`}
        </p>
      </Grid>
      <Grid xs={12} mt={3}>
        <Box mt={3}>
          <CollapsePrimary title="Store Order">
            <Grid container justifyContent="center">
              {StoreOrder.map((item:any) => (
                <Grid
                  padding={1}
                  xs={5}
                  marginRight={2}
                  sx={{
                    minWidth: "100px"
                }}
                  marginTop={2}
                  // marginBottom={1}
                >
                  <BoxCardButton
                    onClick={() => handleNext(item.link)}
                    icon={item.icon}
                    title={item.title}
                  />
                </Grid>
                ))}
            </Grid>
          </CollapsePrimary>
        </Box>
        <Box mt={3}>
          <CollapsePrimary title="Iventory">
            <div />
          </CollapsePrimary>
        </Box>
        <Box mt={3}>
          <CollapsePrimary title="Master">
            <div />
          </CollapsePrimary>
        </Box>
        <Box>
          <Loading isLoading={isLoading} />
        </Box>
      </Grid>
    </Container>
  );
}

export default withAuth(Home);
