import {
    debounce,
    TableHead,
    TableRow,
    TableCell,
    MenuItem,
    InputAdornment,
    Box,
} from '@mui/material';
import { useState, useCallback, ReactElement, useEffect } from 'react';
import { CustomInput, CustomSelectInput } from './AppComponents';
import { IconBlackSearch } from './Icons';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const AppTableHeader = (props: any): ReactElement => {
    const { tableColumns, onFilterChange } = props;
    const [columns, setColumns] = useState(tableColumns);
    const [showFilter, setShowFilter] = useState(false);

    const debouncedCall = useCallback(
        debounce((filterData: any) => {
            const filterValues: any = {};
            Object.keys(filterData).forEach((key) => {
                if (filterData[key].value) {
                    filterValues[filterData[key].columnName] =
                        filterData[key].value;
                }
            });
            onFilterChange(filterValues);
        }, 1000),
        []
    );

    // UI Actions
    const actionOnChange = (event: any, index: number): void => {
        columns[index].value = event.target.value;
        const newColumns = [...columns];
        setColumns(newColumns);
        debouncedCall(newColumns);
    };

    useEffect(() => {
        setColumns(tableColumns);
    }, [tableColumns]);

    // UI Elements
    return (
        <TableHead>
            <TableRow>
                {columns.map((header: any, index: number) => (
                    <TableCell key={`${header.columnName}_${index}`}>
                        <Box>
                            {header.title}
                            {header.hasFilter && (
                                <img
                                    onClick={() => setShowFilter(!showFilter)}
                                    src={
                                        showFilter
                                            ? '/images/icons/icon_filter_up.svg'
                                            : '/images/icons/icon_filter_down.svg'
                                    }
                                    className="ml-1 cursor"
                                    width="15"
                                />
                            )}
                        </Box>
                        {header.hasFilter && showFilter && (
                            <>
                                {(header.type === 'text' ||
                                    header.type === 'number') && (
                                    <CustomInput
                                        type={header.type}
                                        name={header.columnName}
                                        fullWidth
                                        margin="none"
                                        variant="outlined"
                                        value={header.value}
                                        onChange={(event) => {
                                            actionOnChange(event, index);
                                        }}
                                        placeholder={header.placeholder}
                                        size="small"
                                        className="black-border"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="start">
                                                    <IconBlackSearch />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                )}
                                {header.type === 'select' && (
                                    <CustomSelectInput
                                        select
                                        type={header.type}
                                        name={header.columnName}
                                        fullWidth
                                        variant="outlined"
                                        className="black-border"
                                        value={header.value}
                                        onChange={(event: any) => {
                                            actionOnChange(event, index);
                                        }}
                                        size="small"
                                        IconComponent={KeyboardArrowDownIcon}
                                    >
                                        {header.options !== undefined &&
                                            header.options.map(
                                                (item: any, i: number) => (
                                                    <MenuItem
                                                        key={`value${i}`}
                                                        value={item.value}
                                                    >
                                                        {item.title}
                                                    </MenuItem>
                                                )
                                            )}
                                    </CustomSelectInput>
                                )}
                            </>
                        )}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

export default AppTableHeader;
