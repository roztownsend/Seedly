import { HeroProps } from '../../types/types';
import './hero.css';

const Hero: React.FC<HeroProps> = ({ heading, description, imageObject }) => {
  return (
    <section className="hero">
      <h1>{heading}</h1>
      <p>{description}</p>
      <img className="hero-img" src={imageObject} alt="Hero Image" />
    </section>
  );
};

export default Hero;
