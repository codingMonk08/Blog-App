function Logo({ width = '100px' }) {
  return (
    <div
      style={{ width }}
      className="p-2 rounded-md shadow-sm bg-indigo-500 "
    >
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dev Blog</h1>
    </div>
  );
}

export default Logo;
