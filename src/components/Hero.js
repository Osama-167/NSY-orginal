import image from "../assets/image1.png";
import { Send } from "../assets/icons";
import { Link } from "react-scroll";

const Hero = ({ data }) => {
  const title = data?.title || "NANO SATELLITE YARD";
  const subtitle =
    data?.subtitle || "A tiny box that enhances our vision of the Earth.";
  const img = data?.imageUrl || image;

  return (
    <section id="hero">
      <div className="hero container">
        <div className="hero-content">
          <div className="content">
            <h1>{title}</h1>
            <p>{subtitle}</p>
            <Link to="contact" smooth duration={500}>
              <button>
                Contact Us <Send />
              </button>
            </Link>
          </div>
          <div className="img">
            <img src={img} alt="Hero" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
