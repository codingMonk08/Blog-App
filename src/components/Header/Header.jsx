import { Container, LogoutBtn } from '../index';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false); // New state for logout loading

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
    setIsLoggingOut(true); // Start loading
    try {
      // Call the logout logic here (handled inside LogoutBtn)
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      setIsLoggingOut(false); // Stop loading after logout
    }
  };

  return (
    <header className="mx-4 rounded-lg  text-sm font-semibold  text-gray-600 dark:text-gray-300 py-4 shadow-lg dark:bg-gray-800">
      <Container>
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link to="/">
              <h1 className="text-3xl font-bold tracking-wide font-serif text-gray-600 dark:text-white">Dev Blog</h1>
            </Link>
          </div>

          {/* Navigation Menu for larger screens */}
          <ul className="hidden md:flex  space-x-6 items-center">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="px-4 py-2 text-gray-600 dark:text-gray-300 bg-transparent rounded-lg transition-transform duration-300 transform hover:text-customBlue dark:hover:text-customBlue font-semibold text-base hover:underline"
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

          {/* Hamburger Menu Icon for mobile screens */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="focus:outline-none"
            >
              <svg
                className={`w-6 h-6 text-gray-600  dark:text-gray-300 transform transition-transform duration-300 ${
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
                        className="block w-full px-4 py-2 font-semibold text-gray-600 dark:text-gray-300 hover:underline rounded-md"
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
