import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate("");
  const [currentUser, setCurrentUser] = useState("");
  const [postContent, setPostContent] = useState("");
  const [allPosts, setAllPosts] = useState(null);
  const fileInputRef = useRef(null); // useRef to clear the file input

  const [file, setFile] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/home", { withCredentials: true }) // Include credentials with the request
      .then((res) => {
        getAllPosts();
        if (res.status === 200) setCurrentUser(res.data.user);
        else navigate("/login");
      })
      .catch((err) => {
        navigate("/login");
      });
  }, []);

  function logout() {
    axios
      .post("http://localhost:3000/user/logout", {}, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) navigate("/login"); // Redirect user to login page
      })
      .catch((err) => console.log("err", err));
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
            fileInputRef.current.value = ""; // Clear the file input after upload
          })
          .catch((err) => console.log(err));
      }

      axios
        .post(
          "http://localhost:3000/post/create",
          {
            postContent,
            imageUrl,
            image_public_id,
          },
          { withCredentials: true }
        )
        .then((res) => {
          console.log("res", res);
          setPostContent("");
          getAllPosts();
        })
        .catch((err) => console.log("err", err));
    }
  }

  function getAllPosts() {
    axios
      .get("http://localhost:3000/post/posts", { withCredentials: true })
      .then((res) => {
        setAllPosts(res.data.posts);
      })
      .catch((err) => console.log("error", err));
  }

  function likePost(postId) {
    axios
      .post(
        `http://localhost:3000/post/like/${postId}`,
        {},
        { withCredentials: true }
      )
      .then((res) => {
        console.log("res", res);
        // Directly refetch all posts to get the updated like counts
        getAllPosts();
      })
      .catch((err) => console.log("err", err));
  }

  function deletePost(postid) {
    axios
      .delete(`http://localhost:3000/post/delete/${postid}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("res", res);
        // Directly refetch all posts to get the updated like counts
        getAllPosts();
      })
      .catch((err) => console.log("err", err));
  }

  return (
    <div className="w-full h-screen bg-zinc-900 p-10 text-white overflow-y-auto">
      <div className="flex justify-end">
        <button
          onClick={logout}
          className="px-3 py-2 bg-red-500 rounded-md border-none outline-none mt-5 font-medium text-sm"
        >
          logout
        </button>
      </div>
      <h1 className="text-zinc-200 text-3xl font-medium">
        <span className="font-light">Hello, </span>
        {currentUser.name}
        👋
      </h1>
      <p className="text-sm">you can create a new post.</p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <textarea
          onChange={(e) => setPostContent(e.target.value)}
          className="w-1/3 bg-transparent border-2 outline-none border-zinc-800 mt-5 p-3 resize-none rounded-md"
          placeholder="what's on your mind ?"
          value={postContent}
        ></textarea>
        <input
          className="mt-5 block"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          ref={fileInputRef} // Associate input with ref
        />
        <button className="block px-3 py-2 bg-blue-500 rounded-md border-none outline-none mt-3 font-medium text-sm">
          Create new Post
        </button>
      </form>
      {/* <p className=" text-zinc-400 mt-10">Your Posts.</p> */}
      <p className=" text-zinc-400 mt-10">
        {!allPosts || allPosts.length === 0 ? "No Posts." : "Your Posts."}
      </p>
      <div className="post-wrapper">
        {allPosts &&
          allPosts.map((post, i) => {
            return (
              <div
                key={i}
                className="post w-[400px] bg-zinc-800 p-5 mt-5 rounded-md"
              >
                <p className=" text-blue-500 text-sm">@{post.user.username}</p>
                {post.postImage ? (
                  <div className="w-full max-h-[150px] my-5 bg-zinc-900 rounded-md flex justify-center items-center overflow-hidden">
                    <img
                      className="w-[85%] h-full object-cover"
                      src={post.postImage}
                      alt="Post Image"
                    />
                  </div>
                ) : (
                  ""
                )}
                <p className="text-zinc-300 mt-3 text-sm">{post.content}</p>
                <div className="flex gap-5 mt-5">
                  <button
                    onClick={() => likePost(post._id)}
                    className="text-blue-500 text-sm"
                  >
                    {post.likes.indexOf(currentUser._id) !== -1
                      ? "Unlike"
                      : "Like"}
                    ({post.likes.length})
                  </button>
                  {currentUser._id === post.user._id ? (
                    <div className="flex items-center gap-5">
                      <Link
                        to={`/edit/${post._id}`}
                        className="text-zinc-500 text-sm"
                      >
                        Edit
                      </Link>
                      <button
                        className="text-red-500"
                        onClick={() => deletePost(post._id)}
                      >
                        Delete
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
