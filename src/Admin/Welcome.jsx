import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { loginStatus } from "../App";
import {
    FiUsers,
    FiCheckCircle,
    FiXCircle,
    FiClock,
    FiArrowRight,
    FiExternalLink
} from "react-icons/fi";

const Welcome = () => {
    const [token] = useContext(loginStatus);
    const [stats, setStats] = useState({
        total: 0,
        shortlisted: 0,
        selected: 0,
        rejected: 0
    });
    const [recentApplications, setRecentApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) return;

        const fetchData = async () => {
            try {
                const [statsRes, appsRes] = await Promise.all([
                    axios.get("https://realestate-server-9xji.onrender.com/admin/dashboard-stats", {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    axios.get("https://realestate-server-9xji.onrender.com/admin/applications", {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                ]);

                setStats(statsRes.data);
                const sortedApps = (appsRes.data || [])
                    .sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt))
                    .slice(0, 5);
                setRecentApplications(sortedApps);
                setLoading(false);
            } catch (err) {
                console.error("Dashboard data error:", err);
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "40vh" }}>
                <div className="spinner-border text-primary shadow-sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    const statCards = [
        { label: "Total Applications", value: stats.total, icon: <FiClock />, color: "#4f46e5", bg: "#eef2ff" },
        { label: "Shortlisted", value: stats.shortlisted, icon: <FiUsers />, color: "#ca8a04", bg: "#fefce8" },
        { label: "Selected", value: stats.selected, icon: <FiCheckCircle />, color: "#16a34a", bg: "#f0fdf4" },
        { label: "Rejected", value: stats.rejected, icon: <FiXCircle />, color: "#dc2626", bg: "#fef2f2" },
    ];

    return (
        <div className="animate-fade-in p-1">
            <div className="mb-4">
                <h3 className="fw-bold text-dark mb-1">Performance Overview</h3>
                <p className="text-muted" style={{ fontSize: '16px' }}>Track your recruitment progress at a glance</p>
            </div>

            {/* Stats Grid */}
            <div className="row g-4 mb-5">
                {statCards.map((card, idx) => (
                    <div className="col-12 col-md-6 col-lg-3" key={idx}>
                        <div className="card border-0 shadow-sm rounded-4 p-4 h-100 transition-hover">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <div className="p-3 rounded-3" style={{ backgroundColor: card.bg, color: card.color, fontSize: '20px' }}>
                                    {card.icon}
                                </div>
                                <span className="badge rounded-pill bg-light text-muted fw-normal px-3 py-2" style={{ fontSize: '13px' }}>Live</span>
                            </div>
                            <h1 className="fw-bold mb-1" style={{ color: '#1e293b', fontSize: '36px' }}>{card.value}</h1>
                            <p className="text-muted mb-0" style={{ fontSize: '16px', fontWeight: '500' }}>{card.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity Section */}
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="card-header bg-white border-0 p-4 d-flex justify-content-between align-items-center">
                    <div>
                        <h4 className="fw-bold text-dark mb-0">Recent Candidates</h4>
                        <p className="text-muted mb-0" style={{ fontSize: '16px' }}>Latest applications received</p>
                    </div>
                    <button className="btn btn-light rounded-pill px-4 py-2 fw-600 shadow-sm" style={{ fontSize: '15px' }}>
                        View All <FiArrowRight className="ms-1" />
                    </button>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light">
                            <tr>
                                <th className="border-0 px-4 py-4 text-muted fw-bold" style={{ fontSize: '14px', letterSpacing: '0.8px' }}>CANDIDATE</th>
                                <th className="border-0 py-4 text-muted fw-bold" style={{ fontSize: '14px', letterSpacing: '0.8px' }}>ROLE</th>
                                <th className="border-0 py-4 text-muted fw-bold" style={{ fontSize: '14px', letterSpacing: '0.8px' }}>LOCATION</th>
                                <th className="border-0 py-4 text-muted fw-bold" style={{ fontSize: '14px', letterSpacing: '0.8px' }}>DATE</th>
                                <th className="border-0 py-4 text-muted fw-bold" style={{ fontSize: '14px', letterSpacing: '0.8px' }}>STATUS</th>
                                <th className="border-0 px-4 py-4 text-end text-muted fw-bold" style={{ fontSize: '14px', letterSpacing: '0.8px' }}>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentApplications.map((app) => (
                                <tr key={app._id}>
                                    <td className="px-4 py-4">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="rounded-circle bg-light d-flex align-items-center justify-content-center fw-bold text-primary shadow-sm" style={{ width: '48px', height: '48px', fontSize: '18px' }}>
                                                {app.userId?.name?.charAt(0) || "U"}
                                            </div>
                                            <div>
                                                <div className="fw-bold text-dark mb-0" style={{ fontSize: '17px' }}>{app.userId?.name || "N/A"}</div>
                                                <div className="text-muted" style={{ fontSize: '14px' }}>{app.userId?.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="text-dark fw-600" style={{ fontSize: '16px' }}>{app.jobId?.title}</div>
                                        <div className="text-muted" style={{ fontSize: '14px' }}>{app.companyId?.name}</div>
                                    </td>
                                    <td>
                                        <span className="text-secondary fw-500" style={{ fontSize: '15px' }}>{app.jobId?.location || "Remote"}</span>
                                    </td>
                                    <td>
                                        <span className="text-secondary fw-500" style={{ fontSize: '15px' }}>
                                            {new Date(app.appliedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`badge rounded-pill fw-600 px-4 py-2 ${app.status === 'Selected' ? 'bg-success-subtle text-success' :
                                                app.status === 'Rejected' ? 'bg-danger-subtle text-danger' :
                                                    app.status === 'Shortlisted' ? 'bg-warning-subtle text-warning' :
                                                        'bg-primary-subtle text-primary'
                                            }`} style={{ fontSize: '14px' }}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="px-4 text-end">
                                        <button className="btn btn-outline-primary rounded-pill px-4 py-2 border-0 bg-light-hover shadow-sm" style={{ fontSize: '14px' }}>
                                            Review <FiExternalLink className="ms-1" size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {recentApplications.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="text-center py-5 text-muted fs-5">
                                        No recent activity to show
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <style>{`
                .transition-hover:hover {
                    transform: translateY(-5px);
                    transition: all 0.3s ease;
                }
                .bg-success-subtle { background-color: #f0fdf4 !important; }
                .bg-danger-subtle { background-color: #fef2f2 !important; }
                .bg-warning-subtle { background-color: #fefce8 !important; }
                .bg-primary-subtle { background-color: #eef2ff !important; }
                .bg-light-hover:hover { background-color: #f8fafc !important; }
                .fw-600 { font-weight: 600; }
                .fw-500 { font-weight: 500; }
            `}</style>
        </div>
    );
};

export default Welcome;
