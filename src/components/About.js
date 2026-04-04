import aboutImg from "../assets/about.png";

const About = ({ data }) => {
  const title = data?.title || "About Us";
  const img = data?.imageUrl || aboutImg;
  const paragraphs =
    data?.paragraphs || [
      "Nano Satellite Yard (NSY) is a forward-thinking startup...",
      "We specialize in CubeSat technology...",
      "Beyond space technology, we also innovate in solar energy...",
      "Our mission is to empower innovators...",
    ];

  return (
    <section id="about">
      <div className="container">
        <div className="about">
          <h1>{title}</h1>
          <div className="about-content">
            <img src={img} alt="about" />
            <div className="content">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
