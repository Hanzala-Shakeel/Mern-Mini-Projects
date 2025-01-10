import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/home", { withCredentials: true }) // Include credentials with the request
      .then((res) => {
        if (res.status === 200) navigate("/");
        else console.log(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  function submitHandler(e) {
    e.preventDefault();

    axios
      .post(
        "http://localhost:3000/user/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      ) // Include credentials with the request
      .then((res) => {
        if (res.status === 200) navigate("/");
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  return (
    <div className="w-full h-screen bg-zinc-900 p-7 text-white">
      <Link to={"/signup"} className="text-sm text-blue-500">
        Don't have an account?
      </Link>
      <h1 className="text-3xl font-medium tracking-tighter mt-5">Login</h1>
      <form onSubmit={(e) => submitHandler(e)} className="flex gap-3 mt-10">
        <input
          className="px-5 py-2 bg-transparent outline-none border-2 border-zinc-800 rounded-md"
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="px-5 py-2 bg-transparent outline-none border-2 border-zinc-800 rounded-md"
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="px-3 bg-blue-500 rounded-md font-semibold">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
