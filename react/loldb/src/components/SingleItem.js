import React, { Component } from 'react';
import myItems from './items.json'; 


class ItemTreeObj extends Component {



	render() {



		let id = this.props.id

		if(myItems.data[id].hasOwnProperty("from")) {
			return (
				<li>
					<a href={`/items/${id}/${myItems.data[id].name}`}>
                        <img src={myItems.data[id].image} alt=""/>
                        {myItems.data[id].name}
                    </a>
                    <ul>
                    	{myItems.data[id].from.map((fromID) => <ItemTreeObj id={fromID}/>)}
                    </ul>

				</li>
			)
		} else {	
			return (
					<li>
						<a href={`/items/${id}/${myItems.data[id].name}`}>
                            <img src={myItems.data[id].image} alt=""/>
                            {myItems.data[id].name}
                        </a>
					</li>

				)
		}
	}
}


// class AvailableOn extends Component {

// 	render () {
// 		return(
// 			{Object.keys(this.props.maps).forEach(function(key) {
// 			    <div> {key} </div>
// 			})})

// 	}
// }


class SingleItem extends Component{



	GetHtml( theJSON ) {
		var html = theJSON.description;
    	var div = document.createElement("div");
		div.innerHTML = html;
		var text = div.textContent || div.innerText || "";
		return text;
	}

	getMaps(map, id) {
		console.log(map)
		if(map) {
			switch (id) {
				case 8:
					return (<a href={`/maps/The%20Crystal%20Scar`}>The Crystal Scar</a>);
				case 10:
					return (<a href={`/maps/The%20Twisted%20Treeline`}>The Twisted Treeline</a>);
				case 11:
					return (<a href={`/maps/Summoner's%20Rift`}>Summoner's Rift</a>)
				case 12:
					return (<a href={`/maps/Howling%20Abyss`}>Howling Abyss</a>)
			}
		}
	}
	
	render() {
	
		let itemData; 
		var itemName = Number(this.props.match.params.id);
		let data = myItems.data;
		Object.keys(data).forEach(function(key) {
			if(data[key].id === itemName) 
				itemData = data[key];
		});

		

		
		
		console.log(itemData);
		// let imageURL = "http://ddragon.leagueoflegends.com/cdn/7.10.1/img/item/3147.png"

		return (
			<div> 
				<h3><strong>{itemData.name}</strong></h3>
				<div className="img-wrapper2>" >
	                <img src={itemData.image} className="img-responsive" alt="portfolio items" />
				</div>
				<h4>Cost</h4>
					<p>{itemData.gold.total}</p>
				<h4>Description</h4>
					<p>{itemData.sanitizedDescription}</p>
				<h4>Recipe</h4>
				<div className="tree">
					<ul>
						<ItemTreeObj id={this.props.match.params.id}/>
					</ul>
	            </div>
				<h4>Most Frequently Built On</h4>
				<h4>Available On</h4>
				<p>{this.getMaps(itemData.maps["8"], 8)}</p>
				<p>{this.getMaps(itemData.maps["10"], 10)}</p>
				<p>{this.getMaps(itemData.maps["11"], 11)}</p>
				<p>{this.getMaps(itemData.maps["12"], 12)}</p>
					


			</div>
		)
	}

}

export default SingleItem;