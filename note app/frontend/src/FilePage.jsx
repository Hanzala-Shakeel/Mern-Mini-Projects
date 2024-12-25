import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const FilePage = () => {
  const { filename } = useParams();
  const [fileData, setFileData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/filepage/${filename}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data.filename);
        console.log("Success:", data.data);
        setFileData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <>
      <div className="main w-full h-screen bg-zinc-900 text-white px-10 py-10">
        <Link className="text-blue-500 text-sm" to={`/`}>
          Go Back to Home
        </Link>
        <h1 className="mt-10 text-3xl font-medium">{fileData && fileData.filename}</h1>
        <p className="text-base font-sm text-md mt-5">{fileData && fileData.data}</p>
      </div>
    </>
  );
};

export default FilePage;
