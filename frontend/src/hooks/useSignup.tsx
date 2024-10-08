import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

type SignupInputs = {
    fullName: string;
    username: string;
    password: string;
    confirmPassword: string;
    gender: string;
};
const useSignup = () => {
    const [loading, setIsLoading] = useState(false);
    const {setAuthUser} = useAuthContext();
    const signup = async(inputs: SignupInputs) =>{
        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs),
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error);
            setAuthUser(data);
        } catch (error: any) {
            toast(error.message);
            console.error(error.message);
            
        } finally {
            setIsLoading(false)
        }
    }
  return {loading, signup}
}

export default useSignup
