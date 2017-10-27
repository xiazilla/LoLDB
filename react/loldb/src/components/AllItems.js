import React, { Component } from 'react';
import myData from './items.json';
import ItemObject from './ItemObject'

 
class AllItems extends Component {

    render() {
    	let data = myData.result;
    	var items = [];
        // console.log(data)
    	Object.keys(data).forEach(function(key) {
      		items.push(myData.result[key]);
    	});
    	// console.log(items)
        return (
            <div>

            <section className="global-page-header">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="block">
                            <h2>Items</h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        	<div className="row">{items.map(item => 
        		<ItemObject key={item.id} thisItem={item} />)}
        	</div>

            </div>
        )
    }
}

export default AllItems;