import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import type { ProductItem } from "../slideProduct/SlideProducts";

function SerachBox() {
    const [searchTerm, setsearchTerm] =useState("");

    const [suggestions, setSuggestions] = useState<ProductItem[]>([]);

    const navigate = useNavigate();

    const location = useLocation();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`)
        }
        setSuggestions([]);
    }

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (!searchTerm.trim()) {
                setSuggestions([]);
                return;
            }
            try {
                const res = await fetch(`https://dummyjson.com/products/search?q=${searchTerm}`)
                const data = await res.json();
                setSuggestions(data.products.slice(0, 5) || [])
            } catch (error) {
                console.error('Search Error :', error);
                setSuggestions([]);
            }
        }

        const debonuce = setTimeout(() => {
            fetchSuggestions()
        }, 300)
        return () => clearTimeout(debonuce);
    }, [searchTerm])

    useEffect(() => {
        queueMicrotask(() => {
            setSuggestions([]);
        })
    }, [location])

    return(
        <div className="serachBox_Container">
        <form onSubmit={handleSubmit} className="search_box">
        <input type="text" name="search" id="search" placeholder="Search For Products" autoComplete="off" onChange={(e) => setsearchTerm(e.target.value)}/>
        <button type="submit"><FaSearch /></button>
    </form>

    {suggestions.length > 0 && (
        <ul className="suggestions">
            {suggestions.map((item) => (
            <Link to={`/product/${item.id}`}> <li key={item.id}><img src={item.images[0]} alt="" /><span>{item.title}</span></li></Link>
            ))}
        </ul>
    )}
        </div>
    )
}
export default SerachBox;