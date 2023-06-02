/* eslint-disable max-len */
import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import CheckIcon from '@mui/icons-material/Check';

interface Props {
    color : "primary" | "inherit" | "default" | "secondary" | "error" | "info" | "success" | "warning";
    menu : any
    setValue : any
}

const ButtonFilter = ({
setValue,
color = "primary",
menu,
} : Props) => {
    const [check, setChekc] = useState<string>("All");
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

     const handleChange = (value:string) => {
             setValue(value);
             setChekc(value);
             handleClose();
     };

    return(
      <Box>
        <IconButton
          onClick={handleClick}
          color={color}
        >
          <FilterListIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
                    "aria-labelledby": "basic-button",
          }}
        >
          <Box sx={{ padding: "10px" }}>
            {menu.map((item:any) => (
              <MenuItem onClick={() => handleChange(item)}>
                {check === item
                && (
                <CheckIcon
                  color="secondary"
                  sx={{ marginRight: "10px" }}
                />
                )}
                {' '}
                {item}
              </MenuItem>
))}
          </Box>
        </Menu>
      </Box>
    );
};

export default ButtonFilter;
