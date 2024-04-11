import { useEffect, useState } from "react";
import NavbarComponent from "../components/NavbarComponent";
import { useStateContext } from "../context/StateContext";
import useLogoutHook from "../hooks/useLogoutHook";

const HomePage = () => {
  const [time, setTime] = useState(
    localStorage.getItem("time") ? JSON.parse(localStorage.getItem("time")) : 15
  );
  const { authUser } = useStateContext();

  const { logout } = useLogoutHook();

  // useEffect(() => {
  //   const timeout = setTimeout(async () => {
  //     await logout();
  //   }, 15000);

  //   return () => clearTimeout(timeout);
  // }, []);

  useEffect(() => {
    let interval;
    if (time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
        localStorage.setItem("time", JSON.stringify(time));
      }, 1000);
    } else {
      const executeLogout = async function () {
        await logout();
      };
      executeLogout();
    }

    return () => clearInterval(interval);
  }, [time]);

  return (
    <div>
      <NavbarComponent />
      <div className="h-screen pt-[70px]">
        <div className="md:w-[70%] w-[90%] mx-auto mt-[50px]">
          <h1 className="font-bold text-3xl mb-[100px]">
            Hi &#128075; {authUser?.name},
          </h1>
          <p className="text-xl font-semibold mb-3 text-purple-600">
            The Simple Authentication System |
          </p>
          <p className="mb-2">
            This is a plain web application with simple email authentication
            system. Users are required to sign in with their email and password
            in order to access the web functionalities.
          </p>
          <p className="mb-10">Backend: JWT Authentication</p>
          <p className="font-semibold">Automatic logged out in {time}s</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
