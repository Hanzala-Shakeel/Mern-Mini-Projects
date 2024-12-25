import { Link } from "react-router-dom";

import { useState, useEffect } from "react";

import axios from "axios";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/allusers")
      .then(function (response) {
        console.log(response);
        setAllUsers(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  function handleDelete(id) {
    const updatedUser = allUsers.filter((user) => {
      return user._id !== id;
    });

    axios
      .delete(`http://localhost:3000/delete/${id}`)
      .then(function (response) {
        console.log(response);
        setAllUsers(updatedUser);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="w-full h-screen bg-zinc-900 p-10">
      <Link to={"/adduser"} className="text-blue-500 font-light text-sm">
        Create User
      </Link>
      <h1 className="mt-5 text-2xl font-semibold text-white tracking-tighter">
        All Users
      </h1>
      <div className="box-parent w-full flex flex-wrap gap-5">
        {allUsers && allUsers.length > 0 ? (
          allUsers.map((user, i) => {
            return (
              <div
                key={i}
                className="box w-72 bg-zinc-800 mt-5 rounded-md px-4 py-3"
              >
                <div className="img-box w-full h-[165px] bg-zinc-700 rounded-md overflow-hidden">
                  <img className="w-full" src={user.url} alt="" />
                </div>
                <h1 className="text-xl text-white tracking-tighter mt-2">
                  {user.name}
                </h1>
                <p className="text-zinc-500 text-sm">{user.email}</p>
                <div className="links flex justify-between mt-7">
                  <Link
                    to={`/edit/${user._id}`}
                    className="text-blue-500 text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="text-red-500 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <h1 className="text-zinc-500 mt-5">No Users</h1>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
