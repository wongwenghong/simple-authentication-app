import { useState } from "react";
import toast from "react-hot-toast";
import { useStateContext } from "../context/StateContext";

const useLogoutHook = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useStateContext();

  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users/logout", {
        method: "POST",
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
        throw new Error(data.error);
      }
      setAuthUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("time");
      toast.success(data.message);
    } catch (err) {
      console.log(err);
      toast.error(err.error);
    }
  };

  return { loading, logout };
};

export default useLogoutHook;
