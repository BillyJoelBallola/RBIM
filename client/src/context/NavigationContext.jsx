import { createContext, useState } from "react";

export const NavigationContext = createContext({});

export const NavigationContextProvider = ({ children }) => {
  const [isNavigateOpen, setIsNavigateOpen] = useState(true);
  
  const toggleNav = () => {
    setIsNavigateOpen(current => !current);
  }

  return (
    <NavigationContext.Provider value={{ isNavigateOpen, setIsNavigateOpen, toggleNav }}>
      {children}
    </NavigationContext.Provider>
  )
}