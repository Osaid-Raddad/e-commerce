import axios from "axios";
import {createContext, useEffect, useState} from  "react";


export const UserContext = createContext();

export const UserContextProvider = ({children}) => {
    
    
    
    const [user, setUser] = useState(null);
     useEffect(() => {
            getUser();
        }, []);
    
    const getUser = async () => {
        const token = localStorage.getItem('USER TOKEN');
        try {
           
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
        }
    }

    return (
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )

}

export default UserContextProvider;