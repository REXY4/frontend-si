import { CardContainer } from "@/components/cards";
import { SelectInputNative } from "@/components/inputs";
import { themeBasic } from "@/styles/theme";
import {
 Box, Button, Container, Divider, ThemeProvider, Typography
} from "@mui/material";

interface PropsList {
    label : string,
    value : string,
}
const ListOrder = ({ label, value }:PropsList) => {
    return(
      <div style={{
                display: "flex",
                justifyContent: "space-between",
                width: "255px",
                marginBottom: "10px"
              }}
      >
        <p style={{ fontWeight: "bold" }}>
          {label}
          {' '}
          :
        </p>
        {label === "Dc" ? <SelectInputNative data={[{ title: "1312", value: "1231" }]} /> : <p>{value}</p>}

      </div>
    );
};

const AddPbdc = () => {
const vh = (547 / window.innerHeight) * 100;

    return(
      <ThemeProvider theme={themeBasic}>
        <Container>
          <Box marginBottom={2}>
            <Typography component="h1" color="primary">Tambah peneriman barang DC (PBDC)</Typography>
          </Box>
          <Divider />
          <Box display="flex" justifyContent="center" color="#151515" marginTop={3}>
            <Box>
              <ListOrder label="Nomor Order" value="XXXXXXXX" />
              <ListOrder label="Dc" value="130410" />
              <ListOrder label="Tipe" value="1-Reguler" />
              <ListOrder label="Tanggal" value="2019-11-11" />
              <ListOrder label="Nilai" value="0" />
              <ListOrder label="Vol" value="0" />
            </Box>
          </Box>
          <Box marginTop={2} display="flex" justifyContent="flex-end" marginBottom={3}>
            <Button variant="outlined" color="success">TAMBAH</Button>
          </Box>
          <Box>
            <CardContainer height={`${vh}vh`} customStyle={undefined} customStyleContent={undefined}>
              <h1>hallo</h1>
            </CardContainer>
          </Box>
        </Container>
      </ThemeProvider>
    );
};

export default AddPbdc;
