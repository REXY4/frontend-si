/* eslint-disable max-len */
/* eslint-disable no-multi-spaces */
import React, {  useEffect, useState } from "react";
import {
 Box,  Container,  ThemeProvider, Typography
} from "@mui/material";
import styles from "../../styles/pages/pbdc.module.css";
import { themeBasic } from '@/styles/theme';
import { BasicInput } from "@/components/inputs";
import SearchIcon from '@mui/icons-material/Search';
import { CardContainer } from "@/components/cards";
import { ListPrimary } from "@/components/list";
import PbdcViewModel from "./pbdc-view-model";
import { ButtonAdd, ButtonFilter } from "@/components/buttons";
import { useRouter } from "next/router";
import { withAuth } from "@/src/helpers/PrivateRoute";

const PbdcPages = () => {
const {  pbdcs, alert  } = PbdcViewModel();
const [search, setSearch] = useState<string>("");
const [valueFilter, setValueFilter] = useState<string>("All");
let navigate = useRouter();

const vh = (547 / window.innerHeight) * 100;
const filterMenu = ["All", "No Pb", "Tipe", "Dc", "Nilai", ""];

return (
  <ThemeProvider theme={themeBasic}>
    <Container>
      <Box>
        <Typography component="h1" color="primary">List peneriman barang DC (PBDC)</Typography>
      </Box>
      <Box marginTop={4}>
        <BasicInput
          label="Pencarian"
          startIcon={<SearchIcon />}
          endIcon={(
            <ButtonFilter
              color="primary"
              menu={filterMenu}
              setValue={setValueFilter}
            />
          )}
          type=""
          name=""
          value={undefined}
          defaultValue={undefined}
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          error={false}
          placeholder="Silahkan masukan No Pb, Dc, Nilai"
          errorMessage=""
        />
        {valueFilter !== "" && (
        <Box display="flex" justifyContent="end">
          <Box className={styles.badge}>
            {valueFilter}
          </Box>
        </Box>
)}
      </Box>
      <Box marginTop={4}>
        <CardContainer
          customStyle={{
            overflow: "scroll"
          }}
          customStyleContent={undefined}
          height={`${vh}vh`}
        >
          {pbdcs && pbdcs.filter((fil) => {
                if(valueFilter === "No Pb") {
                   return fil.nopb.toLowerCase().includes(search.toLowerCase());
                }if(valueFilter === "Tipe") {
                  return fil.tipe.toLowerCase().includes(search.toLowerCase());
                }if(valueFilter === "Dc") {
                  return fil.dc.toLowerCase().includes(search.toLowerCase());
                }if(valueFilter === "Nilai") {
                  return String(fil.nilai).toLowerCase().includes(search.toLowerCase());
                }
                 return fil.nopb.toLowerCase().includes(search.toLowerCase())
                || fil.tipe.toLowerCase().includes(search.toLowerCase())
                || fil.dc.toLowerCase().includes(search.toLowerCase())
                || String(fil.nilai).includes(search.toLowerCase());
          }).map((item:any) => (
            <Box marginTop={2} key={item.tgl}>
              <ListPrimary title={item.nopb} tanggal={item.tgl} type={item.tipe} dc={item.dc} nilai={item.nilai} />
            </Box>
            ))}
        </CardContainer>
      </Box>
      <Box sx={{
        position: "fixed",
        right: 0,
        marginRight: "20px",
        bottom: 0,
        marginBottom: "50px"
      }}
      >
        <ButtonAdd onClick={() => navigate.push("/pbdc/add")} color="success" />
      </Box>
    </Container>
  </ThemeProvider>
    );
 };

export default withAuth(PbdcPages);
