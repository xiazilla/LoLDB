import React, { Component } from 'react';
import './map.css'



class ShowImages extends Component
 {
 	render() {
 		let images = this.props.images;
 		// console.log(images)
 		if(this.props.doOrNah) {
 	  		return (
 	  			<center>
 	  				<img src={images[0].src} alt="" />
 	  				<div>{images[0].caption}</div>
 	  			</center>
	 			)
 		} else {
 			return false
 		}

 	}
 }


class UnderUnderSection2 extends Component {
	render() {
		if (this.props.element.hasOwnProperty("elements") && this.props.element.elements.length !== 0) {
			return (
				<div>
					<div className="text">{this.props.element.text}</div>
					{this.props.element.elements.map((elem) => <UnderUnderSection2 element={elem}/>)}
				</div>
				)
		}
		return (<li className="text">{this.props.element.text}</li>)
		
	}
}


class UnderSection1 extends Component {
	render() {
		if(this.props.sections.hasOwnProperty("elements")) {
			let elements = this.props.sections.elements;
			return (
				<div>
				 	<div>{this.props.sections.text}</div>
					{elements.map((elem) => <UnderUnderSection2 element={elem}/>)}
				</div>
			)
		}			
		return <div>{this.props.sections.text}</div>

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

	constructor(props) {
		super(props)
		this.state = {
			data: [],
			dataLoaded: 0,
			mapIdent: ""
		}
	}

	componentWillMount() {
		let mapIdent
		// console.log(this.props.match.params.id)
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

		let url = `https://loldbapi.appspot.com/api/maps/${encodeURIComponent(mapIdent.trim())}`
		// console.log(url)

		fetch(url)
		.then(response => {
			return response.json()
		}).then(results => {
			// console.log(results)
			this.setState({data: results.result[0]})
			this.setState({dataLoaded: 1})
			this.setState({mapIdent: mapIdent})
		})


	}





	GetHtml( theJSON ) {
		var html = theJSON.description;
    	var div = document.createElement("div");
		div.innerHTML = html;
		var text = div.textContent || div.innerText || "";
		return text;
	}

	render() {
		if (this.state.dataLoaded === 1) {
			let mapData = this.state.data

			// console.log(mapData); 
			
			// console.log(article);
			//get into sections array
			let sections;
			var k;
			var sec = mapData.article;
	        for(k in sec)
	        {
	          sections = sec[k];
	          // console.log(sections);
	        }
	        // console.log(sections[1]);
	        let temp = []
	        Object.keys(sections).forEach(function(key) {
	        	temp.push(sections[key])
	        });
	        // console.log(temp[0])
	        //displaying section titles
			

			//displaying item and champ images 
			let imageitemUrl ="https://ddragon.leagueoflegends.com/cdn/7.10.1/img/item/";
			let imagechampionUrl = "https://ddragon.leagueoflegends.com/cdn/7.20.1/img/champion/";

			return (
				<div className> 
					<h3><strong>{this.state.mapIdent}</strong></h3>
					<div className="img-wrapper2>" >
		                <img src={mapData.image} className="img-responsive" alt="portfolio items" />
					</div>
					
					<div className="row">
						<div className="col-md-1"></div>
						<div className="text col-md-10">	
							{sections.map(section => <TitleComponent sections={section}/>)} 
						</div>
					</div>

						<h4>Champions on this Map</h4>
					
						<div className = ""> {mapData.champs.slice(0,6).map(champion => 
	        				<a href={`/Champions/${champion}`} >  <img src={(imagechampionUrl).concat(champion + ".png") } alt="" />   </a>)}
	        			</div>
	        		

					<h4>Items on this Map</h4>
						<div className = ""> {mapData.items.map(item => 
	        				<a href={`/Items/${item}`} >  <img src={(imageitemUrl).concat(item + ".png")} alt=""/>  </a>)}
	        			</div>

				</div>
			)
		} else {
			return <h2> Loading... </h2>
		}
	}

}

export default SingleMap;