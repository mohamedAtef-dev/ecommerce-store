
import { type ProductItem } from "../../components/slideProduct/SlideProducts";

interface ProductImagesProps {
    product: ProductItem;
}
function ProductImages({product}: ProductImagesProps) {
    return(
                        <div className="imgs_item">

                    <div className="big_img">
                        <img id="big_img" src={product.images[0]} alt={product.title} />
                    </div>
                    <div className="small_img">
                        {product.images.map((img, index) => (
                        <div className="img_div_small" key={index}>
                        <img src={img} alt={product.title} 
                        onClick={() => {
                        const bigImg = document.getElementById("big_img") as HTMLImageElement | null;
                        if (bigImg) {
                            bigImg.src = img;
                        }
                        }}/>
                        </div>
                        ))}
                    </div>

                </div>
    );
}
export default ProductImages;