import * as React from 'react';
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import {api, handleError} from "./api";
import MenuItem from '@mui/material/MenuItem';
import {toast} from "react-toastify";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Basketball',
    'Soccer',
    'Tennis',
    'Swimming',
    'Golf',
    'Volleyball',
    'Cricket',
    'Rugby',
    'Hockey',
];

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function MultipleSelectChip(props) {
    const theme = useTheme();
    const [MainUserSelectedSports, setMainUserSelectedSports] = React.useState(props.selectedSportsServer);
    const lobbyId = localStorage.getItem("lobbyId");

    const handleChange = (event) => {
        const {
            target: {value},
        } = event;
        const selectedSports = typeof value === 'string' ? value.split(',') : value;
        UpdateSelectedSports(selectedSports).catch(err => console.log(err));
        setMainUserSelectedSports(selectedSports);
        props.onSelectedSports(selectedSports);
    };

    const UpdateSelectedSports = async (selectedSports) => {
        try {

            const requestBody = JSON.stringify({
                "memberId": props.memberId,
                "selectedSports": selectedSports
            });
            await api.put(`/lobbies/${lobbyId}/sport`, requestBody);


        } catch (error) {
            if(!(error.response.status === 404 && error.response.data === "The lobbyId provided was not found"))
            {
                toast.error(handleError(error));
            }
        }

    };


    return (
        <div>
            <FormControl sx={{m: 1, width: "90%"}}>
                <InputLabel id="demo-multiple-chip-label">Select Sports</InputLabel>
                <Select
                    disabled={props.hasLockedSelections}
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={MainUserSelectedSports}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip"/>}
                    renderValue={(selected) => (
                        <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} style={{
                                    ...getStyles(value, MainUserSelectedSports, theme),
                                    color: props.chosenSportServer.includes(value) ? 'orange' : 'black',
                                }}/>
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {names.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            style={{
                                ...getStyles(name, MainUserSelectedSports, theme),
                                color: "black",
                            }}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
