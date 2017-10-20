import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import background from "../../src/images/LeagueBackground.jpg"
import '../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css'
 
class DemoCarousel extends Component {
    render() {
        return (
            <Carousel>
                <div>
                    <img src={background} />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src={background} />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src={background} />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
        )
    }
}

export default DemoCarousel;
