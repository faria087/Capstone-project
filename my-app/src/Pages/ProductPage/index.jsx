import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import { Header } from "../../Components/Header";

import { ImageSlide2 } from "../../Components/imageslide2";
import { Footer } from "../../Components/footer";

// breadcrums images
import image from "../../Assests/Images/darkbread.jpg";
import image2 from "../../Assests/Images/line.png";
import image3 from "../../Assests/Images/sprade-light.png";
//bread-crums image end

export const Products = () => {

    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState({ totalUser: 0, totalVolunteer: 0 });


    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        }
    }

        , []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/users");
                const data = await response.json();
                if (data.success) {
                    setUsers({
                        totalUser: data.totalUser,
                        totalVolunteer: data.totalVolunteer
                    });
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }
        , []);
       







    useEffect(() => {   
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/products");
                const data = await response.json();
                if (data.success) {
                    setProducts(data.data);
                } else {
                    console.error("Failed to fetch products:", data.message);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }
        , []);




      
        






    return (
        <>
            <div className="training-center">
                <Header />

                <div className="breadcrums">
                    <div className="breadcrums-imgbx">
                        <img src={image} alt="" />
                    </div>
                    <div className="breadcrums-content">
                        <h1>Products</h1>
                    </div>

                    <div className="breadcrums-front-img">
                        <img src={image2} alt="" />
                    </div>

                    <div className="stiker">
                        <img src={image3} alt="" />
                    </div>

                    <div className="bread-crums-main-content">
                        <div className="sub-content">
                            <a href="">Home</a>
                            <span>/</span>
                            <a href="">Products</a>
                        </div>
                    </div>
                </div>

                <div className="t-centers">
                    {products.map((product) => (
                        <div className="t-center-card">
                            <div className="t-center-img-bx" style={{ height: "300px" }}>
                                <img src={`http://localhost:8000/${product.image}`} alt="" />
                            </div>
                            <div className="t-center-content">
                                <h2>{product.title}</h2>
                                <p>{product.description}</p>
                                <div className="border-line"></div>
                                <p>Price :<span>{product.price}</span>/=</p>
                            
                                <div className="products-btns">
                                <button type="button">
    <FontAwesomeIcon icon={faHeart} />
</button>

                                    <button><FontAwesomeIcon icon={faShoppingCart} /></button>
                                </div>  
                               
                                
                            </div>
                        </div>
                    ))}

                </div>

                <ImageSlide2 />
                <Footer />
            </div>
        </>
    );
};
