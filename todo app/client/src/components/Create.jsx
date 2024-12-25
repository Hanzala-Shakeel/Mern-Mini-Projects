import React from "react";
import axios from "axios";

const Create = () => {
  const [todo, setTodo] = React.useState("");
  
    const handleUpload = async () => {
    todo !== ""
      ? axios
          .post("https://mern-stack-todo-app-six.vercel.app/add", {
            todo: todo,
          })
          .then((res) => {
            setTodo("");
            console.log(res.data);
          })
          .catch((err) => console.log(err))
      : alert("plz add todo");
  };

  return (
    <div>
      <label>Add todos</label>
      <input
        type="text"
        placeholder="Enter todo"
        onChange={(e) => setTodo(e.target.value)}
        value={todo}
      />
      <button onClick={handleUpload}>Add todo</button>
    </div>
  );
};

export default Create;
