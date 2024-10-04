import appwriteService from "../appwrite/config.js";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  // Truncate the title to 16 characters followed by "..."
  const truncatedTitle = title.length > 16 ? `${title.substring(0, 16)}...` : title;

  return (
    <div className="w-full h-96 rounded-xl p-4 flex flex-col justify-between">
      <div className="w-full h-2/3 mb-4">
        {/* Image with hover effect */}
        <img
          src={appwriteService.getFilePreview(featuredImage)}
          alt={title}
          className="rounded-lg w-full h-48 object-cover"
        />
      </div>

      {/* Truncated Title */}
      <h2 className="text-xl font-bold mb-4 text-gray-700">
        {truncatedTitle}
      </h2>

      {/* Links for View Full Post and additional Link */}
      <div className="flex flex-col items-center">
        <Link
          to={`/post/${$id}`}
          className="w-full text-white bg-customBlue hover:bg-violet-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          View Full Post
        </Link>

      </div>
    </div>
  );
}

export default PostCard;
