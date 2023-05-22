import AppRouter from "components/routing/routers/AppRouter";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { GlobalProvider } from "./helpers/GlobalState";
import { themeSix } from "styles/themes/themeTests";


const App = () => {
  const theme = themeSix;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <AppRouter />
        </LocalizationProvider>
      </GlobalProvider>
    </ThemeProvider>
  );
};

export default App;
