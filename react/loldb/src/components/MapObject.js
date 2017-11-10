import React, { Component } from 'react';

class MapObject extends Component {
    // constructor(props) {
    //     super(props);
    // }

  render () {
    console.log('HERE');
    console.log(this.props.thisMap);
    var article1 = this.props.thisMap.article.sections['0'];
        // Set article 2 to the section that contains the Lore
    var article2 = '';
    var i;
    for (i in this.props.thisMap.article.sections) {
      if (this.props.thisMap.article.sections[i].title === 'Lore') {
        article2 = this.props.thisMap.article.sections[i];
      }
    }
    var champList = this.props.thisMap.champs;
    return (
      <div className='col-sm-3 container'>
        <figure className='wow'>
          <a href={`/maps/${this.props.thisMap.mapName}`}>
            <div className='img-wrapper2'>
              <img src={this.props.thisMap.image} class='img-responsive' alt='portfolio items' height={150} />
            </div>
          </a>
          <figcaption>
            <span>
              <p><strong> {this.props.thisMap.mapName}</strong></p>
              <p><strong> {article1.title}: </strong>{article1.content['0'].text}</p>
              <p><strong> {article2.title}: </strong> {article2.content['0'].text}</p>
              <p><strong> Champions mentioned: </strong> {champList['0']} ...</p>
            </span>
          </figcaption>
        </figure>
      </div>);
  }
}

export default MapObject;
