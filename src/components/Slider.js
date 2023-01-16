import {useState, useEffect} from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import {slideData} from './slider-data';
import './styles.css';

const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideLength = slideData.length;

    const autoScroll = false;
    let slideInterval;
    let intervalTime = 3000;

    const nextSlide = () => {
        setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1)
    }

    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1)
    }

    function auto() {
        slideInterval = setInterval(nextSlide, intervalTime)
    }

    useEffect(() => { 
        setCurrentSlide(0)
    }, []);

    useEffect(() => {   
      if (autoScroll) {
        auto();
      }
      return () => clearInterval(slideInterval);
    }, [currentSlide])
    
    
  return (
    <div className="slider">
        <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
        <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />

        {slideData.map((slider, index) => {
            return(
                <div className={index === currentSlide ? "slide current" : "slide"} key={index}>
                    {index === currentSlide && (
                        <>
                        <img src={slider.image} alt="background" />
                        <div className="content">
                            <h1>{slider.heading}</h1>
                            <p>{slider.desc}</p>
                            <hr />
                            <button style={{background: "blue"}}>Get Started</button>
                        </div>
                        </>
                    )}
                </div>
            )
        })}
    </div>
  )
}

export default Slider;