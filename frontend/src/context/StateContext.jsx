import { useContext, createContext, useState } from "react";

const StateContext = createContext();

export const useStateContext = () => {
  return useContext(StateContext);
};

const StateContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    localStorage.getItem("user") || null
  );

  return (
    <StateContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;
