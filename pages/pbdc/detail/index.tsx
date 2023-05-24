import { CardContainer } from "@/components/cards";
import { SelectInputNative } from "@/components/inputs";
import { themeBasic } from "@/styles/theme";
import {
 Box, Button, Container, Divider, ThemeProvider, Typography
} from "@mui/material";
import PbdcDetailViewModel from "./pbdc-detail-view-model";
import { ListOverViewPbdc } from "@/components/list";
import styles from "../../../styles/pages/pbdc.module.css";

interface PropsList {
    label : string,
    value : string | any,
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
        <p>{value}</p>
      </div>
    );
};
// cab: "0001"
//
// dc: "0970"
//
// id: 1
//
// nilai: 12123123.312
//
// nopb: "PB1238834"
//
// status: "Sudanjsdnj"
//
// tgl: "2023-05-22T01:53:42.4223049+07:00"
//
// tipe: "T-REGULER"

const DetailPbdc = () => {
const { data, overview, dc } = PbdcDetailViewModel();
  const d = new Date(data?.tgl);
  const date = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
  const month = d.getMonth() < 10 ? `0${d.getMonth()}` : d.getMonth();
  const dateNow = `${date}/${month}/${d.getFullYear()}`;

  const dcData = dc && dc.filter((fil:any) => fil?.fmkcab === data?.dc)[0];
  // height card
  const vh = (547 / window.innerHeight) * 100;
    return(
      <ThemeProvider theme={themeBasic}>
        <Container>
          <Box marginBottom={2} marginTop={3}>
            <Typography component="h1" color="primary">Detail peneriman barang DC (PBDC)</Typography>
          </Box>
          <Divider />
          <Box display="flex" justifyContent="center" color="#151515" marginTop={3}>
            <Box>
              <ListOrder label="Nomor Order" value="XXXXXXXX" />
              <ListOrder label="Dc" value={`${dcData?.fmkcab}-${dcData?.store_name}`} />
              <ListOrder label="Tipe" value="1-Reguler" />
              <ListOrder label="Tanggal" value={dateNow} />
              <ListOrder label="Nilai" value={parseInt(data?.nilai).toLocaleString()} />
              {/* <ListOrder label="Vol" value="0" /> */}
            </Box>
          </Box>
          {/* <Box marginTop={2} display="flex" justifyContent="flex-end" marginBottom={3}>
            <Button variant="outlined" color="success">TAMBAH</Button>
          </Box> */}
          <Box
            marginTop={5}
            sx={{
            marginBottom: "50px"
          }}
          >
            <CardContainer
              height={`${vh}vh`}
              customStyle={undefined}
              customStyleContent={undefined}
            >
              {overview[0] === undefined && <p className={styles["alert-card-text"]}>Belum ada data !</p>}
              {overview[0] !== undefined && overview.map((item:any) => {
                return(
                  <Box key={item.plu}>
                    <ListOverViewPbdc
                      plu={item.plu}
                      desc={item.desc}
                      conv={item.conv}
                      eq={item.eq}
                      order={item.order}
                      vol={item.vol}
                    />
                  </Box>
                );
              })}
            </CardContainer>
          </Box>
          <Box marginTop={5} display="flex" justifyContent="space-evenly">
            <Button variant="contained" color="error">Back</Button>
            <Button variant="contained" color="success">Edit</Button>
          </Box>
        </Container>
      </ThemeProvider>
    );
};

export default DetailPbdc;
