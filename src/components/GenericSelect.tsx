import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { forwardRef } from "react";

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
  loader: boolean
}

const GenericSelect = forwardRef<HTMLSelectElement, propTypes>((
  { value, onChange, options, label, id, loader },
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
        {loader && <MenuItem disabled value=""><em>Carregando Lista</em></MenuItem>}
        {!loader && options.map((option) => (
          <MenuItem value={option.codigo} key={option.codigo}>
            {option.nome}
          </MenuItem>
        ))}
        {!loader && options?.length <= 0 && <MenuItem disabled value=""><em>Nenhum item disponível</em></MenuItem>}
      </Select>
    </FormControl>
  );
});

export { GenericSelect };

