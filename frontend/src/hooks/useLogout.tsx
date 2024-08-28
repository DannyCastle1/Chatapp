import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";


const useLogout = () => {
    const [loading, setIsLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const logout = async() =>{
        setIsLoading(true);
        try {
            const res = await fetch('/api/auth/logout', {
                method: 'POST',
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error);
            
            setAuthUser(null);
        } catch (error: any) {
            toast(error.message)
        } finally {
            setIsLoading(false)
        }
    }
  return {loading, logout};
};

export default useLogout
