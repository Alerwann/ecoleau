

import { useEffect, useState } from "react";
import { getAllUser } from "../services/userServices";

export const getAll = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers =async()=>{
    setLoading(true)

    try{
        const data = await getAllUser()
        setUsers (data.users);

    }
    catch(error){
        setError(error.message);

    }finally { setLoading(false)}
  };

useEffect(()=>{
    fetchUsers()
},[])

return {users, loading, error,refetch: fetchUsers }

}