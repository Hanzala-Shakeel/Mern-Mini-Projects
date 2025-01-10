import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate("");

  function submitHandler(e) {
    e.preventDefault();

    axios
      .post(
        "http://localhost:3000/user/create",
        {
          name,
          username,
          email,
          password,
          age,
        },
        { withCredentials: true }
      ) // Include credentials with the request
      .then((res) => {
        if (res.status === 201) navigate("/");
      })
      .catch((err) => console.log("err", err));
  }

  return (
    <div className="w-full h-screen bg-zinc-900 p-7 text-white">
      <Link to={"/login"} className="text-sm text-blue-500">
        Already have an account?
      </Link>
      <h1 className="text-3xl font-medium tracking-tighter mt-5">Signup</h1>
      <form onSubmit={(e) => submitHandler(e)} className="flex gap-3 mt-10">
        <input
          className="px-5 py-2 bg-transparent outline-none border-2 border-zinc-800 rounded-md"
          type="text"
          placeholder="Enter name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="px-5 py-2 bg-transparent outline-none border-2 border-zinc-800 rounded-md"
          type="text"
          placeholder="Enter username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="px-5 py-2 bg-transparent outline-none border-2 border-zinc-800 rounded-md"
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="px-5 py-2 bg-transparent outline-none border-2 border-zinc-800 rounded-md"
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          className="px-5 py-2 bg-transparent outline-none border-2 border-zinc-800 rounded-md"
          type="number"
          placeholder="Enter Age"
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <button className="px-3 bg-blue-500 rounded-md font-semibold">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
