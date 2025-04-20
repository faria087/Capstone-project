import React, { useState, useEffect } from "react";
import './index.css';
import axios from "axios";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faBars, faSearch, faUsers, faCog, faHandHoldingHeart, faTachometerAlt, faSignOutAlt, faCheckCircle, faTimesCircle, faComment, faComments, faSlidersH, faHouseDamage, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import image from "../../../Assests/Images/logo.jpeg";
import image2 from "../../../Assests/Images/man.png";
import { Link } from "react-router-dom";

export const ProductList = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [user, setUser] = useState(null);
     const [users, setUsers] = useState({ totalUser: 0, totalVolunteer: 0 });
     const [products, setProducts] = useState([]);

    
        React.useEffect(() => {
            const fetchUsers = async () => {
                try {
                    const response = await axios.get("http://localhost:8000/api/users");
                    if (response.data.success) {
                        setUsers({
                            totalUser: response.data.totalUser,
                            totalVolunteer: response.data.totalVolunteer
                        });
                    }
                } catch (error) {
                    console.error('Error fetching users:', error);
                }
            };

            const fetchProducts = async () => {
                  try {
                       const response = await axios.get("http://localhost:8000/api/products");
                       if (response.data.success) {
                         setProducts(response.data.data);
                       }
                  } catch (error) {
                       console.error('Error fetching landing cards:', error);
                  }
             };

            fetchUsers();
             fetchProducts();
         }, []);

         const toggleSidebar = () => {
             setIsSidebarCollapsed(!isSidebarCollapsed);
         };

         
             useEffect(() => {
                 const storedUser = JSON.parse(localStorage.getItem("user"));
                 if (storedUser) {
                     setUser(storedUser);
                 }
             }, []);

             const deleteHandler = async(id) =>{
                await axios.delete(`http://localhost:8000/api/products/${id}`);
                const response = await axios.get("http://localhost:8000/api/products");
                if(response?.data?.success){
                    setProducts(response?.data?.data);
                }
            };
    return (
        <div className="admin">
        {/* Header */}
        <div className="admin-header">
            <div className="admin-header-img-bx">
                <img src={image} alt="Logo" />
                <h1 >RippleAid</h1>
                <span onClick={toggleSidebar} className="menu-icon">
                    <FontAwesomeIcon icon={faBars} />
                </span>
            </div>

            <div className="admin-header-serch-bx">
                <form action="">
                    <input type="text" placeholder="Search" />
                    <button><FontAwesomeIcon icon={faSearch} /></button>
                </form>
            </div>

            <div className="admin-header-user-bx">
                <div className="admin-header-icon">
                    <span><FontAwesomeIcon icon={faBell} /></span>
                </div>
                {user ? (
                    <img src={user.image ? `http://localhost:8000/${user.image}` : "/default-avatar.png"} alt="User" />
                ) : (
                    <img src={image2} alt="User" />
                )}

                <form action=""
                    onSubmit={async (e) => {
                        e.preventDefault();
                        try {
                            const token = localStorage.getItem("token");
                            const response = await axios.post(
                                "http://localhost:8000/api/logout",
                                {},
                                {
                                    headers: {
                                        Authorization: `Bearer ${token}`, // Token পাঠানো হচ্ছে
                                    },
                                }
                            );

                            if (response?.data?.message === "Successfully logged out") {
                                localStorage.removeItem("token");
                                localStorage.removeItem("user"); // User data ও রিমুভ করা হচ্ছে
                                window.location.href = "/login"; // Redirect
                            }
                        } catch (error) {
                            console.error("Error logging out:", error);
                        }
                    }}
                >
                    <button><FontAwesomeIcon icon={faSignOutAlt} /></button>
                </form>
            </div>
        </div>

        {/* Sidebar & Main Content */}
        <div className="admin-content">
            <div className={`admin-content-sidebar ${isSidebarCollapsed ? "collapsed" : ""}`}>




                <div className="admin-content-sidebar-item">
                    <span><FontAwesomeIcon icon={faTachometerAlt} /></span>
                    <a href="/be" className={!isSidebarCollapsed ? "show-text" : "hide-text"}>Dashboard</a>
                </div>
                <div className="admin-content-sidebar-item">
                    <span><FontAwesomeIcon icon={faSlidersH} /></span>
                    <a href="#" className={!isSidebarCollapsed ? "show-text" : "hide-text"}>Sliders</a>
                </div>
                <div className="admin-content-sidebar-item">
                    <span><FontAwesomeIcon icon={faHouseDamage} /></span>
                    <a href="/be/aids" className={!isSidebarCollapsed ? "show-text" : "hide-text"}>Aids</a>
                </div>
                <div className="admin-content-sidebar-item">
                    <span><FontAwesomeIcon icon={faHandHoldingHeart} /></span>
                    <a href="#" className={!isSidebarCollapsed ? "show-text" : "hide-text"}>Donations</a>
                </div>
                <div className="admin-content-sidebar-item">
                    <span><FontAwesomeIcon icon={faUsers} /></span>
                    <a href="#" className={!isSidebarCollapsed ? "show-text" : "hide-text"}>Volunteers</a>
                </div>
                <div className="admin-content-sidebar-item">
                    <span><FontAwesomeIcon icon={faUsers} /></span>
                    <a href="#" className={!isSidebarCollapsed ? "show-text" : "hide-text"}>Users</a>
                </div>
                <div className="admin-content-sidebar-item">
                    <span><FontAwesomeIcon icon={faComments} /></span>
                    <a href="/be/sms" className={!isSidebarCollapsed ? "show-text" : "hide-text"}>Massages</a>
                </div>
                <div className="admin-content-sidebar-item">
                    <span><FontAwesomeIcon icon={faCog} /></span>
                    <a href="#" className={!isSidebarCollapsed ? "show-text" : "hide-text"}>Settings</a>
                </div>
            </div>

            {/* Main Content */}
            <div className="admin-content-main">
                <a href="/be/products-create"  className="button">Add Product</a>
                <div className="aid-control">
                    <h1>Products </h1>
                    <table>
                        <thead>
                            <tr>
                                <th>SL NO</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Image</th>
                                <th>Time</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={product._id}>
                                    <td>{index + 1}</td>
                                    <td>{product.title}</td>
                                    <td>{product.description}</td>
                                    <td>{product.price} /=</td>
                                    <td>
                                        <img src={`http://localhost:8000/${product.image}`} alt="Landing Card"  style={{width:"100px",height:"100px"}}/>
                                    </td>
                                    <td>{moment(product?.created_at).fromNow()}</td>
                                    <td >
                                        <Link to={`/be/products-edit/${product.id}`} style={{background:"white",color:"black",width:"50px",height:"50px",padding:"15px",borderRadius:"50%",marginRight:"8px"}}><FontAwesomeIcon icon={faEdit} /></Link>
                                        <button style={{background:"white",color:"black",width:"50px",height:"50px",padding:"15px",borderRadius:"50%"}} type="button" onClick={()=>deleteHandler(product.id)} ><FontAwesomeIcon icon={faTrashAlt} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                </div>
            </div>
        </div>

        {/* Footer */}
        <div className="admin-footer">
            <p>2021 RippleAid &copy; Copyright</p>
        </div>
    </div>
    );
};
