import React, { Component } from 'react';
import myItems from './items.json'; 


class ItemTreeObj extends Component {



	render() {

		// console.log(this.props.id)
		let id = Number(this.props.id)
		var i, item; 
		var data = this.props.item

		for (i in data) {
			if (id === data[i].id) {
				item = data[i];
			}
		}





		if(item.hasOwnProperty("from")) {
			return (
				<li>
					<a href={`/items/${id}/${item.name}`}>
                        <img src={item.image} alt=""/>
                        {item.name}
                    </a>
                    <ul>
                    	{item.from.map((fromID) => <ItemTreeObj id={fromID} item={this.props.item}/>)}
                    </ul>

				</li>
			)
		} else {	
			return (
					<li>
						<a href={`/items/${id}/${item.name}`}>
                            <img src={item.image} alt=""/>
                            {item.name}
                        </a>
					</li>

				)
		}
	}
}


class SingleItem extends Component{

	constructor( props ) {
		super(props);
		this.state = {
			itemsRendered: false,
			items: []
		}
	}

    componentWillMount() {

        let url = 'https://loldbapi.appspot.com/api/items';
        fetch(url)
        .then(response => {
            return response.json()
        }).then(results => {
            this.setState({items: results})
            this.setState({itemsRendered: true})
        })

    }


	GetHtml( theJSON ) {
		var html = theJSON.description;
    	var div = document.createElement("div");
		div.innerHTML = html;
		var text = div.textContent || div.innerText || "";
		return text;
	}

	getMaps(map, id) {
		// console.log(map)
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


	renderFreqBuiltOn(item) {
		let imagechampionUrl = "https://ddragon.leagueoflegends.com/cdn/7.20.1/img/champion/";


		return (
			<div>
				<h4>Most Frequently Built On</h4>
				<div className = "row-md-10"> {item.builtOn.map(champion => 
    				<a href={`/Champions/${champion}`} >  <img src={(imagechampionUrl).concat(champion + ".png") } alt="" />   </a>)}
    			</div>
			</div>)




	}
	
	render() {
	
		if (this.state.itemsRendered) {
			let itemData; 
			var itemName = Number(this.props.match.params.id);
			let data = this.state.items.result;
			Object.keys(data).forEach(function(key) {
				if(data[key].id === itemName) 
					itemData = data[key];
			});
			let id = this.props.match.params.id
			var item = {}
			var i
			for (i in myItems.result) {
				if (itemName === myItems.result[i].id) {
					item = myItems.result[i];
				}
			}

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
							<ItemTreeObj id={this.props.match.params.id} item={data}/>
						</ul>
		            </div>
		            {item.hasOwnProperty("builtOn") ? this.renderFreqBuiltOn(item) : false}
					<h4>Available On</h4>
					<p>{this.getMaps(itemData.maps["8"], 8)}</p>
					<p>{this.getMaps(itemData.maps["10"], 10)}</p>
					<p>{this.getMaps(itemData.maps["11"], 11)}</p>
					<p>{this.getMaps(itemData.maps["12"], 12)}</p>
				</div>)

		} else {
			return <div>loading...</div>
		}
	}

}

export default SingleItem;