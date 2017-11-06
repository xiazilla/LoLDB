import React, { Component } from 'react';
import ItemObject from './ItemObject'
import './dropdown.css'
 
class AllItems extends Component {


    constructor(props) {
        super(props);
        this.state = {
            itemsRendered: false,
            items: [],
            activePage: 1,
            itemsPerPage: 24,
            itemsLength: 100,
            pages: 1,
            search: '',
            category: ''
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
                // console.log(results)
                let items = parseInt(results.result.length, 10);
                let perPage = parseInt(this.state.itemsPerPage, 10);
;
                this.setState({pages: Math.ceil(items/perPage)})
                this.setState({items: results})
                this.setState({itemsRendered: true})
                // console.log("state", this.state.data)
            })

    }

    updateSearch(event) {
        this.setState({search: event.target.value.substr(0,20)});
        this.setState({activePage: 1});
    }

    updateSelect(event) {
        this.setState({category: event.target.value.substr(0,20)});
        this.setState({activePage: 1});
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
        console.log("decreasePage")
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
            // console.log(this.state.items)
        	// console.log(items)
            items = items.filter(
            (item) => {
                if(item.hasOwnProperty('name')) {
                    return item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
                }
                return false;
            });
            items = items.filter(
            (item) => {
                //console.log(this.state.role)
                if (this.state.category === '') {
                    return true;
                }
                else {
                    if(item.hasOwnProperty('categories')) {
                        return item.categories.indexOf(this.state.category) !== -1;
                    }
                }
                return false
            }); 
            let lastItemOnPage = this.state.itemsPerPage * this.state.activePage;
            let firstItemOnPage = this.state.itemsPerPage * (this.state.activePage - 1);
            const currentItemsOnPage = items.slice(firstItemOnPage, lastItemOnPage);
            let numPages = Math.ceil(parseInt(items.length, 10)/parseInt(this.state.itemsPerPage, 10))
            let pages = new Array(numPages)
            for(let i = 0; i < numPages; ++i) {
                pages[i] = i + 1
            }

            return (
                <div>
                    <section className="global-page-header">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="block">
                                        <h2>Items</h2>
                                        <input type="text" placeholder="Search by name..."
                                        value={this.state.search} 
                                        onChange={this.updateSearch.bind(this)}/>
                                        <select onChange={this.updateSelect.bind(this)}> 
                                            <option value=''>All</option>
                                            <option>Health</option>
                                            <option value='SpellBlock'>MagicResist</option>
                                            <option>HealthRegen</option>
                                            <option>Armor</option>
                                            <option>Damage</option>
                                            <option>CriticalStrike</option>
                                            <option>AttackSpeed</option>
                                            <option>LifeSteal</option>
                                            <option value='SpellDamage'>AbilityPower</option>
                                            <option>CooldownReduction</option>
                                            <option>Mana</option>
                                            <option>ManaRegen</option>
                                            <option value='Boots'>Movement</option>
                                            <option>Consumable</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {numPages === 0 ? false : 
                        <div className="row">{currentItemsOnPage.map(item => 
                            <ItemObject key={item.id} thisItem={item} />)}
                        </div> }
                    {numPages === 0 ? <div> No Items Match Your Search </div> :
                        <section className="global-page-header">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="block">
                                                <div className="pager in-line"> 
                                                    {this.state.activePage === 1 ? false: <button onClick={this.decreasePage}>&laquo;</button>}
                                                    {pages.map(page => (<button className={this.state.activePage === page ? "active" : false} key={page} onClick={() => this.handlePageChange(page)}>{"" + page}</button>))}
                                                    {this.state.activePage === numPages ? false : <button onClick={this.increasePage}>&raquo;</button>}
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>   
                        </section>}                    
                </div>
            )
        } else {
            return <div>loading....</div>
        }
    }
}

export default AllItems;