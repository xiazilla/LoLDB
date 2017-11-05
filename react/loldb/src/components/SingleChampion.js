import React, { Component } from 'react';
import mydata from './champions.json';
import SkinObject from './SkinObject';
import './Champions.css';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import '../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css';



class EssentialItems extends Component {
	render() {
		let url = "http://ddragon.leagueoflegends.com/cdn/7.10.1/img/item/" + this.props.id + ".png"
		// console.log(this.props.id)
		return (
			<div className="col-sm-4">
				<a href={`/items/${this.props.id}`}>
					<img src={url} alt="" />
				</a>	
			</div>
		)
	}
}



class ItemGroup extends Component {
	render() {
		return(
			<div>
				<h5>{this.props.theseItems.mode} - Essential Items - <a href={`/maps/0/${this.props.theseItems.map}`}>Map</a></h5>
				<div className = "row">
					{this.props.theseItems.blocks[1].items.map((item) => <EssentialItems id={item.id}/>)}
				</div>
			</div>
		)
	}
}

class AllItems extends Component {
	render() {
		return (
			<div>
				{this.props.recommended.map((yahhhh) => <ItemGroup theseItems={yahhhh}/>)}
			</div>
		)
	}
}

class SingleChampion extends Component {

	GetHtml( theJSON ) {
		var html = theJSON;
    	var div = document.createElement("div");
		div.innerHTML = html;
		var text = div.textContent || div.innerText || "";
		return text;
	}


	constructor(props) {
		super(props);
		this.state = {
			champName: props.match.params.name,
			champData: [],
			champDataLoaded: 0
		}
	}

	componentWillMount() {
		let url = `https://loldbapi.appspot.com/api/champs/${this.props.match.params.name}`;

		fetch(url)
		.then(response => {
			return response.json()
			}).then(results => {
				console.log(results.result[0])
				this.setState({champData: results.result[0]})
				this.setState({champDataLoaded: 1})
				// this.render()
				// console.log("state", this.state.data)
			})


	}

	render() {
		if(this.state.champDataLoaded === 0) {
			return (<div>loading...</div>)
		} else {


			console.log("RENDER")
			// console.log(this.state.champData)
			let championData, spellData;
			let q,w,e,r,p, itemsChampName;
	    	var skins = [];
	    	let recommendedItems = []

  			championData = this.state.champData;
  			itemsChampName = championData.riotName
  			spellData = championData.spells
  			console.log(spellData)
			Object.keys(championData.skins).forEach(function(key) {
		  		skins.push(championData.skins[key]);
			});      			
			q = spellData[0]
  			w = spellData[1]
  			e = spellData[2]
  			r = spellData[3]
  			p = championData.passive
			recommendedItems = championData.recommended
	    			console.log(recommendedItems)



	    	let lore = championData.lore;

	    	let imageURL = "https://ddragon.leagueoflegends.com/cdn/7.20.1/img/spell/";
	    	let passiveURL = "https://ddragon.leagueoflegends.com/cdn/7.20.1/img/passive/";
	    	// let itemURL = ""
	    	// console.log((imageURL).concat(q.image.full));
	    	console.log(championData.image)

			return (
				<div>
		            <div className="img-wrapper2">
		                <img src={championData.image} className="img-responsive" alt="portfolio items" />
		            </div>
					<h3><strong>{this.state.champName}</strong></h3>
					<h4>{championData.title}</h4> 

					<div className="text"><h3> Champion Abilities</h3></div>
					<div className="container">
		                <div className="row">
			                <table bordercolor="black">
			                    <tr>
			                        <th width="50">Ability</th>
			                        <th width="100">Description</th>

			                    </tr>
			                    <tr>
			                    	<td><img src={(passiveURL).concat(p.image.full)} className="img-responsive" alt="" title={this.GetHtml(p.sanitizedDescription)}/> <p>{p.name}</p></td>
			                    	<td>{this.GetHtml(p.sanitizedDescription)}</td>
			                    </tr>
			                    <tr>
			                    	<td><img src={(imageURL).concat(q.image)} className="img-responsive" alt="" title={this.GetHtml(q.sanitizedDescription)}/> <p>{q.name}</p></td>
			                    	<td>{this.GetHtml(q.sanitizedDescription)}</td>
			                    </tr>
			                    <tr>
			                    	<td><img src={(imageURL).concat(w.image)} className="img-responsive" alt="" title={this.GetHtml(w.sanitizedDescription)}/> <p>{w.name}</p></td>
			                    	<td>{this.GetHtml(w.sanitizedDescription)}</td>
			                    </tr>
			                    <tr>
			                    	<td><img src={(imageURL).concat(e.image)} className="img-responsive" alt="" title={this.GetHtml(e.sanitizedDescription)}/> <p>{e.name}</p></td>
			                    	<td>{this.GetHtml(e.sanitizedDescription)}</td>
			                    </tr>
			                    <tr>
			                    	<td><img src={(imageURL).concat(r.image)} className="img-responsive" alt="" title={this.GetHtml(r.sanitizedDescription)}/> <p>{r.name}</p></td>
			                    	<td>{this.GetHtml(r.sanitizedDescription)}</td>
			                    </tr>			                    
			                </table>
			            </div>
		        	</div>					

					<div className="text"><h3> Skins </h3></div>
					<div className="sliderContainer">
			            <Carousel showThumbs={false}>
					    	{skins.map((skin) => 
								<SkinObject key={skin.title} thisSkin={skin} name={itemsChampName} index={skin.id % 10} />)}
					    	
			            </Carousel>
	        		</div>

					<div className="text"><h3>Recommended Items</h3></div>

					<div>
							<AllItems recommended={recommendedItems}/>
					</div>

					<div className="text"><h3>Champion Lore</h3></div>
					<div className="row">
						<div className="text2">
							<p>{this.GetHtml(lore)}</p>
						</div>
					</div>
				</div>
			) 
		} 
	}
}

export default SingleChampion