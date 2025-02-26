import axios from "axios";
import {createContext, useEffect, useState} from  "react";
import { Slide, toast } from "react-toastify";

export const CartContext = createContext();

export const CartContextProvider = ({children}) => {
    
    const [cart,setCart] = useState(null);
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
            console.log(response.data);
            setCartCount(response.data.count);
            setCart(response.data);

        }catch (err) {
           console.log(err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <CartContext.Provider value={{cartCount, setCartCount,cart, getCart,setCart}}>
            {children}
        </CartContext.Provider>
    )

}

export default CartContextProvider;