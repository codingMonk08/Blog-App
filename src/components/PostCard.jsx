import appwriteService from "../appwrite/config.js";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  // Truncate the title to 16 characters followed by "..."
  const truncatedTitle = title.length > 16 ? `${title.substring(0, 16)}...` : title;

  return (
    <div className="w-full h-96 rounded-xl p-4 flex flex-col justify-between bg-white dark:bg-gray-800 ">
      <div className="w-full h-2/3 mb-4">
        {/* Image with hover effect */}
        <img
          src={appwriteService.getFilePreview(featuredImage)}
          alt={title}
          className="rounded-lg w-full h-48 object-cover"
        />
      </div>

      {/* Truncated Title */}
      <h2 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-200">
        {truncatedTitle}
      </h2>

      {/* Links for View Full Post and additional Link */}
      <div className="flex flex-col items-center">
        <Link
          to={`/post/${$id}`}
          className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}

export default PostCard;
