import { createTheme } from "@mui/material";
import { darken } from "@mui/material";
import background1 from "../../background1.jpg";
import background2 from "../../background2.jpg";
import background3 from "../../background3.jpg";
import background4 from "../../background4.jpg";
import background5 from "../../background5.jpg";

const colors5 = {
  // primary & secondary dark MUI
  // primary: "#ce93d8",
  // secondary: "#90caf9",
  // primary & secondary YouTube Tutorial
  // primary: "#00adb5",
  // secondary: "#95defb",
  // primary: "rgba(2,0,36,1)",
  // secondary: "rgba(0,212,255,1)",
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

// colors5.bluegradient =
//   "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 36%, rgba(0,212,255,1) 100%)"; // version 1

colors5.bluegradient =
  "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 100%)"; // version 1

colors5.orangegradient =
  "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)";

// analogous colors of dominant
colors5.violetgradient1 = "linear-gradient(to right, #A56DC9, #6D91C9)"; // sexy
colors5.violetgradient1right = "#6D91C9";

// triadic color to dominant
colors5.triadicDominantGradient = "linear-gradient(to right, #C9776D, #6DC977)";

// colors5.containedButtonBackground = colors5.bluetwo;
// colors5.containedButtonBackground = colors5.redgradient; // version 1
// colors5.containedButtonBackground = colors5.triadicDominantGradient;
colors5.containedButtonBackground = "orange";
// colors5.containedButtonBackground = colors5.redgradient;
// colors5.containedButtonBackground = colors5.orangegradient;

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
// colors5.headerColor = colors5.bluegradient;

// colors5.pageHeaders = colors5.redgradient;
colors5.pageHeaders = "green";

colors5.containerBackground = colors5.bluethree;
colors5.background = colors5.light;
colors5.background = colors5.black;

colors5.iconButtonBackground = colors5.violetgradient1;
colors5.iconButtonSymbol = colors5.primary; // gradient doesn't work
// colors5.iconButtonBackgroundHover = colors5.violetgradient1reverse; // original version
// colors5.iconButtonBackgroundHover = colors5.violetgradient1right; // version 1
// colors5.iconButtonBackgroundHover = "black"; // version 2 maybe white?
colors5.iconButtonBackgroundHover = colors5.primary;
colors5.iconButtonSymbolHover = colors5.secondary;
// background pictures
// colors5.backgroundPicture = background2;
// colors5.backgroundPicture = background3;
// colors5.backgroundPicture = background4;
colors5.backgroundPicture = background5; // version 1

export const themeTwo = createTheme({
  // colors
  palette: {
    // mode: "dark",
    primary: {
      main: "#ce93d8",
    },
    secondary: {
      // main: "#90caf9",
      main: colors5.secondary,
    },
    background: {
      default: "#121212",
      paper: "#121212", // background color of header, cards and table header in mode: dark
    },
    // some issue with these attributes. They are not taken to components
    // pageHeaders: colors5.pageHeaders,
    pageHeaders: "red",
  },
  // fonts
  typography: {
    fontFamily: 'Helvetica, Monteserrat, "Roboto",  "Arial", sans-serif',
  },
});

export const themeThree = createTheme({});

export const themeFour = createTheme({
  components: {
    // Name of the component
    MuiButtonBase: {
      defaultProps: {
        // The props to change the default for.
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        // root: {
        //   // Some CSS
        //   fontSize: '1rem',

        // },
        root: ({ ownerState }) => ({
          ...(ownerState.variant === "contained" &&
            ownerState.color === "primary" && {
              backgroundColor: "#202020",
              color: "#fff",
            }),
        }),
        // dynamic styling
        // ... for only overriding some properties but not all
        // then === is for conditions
        // and inside {} there is the dynamic style
        root: ({ ownerState }) => ({
          ...(ownerState.variant === "text" && {
            // backgroundColor: "#202020",
            color: "#fff",
          }),
        }),
        // valueLabel: ({ ownerState, theme }) => ({
        //   ...(ownerState.orientation === "vertical" && {
        //     backgroundColor: "transparent",
        //     color: theme.palette.grey[500],
        //   }),
        // }),
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: ({ theme }) =>
        theme.unstable_sx({
          px: 1,
          py: 0.25,
          borderRadius: 1,
        }),
      label: {
        padding: "initial",
      },
      icon: ({ theme }) =>
        theme.unstable_sx({
          mr: 0.5,
          ml: "-2px",
        }),
    },
  },
});

export const themeFive = createTheme({
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },

    MuiButton: {
      styleOverrides: {
        // EN TRAUM!!!
        root: {
          // backgroundColor: colors5.button,
          background: "red", // for this line the hover works
          // backgroundColor: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)", // this line doesn't work
          color: "white",
          fontSize: "1rem",
          // transition: 'background-color 0.3s ease', // Add a transition for smooth effect
          "&:hover": {
            background: "linear-gradient(45deg, #FE8B6B 30%, #FFA953 90%)",
          },
          // '&:hover': {
          // backgroundColor: darken("red", 0.2),
          // },
        },
      },
    },
  },
});

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
          // transform: "translate(0,0)",
          // transition: "transform 0.2s",
          transition: "background 0.2s",

          // "&:before": {

          //   position: "absolute",
          //   height: "100%",
          //   width: "100%",
          //   background: "hsl(0, 0%, 5%)",
          //   border: "2px solid white",
          //   top: "0",
          //   left: "0",
          // },

          "&:hover": {
            // color: "blue", // change hover
            // border: "1px black solid",
            // transform: "translate(5%, 5%)",
            background: colors5.iconButtonBackgroundHover,
            color: colors5.iconButtonSymbolHover,
          },
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          // border:"none",
          // background: "pink"
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          // border: 1,
          // borderColor: "black",
          // background: "yellow"
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
          // maxWidth: "md",
          minWidth: "90%",
          // minHeight: "2000px",
          // height: "4000px",
          // background: colors5.containerBackground,
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
            // borderRadius: "20px",
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
            // background: colors5.textButtonBackground,
            color: colors5.textButtonText,
            // transition: "background 0.3s ease",
            "&:hover": {
              // background: colors5.textButtonBackgroundHover,
              // color: colors5.textButtonTextHover,
              // fontSize: "1.25rem",
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
          // backgroundSize: "30%",

          backgroundPosition: "center",
          backgroundRepeat: "repeat",
        },
      },
    },
  },
  overrides: {
    MuiCssBaseline: {
      // global CSS style
      "@global": {
        body: {
          margin: 0,
          padding: 0,
          minWidth: "100vw",
          minHeight: "100vh",
          backgroundColor: colors5.bluethree,
          backgroundImage: `url(${background1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        },
      },
      // body: { // background image doesn't work
      // backgroundImage: `url(${background1})`,
      // url('src/background1.jpg'),
      // "url(https://designshack.net/wp-content/uploads/gradient-background.jpg)"
      // backgroundRepeat: "no-repeat",
      // backgroundSize: "cover",
      // },
    },
  },
});
