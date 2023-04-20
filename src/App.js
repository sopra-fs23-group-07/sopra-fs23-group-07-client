import AppRouter from "components/routing/routers/AppRouter";
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {GlobalProvider} from "./helpers/GlobalState";

/**
 * Happy coding!
 * React Template by Lucas Pelloni
 * Overhauled by Kyrill Hux
 */
const App = () => {


    return (
        <GlobalProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <AppRouter/>
            </LocalizationProvider>
        </GlobalProvider>
    );
};

export default App;
