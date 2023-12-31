import { defineStore } from "pinia";

export const useItemsStore = defineStore({
  id: "items",
  state: () => {
    return {
        items: [] as Item[],
    };
  },
getters: {
    getItems(state): Item[] {
        return state.items;
    },

    getItemsCount(state): number {
        return state.items.length;
    },

    getItemById(state) {
        return (id: string) => {
            return state.items.find((item) => item.id === id);
        };
    },

    getItem(state) {
        return (index: number) => {
            return state.items[index];
        };
    },

},
  actions: {
    addItem(item: Item) {
        this.items.push(item);
    },
    removeItem(id: string) {
        this.items = this.items.filter((item) => item.id !== id);
    }
  },
});