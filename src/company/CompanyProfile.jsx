/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import api from "../config/api";
import {
    FiSave, FiLayers, FiMapPin, FiGlobe,
    FiUsers, FiImage, FiPlus, FiTrash,
    FiCamera, FiX, FiCheckCircle, FiUser
} from "react-icons/fi";

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
        mission: "",
        gallery: [],
        team: [],
        chooseUs: []
    });

    const [logoFile, setLogoFile] = useState(null);
    const [logoPreview, setLogoPreview] = useState("");
    const [galleryFiles, setGalleryFiles] = useState([]);
    const [galleryPreviews, setGalleryPreviews] = useState([]);
    const [teamFiles, setTeamFiles] = useState({}); // { index: File }
    const [teamPreviews, setTeamPreviews] = useState({}); // { index: url }

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const logoInputRef = useRef(null);
    const galleryInputRef = useRef(null);
    const teamInputRefs = useRef({});

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
                mission: user.mission || "",
                gallery: user.gallery || [],
                team: user.team?.map(m => ({ ...m })) || [],
                chooseUs: user.chooseUs || []
            });
            setLogoPreview(user.logo || "");
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setSuccess(false);
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLogoFile(file);
            setLogoPreview(URL.createObjectURL(file));
        }
    };

    const handleGalleryChange = (e) => {
        const files = Array.from(e.target.files);
        setGalleryFiles(prev => [...prev, ...files]);

        const newPreviews = files.map(file => URL.createObjectURL(file));
        setGalleryPreviews(prev => [...prev, ...newPreviews]);
    };

    const handleTeamImageChange = (index, e) => {
        const file = e.target.files[0];
        if (file) {
            setTeamFiles(prev => ({ ...prev, [index]: file }));
            setTeamPreviews(prev => ({ ...prev, [index]: URL.createObjectURL(file) }));
        }
    };

    const removeNewGalleryImage = (index) => {
        setGalleryFiles(prev => prev.filter((_, i) => i !== index));
        setGalleryPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const removeExistingGalleryImage = (url) => {
        setFormData(prev => ({
            ...prev,
            gallery: prev.gallery.filter(img => img !== url)
        }));
    };

    // Team Helpers
    const addTeamMember = () => {
        setFormData(prev => ({
            ...prev,
            team: [...prev.team, { name: "", role: "", image: "" }]
        }));
    };

    const updateTeamMember = (index, field, value) => {
        const newTeam = [...formData.team];
        newTeam[index][field] = value;
        setFormData(prev => ({ ...prev, team: newTeam }));
    };

    const removeTeamMember = (index) => {
        setFormData(prev => ({
            ...prev,
            team: prev.team.filter((_, i) => i !== index)
        }));
        // Clean up files/previews
        const newFiles = { ...teamFiles };
        delete newFiles[index];
        setTeamFiles(newFiles);
        const newPreviews = { ...teamPreviews };
        delete newPreviews[index];
        setTeamPreviews(newPreviews);
    };

    // Choose Us Helpers
    const addChooseUs = () => {
        setFormData(prev => ({
            ...prev,
            chooseUs: [...prev.chooseUs, ""]
        }));
    };

    const updateChooseUs = (index, value) => {
        const newChooseUs = [...formData.chooseUs];
        newChooseUs[index] = value;
        setFormData(prev => ({ ...prev, chooseUs: newChooseUs }));
    };

    const removeChooseUs = (index) => {
        setFormData(prev => ({
            ...prev,
            chooseUs: prev.chooseUs.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = new FormData();

            // 1. Basic fields
            const fieldsToExclude = ["logo", "gallery", "team", "chooseUs", "services", "employees"];
            Object.keys(formData).forEach(key => {
                if (!fieldsToExclude.includes(key)) {
                    data.append(key, formData[key]);
                }
            });

            data.append("employees", Number(formData.employees) || 0);

            // 2. Append JSON fields (Existing data)
            data.append("services", JSON.stringify(formData.services.split(",").map(i => i.trim()).filter(Boolean)));
            data.append("team", JSON.stringify(formData.team));
            data.append("gallery", JSON.stringify(formData.gallery));
            data.append("chooseUs", JSON.stringify(formData.chooseUs));

            // 3. Append Files
            if (logoFile) {
                data.append("logo", logoFile);
            }

            if (galleryFiles.length > 0) {
                galleryFiles.forEach(file => {
                    data.append("gallery", file);
                });
            }

            // Team images
            Object.keys(teamFiles).forEach(index => {
                data.append(`team_image_${index}`, teamFiles[index]);
            });

            const res = await api.patch("/dashboard", data, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            if (onUpdate) onUpdate(res.data);
            setSuccess(true);
            setLogoFile(null);
            setGalleryFiles([]);
            setGalleryPreviews([]);
            setTeamFiles({});
            setTeamPreviews({});
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            console.error("Profile update failed:", err);
            const errorMessage = err.response?.data?.error || err.response?.data?.message || err.message;
            alert(`Error updating profile: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="animate-fade-in mb-5">
            {/* --- COMPANY BASIC INFORMATION --- */}
            <div className="dash-card mb-4">
                <div className="dash-section-title mb-4">
                    <span>Company Basic Information</span>
                </div>

                <div className="premium-form-grid">
                    <div className="full-width">
                        <label className="small fw-bold text-muted">Company Name *</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="premium-input"
                            placeholder="e.g. Alpha Realty Solutions"
                            required
                        />
                    </div>

                    <div className="full-width">
                        <label className="small fw-bold text-muted">Company Tagline</label>
                        <input
                            name="tagline"
                            value={formData.tagline}
                            onChange={handleChange}
                            className="premium-input"
                            placeholder="e.g. Building future-ready real estate careers"
                        />
                    </div>

                    <div>
                        <label className="small fw-bold text-muted">Industry</label>
                        <input
                            name="industry"
                            value={formData.industry}
                            onChange={handleChange}
                            className="premium-input"
                            placeholder="e.g. Real Estate"
                        />
                    </div>

                    <div>
                        <label className="small fw-bold text-muted">Location</label>
                        <input
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="premium-input"
                            placeholder="e.g. Hyderabad, Hitech City"
                        />
                    </div>

                    <div>
                        <label className="small fw-bold text-muted">Total Employees</label>
                        <input
                            type="number"
                            name="employees"
                            value={formData.employees}
                            onChange={handleChange}
                            className="premium-input"
                            placeholder="e.g. 50"
                        />
                    </div>

                    <div>
                        <label className="small fw-bold text-muted">Official Website</label>
                        <input
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            className="premium-input"
                            placeholder="e.g. https://alpharealty.in"
                        />
                    </div>
                </div>
            </div>

            {/* --- MEDIA & VISUALS --- */}
            <div className="dash-card mb-4">
                <div className="dash-section-title mb-4">
                    <span>Company Media & Visuals</span>
                </div>

                <div className="premium-form-grid">

                    {/* Logo Upload */}
                    <div className="full-width">
                        <label className="small fw-bold text-muted d-block mb-3">Company Logo</label>
                        <div className="d-flex align-items-center gap-4 p-4 border rounded-4 bg-light shadow-sm">
                            <div className="position-relative">
                                <div className="overflow-hidden rounded-circle bg-white border shadow-inner" style={{ width: "120px", height: "120px" }}>
                                    {logoPreview ? (
                                        <img src={logoPreview} alt="Logo" className="w-100 h-100 object-fit-contain" />
                                    ) : (
                                        <div className="w-100 h-100 d-flex align-items-center justify-content-center text-muted">
                                            <FiImage size={40} />
                                        </div>
                                    )}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => logoInputRef.current.click()}
                                    className="premium-btn p-0 position-absolute bottom-0 end-0 shadow"
                                    style={{ width: "36px", height: "36px", borderRadius: '50%' }}
                                >
                                    <FiPlus />
                                </button>
                            </div>
                            <div className="flex-grow-1">
                                <h6 className="fw-bold mb-1 text-dark">Official Logo</h6>
                                <p className="small text-muted mb-3">Upload your high-resolution company mark.</p>
                                <button
                                    type="button"
                                    onClick={() => logoInputRef.current.click()}
                                    className="btn btn-outline-dark btn-sm rounded-pill px-4"
                                >
                                    Change Logo
                                </button>
                                <input
                                    type="file"
                                    ref={logoInputRef}
                                    onChange={handleLogoChange}
                                    className="d-none"
                                    accept="image/*"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Gallery Upload */}
                    <div className="full-width mt-2">
                        <label className="small fw-bold text-muted d-block mb-3">Portfolio & Workspace Gallery</label>
                        <div className="p-4 border rounded-4 bg-light shadow-sm">
                            <div className="d-flex flex-wrap gap-3 mb-3">
                                {formData.gallery.map((url, idx) => (
                                    <div key={idx} className="position-relative gallery-item shadow-sm" style={{ width: "140px", height: "100px" }}>
                                        <img src={url} alt="" className="w-100 h-100 object-fit-cover rounded-3 border" />
                                        <button
                                            type="button"
                                            onClick={() => removeExistingGalleryImage(url)}
                                            className="btn btn-danger btn-sm rounded-circle position-absolute top-0 end-0 m-1 shadow-sm opacity-0 remove-btn transition-all"
                                            style={{ width: "24px", height: "24px", padding: 0 }}
                                        >
                                            <FiX size={14} />
                                        </button>
                                    </div>
                                ))}
                                {galleryPreviews.map((preview, idx) => (
                                    <div key={`new-${idx}`} className="position-relative shadow-sm" style={{ width: "140px", height: "100px" }}>
                                        <img src={preview} alt="" className="w-100 h-100 object-fit-cover rounded-3 border border-primary" />
                                        <div className="position-absolute top-0 start-0 m-1 bg-primary text-white p-1 rounded-circle shadow" style={{ lineHeight: 1 }}>
                                            <FiCheckCircle size={12} />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeNewGalleryImage(idx)}
                                            className="btn btn-danger btn-sm rounded-circle position-absolute top-0 end-0 m-1 shadow-sm"
                                            style={{ width: "24px", height: "24px", padding: 0 }}
                                        >
                                            <FiX size={14} />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => galleryInputRef.current.click()}
                                    className="btn btn-outline-dashed d-flex flex-column align-items-center justify-content-center border-2 rounded-3 bg-white"
                                    style={{ width: "140px", height: "100px", borderStyle: "dashed" }}
                                >
                                    <FiPlus className="text-primary fs-4 mb-1" />
                                    <span className="small text-muted fw-bold">Add Photo</span>
                                </button>
                            </div>
                            <input
                                type="file"
                                ref={galleryInputRef}
                                onChange={handleGalleryChange}
                                className="d-none"
                                multiple
                                accept="image/*"
                            />
                        </div>
                    </div>

                    <div className="full-width">
                        <label className="small fw-bold text-muted">Core Services (Comma separated)</label>
                        <textarea
                            name="services"
                            value={formData.services}
                            onChange={handleChange}
                            className="premium-input"
                            rows="2"
                            placeholder="e.g. Property Management, Consulting, Sales"
                        />
                    </div>
                </div>
            </div>

            {/* --- LEADERSHIP TEAM --- */}
            <div className="dash-card mb-4">
                <div className="dash-section-title mb-4">
                    <span>Leadership Team</span>
                    <button type="button" onClick={addTeamMember} className="btn btn-sm btn-outline-primary rounded-pill px-3">
                        <FiPlus /> Add Member
                    </button>
                </div>

                <div className="premium-form-grid">
                    {formData.team.map((member, idx) => (
                        <div key={idx} className="full-width border rounded-4 p-4 bg-light shadow-sm position-relative">
                            <button
                                type="button"
                                onClick={() => removeTeamMember(idx)}
                                className="btn btn-outline-danger btn-sm rounded-circle position-absolute top-0 end-0 m-3 shadow-sm"
                                style={{ width: "32px", height: "32px", padding: 0 }}
                            >
                                <FiTrash size={14} />
                            </button>

                            <div className="row g-4 align-items-center">
                                <div className="col-auto">
                                    <div className="position-relative">
                                        <div className="overflow-hidden rounded-circle bg-white shadow-sm border" style={{ width: "100px", height: "100px" }}>
                                            {teamPreviews[idx] || member.image ? (
                                                <img src={teamPreviews[idx] || member.image} alt="Member" className="w-100 h-100 object-fit-cover" />
                                            ) : (
                                                <div className="w-100 h-100 d-flex align-items-center justify-content-center text-muted">
                                                    <FiUser size={30} />
                                                </div>
                                            )}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => teamInputRefs.current[idx].click()}
                                            className="premium-btn p-0 position-absolute bottom-0 end-0 shadow-sm"
                                            style={{ width: "30px", height: "30px", borderRadius: '50%' }}
                                        >
                                            <FiCamera size={14} />
                                        </button>
                                        <input
                                            type="file"
                                            ref={el => teamInputRefs.current[idx] = el}
                                            onChange={(e) => handleTeamImageChange(idx, e)}
                                            className="d-none"
                                            accept="image/*"
                                        />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="premium-form-grid m-0">
                                        <div>
                                            <label className="small fw-bold text-muted">Full Name</label>
                                            <input
                                                className="premium-input"
                                                placeholder="e.g. John Doe"
                                                value={member.name}
                                                onChange={(e) => updateTeamMember(idx, "name", e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="small fw-bold text-muted">Designation</label>
                                            <input
                                                className="premium-input"
                                                placeholder="e.g. CEO & Founder"
                                                value={member.role}
                                                onChange={(e) => updateTeamMember(idx, "role", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {formData.team.length === 0 && (
                        <div className="full-width text-center p-5 border rounded-4 bg-light border-dashed">
                            <FiUsers size={32} className="text-muted mb-3 opacity-25" />
                            <p className="small text-muted fw-bold">No leadership members added to the roster.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* --- STRATEGIC VISION --- */}
            <div className="dash-card mb-4">
                <div className="dash-section-title mb-4">
                    <span>Strategic Direction</span>
                </div>

                <div className="premium-form-grid">
                    <div className="full-width">
                        <label className="small fw-bold text-muted">Company Vision</label>
                        <textarea
                            name="vision"
                            value={formData.vision}
                            onChange={handleChange}
                            className="premium-input"
                            rows="4"
                            placeholder="Long-term goal and aspiration..."
                        />
                    </div>

                    <div className="full-width mt-3">
                        <label className="small fw-bold text-muted">Company Mission</label>
                        <textarea
                            name="mission"
                            value={formData.mission}
                            onChange={handleChange}
                            className="premium-input"
                            rows="4"
                            placeholder="Daily purpose and value delivery..."
                        />
                    </div>
                </div>
            </div>

            {/* --- WHY CHOOSE US --- */}
            <div className="dash-card mb-4">
                <div className="dash-section-title mb-4">
                    <span>Value Proposition (Why Choose Us)</span>
                    <button type="button" onClick={addChooseUs} className="premium-btn py-1 px-3 fs-13">
                        <FiPlus /> Add Reason
                    </button>
                </div>

                <div className="premium-form-grid">
                    {formData.chooseUs.map((reason, idx) => (
                        <div key={idx} className="full-width d-flex gap-2 align-items-center">
                            <input
                                className="premium-input"
                                placeholder="e.g. 24/7 Client Support"
                                value={reason}
                                onChange={(e) => updateChooseUs(idx, e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => removeChooseUs(idx)}
                                className="btn btn-outline-danger rounded-3"
                                style={{ height: '48px', width: '48px', flexShrink: 0 }}
                            >
                                <FiTrash size={16} />
                            </button>
                        </div>
                    ))}
                    {formData.chooseUs.length === 0 && (
                        <div className="full-width text-center p-4 border rounded-4 bg-light border-dashed">
                            <p className="small text-muted fw-bold mb-0">No value points defined yet.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* --- SUBMIT ACTIONS --- */}
            <div className="d-flex align-items-center justify-content-end gap-3 sticky-bottom py-3 pe-2 pointer-events-none" style={{ bottom: '20px', zIndex: 100 }}>
                {success && (
                    <div className="d-flex align-items-center gap-2 bg-white text-success px-4 py-2 rounded-pill shadow-lg border border-success animate-fade-in small fw-bold">
                        <FiCheckCircle /> <span>Changes saved successfully!</span>
                    </div>
                )}
                <button
                    type="submit"
                    className="premium-btn premium-btn-floating shadow-lg px-5 py-3 animate-bounce-in"
                    disabled={loading}
                >
                    <FiSave className={loading ? "animate-spin" : ""} />
                    {loading ? "Updating Profile..." : "Publish Profile Updates"}
                </button>
            </div>

            <style>{`
                .pointer-events-none { pointer-events: none; }
                .pointer-events-none > * { pointer-events: auto; }
                
                .premium-btn-floating {
                    border-radius: 99px !important;
                    background: linear-gradient(135deg, var(--dash-primary), var(--dash-primary-hover)) !important;
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
                    border: 2px solid rgba(255,255,255,0.2) !important;
                }

                .premium-btn-floating:hover {
                    transform: translateY(-5px) scale(1.05) !important;
                    box-shadow: 0 15px 30px rgba(0, 170, 108, 0.3) !important;
                }

                .premium-btn-floating:active {
                    transform: translateY(-2px) scale(0.98) !important;
                }

                .animate-spin {
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                .border-dashed { border-style: dashed !important; }
                .btn-outline-dashed {
                    border: 2px dashed #e5e7eb;
                    color: #9ca3af;
                    transition: all 0.2s;
                }
                .btn-outline-dashed:hover {
                    border-color: var(--dash-primary);
                    color: var(--dash-primary);
                    background: #f0fdf4;
                }
                .gallery-item:hover .remove-btn {
                    opacity: 1 !important;
                }
                .fs-13 { font-size: 13px !important; }
                .shadow-inner { box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05); }
            `}</style>
        </form>
    );
};

export default CompanyProfile;
