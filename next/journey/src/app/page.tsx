"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import * as Types from "./types";
import { Command } from "cmdk";
import { ItemsContext, ItemsProvider } from "./context";
import { Tag as TagIcon, Plus, X, Subtract } from "@phosphor-icons/react";
import { autoPlacement, flip, shift, useFloating, autoUpdate } from "@floating-ui/react";
import { Bar } from "./components/ui/Bar";
import { Timeline } from "./components/ui/Timeline";
import { Side } from "./components/ui/Side";
import { Calendar } from "./components/features/Calendar";
import { List } from "./components/ui/List";
import { ComposeForm } from "./components/features/ComposeForm";
import { Item } from "./components/ui/Item";

export enum Variants {
    default = "rounded-md bg-transparent",
    circle = "rounded-full border-2 border-zinc-600",
    outline = "border border-zinc-600 rounded-md",
    underline = "border-b border-zinc-600",
}

function Button({
    type,
    children,
    onClick,
    variant = Variants.default,
}: {
    type: "button" | "submit";
    children: JSX.Element;
    onClick?: () => void;
    variant?: Variants;
}) {
    return (
        <button type={type} onClick={onClick} className={`flex gap-1 items-center p-2 text-zinc-100 ${variant}`}>
            {children}
        </button>
    );
}

function App() {
    const [items, setItems] = useState<Types.Item[]>([]);

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

    return (
        <ItemsContext.Provider value={{ items, add, remove }}>
            <div className="flex flex-col w-dvw h-dvh">
                {/* Header */}
                {/* <Bar>
                    <h1 className="text-4xl w-full text-center">Journey</h1>
                    <button type="button" variant={Variants.circle}>
                        <Plus weight="bold" />
                    </button>
                </Bar> */}

                {/* Body */}
                <div className="flex gap-4 w-full max-h-full">
                    {/* Left */}
                    <Calendar />
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
                </div>
            </div>
        </ItemsContext.Provider>
    );
}

export default App;
