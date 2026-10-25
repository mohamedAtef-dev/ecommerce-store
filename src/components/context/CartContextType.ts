import { createContext } from "react";
import type { ProductItem } from "../slideProduct/SlideProducts";

interface CartContextType {
    cartItems: ProductItem[];
    favorites: ProductItem[];
    addToCart: (item: ProductItem) => void;
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
    removeFromCart: (id: number) => void;
    removeFromFavorites: (id: number) => void;
    addToFavorites: (id: ProductItem) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined)
