import { useState } from "react";
import toast from "react-hot-toast";
import { useStateContext } from "../context/StateContext";

const useLoginHook = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useStateContext();

  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
        throw new Error(data.error);
      }
      localStorage.setItem("user", JSON.stringify(data));
      setAuthUser(data);
    } catch (err) {
      console.log(err);
      toast.error(err.error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLoginHook;
