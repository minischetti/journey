"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import * as Types from "./types";
import { Command } from "cmdk";
import { ItemsContext, ItemsProvider } from "./context/ItemsContext";
import { Tag as TagIcon, Plus, X, Subtract } from "@phosphor-icons/react";
import { autoPlacement, flip, shift, useFloating, autoUpdate } from "@floating-ui/react";
import { Bar } from "./components/ui/Bar";
import { Timeline } from "./components/ui/Timeline";
import { Side } from "./components/ui/Side";
import { CalendarMonth } from "./components/features/CalendarMonth";
import { List } from "./components/ui/List";
import { ComposeForm } from "./components/features/ComposeForm";
import { Item } from "./components/ui/Item";
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
            <div className="flex flex-col w-dvw h-dvh">
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
