import { Container, LogoutBtn ,Logo } from '../index';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'Posts', slug: '/all-posts', active: authStatus },
    { name: 'Create Post', slug: '/add-post', active: authStatus },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Handler for logout with loading state
  const handleLogoutClick = async () => {
    setIsLoggingOut(true);
    try {
      // Call the logout logic here (handled inside LogoutBtn)
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Load dark mode state from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    }
  }, []);

  return (
    <header className="mx-4 rounded-lg text-sm font-semibold text-gray-600 dark:text-gray-300 py-4 shadow-lg dark:bg-gray-900 bg-white transition-colors duration-300">
      <Container>
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link to="/">
            <Logo width="100%" />

            </Link>
          </div>

          {/* Navigation Menu for larger screens */}
          <ul className="hidden md:flex space-x-6 items-center">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="px-4 py-2 text-gray-600 dark:text-gray-300 bg-transparent rounded-lg transition-transform duration-300 transform font-semibold text-base hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn isLoading={isLoggingOut} onClick={handleLogoutClick} />
              </li>
            )}
          </ul>

          {/* Dark Mode Toggle on the right side */}
          <div className="flex items-center space-x-6">
            <button
              onClick={toggleDarkMode}
              className="px-3 py-2 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg transition duration-300"
            >
              {darkMode ? "🌙" : "☀️"}
            </button>

            {/* Hamburger Menu Icon for mobile screens */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                aria-expanded={isMenuOpen}
                className="focus:outline-none"
              >
                <svg
                  className={`w-6 h-6 text-gray-600 dark:text-gray-300 transform transition-transform duration-300 ${
                    isMenuOpen ? 'rotate-45' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
                  />
                </svg>
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <ul className="flex flex-col space-y-2 items-center">
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <button
                        onClick={() => {
                          navigate(item.slug);
                          setIsMenuOpen(false);
                        }}
                        className="block w-full px-4 py-2 font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                      >
                        {item.name}
                      </button>
                    </li>
                  )
              )}
              {authStatus && (
                <li>
                  <LogoutBtn isLoading={isLoggingOut} onClick={handleLogoutClick} />
                </li>
              )}
            </ul>
          </div>
        )}
      </Container>
    </header>
  );
}

export default Header;
