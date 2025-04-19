import React from 'react';
import { Carousel, Button, Container } from 'react-bootstrap';
import carousel1 from '.././../../assets/Images/carousel-1.jpg'
import carousel2 from '.././../../assets/Images/carousel-2.jpg'
import carousel3 from '.././../../assets/Images/carousel-3.jpg'
import './carousel.css'

const HeroSection = () => {
  return ( 
    <div className="carousel ">
      <Container fluid>
        <Carousel controls={false} indicators={false} fade interval={3000}>
          <Carousel.Item className="carousel-item">
            <div className="carousel-img">
              <img src={carousel1} alt="carousel 1" />
            </div>
            <div className="carousel-text">
              <h1>Best <span>Quality</span> Ingredients</h1>
              <p>
                Lorem ipsum dolor sit amet elit. Phasellus ut mollis mauris. Vivamus egestas eleifend dui ac consequat at lectus in malesuada
              </p>
              <div className="carousel-btn">
                <Button className="custom-btn" href="#menu">View Menu</Button>
                <Button className="custom-btn" href="#booking">Book Table</Button>
              </div>
            </div>
          </Carousel.Item>

          <Carousel.Item className="carousel-item">
            <div className="carousel-img">
              <img src={carousel2} alt="carousel 2" />
            </div>
            <div className="carousel-text">
              <h1>World’s <span>Best</span> Chef</h1>
              <p>
                Morbi sagittis turpis id suscipit feugiat. Suspendisse eu augue urna. Morbi sagittis, orci sodales varius fermentum, tortor
              </p>
              <div className="carousel-btn">
                <Button className="custom-btn" href="#menu">View Menu</Button>
                <Button className="custom-btn" href="#booking">Book Table</Button>
              </div>
            </div>
          </Carousel.Item>

          <Carousel.Item className="carousel-item">
            <div className="carousel-img">
              <img src={carousel3} alt="carousel 3" />
            </div>
            <div className="carousel-text">
              <h1>Fastest Order <span>Delivery</span></h1>
              <p>
                Sed ultrices, est eget feugiat accumsan, dui nibh egestas tortor, ut rhoncus nibh ligula euismod quam. Proin pellentesque odio
              </p>
              <div className="carousel-btn">
                <Button className="custom-btn" href="#menu">View Menu</Button>
                <Button className="custom-btn" href="#booking">Book Table</Button>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      </Container>
    </div>
  );
};

export default HeroSection;
