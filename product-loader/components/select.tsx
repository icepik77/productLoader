import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Height } from '@mui/icons-material';

interface ISort {
    name: () => void,
    ascending: () => void,
    descending: () => void
}

export default function BasicSelect(props: ISort) {
    const [sort, setSort] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setSort(event.target.value as string);
    };

    return (
        <Box sx={{ minWidth: 120, minHeight: 36 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Сортировать</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sort}
                    label="Сортировка"
                    onChange={handleChange}
                >
                    <MenuItem onClick={props.name} value={"По умолчанию"}>По умолчанию</MenuItem>
                    <MenuItem onClick={props.ascending} value={"Сначала дешевле"}>Сначала дешевле</MenuItem>
                    <MenuItem onClick={props.descending} value={"Сначала дороже"}>Сначала дороже</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}