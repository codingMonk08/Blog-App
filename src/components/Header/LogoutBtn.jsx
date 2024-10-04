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
      className="inline-bock px-6 font-semibold text-base hover:text-customBlue py-2 rounded-md text-gray-700"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
