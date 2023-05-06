import React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { CheckBoxProp, CheckBoxOption } from "../../types/PostTypes";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const CheckboxesTags: React.FC<CheckBoxProp> = ({ options, setSelectedOptions }) => {
  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={options}
      onChange={(e, value) => setSelectedOptions(value)}
      disableCloseOnSelect
      getOptionLabel={(option: CheckBoxOption) => option.label}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
          {option.label}
        </li>
      )}
      style={{ width: 500 }}
      renderInput={(params) => <TextField {...params} label="Checkboxes" placeholder="Favorites" />}
    />
  );
};
export default CheckboxesTags;
