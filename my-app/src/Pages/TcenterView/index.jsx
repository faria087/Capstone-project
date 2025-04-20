import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./index.css";
import { Header } from "../../Components/Header";
import { ImageSlide2 } from "../../Components/imageslide2";
import { Footer } from "../../Components/footer";

// breadcrums images
import image from "../../Assests/Images/darkbread.jpg";
import image2 from "../../Assests/Images/line.png";
import image3 from "../../Assests/Images/sprade-light.png";
//bread-crums image end

export const TcenterView = () => {
    const { id } = useParams();
    const [tcenter, setTcenter] = useState(null);
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState(null);

    const [logs, setLogs] = useState([]);
    const [activeLog, setActiveLog] = useState(null);


    useEffect(() => {
        if (user && tcenter) {
            axios.get(`http://localhost:8000/api/volunteer/logs/${user.id}/${tcenter.id}`)
                .then(res => {
                    if (res.data.success) {
                        setLogs(res.data.data);
                        const openLog = res.data.data.find(log => !log.clock_out);
                        setActiveLog(openLog || null);
                    }
                }).catch(err => console.error(err));
        }
    }, [user, tcenter]);

    const handleClockIn = async () => {
        try {
            const res = await axios.post('http://localhost:8000/api/volunteer/clock-in', {
                user_id: user.id,
                tcenter_id: tcenter.id
            });
            if (res.data.success) {
                setActiveLog(res.data.data);
                setLogs(prev => [res.data.data, ...prev]);
            }
        } catch (err) {
            console.error(err);
        }
    };


    const handleClockOut = async () => {
        try {
            const res = await axios.post('http://localhost:8000/api/volunteer/clock-out', {
                user_id: user.id,
                tcenter_id: tcenter.id
            });
            if (res.data.success) {
                const updatedLog = res.data.data;
                setLogs(prev =>
                    prev.map(log =>
                        log.id === updatedLog.id ? updatedLog : log
                    )
                );
                setActiveLog(null);
            }
        } catch (err) {
            console.error(err);
        }
    };


    useEffect(() => {
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

        fetchUsers();
    }, []);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    useEffect(() => {
        const fetchTcenter = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/tcenters/${id}`);
                const data = await response.json();
                if (data.success) {
                    setTcenter(data.data);
                } else {
                    console.error("Failed to fetch center:", data.message);
                }
            } catch (error) {
                console.error("Error fetching center:", error);
            }
        };

        fetchTcenter();
    }, [id]);

    if (!tcenter) return <div>Loading...</div>;

    return (
        <>
            <div className="t-center-view">
                <Header />

                <div className="breadcrums">
                    <div className="breadcrums-imgbx">
                        <img src={image} alt="" />
                    </div>
                    <div className="breadcrums-content">
                        <h1>Training Center</h1>
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
                            <a href="">Training Center</a>
                        </div>
                    </div>
                </div>

                <div className="t-center-view-content">
                    <div className="t-center-view-content-left">
                        <h1>Training Center Info</h1>
                        <img src={`http://localhost:8000/${tcenter.image}`} alt="" />
                        <h2>{tcenter.title}</h2>
                        <p>Location : {tcenter.location}</p>
                        <p>{tcenter.description}</p>
                        <p>Center Type : <span>{tcenter.center_type}</span></p>
                        <div className="border-line"></div>
                        <h3>Opening Time : <span>{tcenter.opening_hours}</span></h3>
                        <h3>Closing Time : <span>{tcenter.closing_hours}</span></h3>
                    </div>
                    <div className="t-center-view-content-right">
                        <h1>Join As a Volunteer</h1>
                        <div className="tenter-rigt-card">


                            {user && (
                                <div className="profile-card">
                                    <div className="profile-img-wrapper">
                                        <div className="profile-img-bg">
                                            <img src={`http://localhost:8000/${user.image}`} alt="Profile" />
                                        </div>
                                        <h1>{user.name}</h1>
                                    </div>

                                    {activeLog ? (
                                        <button className="clock-out-btn" onClick={handleClockOut}>
                                            Clock Out
                                        </button>
                                    ) : (
                                        <button className="clock-in-btn" onClick={handleClockIn}>
                                            Clock In
                                        </button>
                                    )}
                                </div>
                            )}

                        </div>

                        {logs.length > 0 && (
                            <div className="volunteer-logs">
                                <h2>Attendance Log</h2>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Clock In</th>
                                            <th>Clock Out</th>
                                            <th>Total Time (minutes)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {logs.map(log => (
                                            <tr key={log.id}>
                                                <td>{new Date(log.clock_in).toLocaleString()}</td>
                                                <td>{log.clock_out ? new Date(log.clock_out).toLocaleString() : '—'}</td>
                                                <td>{log.total_hours ?? '—'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                    </div>
                </div>
                <ImageSlide2 />
                <Footer />
            </div>
        </>
    );
};