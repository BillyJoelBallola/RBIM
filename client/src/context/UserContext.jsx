import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext({})

export const UserContextProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState(null)
  const [update, setUpdate] = useState(null)

  useEffect(() => {
    const getLoggedUser = async () => {
      try {
        const { data } = await axios.get("/api/user_logged");
        if(data.success){
          setLoggedUser(data.data);
        }else{
          setLoggedUser(null);
        }
      } catch (error) {
        console.error("Error fetching logged user:", error);
      } finally {
        setUpdate(null);
      }
    }

    if(loggedUser === null || update !== null){
      getLoggedUser()
    }
  }, [update, loggedUser]);

  return(
    <UserContext.Provider value={{ loggedUser, setLoggedUser, setUpdate }}>
      {children}
    </UserContext.Provider>
  )
}