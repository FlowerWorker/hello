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
    minWidth: '80px',
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

    const handleDateSelect = (date: Date | null) => {
        setSelectedDate(date);
    };

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
    };

    const handleSave = async () => {
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
                zIndex: 100,
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
                        p: 2, borderColor: 'black', zIndex: 100, borderRadius: 3, boxShadow: 1,
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
                            // referenceDate={selectedMonth}
                            // renderDay={(day, _value, DayComponentProps) => (
                            //     <CalendarDay
                            //         {...DayComponentProps}
                            //         className={selectedDate && day.getDate() === selectedDate.getDate() ? 'selected' : ''}>
                            //         {day.getDate()}
                            //     </CalendarDay>
                            // )}
                            slots={{
                                day: DatePicker // Use your custom DatePicker component
                            }}
                            sx={{
                                width: '100%',
                                '& .MuiPickersCalendarHeader-root': {
                                    '& .MuiPickersCalendarHeader-label': {
                                        fontSize: '1.25rem', // Larger month/year text
                                        fontWeight: 'bold',
                                    },
                                    '& .MuiIconButton-root': {
                                        padding: '8px', // Larger navigation buttons
                                        fontSize: '1.5rem',
                                    }
                                },
                                '& .MuiDayCalendar-weekDayLabel': {
                                    fontSize: '1rem', // Larger weekday labels
                                    height: 40, // Taller weekday row
                                    width: 40, // Wider weekday cells
                                    fontWeight: 'bold'
                                },
                                '& .MuiPickersDay-root': {
                                    width: 36, // Wider day cells
                                    height: 36, // Taller day cells
                                    fontSize: '1rem', // Larger day numbers
                                },
                                '& .MuiDayCalendar-monthContainer': {
                                    height: '100%',
                                    minHeight: 280, // Minimum height for days grid
                                },
                            }}
                        />
                    </Paper>
                </LocalizationProvider>


                {/* Time Section */}
                <Paper variant='outlined' sx={{
                    p: 1, borderColor: 'black', borderRadius: 3, boxShadow: 1, textAlign: 'center'
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
                                    backgroundColor: '#3FDCD0',
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