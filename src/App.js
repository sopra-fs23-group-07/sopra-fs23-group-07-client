import AppRouter from "components/routing/routers/AppRouter";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { GlobalProvider } from "./helpers/GlobalState";
import StyleTest from "./styles/development/StyleTest"; // remove when done with design
import { themeOne } from "./styles/themes/themeOne";
import { themeFive, themeFour, themeSix, themeThree, themeTwo } from "styles/themes/themeTests";


/**
 * Happy coding!
 * React Template by Lucas Pelloni
 * Overhauled by Kyrill Hux
 */
const App = () => {
  // choose theme for theme provider
  const theme = themeSix;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <AppRouter />
          {/* Only use StyleTest for designing */}
          {/* <StyleTest /> */}
        </LocalizationProvider>
      </GlobalProvider>
    </ThemeProvider>
  );
};

export default App;
