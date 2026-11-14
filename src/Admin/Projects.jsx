/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import api from "../config/api";
import {
    BsPlusCircle,
    BsTrash,
    BsUpload,
    BsCheckCircleFill
} from "react-icons/bs";

const Projects = ({ user }) => {
    const [formData, setFormData] = useState({
        companyId: "",
        title: "",
        subtitle: "",
        description: "",
        price: "",
        completion: "",
        paymentPlan: "",
        apartments: "",
        bedrooms: "",
        location: "",
        locationDescription: "",
        mapEmbedLink: "",
        virtualTourLink: ""
    });

    const [companies, setCompanies] = useState([]);
    const [heroVideo, setHeroVideo] = useState(null);
    const [backgroundImages, setBackgroundImages] = useState([]);
    const [gallery, setGallery] = useState([]);
    const [amenitiesGallery, setAmenitiesGallery] = useState([]);
    const [amenitiesBackground, setAmenitiesBackground] = useState(null);
    const [amenities, setAmenities] = useState([""]);
    const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);
    const [brochure, setBrochure] = useState(null);
    const [connectivity, setConnectivity] = useState([
        { label: "", value: "", iconType: "default" }
    ]);
    // Helper to handle multiple file selection (append instead of replace)
    const handleFileAppend = (e, setter, currentFiles) => {
        const selectedFiles = Array.from(e.target.files);
        setter([...currentFiles, ...selectedFiles]);
    };

    const removeFile = (index, setter, currentFiles) => {
        setter(currentFiles.filter((_, i) => i !== index));
    };

    const addConnectivity = () => setConnectivity([...connectivity, { label: "", value: "", iconType: "default" }]);
    const removeConnectivity = (index) => setConnectivity(connectivity.filter((_, i) => i !== index));
    const handleConnectivityChange = (index, field, value) => {
        const updated = [...connectivity];
        updated[index][field] = value;
        setConnectivity(updated);
    };

    // Fetch Companies (Fallback if no user prop)
    useEffect(() => {
        if (!user?._id) {
            api.get("/companies")
                .then(res => {
                    if (Array.isArray(res.data)) {
                        setCompanies(res.data);
                    }
                })
                .catch(err => console.error("Error fetching companies:", err));
        }
    }, [user]);

    // Auto-fill companyId from logged in user
    useEffect(() => {
        if (user?._id) {
            setFormData(prev => ({ ...prev, companyId: user._id }));
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const addAmenity = () => setAmenities([...amenities, ""]);
    const removeAmenity = (index) => setAmenities(amenities.filter((_, i) => i !== index));
    const handleAmenityChange = (index, value) => {
        const updated = [...amenities];
        updated[index] = value;
        setAmenities(updated);
    };

    const addFaq = () => setFaqs([...faqs, { question: "", answer: "" }]);
    const removeFaq = (index) => setFaqs(faqs.filter((_, i) => i !== index));
    const handleFaqChange = (index, field, value) => {
        const updated = [...faqs];
        updated[index][field] = value;
        setFaqs(updated);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            Object.keys(formData).forEach(key => data.append(key, formData[key]));
            data.append("amenities", JSON.stringify(amenities.filter(a => a.trim() !== "")));
            data.append("faqs", JSON.stringify(faqs.filter(f => f.question.trim() !== "")));
            data.append("connectivity", JSON.stringify(connectivity.filter(c => c.label.trim() !== "")));

            if (heroVideo) data.append("heroVideo", heroVideo);
            if (brochure) data.append("brochure", brochure);
            if (amenitiesBackground) data.append("amenitiesBackground", amenitiesBackground);
            backgroundImages.forEach(img => data.append("backgroundImages", img));
            gallery.forEach(img => data.append("gallery", img));
            amenitiesGallery.forEach(img => data.append("amenitiesGallery", img));

            await api.post("/projects", data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            alert("Success! The project has been added. 🌟");
            window.location.reload();

        } catch (err) {
            console.error("Error adding project:", err);
            const data = err.response?.data;
            const errorMsg = data?.message || "Something went wrong.";
            const detailMsg = data?.error ? `\n\nDetail: ${data.error}` : ""; // Show the specific Cloudinary error

            alert(`Error adding project: ${errorMsg}${detailMsg}\n\nPlease check your file sizes and Cloudinary settings.`);
        }
    };

    return (
        <div className="neo-container py-5 animate-fade-in">
            {/* Header Section */}
            <div className="text-center mb-5">
                <h1 className="display-4 fw-bold mb-2 neo-text-gradient">Publish New Property</h1>
                <p className="text-muted fs-5">Craft a stunning presence for your next real estate masterpiece.</p>
            </div>

            <form onSubmit={handleSubmit} className="neo-form">

                {/* STEP 1: WHO IS BUILDING IT? */}
                <div className="neo-card mb-5">
                    <div className="neo-card-header">
                        <div className="neo-icon-circle bg-primary text-white">
                            <BsCheckCircleFill />
                        </div>
                        <div className="neo-header-info">
                            <h4 className="mb-0 fw-bold">Job Identity</h4>
                            <p className="mb-0 text-muted fs-13">📝 Basic details about the company and the role</p>
                        </div>
                    </div>

                    <div className="neo-card-body">
                        <div className="row g-4">
                            {/* Company Selection */}
                            <div className="col-lg-6">
                                <label className="neo-label">
                                    <span className="neo-emoji"></span> Company Identity *
                                </label>
                                <div className="neo-input-wrapper">
                                    {user?._id ? (
                                        <div className="neo-inner-card bg-white border-0 py-3 px-4 d-flex align-items-center gap-3">
                                            {/* <div className="neo-icon-circle bg-primary text-white" style={{ width: '45px', height: '45px', fontSize: '18px', borderRadius: '12px' }}>

                                            </div> */}
                                            <div>
                                                <div className="fw-bold text-dark fs-5">{user.name}</div>
                                                <div className="text-muted small text-uppercase fw-semibold tracking-wider" style={{ fontSize: '10px', letterSpacing: '1px' }}>
                                                    Verified Project Developer
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <select
                                                name="companyId"
                                                className="neo-input"
                                                value={formData.companyId}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Select Company</option>
                                                {companies.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                                            </select>
                                            <div className="neo-input-hint">Select the branding company for this project</div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Category Select (Placeholder as per image) */}
                            <div className="col-lg-6">
                                <label className="neo-label">
                                    <span className="neo-emoji">📂</span> Category *
                                </label>
                                <div className="neo-input-wrapper">
                                    <select className="neo-input">
                                        <option value="">Select Category</option>
                                        <option value="Residential">Residential</option>
                                        <option value="Commercial">Commercial</option>
                                        <option value="Luxury">Luxury</option>
                                    </select>
                                </div>
                            </div>

                            {/* Project Title */}
                            <div className="col-12 mt-5">
                                <div className="neo-inner-card">
                                    <label className="neo-label neo-label-sm">
                                        <span className="neo-emoji text-danger">✏️</span> Job Title *
                                        <span className="text-muted fw-normal ms-2">— What Is The Job Called?</span>
                                    </label>
                                    <div className="neo-input-pill-wrapper">
                                        <input
                                            className="neo-input-pill"
                                            name="title"
                                            placeholder="e.g. Senior Real Estate Consultant"
                                            value={formData.title}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Subtitle / Location Tagline */}
                            <div className="col-md-12">
                                <label className="neo-label">
                                    <span className="neo-emoji">🎯</span> Area / Location Sub-title
                                </label>
                                <input
                                    className="neo-input"
                                    name="subtitle"
                                    placeholder="e.g. Near Dubai Mall"
                                    value={formData.subtitle}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Description */}
                            <div className="col-12">
                                <label className="neo-label">
                                    <span className="neo-emoji">📖</span> Write a description (About the project) *
                                </label>
                                <textarea
                                    className="neo-input p-4"
                                    name="description"
                                    rows="5"
                                    placeholder="Tell people why they should buy this property..."
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* STEP 2: PRICE & SPECS */}
                <div className="neo-card mb-5">
                    <div className="neo-card-header">
                        <div className="neo-icon-circle bg-info text-white">
                            <span className="fw-bold">₹</span>
                        </div>
                        <div className="neo-header-info">
                            <h4 className="mb-0 fw-bold">Price & Technical Details</h4>
                            <p className="mb-0 text-muted fs-13">⚙️ Essential metrics for the property</p>
                        </div>
                    </div>
                    <div className="neo-card-body">
                        <div className="row g-4">
                            <div className="col-md-6">
                                <label className="neo-label">
                                    <span className="neo-emoji">💰</span> Starting Price *
                                </label>
                                <div className="neo-input-group">
                                    <span className="neo-input-group-text">₹ INR</span>
                                    <input className="neo-input" name="price" placeholder="e.g. 5,000,000" value={formData.price} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label className="neo-label">
                                    <span className="neo-emoji">📅</span> Completion Date
                                </label>
                                <input className="neo-input" name="completion" placeholder="e.g. Mid-2027" value={formData.completion} onChange={handleChange} />
                            </div>
                            <div className="col-md-6">
                                <label className="neo-label">
                                    <span className="neo-emoji">🛏️</span> Bedroom Specs
                                </label>
                                <input className="neo-input" name="bedrooms" placeholder="e.g. 1 & 2 Bedrooms" value={formData.bedrooms} onChange={handleChange} />
                            </div>
                            <div className="col-md-6">
                                <label className="neo-label">
                                    <span className="neo-emoji">📐</span> Area / Sq.Ft
                                </label>
                                <input className="neo-input" name="apartments" placeholder="e.g. 800 - 1500 Sq.Ft" value={formData.apartments} onChange={handleChange} />
                            </div>
                            <div className="col-12">
                                <label className="neo-label">
                                    <span className="neo-emoji">💳</span> Payment Plan Details
                                </label>
                                <input className="neo-input" name="paymentPlan" placeholder="e.g. Pay 1% every month" value={formData.paymentPlan} onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* STEP 2.5: CONNECTIVITY & LANDMARKS */}
                <div className="neo-card mb-5">
                    <div className="neo-card-header">
                        <div className="neo-icon-circle bg-dark text-white">
                            <span className="fw-bold">+</span>
                        </div>
                        <div className="neo-header-info">
                            <h4 className="mb-0 fw-bold">Connectivity & Landmarks</h4>
                            <p className="mb-0 text-muted fs-13">📍 Nearby locations and commute times</p>
                        </div>
                    </div>
                    <div className="neo-card-body">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5 className="mb-0 fw-bold text-primary small text-uppercase tracking-wider">Nearby Locations & Distances</h5>
                            <button type="button" onClick={addConnectivity} className="premium-btn py-2 px-4 rounded-pill">Add Landmark +</button>
                        </div>
                        <div className="row g-4">
                            {connectivity.map((item, i) => (
                                <div className="col-12" key={i}>
                                    <div className="neo-inner-card position-relative p-4">
                                        <button type="button" className="btn btn-sm text-danger position-absolute top-0 end-0 m-3" onClick={() => removeConnectivity(i)}><BsTrash /></button>
                                        <div className="row g-4">
                                            <div className="col-md-4">
                                                <label className="neo-label neo-label-sm">Label</label>
                                                <input className="neo-input" placeholder="Metro Station" value={item.label} onChange={(e) => handleConnectivityChange(i, "label", e.target.value)} />
                                            </div>
                                            <div className="col-md-4">
                                                <label className="neo-label neo-label-sm">Time/Distance</label>
                                                <input className="neo-input" placeholder="5 Mins Drive" value={item.value} onChange={(e) => handleConnectivityChange(i, "value", e.target.value)} />
                                            </div>
                                            <div className="col-md-4">
                                                <label className="neo-label neo-label-sm">Icon Type</label>
                                                <select className="neo-input" value={item.iconType} onChange={(e) => handleConnectivityChange(i, "iconType", e.target.value)}>
                                                    <option value="default">Default</option>
                                                    <option value="metro">Metro / Train</option>
                                                    <option value="mall">Shopping / Mall</option>
                                                    <option value="road">Road / Highway</option>
                                                    <option value="park">Park / Nature</option>
                                                    <option value="hospital">Hospital / Clinic</option>
                                                    <option value="airport">Airport</option>
                                                    <option value="school">School / Education</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* STEP 3: WHERE IS IT? */}
                <div className="neo-card mb-5">
                    <div className="neo-card-header">
                        <div className="neo-icon-circle bg-success text-white">
                            <span className="fw-bold">3</span>
                        </div>
                        <div className="neo-header-info">
                            <h4 className="mb-0 fw-bold">Location & Map</h4>
                            <p className="mb-0 text-muted fs-13">🌏 Mapping the exact address and virtual tour</p>
                        </div>
                    </div>
                    <div className="neo-card-body">
                        <div className="row g-4">
                            <div className="col-12">
                                <label className="neo-label">
                                    <span className="neo-emoji">🎯</span> Final Location Name
                                </label>
                                <input className="neo-input" name="location" placeholder="e.g. Downtown Dubai" value={formData.location} onChange={handleChange} />
                            </div>
                            <div className="col-12">
                                <label className="neo-label">
                                    <span className="neo-emoji">🌆</span> Nearby Places (Location Advantages)
                                </label>
                                <textarea className="neo-input" name="locationDescription" rows="2" placeholder="List top 3 nearby places..." value={formData.locationDescription} onChange={handleChange} />
                            </div>
                            <div className="col-md-6">
                                <label className="neo-label">
                                    <span className="neo-emoji">🗺️</span> Map Embed Code/Link
                                </label>
                                <input className="neo-input" name="mapEmbedLink" placeholder="Paste map link here" value={formData.mapEmbedLink} onChange={handleChange} />
                            </div>
                            <div className="col-md-6">
                                <label className="neo-label">
                                    <span className="neo-emoji">📹</span> Youtube / 3D Tour Link
                                </label>
                                <input className="neo-input" name="virtualTourLink" placeholder="Link to video or virtual tour" value={formData.virtualTourLink} onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* STEP 4: VIDEOS & PHOTOS */}
                <div className="neo-card mb-5">
                    <div className="neo-card-header">
                        <div className="neo-icon-circle bg-warning text-dark">
                            <span className="fw-bold">4</span>
                        </div>
                        <div className="neo-header-info">
                            <h4 className="mb-0 fw-bold">Upload Media Files</h4>
                            <p className="mb-0 text-muted fs-13">📸 High-quality visuals for your project</p>
                        </div>
                    </div>
                    <div className="neo-card-body">
                        <div className="row g-5">
                            <div className="col-md-6">
                                <div className="neo-upload-card h-100">
                                    <BsUpload className="neo-upload-icon text-primary" />
                                    <label className="fw-bold d-block mb-2">Main Header Video</label>
                                    <input type="file" className="neo-file-input" onChange={(e) => setHeroVideo(e.target.files[0])} />
                                    {heroVideo && <p className="mt-2 text-success small fw-bold">Ready: {heroVideo.name}</p>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="neo-upload-card h-100">
                                    <BsUpload className="neo-upload-icon text-info" />
                                    <label className="fw-bold d-block mb-2">Features Background</label>
                                    <input type="file" className="neo-file-input" onChange={(e) => setAmenitiesBackground(e.target.files[0])} />
                                    {amenitiesBackground && <p className="mt-2 text-success small fw-bold">Ready: {amenitiesBackground.name}</p>}
                                </div>
                            </div>

                            {/* PARALLAX BACKGROUND IMAGES */}
                            <div className="col-12 mt-4">
                                <label className="neo-label">
                                    <span className="neo-emoji">✨</span> Parallax Background Images (Scroll Effect)
                                </label>
                                <div className="d-flex flex-wrap gap-4 mt-3">
                                    {backgroundImages.map((file, index) => (
                                        <div key={index} className="neo-preview-wrapper shadow-lg">
                                            <img src={URL.createObjectURL(file)} alt="Preview" className="neo-preview-img" />
                                            <button type="button" className="neo-remove-btn" onClick={() => removeFile(index, setBackgroundImages, backgroundImages)}><BsTrash size={12} /></button>
                                        </div>
                                    ))}
                                    <label className="neo-add-media-btn">
                                        <BsPlusCircle className="fs-3 mb-1" />
                                        <span className="fw-bold fs-10">Add Photo</span>
                                        <input type="file" multiple className="d-none" onChange={(e) => handleFileAppend(e, setBackgroundImages, backgroundImages)} />
                                    </label>
                                </div>
                            </div>

                            {/* GALLERY IMAGES */}
                            <div className="col-12 mt-4">
                                <label className="neo-label">
                                    <span className="neo-emoji">🖼️</span> Multiple Project Photos (Gallery)
                                </label>
                                <div className="d-flex flex-wrap gap-4 mt-3">
                                    {gallery.map((file, index) => (
                                        <div key={index} className="neo-preview-wrapper shadow-lg">
                                            <img src={URL.createObjectURL(file)} alt="Gallery" className="neo-preview-img" />
                                            <button type="button" className="neo-remove-btn" onClick={() => removeFile(index, setGallery, gallery)}><BsTrash size={12} /></button>
                                        </div>
                                    ))}
                                    <label className="neo-add-media-btn">
                                        <BsPlusCircle className="fs-3 mb-1" />
                                        <span className="fw-bold fs-10">Add Photo</span>
                                        <input type="file" multiple className="d-none" onChange={(e) => handleFileAppend(e, setGallery, gallery)} />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* STEP 5: AMENITIES & QUESTIONS */}
                <div className="neo-card mb-5">
                    <div className="neo-card-header">
                        <div className="neo-icon-circle bg-danger text-white">
                            <span className="fw-bold">5</span>
                        </div>
                        <div className="neo-header-info">
                            <h4 className="mb-0 fw-bold">Amenities & Questions</h4>
                            <p className="mb-0 text-muted fs-13">💆‍♂️ Luxury features and common inquiries</p>
                        </div>
                    </div>
                    <div className="neo-card-body">
                        {/* Amenities */}
                        <div className="mb-5 pb-5 border-bottom border-light">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h5 className="mb-0 fw-bold neo-text-gradient small text-uppercase">Property Amenities</h5>
                                <button type="button" onClick={addAmenity} className="premium-btn py-2 px-4 rounded-pill">Add Amenity +</button>
                            </div>
                            <div className="row g-4">
                                {amenities.map((a, i) => (
                                    <div className="col-md-6 col-lg-4" key={i}>
                                        <div className="neo-input-group">
                                            <input className="neo-input" placeholder="e.g. Gym, Pool" value={a} onChange={(e) => handleAmenityChange(i, e.target.value)} />
                                            <button type="button" className="btn text-danger shadow-none" onClick={() => removeAmenity(i)}><BsTrash /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* FAQs */}
                        <div>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h5 className="mb-0 fw-bold neo-text-gradient small text-uppercase">Frequently Asked Questions</h5>
                                <button type="button" onClick={addFaq} className="premium-btn py-2 px-4 rounded-pill">Add FAQ +</button>
                            </div>
                            {faqs.map((faq, i) => (
                                <div key={i} className="neo-inner-card p-4 mb-4 position-relative">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h6 className="mb-0 fw-bold text-dark opacity-75">Question #{i + 1}</h6>
                                        <button type="button" className="btn btn-sm text-danger shadow-none fw-bold" onClick={() => removeFaq(i)}>Delete X</button>
                                    </div>
                                    <div className="row g-4">
                                        <div className="col-12">
                                            <label className="neo-label neo-label-sm">Question</label>
                                            <input className="neo-input" placeholder="e.g. Is it freehold?" value={faq.question} onChange={(e) => handleFaqChange(i, "question", e.target.value)} />
                                        </div>
                                        <div className="col-12">
                                            <label className="neo-label neo-label-sm">Answer</label>
                                            <textarea className="neo-input" rows="2" placeholder="Explain the answer clearly..." value={faq.answer} onChange={(e) => handleFaqChange(i, "answer", e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* STEP 6: BROCHURE UPLOAD */}
                <div className="neo-card mb-5">
                    <div className="neo-card-header">
                        <div className="neo-icon-circle bg-success text-white">
                            <span className="fw-bold">6</span>
                        </div>
                        <div className="neo-header-info">
                            <h4 className="mb-0 fw-bold">Project Brochure</h4>
                            <p className="mb-0 text-muted fs-13">📄 Essential documents for download</p>
                        </div>
                    </div>
                    <div className="neo-card-body p-5">
                        <div className="neo-upload-card-lg p-5">
                            <BsUpload className="neo-upload-icon-lg text-success mb-4" />
                            <h5 className="fw-bold mb-3">Upload Project Brochure (PDF)</h5>
                            <p className="text-muted small mb-4">Deliver clarity to your customers with a detailed company brochure.</p>
                            <div className="neo-input-pill-wrapper max-w-400 mx-auto">
                                <input type="file" className="neo-file-input" onChange={(e) => setBrochure(e.target.files[0])} accept=".pdf,.doc,.docx" />
                            </div>
                            {brochure && (
                                <div className="mt-4 neo-inner-card p-3 d-inline-flex align-items-center gap-3 shadow-sm border-success">
                                    <BsCheckCircleFill className="text-success" />
                                    <span className="fw-bold text-success small">{brochure.name}</span>
                                    <button type="button" className="btn btn-sm text-danger p-0" onClick={() => setBrochure(null)}>Remove</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Submit Section */}
                <div className="text-center mt-5 mb-5 pb-5">
                    <button type="submit" className="premium-btn py-4 px-5 rounded-pill shadow-lg border-0 fw-bold hover-scale-up" style={{ fontSize: '22px' }}>
                        🚀 PUBLISH THIS PROPERTY
                    </button>
                    <p className="mt-4 text-muted small fw-bold text-uppercase tracking-widest opacity-50">Authorized by Admin Panel</p>
                </div>

            </form>
            <style>{`
                .neo-container {
                    background-color: #f8fafc;
                    min-height: 100vh;
                    font-family: 'Inter', sans-serif;
                }
                .neo-text-gradient {
                    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .neo-card {
                    background: #ffffff;
                    border-radius: 24px;
                    border: 1px solid rgba(255,255,255,0.3);
                    box-shadow: 20px 20px 60px #d1d9e6, -20px -20px 60px #ffffff;
                    overflow: hidden;
                    transition: transform 0.3s ease;
                }
                .neo-card-header {
                    padding: 30px;
                    background: rgba(255,255,255,0.5);
                    border-bottom: 1px solid #f1f5f9;
                    display: flex;
                    align-items: center;
                    gap: 20px;
                }
                .neo-icon-circle {
                    width: 50px;
                    height: 50px;
                    border-radius: 15px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                    box-shadow: 4px 4px 10px rgba(0,0,0,0.1);
                }
                .neo-card-body {
                    padding: 40px;
                }
                .neo-inner-card {
                    background: #f1f5f9;
                    border-radius: 20px;
                    padding: 25px;
                    box-shadow: inset 6px 6px 12px #d1d9e6, inset -6px -6px 12px #ffffff;
                }
                .neo-label {
                    display: block;
                    font-weight: 700;
                    color: #475569;
                    margin-bottom: 12px;
                    font-size: 15px;
                }
                .neo-label-sm {
                    font-size: 13px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                .neo-emoji {
                    margin-right: 8px;
                    font-style: normal;
                }
                .neo-input-wrapper {
                    position: relative;
                }
                .neo-input {
                    width: 100%;
                    padding: 15px 20px;
                    border-radius: 15px;
                    border: 1px solid #e2e8f0;
                    background: #ffffff;
                    color: #1e293b;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    box-shadow: 4px 4px 8px #d1d9e6, -4px -4px 8px #ffffff;
                }
                .neo-input:focus {
                    outline: none;
                    border-color: #4f46e5;
                    box-shadow: inset 4px 4px 8px #d1d9e6, inset -4px -4px 8px #ffffff;
                }
                .neo-input-pill-wrapper {
                    background: #ffffff;
                    border-radius: 99px;
                    padding: 10px;
                    box-shadow: 6px 6px 12px #d1d9e6, -6px -6px 12px #ffffff;
                }
                .neo-input-pill {
                    width: 100%;
                    padding: 12px 25px;
                    border: none;
                    background: transparent;
                    font-size: 18px;
                    font-weight: 600;
                    color: #475569;
                }
                .neo-input-pill:focus {
                    outline: none;
                }
                .neo-input-hint {
                    font-size: 12px;
                    color: #6366f1;
                    font-weight: 600;
                    margin-top: 8px;
                    padding-left: 5px;
                }
                .neo-input-group {
                    display: flex;
                    align-items: center;
                    background: #ffffff;
                    border-radius: 15px;
                    padding-right: 15px;
                    box-shadow: 4px 4px 8px #d1d9e6, -4px -4px 8px #ffffff;
                }
                .neo-input-group-text {
                    padding: 15px 20px;
                    background: #f1f5f9;
                    border-radius: 15px 0 0 15px;
                    font-weight: 800;
                    color: #64748b;
                    font-size: 13px;
                }
                .neo-input-group .neo-input {
                    box-shadow: none;
                    border: none;
                }
                .neo-upload-card {
                    background: #ffffff;
                    border: 2px dashed #e2e8f0;
                    border-radius: 20px;
                    padding: 30px;
                    text-align: center;
                    transition: all 0.3s ease;
                    cursor: pointer;
                }
                .neo-upload-card:hover {
                    border-color: #4f46e5;
                    background: #f5f3ff;
                }
                .neo-upload-icon {
                    font-size: 40px;
                    margin-bottom: 15px;
                    opacity: 0.7;
                }
                .neo-file-input {
                    font-size: 13px;
                    color: #64748b;
                }
                .neo-preview-wrapper {
                    width: 100px;
                    height: 100px;
                    position: relative;
                    border-radius: 15px;
                    overflow: hidden;
                }
                .neo-preview-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .neo-remove-btn {
                    position: absolute;
                    top: 5px;
                    right: 5px;
                    background: rgba(239, 68, 68, 0.9);
                    color: white;
                    border: none;
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .neo-add-media-btn {
                    width: 100px;
                    height: 100px;
                    border: 2px dashed #cbd5e1;
                    border-radius: 15px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    color: #94a3b8;
                    transition: all 0.2s;
                }
                .neo-add-media-btn:hover {
                    border-color: #4f46e5;
                    color: #4f46e5;
                    background: #f5f3ff;
                }
                .fs-13 { font-size: 13px !important; }
                .fs-10 { font-size: 10px !important; }
                .max-w-400 { max-width: 400px; }
            `}</style>
        </div>
    );
};

export default Projects;
