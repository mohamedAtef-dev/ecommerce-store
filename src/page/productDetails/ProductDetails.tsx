import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SlidProducts, {type ProductItem} from '../../components/slideProduct/SlideProducts' 
import './productdetails.css'
import ProductLoad from "./ProductLoad";
import SlideProductLoading from "../../components/slideProduct/SlideProductLoading";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import PageTransition from "../../components/PageTransition";

function ProductDetails () {
    const {id} = useParams();

    const [product, setProduct] = useState<ProductItem | null>(null);
    const [loading, setLoading] = useState(true);

    const [relatedProducts, setRelatedProducts] = useState<ProductItem[]>([]);
    const [loadingRealtedProducts, setLoadingRealtedProducts] = useState(true);
    

    useEffect(() => {
        const fetchproduct = async () => {
            try{
                const res = await fetch(`https://dummyjson.com/products/${id}`)
                const data = await res.json()
                setProduct(data)
                setLoading(false)

            } catch (error) {
                console.log(error);
            } 
        }
        fetchproduct()
    }, [id])

    const category = product?.category;

    useEffect(() => {
        if (!category) return
        fetch(`https://dummyjson.com/products/category/${category}`)
        .then((res) => res.json())
        .then((data) => {
            setRelatedProducts(data.products);
        })
        .catch((error) => console.log(error))
        .finally(() => setLoadingRealtedProducts(false))
    }, [category])

    if (!product) return <p>Product Not Found</p>

    return(
        
        <PageTransition key={id}>
        <div>
        
        {loading ? (
        <ProductLoad />
        ): (
            
        <div className="item_details">
        <div className="container">

                <ProductImages product={product}/>
                <ProductInfo product={product}/>

        </div>
        </div>
        )}

        {loadingRealtedProducts ? (
            <SlideProductLoading />
        ): (
            <SlidProducts key={product.category} title={product.category.replace("-", " ")} data={relatedProducts} />
        ) }

        </div>
        </PageTransition>
    );
}
export default ProductDetails;