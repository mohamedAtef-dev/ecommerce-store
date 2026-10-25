import { FaRegHeart, FaRegStarHalfStroke, FaShare, FaStar } from "react-icons/fa6";
import { TiShoppingCart } from "react-icons/ti";
import { type ProductItem } from "../../components/slideProduct/SlideProducts";
import { useContext } from "react";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../components/context/CartContextType";

interface ProductImagesProps {
    product: ProductItem;
}

function ProductInfo({product}: ProductImagesProps) {
    const {cartItems, addToCart, addToFavorites, favorites, removeFromFavorites} = useContext(CartContext)!;

    const isInCart = cartItems.some(i => i.id === product.id);

    const navigate = useNavigate()

    const handleAddToCart = () => {
        addToCart(product)

        // appears to pop
        toast.success(
            <div className="toast-wraper">
                <img src={product.images[0]} alt="" className="toast-img"/>

                    <div className="toast-content">
                        <strong>{product.title}</strong>
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
    const isInFav = favorites.some(i => i.id === product.id);

    const handleAddToFav = () => {
        if (isInFav) {
            removeFromFavorites(product.id);
            toast.error(`${product.title} Remove From Favorites`)
        } else {
            addToFavorites(product);
            toast.success(`${product.title} added To Favorites`);
        }
    }



    return (
        <div className="details_item">
                    <h1 className="name">{product.title}</h1>
                <div className="stars">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaRegStarHalfStroke />
                </div>
                <p className="price">${product.price}</p>
                <h5>Availability: <span>{product.availabilityStatus}</span></h5>
                <h5>Brand: <span>{product.brand}</span></h5>
                <p className="desc">{product.description}</p>
                <h5 className="stock">
                    {product.stock <= 0 ? (<span className="out-of-stock">Out Of stock</span>) : product.stock <= 5 ? ( <span className="low-stock">Hurry Up! Only{product.stock} products left in stock.</span>) : (<span className="in-stock">In stock</span>)}
                </h5>
                
                <button onClick={handleAddToCart} className={`btn ${isInCart ? 'in-cart' : ''}`}>
                    {isInCart ? 'item in cart' : 'Add to card '}<TiShoppingCart />
                </button>

                <div className="icons">
                    <span className={`${isInFav ? 'in-fav' : ''}`} onClick={handleAddToFav}><FaRegHeart /></span>
                    <span><FaShare /></span>
                </div>
                
                </div>
    )
}
export default ProductInfo