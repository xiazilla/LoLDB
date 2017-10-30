import React, { Component } from 'react';
import ItemObject from './ItemObject'

 
class AllItems extends Component {


    constructor(props) {
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
                // console.log("state", this.state.data)
            })

    }

    render() {
        if ( this.state.itemsRendered ) {
        	// let data = myData.result;
        	var items = [];
            let data = this.state.items.result
            // console.log(this.state.items)
        	Object.keys(data).forEach(function(key) {
          		items.push(data[key]);
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
        } else {
            return <div>loading....</div>
        }
    }
}

export default AllItems;