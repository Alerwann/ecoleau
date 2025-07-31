import { createContext, useState, useEffect, useContext } from 'react';


const UserContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);






}