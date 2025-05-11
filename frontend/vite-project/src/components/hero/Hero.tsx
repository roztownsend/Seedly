import { HeroProps } from '../../types/types';
import './hero.css';
const Hero = ({ heading, subheading, imageUrl }: HeroProps) => {
  return (
    <section className="hero-section">
      <h2 className="hero-heading">{heading}</h2>
      <p className="hero-subheading">{subheading}</p>
      {imageUrl && <img src={imageUrl} alt="hero" className="hero-img" />}
    </section>
  );
};

export default Hero;