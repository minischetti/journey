"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import * as Types from "./types";
import { ItemsContext, ItemsProvider } from "./context/ItemsContext";
import { CalendarMonth } from "./components/features/CalendarMonth";
import { ComposeForm } from "./components/features/ComposeForm";
import { CalendarWeek } from "./components/features/CalendarWeek";

enum CalendarView {
    day,
    week,
    month,
    year,
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
                {/* <Bar>
                    <h1 className="text-4xl w-full text-center">Journey</h1>
                    <button type="button" variant={Variants.circle}>
                        <Plus weight="bold" />
                    </button>
                </Bar> */}
                {/* Body */}
                <section>
                    {/* Left */}

                    {/* Center */}
                    {/* <List>
                        {items.map((item, itemIndex) => (
                            <Item key={itemIndex} {...item}>
                                {item.tags.map((tag, tagIndex) => (
                                    <Tag key={tagIndex} name={tag} />
                                ))}
                            </Item>
                        ))}
                    </List> */}
                    {/* Right */}
                    <ComposeForm />
                    {calendarTemplate()}
                </section>
            </div>
        </ItemsContext.Provider>
    );
}

export default App;
