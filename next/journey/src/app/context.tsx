import React, { createContext, useState } from 'react';
import * as Types from './types';

const ItemsContext = createContext<{
    items: Types.Item[];
    add: (item: Types.Item) => void;
    remove: (item: Types.Item) => void;
}>({
    items: [],
    add: () => {},
    remove: () => {},
});
const { Provider } = ItemsContext;

// Create provider for items
const ItemsProvider = ({ children }: { children: JSX.Element }) => {
    const [items, setItems] = useState<Types.Item[]>([]);

    const add = (item: Types.Item) => {
        setItems([...items, item]);
        console.log(items);
    }
    const remove = (item: Types.Item) => {
        setItems(items.filter((i) => i !== item));
        console.log(items);
    }

    const value = { items, add, remove };

    return <Provider value={value}>{children}</Provider>;
};

export { ItemsContext, ItemsProvider };