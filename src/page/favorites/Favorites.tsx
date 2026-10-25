import { useContext } from "react";
import { CartContext } from "../../components/context/CartContextType";
import PageTransition from "../../components/PageTransition";
import Product from "../../components/slideProduct/Product";

function Favorites () {
    const {favorites} = useContext(CartContext)!;
    return(
        <PageTransition>
            <div className="category_product FavoritesPage">
                <div className="container">
                    <div className="top_slide">
                        <h2>Your Favoreties</h2>
                    </div>

                    {favorites.length === 0 ? (
                        <p>No Favorites Products yet.</p>
                    ): (
                        <div className="products">
                            {favorites.map(item => (
                                <Product item={item} key={item.id} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </PageTransition>
    )
}
export default Favorites;