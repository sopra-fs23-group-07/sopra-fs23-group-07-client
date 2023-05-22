import { createTheme } from "@mui/material";
import background5 from "../../background5.jpg";

const colors5 = {
  primary: "#FFA500",
  secondary: "#A56DC9",
  orange: "#FFA500",
  dominantviolet: "#A56DC9",
  blueone: "rgba(2,0,36,1)",
  bluetwo: "rgba(9,9,121,1)",
  bluethree: "rgba(0,212,255,1)",
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

// dynamic colors
colors5.redgradient =
  "linear-gradient(to right, rgba(255, 0, 0, 1), rgba(255, 165, 0, 1))"; // version 1

colors5.redgradientreverse =
  "linear-gradient(to left, rgba(255, 0, 0, 1), rgba(255, 165, 0, 1))"; // version 1

colors5.bluegradient =
  "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 100%)"; // version 1

colors5.orangegradient =
  "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)";

// analogous colors of dominant
colors5.violetgradient1 = "linear-gradient(to right, #A56DC9, #6D91C9)"; // sexy
colors5.violetgradient1right = "#6D91C9";

// triadic color to dominant
colors5.triadicDominantGradient = "linear-gradient(to right, #C9776D, #6DC977)";

colors5.containedButtonBackground = "orange";

// analogous colors of dominant
colors5.violetgradient1 = "linear-gradient(to right, #A56DC9, #6D91C9)"; // sexy
colors5.violetgradient1reverse = "linear-gradient(to left, #A56DC9, #6D91C9)"; // sexy

// triadic color to dominant
colors5.triadicDominantGradient = "linear-gradient(to right, #C9776D, #6DC977)";

colors5.containedButtonBackgroundHover = colors5.violetgradient1reverse;
colors5.containedButtonText = colors5.white;
colors5.containedButtonTextHover = "orange";

colors5.textButtonText = colors5.white;
colors5.textButtonTextHover = "orange";
colors5.headerColor = colors5.violetgradient1;
colors5.textButtonBackgroundHover = colors5.violetgradient1reverse;

colors5.containerBackground = colors5.bluethree;
colors5.background = colors5.light;
colors5.background = colors5.black;

colors5.iconButtonBackground = colors5.violetgradient1;
colors5.iconButtonSymbol = colors5.primary; // gradient doesn't work
colors5.iconButtonBackgroundHover = colors5.primary;
colors5.iconButtonSymbolHover = colors5.secondary;
// background pictures
colors5.backgroundPicture = background5; // version 1

export const themeSix = createTheme({
  palette: {
    primary: {
      default: colors5.primary,
      main: colors5.primary,
    },
    secondary: {
      default: colors5.secondary,
      main: colors5.secondary,
    },
    background: {
      default: colors5.background,
    },
    blueone: colors5.blueone,
    bluetwo: colors5.bluetwo,
    bluethree: colors5.bluetwo,
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: colors5.secondary, // color when hover
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: colors5.secondary, // color when focused
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: colors5.secondary, // color of the label when focused
          },
        },
      },
    },

    MuiSlider: {
      styleOverrides: {
        root: {
          color: colors5.primary,
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          background: colors5.iconButtonBackground,
          color: colors5.iconButtonSymbol,
          transition: "background 0.2s",

          "&:hover": {
            background: colors5.iconButtonBackgroundHover,
            color: colors5.iconButtonSymbolHover,
          },
        },
      },
    },


    MuiAppBar: {
      styleOverrides: {
        root: {
          background: colors5.headerColor,
        },
      },
    },

    MuiContainer: {
      styleOverrides: {
        root: {
          minWidth: "90%",
          marginTop: "25px",
        },
      },
    },

    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },

    // buttons
    MuiButton: {
      styleOverrides: {
        // make sure only contained buttons are
        root: ({ ownerState }) => ({
          ...(ownerState.variant === "contained" && {
            // styling contained buttons
            background: colors5.containedButtonBackground,
            color: colors5.containedButtonText,
            transition: "background 0.3s ease",
            "&:hover": {
              background: colors5.containedButtonBackgroundHover,
              color: colors5.containedButtonTextHover,
            },
          }),
          ...(ownerState.variant === "text" && {
            // styling text buttons
            color: colors5.textButtonText,
            "&:hover": {
              background: colors5.textButtonBackgroundHover,
              color: colors5.textButtonTextHover,
            },
          }),
        }),
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: `url(${colors5.backgroundPicture})`,
          backgroundSize: "60%",
          backgroundPosition: "center",
          backgroundRepeat: "repeat",
        },
      },
    },
  },
});
