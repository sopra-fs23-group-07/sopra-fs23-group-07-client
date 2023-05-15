import { Grid, styled } from "@mui/material";

export const CustomGrid = styled(Grid)(({ theme }) => ({
  // padding and margin need to applied directly
  //   paddingY: 10,
  //   paddingX: 4,
  //   paddingX: 8,
  //   mt: 2,
  maxWidth: 600,
//   maxWidth: 800,
  flexGrow: 1,
  background: "rgba(255, 255, 255, 0.7)",
  borderRadius: "20px",
//   margin: "0 auto",
  
}));
