import * as React from 'react';
import Box from '@mui/material/Box';

import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

interface Props {
    data :any
}

export default function SelectInputNative({ data = [{ title: "asd", value: "as" }] }:Props) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <NativeSelect
          defaultValue={30}
          inputProps={{
            name: 'age',
            id: 'uncontrolled-native',
          }}
        >
          <option value="">Pilih Dc</option>
          {data.map((item:any) => <option value={item.fmkcab}>{item.store_name}</option>)}
        </NativeSelect>
      </FormControl>
    </Box>
  );
}
