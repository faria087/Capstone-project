

import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake, faCommentDots, faTrophy, faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import './index.css';

const stats = [
    { icon: faHandshake, number: 300, text: 'Team Members' },
    { icon: faCommentDots, number: 300, text: "Client's Review" },
    { icon: faTrophy, number: 300, text: 'Winning Awards' },
    { icon: faFileInvoice, number: 300, text: 'Happy Clients' }
];

export const Land5 = () => {
    const [counts, setCounts] = useState(stats.map(() => 0));
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        let start = 0;
                        const end = stats[index].number;
                        const duration = 1500; // Animation duration in ms
                        const incrementTime = 20;
                        const step = Math.ceil(end / (duration / incrementTime));

                        const timer = setInterval(() => {
                            start += step;
                            if (start >= end) {
                                clearInterval(timer);
                                start = end;
                            }
                            setCounts((prev) => {
                                const newCounts = [...prev];
                                newCounts[index] = start;
                                return newCounts;
                            });
                        }, incrementTime);
                    }
                });
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            ref.current.childNodes.forEach((child, index) => {
                observer.observe(child);
            });
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div className="land5-content" >
            <div className="number-count" ref={ref}>
                {stats.map((stat, index) => (
                    <div className='number-card' key={index}>
                        <div className="number-card-icon">
                            <FontAwesomeIcon icon={stat.icon} />
                        </div>
                        <div className="number-card-content">
                            <h1>{counts[index]}+</h1>
                            <p>{stat.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
