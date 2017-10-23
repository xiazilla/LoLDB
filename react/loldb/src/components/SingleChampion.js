import React, { Component } from 'react';
import mydata from './champions.json';
import './Champions.css';

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
		let q,w,e,r,p;
		var champName = this.props.match.params.name;
    	let data = mydata.data;
    	var champions = [];
    	Object.keys(data).forEach(function(key) {
    		
      		if(data[key].name === champName){
      			championData = data[key];
      			spellData = championData.spells
      			console.log(spellData);
      			q = spellData[0]
      			w = spellData[1]
      			e = spellData[2]
      			r = spellData[3]
      			p = championData.passive
      			console.log(championData)
      		};
    	});




    	let lore = championData.lore;

    	let imageURL = "https://ddragon.leagueoflegends.com/cdn/7.20.1/img/spell/";
    	let passiveURL = "https://ddragon.leagueoflegends.com/cdn/7.20.1/img/passive/";
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
				<div className="row">
					<div className="col-sm-1"></div>
					<div className="col-sm-10">
						<h4>Champion Lore</h4>
						<p>{document.write(lore)}</p>
					</div>
				</div>
			</div>
		) 
	}
}

export default SingleChampion