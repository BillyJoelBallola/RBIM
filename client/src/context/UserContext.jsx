import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext({})

export const UserContextProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState(null)
  const [update, setUpdate] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    if(token === null || update === 'logged-in'){
      setToken(window.localStorage.getItem('rbim_token'))
    }
  }, [token, update])

  useEffect(() => {
    const getLoggedUser = async () => {
      try {
        const { data } = await axios.get(`/api/user_logged/${token}`);
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

    if(token !== null){
      if(loggedUser === null || update !== null){
        getLoggedUser()
      }
    }
  }, [update, loggedUser, token]);
  
  return(
    <UserContext.Provider value={{ loggedUser, setLoggedUser, setUpdate, setToken }}>
      {children}
    </UserContext.Provider>
  )
}