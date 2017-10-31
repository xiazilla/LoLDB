import React, { Component } from 'react';
import ItemObject from './ItemObject'
import ReactPaginate from 'react-paginate';
 
class AllItems extends Component {


    constructor(props) {
        super(props);
        this.state = {
            itemsRendered: false,
            items: [],
            activePage: 1,
            itemsPerPage: 24
        }
        this.handlePageChange = this.handlePageChange.bind(this)
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

    handlePageChange(pageNumber) {
        // console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
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

            let lastItemOnPage = this.state.itemsPerPage * this.state.activePage;
            let firstItemOnPage = this.state.itemsPerPage * (this.state.activePage - 1);
            const currentItemsOnPage = items.slice(firstItemOnPage, lastItemOnPage);

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
                    <div className="row">{currentItemsOnPage.map(item => 
                        <ItemObject key={item.id} thisItem={item} />)}
                    </div>
                    <section className="global-page-header">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="block">
                                        <Pagination
                                          hideDisabled
                                          activePage={this.state.activePage}
                                          itemsCountPerPage={24}
                                          totalItemsCount={items.length}
                                          onChange={this.handlePageChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>   
                    </section>                     
                </div>
            )
        } else {
            return <div>loading....</div>
        }
    }
}

export default AllItems;