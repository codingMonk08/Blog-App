import { Link } from 'react-router-dom'; 
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import Logo from '../Logo';

function Footer() {
  return (
    <footer className="mx-4 mb-2 text-gray-700 dark:text-gray-300 rounded-lg">
      <div className="relative overflow-hidden py-12 border-gray-700 dark:border-gray-600">
        <div className="relative z-10 mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap">
            {/* Column 1 */}
            <div className="w-full p-6 md:w-1/2 lg:w-5/12">
              <div className="flex flex-col h-full justify-between">
                <div className="mb-4">
                  <Logo/>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    &copy; 2023 Dev Blog. All Rights Reserved.
                  </p>
                </div>
                <div className="flex space-x-4 mt-4">
                  <a href="#" className="text-gray-500 dark:text-gray-400 transition duration-300">
                    <FaFacebookF className="text-lg md:text-xl" />
                  </a>
                  <a href="#" className="text-gray-500 dark:text-gray-400 transition duration-300">
                    <FaTwitter className="text-lg md:text-xl" />
                  </a>
                  <a href="#" className="text-gray-500 dark:text-gray-400 transition duration-300">
                    <FaLinkedinIn className="text-lg md:text-xl" />
                  </a>
                  <a href="#" className="text-gray-500 dark:text-gray-400 transition duration-300">
                    <FaInstagram className="text-lg md:text-xl" />
                  </a>
                </div>
              </div>
            </div>
            {/* Column 2 */}
            <div className="w-full p-6 md:w-1/2 lg:w-2/12">
              <h3 className="mb-6 text-sm font-semibold uppercase text-gray-600 dark:text-gray-400">
                Company
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    className="text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-transform duration-300 transform hover:translate-x-2 hover:underline"
                    to="/features"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-transform duration-300 transform hover:translate-x-2 hover:underline"
                    to="/pricing"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-transform duration-300 transform hover:translate-x-2 hover:underline"
                    to="/affiliate"
                  >
                    Affiliate Program
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-transform duration-300 transform hover:translate-x-2 hover:underline"
                    to="/press-kit"
                  >
                    Press Kit
                  </Link>
                </li>
              </ul>
            </div>
            {/* Column 3 */}
            <div className="w-full p-6 md:w-1/2 lg:w-2/12">
              <h3 className="mb-6 text-sm font-semibold uppercase text-gray-600 dark:text-gray-400">
                Support
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    className="text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-transform duration-300 transform hover:translate-x-2 hover:underline"
                    to="/account"
                  >
                    Account
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-transform duration-300 transform hover:translate-x-2 hover:underline"
                    to="/help"
                  >
                    Help
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-transform duration-300 transform hover:translate-x-2 hover:underline"
                    to="/contact"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-transform duration-300 transform hover:translate-x-2 hover:underline"
                    to="/support"
                  >
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>
            {/* Column 4 */}
            <div className="w-full p-6 md:w-1/2 lg:w-3/12">
              <h3 className="mb-6 text-sm font-semibold uppercase text-gray-600 dark:text-gray-400">
                Legals
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    className="text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-transform duration-300 transform hover:translate-x-2 hover:underline"
                    to="/terms"
                  >
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-transform duration-300 transform hover:translate-x-2 hover:underline"
                    to="/privacy"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-transform duration-300 transform hover:translate-x-2 hover:underline"
                    to="/licensing"
                  >
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
