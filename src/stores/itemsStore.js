import { create } from "zustand";
import { initialItems } from "../lib/constants.js";
import { persist } from "zustand/middleware";

const storeSelectors = (set) => ({

  //Data
  items: initialItems,

  //Remove all items from list
  removeAllItems: () => {
    set(() => ({items: []}));
  },

  //Reset items to initial state
  resetItems: () => {
    set(() => ({items: initialItems}));
  },

  //Set packed status for all items
  setPackedAllItems: (isPacked) => {
    set(state => {
      const updatedItems = state.items.map(item => {
        return {...item, packed: isPacked}
      });
      return {items: updatedItems};
    })
  },

  //Toggle packed status for a single item
  togglePackedItem: (id) => {
    set(state => {
      const updatedItems = state.items.map(item => {
        if (item.id === id) {
          return {...item, packed: !item.packed}
        }
        return item;
      });
      return {items: updatedItems};
    })
  },

  //Remove a single item from list
  removeItem: (id) => {
    set(state => {
      const updatedItems = state.items.filter(item => item.id !== id);
      return {items: updatedItems};
    })
  },

  //Add a new item to list
  addItem: (text) => {
    const newItem = {
      id: new Date().getTime(),
      name: text,
      packed: false
    };

    set(state => {
      const updatedItems = [...state.items, newItem];
      return {items: updatedItems};
    });
  }
});

//Persist options
const persistOptions = {
  name: "items-store"
};

export const useItemsStore = create(
  persist(storeSelectors, persistOptions)
);