import * as React from 'react';
import Box from '@mui/material/Box';

import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

interface Props {
    data :any,
    detail : boolean
    setValue : any
    value : string
}

export default function SelectInputNative({
 value, setValue, detail, data = [{ title: "asd", value: "asd" }]
}:Props) {
  const handleChange = (event: any) => {
    // setValue(event.target.value as string);
    setValue(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <NativeSelect
          onChange={handleChange}
          value={value}
          inputProps={{
            name: 'age',
            id: 'uncontrolled-native',
          }}
        >
          <option value="">Pilih Dc</option>
          {data.map((item:any) => <option value={item.fmkcab}>{`${item.fmkcab}-${item.store_name}`}</option>)}
        </NativeSelect>
      </FormControl>
    </Box>
  );
}
