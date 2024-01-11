import React, { createContext, useState } from 'react';
import * as Types from './types';

const ItemsContext = createContext<Types.Item[]>([]);
const { Provider } = ItemsContext;

// Create provider for items
const ItemsProvider = ({ children }: { children: JSX.Element }) => {
    const [items, setItems] = useState<Types.Item[]>([]);
    return <Provider value={items}>{children}</Provider>;
};

export { ItemsContext, ItemsProvider };