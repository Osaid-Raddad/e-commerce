import axios from "axios";
import {createContext, useEffect, useState} from  "react";
import { Slide, toast } from "react-toastify";

export const UserContext = createContext();

export const UserContextProvider = ({children}) => {
    
    
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
     useEffect(() => {
            getCart();
        }, []);
    
    const getUser = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('USER TOKEN');
            const response = await axios.get(`https://ecommerce-node4.onrender.com/user/profile`,
                {
                    headers: {
                        Authorization: `Tariq__${token}`
                    }
                }
            );

            setUser(response.data.user);

        }catch (err) {
           console.log(err);
           setUser(null)
        } finally {
            
        }
    }

    return (
        <UserContext.Provider value={{user}}>
            {children}
        </UserContext.Provider>
    )

}

export default UserContextProvider;