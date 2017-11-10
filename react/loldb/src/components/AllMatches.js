import React, { Component } from 'react';
import MatchObject from './MatchObject.js';
import './dropdown.css';

class AllMatches extends Component {
  constructor (props) {
    super(props);
    this.state = {
      dataLoaded: 0,
      data: [],
      activePage: 1,
      matchesPerPage: 8,
      lane: '',
      sort: ''
    };
  }

  componentWillMount () {
    let url = 'https://loldbapi.appspot.com/api/matches';
    fetch(url)
        .then(response => {
          return response.json();
        }).then(results => {
          this.setState({data: results});
          this.setState({dataLoaded: 1});
                // console.log("state", this.state.data)
        });
  }

  updateSelect (event) {
    this.setState({lane: event.target.value.substr(0, 20)});
    this.setState({activePage: 1});
  }

  updateSort (event) {
    this.setState({sort: event.target.value});
    this.setState({activePage: 1});
  }

  handlePageChange (pageNumber) {
        // console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }

  render () {
    var matches = [];
    if (!this.state.dataLoaded) {
      return (<h2>Loading...</h2>);
    } else {
      matches = this.state.data.result;

      console.log(matches);

      matches = matches.filter((match) => {
        if (this.state.lane === '') {
          return true;
        } else {
          return match.participants['0'].timeline.lane === this.state.lane;
        }
      });

      if (this.state.sort === 'Descending') {
        matches.sort(function (a, b) {
          if (a.gameId < b.gameId) return -1;
          if (a.gameId > b.gameId) return 1;
          return 0;
        });
      } else if (this.state.sort === 'Ascending') {
        matches.sort(function (a, b) {
          if (a.gameId < b.gameId) return 1;
          if (a.gameId > b.gameId) return -1;
          return 0;
        });
      }
      console.log(matches);

      let lastMatchOnPage = this.state.matchesPerPage * this.state.activePage;
      let firstMatchOnPage = this.state.matchesPerPage * (this.state.activePage - 1);
      let numPages = Math.ceil(parseInt(matches.length, 10) / parseInt(this.state.matchesPerPage, 10));
      matches = matches.slice(firstMatchOnPage, lastMatchOnPage);

      let pages = new Array(numPages);
      console.log(pages);
      for (let i = 0; i < numPages; ++i) {
        pages[i] = i + 1;
      }

      return (
        <div>
          <section className='global-page-header'>
            <div className='container'>
              <div className='row'>
                <div className='col-md-12'>
                  <div className='block'>
                    <h2>Matches</h2>
                                    &nbsp; Filter By Lane: &nbsp;
                                    <select onChange={this.updateSelect.bind(this)}>
                                      <option value=''>All</option>
                                      <option>TOP</option>
                                      <option>JUNGLE</option>
                                      <option>MIDDLE</option>
                                      <option>BOTTOM</option>
                                    </select>
                                        &nbsp; Sort By: &nbsp;
                                        <button className='btn' value='Ascending' onClick={this.updateSort.bind(this)}>Most Recent</button>
                                        &nbsp;
                    <button className='btn' value='Descending' onClick={this.updateSort.bind(this)}>Least Recent</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {numPages === 0 ? false
                    : <section className='works service-page'>
                      <div className='container'>
                        <div className='row'>
                          <table>
                            <h3 className='subtitle wow fadeInUp animated' data-wow-delay='.3s' data-wow-duration='500ms'> <strong> Pro History </strong> </h3>
                            <tr>
                              <th width='50'>Champion</th>
                              <th width='100'>Player</th>
                              <th width='60'>KDA</th>
                              <th width='350'>Items</th>
                              <th>Summoner Spells</th>
                            </tr>
                            {matches.map((match) => {
                              return (<MatchObject key={match.id} thisMatch={match} index={'0'} linkToMatch={1} />);
                            })}

                          </table>
                        </div>
                      </div>
                    </section> }
          {numPages === 0 ? <div> No Matches Match Your Search </div>
                : <section className='global-page-header'>
                  <div className='container'>
                    <div className='row'>
                      <div className='col-md-12'>
                        <div className='block'>
                          <div className='pager in-line'>
                            {this.state.activePage === 1 ? false : <button onClick={this.decreasePage}>&laquo;</button>}
                            {pages.map(page => (<button className={this.state.activePage === page ? 'active' : false} key={page} onClick={() => this.handlePageChange(page)}>{'' + page}</button>))}
                            {this.state.activePage === numPages ? false : <button onClick={this.increasePage}>&raquo;</button>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>}
        </div>
      );
    }
  }
}

export default AllMatches;
