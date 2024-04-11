import { useState } from "react";
import useLoginHook from "../hooks/useLoginHook";
import Loader from "../components/LoaderComponent";

const LoginPage = () => {
  const [email, setEmail] = useState("admin@email.com");
  const [password, setPassword] = useState("123456");

  const { loading, login } = useLoginHook();

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-gradient-to-r from-black to-purple-600 w-full h-screen">
      <div className="h-full md:flex md:items-center">
        <div className="md:w-[50%] w-full h-full flex items-center justify-center">
          <form onSubmit={loginHandler} className="w-[400px]">
            <h3 className="font-bold text-5xl text-white px-4 mb-10 uppercase">
              Sign In
            </h3>
            <div className="mb-2 px-4">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-2 px-4 outline-none rounded-md"
              />
            </div>
            <div className="mb-2 px-4">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-2 px-4 outline-none rounded-md"
              />
            </div>
            <div className="px-4">
              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-purple-600 px-4 py-2 text-white text-center uppercase text-center w-full rounded-md hover:bg-purple-700"
              >
                <span>Sign In</span> <span>{loading && <Loader />}</span>
              </button>
            </div>
          </form>
        </div>
        <div className="w-[50%] hidden md:block"></div>
      </div>
    </div>
  );
};

export default LoginPage;
