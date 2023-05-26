import React, { FC } from "react";
import {
    IconButton,
    ListItem,
    ListItemButton,
    ListItemText,
    Menu,
    MenuItem,
    Typography,
} from "@mui/material";

import { MoreVert } from "@mui/icons-material";

type LsiListItemProps = {
    id: string|number;
    title: string;
    subtitle: string;
    onDelete: (id: number) => void;
};

const LsiListItem: FC<LsiListItemProps> = ({
    id,
    title,
    subtitle,
    onDelete,
}) => {
    const labelId = `checkbox-list-label-${id}`;
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = (id: string | number) => {
        onDelete(Number(id));
    };

    return (
      <ListItem
        key={id}
        secondaryAction={(
          <IconButton
            edge="end"
            aria-label="comments"
            onClick={handleClick}
          >
            <MoreVert />
          </IconButton>
              )}
        disablePadding
      >
        {/* <ListItemButton>
          <ListItemText
            id={labelId}
            primary={title}
            secondary={(
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {subtitle}
              </Typography>
                      )}
          />
        </ListItemButton> */}
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
        >
          <MenuItem onClick={handleClose}>Edit 1</MenuItem>
          <MenuItem
            onClick={() => {
                        handleDelete(id);
                    }}
          >
            Delete
          </MenuItem>
        </Menu>
      </ListItem>
    );
};

export { LsiListItem };
