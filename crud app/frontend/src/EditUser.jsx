import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");

  const navigate = useNavigate("");

  const { userid } = useParams();

  useEffect(() => {
    getEditUserData();
  }, []);

  function getEditUserData() {
    axios
      .get(`http://localhost:3000/getuser/${userid}`)
      .then(function (response) {
        console.log(response.data);

        const editUserData = response.data.user;

        setName(editUserData.name);
        setEmail(editUserData.email);
        setUrl(editUserData.url);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function submitHandler(e) {
    e.preventDefault();
    axios
      .post(`http://localhost:3000/edit/${userid}`, {
        name,
        email,
        url,
      })
      .then(function (response) {
        console.log(response.data);
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
        Edit User
      </h1>
      <form
        className="flex gap-3 items-end mt-5"
        onSubmit={(e) => submitHandler(e)}
      >
        <input
          className="px-6 py-2 border-2 border-zinc-700 rounded-lg outline-none bg-zinc-900 text-zinc-400"
          type="text"
          placeholder="Enter new name"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          className="px-6 py-2 border-2 border-zinc-700 rounded-lg outline-none bg-zinc-900 text-zinc-400"
          type="email"
          required
          placeholder="Enter new email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          className="px-6 py-2 border-2 border-zinc-700 rounded-lg outline-none bg-zinc-900 text-zinc-400"
          type="text"
          required
          placeholder="Enter new url"
          onChange={(e) => setUrl(e.target.value)}
          value={url}
        />
        <button className="px-5 py-2 bg-yellow-500 text-white rounded-md font-medium">
          Edit User
        </button>
      </form>
    </div>
  );
};

export default EditUser;
