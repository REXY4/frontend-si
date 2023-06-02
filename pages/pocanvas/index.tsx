import React, { useState } from "react";
import { ButtonAdd, ButtonFilter } from "@/components/buttons";
import { BasicInput } from "@/components/inputs";
import { TitlePrimary } from "@/styles/text/title";
import { Box, Container } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { CardContainer } from "@/components/cards";
import { colorBasic, colorOpacity } from "@/styles/color";
import { AlertTextGray } from "@/styles/text/alert";
import PoCanvasViewModel from "./pocanvas-view-model";
import { ListPrimary } from "@/components/list";
import { DatePrimary } from "@/src/utils/DateTime";

const PoCanvasPages = () => {
    const [search, setSearch] = useState<string>("");
    const [valueFilter, setValueFilter] = useState<string>("All");
    const vh = (547 / window.innerHeight) * 100;
    const filterMenu = ["All", "No Pb", "Tipe", "Dc", "Nilai", ""];
    const {
        poCanvas,
        handelAddNewData,
     } = PoCanvasViewModel();

    return(
      <Container>
        <Box>
          <TitlePrimary>List Po Canvas</TitlePrimary>
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
        <Box marginTop={2}>
          <CardContainer
            title="List Item"
            customStyle={{
              overflow: "scroll"
            }}
            customStyleContent={undefined}
            height={`${vh}vh`}
            backgroundColorHeader={colorOpacity.error}
            colorTitle={colorBasic.white}
            total={String(poCanvas.length)}
          >
            {poCanvas
             && poCanvas[0] === undefined
             && <AlertTextGray>Data Belum Ada !</AlertTextGray> }
            {poCanvas && poCanvas.filter((fil:any) => {
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
            <Box marginTop={2} key={`${item.nopb}`}>
              <ListPrimary
                onView={undefined}
                  // () => handleOverviewPbdc(item, item.dc, item.nopb)
                title={item.nopb}
                tanggal={DatePrimary(String(item.tgl))}
                type={item.tipe}
                dc={item.dc}
                status={item.status}
                nilai={item.nilai}
                onUpdate={undefined}
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
            onClick={() => handelAddNewData()}
            color="success"
          />
        </Box>
      </Container>
    );
};

export default PoCanvasPages;
