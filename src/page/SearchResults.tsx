import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import SlideProductLoading from "../components/slideProduct/SlideProductLoading";
import Product from "../components/slideProduct/Product";
import type { ProductItem } from "../components/slideProduct/SlideProducts";

function SearchResults() {
    const [results , setResults] = useState<ProductItem[]>([]);

    const query = new URLSearchParams(useLocation().search).get('query');

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const res = await fetch(`https://dummyjson.com/products/search?q=${query}`)
                const data = await res.json();
                setResults(data.products || []);
            }
            catch (error) {
                console.error('Search Error :', error);
            } finally {
                setLoading(false);
            }
        }
        if(query) fetchResults();
    }, [query])


    return (
        <PageTransition key={query}>
        <div className="category_products">
            
            {loading ? (<SlideProductLoading key={query}/>) : 
                results.length > 0 ? (
            <div className="container">
                <div className="top_slide">
                    <h2>Result For : {query}</h2>
                </div>

                <div className="products">
                    {results.map((item, index) => (
                        <Product item={item} key={index} />
                    ))}
                </div>
            </div>
                )

            : <div className="container"><p>No Results Found.</p></div>}

        </div>
        </PageTransition>
    )
}
export default SearchResults;