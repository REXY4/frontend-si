import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

interface Props {
  color: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
  onClick: () => void;
}

const ButtonAdd = ({ color, onClick } : Props) => {
    return (
      <Button
        onClick={onClick}
        color={color}
        variant="contained"
        sx={{
        borderRadius: "100%",
        width: "56px",
        height: "56px",
      }}
      >
        <AddIcon />
      </Button>
    );
};

export default ButtonAdd;
