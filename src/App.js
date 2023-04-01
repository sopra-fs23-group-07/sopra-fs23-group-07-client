import Header from "components/views/Header";
import AppRouter from "components/routing/routers/AppRouter";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
/**
 * Happy coding!
 * React Template by Lucas Pelloni
 * Overhauled by Kyrill Hux
 */
const App = () => {
  return (
    <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AppRouter />
        </LocalizationProvider>
    </div>
  );
};

export default App;
