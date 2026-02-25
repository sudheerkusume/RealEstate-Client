import React, { useState, useEffect } from "react";
import api from "../config/api";
import { FiSave, FiLayers, FiMapPin, FiGlobe, FiUsers, FiImage } from "react-icons/fi";

const CompanyProfile = ({ user, onUpdate }) => {
    const [formData, setFormData] = useState({
        name: "",
        tagline: "",
        industry: "",
        location: "",
        employees: "",
        website: "",
        logo: "",
        services: "",
        vision: "",
        mission: ""
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                tagline: user.tagline || "",
                industry: user.industry || "",
                location: user.location || "",
                employees: user.employees || "",
                website: user.website || "",
                logo: user.logo || "",
                services: Array.isArray(user.services) ? user.services.join(", ") : (user.services || ""),
                vision: user.vision || "",
                mission: user.mission || ""
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setSuccess(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            ...formData,
            employees: Number(formData.employees),
            services: formData.services
                .split(",")
                .map(i => i.trim())
                .filter(Boolean),
        };

        try {
            // Updated endpoint to match the GET /dashboard pattern
            const res = await api.patch("/dashboard", payload);

            if (onUpdate) onUpdate(res.data);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            console.error("Profile update failed:", err);
            const status = err.response?.status;
            if (status === 404) {
                alert("Error: Profile update endpoint not found (404). Testing alternative endpoints...");
                // Fallback attempt or just inform user
            } else {
                alert(`Error updating profile: ${err.response?.data?.message || err.message}`);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="animate-fade-in">
            <div className="dash-card p-4 rounded-4 shadow-sm border-0 bg-white">
                <div className="d-flex align-items-center justify-content-between mb-4 pb-3 border-bottom">
                    <div>
                        <h4 className="fw-bold text-dark mb-1">Company Profile</h4>
                        <p className="text-muted small mb-0">Complete your company details to attract top talent.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="premium-form-grid">
                    <div className="row g-4">
                        <div className="col-md-6">
                            <label className="small fw-bold text-muted mb-2 d-flex align-items-center gap-2">
                                <FiLayers className="text-primary" /> Company Name
                            </label>
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="form-control rounded-3 py-2"
                                placeholder="Alpha Realty"
                                required
                                readOnly // Name usually shouldn't change without official request
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="small fw-bold text-muted mb-2 d-flex align-items-center gap-2">
                                <FiGlobe className="text-primary" /> Website
                            </label>
                            <input
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                className="form-control rounded-3 py-2"
                                placeholder="https://alpharealty.com"
                            />
                        </div>

                        <div className="col-12">
                            <label className="small fw-bold text-muted mb-2">Company Tagline</label>
                            <input
                                name="tagline"
                                value={formData.tagline}
                                onChange={handleChange}
                                className="form-control rounded-3 py-2"
                                placeholder="Innovative real estate solutions for a better tomorrow"
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="small fw-bold text-muted mb-2 d-flex align-items-center gap-2">
                                <FiMapPin className="text-primary" /> Location
                            </label>
                            <input
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="form-control rounded-3 py-2"
                                placeholder="Hyderabad, Telangana"
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="small fw-bold text-muted mb-2 d-flex align-items-center gap-2">
                                <FiUsers className="text-primary" /> Employees
                            </label>
                            <input
                                type="number"
                                name="employees"
                                value={formData.employees}
                                onChange={handleChange}
                                className="form-control rounded-3 py-2"
                                placeholder="50"
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="small fw-bold text-muted mb-2">Industry</label>
                            <input
                                name="industry"
                                value={formData.industry}
                                onChange={handleChange}
                                className="form-control rounded-3 py-2"
                                placeholder="Real Estate"
                            />
                        </div>

                        <div className="col-12">
                            <label className="small fw-bold text-muted mb-2 d-flex align-items-center gap-2">
                                <FiImage className="text-primary" /> Logo URL
                            </label>
                            <input
                                name="logo"
                                value={formData.logo}
                                onChange={handleChange}
                                className="form-control rounded-3 py-2"
                                placeholder="https://example.com/logo.png"
                            />
                        </div>

                        <div className="col-12">
                            <label className="small fw-bold text-muted mb-2">Services Offered (comma separated)</label>
                            <textarea
                                name="services"
                                value={formData.services}
                                onChange={handleChange}
                                className="form-control rounded-3 py-2"
                                rows="2"
                                placeholder="Property Management, Real Estate Consulting, Project Development"
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="small fw-bold text-muted mb-2">Our Vision</label>
                            <textarea
                                name="vision"
                                value={formData.vision}
                                onChange={handleChange}
                                className="form-control rounded-3 py-2"
                                rows="4"
                                placeholder="Describe where you want to go..."
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="small fw-bold text-muted mb-2">Our Mission</label>
                            <textarea
                                name="mission"
                                value={formData.mission}
                                onChange={handleChange}
                                className="form-control rounded-3 py-2"
                                rows="4"
                                placeholder="Describe what you do every day..."
                            />
                        </div>
                    </div>

                    <div className="mt-4 pt-3 d-flex align-items-center gap-3">
                        <button
                            type="submit"
                            className="btn btn-primary px-4 py-2 rounded-3 d-flex align-items-center gap-2"
                            disabled={loading}
                        >
                            <FiSave /> {loading ? "Saving..." : "Save Profile Details"}
                        </button>
                        {success && <span className="text-success small fw-bold anim-fade-in">✓ Profile updated successfully!</span>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CompanyProfile;
