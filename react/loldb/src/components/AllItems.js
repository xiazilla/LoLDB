import React, { Component } from 'react';
import myData from './items.json';
import ItemObject from './ItemObject'

 
class AllItems extends Component {

    render() {
    	let data = myData.data;
    	var items = [];
    	Object.keys(data).forEach(function(key) {
      		items.push(myData.data[key]);
    	});
    	// console.log(items)
        return (
            <div>
            	<div className="row">{items.map(item => 
            		<ItemObject key={item.id} thisItem={item} />)}
            	</div>
            </div>
        )
    }
}

export default AllItems;