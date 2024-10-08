/* eslint-disable max-len */
import React, { useState } from "react";
import { Box, Divider, IconButton } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { MoreVert } from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface Props {
    color : any
    onDelete : any
    onUpdate : any
}

const ButtonList = ({
onDelete,
onUpdate,
color = "primary",
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

    const menu = ["View", "Edit", "Delete"];

     const handleChange = (value:string) => {
             if(value === "Delete") {
                return onDelete !== undefined ? onDelete : console.log("Delete");
             }
             return onUpdate;
     };

    return(
      <Box>
        <IconButton
          onClick={handleClick}
          color={color}
        >
          <MoreVert />
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
            {menu.map((item:string) => (
              <>
                <MenuItem onClick={() => handleChange(item)}>
                  {item === "View" && (
                  <RemoveRedEyeIcon
                    color="success"
                    sx={{ marginRight: "10px" }}
                  />
                )}
                  {item === "Delete" && (
                  <DeleteIcon
                    color="error"
                    sx={{ marginRight: "10px" }}
                  />
                )}

                  {item === "Edit" && (
                  <EditIcon
                    color="primary"
                    sx={{ marginRight: "10px" }}
                  />
                )}

                  {' '}
                  {item}
                </MenuItem>
                <Divider />
              </>
            ))}
          </Box>
        </Menu>
      </Box>
    );
};

export default ButtonList;
