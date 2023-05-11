import {
  Box,
   Card,
   CardContent,
   Container, Grid, Typography,
} from '@mui/material';
import styles from "@/styles/pages/home.module.css";
import CollapsePrimary from '@/components/colapse/CollapsePrimary';
import SummarizeIcon from '@mui/icons-material/Summarize';

function Home() {
  const data = [
    {
      title: "PB DC"
    },
    {
      title: "PB Supplier"
    },
    {
      title: "PO Canvas"
    }
  ];
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
            <Grid container flexDirection="row" justifyContent="center">
              {data.map((item:any) => (
                <Grid xs={5} marginRight={1} marginTop={2} marginBottom={1}>
                  <Card className={styles.cardContent}>
                    <CardContent>
                      <Box display="flex" justifyContent="center" mb={1}>
                        <SummarizeIcon sx={{
                          color: '#26116C'
                        }}
                        />
                      </Box>
                      <p className={styles.subTitleCard}>{item.title}</p>
                    </CardContent>
                  </Card>
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

export default Home;
