'use client'

import React, { useState, } from 'react';
import { Box, Button, Checkbox, Divider, IconButton, Paper, Stack, styled, Typography } from '@mui/material';
import { Close, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from 'dayjs';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { format, addMonths, subMonths, isToday, isSameDay } from 'date-fns';

interface AddDeadlineProps {
    onSave: (date: Date, time: string) => void;
    toggleDeadline: () => void;
}

const DatePicker = (props: PickersDayProps<Date>) => {
    const { day, selected, ...other } = props;
    const isToday = isSameDay(day, new Date());
    const isSelected = selected

    return (
        <PickersDay
            {...other}
            day={day}
            selected={selected}
            sx={{
                // Default day styling
                color: 'black',
                backgroundColor: 'white',
                border: '1px solid transparent',
                borderRadius: '4px',
                '&:hover': {
                    backgroundColor: '#f5f5f5',
                },
                // Today's date styling
                ...(isToday && !isSelected && {
                    border: '1px solid black',
                }),
                // Selected date styling
                ...(isSelected && {
                    backgroundColor: '#BD71D4',
                    color: 'white',
                    border: '1px solid transparent',
                    '&:hover': {
                        backgroundColor: '#a45bc1',
                    },
                }),
                // Days outside current month
                ...(props.outsideCurrentMonth && {
                    color: '#BDBDBD',
                }),
            }}
        />
    );
}

const TimePicker = styled(Button)({
    minWidth: '80px',
    fontSize: '16px',
    fontWeight: 'bold',
    border: 'transparent',
    '&.selected': {
        color: 'white',
        backgroundColor: '#BD71D4',
        border: '1px solid #BD71D4',
        borderRadius: 4,
    },
});

export default function AddDeadline({ onSave, toggleDeadline }: AddDeadlineProps) {
    const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const timeSlots = ['10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30'];

    const handlePrevMonth = () => {
        setSelectedMonth(subMonths(selectedMonth, 1));
    };

    const handleNextMonth = () => {
        setSelectedMonth(addMonths(selectedMonth, 1));
    };

    const handleMonthSelect = (date: Date) => {
        setSelectedMonth(date);
    }

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date || null);
    };

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
    };

    const handleSave = () => {
        if (!selectedDate || !selectedTime) {
            // Optional: Add error feedback to user
            console.warn("Please select both date and time");
            return;
        }

        // Combine date and time into a single Date object
        const [hours, minutes] = selectedTime.split(':').map(Number);
        const deadlineDate = new Date(selectedDate);
        deadlineDate.setHours(hours, minutes);

        // Call the onSave prop with the complete deadline
        onSave(deadlineDate, selectedTime);

        // Close the deadline picker
        toggleDeadline();
    };

    const handleCancel = () => {
        toggleDeadline();
    };

    return (
        <Paper
            elevation={3}
            sx={{
                maxWidth: 1120, width: '100%', p: 3,
                borderRadius: 5,
                bgcolor: 'white',
                boxShadow: 3,
            }}>

            {/* Header Section */}
            <Box sx={{
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <Box>
                    <Typography variant='h6' gutterBottom sx={{ mb: 2, fontWeight: 'bold' }}>
                        Does your project has a deadline? *
                    </Typography>

                    <Typography variant='subtitle1' gutterBottom sx={{ mb: 2, color: 'gray' }}>
                        Pick a due date
                    </Typography>
                </Box>

                <IconButton
                    onClick={toggleDeadline}
                    sx={{ position: 'absolute', top: 16, right: 16, }}>
                    <Close />
                </IconButton>
            </Box>


            <Box sx={{
                gap: 3,
                display: 'flex',
                alignItems: 'flex-end',
            }}>
                {/* Calendar Navigation */}
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Paper variant='outlined' sx={{
                        p: 2, height: '100%', borderColor: 'black', borderRadius: 3, boxShadow: 1, pb: 5
                    }}>
                        {/* <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <IconButton onClick={handlePrevMonth}>
                                <ChevronLeft />
                            </IconButton>

                            <Typography variant='h5' sx={{ mb: 1, fontWeight: 'bold' }}>
                                {format(selectedMonth, 'MMMM yyyy')}
                            </Typography>

                            <IconButton onClick={handleNextMonth}>
                                <ChevronRight />
                            </IconButton>
                        </Box>

                        <Divider sx={{ mb: 2 }} /> */}

                        <DateCalendar
                            showDaysOutsideCurrentMonth
                            value={selectedDate}
                            month={selectedMonth}
                            onChange={handleDateSelect}
                            onMonthChange={handleMonthSelect}
                            slots={{
                                day: (props) => (
                                    <PickersDay
                                        {...props}
                                        sx={{
                                            color: 'black',
                                            backgroundColor: 'white',
                                            border: '1px solid transparent',
                                            borderRadius: '4px',

                                            ...(isToday(props.day) && !props.selected && {
                                                border: '1px solid black',
                                            }),

                                            ...(props.selected && {
                                                color: 'white !important',
                                                backgroundColor: '#BD71D4 !important',
                                                border: '1px solid transparent !important',
                                            }),

                                            '&:hover': {
                                                backgroundColor: '#f5f5f5',
                                            },

                                            ...(props.outsideCurrentMonth && {
                                                color: '#BDBDBD',
                                            }),
                                        }}
                                    />
                                ),
                            }}
                            sx={{
                                '& .MuiPickersCalendarHeader-root': {
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '0 4px',
                                    marginBottom: '16px',
                                    '& .MuiPickersCalendarHeader-label': {
                                        fontSize: 'large',
                                        fontWeight: 'bold',
                                        color: 'black',
                                    },
                                    '& .MuiIconButton-root': {
                                        padding: '8px', // Larger navigation buttons
                                        fontSize: '1.5rem',
                                    }
                                },
                                '& .MuiDayCalendar-weekDayLabel': { fontSize: '1rem', width: '36px', fontWeight: 'bold' },
                                '& .MuiPickersArrowSwitcher-root': {
                                    display: 'flex',
                                    gap: '8px',
                                },
                                '& .Mui-selected': {
                                    backgroundColor: '#BD71D4 !important',
                                    color: 'white !important',
                                },
                                '& .MuiPickersDay-root': {
                                    color: 'black',
                                    backgroundColor: 'white',
                                    border: 'transparent',
                                    borderRadius: 2,
                                    width: 36, // Wider day cells
                                    height: 36, // Taller day cells
                                    fontSize: '1rem', // Larger day numbers
                                },
                                // '& .MuiPickersDay-today': {
                                //     color: 'black',
                                //     backgroundColor: 'white',
                                //     border: '1px solid black',
                                //     borderRadius: 2,
                                // },
                                // '& .MuiPickersDay-root.Mui-selected': {
                                //     color: 'white',
                                //     backgroundColor: '#BD71D4',
                                //     border: '1px solid #BD71D4',
                                //     borderRadius: 2,
                                // },
                                '& .MuiPickersDay-dayOutsideMonth': {
                                    color: '#BDBDBD',
                                    backgroundColor: 'white',
                                },
                                '& .MuiDayCalendar-monthContainer': {
                                    height: '100%',
                                },
                            }}
                        />
                    </Paper>
                </LocalizationProvider>

                {/* Time Section */}
                <Paper variant='outlined' sx={{
                    p: 2, borderColor: 'black', borderRadius: 3, boxShadow: 1, textAlign: 'center', height: '100%'
                }}>
                    <Typography variant='h6' sx={{ mb: 1, fontWeight: 'bold' }}>
                        Time
                    </Typography>

                    <Divider sx={{ mb: 1 }} />

                    <Stack spacing={1}>
                        {timeSlots.map((time) => (
                            <TimePicker
                                key={time}
                                variant={selectedTime === time ? 'contained' : 'outlined'}
                                className={selectedTime === time ? 'selected' : ''}
                                onClick={() => handleTimeSelect(time)}
                                sx={{
                                    border: 'transparent',
                                    borderRadius: 2,
                                    backgroundColor: selectedTime === time ? '#3FDCD0' : 'inherit',
                                    color: selectedTime === time ? 'white' : 'inherit'
                                }}
                            >
                                {time}
                            </TimePicker>
                        ))}
                    </Stack>
                </Paper>


                {/* Project Deadline Section */}
                <Box>
                    <Typography variant='h5' sx={{ mb: 2, fontWeight: 'bold' }}>
                        Project deadline
                    </Typography>

                    <Divider sx={{ mb: 2 }} />

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Checkbox
                                checked={!!selectedDate}
                                size='small'
                                sx={{
                                    color: '#BD71D4',
                                    '&.Mui-checked': {
                                        color: '#BD71D4',
                                    },
                                }} />

                            <Typography variant='body2'>
                                {selectedDate ? format(selectedDate, 'dd/MM/yyyy') : 'DD/MM/YYYY'}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Checkbox
                                checked={!!selectedTime}
                                size='small'
                                sx={{
                                    color: '#BD71D4',
                                    '&.Mui-checked': {
                                        color: '#BD71D4',
                                    },
                                }} />

                            <Typography variant='body2'>
                                {selectedTime || 'Hour'}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Save Button */}
                    {(selectedDate || selectedTime) && (
                        <Box sx={{ gap: 1, display: 'flex', justifyContent: 'space-between', }}>
                            <Button
                                variant="outlined"
                                onClick={handleCancel}
                                sx={{ textTransform: 'none' }}>
                                Cancel
                            </Button>

                            <Button
                                fullWidth
                                variant='contained'
                                onClick={handleSave}
                                disabled={!selectedDate || !selectedTime}
                                sx={{
                                    backgroundColor: '#BD71D4',
                                    '&:hover': { backgroundColor: '#36C1B5' },
                                    color: 'white',
                                    textTransform: 'none'
                                }}
                            >
                                Save
                            </Button>
                        </Box>
                    )}
                </Box>

            </Box>
        </Paper >
    );
}