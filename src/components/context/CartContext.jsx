import axios from "axios";
import {createContext, useEffect, useState} from  "react";
import { Slide, toast } from "react-toastify";

export const CartContext = createContext();

export const CartContextProvider = ({children}) => {
    
    
    const [isLoading, setIsLoading] = useState(false);
    const [cartCount, setCartCount] = useState(0);
     useEffect(() => {
            getCart();
        }, []);
    
    const getCart = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('USER TOKEN');
            const response = await axios.get(`https://ecommerce-node4.onrender.com/cart`,
                {
                    headers: {
                        Authorization: `Tariq__${token}`
                    }
                }
            );
            //console.log(response);
            setCartCount(response.data.count);
        }catch (err) {
            setError(err.message);
            toast.error(err.response.data.message, {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <CartContext.Provider value={{cartCount, setCartCount}}>
            {children}
        </CartContext.Provider>
    )

}

export default CartContextProvider;