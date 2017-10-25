import React, { Component } from 'react';
import myMaps from './maps.json';

class SingleMap extends Component{


	GetHtml( theJSON ) {
		var html = theJSON.description;
    	var div = document.createElement("div");
		div.innerHTML = html;
		var text = div.textContent || div.innerText || "";
		return text;
	}
	
	render() {
	
		let mapData; 
		var mapIdent = this.props.match.params.id;
		console.log(mapIdent);
		let data = myMaps;
		Object.keys(data).forEach(function(key) {
			if(data[key].mapName === mapIdent) 
				mapData = data[key];

		});

		console.log(mapData);
	
		return (
			<div> 
				<h3><strong>{mapIdent}</strong></h3>
				<div className="img-wrapper2>" >
	                <img src={mapData.image} className="img-responsive" alt="portfolio items" />
				</div>
				<p></p>
			</div>
		)
	}

}

export default SingleMap;