import React, { useState } from "react";

const MAX_LENGTH = 150;

const CEO = ({ data }) => {
  const heading = data?.heading || "Meet Our Leadership";
  const groups = Array.isArray(data?.groups) ? data.groups : [];

  return (
    <div id="team" className="ceo-container">
      <h1 className="ceo-heading">{heading}</h1>

      {groups.length === 0 ? (
        <p style={{ color: "#ccc" }}>No team data yet.</p>
      ) : (
        groups.map((group) => (
          <div key={group._id || group.name} className="team-section">
            <h2 className="section-title">{group.name}</h2>
            <div className="ceo-list">
              {(group.members || []).map((person) => (
                <CEOMember key={person._id || person.name} person={person} />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const CEOMember = ({ person }) => {
  const [showMore, setShowMore] = useState(false);

  const desc = person?.description || "";
  const short = desc.length > MAX_LENGTH ? desc.substring(0, MAX_LENGTH) + "..." : desc;

  return (
    <div className="ceo-card">
      <img src={person.imageUrl} alt={person.name} className="ceo-image" />
      <h2 className="ceo-name">{person.name}</h2>
      <h3 className="ceo-title">{person.title}</h3>
      <p className="ceo-description">{showMore ? desc : short}</p>

      {desc.length > MAX_LENGTH ? (
        <button className="more-button" onClick={() => setShowMore(!showMore)}>
          {showMore ? "Less" : "More"}
        </button>
      ) : null}
    </div>
  );
};

export default CEO;
