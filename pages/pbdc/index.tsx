/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
/* eslint-disable no-multi-spaces */
import React, {  useCallback, useEffect, useState } from "react";
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
import { Loading } from "@/components/Loading";
import { DatePrimary } from "@/src/utils/DateTime";
import { colorBasic, colorOpacity } from "@/styles/color";
import { ModalAlertError } from "@/components/modals";

const PbdcPages = () => {
const {
  alert,
  pbdcs,
  isLoading,
  handleAddNewPbdc,
  handleOverviewPbdc,
  setAlert,
  handelPbdcEdit
} = PbdcViewModel();
const [search, setSearch] = useState<string>("");
const [valueFilter, setValueFilter] = useState<string>("All");
const vh = (547 / window.innerHeight) * 100;
const filterMenu = ["All", "No Pb", "Tipe", "Dc", "Nilai", ""];

return (
  <ThemeProvider theme={themeBasic}>
    <Container>
      <Box>
        <p className="title-content">List PBDC</p>
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
          total={String(pbdcs && pbdcs.length)}
          title="List Pbdc"
          customStyle={undefined}
          customStyleContent={{
            overflow: "scroll"
          }}
          height={`${vh}vh`}
          backgroundColorHeader={colorOpacity.error}
          colorTitle={colorBasic.white}
        >
          {pbdcs && pbdcs[0] === undefined && <p className={styles["alert-card-text"]}>Data Belum Ada !</p> }
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
          }).map((item:any, index:number) => (
            <Box marginTop={2} key={`${index}`}>
              <ListPrimary
                onUpdate={item.status === "Draft" ? async () =>  handelPbdcEdit(item, item.dc, item.nopb) : undefined}
                onView={() => handleOverviewPbdc(item, item.dc, item.nopb)}
                title={item.nopb}
                tanggal={DatePrimary(String(item.tgl))}
                type={item.tipe === "1" ? "1-REGULER" : ""}
                dc={item.dc}
                status={item.status}
                nilai={item.nilai}
              />
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
          handleAddNewPbdc();
        }}
          color="success"
        />
      </Box>
      <ModalAlertError
        open={alert?.isOpen}
        onClose={undefined}
        onClickOk={() => setAlert(false, "")}
        messageAlert={String(alert?.message)}
      />
      <Loading isLoading={isLoading} />
    </Container>
  </ThemeProvider>
    );
 };

export default withAuth(PbdcPages);
