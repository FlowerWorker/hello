'use client'

import React, { useState, } from 'react';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    IconButton,
    Paper,
    Stack,
    styled,
    Typography,
} from '@mui/material';
import { Close, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, addMonths, subMonths } from 'date-fns';

interface AddDeadlineProps {
    onSave: (date: Date, time: string) => void;
    toggleDeadline: () => void;
}

const CalendarDay = styled(Button)({
    minWidth: '24px',
    width: '24px',
    height: '24px',
    padding: 0,
    margin: '4px',
    fontSize: '12px',
    fontWeight: 'normal',
    border: '1px solid black',
    borderRadius: 2,
    '&.selected': {
        backgroundColor: '#BD71D4',
        color: 'white',
        border: '1px solid #BD71D4',
        borderRadius: 2,
    },
    '&.otherMonth': {
        color: '#BDBDBD'
    }
});

const TimeButton = styled(Button)({
    minWidth: '80px',
    border: '1px solid black',
    borderRadius: 2,
    '&.selected': {
        backgroundColor: '#BD71D4',
        color: 'white',
        border: '1px solid #BD71D4',
        borderRadius: 2,
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

    const handleMonthChange = (date: Date) => {
        setSelectedMonth(date);
    };

    const handleDateSelect = (date: Date | null) => {
        setSelectedDate(date);
    };

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
    };

    const handleSave = () => {
        console.log('Deadline set:', selectedDate, selectedTime);
        if (selectedDate && selectedTime) {
            onSave(format(selectedDate, 'dd/MM/yyyy'), selectedTime);
            toggleDeadline();
        }
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
            }}>
                {/* Calendar Navigation */}
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Paper variant='outlined' sx={{
                        p: 2, borderColor: 'black', zIndex: 100, borderRadius: 3, boxShadow: 1,
                    }}>
                        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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

                        <Divider sx={{ mb: 2 }} />

                        <DateCalendar
                            showDaysOutsideCurrentMonth
                            value={selectedDate}
                            onChange={handleDateSelect}
                            onMonthChange={handleMonthChange}
                            referenceDate={selectedMonth}
                            renderDay={(day, _value, DayComponentProps) => (
                                <CalendarDay
                                    {...DayComponentProps}
                                    className={selectedDate && day.getDate() === selectedDate.getDate() ? 'selected' : ''}>
                                    {day.getDate()}
                                </CalendarDay>
                            )}
                            sx={{
                                '& .MuiPickersCalendarHeader-root': { display: 'none' },
                                '& .MuiDayCalendar-weekDayLabel': { fontSize: 'medium', width: '36px', fontWeight: 'bold' },
                                '& .MuiDayCalendar-monthContainer': { width: '100%' },
                                '& .MuiPickersDay-root': { border: '1px solid black', borderRadius: 2 },
                            }}
                        />
                    </Paper>
                </LocalizationProvider>


                {/* Time Section */}
                <Paper variant='outlined' sx={{
                    p: 2, borderColor: 'black', borderRadius: 3, boxShadow: 1, textAlign: 'center',
                }}>
                    <Typography variant='h5' sx={{ mb: 2, fontWeight: 'bold' }}>
                        Time
                    </Typography>

                    <Divider sx={{ mb: 2 }} />

                    <Stack spacing={1}>
                        {timeSlots.map((time) => (
                            <TimeButton
                                key={time}
                                variant={selectedTime === time ? 'contained' : 'outlined'}
                                className={selectedTime === time ? 'selected' : ''}
                                onClick={() => handleTimeSelect(time)}
                                sx={{
                                    borderColor: 'black',
                                    borderRadius: 2,
                                    backgroundColor: selectedTime === time ? '#3FDCD0' : 'inherit',
                                    color: selectedTime === time ? 'white' : 'inherit'
                                }}
                            >
                                {time}
                            </TimeButton>
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