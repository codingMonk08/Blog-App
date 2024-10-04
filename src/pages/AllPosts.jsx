import { useState, useEffect } from 'react';
import { Container, PostCard } from '../components'; // Import Spinner component
import appwriteService from '../appwrite/config';
import Spinner from '../components/Spinner';

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
      setLoading(false); // Stop loading after posts are fetched
    });
  }, []);

  return (
    <div className="w-full py-8 text-center rounded-lg shadow-md">
      <Container>
        {loading ? (
          // Show spinner while loading
          <div className="w-full min-h-screen flex items-center justify-center">
            <Spinner size="lg" />
          </div>
        ) : (
          // Render posts once loaded
          <div className="flex flex-wrap gap-2 ">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 bg-gray-200  md:w-1/2 duration-300 rounded-lg  shadow-lg w-full sm:w-1/2 lg:w-1/4">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;
