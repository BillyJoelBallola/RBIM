import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext({})

export const UserContextProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState(null)
  const [update, setUpdate] = useState(null)

  useEffect(() => {
  if(loggedUser === null || update === null){
      const { data } = axios.get("/api/user_logged")
      setUpdate(null);
      return setLoggedUser(data);
    }
  }, [update]);

return(
    <UserContext.Provider value={{ loggedUser, setLoggedUser, setUpdate }}>
      {children}
    </UserContext.Provider>
  )
}