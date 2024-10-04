import { useEffect, useState } from 'react';
import { Container, PostForm  } from '../components'; // Import Spinner component
import appwriteService from '../appwrite/config';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner'

function EditPost() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        }
        setLoading(false); // Stop loading after post is fetched
      });
    } else {
      navigate('/');
    }
  }, [slug, navigate]);

  return loading ? (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
      <Spinner size="lg" /> {/* Show spinner while loading */}
    </div>
  ) : post ? (
    <div className="flex w-full py-8 text-center rounded-lg shadow-md items-center justify-center min-h-screen bg-gray-200 p-6">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
