import React, { Component } from 'react';
import '../index.css';

class ChampionObject extends Component {

	// constructor(props) {
	// 	super(props);
	// }

	render () {
		return (
	      <div className="col-sm-2 container">
	       		<figure className="wow">
		            <a href="\home">
		                <div class="img-wrapper2">
		                    <img src={this.props.thisChampion.image} class="img-responsive" alt="portfolio items" />
		                </div>
		            </a>
		            <figcaption>
		            	<span>
			                <p><strong> {this.props.thisChampion.name}</strong></p>
			                
			                <p> {this.props.thisChampion.title} </p>
				        </span>
			        </figcaption>
		        </figure>
	    	</div> 

	     );

	}

}

export default ChampionObject;