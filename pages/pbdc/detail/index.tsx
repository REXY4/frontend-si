import React, { useEffect, useState } from "react";
import { CardContainer } from "@/components/cards";

import { themeBasic } from "@/styles/theme";
import {
  Alert,
 Box, Container, Divider, ThemeProvider,
} from "@mui/material";
import PbdcAddViewModel from "../add/pbdc-add-view-model";

import PbdcDetailViewModel from "./pbdc-detail-view-model";
import { DatePrimary } from "@/src/utils/DateTime";
import { ListAddsPbdc } from "@/components/list";
import { colorBasic } from "@/styles/color";

interface PropsList {
    label : string,
    value : string,
    setValue :any
    view : boolean
}

const ListOrder = ({
 label, value, setValue, view
}:PropsList) => {
  const { dc, } = PbdcAddViewModel();
    return(
      <div style={{
                display: "flex",
                justifyContent: "space-between",
                width: "255px",
                marginBottom: "10px"
              }}
      >
        <p style={{ fontWeight: "bold", fontSize: "12px" }}>
          {label}
          {' '}
          :
        </p>
        <p>{value}</p>
      </div>
    );
};

const DetailPagePbdc = () => {
const { dataPbdc, dataDc, overview } = PbdcDetailViewModel();
const vh = (547 / window.innerHeight) * 100;

    return(
      <ThemeProvider theme={themeBasic}>
        <Container>
          <Box marginBottom={1}>
            <p className="title-content">Detail  PBDC</p>
          </Box>
          <Divider />
          <Box display="flex" justifyContent="center" color="#151515" marginTop={2}>
            <Box>
              <ListOrder
                label="Nomor Order"
                value={dataPbdc && dataPbdc.nopb}
                setValue={undefined}
                view
              />
              <ListOrder
                label="Dc"
                value={dataDc && `${dataDc?.fmkcab}-${dataDc?.store_name}`}
                setValue={undefined}
                view
              />
              <ListOrder
                label="Tipe"
                value="1-Reguler"
                setValue={undefined}
                view
              />
              <ListOrder
                label="Tanggal"
                value={DatePrimary(dataPbdc.tgl)}
                setValue={undefined}
                view
              />
              <ListOrder
                label="Nilai"
                value={String(dataPbdc?.nilai).toLocaleString()}
                setValue={undefined}
                view
              />
              <ListOrder
                label="Vol"
                value={dataPbdc?.vol === undefined ? 0 : dataPbdc?.vol}
                setValue={undefined}
                view
              />
            </Box>
          </Box>
          <Divider />
          <Box marginTop={4} marginBottom={5}>
            {overview !== undefined && overview[0] !== undefined
            && (
            <CardContainer
              title="List Item"
              height={`${vh}vh`}
              customStyle={{
                overflow: "scroll"
              }}
              customStyleContent={undefined}
              backgroundColorHeader={colorBasic.error}
              colorTitle={colorBasic?.white}
            >
              {overview.map((item:any) => {
              return(
                <Box>
                  <ListAddsPbdc
                    plu={item.plu}
                    eq={item.eq}
                    desc={item.desc}
                    order={item.order}
                    onDelete={undefined}
                    onUpdate={undefined}
                    // onDelete={() => deleteItemPbdc(String(item.plu))}
                    // onUpdate={() => onGetDetailItemPbdc(item)}
                    onView={undefined}
                  />
                </Box>
              );
            })}
            </CardContainer>
        )}
          </Box>
          {/* <Loading isLoading={isLoading} /> */}
        </Container>
      </ThemeProvider>
    );
};

export default DetailPagePbdc;
