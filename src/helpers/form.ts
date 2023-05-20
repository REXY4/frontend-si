/* eslint-disable dot-notation */
/* eslint-disable quotes */
import React, { useState } from 'react';

enum Type {
  text = 'text',
  password = 'password',
  number = 'number',
  email = 'email'
}

export const useFrom = (_initialForm:any) => {
  const [form, setForm] = useState(_initialForm);
  return [form, setForm];
};
