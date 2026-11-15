import Aos from "aos";
import api from "../config/api";
import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const City = () => {
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/jobCategories")
      .then((res) => {
        if (!Array.isArray(res.data)) {
          setCities([]);
          return;
        }
        const grouped = res.data.reduce((acc, job) => {
          if (!acc[job.location]) {
            acc[job.location] = {
              name: job.location,
              image: job.image2 || null, // ✅ prevent empty string
              jobs: 0,
            };
          }
          acc[job.location].jobs += 1;
          return acc;
        }, {});

        setCities(Object.values(grouped));
        setTimeout(() => Aos.refresh(), 300);
      })
      .catch((err) => {
        console.error("Error fetching cities:", err);
        setCities([]);
      });
  }, []);

  return (
    <section className="city-section">
      <p className="city-subtitle">TOP CITIES</p>
      <h3 className="city-title">Explore Jobs by City</h3>

      <div className="row py-5 mb-5 g-4 justify-content-center">
        {cities.map((city) => (
          <div
            className="col-lg-3 col-md-6"
            key={city.name}
            onClick={() =>
              navigate(`/jobs/city/${encodeURIComponent(city.name)}`)
            }
          >
            <div className="city-card">
              {/* ✅ render image ONLY if exists */}
              {city.image && (
                <img
                  src={city.image}
                  alt={city.name}
                  loading="lazy"
                  decoding="async"
                />
              )}

              <div className="city-overlay">
                <div>
                  <h4>{city.name}</h4>
                  <p>{city.jobs} Jobs Available</p>
                </div>
                <IoIosArrowForward className="city-arrow" />
              </div>
            </div>
          </div>
        ))}
      </div>


    </section>
  );
};

export default City;
