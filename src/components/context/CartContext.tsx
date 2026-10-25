import { useEffect, useState, type ReactNode } from "react"
import { type ProductItem } from "../slideProduct/SlideProducts";
import { CartContext} from "./CartContextType";

interface CartProviderProps {
    children: ReactNode;
}

export default function CartPorvider({children}: CartProviderProps) {
    // Favorites
        const [favorites, setFavorites] = useState<ProductItem[]>(() => {
        const savedFav = localStorage.getItem('FavoritesItems');
        return savedFav ? JSON.parse(savedFav) : []
    });

    const addToFavorites = (item: ProductItem) => {
        setFavorites((prev) => {
            if(prev.some((i) => i.id === item.id)) return prev;
            return [...prev, item]
        })
    }

    useEffect(() => {
        localStorage.setItem('FavoritesItems', JSON.stringify(favorites))
    }, [favorites])

    const removeFromFavorites = (id: number) => {
        setFavorites((prev) => prev.filter((i) => i.id !== id))
    }

    // Cart
    const [cartItems, setCartItems] = useState<ProductItem[]>(() => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : []
    });

    // increaseQuantity

    const increaseQuantity = (id: number) => {
        setCartItems(prevItem => prevItem.map(item => 
            item.id === id ? {...item, quantity: item.quantity + 1} : item
        ))
    }

    // decreaseQuantity
    const decreaseQuantity = (id: number) => {
        setCartItems(prevItem => prevItem.map(item => item.id === id && item.quantity > 1 ?
            {...item, quantity: item.quantity - 1} : item
        ))
    }
    // Remove From Cart
    const removeFromCart = (id: number) => {
        setCartItems(prevItem => prevItem.filter(item => item.id !== id))
    }



    const addToCart = (item: ProductItem) => {
        setCartItems((prevItem) => [...prevItem, {...item, quantity: 1}])
    }
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }, [cartItems])
    return (
        <CartContext.Provider value={{cartItems, addToCart, increaseQuantity, decreaseQuantity, removeFromCart, addToFavorites, favorites, removeFromFavorites}}>
            {children}
        </CartContext.Provider>
    )
}
