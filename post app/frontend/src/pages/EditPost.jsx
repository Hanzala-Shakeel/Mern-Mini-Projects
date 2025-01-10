import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const { postid } = useParams();
  const navigate = useNavigate("");
  const [postContent, setPostContent] = useState("");
  const [file, setFile] = useState(null);
  const [oldImage, setOldImage] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/home", { withCredentials: true }) // Include credentials with the request
      .then((res) => {
        if (res.status === 200) {
          getProductData();
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        navigate("/login");
      });
  }, []);

  function getProductData() {
    axios
      .get(`http://localhost:3000/post/findpost/${postid}`, {
        withCredentials: true,
      }) // Include credentials with the request
      .then((res) => {
        console.log("res", res);
        setPostContent(res.data.post.content);
        setOldImage(res.data.post.postImage);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let imageUrl = null;
    let image_public_id = null;
    if (postContent) {
      if (file) {
        const formData = new FormData();

        formData.append("file", file);

        await axios
          .post("http://localhost:3000/upload", formData, {
            withCredentials: true,
          })
          .then((res) => {
            // console.log(res.data.url);
            imageUrl = res.data.url;
            image_public_id = res.data.public_id;
            setFile(null);
          })
          .catch((err) => console.log(err));
      }

      axios
        .post(
          `http://localhost:3000/post/edit/${postid}`,
          {
            postContent,
            imageUrl,
            image_public_id,
          },
          { withCredentials: true }
        )
        .then((res) => {
          console.log("res", res);
          navigate("/");
        })
        .catch((err) => console.log("error", err));
    }
  }

  function logout() {
    axios
      .post("http://localhost:3000/user/logout", {}, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          navigate("/login"); // Redirect user to login page
        }
      })
      .catch((err) => console.error("Logout error:", err));
  }

  return (
    <div className="w-full h-screen bg-zinc-900 p-10 text-white">
      <div className="flex justify-end">
        <button
          onClick={logout}
          className="px-3 py-2 bg-red-500 rounded-md border-none outline-none mt-5 font-medium text-sm"
        >
          logout
        </button>
      </div>
      <p className="text-sm">edit your post.</p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <textarea
          onChange={(e) => setPostContent(e.target.value)}
          className="w-1/3 bg-transparent border-2 outline-none border-zinc-800 mt-5 p-3 resize-none rounded-md"
          placeholder="what's on your mind ?"
          value={postContent}
        ></textarea>
        {oldImage ? <img className="w-[200px] mt-5" src={oldImage}></img> : ""}
        <input
          className="mt-5 block"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button className="block px-3 py-2 bg-yellow-500 rounded-md border-none outline-none mt-3 font-medium text-sm">
          Edit Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;
