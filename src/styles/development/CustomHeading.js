import { Typography, styled } from "@mui/material";

export const CustomHeading = styled(Typography)(({ theme }) => ({
    // variant needs to be applied directly
    // variant:"h3",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    //   letterSpacing: "0.4em"
}));

