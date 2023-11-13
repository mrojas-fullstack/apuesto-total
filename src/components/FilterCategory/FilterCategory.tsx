import { 
    FormControl, 
    InputLabel, 
    MenuItem, 
    Select, 
    SelectChangeEvent, 
    Tooltip
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

type Props = {
    category: any;
    setCategory: any;
};

const FilterCategory = ({ category, setCategory }: Props) => {
    const handleChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value);
    };

    const handleClearFilter = () => {
        setCategory('');
        window.location.replace('/');
    };

    return (
        <div className='filter-container'>
            <FormControl sx={{ m: 1, minWidth: 120, color:'white' }} size="small">
                <InputLabel id="demo-select-small-label" sx={{color:'white'}}>Categoría</InputLabel>
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={category}
                    label="Categoría"
                    onChange={handleChange}
                    sx={{
                        color:'white',
                        "& svg":{
                            color:'white',
                        },
                        "& fieldset":{
                            borderColor:'white',
                        },
                        "& ::hover":{
                            borderColor:'white',
                        },
                    }}
                >
                    <MenuItem value={'Human'}>Human</MenuItem>
                    <MenuItem value={'Alien'}>Alien</MenuItem>
                    <MenuItem value={'Poopybutthole'}>Poopybutthole</MenuItem>
                    <MenuItem value={'Humanoid'}>Humanoid</MenuItem>
                    <MenuItem value={'Mythological'}>Mythological</MenuItem>
                    <MenuItem value={'unknown'}>unknown</MenuItem>
                </Select>
            </FormControl>
            {
                category.length > 0 && (
                    <Tooltip title="Limpiar">
                        <CloseIcon onClick={handleClearFilter} sx={{cursor:'pointer'}}/>
                    </Tooltip>
                )
            }
            
        </div>
    )
}

export default FilterCategory