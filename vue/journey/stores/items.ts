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
    getItemById(state: State, id: string): Item | undefined {
        return state.items.find((item: Item) => item.id === id);
    },
},
  actions: {
    addItem(item: Item) {
        this.items.push(item);
    },
  },
});