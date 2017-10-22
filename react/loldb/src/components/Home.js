import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import background from "../../src/images/LeagueBackground.jpg"
import background2 from "../../src/images/LeagueBackground4.jpeg"
import background3 from "../../src/images/LeagueBackground3.jpg"
import './Home.css'

import '../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css'
 
class DemoCarousel extends Component {
    render() {
        return (
        	<div className="sliderContainer">
	            <Carousel showThumbs={false}>
	                <div>
	                    <img src={background} />
	                </div>
	                <div>
	                    <img src={background2} />
	                </div>
	                <div>
	                    <img src={background3} />
	                </div>
	            </Carousel>
	        </div>
        )
    }
}

class Home extends Component {
	render() {
		return (
			<div>
				<div>
					<DemoCarousel/>
				</div>
				<div>
					<a className="twitter-timeline" href="https://twitter.com/lolesports?ref_src=twsrc%5Etfw">Tweets by lolesports</a> <script async src="http://platform.twitter.com/widgets.js" charset="utf-8"></script>
				</div>
			</div>
		)
	}
}

export default Home;
