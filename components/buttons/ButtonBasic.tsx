import { Button } from '@mui/material';

interface Props {
    label : string
}

function ButtonBasic({ label = 'Basic Button' } : Props) {
  return (
    <Button
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
