import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';
import Spinner from './components/Spinner'; // Assuming Spinner is a reusable component

function App() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false); // Dark mode state
  const dispatch = useDispatch();

  // Toggle dark mode by adding/removing the 'dark' class to the HTML element
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <Spinner size="lg" color="white" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex-wrap content-between bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200">
      <div className="w-full block">
        {/* Pass the toggleDarkMode function and darkMode state to the Header */}
        <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        <div className="px-4 py-6">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
