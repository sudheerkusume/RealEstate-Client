import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

import Banner1 from "../Accets/BannerG.webp";
import Banner2 from "../Accets/BannerH.webp";
import Banner3 from "../Accets/BannerI.webp";
import Banner4 from "../Accets/BannerJ.webp";
import Banner5 from "../Accets/Bannerk.webp";
import Banner6 from "../Accets/bannerC.jpeg";

import "./HomeLuxury.css";

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(0);

  const banners = [Banner4, Banner5, Banner6, Banner3, Banner2, Banner1];

  const nextSlide = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  }, [banners.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  }, [banners.length]);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 1.1,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.6 },
        scale: { duration: 0.8 },
      },
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 1.1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.6 },
      },
    }),
  };

  return (
    <>
      {/* PREMIUM FRAMER MOTION CAROUSEL SECTION */}
      <section className="hero-full-width">
        <div
          className="carousel-fm-container"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="carousel-fm-slide"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = Math.abs(offset.x) > 50 && Math.abs(velocity.x) > 500;
                if (swipe) {
                  if (offset.x > 0) prevSlide();
                  else nextSlide();
                }
              }}
            >
              <div className="Carousel__infoImgWrapper">
                <motion.img
                  src={banners[activeIndex]}
                  className="Carousel__pfidProjWithZoom"
                  alt={`banner-${activeIndex}`}
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.15 }}
                  transition={{
                    duration: 10,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Luxury Controls */}
          <button className="carousel-control-luxury prev" onClick={prevSlide}>
            <BsArrowLeft />
          </button>
          <button className="carousel-control-luxury next" onClick={nextSlide}>
            <BsArrowRight />
          </button>

          {/* Animated Progress Indicators */}
          <div className="carousel-custom-indicators">
            {banners.map((_, index) => (
              <div
                key={index}
                className={`indicator-dot-outer ${index === activeIndex ? "active" : ""}`}
                onClick={() => {
                  setDirection(index > activeIndex ? 1 : -1);
                  setActiveIndex(index);
                }}
              >
                {index === activeIndex && (
                  <motion.div
                    className="indicator-progress-inner"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5, ease: "linear" }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="jobs-transition-header">
        <div className="curated-tagline">
          <span className="star-icon">✦</span> CURATED OPPORTUNITIES
        </div>
        <h2 className="serif-transition-title">
          Click to unlock your <span className="dream-centerpiece">Dream Real Estate</span> Jobs below
        </h2>
      </div>
    </>
  );
};

export default Home;
