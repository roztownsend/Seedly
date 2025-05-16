import { HeroProps } from '../../types/types';
import './hero.css';

const Hero = ({ heading, subheading, imageUrl }: HeroProps) => {
  return (
    <>
      {/* Desktop Hero */}
      <section className="hero-desktop">
        <h2 className="hero-desktop-heading">{heading}</h2>
        <p className="h5 hero-desktop-subheading">{subheading}</p>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="hero"
            className="hero-desktop-image"
          />
        )}
      </section>

      {/* Mobile Hero */}
      <section
        className="hero-mobile"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="hero-mobile-overlay" />
        <div className="hero-mobile-content">
          <h2 className="hero-mobile-heading">{heading}</h2>
          <p className="hero-mobile-subheading">{subheading}</p>
        </div>
      </section>
    </>
  );
};

export default Hero;
