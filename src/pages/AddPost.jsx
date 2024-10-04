import { useState } from 'react';
import Spinner from '../components/Spinner'
import {  PostForm } from '../components';

function AddPost() {
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (postData) => {
    setLoading(true); // Set loading to true when form is being submitted
    try {
      // Assuming there's a method in appwriteService to add a post
      await appwriteService.addPost(postData);
      // Handle success (e.g., redirect or show success message)
    } catch (error) {
      console.error("Error adding post:", error);
      // Handle error (e.g., show error message)
    } finally {
      setLoading(false); // Stop loading after submission is complete
    }
  };

  return (
    <div className="flex w-full py-8  text-center rounded-lg shadow-md items-center justify-center min-h-screen bg-gray-200 p-6">
        {loading ? (
          // Show spinner while form is being submitted
          <div className="w-full min-h-screen flex items-center justify-center">
            <Spinner size="lg" />
          </div>
        ) : (
          // Render the form when not loading
          <PostForm onSubmit={handleSubmit} />
        )}
    </div>
  );
}

export default AddPost;
