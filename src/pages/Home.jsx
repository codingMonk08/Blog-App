import { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { PostCard } from "../components";
import Spinner from "../components/Spinner";
import Container from "../components/container/Container";
import { useNavigate } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await appwriteService.getPosts();
        if (response) {
          setPosts(response.documents);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Failed to load posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  

 

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-8 mt-4 text-center bg-gradient-to-r from-red-500 via-red-600 to-red-700 rounded-lg shadow-md dark:from-red-800 dark:via-red-900 dark:to-red-900">
        <Container>
          <div className="flex flex-col items-center p-4">
            <h1 className="text-2xl font-bold text-white mb-4">{error}</h1>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-red-600 to-red-800 dark:from-red-900 dark:to-red-900 text-white px-6 py-2 rounded-full hover:from-red-700 hover:to-red-900 transition-transform duration-300 transform hover:scale-105"
            >
              Retry
            </button>
          </div>
        </Container>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center rounded-lg shadow-md dark:bg-gray-900">
        <Container>
          <div className="flex flex-col items-center p-4">
            <h1 className="text-black dark:text-white p-2 mb-2 text-2xl font-serif rounded-lg">
              Express Your Passion Freely. Build a Beautiful, Personalized Blog with Ease and Share Your Journey with the World.
            </h1>
            <button
              onClick={() => navigate("/signup")}
              className="text-2xl font-bold mb-4 hover:bg-gray-100 dark:hover:bg-gray-700  dark:text-white  shadow-md px-6 py-2  rounded-md hover:underline"
            >
              Create your blog
            </button>

          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="container w-full py-8 mt-4 text-center rounded-lg shadow-md dark:bg-gray-900">
      <Container>
      
        <div className="flex flex-wrap gap-2">
          {posts.map((post) => (
            <div
              key={post.$id}
              className="bg-white dark:bg-gray-800 p-4 w-full md:w-1/2 lg:w-1/4 duration-300 rounded-lg shadow-lg"
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
