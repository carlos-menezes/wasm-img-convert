import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { FC } from "react";
import FORMATS from "../constants/formats";

type FormatSelectionProps = {
  disabled: boolean;
  onChange: (event: SelectChangeEvent) => void;
  onClick: () => Promise<void>;
};

const FormatSelection: FC<FormatSelectionProps> = ({
  disabled,
  onChange,
  onClick,
}) => {
  return (
    <Grid
      justifyContent="flex-end"
      flexDirection="row"
      display="flex"
      columnGap={4}
      xs={12}
    >
      <Grid item xs={12} md={5}>
        <FormControl sx={{ minWidth: "100%" }}>
          <InputLabel id="demo-simple-select-autowidth-label">
            Format
          </InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            autoWidth
            label="Format"
            defaultValue={FORMATS[0]}
            onChange={onChange}
          >
            {FORMATS.map((format) => (
              <MenuItem key={format} value={format}>
                To {format.toUpperCase()}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md>
        <Button
          disabled={disabled}
          sx={{ height: "100%", minWidth: "100%" }}
          variant="contained"
          color={"success"}
          onClick={onClick}
        >
          Convert
        </Button>
      </Grid>
    </Grid>
  );
};

export default FormatSelection;
