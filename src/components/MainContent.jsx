import { useState, useEffect } from "react";
import CheckListItem from "./CheckListItem.jsx";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import toDoList from "./toDoList.jsx";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function MainContent() {
  const [toDoState, setToDoState] = useState([]);
  const [message, setMessage] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [editInputValue, setEditInputValue] = useState("");
  const [isPencilClicked, setIsPencilClicked] = useState(false);
  const [toDoId, setToDoId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/todos`);
      const data = await response.json();
      setToDoState(data.todos);
    };

    fetchData();
  }, [toDoState]);
  const addItem = async () => {
    const newItem = {
      id: toDoState.length + 1,
      text: inputValue,
      completed: false,
    };
    setInputValue("");
    // Make a POST request to your API endpoint.
    const response = await fetch(`${import.meta.env.VITE_API_URL}/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    });

    if (!response.ok) {
      // There was an error with the API call.
      console.error("Error while adding item: ", response.statusText);
      return;
    }

    // Update local state only if item is added successfully on the server.
    const tempArray = [...toDoState, newItem];

    setToDoState(tempArray);
  };

  const updateItem = async (id) => {
    // Find the item in the state.
    let itemToUpdate = toDoState.find((item) => item.id === id);

    // Update the item's text.
    console.log("inputValue :>> ", inputValue);
    itemToUpdate.text = editInputValue;
    console.log("isPencilClicked :>> ", isPencilClicked);
    setIsPencilClicked(!isPencilClicked);
    // Make a PUT request to your API endpoint.
    const response = await fetch(`${import.meta.env.VITE_API_URL}/edit/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemToUpdate),
    });

    if (!response.ok) {
      // There was an error with the API call.
      console.error("Error while updating item: ", response.statusText);
      return;
    }

    // Update local state only if the item is updated successfully on the server.
    const tempArray = toDoState.map((item) =>
      item.id === id ? itemToUpdate : item
    );

    setToDoState(tempArray);
    console.log("isPencilClicked :>> ", isPencilClicked);
  };

  const handlePencilClick = (id, text) => {
    setEditInputValue(text);
    setIsPencilClicked(true);
    setToDoId(id);
  };

  const handleRemoveToDoItem = async (id) => {
    // Make a DELETE request to your API endpoint.
    setIsPencilClicked(!isPencilClicked);
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/delete/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      // There was an error with the API call.
      console.error("Error while deleting item: ", response.statusText);
      return;
    }

    // Update local state only if the item is deleted successfully on the server.
    const updatedList = toDoState.filter((item) => item.id !== id);

    console.log(updatedList);

    setToDoState(updatedList);
  };

  const mappedCheckList = toDoState.map((item) => (
    <>
      {isPencilClicked && toDoId === item.id ? (
        <>
          <Stack spacing={2} direction="row">
            <Input
              onChange={(e) => setEditInputValue(e.target.value)}
              placeholder="Edit Item"
              value={editInputValue}
            />
            <Button onClick={() => updateItem(item.id)} variant="contained">
              Update
            </Button>
            <Button
              onClick={() => setIsPencilClicked(false)}
              variant="contained"
            >
              Cancel
            </Button>
          </Stack>
        </>
      ) : (
        <>
          <FormControlLabel
            control={
              <>
                <Checkbox
                  checked={item.completed}
                  onChange={() => handleCheckBoxClick(item.id)}
                />
                <EditIcon
                  onClick={() => handlePencilClick(item.id, item.text)}
                />
                <DeleteForeverIcon
                  onClick={() => handleRemoveToDoItem(item.id)}
                />
              </>
            }
            label={item.text}
          />
        </>
      )}
    </>
  ));
  return (
    <>
      {" "}
      <section className="paper">
        <h1>Things I Need To Do:</h1>
        {toDoState ? mappedCheckList : null}
        <Stack spacing={2} direction="row">
          <Input
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add Item"
            value={inputValue}
          />
          <Button onClick={() => addItem()} variant="contained">
            Add Item
          </Button>
        </Stack>
      </section>
    </>
  );
}

export default MainContent;
