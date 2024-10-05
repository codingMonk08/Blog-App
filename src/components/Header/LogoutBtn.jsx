import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <button
      className="inline-bock px-6 font-semibold text-base hover:bg-gray-100 dark:hover:bg-gray-700  dark:text-white py-2 rounded-md"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
