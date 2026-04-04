import React from "react";
import { FaEnvelope, FaWhatsapp } from "react-icons/fa";

const Contact = ({ data }) => {
  const title = data?.title || "Contact Us";
  const caption = data?.caption || "Contact us via email or whatsApp.";
  const email = data?.email || "osama_os167@hotmail.com";
  const whatsapp = data?.whatsapp || "201111770840";

  return (
    <div id="contact" className="contact-container">
      <h2 className="contact-heading">{title}</h2>
      <p className="contact-paragraph">{caption}</p>

      <div className="contact-icons">
        <a href={`mailto:${email}`} className="contact-icon">
          <FaEnvelope size={35} />
        </a>

        <a
          href={`https://wa.me/${whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-icon"
        >
          <FaWhatsapp size={35} />
        </a>
      </div>
    </div>
  );
};

export default Contact;
