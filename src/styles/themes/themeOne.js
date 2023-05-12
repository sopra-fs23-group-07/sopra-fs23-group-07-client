const colors = {
  // primary & secondary dark MUI
//   primary: "#ce93d8",
//   secondary: "#90caf9",
  // primary & secondary YouTube Tutorial
    primary: "#00adb5",
    secondary: "#95defb",
  // backgroundcolor
  // background:"#d5d5d5 ",
  // not used yet
  sucess: "#4CAF50",
  info: "#00a2ff",
  danger: "#FF5722",
  warning: "#FFC107",
  dark: "#0e1b20",
  light: "#aaa",
  muted: "#abafb3",
  border: "#DDDFE1",
  inverse: "#2F3D4A",
  shaft: "#333",
  dove_gray: "#d5d5d5",
  body_bg: "#f3f6f9",
  white: "#fff",
  black: "#000",
};

import { createTheme } from "@mui/material";

export const themeOne = createTheme({
  // colors
  palette: {
    // mode: "dark",
    // mode: "light",
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },

    // background: {
    //   default: colors.background,
    // },
  },
  // fonts
  typography: {
    fontFamily: 'Helvetica, Monteserrat, "Roboto",  "Arial", sans-serif',
  },
  // random things
//   spacing: 8,
//   shape: {
//     borderRadius: 4,
//   },
//   props: {
//     MuiAppBar: {
//       color: "secondary",
//     },
//     MuiButtonBase: {
//       disableRipple: true,
//     },
//     MuiTooltip: {
//       arrow: true,
//     },
//   },
//   overrides: {
//     MuiButton: {
//       root: {
//         background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
//         border: 0,
//         borderRadius: 3,
//         boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
//         color: "white",
//         height: 48,
//         padding: "0 30px",
//       },
//     },
//   },
});
