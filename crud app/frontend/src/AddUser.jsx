import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");

  const navigate = useNavigate("");

  function submitHandler(e) {
    e.preventDefault();
    axios
      .post("http://localhost:3000/post", {
        name,
        email,
        url,
      })
      .then(function (response) {
        console.log(response);
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="w-full h-screen bg-zinc-900 p-10">
      <Link to={"/"} className="text-blue-500 font-light text-sm">
        Read Users
      </Link>
      <h1 className="mt-5 text-2xl font-semibold text-white tracking-tighter">
        Create User
      </h1>
      <form
        className="flex gap-3 items-end mt-5"
        onSubmit={(e) => submitHandler(e)}
      >
        <input
          className="px-6 py-2 border-2 border-zinc-700 rounded-lg outline-none bg-zinc-900 text-zinc-400"
          type="text"
          placeholder="Enter name"
          required
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="px-6 py-2 border-2 border-zinc-700 rounded-lg outline-none bg-zinc-900 text-zinc-400"
          type="email"
          required
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="px-6 py-2 border-2 border-zinc-700 rounded-lg outline-none bg-zinc-900 text-zinc-400"
          type="text"
          required
          placeholder="Enter url"
          onChange={(e) => setUrl(e.target.value)}
        />
        <button className="px-5 py-2 bg-blue-500 text-white rounded-md font-medium">
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUser;
