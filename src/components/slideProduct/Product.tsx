import { FaStar, FaCartArrowDown, FaRegHeart, FaShare  } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import {type ProductItem } from "./SlideProducts";
import { useContext } from "react";
import { CartContext } from "../context/CartContextType";
import { FaCheck } from "react-icons/fa";
import toast from "react-hot-toast";

interface ProductProps {
    item: ProductItem;
}

function Product ({item}: ProductProps) {
    const navigate = useNavigate()
    const {cartItems, addToCart, addToFavorites, favorites, removeFromFavorites} = useContext(CartContext)!;

    const isInCart = cartItems.some(i => i.id === item.id);
    
    // Cart 
    const handleAddToCart = () => {
        addToCart(item)

        // appears to pop
        toast.success(
            <div className="toast-wraper">
                <img src={item.images[0]} alt="" className="toast-img"/>

                    <div className="toast-content">
                        <strong>{item.title}</strong>
                        added to cart
                        <div>
                            <button className="btn" onClick={() => navigate('/cart') }>View Cart</button>
                        </div>
                    </div>
                </div>
                ,{duration: 3500}
        )
    }

    //Favorites
    const isInFav = favorites.some(i => i.id === item.id);

    const handleAddToFav = () => {
        if (isInFav) {
            removeFromFavorites(item.id);
            toast.error(`${item.title} Remove From Favorites`)
        } else {
            addToFavorites(item);
            toast.success(`${item.title} added To Favorites`);
        }
    }

    return (
            <div className={`product ${isInCart ? 'in-cart' : ''}`}>
                <Link to={`/product/${item.id}`}>

                <span className="status_cart"><FaCheck />in cart</span>
            <div className="img_product">
                    <img src={item.images[0]} alt="" />
                </div>
                <p className="name_product">
                {item.title}
                </p>
                <div className="stars">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaRegStarHalfStroke />
                </div>
                <p className="price"><span>${item.price}</span></p>
                </Link>
                <div className="icons">
                    <span className="btn_addcart"><FaCartArrowDown onClick={handleAddToCart} /></span>
                    <span className={`${isInFav ? 'in-fav' : ''}`} onClick={handleAddToFav}><FaRegHeart /></span>
                    <span><FaShare /></span>
                </div>
            </div>

    );
}
export default Product;