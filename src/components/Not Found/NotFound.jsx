// PageNotFound.js

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-100">404</h1>
      <p className="text-2xl text-gray-600 dark:text-gray-300 mt-4">Page Not Found</p>
      <a href="/" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600">
        Go Back Home
      </a>
    </div>
  );
};

export default PageNotFound;
