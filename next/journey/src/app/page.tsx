"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import * as Types from "./types";
import { ItemsContext, ItemsProvider } from "./context/ItemsContext";
import { CalendarMonth } from "./components/features/CalendarMonth";
import { ComposeForm } from "./components/features/ComposeForm";
import { CalendarWeek } from "./components/features/CalendarWeek";

enum CalendarView {
    day = "day",
    week = "week",
    month = "month",
    year = "year",
}

function App() {
    const [items, setItems] = useState<Types.Item[]>([]);
    const [calendarView, setCalendarView] = useState<CalendarView>(CalendarView.week);

    const [selectedItem, setSelectedItem] = useState<Types.Item | null>(null);

    const add = (item: Types.Item) => {
        setItems([...items, item]);
        console.log(items);
    }
    const remove = (item: Types.Item) => {
        setItems(items.filter((i) => i !== item));
        console.log(items);
    }

    useEffect(() => {
        if (items.length) {
            setSelectedItem(items[0]);
        }
        console.log("items", items);
    }, [items]);

    const calendarTemplate = () => {
        switch (calendarView) {
            case CalendarView.day:
                return <div>Day</div>;
            case CalendarView.week:
                return <CalendarWeek />;
            case CalendarView.month:
                return <CalendarMonth />;
            case CalendarView.year:
                return <div>Year</div>;
        }
    }

    return (
        <ItemsContext.Provider value={{ items, add, remove }}>
            <div>
                {/* Header */}
                <header>
                    <h1>Journey</h1>
                </header>
                <section>
                    <ComposeForm />
                    <select onChange={(e) => setCalendarView(e.target.value as CalendarView)}>
                        <option value={CalendarView.day}>Day</option>
                        <option value={CalendarView.week}>Week</option>
                        <option value={CalendarView.month}>Month</option>
                        <option value={CalendarView.year}>Year</option>
                    </select>
                    {calendarTemplate()}
                </section>
            </div>
        </ItemsContext.Provider>
    );
}

export default App;
