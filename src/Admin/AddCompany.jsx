import React, { useState } from "react";
import axios from "axios";
import {
    FiPlus,
    FiGlobe,
    FiBox,
    FiLayers,
    FiMapPin,
    FiUsers,
    FiImage,
    FiTarget,
    FiCompass,
    FiCheckSquare,
    FiInfo,
    FiCheckCircle,
    FiAlertCircle,
    FiLayout,
    FiTrash2,
    FiArrowRight,
    FiStar
} from "react-icons/fi";

const AddCompany = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const [company, setCompany] = useState({
        id: "",
        name: "",
        tagline: "",
        industry: "",
        location: "",
        employees: "",
        website: "",
        logo: "",
        vision: "",
        mission: "",
        services: [""],
        projects: [{ title: "", desc: "", img: "", category: "Residential" }],
        gallery: [""],
        team: [{ name: "", role: "", img: "" }],
        chooseUs: [{ title: "", desc: "" }]
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCompany({ ...company, [name]: value });
        setError("");
    };

    // Generic Add Item
    const addItem = (type, defaultVal) => {
        setCompany({
            ...company,
            [type]: [...company[type], defaultVal]
        });
    };

    // Generic Remove Item
    const removeItem = (type, index) => {
        const list = [...company[type]];
        if (list.length > 1) {
            list.splice(index, 1);
            setCompany({ ...company, [type]: list });
        } else if (type === 'services' || type === 'gallery') {
            // Allow clearing but keep at least 1 empty string for primitive arrays
            list[0] = "";
            setCompany({ ...company, [type]: list });
        }
    };

    // Generic Update Item
    const updateItem = (type, index, field, value) => {
        const list = [...company[type]];
        if (field === null) {
            list[index] = value;
        } else {
            list[index][field] = value;
        }
        setCompany({ ...company, [type]: list });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        if (!company.name) {
            setError("Company Name is required.");
            return;
        }

        const payload = {
            id: company.id || Date.now().toString(),
            name: company.name,
            tagline: company.tagline,
            industry: company.industry,
            location: company.location,
            employees: Number(company.employees) || 0,
            website: company.website,
            logo: company.logo,
            vision: company.vision,
            mission: company.mission,
            totalJobs: 0,

            // Format arrays correctly for the schema
            services: company.services.filter(s => s.trim() !== ""),
            gallery: company.gallery.filter(g => g.trim() !== ""),
            chooseUs: company.chooseUs.filter(c => c.title.trim() !== ""),
            projects: company.projects.filter(p => p.title.trim() !== ""),
            team: company.team.filter(t => t.name.trim() !== "")
        };

        try {
            setLoading(true);
            await axios.post(
                "https://realestate-server-9xji.onrender.com/companies",
                payload
            );

            setSuccess(true);
            setCompany({
                id: "",
                name: "",
                tagline: "",
                industry: "",
                location: "",
                employees: "",
                website: "",
                logo: "",
                vision: "",
                mission: "",
                services: [""],
                projects: [{ title: "", desc: "", img: "", category: "Residential" }],
                gallery: [""],
                team: [{ name: "", role: "", img: "" }],
                chooseUs: [{ title: "", desc: "" }]
            });

            setTimeout(() => setSuccess(false), 5000);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Error saving company profile.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="animate-fade-in">
            <div className="admin-view-header">
                <div className="admin-view-title">
                    <h3>Company Management</h3>
                    <p>Build and showcase comprehensive corporate profiles</p>
                </div>
            </div>

            <div className="row g-4 mb-5">
                <div className="col-lg-12">
                    <form onSubmit={handleSubmit}>

                        {/* SECTION 1: IDENTITY */}
                        <div className="dash-card mb-4">
                            <h5 className="mb-4 fw-bold text-dark d-flex align-items-center gap-2">
                                <FiBox className="text-primary" /> Core Identity
                            </h5>

                            {error && (
                                <div className="alert alert-danger d-flex align-items-center gap-2 border-0 rounded-4 mb-4">
                                    <FiAlertCircle /> {error}
                                </div>
                            )}

                            {success && (
                                <div className="alert alert-success d-flex align-items-center gap-2 border-0 rounded-4 mb-4">
                                    <FiCheckCircle /> Profile published successfully!
                                </div>
                            )}

                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label fw-bold text-muted small text-uppercase">Company Name</label>
                                    <input className="premium-input" name="name" value={company.name} onChange={handleChange} placeholder="e.g. Prestige Group" required />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-bold text-muted small text-uppercase">Industry</label>
                                    <input className="premium-input" name="industry" value={company.industry} onChange={handleChange} placeholder="Real Estate" />
                                </div>
                                <div className="col-12">
                                    <label className="form-label fw-bold text-muted small text-uppercase">Tagline</label>
                                    <input className="premium-input" name="tagline" value={company.tagline} onChange={handleChange} placeholder="Building future-ready living spaces..." />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label fw-bold text-muted small text-uppercase">Location (HQ)</label>
                                    <input className="premium-input" name="location" value={company.location} onChange={handleChange} placeholder="Hyderabad, India" />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label fw-bold text-muted small text-uppercase">Employees</label>
                                    <input type="number" className="premium-input" name="employees" value={company.employees} onChange={handleChange} placeholder="500" />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label fw-bold text-muted small text-uppercase">Website</label>
                                    <input className="premium-input" name="website" value={company.website} onChange={handleChange} placeholder="https://..." />
                                </div>
                                <div className="col-12">
                                    <label className="form-label fw-bold text-muted small text-uppercase">Logo Asset URL</label>
                                    <input className="premium-input" name="logo" value={company.logo} onChange={handleChange} placeholder="https://cloud.com/logo.png" />
                                </div>
                            </div>
                        </div>

                        {/* SECTION 2: STRATEGY (VISION/MISSION) */}
                        <div className="dash-card mb-4">
                            <h5 className="mb-4 fw-bold text-dark d-flex align-items-center gap-2">
                                <FiTarget className="text-info" /> Vision & Mission
                            </h5>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label fw-bold text-muted small text-uppercase">Vision Statement</label>
                                    <textarea className="premium-input" rows="3" name="vision" value={company.vision} onChange={handleChange} placeholder="The future we aim to create..." />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-bold text-muted small text-uppercase">Mission Statement</label>
                                    <textarea className="premium-input" rows="3" name="mission" value={company.mission} onChange={handleChange} placeholder="Our everyday commitment..." />
                                </div>
                            </div>

                            <hr className="my-4 opacity-5" />

                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <label className="form-label fw-bold text-muted mb-0 small text-uppercase">Business Services</label>
                                <button type="button" className="btn btn-sm btn-outline-primary rounded-pill px-3" onClick={() => addItem("services", "")}>+ Add</button>
                            </div>
                            <div className="d-flex flex-wrap gap-2">
                                {company.services.map((s, i) => (
                                    <div key={i} className="d-flex align-items-center bg-light border p-2 rounded-pill gap-2">
                                        <input className="bg-transparent border-0 outline-none small px-2" value={s} onChange={(e) => updateItem("services", i, null, e.target.value)} placeholder="e.g. Consulting" />
                                        <FiTrash2 className="text-danger cursor-pointer" onClick={() => removeItem("services", i)} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* SECTION 3: LEADERSHIP TEAM */}
                        <div className="dash-card mb-4">
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <h5 className="mb-0 fw-bold text-dark d-flex align-items-center gap-2">
                                    <FiUsers className="text-success" /> Leadership Team
                                </h5>
                                <button type="button" className="btn btn-sm btn-outline-primary rounded-pill px-3" onClick={() => addItem("team", { name: "", role: "", img: "" })}>+ Add Member</button>
                            </div>
                            <div className="row g-3">
                                {company.team.map((t, i) => (
                                    <div key={i} className="col-md-6">
                                        <div className="p-3 bg-light rounded-4 position-relative border">
                                            <div className="d-flex gap-3 align-items-center">
                                                <div className="bg-white rounded-circle shadow-sm overflow-hidden d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px', minWidth: '60px' }}>
                                                    {t.img ? <img src={t.img} className="w-100 h-100 object-fit-cover" alt="" /> : <FiUsers className="text-muted" />}
                                                </div>
                                                <div className="flex-grow-1">
                                                    <input className="premium-input py-1 mb-1 bg-white" value={t.name} onChange={(e) => updateItem("team", i, "name", e.target.value)} placeholder="Full Name" />
                                                    <input className="premium-input py-1 mb-1 bg-white" value={t.role} onChange={(e) => updateItem("team", i, "role", e.target.value)} placeholder="Role (e.g. CEO)" />
                                                    <input className="premium-input py-1 bg-white small" value={t.img} onChange={(e) => updateItem("team", i, "img", e.target.value)} placeholder="Headshot URL" />
                                                </div>
                                            </div>
                                            <button type="button" className="btn btn-sm btn-light rounded-circle shadow-sm position-absolute top-0 end-0 mt-2 me-2" onClick={() => removeItem("team", i)}>
                                                <FiTrash2 className="text-danger" size={14} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* SECTION 4: WHY CHOOSE US (USP) */}
                        <div className="dash-card mb-4">
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <h5 className="mb-0 fw-bold text-dark d-flex align-items-center gap-2">
                                    <FiStar className="text-warning" /> Why Choose Us (Distinctive Features)
                                </h5>
                                <button type="button" className="btn btn-sm btn-outline-primary rounded-pill px-3" onClick={() => addItem("chooseUs", { title: "", desc: "" })}>+ Add Feature</button>
                            </div>
                            <div className="row g-3">
                                {company.chooseUs.map((c, i) => (
                                    <div key={i} className="col-12">
                                        <div className="p-3 bg-light rounded-4 border position-relative">
                                            <div className="row g-2">
                                                <div className="col-md-4">
                                                    <input className="premium-input bg-white" value={c.title} onChange={(e) => updateItem("chooseUs", i, "title", e.target.value)} placeholder="Feature Title" />
                                                </div>
                                                <div className="col-md-7">
                                                    <input className="premium-input bg-white" value={c.desc} onChange={(e) => updateItem("chooseUs", i, "desc", e.target.value)} placeholder="Description explaining this feature..." />
                                                </div>
                                                <div className="col-md-1 d-flex align-items-center justify-content-end">
                                                    <button type="button" className="btn btn-sm btn-light rounded-circle" onClick={() => removeItem("chooseUs", i)}>
                                                        <FiTrash2 className="text-danger" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* SECTION 5: HIGHLIGHTED PROJECTS */}
                        <div className="dash-card mb-4">
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <h5 className="mb-0 fw-bold text-dark d-flex align-items-center gap-2">
                                    <FiLayout className="text-primary" /> Highlighted Projects
                                </h5>
                                <button type="button" className="btn btn-sm btn-outline-primary rounded-pill px-3" onClick={() => addItem("projects", { title: "", desc: "", img: "", category: "Residential" })}>+ Add Project</button>
                            </div>
                            <div className="row g-4">
                                {company.projects.map((p, i) => (
                                    <div key={i} className="col-md-6">
                                        <div className="p-3 bg-light rounded-4 border position-relative">
                                            <label className="small fw-bold text-muted text-uppercase mb-1">Project Name</label>
                                            <input className="premium-input bg-white mb-2" value={p.title} onChange={(e) => updateItem("projects", i, "title", e.target.value)} placeholder="Skyline Residency" />

                                            <label className="small fw-bold text-muted text-uppercase mb-1">Banner Image URL</label>
                                            <input className="premium-input bg-white mb-2" value={p.img} onChange={(e) => updateItem("projects", i, "img", e.target.value)} placeholder="https://..." />

                                            <label className="small fw-bold text-muted text-uppercase mb-1">Short Description</label>
                                            <textarea className="premium-input bg-white" rows="2" value={p.desc} onChange={(e) => updateItem("projects", i, "desc", e.target.value)} placeholder="Luxury apartments featuring..." />

                                            <button type="button" className="btn btn-sm btn-light rounded-circle shadow-sm position-absolute top-0 end-0 mt-2 me-2" onClick={() => removeItem("projects", i)}>
                                                <FiTrash2 className="text-danger" size={14} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* SECTION 6: MEDIA GALLERY */}
                        <div className="dash-card mb-4">
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <h5 className="mb-0 fw-bold text-dark d-flex align-items-center gap-2">
                                    <FiImage className="text-warning" /> Media Gallery
                                </h5>
                                <button type="button" className="btn btn-sm btn-outline-primary rounded-pill px-3" onClick={() => addItem("gallery", "")}>+ Add Image</button>
                            </div>
                            <div className="row g-2">
                                {company.gallery.map((g, i) => (
                                    <div key={i} className="col-md-4 d-flex gap-2 align-items-center">
                                        <input className="premium-input" value={g} onChange={(e) => updateItem("gallery", i, null, e.target.value)} placeholder="Paste image link here..." />
                                        <FiTrash2 className="text-danger cursor-pointer" onClick={() => removeItem("gallery", i)} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* SUBMIT BUTTON */}
                        <div className="mb-5 d-flex justify-content-center">
                            <button className="premium-btn px-5 py-3 rounded-pill shadow-lg d-flex align-items-center gap-2" disabled={loading} style={{ fontSize: '1.1rem' }}>
                                {loading ? <span className="spinner-border spinner-border-sm"></span> : <><FiCheckCircle /> Publish Corporate Profile <FiArrowRight /></>}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddCompany;
