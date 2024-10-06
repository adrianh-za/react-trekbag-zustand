import Button from "./Button.jsx";
import { createRef, useEffect, useState } from "react";
import { useItemsStore } from "../stores/itemsStore.js";

const Sidebar = () => {
  const addItem = useItemsStore((state) => state.addItem);

  return (
    <div className="sidebar">
      <AddItemForm onAddItem={addItem}/>
      <ButtonGroup />
    </div>
  )
}

export default Sidebar;

const AddItemForm = ({onAddItem}) => {
  const [itemText, setItemText] = useState("");
  const inputRef = createRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = (event) => {

    event.preventDefault();

    if (!itemText) {
      alert("Please enter an item");
      inputRef.current.focus();
      return;
    }

    onAddItem(itemText);

    setItemText("");
    inputRef.current.focus();
  }

  const handleChange = (event) => {
    setItemText(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add an item</h2>
      <input
        ref={inputRef}
        type="text"
        value={itemText}
        onChange={handleChange}
      />
      <Button>Add to list</Button>
    </form>
  )
}

const ButtonGroup = () => {

  const setPackedAllItems = useItemsStore((state) => state.setPackedAllItems);
  const resetItems = useItemsStore((state) => state.resetItems);
  const removeAllItems = useItemsStore((state) => state.removeAllItems);

  const secondaryButtons = [
    {text: "Mark all as complete", action: () => setPackedAllItems(true)},
    {text: "Mark all as incomplete", action: () => setPackedAllItems(false)},
    {text: "Reset to initial", action: resetItems},
    {text: "Remove all items", action: removeAllItems}
  ];

  return (
    <section className="button-group">
      {secondaryButtons.map((button, index) => {
        return (
          <Button
            key={index}
            buttonType="secondary"
            onClick={button.action}>
            {button.text}
          </Button>
        )
      })}
    </section>
  )
}