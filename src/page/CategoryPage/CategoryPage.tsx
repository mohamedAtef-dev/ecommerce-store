import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "../../components/slideProduct/Product";
import './CategoryPage.css'
import SlideProductLoading from "../../components/slideProduct/SlideProductLoading";
import { type ProductItem } from "../../components/slideProduct/SlideProducts";
import PageTransition from "../../components/PageTransition";

function CategoryPage () {
    const {category} = useParams()
    
    const [categoryProducts, setCategoryProducts ]= useState<ProductItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://dummyjson.com/products/category/${category}`)
        .then((res) => res.json())
        .then((data) => {
            setCategoryProducts(data.products)
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false))
    }, [category])

    return (
        <PageTransition key={category}>
        <div className="category_products">


            {loading ? <SlideProductLoading key={category}/> :
            
            <div className="container">
                <div className="top_slide">
                    <h2>{category} : {categoryProducts.length}</h2>
                    <p>Lorem ipsum, dolor sit amet consectetur adip</p>
                </div>

                <div className="products">
                    {categoryProducts.map((item, index) => (
                        <Product item={item} key={index} />
                    ))}
                </div>
            </div>

            }
        </div>
        </PageTransition>
    )
}
export default CategoryPage;