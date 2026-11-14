import api from "../config/api";
import { formatSalary } from "../utils/formatSalary";
import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  BsGeoAlt, BsClock, BsBriefcase,
  BsPeople, BsBuilding, BsBuildingCheck, BsHeadset,
  BsMegaphone, BsCode, BsCpu, BsCalculator,
  BsPentagon, BsJournalText, BsCurrencyRupee
} from "react-icons/bs";
import "./JobsPageLuxury.css";

const staticCategories = [
  { id: "Tele Caller", title: "Tele Caller", icon: <BsHeadset /> },
  { id: "Channel Partners", title: "Channel Partners", icon: <BsPeople /> },
  { id: "Real Estate Sales", title: "Real Estate Sales", icon: <BsBuildingCheck /> },
  { id: "CRM Executive", title: "CRM Executive", icon: <BsCpu /> },
  { id: "Digital Marketing", title: "Digital Marketing", icon: <BsMegaphone /> },
  { id: "HR & Operations", title: "HR & Operations", icon: <BsBuilding /> },
  { id: "Accounts & Auditing", title: "Accounts & Auditing", icon: <BsCalculator /> },
  { id: "Legal", title: "Legal", icon: <BsJournalText /> },
  { id: "Architects", title: "Architects", icon: <BsPentagon /> },
  { id: "Web Development", title: "Web Development", icon: <BsCode /> },
];

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tele Caller");
  const [hoveredCategory, setHoveredCategory] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const [jobsRes, companiesRes] = await Promise.all([
          api.get("/jobCategories"),
          api.get("/companies")
        ]);
        setJobs(jobsRes.data || []);
        setCompanies(companiesRes.data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesCategory = !selectedCategory || job.category === selectedCategory;
      const title = job.title || "";
      const company = job.company || "";
      const matchesSearch = !searchTerm ||
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [jobs, selectedCategory, searchTerm]);

  if (loading) {
    return (
      <div className="luxury-loading-container">
        <div className="premium-loader-static" style={{ marginBottom: '20px' }}>
          <BsBriefcase size={40} style={{ color: '#c6a355', opacity: 0.5 }} />
        </div>
        <h4 style={{ fontWeight: 600, color: '#2d3748', letterSpacing: '0.5px' }}>
          Curating Elite Opportunities...
        </h4>
      </div>
    );
  }

  return (
    <div className="luxury-jobs-wrapper">
      {/* Horizontal Categories Filter */}
      <div className="category-filter-section">
        <div className="container">
          <div className="category-container" onMouseLeave={() => setHoveredCategory(null)}>
            {staticCategories.map((cat) => (
              <div
                key={cat.id}
                className={`category-item ${selectedCategory === cat.id ? 'is-active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
                onMouseEnter={() => setHoveredCategory(cat.id)}
                style={{ position: 'relative' }}
              >
                <div className="category-content-wrapper">
                  <div className="category-icon-box">{cat.icon}</div>
                  <div className="category-title">{cat.title}</div>
                </div>

                {/* Sliding Active Indicator */}
                {selectedCategory === cat.id && (
                  <motion.div
                    layoutId="activeTabHighlight"
                    className="category-active-indicator"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}

                {/* Sliding Hover Indicator */}
                {hoveredCategory === cat.id && selectedCategory !== cat.id && (
                  <motion.div
                    layoutId="hoverTabHighlight"
                    className="category-hover-indicator"
                    transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container" style={{ paddingTop: '60px' }}>
        <div className="section-header-elite">
          <h2 className="elite-title">
            {selectedCategory || "All Opportunities"}
          </h2>
          <p className="elite-subtitle">
            Discover {filteredJobs.length} exclusive career paths in {selectedCategory || "real estate"}
          </p>
        </div>

        <div className="jobs-list-container">
          <AnimatePresence mode="popLayout">
            {filteredJobs.length === 0 ? (
              <motion.div
                key="empty"
                className="elite-empty-state"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <div className="empty-icon-box">
                  <BsBriefcase />
                </div>
                <h3 className="fw-bold" style={{ color: '#2d3748' }}>Patience is a Virtue</h3>
                <p className="text-muted">
                  We are currently hand-picking the most prestigious roles in this category.
                  Check back soon for new arrivals.
                </p>
              </motion.div>
            ) : (
              filteredJobs.map((job, index) => (
                <motion.div
                  className="luxury-job-card"
                  key={job._id || job.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  layout
                >
                  <div className="job-logo-container">
                    <div className="logo-white-box">
                      <img
                        src={(() => {
                          const jobCompany = companies.find(c => c._id === job.companyId || c.name === job.company);
                          const logoPath = jobCompany?.logo || job.companyId?.logo;
                          if (!logoPath) return "https://res.cloudinary.com/dlxs9zrru/image/upload/v1765435478/users/umlpxh7bax0uish0psin.jpg";
                          return logoPath.startsWith("http")
                            ? logoPath
                            : `${api.defaults.baseURL.replace("/api", "")}/${logoPath}`;
                        })()}
                        alt={job.title}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://res.cloudinary.com/dlxs9zrru/image/upload/v1765435478/users/umlpxh7bax0uish0psin.jpg";
                        }}
                      />
                    </div>
                  </div>

                  <div className="job-main-info">
                    <div className="job-details-group">
                      <h3 className="job-title-elite">
                        {job.title} - {job.company}
                      </h3>
                      <div className="job-meta-row">
                        <div className="meta-item">
                          <span className="meta-icon"><BsClock /></span>
                          {job.type || "full-time"}
                        </div>
                        <div className="meta-item">
                          <span className="meta-icon"><BsGeoAlt /></span>
                          {job.location || "Hyderabad"}
                        </div>
                        <div className="meta-item">
                          <span className="meta-icon"><BsCurrencyRupee /></span>
                          {formatSalary(job.salary) || "₹ 20,000 - ₹ 40,000/month"}
                        </div>
                      </div>
                    </div>

                    <div className="job-action-area">
                      <div className="vertical-divider"></div>
                      <Link
                        to={`/jobs/${job._id || job.id}`}
                        className="view-details-btn-luxury"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;


