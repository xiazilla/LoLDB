import React, { Component } from 'react';
import './Champions.css';


class ChampionObject extends Component {

	GetHtml( theJSON ) {
		var html = theJSON;
    	var div = document.createElement("div");
		div.innerHTML = html;
		var text = div.textContent || div.innerText || "";
		return text;
	}

	render () {
		// console.log(this.props.thisChampion)
		return (
	      <div className="col-sm-3 container">
	       		<figure className="wow">
		            <a href={`/champions/${this.props.thisChampion.name}`}>
		                <div className="img-wrapper2">
		                    <img src={this.props.thisChampion.image} alt="portfolio items" />
		                </div>
		            </a>
		            <figcaption>
		            	<span>
			                <h4><strong> {this.props.thisChampion.name}</strong></h4>
			                
			                <p> {this.props.thisChampion.title} </p>
			                <div className="text">
			                	<p><strong>Lore: </strong>{this.GetHtml(this.props.thisChampion.lore)}</p>
			                	<p><strong>Passive: </strong>{this.GetHtml(this.props.thisChampion.passive.description)}</p>
			                </div>
				        </span>
			        </figcaption>
		        </figure>
	    	</div> 

	     );

	}

}

export default ChampionObject;