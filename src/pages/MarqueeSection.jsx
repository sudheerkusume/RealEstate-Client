import React from "react";
import { Link } from "react-router-dom";

const items = [
    { title: "Brigade", img: "/companies-icons/brigade.jpeg", slug: "brigade-group" },
    { title: "Cybercity", img: "/companies-icons/cybercity.jpg", slug: "cybercity" },
    { title: "DLF", img: "/companies-icons/dlf.png", slug: "dlf-india" },
    { title: "Honer", img: "/companies-icons/honer.jpg", slug: "honer-homes" },
    { title: "Jayabheri", img: "/companies-icons/jayabheri.jpg", slug: "jayabheri-properties" },
    { title: "Lodha", img: "/companies-icons/lodha.jpg", slug: "lodha-group" },
    { title: "Muppa", img: "/companies-icons/muppa.jpeg", slug: "muppa-projects" },
    { title: "My Home Group", img: "/companies-icons/myhomegroup.png", slug: "my-home-group" },
    { title: "NCC", img: "/companies-icons/ncc.jpg", slug: "ncc-urban" },
    { title: "Prestige Group", img: "/companies-icons/prestigegroup.png", slug: "prestige-group" },
    { title: "Radhey", img: "/companies-icons/radhey.jpg", slug: "radhey-constructions" },
    { title: "Rajapushpa", img: "/companies-icons/rajpushpagroup.jpg", slug: "rajapushpa-properties" },
    { title: "Ramky", img: "/companies-icons/ramkeygroup.jpg", slug: "ramky-estates" },
];

const MarqueeSection = () => {
    return (
        <section className="marquee-wrapper py-5">
            <div className="container text-center mb-5">
                <h6 className="text-muted text-uppercase letter-spacing-2">COMPANIES</h6>
                <h2 className="fw-bold display-6">Our Top Recruiters</h2>
            </div>
            <div className="marquee">
                <div className="marquee-track">
                    {[...items, ...items].map((item, index) => (
                        <Link
                            to={`/companies/${item.slug}`}
                            className="marquee-card"
                            key={index}
                            style={{ textDecoration: 'none' }}
                        >
                            <img src={item.img} alt={item.title} className="marquee-logo" />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MarqueeSection;
