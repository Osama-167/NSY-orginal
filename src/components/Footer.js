import React, { useMemo } from "react";
import { Facebook, Twitter, Youtube, Instagram } from "../assets/icons";
import { FaEnvelope, FaWhatsapp } from "react-icons/fa";
import logo from "../assets/logo.png";
import { Link } from "react-scroll";

const iconMap = {
  facebook: Facebook,
  twitter: Twitter,
  youtube: Youtube,
  instagram: Instagram,
};

const Footer = ({ data, services }) => {
  const aboutText =
    data?.aboutText ||
    "We are a leading provider of high-quality satellites, spacecraft, and technologies.";

  const socialLinks = Array.isArray(data?.socialLinks) ? data.socialLinks : [];

  const email = data?.email || "osama_os167@hotmail.com";
  const whatsapp = data?.whatsapp || "201111770840";
  const copy = data?.copyright || "© 2025 AMG-TECH. All rights reserved.";

  // ✅ Dynamic service links from DB services.items
  const serviceLinks = useMemo(() => {
    const items = Array.isArray(services?.items) ? services.items : [];
    return items
      .filter((x) => x && (x.id || x._id) && x.title)
      .map((x) => ({
        label: x.title,
        targetId: x.id || String(x._id), // scroll target
      }));
  }, [services]);

  return (
    <footer>
      <div className="footer-content">
        <div className="company">
          <img src={logo} alt="logo" className="footer-logo" />
          <p>{aboutText}</p>
        </div>

        <div className="services-footer">
          <h3>SERVICES</h3>

          {serviceLinks.length === 0 ? (
            <p style={{ opacity: 0.7 }}>No services yet</p>
          ) : (
            serviceLinks.map((l) => (
              <Link
                key={l.targetId}
                to={l.targetId}
                smooth={true}
                duration={500}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <p>{l.label}</p>
              </Link>
            ))
          )}
        </div>

        <div className="contact">
          <h3>CONTACT</h3>
          <p>We are a leading provider</p>

          <div className="footer-contact-icons">
            <a href={`mailto:${email}`} className="contact-icon">
              <FaEnvelope />
            </a>
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-icon"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      <div className="social">
        {socialLinks.map((s, idx) => {
          const Comp = iconMap[s.type];
          if (!Comp || !s.url) return null;
          return (
            <a key={s.type + idx} href={s.url} target="_blank" rel="noreferrer">
              <Comp />
            </a>
          );
        })}
      </div>

      <p className="copy-right">{copy}</p>
    </footer>
  );
};

export default Footer;
