import React, { Component } from 'react';
import myItems from './items.json'; 

class SingleItem extends Component{

	GetHtml( theJSON ) {
		var html = theJSON.description;
    	var div = document.createElement("div");
		div.innerHTML = html;
		var text = div.textContent || div.innerText || "";
		return text;
	}
	
	render() {
		
		let itemData; 
		var itemName = this.props.match.params.name;
		console.log(itemName);
		let data = myItems.data;
		var items = []
		Object.keys(data).forEach(function(key) {
			if(data[key].name === itemName) 
				itemData = data[key];
		});

		let imageURL = "http://ddragon.leagueoflegends.com/cdn/7.10.1/img/item/3147.png"

		return (
			<div> 
				<h3><strong>{itemName}</strong></h3>
				<div className="img-wrapper2>" >
	                <img src={itemData.image} className="img-responsive" alt="portfolio items" />
				</div>
				<h4>Cost</h4>
					<p>{itemData.gold.total}</p>
				<h4>Description</h4>
					<p>{itemData.sanitizedDescription}</p>
				<h4>Recipe</h4>
				<h4>Most Frequently Built On</h4>
				<h4>Available On</h4>
			</div>
		)
	}

}

export default SingleItem;