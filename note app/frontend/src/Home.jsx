import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [files, setFiles] = useState(null);

  function getFiles() {
    fetch("http://localhost:3000/get")
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data.files);
        setFiles(data.files);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    getFiles();
  }, []);

  function submitHandler(e) {
    e.preventDefault(); // Prevent default form submission behavior

    // Your fetch API call or logic here
    fetch("http://localhost:3000/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        detail: detail,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        getFiles();
        setTitle("");
        setDetail("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function deleteFile(id) {
    const deletename = files[id];

    fetch("http://localhost:3000/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json", // Ensure headers are set
      },
      body: JSON.stringify({ filename: deletename }), // Send the file name in the body
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    const updatedFiles =
      files &&
      files.filter((file, i) => {
        return i !== id;
      });
    setFiles(updatedFiles);
  }

  return (
    <div className="main w-full h-screen bg-zinc-900 flex items-center flex-col">
      <h1 className="max-[600px]:text-xl text-white text-2xl font-bold mt-5">
        Add File
      </h1>
      <form
        onSubmit={(e) => submitHandler(e)}
        className="flex gap-5 items-center mx-5 flex-col mt-10 w-full"
      >
        <input
          placeholder="Enter title"
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
          className="max-[600px]:w-[80%] max-[600px]:py-3 max-[600px]:text-sm border-none outline-none  w-[50%] px-5 py-3 rounded-md bg-zinc-800 text-gray-200 resize-none"
        ></textarea>
        <button className="max-[600px]:text-sm max-[600px]:font-semibold px-4 py-3 mt-5 font-medium bg-blue-500 rounded-md text-white">
          Add File
        </button>
      </form>
      <div className="file-container max-[820px]:overflow-y-scroll max-[820px]:mb-5 max-[600px]:gap-5 w-full flex justify-center flex-wrap gap-10 mt-10 px-10 text-white">
        {files ? (
          files.map((v, i) => {
            return (
              <div
                key={i}
                className="file max-[600px]:overflow-hidden bg-zinc-800 px-5 py-5 rounded-md w-[350px]"
              >
                <h1 className="max-[600px]:text-xl font-semibold text-2xl mb-5 overflow-hidden whitespace-nowrap text-ellipsis">
                  {v}
                </h1>
                <div className="flex justify-between">
                  <Link
                    className="max-[600px]:text-sm text-blue-500"
                    to={`/filepage/${v}`}
                  >
                    Read More...
                  </Link>
                  <Link
                    className="max-[600px]:text-sm text-blue-500"
                    to={`/edit/${v}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="max-[600px]:text-sm text-red-500"
                    onClick={() => deleteFile(i)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <h2>no files</h2>
        )}
      </div>
    </div>
  );
};

export default Home;
