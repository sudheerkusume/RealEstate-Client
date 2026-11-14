import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../config/api";

const MarqueeSection = () => {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        api.get("/companies")
            .then(res => {
                setCompanies(res.data);
            })
            .catch(err => console.error("Error fetching companies for marquee:", err));
    }, []);

    // Fallback items if API is empty or fails
    const defaultItems = [
        { name: "Prestige Group", logo: "/companies-icons/prestigegroup.png", _id: "prestige-group" },
        { name: "Lodha", logo: "/companies-icons/lodha.jpg", _id: "lodha-group" },
        { name: "Brigade", logo: "/companies-icons/brigade.jpeg", _id: "brigade-group" },
    ];

    const displayItems = companies.length > 0 ? companies : defaultItems;

    return (
        <section className="marquee-wrapper py-5">
            <div className="container text-center mb-5">
                <h6 className="text-muted text-uppercase letter-spacing-2">COMPANIES</h6>
                <h2 className="fw-bold display-6">Our Top Recruiters</h2>
            </div>
            <div className="marquee">
                <div className="marquee-track">
                    {[...displayItems, ...displayItems].map((item, index) => (
                        <Link
                            to={`/companies/${item._id}`}
                            className="marquee-card"
                            key={index}
                            style={{ textDecoration: 'none' }}
                        >
                            <img
                                src={item.logo && item.logo.startsWith('http') ? item.logo : `${api.defaults.baseURL}${item.logo}`}
                                alt={item.name}
                                className="marquee-logo"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "/companies-icons/brigade.jpeg"; // Fallback image
                                }}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MarqueeSection;
