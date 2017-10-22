import React, { Component } from 'react';
import myData from './items.json';


 
class Items extends Component {
	constructor(props) {
		super(props);
		this.state = {
			items: []
		}
	}

	// createItem (item) {
	// 	<div>{item}</div>
	// }

	// createItems (items) {
	// 	return items.map((result) => this.createItem());
	// }


    render() {
    	let data = myData.data;
    	var items = [];
    	console.log(data);
    	Object.keys(myData.data).forEach(function(key) {
      		items.push(myData.data[key]);
    	});
    	console.log(items)
        return (
        	<div>{items.map(item => <h4>{item.name}</h4>)}</div>
        )
    }
}

export default Items;
