import { Link } from "react-router-dom";
 import Logo from '../../img/logo2.jpg'
import { FaRegHeart } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import './header.css'
import { useContext } from "react";
import { CartContext } from "../context/CartContextType";
import SerachBox from "./SearchBox";

function TopHeader () {
    const {cartItems, favorites} = useContext(CartContext)!
    
    return (
<div className="top_header">
<div className="container">
    <Link className="logo" to='/'><img src={Logo} alt="Logo1" /></Link> 

        <SerachBox />
    <div className="header-icons">
    <div className="icon">
        <Link to='/favorites'>
            <FaRegHeart />
            <span className="count">
                {favorites.length}
            </span>
        </Link>
    </div>
    <div className="icon">
        <Link to='/cart'>
            <TiShoppingCart />
            <span className="count">
                {cartItems.length}
            </span>
        </Link>
    </div>
    </div>
</div>
</div>
    )
}
export default TopHeader;