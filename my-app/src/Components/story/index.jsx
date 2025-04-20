


import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faHandHoldingUsd, faTags } from "@fortawesome/free-solid-svg-icons";
import image from "../../Assests/Images/owl1.jpg";
import "./index.css";

export const Story = ({ showAll = false }) => {
    const [inView, setInView] = useState(false);
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);
    const cardRefs = useRef([]);


    // Load user from local storage
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) setUser(storedUser);
    }, []);

    // Fetch posts
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/posts");
                const data = await response.json();
                if (data.success) {
                    setPosts(data.data);
                }
            } catch (error) {
                console.error("Error fetching Posts:", error);
            }
        };

        fetchPosts();
    }, []);

    // Animate section title
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setInView(true);
                    }
                });
            },
            { threshold: 0.5 }
        );

        const section = document.querySelector(".story-content");
        if (section) observer.observe(section);

        return () => {
            if (section) observer.unobserve(section);
        };
    }, []);

    // Animate cards
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add("show");
                        }, index * 300);
                    }
                });
            },
            { threshold: 0.3 }
        );

        cardRefs.current.forEach((card) => {
            if (card) observer.observe(card);
        });

        return () => {
            cardRefs.current.forEach((card) => {
                if (card) observer.unobserve(card);
            });
        };
    }, [posts]);

    // return (
    //     <div className="story">
    //         <div className={`story-content ${inView ? "animate" : ""}`}>
    //             <p>Discover powerful stories</p>
    //             <h2>Latest Updates and <br /> Impactful Stories</h2>
    //             <div className="icon">
    //                 <div className="icon-thumb">
    //                     <span></span>
    //                     <span></span>
    //                 </div>
    //                 <FontAwesomeIcon icon={faHandHoldingUsd} />
    //                 <div className="icon-thumb">
    //                     <span></span>
    //                     <span></span>
    //                 </div>
    //             </div>
    //         </div>

    //         <div className="story-contents">
    //             {posts.slice(0, 3).map((post, index) => (
    //                 <div
    //                     key={post.id}
    //                     className="story-content-card"
    //                     ref={(el) => (cardRefs.current[index] = el)}
    //                 >
    //                     <div className="story-content-card-img">
    //                         <img
    //                             src={`http://localhost:8000/${post.image}`}
    //                             onError={(e) => (e.target.src = image)}
    //                             alt="Story"
    //                         />
    //                     </div>
    //                     <div className="story-content-card-content">
    //                         <div className="story-content-card-header">
    //                             <p>
    //                                 <span><FontAwesomeIcon icon={faTags} /></span>
    //                                 {post.affected_type?.title || "Education"}
    //                             </p>
    //                             <h2 className="date">
    //                                 {post.created_at?.slice(0, 10) || "N/A"}
    //                             </h2>
    //                         </div>
    //                         <div className="story-content-card-subcontent">
    //                             <h2>{post.title || "Untitled Post"}</h2>
    //                             <p className="border"></p>
    //                             <button>
    //                                 Read More <span><FontAwesomeIcon icon={faArrowRight} /></span>
    //                             </button>
    //                         </div>
    //                     </div>
    //                 </div>
    //             ))}
    //         </div>

    //         <div className="button" style={{ width: "200px", textAlign: "center", margin: "auto", marginTop: "180px" }}>
    //             <a href="/posts" style={{ marginLeft: "10px" }}>
    //                 <button>
    //                     Explore All <span style={{ marginLeft: "47px" }}><FontAwesomeIcon icon={faArrowRight} /></span>
    //                 </button>
    //             </a>
    //         </div>
    //     </div>
    // );

    return (
        <div className="story">
            <div className={`story-content ${inView ? "animate" : ""}`}>
                <p>Discover powerful stories</p>
                <h2>Latest Updates and <br /> Impactful Stories</h2>
                <div className="icon">
                    <div className="icon-thumb">
                        <span></span>
                        <span></span>
                    </div>
                    <FontAwesomeIcon icon={faHandHoldingUsd} />
                    <div className="icon-thumb">
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>

            <div className="story-contents">
                {(showAll ? posts : posts.slice(0, 3)).map((post, index) => (
                    <div
                        key={post.id}
                        className="story-content-card"
                        ref={(el) => (cardRefs.current[index] = el)}
                    >
                        <div className="story-content-card-img">
                            <img
                                src={`http://localhost:8000/${post.image}`}
                                onError={(e) => (e.target.src = image)}
                                alt="Story"
                            />
                        </div>
                        <div className="story-content-card-content">
                            <div className="story-content-card-header">
                                <p>
                                    <span><FontAwesomeIcon icon={faTags} /></span>
                                    {post.affected_type?.title || "Education"}
                                </p>
                                <h2 className="date">
                                    {post.created_at?.slice(0, 10) || "N/A"}
                                </h2>
                            </div>
                            <div className="story-content-card-subcontent">
                                <h2>{post.title || "Untitled Post"}</h2>
                                <p className="border"></p>
                                <button>
                                    Read More <span><FontAwesomeIcon icon={faArrowRight} /></span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Conditionally render Explore All button */}
            {!showAll && (
                <div className="button" style={{ width: "200px", textAlign: "center", margin: "auto", marginTop: "180px" }}>
                    <a href="/posts" style={{ marginLeft: "10px" }}>
                        <button>
                            Explore All <span ><FontAwesomeIcon icon={faArrowRight} /></span>
                        </button>
                    </a>
                </div>
            )}
        </div>
    );

};
