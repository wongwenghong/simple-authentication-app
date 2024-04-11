import { IoMdLogOut } from "react-icons/io";
import useLogoutHook from "../hooks/useLogoutHook";
import Loader from "./LoaderComponent";
import lockSvg from "/lock.svg";

const NavbarComponent = () => {
  const { loading, logout } = useLogoutHook();

  const logoutHandler = async () => {
    try {
      await logout();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="fixed w-full h-[70px] bg-gradient-to-r from-purple-600 to-slate-300 text-white shadow-lg">
      <div className="md:w-[70%] w-full mx-auto px-4 h-full flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src={lockSvg} width={30} alt="logo" />
          <h3 className="font-bold text-xl">Simple Authentication System</h3>
        </div>
        <ul className="flex items-center gap-3">
          <li>
            <button
              onClick={() => logoutHandler()}
              className="flex items-center justify-center gap-2"
            >
              <span className="md:flex md:items-center md:gap-2">
                <IoMdLogOut className="text-xl" />{" "}
                <span className="hidden md:block">Logout</span>
              </span>
              <span>{loading && <Loader />}</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarComponent;
