import React, { forwardRef } from "react";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface OptionItem {
  codigo: string;
  nome: string;
}

interface propTypes {
  value: string;
  onChange: (event: SelectChangeEvent) => void;
  options: OptionItem[];
  label: string;
  id: string;
}

const GenericSelect = forwardRef<HTMLSelectElement, propTypes>((
  { value, onChange, options, label, id },
  ref
) => {
  return (
    <FormControl fullWidth>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Select
        id={id}
        value={value}
        onChange={onChange}
        label={label}
        sx={{ width: "400px" }}
        ref={ref}
      >
        {options.map((option) => (
          <MenuItem value={option.codigo} key={option.codigo}>
            {option.nome}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});

export { GenericSelect };