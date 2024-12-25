import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const Edit = () => {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");

  const { editfilename } = useParams();

  const Navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/edit/${editfilename}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data.editfilename);
        console.log("Success:", data.data);
        setTitle(data.editfilename);
        setDetail(data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  function submitHandler(e) {
    e.preventDefault(); // Prevent default form submission behavior

    // Your fetch API call or logic here
    fetch(`http://localhost:3000/edit/${editfilename}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setTitle("");
        Navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div className="main w-full h-screen bg-zinc-900 flex items-center flex-col">
      <h1 className="max-[600px]:text-xl text-white text-2xl font-bold mt-5">Edit File Name</h1>
      <form
        onSubmit={(e) => submitHandler(e)}
        className="flex gap-5 items-center mx-5 flex-col mt-10 w-full"
      >
        <input
          placeholder="Enter New title"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
          className="max-[600px]:w-[80%] max-[600px]:py-3 max-[600px]:text-sm border-none outline-none w-[50%] px-5 py-3 rounded-md  bg-zinc-800 text-gray-200"
        />
        <textarea
          placeholder="Enter file data"
          onChange={(e) => setDetail(e.target.value)}
          value={detail}
          required
          readOnly
          className="max-[600px]:w-[80%] max-[600px]:py-3 max-[600px]:text-sm border-none outline-none  w-[50%] px-5 py-3 rounded-md bg-zinc-800 text-gray-200 resize-none"
        ></textarea>
        <button className="px-4 py-3 mt-5 font-medium bg-yellow-500 rounded-md text-white">
          Edit File
        </button>
      </form>
    </div>
  );
};

export default Edit;
