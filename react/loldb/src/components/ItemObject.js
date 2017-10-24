import React, { Component } from 'react';
import '../index.css';

class ItemObject extends Component {

    // constructor(props) {
    //     super(props);
    // }


    render () {
        return (
           <div className="col-sm-2 container">
                   <figure className="wow">
                    <a href={`/items/${this.props.thisItem.name}`}>
                        <div class="img-wrapper2">
                            <img src={this.props.thisItem.image} class="img-responsive" alt="portfolio items" />
                        </div>
                    </a>
                    <figcaption>
                        <span>
                            <p><strong> {this.props.thisItem.name}</strong></p>
                            <p>
                                Cost: {this.props.thisItem.gold.total}
                            </p>
                            <p> {this.props.thisItem.sanitizedDescription} </p>
                        </span>
                    </figcaption>
                </figure>
            </div> );
    }

}

export default ItemObject;