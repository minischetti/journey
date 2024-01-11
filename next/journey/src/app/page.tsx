"use client";
import { createContext, useContext, useState, useEffect } from "react";
import Calendar from "./Calendar";
import * as Types from "./types";
import { Command } from "cmdk";
import { ItemsContext, ItemsProvider } from "./context";

const Popup = ({ children }: { children: JSX.Element }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="bg-white rounded-md p-2">{children}</div>
        </div>
    );
}

const Accordion = ({ title, children }: { title: string, children: JSX.Element }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <div className="border border-gray-400 rounded-md">
      <div onClick={toggleAccordion} className="flex justify-between p-2 cursor-pointer">
        <h2>{title}</h2>
        <button>{isOpen ? "-" : "+"}</button>
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

function Input({ name, placeholder, onChange }: { name: string, placeholder: string, onChange: (e: any) => void }) {
    return (
        <input
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            className="border bg-zinc-800 border-zinc-700 focus:outline-zinc-800 outline-none rounded-md p-2 appearance-none"
        />
    );
}


function Item({ name, description, status, items, tags }: Types.Item) {
    return (
        <div className="border border-gray-400 rounded-md p-2">
            <h3>{name}</h3>
            <p>{description}</p>
            <p>{status}</p>
            {items && items.map((item, itemIndex) => <Item key={itemIndex} {...item} />)}
            {tags && tags.map((tag, tagIndex) => <span key={tagIndex}>{tag}</span>)}
        </div>
    );
}

// function List({ name, description, items }: List) {
//     return (
//         <div>
//             <h2>{name}</h2>
//             <p>{description}</p>
//             {items &&
//                 items.map((item, itemIndex) => (
//                     <Item key={itemIndex} name={item.name} description={item.description} status={item.status} items={item.items} tags={item.tags} />
//                 ))}
//         </div>
//     );
// }

function Side() {
    return (
        <div>
            <Calendar />
        </div>
    );
}

function App() {
    const [items, setItems] = useState<Types.Item[]>([]);
    const [showCommand, setShowCommand] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Types.Item | null>(null);
    const [composeTitle, setComposeTitle] = useState("");
    const [composeTags, setComposeTags] = useState<string[]>([]);


    const getTagsFromItems = (items: Types.Item[]) => {
        const tags = items.map((item) => item.tags).flat();
        const uniqueTags = [...new Set(tags)];
        return uniqueTags;
    }
    const [tags, setTags] = useState(getTagsFromItems(items));


    // When items change, update the tags
    useEffect(() => {
        setTags(getTagsFromItems(items));
    }, [items]);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setShowCommand((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const formSubmit = (e: any) => {
        e.preventDefault();
        const newItem: Types.Item = {
            name: e.target.name.value,
            tags: e.target.tags.value.split(","),
            // description: e.target.description.value,
        };
        setItems([...items, newItem]);
        setComposeTitle("");
        setComposeTags([]);
    };

    const removeList = (index: number) => {
        const newLists = [...items];
        newLists.splice(index, 1);
        setItems(newLists);
    };

    const updateTags = (e: any) => {
        e.preventDefault();
        const tag = e.target.value;
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
    }

    const removeTag = (index: number) => () => {
        const newTags = [...composeTags];
        newTags.splice(index, 1);
        setComposeTags(newTags);
    }

    const openItem = (item: Types.Item) => () => {
        setSelectedItem(item);
    }

    const closeItem = () => {
        setSelectedItem(null);
    }

    const ItemPopup = () => {
        return (
            <Popup>
                <div className="flex flex-col gap-2">
                    <h2>{selectedItem?.name}</h2>
                    <p>{selectedItem?.description}</p>
                    <p>{selectedItem?.status}</p>
                    {selectedItem?.items && selectedItem?.items.map((item, itemIndex) => <Item key={itemIndex} {...item} />)}
                    {selectedItem?.tags && selectedItem?.tags.map((tag, tagIndex) => <span key={tagIndex}>{tag}</span>)}
                    <button onClick={closeItem}>Close</button>
                </div>
            </Popup>
        );
    }

    if (selectedItem) {
        return <ItemPopup />;
    }

    return (
      <ItemsProvider>
        <div className="flex flex-row">
            <Side />
            {tags.map((tag, tagIndex) => (
                <Accordion key={tagIndex} title={tag}>
                    {items
                        .filter((item) => item.tags?.includes(tag))
                        .map((item, itemIndex) => (
                            <Item key={itemIndex} {...item} />
                        ))}
                </Accordion>
            ))}
            <div>
                <form onSubmit={formSubmit} className="flex gap-2">
                    <Input name="name" placeholder="Name" onChange={(e) => setComposeTitle(e.target.value)} />
                    <Input name="tags" placeholder="Tags" onChange={updateTags} />
                    {/* <Popup>
                        <div className="flex flex-col gap-2">
                            <h2>{composeTitle}</h2>
                            <p>{composeTags}</p>
                            <button onClick={closeItem}>Close</button>
                        </div>
                    </Popup> */}
                    {composeTags && composeTags.length && (
                        <div className="flex gap-2 p-2 rounded-md bg-zinc-800">
                            {composeTags.map((tag, tagIndex) => (
                                <span className="py-1 px-3 flex gap-1 rounded-md bg-zinc-600" key={tagIndex}>
                                    <span>{tag}</span>
                                    <span className="cursor-pointer" onClick={removeTag(tagIndex)}>x</span>
                                </span>
                            ))}
                        </div>
                    )}
                    <button type="submit">Create</button>
                </form>
                {items.map((item, itemIndex) => (
                    <Item key={itemIndex} {...item} />
                ))}
                <Command.Dialog open={showCommand} onOpenChange={setShowCommand} label="Global Command Menu">
                    <Command.Input />
                    <Command.List>
                        <Command.Empty>No results found.</Command.Empty>

                        <Command.Group heading="Letters">
                            <Command.Item>a</Command.Item>
                            <Command.Item>b</Command.Item>
                            <Command.Separator />
                            <Command.Item>c</Command.Item>
                        </Command.Group>
                        {/* Command item for adding an item */}
                        <Command.Item>Apple</Command.Item>
                    </Command.List>
                </Command.Dialog>
            </div>
        </div>
      </ItemsProvider>
    );
}

export default App;