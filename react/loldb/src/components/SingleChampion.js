import React, { Component } from 'react';
import SkinObject from './SkinObject'
import './Champions.css';


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

					<h4> Champion Abilities</h4>
					<div className="container1 row">
						<div className="col-sm-3">
							<img src={(passiveURL).concat(p.image.full)} className="img-responsive" alt="portfolio items" title = {this.GetHtml(p)}/> 
							<p><strong>{p.name}</strong></p>
						</div>
						<div className="col-sm-2">
							<img src={(imageURL).concat(q.image)} className="img-responsive" alt="" title={this.GetHtml(q.description)}/> 
							<p><strong>{q.name}</strong></p>
						</div>
						<div className="col-sm-2">
							<img src={(imageURL).concat(w.image)} className="img-responsive" alt="" title={this.GetHtml(w.description)}/> 
							<p><strong>{w.name}</strong></p>
						</div>
						<div className="col-sm-2">
							<img src={(imageURL).concat(e.image)} className="img-responsive" alt="" title={this.GetHtml(e.description)}/> 
							<p><strong>{e.name}</strong></p>
						</div>
						<div className="col-sm-2">
							<img src={(imageURL).concat(r.image)} className="img-responsive" alt="" title={this.GetHtml(r.description)}/> 
							<p><strong>{r.name}</strong></p>
						</div>					
					</div>

					<h4> Skins </h4>
			    	<div className = "row"> {skins.map((skin) => 
						<SkinObject key={skin.title} thisSkin={skin} name={itemsChampName} index={skin.id % 10} />)}
			    	</div>

					<h4>Recommended Items</h4>

					<div>
							<AllItems recommended={recommendedItems}/>
					</div>

					<h4>Champion Lore</h4>
					<div className="row">
						<div className="col-sm-1"></div>
						<div className="col-sm-10">
							<p>{this.GetHtml(lore)}</p>
						</div>
					</div>
				</div>
			) 
		} 
	}
}

export default SingleChampion