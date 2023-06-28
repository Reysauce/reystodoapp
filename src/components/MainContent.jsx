import { useState } from "react";
import CheckListItem from "./CheckListItem.jsx";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import toDoList from "./toDoList.jsx";
function MainContent() {
  const [toDoState, setToDoState] = useState(toDoList);
  const handleCheckboxClick = (id) => {
    const newToDoList = toDoState.map((item) => {
      if (item.id === id) {
        item.completed = !item.completed;
      }
      return item;
    });
    setToDoState(newToDoList);
  };

  const mappedChecklist = toDoState.map((item) => (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            id={item.id}
            text={item.text}
            checked={item.completed}
            onChange={() => handleCheckboxClick(item.id)}
          />
        }
        label={item.text}
      />
    </FormGroup>
  ));
  return <>{mappedChecklist}</>;
}

export default MainContent;
