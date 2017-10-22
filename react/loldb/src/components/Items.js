import React, { Component } from 'react';
import myData from './items.json';
import ItemObject from './ItemObject'

 
class Items extends Component {
	constructor(props) {
		super(props);
		this.state = {
			items: []
		}
	}

    render() {
    	let data = myData.data;
    	var items = [];
    	Object.keys(data).forEach(function(key) {
      		items.push(myData.data[key]);
    	});
    	console.log(items)
        return (
        	<div className="row">{items.map(item => 
        		<ItemObject key={item.id} thisItem={item} />)}
        	</div>
        )
    }
}

export default Items;
