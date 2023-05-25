/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
/* eslint-disable no-multi-spaces */
import React, {   useState } from "react";
import {
 Box,  Container,  ThemeProvider
} from "@mui/material";
import styles from "../../styles/pages/pbdc.module.css";
import { themeBasic } from '@/styles/theme';
import { BasicInput } from "@/components/inputs";
import SearchIcon from '@mui/icons-material/Search';
import { CardContainer } from "@/components/cards";
import { ListPrimary } from "@/components/list";
import {  ButtonAdd, ButtonFilter } from "@/components/buttons";
import PbsupllierViewModel from './pbsupplier-view-model';
import { DatePrimary } from "@/src/utils/DateTime";
import { colorBasic, colorOpacity } from "@/styles/color";
import { Loading } from "@/components/Loading";

const PbdcSupplierPages = () => {
const { dataPbSupplier, handleAddPbSupplier, isLoading } = PbsupllierViewModel();
const [search, setSearch] = useState<string>("");
const [valueFilter, setValueFilter] = useState<string>("All");
const vh = (547 / window.innerHeight) * 100;
const filterMenu = ["All", "No Pb", "Tipe", "Dc", "Nilai", ""];

return (
  <ThemeProvider theme={themeBasic}>
    <Container>
      <Box>
        <p className="title-content">List PB Supplier</p>
      </Box>
      <Box marginTop={2}>
        <BasicInput
          disabled={false}
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
          placeholder={`Masukan ${valueFilter === "All" ? "Semua" : valueFilter}`}
          errorMessage=""
        />
      </Box>
      <Box marginTop={1}>
        <CardContainer
          title="List Item"
          backgroundColorHeader={String(colorOpacity?.error)}
          colorTitle={String(colorBasic.white)}
          customStyle={{
            overflow: "scroll"
          }}
          customStyleContent={undefined}
          height={`${vh}vh`}
        >
          {dataPbSupplier && dataPbSupplier[0] === undefined && <p className={styles["alert-card-text"]}>Data Belum Ada !</p> }
          {dataPbSupplier && dataPbSupplier.filter((fil) => {
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
          }).map((item:any, index:number) => (
            <Box marginTop={2} key={`${index}`}>
              <ListPrimary onView={undefined} title={item.nopb} tanggal={DatePrimary(String(item.tgl))} type={item.tipe} dc={item.dc} status={undefined} nilai={item.nilai} />
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
        <ButtonAdd
          onClick={() => {
            handleAddPbSupplier();
           }}
          color="primary"
        />
      </Box>
      <Loading isLoading={isLoading} />
    </Container>
  </ThemeProvider>
    );
 };

export default PbdcSupplierPages;
