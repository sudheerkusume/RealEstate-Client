import api from "../config/api";
import React, { useEffect, useState } from "react";
import { BsClock, BsAward, BsLaptop, BsStarFill, BsArrowRight, BsStars, BsPeopleFill } from "react-icons/bs";
import { MdVerified, MdOutlineVilla } from "react-icons/md";
import { FaUserTie, FaBuilding } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Banner1 from "../Accets/landing-page.png";
import Banner2 from "../Accets/bub.jpeg";
import Banner3 from "../Accets/bannerF.jpeg";

const Certifications = () => {
    const [certs, setCerts] = useState([]);
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    const featuredJobs = [
        {
            id: 1,
            title: "Senior Real Estate Agent",
            company: "LuxeRealty",
            location: "Los Angeles, CA",
            salary: "$120k - $150k",
            type: "Full-time",
            image: Banner1,
        },
        {
            id: 2,
            title: "Property Manager",
            company: "Urban Home",
            location: "New York, NY",
            salary: "$85k - $110k",
            type: "On-site",
            image: Banner2,
        },
        {
            id: 3,
            title: "Mortgage Consultant",
            company: "FinanceKey",
            location: "Remote",
            salary: "$90k + Comm.",
            type: "Remote",
            image: Banner3,
        },
    ];

    useEffect(() => {
        api
            .get("/Certifications")
            .then((res) => setCerts(res.data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <section className="cert-section">
            <div className="container py-5 mb-5">
                <div className="text-center mb-5" data-aos="fade-up">
                    <span className="recruit-badge">GROWTH</span>
                    <h2 className="recruit-title mt-3">
                        Real Estate <span className="highlight-red">Certifications Programs</span>
                    </h2>
                    <p className="recruit-desc mt-3 mx-auto">
                        Elevate your career with industry-recognized certifications designed for real estate professionals.
                    </p>
                </div>

                <div className="row g-4">
                    {certs.map((cert, index) => (
                        <div className="col-md-6 col-lg-4" key={cert.id} data-aos="fade-up" data-aos-delay={index * 100}>
                            <div className="cert-card h-100">
                                <div className="cert-img-wrapper">
                                    <img src={cert.image} alt={cert.title} className="cert-img" />
                                    <span className="cert-category-badge">{cert.category}</span>
                                </div>

                                <div className="cert-body">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <span className="cert-provider text-muted text-uppercase small fw-bold">
                                            {cert.certificationProvider}
                                        </span>
                                        <div className="cert-rating">
                                            <BsStarFill className="text-warning me-1" />
                                            <span>{cert.rating}</span>
                                        </div>
                                    </div>

                                    <h5 className="cert-title">{cert.title}</h5>

                                    <div className="cert-meta my-3">
                                        <div className="cert-meta-item">
                                            <BsAward className="me-2 text-danger" /> {cert.level}
                                        </div>
                                        <div className="cert-meta-item">
                                            <BsClock className="me-2 text-danger" /> {cert.duration}
                                        </div>
                                        <div className="cert-meta-item">
                                            <BsLaptop className="me-2 text-danger" /> {cert.mode}
                                        </div>
                                    </div>

                                    <hr className="cert-divider" />

                                    <div className="d-flex justify-content-between align-items-center mt-auto">
                                        <div>
                                            {/* <span className="text-muted small text-decoration-line-through">₹{cert.price + 2000}</span> */}
                                            <span className="cert-price">₹{cert.price.toLocaleString()}</span>
                                        </div>
                                        <div className="d-flex gap-2">
                                            <button className="btn btn-outline-dark rounded-pill btn-sm px-3 fw-medium">
                                                Syllabus
                                            </button>
                                            <button className="btn btn-danger rounded-pill btn-sm px-3 fw-medium d-flex align-items-center">
                                                Enroll <BsArrowRight className="ms-1" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <section className="container py-5 mb-5">
                <div className="row">
                    <div className="col-lg-6 mb-4">
                        <div className="section-eyebrow">
                            <MdVerified color="#dc2626" size={20} />
                            <span>WHO WE ARE</span>
                        </div>
                        <h2 className="fw-bold mb-4" style={{ fontSize: '42px', color: '#111', lineHeight: 1.2 }}>
                            We help you find the <span style={{ fontStyle: 'italic', fontFamily: 'serif', color: '#dc2626' }}>perfect</span> job to build your career.
                        </h2>
                        <p className="text-secondary" style={{ maxWidth: '500px', fontSize: '16px' }}>
                            We believe that finding a job in real estate should be an enjoyable and stress-free experience. Our platform connects dedicated professionals with top agencies.
                        </p>
                    </div>

                    <div className="col-lg-6">
                        <div className="row g-4">
                            <div className="col-md-6">
                                <div className="why-card">
                                    <div className="why-icon" style={{ color: '#dc2626' }}><BsStars /></div>
                                    <h5 className="why-title">Experienced</h5>
                                    <p className="why-desc">Over 10 years of experience connecting professionals with the best opportunities in the market.</p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="why-card">
                                    <div className="why-icon" style={{ color: '#dc2626' }}><BsPeopleFill /></div>
                                    <h5 className="why-title">Extensive Network</h5>
                                    <p className="why-desc">We have a wide network that includes the best agencies and companies across the country.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <AnimatePresence>
                    {isVideoOpen && (
                        <motion.div
                            className="video-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                className="video-modal"
                                initial={{ scale: 0.8, y: 50 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.8, y: 50 }}
                                transition={{ duration: 0.3 }}
                            >
                                <button
                                    className="close-btn"
                                    onClick={() => setIsVideoOpen(false)}
                                >
                                    ✖
                                </button>

                                <video
                                    src="/realestate-video.mp4"   // or Cloudinary link
                                    controls
                                    autoPlay
                                    style={{ width: "100%", borderRadius: "15px" }}
                                />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </section>
            <section className="container py-5" style={{ marginTop: '40px' }}>
                <div className="section-eyebrow">
                    <BsStars color="#dc2626" size={20} />
                    <span>TOP OPPORTUNITIES</span>
                </div>

                <div className="d-flex justify-content-between align-items-end mb-5">
                    <h2 className="fw-bold m-0" style={{ fontSize: '36px', color: '#111' }}>Featured Jobs</h2>
                    <a href="#!" className="text-dark fw-bold text-decoration-none">View All Opportunities &rarr;</a>
                </div>

                <div className="row">
                    {featuredJobs.map((job) => (
                        <div className="col-lg-4 mb-4" key={job.id}>
                            <div className="featured-card">
                                <div className="featured-img-box">
                                    <img src={job.image} alt={job.title} />
                                    <div className="f-badges">
                                        <span className="f-badge"><MdOutlineVilla /> {job.type}</span>
                                        <span className="f-badge"><MdVerified color="#dc2626" /> Verified</span>
                                    </div>
                                </div>
                                <div className="featured-content">
                                    <span className="featured-price">{job.salary}</span>
                                    <h4 className="featured-title">{job.title}</h4>
                                    <p className="featured-desc">{job.company} • {job.location}</p>

                                    <hr style={{ opacity: 0.1, margin: '15px 0' }} />

                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex gap-2 text-muted" style={{ fontSize: 13 }}>
                                            <span><FaUserTie /> Expert</span>
                                            <span><FaBuilding /> Office</span>
                                        </div>
                                        <button className="btn btn-sm btn-outline-dark rounded-pill px-3">Apply</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </section>
    );
};

export default Certifications;