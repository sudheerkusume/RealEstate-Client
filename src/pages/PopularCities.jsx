import api from "../config/api";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Aos from "aos";
import "./PopularCities.css";

// Featured cities with their icon paths
const CITY_ICONS = {
    Hyderabad: {
        default: "/cities/hyderabad_black.png",
        hover: "/cities/hyderabad_hover.png",
    },
    Bengaluru: {
        default: "/cities/bengaluru_black.png",
        hover: "/cities/bengaluru_hover.png",
    },
    Mumbai: {
        default: "/cities/mumbai_black.png",
        hover: "/cities/mumbai_hover.png",
    },
    "Delhi NCR": {
        default: "/cities/delhi_black.png",
        hover: "/cities/delhi_hover.png",
    },
    Chennai: {
        default: "/cities/chennai_black.png",
        hover: "/cities/chennai_hover.png",
    },
    Kolkata: {
        default: "/cities/kolkata_black.png",
        hover: "/cities/kolkata_hover.png",
    },
};

const FEATURED_ORDER = ["Hyderabad", "Bengaluru", "Mumbai", "Delhi NCR", "Chennai", "Kolkata"];

const PopularCities = () => {
    const [cities, setCities] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/jobCategories").then((res) => {
            const grouped = res.data.reduce((acc, job) => {
                if (!acc[job.location]) {
                    acc[job.location] = {
                        name: job.location,
                        jobs: 0,
                    };
                }
                acc[job.location].jobs += 1;
                return acc;
            }, {});

            // Always show all featured cities, even if they have 0 jobs
            const featured = FEATURED_ORDER.map((name) => ({
                name,
                jobs: grouped[name] ? grouped[name].jobs : 0,
            }));

            setCities(featured);
            setTimeout(() => Aos.refresh(), 300);
        });
    }, []);

    return (
        <section className="popular-cities-section">
            <div className="popular-cities-container">
                <h2 className="popular-cities-title">Popular Cities</h2>

                <div className="popular-cities-grid">
                    {cities.map((city, index) => {
                        const icons = CITY_ICONS[city.name];
                        if (!icons) return null;

                        return (
                            <div
                                className="popular-city-card"
                                key={city.name}
                                data-aos="fade-up"
                                data-aos-delay={index * 50}
                                onClick={() =>
                                    navigate(`/jobs/city/${encodeURIComponent(city.name)}`)
                                }
                            >
                                <div className="popular-city-icon-wrapper">
                                    <img
                                        src={icons.default}
                                        alt={city.name}
                                        className="city-icon default"
                                    />
                                    <img
                                        src={icons.hover}
                                        alt={city.name}
                                        className="city-icon hover"
                                    />
                                </div>
                                <h6 className="popular-city-name">{city.name}</h6>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default PopularCities;
