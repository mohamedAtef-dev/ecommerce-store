import Product from "./Product";
import './SlideProduct.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';

export interface ProductItem {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    images: string[];
    availabilityStatus: string;
    brand: string;
    stock: number;
    rating: number;
    description: string;
    category: string;
    quantity: number;
}

interface SlidProductsProps {
    title: string;
    data: ProductItem[];
}
function SlidProducts({data, title}: SlidProductsProps) {
    return (
        <div className="slide_products slide">
            <div className="container">
                <div className="top_slide">
                    <h2>{title}</h2>
                    <p>Lorem ipsum, dolor sit amet consectetur adip</p>
                </div>

    <Swiper slidesPerView={5} loop={true} autoplay={{ delay: 2500, disableOnInteraction: false}} 
    navigation={true} modules={[Autoplay, Navigation]} className="mySwiper">

        {data.map((item) => {
            return (

                <SwiperSlide key={item.id}><Product item={item}/></SwiperSlide>
            )
        })}

    </Swiper>
            </div>
        </div>
    );
}
export default SlidProducts;