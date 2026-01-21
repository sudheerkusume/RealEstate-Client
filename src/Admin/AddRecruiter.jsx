import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loginStatus } from "../App";
import {
    FiUser,
    FiMail,
    FiPhone,
    FiBriefcase,
    FiLock,
    FiShield,
    FiCheckCircle,
    FiAlertCircle,
    FiPlus,
    FiUsers
} from "react-icons/fi";

const AddRecruiter = () => {
    const navigate = useNavigate();
    const [token] = useContext(loginStatus);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        department: "",
        password: "",
        confirmPassword: "",
        permissions: {
            postJobs: true,
            viewApplications: true,
            manageJobs: false,
            manageRecruiters: false,
        },
    });

    useEffect(() => {
        if (!token) {
            navigate("/admin");
        }
    }, [token, navigate]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    const handlePermission = (key) => {
        setForm({
            ...form,
            permissions: {
                ...form.permissions,
                [key]: !form.permissions[key],
            },
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            setLoading(true);
            await axios.post(
                "https://realestate-server-9xji.onrender.com/admin/create-recruiter",
                form,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSuccess(true);
            setForm({
                name: "",
                email: "",
                phone: "",
                department: "",
                password: "",
                confirmPassword: "",
                permissions: {
                    postJobs: true,
                    viewApplications: true,
                    manageJobs: false,
                    manageRecruiters: false,
                },
            });

            setTimeout(() => setSuccess(false), 5000);

        } catch (err) {
            setError(err.response?.data?.message || "Error creating recruiter. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="animate-fade-in">
            <div className="admin-view-header">
                <div className="admin-view-title">
                    <h3>Recruiter Management</h3>
                    <p>Onboard and manage access for system recruiters</p>
                </div>
            </div>

            <div className="row g-4">
                <div className="col-lg-8">
                    <div className="dash-card h-100">
                        <div className="d-flex align-items-center gap-2 mb-4">
                            <div className="portfolio-icon bg-success" style={{ width: '40px', height: '40px', borderRadius: '12px' }}>
                                <FiPlus color="white" />
                            </div>
                            <h5 className="mb-0 fw-bold">Add New Recruiter</h5>
                        </div>

                        {error && (
                            <div className="alert alert-danger d-flex align-items-center gap-2 border-0 rounded-4 mb-4">
                                <FiAlertCircle /> {error}
                            </div>
                        )}

                        {success && (
                            <div className="alert alert-success d-flex align-items-center gap-2 border-0 rounded-4 mb-4">
                                <FiCheckCircle /> Recruiter created successfully!
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="premium-form-grid">
                                <div className="form-group mb-3">
                                    <label className="form-label fw-bold text-muted mb-2 small text-uppercase">Full Name</label>
                                    <div className="position-relative">
                                        <FiUser className="position-absolute translate-middle-y top-50 start-0 ms-3 text-muted" />
                                        <input
                                            className="premium-input ps-5"
                                            placeholder="John Doe"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group mb-3">
                                    <label className="form-label fw-bold text-muted mb-2 small text-uppercase">Email Address</label>
                                    <div className="position-relative">
                                        <FiMail className="position-absolute translate-middle-y top-50 start-0 ms-3 text-muted" />
                                        <input
                                            className="premium-input ps-5"
                                            placeholder="recruiter@example.com"
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group mb-3">
                                    <label className="form-label fw-bold text-muted mb-2 small text-uppercase">Phone Number</label>
                                    <div className="position-relative">
                                        <FiPhone className="position-absolute translate-middle-y top-50 start-0 ms-3 text-muted" />
                                        <input
                                            className="premium-input ps-5"
                                            placeholder="+91 1234567890"
                                            name="phone"
                                            value={form.phone}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group mb-3">
                                    <label className="form-label fw-bold text-muted mb-2 small text-uppercase">Department</label>
                                    <div className="position-relative">
                                        <FiBriefcase className="position-absolute translate-middle-y top-50 start-0 ms-3 text-muted" />
                                        <select
                                            className="premium-input ps-5 appearance-none"
                                            name="department"
                                            value={form.department}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select Department</option>
                                            <option>HR & Recruitment</option>
                                            <option>Operations</option>
                                            <option>Sales & Marketing</option>
                                            <option>Technical Hiring</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group mb-3">
                                    <label className="form-label fw-bold text-muted mb-2 small text-uppercase">Password</label>
                                    <div className="position-relative">
                                        <FiLock className="position-absolute translate-middle-y top-50 start-0 ms-3 text-muted" />
                                        <input
                                            type="password"
                                            className="premium-input ps-5"
                                            placeholder="••••••••"
                                            name="password"
                                            value={form.password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group mb-3">
                                    <label className="form-label fw-bold text-muted mb-2 small text-uppercase">Confirm Password</label>
                                    <div className="position-relative">
                                        <FiLock className="position-absolute translate-middle-y top-50 start-0 ms-3 text-muted" />
                                        <input
                                            type="password"
                                            className="premium-input ps-5"
                                            placeholder="••••••••"
                                            name="confirmPassword"
                                            value={form.confirmPassword}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="full-width mt-4">
                                    <div className="p-4 rounded-4 bg-light border">
                                        <div className="d-flex align-items-center gap-2 mb-3 text-dark">
                                            <FiShield className="text-primary" />
                                            <h6 className="mb-0 fw-bold">Access Permissions</h6>
                                        </div>
                                        <div className="row g-3">
                                            {Object.keys(form.permissions).map((key) => (
                                                <div className="col-md-6" key={key}>
                                                    <div className="dash-card p-3 d-flex align-items-center justify-content-between mb-0 border-0 shadow-none bg-white">
                                                        <span className="fw-600 text-muted" style={{ fontSize: '14px' }}>
                                                            {key.replace(/([A-Z])/g, " $1")}
                                                        </span>
                                                        <div className="form-check form-switch m-0">
                                                            <input
                                                                className="form-check-input cursor-pointer"
                                                                type="checkbox"
                                                                role="switch"
                                                                checked={form.permissions[key]}
                                                                onChange={() => handlePermission(key)}
                                                                id={`perm-${key}`}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5 d-flex justify-content-end">
                                <button
                                    className="premium-btn px-5"
                                    disabled={loading}
                                    style={{ minWidth: '220px' }}
                                >
                                    {loading ? (
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                    ) : (
                                        <FiPlus className="me-2" />
                                    )}
                                    {loading ? "Onboarding..." : "Onboard Recruiter"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="dash-card bg-primary text-white mb-4 overflow-hidden position-relative border-0 shadow-lg" style={{ background: 'linear-gradient(135deg, var(--dash-primary) 0%, #008f5b 100%)' }}>
                        <div className="position-relative z-index-1">
                            <h5 className="fw-bold mb-3">Why add recruiters?</h5>
                            <p className="opacity-75 mb-4" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                                Empower your team to manage job listings and candidate applications independently while maintaining oversight.
                            </p>
                            <div className="d-flex flex-column gap-3">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="bg-white bg-opacity-25 rounded-circle p-1"><FiCheckCircle size={14} /></div>
                                    <span style={{ fontSize: '14px' }}>Delegated job posting</span>
                                </div>
                                <div className="d-flex align-items-center gap-3">
                                    <div className="bg-white bg-opacity-25 rounded-circle p-1"><FiCheckCircle size={14} /></div>
                                    <span style={{ fontSize: '14px' }}>Direct application tracking</span>
                                </div>
                                <div className="d-flex align-items-center gap-3">
                                    <div className="bg-white bg-opacity-25 rounded-circle p-1"><FiCheckCircle size={14} /></div>
                                    <span style={{ fontSize: '14px' }}>Department-wise isolation</span>
                                </div>
                            </div>
                        </div>
                        <FiUsers className="position-absolute" style={{ right: '-30px', bottom: '-20px', fontSize: '180px', opacity: '0.1' }} />
                    </div>

                    <div className="dash-card border-dashed d-flex flex-column align-items-center justify-content-center text-center p-5 bg-white border-2" style={{ borderStyle: 'dashed', borderColor: '#e5e7eb' }}>
                        <div className="portfolio-icon bg-light text-muted mb-3" style={{ width: '64px', height: '64px', borderRadius: '18px' }}>
                            <FiShield size={32} />
                        </div>
                        <h6 className="fw-bold text-dark mb-2">Security First</h6>
                        <p className="text-muted small mb-0 px-2" style={{ lineHeight: '1.5' }}>
                            All recruiters are logged and their actions are tracked for security auditing and compliance.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddRecruiter;
