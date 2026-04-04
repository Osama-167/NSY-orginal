import { useState } from "react";

const Services = ({ data }) => {
  const MAX_LENGTH = 150;

  const services =
    data?.items && data.items.length
      ? data.items
      : []; 

  const ServiceItem = ({ title, imageUrl, fullText, moreContent, id }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const visibleText =
      isExpanded || fullText.length <= MAX_LENGTH
        ? fullText
        : fullText.slice(0, MAX_LENGTH) + "...";

    return (
      <div className="service" id={id}>
        <img src={imageUrl} alt={title} />
        <h3>{title}</h3>
        <p>{visibleText}</p>
        {isExpanded && moreContent && <p>{moreContent}</p>}
        <button className="more-button" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "Less" : "More"}
        </button>
      </div>
    );
  };

  return (
    <section id="services">
      <div className="container">
        <div className="services">
          <h1>{data?.title || "Our Services"}</h1>
          <p className="caption">{data?.caption}</p>
          <div className="services-container">
            {services.map((s) => (
              <ServiceItem key={s._id} {...s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
