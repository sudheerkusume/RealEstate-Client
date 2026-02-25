import React, { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

const StatItem = ({ value, label, start }) => {
  const spring = useSpring(0, { stiffness: 35, damping: 20 });
  const displayValue = useTransform(spring, (current) => Math.floor(current));

  useEffect(() => {
    if (start) {
      spring.set(value);
    } else {
      spring.set(0);
    }
  }, [start, value, spring]);

  return (
    <motion.div
      className="stat-item-ultra"
      whileHover={{ y: -8, transition: { type: "spring", stiffness: 400, damping: 10 } }}
    >
      <div className="stat-number-wrapper-ultra">
        <motion.span className="stat-number-ultra">{displayValue}</motion.span>
        <span className="stat-suffix-ultra">+</span>
      </div>
      <div className="stat-label-ultra">{label}</div>
      <motion.div
        className="stat-accent-line"
        initial={{ width: 0 }}
        animate={start ? { width: "24px" } : { width: 0 }}
        transition={{ delay: 1, duration: 1 }}
      />
    </motion.div>
  );
};

const Banner = () => {
  const [startAnimation, setStartAnimation] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section
      className="stats-banner-ultra"
      onMouseEnter={() => setStartAnimation(true)}
    >
      <motion.div
        className="stats-header-ultra"
        initial={{ opacity: 0, y: -10 }}
        animate={startAnimation ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h2 className="stats-title-ultra">Real Estate Platform Milestones</h2>
        <p className="stats-desc-ultra">
          Empowering professionals and companies through verified connections,
          premium insights, and a dedicated ecosystem for industry growth.
        </p>
      </motion.div>

      <motion.div
        className="stats-row-ultra"
        variants={containerVariants}
        initial="hidden"
        animate={startAnimation ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants}><StatItem value={1930} label="Candidates" start={startAnimation} /></motion.div>
        <motion.div variants={itemVariants}><StatItem value={1660} label="Jobs Posted" start={startAnimation} /></motion.div>
        <motion.div variants={itemVariants}><StatItem value={1120} label="Jobs Filled" start={startAnimation} /></motion.div>
        <motion.div variants={itemVariants}><StatItem value={400} label="Companies" start={startAnimation} /></motion.div>
      </motion.div>

      {/* Luxury Mesh Background Glow */}
      <div className="ultra-gradient-overlay" />
    </section>
  );
};

export default Banner;
