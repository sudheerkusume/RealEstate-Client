import api from "../config/api";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

const Jobs = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/jobCategories")
      .then((res) => {
        const grouped = res.data.reduce((acc, job) => {
          if (!acc[job.category]) {
            acc[job.category] = {
              category: job.category,
              image: job.image,
              count: 0
            };
          }
          acc[job.category].count += 1;
          return acc;
        }, {})
        setCategories(Object.values(grouped));
      });
  }, []);

  return (
    <section className="dream-job-section">
      <div className="dream-job-container">


        {/* Dynamic Grid */}
        <div className="dream-job-grid">
          {categories.map((cat, index) => (
            <div
              className="dream-job-card"
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 50}
              onClick={() => navigate(`/jobs/category/${encodeURIComponent(cat.category)}`)}
            >
              <img
                src={cat.image || "/job-icons/default-job.png"}
                alt={cat.category}
                className="dream-job-icon"
              />
              <div>
                <h3 className="category-card-title">{cat.category}</h3>
                <p className="category-card-tagline">
                  {cat.category === "Tele Caller" ? "Engage & Convert" :
                    cat.category === "Real Estate Sales" ? "Sell Property Faster" :
                      cat.category === "CRM Executive" ? "Manage Client Relations" :
                        cat.category === "Digital Marketing" ? "Promote & Convert" :
                          cat.category === "HR & Operations" ? "People & Process" :
                            "Explore Great Careers"}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-5" data-aos="fade-up">
          <button
            className="btn btn-load-more"
            onClick={() => navigate("/jobs")}
          >
            View All Jobs <IoIosArrowForward className="ms-2" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Jobs;
