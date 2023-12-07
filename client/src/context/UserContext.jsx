import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext({})

export const UserContextProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState(null)
  const [update, setUpdate] = useState(null)

  const settingUserLogged = async () => {
    if(loggedUser === null || update !== null){
      const { data } = await axios.get("/api/user_logged")
      if(!data) return; 
      setUpdate(null);
      setLoggedUser(data);
    }
  }

  useEffect(() => {
    settingUserLogged()
  }, [update]);

  return(
    <UserContext.Provider value={{ loggedUser, setLoggedUser, setUpdate }}>
      {children}
    </UserContext.Provider>
  )
}