import React, { Component } from 'react';
import mydata from './champions.json';
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
				<h5>{this.props.theseItems.mode} - Essential Items</h5>
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
		var html = theJSON.description;
    	var div = document.createElement("div");
		div.innerHTML = html;
		var text = div.textContent || div.innerText || "";
		return text;
	}


	render() {

		let championData, spellData;
		let q,w,e,r,p, itemsChampName;
		var champName = this.props.match.params.name;
    	let data = mydata.data;
    	var skins = [];
    	let recommendedItems = []

    	Object.keys(data).forEach(function(key) {
      		if(data[key].name === champName){
      			itemsChampName = key;
      			championData = data[key];
      			spellData = championData.spells
      			// console.log(championData.skins);
				Object.keys(championData.skins).forEach(function(key) {
			  		skins.push(championData.skins[key]);
				});      			
				q = spellData[0]
      			w = spellData[1]
      			e = spellData[2]
      			r = spellData[3]
      			p = championData.passive
    			recommendedItems = championData.recommended
    			// console.log(recommendedItems)
      		};
    	});




    	let lore = championData.lore;

    	let imageURL = "https://ddragon.leagueoflegends.com/cdn/7.20.1/img/spell/";
    	let passiveURL = "https://ddragon.leagueoflegends.com/cdn/7.20.1/img/passive/";
    	// let itemURL = ""
    	// console.log((imageURL).concat(q.image.full));

		return (
			<div>
	            <div className="img-wrapper2">
	                <img src={championData.image} className="img-responsive" alt="portfolio items" />
	            </div>
				<h3><strong>{champName}</strong></h3>
				<h4>{championData.title}</h4> 

				<h4> Champion Abilities</h4>
				<div className="container1 row">
					<div className="col-sm-3">
						<img src={(passiveURL).concat(p.image.full)} className="img-responsive" alt="portfolio items" title = {this.GetHtml(p)}/> 
						<p><strong>{p.name}</strong></p>
					</div>
					<div className="col-sm-2">
						<img src={(imageURL).concat(q.image.full)} className="img-responsive" alt="" title={this.GetHtml(q)}/> 
						<p><strong>{q.name}</strong></p>
					</div>
					<div className="col-sm-2">
						<img src={(imageURL).concat(w.image.full)} className="img-responsive" alt="" title={this.GetHtml(w)}/> 
						<p><strong>{w.name}</strong></p>
					</div>
					<div className="col-sm-2">
						<img src={(imageURL).concat(e.image.full)} className="img-responsive" alt="" title={this.GetHtml(e)}/> 
						<p><strong>{e.name}</strong></p>
					</div>
					<div className="col-sm-2">
						<img src={(imageURL).concat(r.image.full)} className="img-responsive" alt="" title={this.GetHtml(r)}/> 
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
						<p>{document.write(lore)}</p>
					</div>
				</div>
			</div>
		) 
	}
}

export default SingleChampion