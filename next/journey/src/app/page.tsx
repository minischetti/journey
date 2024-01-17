"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import Calendar from "./features/Calendar";
import * as Types from "./types";
import { Command } from "cmdk";
import { ItemsContext, ItemsProvider } from "./context";
import { Tag as TagIcon, Plus, X, Subtract, Eye, EyeClosed } from "@phosphor-icons/react";
import { autoPlacement, flip, shift, useFloating, autoUpdate } from "@floating-ui/react";

const AppContext = createContext({});
const { Provider } = AppContext;

const AppProvider = ({ children }: { children: JSX.Element }) => {
    const [items, setItems] = useState<Types.Item[]>([]);

    return <Provider value={{ items, setItems }}>{children}</Provider>;
};

enum Status {
    backlog = "backlog",
    upcoming = "upcoming",
    inProgress = "inProgress",
    cancelled = "cancelled",
    completed = "completed",
}

const Popup = ({ children }: { children: JSX.Element }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-white rounded-md p-2">{children}</div>
        </div>
    );
};

const Accordion = ({ title, children, variant }: { title: string; children: JSX.Element | JSX.Element[]; variant?: Variants }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
    };

    return (
        <div className={`cursor-pointer select-none border border-zinc-600 bg-zinc-700 rounded-md ${variant}`}>
            <div onClick={toggleAccordion} className="flex justify-between p-2 cursor-pointer">
                <h2>{title}</h2>
                <button>{isOpen ? <EyeClosed /> : <Eye />}</button>
            </div>
            {isOpen && (
                <div className="m-2">
                    <hr className="m-2"></hr>
                    {children}
                </div>
            )}
        </div>
    );
};

function Input({
    label,
    name,
    placeholder,
    onChange,
    variant = Variants.default,
}: {
    label: string;
    name: string;
    placeholder: string;
    onChange: (e: any) => void;
    variant?: Variants;
}) {
    return (
        <div className="flex flex-col gap-1">
            <Label>{label}</Label>
            <input
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                className={`border border-zinc-700 focus:outline-zinc-800 outline-none rounded-md p-2 ${variant}`}
            />
        </div>
    );
}

function Label({ children }: { children: JSX.Element }) {
    return <label className="text-xs uppercase font-bold">{children}</label>;
}

function Select({ label, name, children, variant = Variants.default }: { label: string; name: string; children: JSX.Element[]; variant?: Variants }) {
    return (
        <div className="flex flex-col gap-1">
            <Label>{label}</Label>
            <select name={name} value={Status.backlog} className={`border border-zinc-700 focus:outline-zinc-800 outline-none rounded-md p-2 ${variant}`}>
                {children}
            </select>
        </div>
    );
}

function Item({ name, description, status, items, tags }: Types.Item) {
    return (
        <div className="border border-gray-400 rounded-md p-2">
            <div className="flex justify-between">
                <div className="flex gap-2">
                    <TagIcon weight="bold" />
                    <Plus weight="bold" />
                    <X weight="bold" />
                </div>
            </div>
            <h2 contentEditable>{name}</h2>
            <p contentEditable>{description}</p>
            <p>{status}</p>
            {items && items.map((item, itemIndex) => <Item key={itemIndex} {...item} />)}
            {tags && (
                <Tags>
                    <Label>Tags</Label>
                    {tags.map((tag, tagIndex) => (
                        <Tag key={tagIndex} name={tag} onClose={() => {}} />
                    ))}
                </Tags>
            )}
        </div>
    );
}

function Side() {
    return (
        <div>
            <Calendar />
        </div>
    );
}

function Tags({ children, variant = Variants.default }: { children: JSX.Element[]; variant?: Variants }) {
    return <div className={`flex flex-row gap-2 py-2 ${variant}`}>{children}</div>;
}

function Tag({ name, onClose }: { name: string; onClose?: () => void }) {
    return (
        <div className="py-1 px-2 flex gap-2 rounded-md bg-zinc-600 items-center text-sm">
            <h2>{name}</h2>
            <button onClick={onClose}>
                <X weight="bold" />
            </button>
        </div>
    );
}

function Bar({ children }: { children: JSX.Element }) {
    return <div className="flex flex-row justify-center items-center p-8">{children}</div>;
}

function Timeline({ items }: { items: Types.Item[] }) {
    // const lastItem = items[items.length - 1];
    // const restItems = items.slice(0, -1);

    function Orb({ children }: { children: JSX.Element }) {
        return (
            <div className="grid justify-center items-center rounded-full aspect-square bg-zinc-600">{children}</div>
        );
    }
    function Line() {
        return <div className="grid justify-center items-center w-full h-0.5 bg-zinc-600"></div>;
    }

    return (
        <div className="grid grid-flow-col items-center gap-2">
            {items.map((item, itemIndex) => (
                <React.Fragment key={itemIndex}>
                    <Orb>
                        <p>{item.name}</p>
                    </Orb>
                    {itemIndex !== items.length - 1 && <Line />}
                </React.Fragment>
            ))}
        </div>
    )
}

function App() {
    const [items, setItems] = useState<Types.Item[]>([]);
    const [selectedItem, setSelectedItem] = useState<Types.Item | null>(null);
    const [composeTitle, setComposeTitle] = useState("");
    const [composeDescription, setComposeDescription] = useState("");
    const [composeTags, setComposeTags] = useState<string[]>([]);
    const [showCompose, setShowCompose] = useState(false);
    const { refs, floatingStyles } = useFloating({
        middleware: [autoPlacement(), shift(), flip()],
    });

    const getTagsFromItems = (items: Types.Item[]) => {
        const tags = items.map((item) => item.tags).flat();
        const uniqueTags = [...new Set(tags)];
        return uniqueTags;
    };
    // const [tags, setTags] = useState(getTagsFromItems(items));

    const formSubmit = (e: any) => {
        e.preventDefault();
        if (!e.target.name.value) {
            return;
        }
        const newItem: Types.Item = {
            name: e.target.name?.value || "",
            tags: composeTags || [],
            description: e.target.description?.value || "",
        };
        setItems([...items, newItem]);
        setComposeTitle("");
        setComposeDescription("");
        setComposeTags([]);
    };

    const updateTags = (e: any) => {
        e.preventDefault();
        const tag = e.target.value;
        if (!tag) {
            return;
        }
        const lastChar = tag.slice(-1);
        const isComma = lastChar === ",";
        const isSpace = lastChar === " ";
        const alreadyExists = composeTags.includes(tag.slice(0, -1));

        if (isComma || isSpace) {
            if (!alreadyExists) {
                setComposeTags((tags) => [...tags, tag.slice(0, -1)]);
            }
            e.target.value = "";
        }
    };

    const removeTag = (index: number) => () => {
        const newTags = [...composeTags];
        newTags.splice(index, 1);
        setComposeTags(newTags);
    };

    return (
        <div>
            <Bar className="flex flex-row justify-between items-center p-2">
                <h1 className="text-4xl w-full text-center">Journey</h1>
                <button type="button" variant={Variants.circle} ref={refs.setReference}>
                    <Plus weight="bold" />
                </button>
            </Bar>
            {/* <Timeline items={items} /> */}
            <form onSubmit={formSubmit} className="flex flex-col gap-2 border border-zinc-700 rounded-md p-2">
                <div className="flex gap-2">
                    <input name="name" placeholder="Enter an item name..." />
                    <button type="submit" variant={Variants.circle}>
                        <Plus weight="bold" />
                    </button>
                </div>
                <Accordion title="More...">
                    <Input label="description" placeholder="Enter a description..." />
                    <Select label="status" name="status">
                        {Object.values(Status).map((status, statusIndex) => (
                            <option key={statusIndex} value={status}>
                                {status}
                            </option>
                        ))}
                    </Select>
                    <div>
                        <Label>Tags</Label>
                        <Tags>
                            {composeTags.map((tag, tagIndex) => (
                                <Tag key={tagIndex} name={tag} onClose={removeTag(tagIndex)} />
                            ))}
                            <Input name="tags" placeholder="Enter tags..." onChange={updateTags} />
                        </Tags>
                    </div>
                </Accordion>
            </form>
            <div className="flex flex-row">
                <Side />
                <div>
                    {items.map((item, itemIndex) => (
                        <Item key={itemIndex} {...item} />
                    ))}
                </div>
            </div>
        </div>
    );
}

enum Variants {
    default = "rounded-md bg-transparent",
    circle = "rounded-full border-2 border-zinc-600",
    outline = "border border-zinc-600",
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

export default App;
