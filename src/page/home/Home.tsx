import { useEffect, useState } from "react";
import HeroSlider from "../../components/HeroSlider";
import SlidProducts, { type ProductItem } from "../../components/slideProduct/SlideProducts";
import '../home/home.css'
import SlideProductLoading from "../../components/slideProduct/SlideProductLoading";
import PageTransition from "../../components/PageTransition";

const categories = [
    "smartphones",
    "sports-accessories",
    "laptops",
    "tablets",
    "sunglasses",
    "mobile-accessories",
]

type ProductsState = Record<string, ProductItem[]>;
function Home() {
    const [products, setProducts] = useState<ProductsState>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchproducts = async () => {
            try {
                const results = await Promise.all(
                    categories.map(async(category) => {
                        const res = await fetch(`https://dummyjson.com/products/category/${category}`);
                        const data = await res.json();
                        return {[category] : data.products}
                    })
                )

                const productsData = Object.assign({}, ...results); //{...results}
                setProducts(productsData);
            } catch(error) {
                console.error("Error Fetching", error)
            } finally{
                setLoading(false);
            }
        }

        fetchproducts()
    }, [])

    return (
        <PageTransition>
        <div>
            <HeroSlider />

            {loading ? (
                categories.map((category) => (
                <SlideProductLoading key={category}/>
                ))
            ) : (
                categories.map((category) => (
                
                <SlidProducts key={category} data={products[category]} title={category.replace('-', ' ')}  />
            ))
            )}
        </div>
        </PageTransition>
    )
}
export default Home;