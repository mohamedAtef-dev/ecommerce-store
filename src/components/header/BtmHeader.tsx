import { useEffect, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { PiSignInBold } from "react-icons/pi";
import { FaUserPlus } from "react-icons/fa6";

interface Category {
    slug: string;
    name: string;
    url: string;
}

const NavLinks = [
    {title: 'Home', link: '/'},
    {title: 'About', link: '/about'},
    {title: 'Accessories', link: '/accessories'},
    {title: 'Blog', link: '/blog'},
    {title: 'Contact', link: '/contact'},
]

function BtmHeader() {
    const location = useLocation()
    const [categories, setCategories] = useState<Category[]>([]);
    const [iscategoryOpen, setIsIscategoryOpen] = useState(false); 

    useEffect(() => {
        fetch('https://dummyjson.com/products/categories')
        .then(res => res.json())
        .then((data) => setCategories(data))
    }, [])

    return (
        <div className="btm_header">
            <div className="container">
                <nav className="nav">


                    <div className="category_nav">
                        <div className="category_btn" onClick={() => setIsIscategoryOpen(!iscategoryOpen)}>
                            <IoMdMenu />
                        <p>Browse Category</p>
                        <IoMdArrowDropdown />
                        </div>

                        <div className={`category_nav_list ${iscategoryOpen ? 'active' : ''}`}>
                            {categories.map((category) => (
                                <Link key={category.slug} to={`category/${category.slug}`} onClick={() => setIsIscategoryOpen(false)}>{category.name}</Link>
                            ))}
                        </div>
                    </div>

                    <div className="nav_links">
                        {NavLinks.map((item) => (
                            <li key={item.link} className={location.pathname === item.link ? 'active' : ''}><Link to={item.link}>{item.title}</Link></li>
                        ))}
                    </div>
                </nav>
                <div className="sign_regs_icon">
                    <Link to='/'><PiSignInBold /></Link>
                    <Link to='/'><FaUserPlus /></Link>
                </div>
            </div>
        </div>
    )
}
export default BtmHeader 