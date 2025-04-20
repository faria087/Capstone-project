import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faBars, faSearch, faUsers, faCog, faHandHoldingHeart, faTachometerAlt, faSignOutAlt, faCheckCircle, faTimesCircle, faComment, faComments, faSlidersH, faHouseDamage, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import image1 from "../../../Assests/Images/logo.jpeg";
import image2 from "../../../Assests/Images/man.png";

import "./index.css";

export const AffectedAreaCreatePage = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState({ totalUser: 0, totalVolunteer: 0 });
    const [landingcards, setLandingcards] = useState([]);

    const navigate = useNavigate();
    const [title, setTitle] = React.useState('');
    const [affected_type, setAffected_Type] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [image, setImage] = React.useState();
    const [affectedtype_id, setAffectedTypeId] = React.useState('');
    const [affectedTypes, setAffectedTypes] = React.useState([]);


    const [latitude, setLatitude] = useState(23.8103); // Default: Dhaka
    const [longitude, setLongitude] = useState(90.4125);
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);



    useEffect(() => {
        const loadGoogleMapsScript = () => {
            if (!window.google) {
                const script = document.createElement("script");
                script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDuVOgr6Bct64L6ZpRwSjHoGQ5xQWIej-8`;
                script.async = true;
                script.defer = true;
                script.onload = initializeMap;
                document.body.appendChild(script);
            } else {
                initializeMap();
            }
        };

        const initializeMap = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const lat = position.coords.latitude;
                        const lng = position.coords.longitude;
                        setLatitude(lat);
                        setLongitude(lng);

                        if (map) {
                            map.setCenter({ lat, lng });
                            marker.setPosition({ lat, lng });
                        } else {
                            const newMap = new window.google.maps.Map(document.getElementById("map"), {
                                center: { lat, lng },
                                zoom: 15,
                            });

                            const newMarker = new window.google.maps.Marker({
                                position: { lat, lng },
                                map: newMap,
                                draggable: true,
                            });

                            newMarker.addListener("dragend", (event) => {
                                setLatitude(event.latLng.lat());
                                setLongitude(event.latLng.lng());
                            });

                            setMap(newMap);
                            setMarker(newMarker);
                        }
                    },
                    (error) => console.error("Error fetching location:", error)
                );
            }
        };

        loadGoogleMapsScript();
    }, []);



    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };
    useEffect(() => {
        // Fetch affected types from the API
        const fetchAffectedTypes = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/affectedtypes");
                if (response?.data?.success) {
                    setAffectedTypes(response?.data?.data);
                }
            } catch (error) {
                console.error("Error fetching affected types:", error);
            }
        };

        fetchAffectedTypes();
    }, []);

    const titleChangeHandeler = (e) => {
        setTitle(e.target.value);
    }

    const affectedtype_idChangeHandeler = (e) => {
        setAffectedTypeId(e.target.value);
    }

    const affectedtypeChangeHandeler = (e) => {
        setAffected_Type(e.target.value);
    }

    const descriptionChangeHandeler = (e) => {
        setDescription(e.target.value);
    }

    const imageChangeHandeler = (e) => {
        setImage(e.target.files[0]);
    }

    const latitudeChangeHandeler = (e) => {
        setLatitude(e.target.value);
    }

    const longitudeChangeHandeler = (e) => {
        setLongitude(e.target.value);
    }


    const submitHandeler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('affected_type', affected_type);
        formData.append('description', description);
        formData.append('image', image);
        formData.append('affectedtype_id', affectedtype_id);
        formData.append('latitude', latitude);
        formData.append('longitude', longitude);

        await axios.post('http://localhost:8000/api/landingcards', formData)
            .then((response) => {
                if (response?.data?.success) {
                    navigate(-1)
                }
            })
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

                        <div className="aid-control">
                            <h1>Affected Areas </h1>
                            <form action="" onSubmit={submitHandeler}>
                                <div className="form-group">
                                    <label htmlFor="title">Location</label>
                                    <input type="text" id="title" name="title" value={title} onChange={titleChangeHandeler} placeholder="Enter Location"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="affected_type">Affected Type</label>
                                    <select value={affectedtype_id} onChange={affectedtype_idChangeHandeler} style={{ width: "100%", height: "40px" }}>
                                        <option value="" disabled >
                                            Select an affected type
                                        </option>
                                        {affectedTypes.map((affectedType) => (
                                            <option key={affectedType.id} value={affectedType.id}>
                                                {affectedType.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <input type="text" value={description} onChange={descriptionChangeHandeler} placeholder="Enter Description"/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="latitude">Latitude</label>
                                    <input type="text" id="latitude" name="latitude" value={latitude} readOnly onChange={latitudeChangeHandeler}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="longitude">Longitude</label>
                                    <input type="text" id="longitude" name="longitude" value={longitude} readOnly onChange={longitudeChangeHandeler}/>
                                </div>
                                <div id="map" style={{ width: "100%", height: "400px", marginTop: "10px" }}></div>
                                <div className="form-group">
                                    <label htmlFor="image">Image</label>
                                    <input type="file" onChange={imageChangeHandeler} />
                                    {image && <img src={URL.createObjectURL(image)} alt="image" width={200} height={200} />}
                                </div>


                                <div className="form-group-btn">

                                    <button type="button" onClick={() => navigate(-1)}>Cancel</button>
                                    <button type="submit">Submit</button>
                                </div>
                            </form>
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