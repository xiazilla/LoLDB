import React, { Component } from 'react';
import ItemObject from './ItemObject'
 
class AllItems extends Component {


    constructor(props) {
        super(props);
        this.state = {
            itemsRendered: false,
            items: [],
            activePage: 1,
            itemsPerPage: 24,
            itemsLength: 100,
            pages: 1
        }
        this.handlePageChange = this.handlePageChange.bind(this)
        this.increasePage = this.increasePage.bind(this)
        this.decreasePage = this.decreasePage.bind(this)
    }

    componentWillMount() {


        let url = 'https://loldbapi.appspot.com/api/items';
        fetch(url)
        .then(response => {
            return response.json()
            }).then(results => {
                let items = parseInt(results.result.length, 10);
                let perPage = parseInt(this.state.itemsPerPage, 10);
;
                this.setState({pages: Math.ceil(items/perPage)})
                this.setState({items: results})
                this.setState({itemsRendered: true})
                // console.log("state", this.state.data)
            })

    }

    handlePageChange(pageNumber) {
        // console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber})
    }

    increasePage() {

        if (this.state.activePage === this.state.pages) {
            return false;
        } else {
            let newPage = this.state.activePage + 1;
            this.setState({activePage: newPage})
        }

    }

    decreasePage() {

        if (this.state.activePage === 1) {
            return false;
        } else {
            let newPage = this.state.activePage - 1;
            this.setState({
                activePage: newPage
            })
        }

    }

    // renderButtons = (pages) => {
    //     console.log(pages)
    //     return (
    //             {pages.map(page => (
    //                 <button className={this.state.activePage === page ? "active" : false} onClick={() => this.handlePageChange(page)}>{"" + page}</button>
    //             ))}
    //     );
    // }


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

            let pages = new Array(this.state.pages)
            for(let i = 0; i < this.state.pages; ++i) {
                pages[i] = i + 1
            }

            const self = this;
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
                                            <div className="pager in-line"> 
                                                <button onClick={() => this.decreasePage}>&laquo;</button>
                                                {pages.map(page => (<button className={this.state.activePage === page ? "active" : false} onClick={() => this.handlePageChange(page)}>{"" + page}</button>))}
                                                <button onClick={() => this.increasePage}>&raquo;</button>
                                            </div>
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