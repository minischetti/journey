import React from 'react';
import { useCalendar } from '../../context/CalendarContext';
import * as datefns from 'date-fns';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';

export const CalendarWeek = () => {
    const calendar = useCalendar();

    enum View {
        day,
        week,
        month,
        year,
    }

    return (
        <div className="calendar">
            <div className="flex justify-between p-2">
                <div className="flex gap-1 text-2xl tracking-wider">
                    <span className="font-bold">{calendar.currentMonth}</span>
                    <span>{calendar.currentYear}</span>
                </div>
                <div className="flex gap-2">
                    <button onClick={calendar.goToPreviousWeek}>
                        <CaretLeft />
                    </button>
                    <button onClick={calendar.goToToday}>Today</button>
                    <button onClick={calendar.goToNextWeek}>
                        <CaretRight />
                    </button>
                </div>
            </div>
            <div className="flex justify-between p-2">
                {calendar.daysOfWeek.map((day) => (
                    <div className="text-center" key={day}>
                        {day}
                    </div>
                ))}
            </div>
            <div className="flex justify-between p-2">
                {calendar.getDatesOfWeek().map((day) => (
                    <div
                        key={day}
                    >
                        {day}
                    </div>
                ))}
            </div>
        </div>
    );
}
