import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import Groups2Icon from "@mui/icons-material/Groups2";

const Input = styled(MuiInput)`
  width: 42px;
`;

export const InputSlider = (props) => {
  const maxParticipants = props.maxParticipants;
  const setMaxParticipants = props.setMaxParticipants;
  const maxPartError = props.maxPartError;
  const setMaxPartError = props.setMaxPartError;

  const handleBlur = () => {
    if (maxParticipants < 2) {
      setMaxParticipants(2);
    } else if (maxParticipants > 30) {
      setMaxParticipants(30);
    }
  };

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <Typography
        id="input-slider"
        gutterBottom
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        Maximum Number of Participants
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Groups2Icon color={maxPartError ? "error" : "primary"} />
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof maxParticipants === "number" ? maxParticipants : 0}
            min={2}
            max={30}
            onChange={(e, newValue) => {
              setMaxPartError(false);
              setMaxParticipants(newValue);
            }}
            aria-labelledby="input-slider"
            color={maxPartError ? "error" : "primary"}
          />
        </Grid>
        <Grid item>
          <Input
            value={maxParticipants}
            size="small"
            onChange={(e) => {
              setMaxPartError(false);
              setMaxParticipants(
                e.target.value === "" ? "" : Number(e.target.value)
              );
            }}
            onBlur={handleBlur}
            inputProps={{
              step: 1,
              min: 2,
              max: 30,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
            error={maxPartError}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
