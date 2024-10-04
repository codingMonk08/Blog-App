import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { AiOutlineEllipsis } from "react-icons/ai"; // Ellipsis icon for dropdown

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to handle dropdown visibility

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen); // Toggle the dropdown menu visibility
  };

  return post ? (
    <div className="py-8 px-4 flex flex-col gap-6 justify-center items-center rounded-lg shadow-md">
      {/* Image at the top */}
      <div className="w-full max-w-6xl relative">
        <img
          src={appwriteService.getFilePreview(post.featuredImage)}
          alt={post.title}
          className="w-full h-64 object-cover rounded-lg"
        />
        {/* Author's Edit and Delete Buttons Dropdown on Image */}
        {isAuthor && (
          <div className="absolute top-4 right-4">
            {/* Ellipsis Icon to toggle the dropdown */}
            <button
              className="text-gray-700 bg-white p-2 rounded-full focus:outline-none"
              onClick={toggleDropdown}
            >
              <AiOutlineEllipsis size={24} />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white  border rounded-lg shadow-lg z-10">
                <Link to={`/edit-post/${post.$id}`}>
                  <div className="px-4 py-2 hover:text-customBlue text-gray-700 hover:bg-gray-100 cursor-pointer">
                    Edit
                  </div>
                </Link>
                <div
                  onClick={deletePost}
                  className="px-4 py-2 hover:text-customBlue text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Delete
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content Card */}
      <div className="w-full max-w-6xl  bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-semibold mb-4 truncate max-w-full">
          {post.title}
        </h1>{" "}
        {/* Truncated title */}
        <div className="text-gray-600  mb-4 leading-relaxed break-words">
          {parse(post.content)} {/* Ensures content wraps properly */}
        </div>
      </div>
    </div>
  ) : (

      <p className="text-center text-gray-500 mt-8">Loading post...</p>
  );
}
