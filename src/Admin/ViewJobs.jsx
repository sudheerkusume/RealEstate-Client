import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiSearch, FiFilter, FiEdit3, FiTrash2, FiMoreVertical, FiMapPin, FiBriefcase } from "react-icons/fi";

const ViewJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [category, setCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    const [selected, setSelected] = useState({
        _id: "",
        title: "",
        company: "",
        location: "",
        type: "",
        salary: "",
        category: ""
    });

    // 🔄 Fetch jobs
    const fetchJobs = async () => {
        try {
            const res = await axios.get("https://realestate-server-9xji.onrender.com/jobCategories");
            setJobs(res.data || []);
        } catch (err) {
            console.error(err);
            setJobs([]);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    // Category list
    const categories = ["All", ...new Set(jobs.map(j => j.category).filter(Boolean))];

    // Filter jobs
    const filteredJobs = jobs.filter(j => {
        const matchesCategory = category === "All" || j.category === category;
        const matchesSearch = (j.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (j.company || "").toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    //  Delete job
    const deleteJob = async (id) => {
        if (!window.confirm("Are you sure you want to delete this job?")) return;

        try {
            await axios.delete(`https://realestate-server-9xji.onrender.com/jobCategories/${id}`);
            fetchJobs();
        } catch (err) {
            alert("Delete failed");
            console.error(err);
        }
    };

    //  Edit job
    const editJob = (job) => {
        setSelected(job);
    };

    //  Update job
    const updateJob = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `https://realestate-server-9xji.onrender.com/jobCategories/${selected._id}`,
                selected
            );
            alert("Updated successfully");
            fetchJobs();
        } catch (err) {
            alert("Update failed");
            console.error(err);
        }
    };

    const handleChange = (e) => {
        setSelected({ ...selected, [e.target.name]: e.target.value });
    };

    return (
        <div className="container-fluid p-4 view-jobs-container">
            {/* Header */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-end mb-4">
                <div>
                    <h2 className="display-6 fw-bold text-dark m-0">Job Listings</h2>
                    <p className="text-muted mb-0">Manage your open positions</p>
                </div>
            </div>

            {/* Controls Bar */}
            <div className="premium-controls-bar mb-4">
                <div className="search-box">
                    <FiSearch className="text-muted me-2" />
                    <input
                        type="text"
                        placeholder="Search by role or company..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="filter-box">
                    <FiFilter className="text-muted me-2" />
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>
            </div>

            {/* Premium Table */}
            <div className="premium-table-card">
                <div className="table-responsive">
                    <table className="table premium-table mb-0">
                        <thead>
                            <tr>
                                <th width="30%">Role & Company</th>
                                <th>Location</th>
                                <th>Type</th>
                                <th>Salary</th>
                                <th className="text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredJobs.length > 0 ? (
                                filteredJobs.map(job => (
                                    <tr key={job._id}>
                                        <td>
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="company-avatar-small">
                                                    {job.logo ? (
                                                        <img src={job.logo} alt={job.company || "Company"} />
                                                    ) : (
                                                        (job.company && job.company.charAt(0).toUpperCase()) || "?"
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="fw-bold text-dark">{job.title}</div>
                                                    <div className="text-muted small">{job.company}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center gap-2 text-secondary">
                                                <FiMapPin size={14} /> {job.location}
                                            </div>
                                        </td>
                                        <td>
                                            <span
                                                className={`status-badge ${(job.type || "").toLowerCase().includes("full") ? "full" : "part"
                                                    }`}
                                            >
                                                {job.type || "N/A"}
                                            </span>
                                        </td>
                                        <td className="fw-medium text-dark">
                                            {job.salary}
                                        </td>
                                        <td className="text-end">
                                            <button
                                                className="table-action-btn edit me-2"
                                                onClick={() => editJob(job)}
                                                data-bs-toggle="modal"
                                                data-bs-target="#editModal"
                                                title="Edit"
                                            >
                                                <FiEdit3 />
                                            </button>
                                            <button
                                                className="table-action-btn delete"
                                                onClick={() => deleteJob(job._id)}
                                                title="Delete"
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-5 text-muted">
                                        <div className="d-flex flex-column align-items-center">
                                            <FiSearch size={32} className="mb-2 opacity-50" />
                                            <p className="mb-0">No jobs found matching your criteria</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit Modal */}
            <div className="modal fade" id="editModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <form className="modal-content glass-modal-premium" onSubmit={updateJob}>
                        <div className="modal-header border-0 pb-0">
                            <h5 className="modal-title fw-bold">Update Job</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body pt-4">
                            <div className="form-floating mb-3">
                                <input name="title" value={selected.title} onChange={handleChange} className="form-control custom-input" placeholder="Title" />
                                <label>Job Title</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input name="company" value={selected.company} onChange={handleChange} className="form-control custom-input" placeholder="Company" />
                                <label>Company</label>
                            </div>
                            <div className="row g-2">
                                <div className="col-6">
                                    <div className="form-floating mb-3">
                                        <input name="location" value={selected.location} onChange={handleChange} className="form-control custom-input" placeholder="Location" />
                                        <label>Location</label>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-floating mb-3">
                                        <input name="type" value={selected.type} onChange={handleChange} className="form-control custom-input" placeholder="Type" />
                                        <label>Job Type</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-floating">
                                <input name="salary" value={selected.salary} onChange={handleChange} className="form-control custom-input" placeholder="Salary" />
                                <label>Salary</label>
                            </div>
                        </div>
                        <div className="modal-footer border-0 pt-0">
                            <button type="button" className="btn btn-light rounded-pill px-4" data-bs-dismiss="modal">Cancel</button>
                            <button type="submit" className="btn btn-primary rounded-pill px-4">Save Updates</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ViewJobs;
