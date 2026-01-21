import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
    BsGeoAlt,
    BsPeople,
    BsBriefcase,
    BsBuilding,
    BsArrowRight,
    BsGlobe,
    BsLightningCharge,
    BsShieldCheck,
    BsArrowUpRight,
    BsEye,
    BsRocketTakeoff,
    BsGem,
    BsPatchCheck,
    BsArrowRightCircle
} from "react-icons/bs";
import BannerImage from "../Accets/bannerA.jpeg";

const CompaniesSingle = () => {
    const { id } = useParams();

    const [company, setCompany] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showJobs, setShowJobs] = useState(false);

    /* ================= FETCH DATA ================= */
    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchData = async () => {
            try {
                const [companiesRes, jobsRes] = await Promise.all([
                    axios.get("https://realestate-server-9xji.onrender.com/companies"),
                    axios.get("https://realestate-server-9xji.onrender.com/jobCategories")
                ]);

                const selectedCompany = companiesRes.data.find(
                    c => c._id === (id)
                );

                if (!selectedCompany) {
                    setCompany(null);
                } else {
                    setCompany(selectedCompany);
                    setJobs(jobsRes.data);
                }
            } catch (err) {
                console.error("Error loading company", err);
                setCompany(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    /* ================= LOADING ================= */
    if (loading) {
        return (
            <div className="p-5 text-center" style={{ minHeight: "80vh" }}>
                <div className="spinner-border text-danger mb-3" />
                <div className="fw-bold">Fetching Profile Details...</div>
            </div>
        );
    }

    /* ================= NOT FOUND ================= */
    if (!company) {
        return (
            <div className="text-center p-5">
                <h2>Company not found</h2>
                <Link to="/companies" className="apply-btn mt-3">
                    Back to Companies
                </Link>
            </div>
        );
    }

    // Filter jobs accurately using both ID and Name as fallback
    const companyJobs = jobs.filter(j => {
        const matchesId = j.companyId && (String(j.companyId) === String(company._id) || String(j.companyId) === String(company.id));
        const matchesName = j.company && j.company.toLowerCase().trim() === company.name?.toLowerCase().trim();
        return matchesId || matchesName;
    });

    return (
        <div className="company-details-page">

            {/* ================= HERO ================= */}
            <section
                className="company-hero-cinematic"
                style={{ backgroundImage: `url(${BannerImage})` }}
            >
                <div className="hero-overlay-dark"></div>
                <div className="container">
                    <div className="hero-glass-card">
                        <span className="glass-badge">Corporate Profile</span>

                        <h1 className="cinematic-name" data-text={company.name}>{company.name}</h1>
                        <p className="cinematic-tagline">{company.tagline || "Redefining Urban Living with Visionary Excellence."}</p>

                        <div className="hero-btn-group">
                            {company.website && (
                                <a
                                    href={company.website}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="apply-btn"
                                >
                                    Visit Website <BsArrowUpRight className="ms-2" />
                                </a>
                            )}

                            <button className="btn btn-light fw-semibold px-3 py-2 rounded-pill shadow-sm">
                                Contact Sales
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= INFO BAR ================= */}
            <div className="container" style={{ marginTop: "-50px", position: "relative", zIndex: 10 }}>
                <div className="info-bar-box">
                    <div className="info-item">
                        <div className="info-item-icon"><BsBuilding /></div>
                        <div className="info-item-text">
                            <p>Headquarters</p>
                            <h6>{company.location}</h6>
                        </div>
                    </div>

                    <div className="info-item">
                        <div className="info-item-icon"><BsPeople /></div>
                        <div className="info-item-text">
                            <p>Global Team</p>
                            <h6>{company.employees}+ Professionals</h6>
                        </div>
                    </div>

                    <div className="info-item">
                        <div className="info-item-icon"><BsBriefcase /></div>
                        <div className="info-item-text">
                            <p>Portfolio</p>
                            <h6>{company.projects?.length || 0}+ Projects</h6>
                        </div>
                    </div>

                    <div className="info-item">
                        <div className="info-item-icon"><BsGlobe /></div>
                        <div className="info-item-text">
                            <p>Industry</p>
                            <h6>{company.industry}</h6>
                        </div>
                    </div>
                </div>
            </div>

            {/* ================= DISTINCTIVE / ORBITAL ================= */}
            <section className="py-5 distinctive-section mt-5 overflow-hidden">
                <div className="container">
                    <div className="row g-5 align-items-center">
                        <div className="col-lg-6">
                            <div className="section-eyebrow mb-3">
                                <BsPatchCheck className="text-danger me-2" />
                                <span>DISTINCTIVE FEATURES</span>
                            </div>

                            <h2 className="distinctive-title mb-4">
                                What Makes <span className="highlight-red">{company.name}</span> <br />
                                <span className="highlight-dark">Distinctive</span> And <span className="highlight-red">Popular</span>?
                            </h2>

                            <div className="distinctive-features-list">
                                {company.chooseUs?.map((item, i) => {
                                    const title = typeof item === 'string' ? item : item.title;
                                    const desc = typeof item === 'string' ? "" : item.desc;
                                    return (
                                        <div className="distinctive-feature-item" key={i}>
                                            <div className="feature-number">{i + 1}</div>
                                            <div className="feature-text">
                                                <h6>{title}</h6>
                                                {desc && <p>{desc}</p>}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="orbital-graphic-container">
                                <div className="orbit orbit-1"></div>
                                <div className="orbit orbit-2"></div>
                                <div className="orbit orbit-3"></div>

                                <div className="orbital-center">
                                    <img src={company.logo} alt={company.name} className="orbital-logo" />
                                </div>

                                <div className="orbit-dot dot-1"><BsShieldCheck /></div>
                                <div className="orbit-dot dot-2"><BsLightningCharge /></div>
                                <div className="orbit-dot dot-3"><BsGlobe /></div>
                                <div className="orbit-dot dot-4"><BsGem /></div>
                                <div className="orbit-dot dot-5"><BsRocketTakeoff /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= SERVICES ================= */}
            <section className="py-5 bg-white">
                <div className="container">
                    <h2 className="premium-section-title">Our Services</h2>
                    <div className="row g-4 d-flex justify-content-center">
                        {company.services?.map((service, i) => (
                            <div className="col-md-3" key={i}>
                                <div className="service-card p-4 text-center border rounded-4 shadow-sm h-100">
                                    <BsPatchCheck className="text-danger mb-3 fs-3" />
                                    <h5 className="fw-bold mb-0">{service}</h5>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= PROJECTS ================= */}
            <section className="py-5 bg-light">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="premium-section-title">Highlighted Projects</h2>
                    </div>
                    <div className="row g-4">
                        {company.projects?.map((proj, i) => (
                            <div className="col-md-4" key={i}>
                                <div className="project-card-premium">
                                    <div className="project-img-wrapper">
                                        <img src={proj.img} alt={proj.title} />
                                        <span className="project-badge">{proj.category || "Residential"}</span>
                                    </div>
                                    <div className="project-content">
                                        <h4>{proj.title}</h4>
                                        <p>{proj.desc}</p>
                                        <Link to="#" className="text-danger fw-bold text-decoration-none small">
                                            View Details <BsArrowRight />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= GALLERY ================= */}
            <section className="py-5">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="premium-section-title">Corporate Gallery</h2>
                    </div>
                    <div className="gallery-grid-premium">
                        {company.gallery?.map((img, i) => (
                            <div className="gallery-item" key={i}>
                                <img src={img} alt="Gallery" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= VISION & MISSION ================= */}
            <section className="py-5 mt-4">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-md-6">
                            <div className="feature-block-box vision-block">
                                <div className="block-icon"><BsEye /></div>
                                <h3 className="block-title">Our Vision</h3>
                                <p className="block-desc">{company.vision || "To be the most trusted and innovative real estate partner, creating sustainable spaces that inspire."}</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="feature-block-box mission-block">
                                <div className="block-icon"><BsRocketTakeoff /></div>
                                <h3 className="block-title">Our Mission</h3>
                                <p className="block-desc">{company.mission || "Our mission is to deliver exceptional value through transparent practices and cutting-edge design."}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= LEADERSHIP TEAM ================= */}
            <section className="py-5 bg-light">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="premium-section-title">Leadership Team</h2>
                    </div>
                    <div className="row g-4 justify-content-center">
                        {company.team?.map((m, i) => (
                            <div className="col-md-3 col-6" key={i}>
                                <div className="team-member-card text-center">
                                    <div className="member-img-wrapper mx-auto" style={{ width: '150px', height: '150px' }}>
                                        <img src={m.img} alt={m.name} className="img-fluid rounded-circle" />
                                    </div>
                                    <h5 className="member-name mt-3">{m.name}</h5>
                                    <p className="member-role">{m.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= JOBS ================= */}
            {showJobs && (
                <section id="company-jobs-section" className="py-5">
                    <div className="container">
                        <h2 className="premium-section-title text-center mb-5">
                            Career Opportunities at {company.name}
                        </h2>

                        {companyJobs.length === 0 ? (
                            <p className="text-center text-muted">No current openings.</p>
                        ) : (
                            <div className="row g-4 justify-content-center">
                                {companyJobs.map(job => (
                                    <div className="col-md-10" key={job._id}>
                                        <div className="opening-card-mini">
                                            <div>
                                                <h4>{job.title}</h4>
                                                <small className="text-muted">
                                                    <BsGeoAlt className="me-1" />
                                                    {job.location}
                                                </small>
                                            </div>

                                            <Link
                                                to={`/jobs/${job._id}`}
                                                className="job-apply-btn"
                                                id={`job-btn-${job._id}`}
                                            >
                                                Apply Now <BsArrowRightCircle className="ms-2" />
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* ================= CTA FOOTER ================= */}
            <section className="py-5 mb-5 mt-4">
                <div className="container">
                    <div className="cta-box-premium v2 text-center p-5 rounded-5" style={{ background: '#0f172a', color: '#fff' }}>
                        <h2 className="fw-bold mb-3">Interested in joining {company.name}?</h2>
                        <p className="opacity-75 mb-4">Connect with our talent acquisition team or explore our current openings.</p>
                        <div className="d-flex gap-3 justify-content-center flex-wrap">
                            <button className="apply-btn" onClick={() => setShowJobs(true)}>Explores All Jobs</button>
                            <Link to="/companies" className="apply-btn bg-white text-dark text-decoration-none">Back to Directory</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= FIXED JOBS BUTTON ================= */}
            <button
                className="floating-jobs-btn"
                disabled={companyJobs.length === 0}
                onClick={() => {
                    setShowJobs(true);
                    setTimeout(() => {
                        document
                            .getElementById("company-jobs-section")
                            ?.scrollIntoView({ behavior: "smooth" });
                    }, 150);
                }}
            >
                <BsBriefcase className="me-2" />
                Jobs ({companyJobs.length})
            </button>
        </div>
    );
};

export default CompaniesSingle;
