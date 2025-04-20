import React,{useState,useEffect} from "react";
import axios from "axios";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './index.css';
import { faBell, faBars, faSearch, faUsers, faCog, faHandHoldingHeart, faTachometerAlt, faSignOutAlt, faCheckCircle, faTimesCircle, faComment, faComments, faSlidersH, faHouseDamage, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import image1 from "../../../Assests/Images/logo.jpeg";
import image2 from "../../../Assests/Images/man.png";


export const AffectedAreas = () => {
     const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
       const [user, setUser] = useState(null);
        const [users, setUsers] = useState({ totalUser: 0, totalVolunteer: 0 });
        const [landingcards, setLandingcards] = useState([]);

       
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

               const fetchLandingcards = async () => {
                     try {
                          const response = await axios.get("http://localhost:8000/api/landingcards");
                          if (response.data.success) {
                            setLandingcards(response.data.data);
                          }
                     } catch (error) {
                          console.error('Error fetching landing cards:', error);
                     }
                };

               fetchUsers();
                fetchLandingcards();
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
                        const response = await axios.delete(`http://localhost:8000/api/landingcards/${id}`);
                        if (response.data.success) {
                            setLandingcards(landingcards.filter((landingcard) => landingcard._id !== id));
                        }
                    } catch (error) {
                        console.error('Error deleting landing card:', error);
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
                        <a href="/be/affectedarea-create"  className="button">Add Affected Areas</a>
                        <div className="aid-control">
                            <h1>Affected Areas </h1>
                            <table>
                                <thead>
                                    <tr>
                                        <th>SL NO</th>
                                        <th>Affected Type</th>
                                        <th>Location</th>
                                        <th>Description</th>
                                        <th>Image</th>
                                        <th>Time</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {landingcards.map((landingcard, index) => (
                                        <tr key={landingcard._id}>
                                            <td>{index + 1}</td>
                                            <td>{landingcard.affectedtype?.title}</td>
                                            <td>{landingcard.title}</td>
                                            <td>{landingcard.description}</td>
                                            <td>
                                                <img src={`http://localhost:8000/${landingcard.image}`} alt="Landing Card"  style={{width:"100px",height:"100px"}}/>
                                            </td>
                                            <td>{moment(landingcard?.created_at).fromNow()}</td>
                                            <td>
                                                
                                                <button type="button" onClick={()=>deleteHandler(landingcard.id)}  style={{width:"50px",height:"50px",background:"#ffff",borderRadius:"50%",color:"black",marginRight:"10px"}}><FontAwesomeIcon icon={faTrashAlt} /></button>
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