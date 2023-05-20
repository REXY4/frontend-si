import { Button } from '@mui/material';

interface Props {
    label : string
    onClick : ()=>void
}

function ButtonBasic({ label = 'Basic Button', onClick } : Props) {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      color="primary"
      style={{
        width: '100%',
      }}
    >
      {label}
    </Button>
  );
}

export default ButtonBasic;
