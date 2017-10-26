import React, { Component } from 'react';
import myMaps from './maps.json';
import myItems from './items.json';
import myChamps from './champions.json'

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

		console.log(mapData); 
		
		let article = mapData.article;
		console.log(article);
		let section = article.section;


		let imageitemUrl ="https://ddragon.leagueoflegends.com/cdn/7.10.1/img/item/";
		let imagechampionUrl = "https://ddragon.leagueoflegends.com/cdn/7.20.1/img/champion/";

		return (
			<div> 
				<h3><strong>{mapIdent}</strong></h3>
				<div className="img-wrapper2>" >
	                <img src={mapData.image} className="img-responsive" alt="portfolio items" />
				</div>
				<h4>Articles</h4>
				<p>{mapData.article.section}</p>

				<h4>Champions on this Map</h4>
				
					<div className = "row-md-10"> {mapData.champs.map(champion => 
        				<a href={`/Champions/${champion}`} >  <img src={(imagechampionUrl).concat(champion + ".png") } alt="" />   </a>)}
        			</div>
        		

				<h4>Items on this Map</h4>
					<div className = "row-md-8"> {mapData.items.map(item => 
        				<a href={`/Items/${item}`} >  <img src={(imageitemUrl).concat(item + ".png")} alt=""/>  </a>)}
        			</div>

			</div>
		)
	}

}

export default SingleMap;