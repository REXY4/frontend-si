import {
  Box,
   Card,
   CardContent,
   Container, Grid, Typography,
} from '@mui/material';
import styles from "@/styles/pages/home.module.css";
import CollapsePrimary from '@/components/colapse/CollapsePrimary';
import { StoreOrder } from './Submenu';
import { BoxCardButton } from '@/components/cards';
import { useRouter } from 'next/router';
import { withAuth } from '@/src/helpers/PrivateRoute';

function Home() {
  let router = useRouter();
  return (
    <Container>
      <Grid
        xs={12}
        sx={{
          paddingTop: '10px',
        }}
      >
        <Typography component="h1" color="primary" className="title-content">Welcome, User PDT!</Typography>
      </Grid>
      <Grid xs={12} mt={5}>
        <Box mt={3}>
          <CollapsePrimary title="Store Order">
            <Grid container>
              {StoreOrder.map((item:any) => (
                <Grid
                  padding={1}
                  xs={5}
                  marginRight={2}
                  sx={{
                  marginLeft: "7px"
                }}
                  marginTop={2}
                  // marginBottom={1}
                >
                  <BoxCardButton onClick={() => router.push("/pbdc")} icon={item.icon} title={item.title} />
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
      </Grid>
    </Container>
  );
}

export default withAuth(Home);
