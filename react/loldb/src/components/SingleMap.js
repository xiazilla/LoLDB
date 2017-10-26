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
		let mapIdent;
		if(this.props.match.params.id === "0") {
			switch(this.props.match.params.abbrev) {
				case "HA":
					mapIdent = "Howling Abyss";
					break;
				case "SR":
					mapIdent = "Summoner's Rift";
					break;
				case "TT":
					mapIdent = "The Twisted Treeline";
					break;
				case "CS":
					mapIdent = "The Crystal Scar";
					break;
			}
		} else {
		 	mapIdent = this.props.match.params.id;
		}
		console.log(myMaps);
		console.log(mapIdent)
		let data = myMaps;
		Object.keys(data).forEach(function(key, index) {
			if(data[key].mapName === mapIdent) 
				mapData = data[key];
		});		
	
		return (
			<div> 
				<h3><strong>{mapIdent}</strong></h3>
				<div className="img-wrapper2>" >
	                <img src={mapData.image} className="img-responsive" alt="portfolio items" />
				</div>
				<section>

				</section>
			</div>
		)
	}

}

export default SingleMap;