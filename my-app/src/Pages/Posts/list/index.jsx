import React,{useState,useEffect} from "react";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './index.css';
import { faBell, faBars, faSearch, faUsers, faCog, faHandHoldingHeart, faTachometerAlt, faSignOutAlt, faCheckCircle, faTimesCircle, faComment, faComments, faSlidersH, faHouseDamage, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import image1 from "../../../Assests/Images/logo.jpeg";
import image2 from "../../../Assests/Images/man.png";


export const PostList = () => {
     const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
       const [user, setUser] = useState(null);
        const [users, setUsers] = useState({ totalUser: 0, totalVolunteer: 0 });
        const [posts, setPosts] = useState([]);

       
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

               const fetchPosts = async () => {
                     try {
                          const response = await axios.get("http://localhost:8000/api/posts");
                          if (response.data.success) {
                                 setPosts(response.data.data);
                          }
                     } catch (error) {
                          console.error('Error fetching landing cards:', error);
                     }
                };

               fetchUsers();
                fetchPosts();
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
                    try {
                        const response = await axios.delete(`http://localhost:8000/api/posts/${id}`);
                        if (response.data.success) {
                            setPosts(posts.filter(post => post.id !== id)); // Remove the deleted post from the state
                            alert("Post deleted successfully!");
                        }
                    } catch (error) {
                        console.error('Error deleting Posts:', error);
                    }
                }
                




    return (
        <>
             <div className="admin">
                {/* Header */}
                <div className="admin-header">
                    <div className="admin-header-img-bx">
                        <img src={image1} alt="Logo" />
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
                        <a href="/be/posts-create"  className="button">Add Posts</a>
                        <div className="aid-control">
                            <h1>Posts </h1>
                            <table>
                                <thead>
                                    <tr>
                                        <th>SL NO</th>
                                        <th>Affected Type</th>
                                        <th>Title</th>
                                        <th>Content</th>
                                        <th>Image</th>
                                        <th>Time</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                    {
                                    posts.map((post, index) => (

                                        <tr key={post._id}>
                                            <td>{index + 1}</td>
                                            <td>{post.affected_type.title}</td>
                                            <td style={{width:"20%"}}>{post.title}</td>
                                            <td style={{width:"30%"}}>{post.content}</td>
                                            <td>
                                                <img src={`http://localhost:8000/${post.image}`} alt="post"  style={{width:"100px",height:"100px"}}/>
                                            </td>
                                            <td>{moment(post?.created_at).fromNow()}</td>
                                            <td>
                                                
                                                <button type="button" onClick={()=>deleteHandler(post.id)}  style={{width:"50px",height:"50px",background:"#ffff",borderRadius:"50%",color:"black",marginRight:"10px"}}><FontAwesomeIcon icon={faTrashAlt} /></button>
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
        </>
    );
};