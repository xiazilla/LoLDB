import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Timeline } from 'react-twitter-widgets';
import background from "../../src/images/LeagueBackground.jpg"
import background2 from "../../src/images/LeagueBackground4.jpeg"
import background3 from "../../src/images/LeagueBackground3.jpg"
import './Home.css'

import '../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css'
 
class DemoCarousel extends Component {
    render() {
        return (
        	<div className="sliderContainer2">
	            <Carousel showThumbs={false}>
	                <div>
	                    <img src={background} alt=""/>
	                </div>
	                <div>
	                    <img src={background2} alt=""/>
	                </div>
	                <div>
	                    <img src={background3} alt=""/>
	                </div>
	            </Carousel>
	            <Timeline dataSource={{sourceType: 'https://twitter.com/lolesports',
										   screenName: 'lolesports'}}
		  					  options={{height: '2000'}}/>
	        </div>
        )
    }
}

class Home extends Component {
	render() {
		return (
			<div>
					<DemoCarousel/>
			</div>

		)
	}
}

export default Home;
