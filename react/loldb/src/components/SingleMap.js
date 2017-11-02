import React, { Component } from 'react';
import myMaps from './maps.json';
import './map.css'



class ShowImages extends Component
 {
 	render() {
 		let images = this.props.images;
 		// console.log(images)
 		if(this.props.doOrNah) {
 	  		return (
 	  			<div>
 	  				<img src={images[0].src} alt="" />
 	  				<p>{images[0].caption}</p>
 	  			</div>
	 			)
 		} else {
 			return false
 		}

 	}
 }


class UnderUnderSection2 extends Component {
	render() {
		return (<li className="text">{this.props.element.text}</li>)
	}
}


class UnderSection1 extends Component {
	render() {
		// console.log(this.props.sections)
		if(this.props.sections.hasOwnProperty("text")) {
			return <p>{this.props.sections.text}</p>
		} else if(this.props.sections.hasOwnProperty("elements")) {
			let elements = this.props.sections.elements;
			return (
				<div>
					{elements.map((elem) => <UnderUnderSection2 element={elem}/>)}
				</div>
			)
		}
	}
}

class TitleComponent extends Component {

	render() {

		// console.log(this.props.sections)
		let haveImages = true;
		if(this.props.sections.images.length === 0) {
			haveImages = false;
		}
		return (
			<div>
				<h4 className="text">{this.props.sections.title}</h4>
				{this.props.sections.content.map(underSections => <UnderSection1 sections={underSections}/>)} 
				{<ShowImages images={this.props.sections.images} doOrNah={haveImages}/>}
			</div>
		)
	}



}




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
				default:
					mapIdent = "Summoner's Rift";
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
		//get into sections array
		let sections;
		var k;
		var sec = mapData.article;
        for(k in sec)
        {
          sections = sec[k];
          console.log(sections);
        }
        // console.log(sections[1]);
        let temp = []
        Object.keys(sections).forEach(function(key) {
        	temp.push(sections[key])
        });
        console.log(temp[0])
        //displaying section titles
		var i = 1;
		var j = 0;
		var titles = "";
		var stuff = "";

		for (;sections[i];) {
   	 		titles += sections[i].title;
   	 		titles += "\n"
   	 			for(;sections[j];) {
   	 				stuff += sections[j].content;
   	 				j++
   	 			}

    		i++;
		}
		console.log(titles);
		console.log(sections[1].content);
		console.log(stuff);
		

		//displaying item and champ images 
		let imageitemUrl ="https://ddragon.leagueoflegends.com/cdn/7.10.1/img/item/";
		let imagechampionUrl = "https://ddragon.leagueoflegends.com/cdn/7.20.1/img/champion/";

		return (
			<div> 
				<h3><strong>{mapIdent}</strong></h3>
				<div className="img-wrapper2>" >
	                <img src={mapData.image} className="img-responsive" alt="portfolio items" />
				</div>
			
				<div className="row-md-10">
					<div className="col-md-2"></div>
					<div className="text col-md-10">	
						{sections.map(section => <TitleComponent sections={section}/>)} 
					</div>
				</div>

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