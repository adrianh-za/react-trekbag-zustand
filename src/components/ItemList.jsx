import Select from "react-select";
import { useMemo, useState } from "react";
import { useItemsStore } from "../stores/itemsStore.js";

const sortingOptions = [
  {label: "Sort by default", value: "default"},
  {label: "Sort by packed", value: "packed"},
  {label: "Sort by unpacked", value: "unpacked"}
]

const ItemList = () => {

  const items = useItemsStore((state) => state.items);
  const removeItem = useItemsStore((state) => state.removeItem);
  const toggleItem = useItemsStore((state) => state.togglePackedItem);

  const [sortBy, setSortBy] = useState(sortingOptions[0].value);

  const sortedItems = useMemo(() => [...items].sort((a, b) => {
    if (sortBy === "unpacked") {
      return a.packed - b.packed;
    } else if (sortBy === "packed") {
      return b.packed - a.packed;
    } else {
      return a.id - b.id;
    }
  }), [items, sortBy]);

  return (
    <ul className="item-list">

      {/* Add an empty state view if not items present */}
      {
        sortedItems.length === 0 && <EmptyView/>
      }

      {/* Show sorting when 2 or more items shown */}
      {items.length > 1 && (
        <section className="sorting">
          <Select
            options={sortingOptions}
            defaultValue={sortingOptions[0]}
            onChange={(option) => setSortBy(option.value)}
          />
        </section>
      )}

      {/* Show sorted items */}
      {
        sortedItems.map(item => {
          return <Item
            key={item.id}
            item={item}
            onRemoveItem={removeItem}
            onToggleItemPacked={toggleItem}
          />
        })
      }
    </ul>
  )
}

export default ItemList;

const Item = ({item, onRemoveItem, onToggleItemPacked}) => {
  return (
    <li className="item">
      <label>
        <input
          onChange={() => {
            onToggleItemPacked(item.id)
          }}
          type={"checkbox"}
          checked={item.packed}/>
        {item.name}
      </label>
      <button onClick={() => {
        onRemoveItem(item.id)
      }}>❌
      </button>
    </li>
  )
}

const EmptyView = () => {
  return (
    <section className="empty-state">
      <h3>Empty Packing List</h3>
      <p>{"Start by adding some items you don't want to forget"}</p>
    </section>
  )
}