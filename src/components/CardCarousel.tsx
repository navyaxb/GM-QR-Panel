import React, { useState } from 'react';
interface Testimonial {
  name: string;
  text: string;
  image: any;
}

interface CardCarouselProps {
  testimonials: Testimonial[];
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: '550px',
    height: '600px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  carousel: {
    display: 'flex',
    transition: 'transform 0.5s ease',
    width: '470px',
  },
  card: {
    minWidth: '380px',
    height: '250px',
    margin: '0 15px',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: '#F1F1F1'
  },
  button: {
    // position: 'absolute',
    // top: '50%',
    // transform: 'translateY(-50%)',
    backgroundColor: '#ffcbd3',
    border: 'transparent',
    borderRadius: '100px',
    cursor: 'pointer',
    padding: '10px',
    zIndex: 999,
    width: '30px',
    height: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  prevButton: {
    left: '10px',
  },
  nextButton: {
    right: '10px',
  },
  textDescription: {
    fontSize: '14px',
    marginTop: '10px'
  },
  image: {
    borderRadius: '100px',
    marginBottom: '30px',
    height: '100px',
    width: '100px',
    objectFit: 'cover'
  }
};

const CardCarousel: React.FC<CardCarouselProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div style={styles.container}>
      <button style={{ ...styles.button, ...styles.prevButton }} onClick={prevSlide}>
        &#10094;
      </button>
      <div style={{ ...styles.carousel, transform: `translateX(-${currentIndex * 100}%)` }}>
        {testimonials.map((testimonial, index) => (
          <div key={index} style={styles.card}>
            <img style={styles.image} src={testimonial.image} />
            <h5>{testimonial.name}</h5>
            <p style={styles.textDescription}>{testimonial.text}</p>
          </div>
        ))}
      </div>
      <button style={{ ...styles.button, ...styles.nextButton }} onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default CardCarousel;
