import React, { Component } from 'react';
import SkinObject from './SkinObject';
import './Champions.css';
import { Carousel } from 'react-responsive-carousel';
import '../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css';

class EssentialItems extends Component {
  render () {
    let url = 'http://ddragon.leagueoflegends.com/cdn/7.10.1/img/item/' + this.props.item.id + '.png';
        // console.log(this.props.item)
    return (
      <div className='col-sm-4'>
        <a href={`/items/${this.props.item.id}`}>
          <img src={url} alt='' />
        </a>
      </div>
    );
  }
}

class ItemGroup extends Component {
  render () {
    return (
      <div>
        <h5>{this.props.theseItems.type.toUpperCase()}</h5>
        <div className='row'>
          {this.props.theseItems.items.map((item) => <EssentialItems item={item} />)}
        </div>
      </div>
    );
  }
}

class AllItems extends Component {
  render () {
    let recommended = this.props.recommended.blocks;
    return (
      <div>
        {recommended.map((block) => <ItemGroup theseItems={block} />)}
      </div>
    );
  }
}

class SingleChampion extends Component {
  GetHtml (theJSON) {
    var html = theJSON;
    var div = document.createElement('div');
    div.innerHTML = html;
    var text = div.textContent || div.innerText || '';
    return text;
  }

  constructor (props) {
    super(props);
    this.state = {
      champName: props.match.params.name,
      champData: [],
      champDataLoaded: 0
    };
  }

  componentWillMount () {
    let url = `https://loldbapi.appspot.com/api/champs/${this.props.match.params.name}`;

    fetch(url)
        .then(response => {
          return response.json();
        }).then(results => {
          this.setState({champData: results.result[0]});
          this.setState({champDataLoaded: 1});
        });
  }

  render () {
    if (this.state.champDataLoaded === 0) {
      return (<h2>Loading...</h2>);
    } else {
      let championData, spellData;
      let q, w, e, r, p, itemsChampName;
      var skins = [];
      let recommendedItems = [];

      championData = this.state.champData;
      itemsChampName = championData.riotName;
      spellData = championData.spells;
      Object.keys(championData.skins).forEach(function (key) {
        skins.push(championData.skins[key]);
      });
      q = spellData[0];
      w = spellData[1];
      e = spellData[2];
      r = spellData[3];
      p = championData.passive;
      recommendedItems = championData.recommended;

      let ARAMRec = -1;
      let SRRec = -1;
      let TTRec = -1;

      for (let i = 0; i < recommendedItems.length; ++i) {
        let mapID = recommendedItems['' + i];
        if (mapID.mode === 'ARAM') {
          ARAMRec = i;
        } else if (mapID.map === 'TT' && mapID.mode === 'CLASSIC') {
          TTRec = i;
        } else if (mapID.map === 'SR' && mapID.mode === 'CLASSIC') {
          SRRec = i;
        }
      }

      let lore = championData.lore;

      let imageURL = 'https://ddragon.leagueoflegends.com/cdn/7.20.1/img/spell/';
      let passiveURL = 'https://ddragon.leagueoflegends.com/cdn/7.20.1/img/passive/';

      return (
        <div className='test'>
          <section className='global-page-header'>
            <div className="container">
              <div className="col-md-12">
                <h2>{this.state.champName.toUpperCase()}</h2>
                <p>{championData.title}</p>
              </div>
            </div>
          </section>
          

            <div className='sliderContainer'>
              <Carousel showThumbs={false}>
                {skins.map((skin) =>
                  <SkinObject key={skin.title} thisSkin={skin} name={itemsChampName} index={skin.id % 10} />)}
              </Carousel>
            </div>


          <div className='champion_abilities'>
            <h3> Champion Abilities</h3>
            <div className='row'>
              <table className='champion_abilities'>
                <tr>
                  <th width='50'>Ability</th>
                  <th width='100'>Description</th>
                </tr>
                <tr>
                  <td><img src={(passiveURL).concat(p.image.full)} className='img-responsive' alt='' title={this.GetHtml(p.sanitizedDescription)} /> <p>{p.name}</p></td>
                  <td>{this.GetHtml(p.sanitizedDescription)}</td>
                </tr>
                <tr>
                  <td><img src={(imageURL).concat(q.image)} className='img-responsive' alt='' title={this.GetHtml(q.sanitizedDescription)} /> <p>{q.name}</p></td>
                  <td>{this.GetHtml(q.sanitizedDescription)}</td>
                </tr>
                <tr>
                  <td><img src={(imageURL).concat(w.image)} className='img-responsive' alt='' title={this.GetHtml(w.sanitizedDescription)} /> <p>{w.name}</p></td>
                  <td>{this.GetHtml(w.sanitizedDescription)}</td>
                </tr>
                <tr>
                  <td><img src={(imageURL).concat(e.image)} className='img-responsive' alt='' title={this.GetHtml(e.sanitizedDescription)} /> <p>{e.name}</p></td>
                  <td>{this.GetHtml(e.sanitizedDescription)}</td>
                </tr>
                <tr>
                  <td><img src={(imageURL).concat(r.image)} className='img-responsive' alt='' title={this.GetHtml(r.sanitizedDescription)} /> <p>{r.name}</p></td>
                  <td>{this.GetHtml(r.sanitizedDescription)}</td>
                </tr>
              </table>
            </div>
          </div>


          <div className='recommended_items'>
          <h3>Recommended Items</h3>

          <div className='row'>
            <div className='col-md-4'>
              <div className='sr_container'>
              	<div className='sr_bg'></div>
                <h4><a href={`/maps/Summoner's%20Rift/`}>Summoner's Rift</a></h4>
                <div>
                  <AllItems recommended={recommendedItems['' + SRRec]} />
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='aram_container'>
              	<div className='aram_bg'></div>
                <h4><a href={`/maps/The%20Howling%20Abyss`}>ARAM</a></h4>
                <div>
                  <AllItems recommended={recommendedItems['' + ARAMRec]} />
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='tt_container'>
              	<div className='tt_bg'></div>
                <h4><a href={`/maps/The%20Twisted%20Treeline`}>Twisted Treeline</a></h4>
                <div>
                  <AllItems recommended={recommendedItems['' + TTRec]} />
                </div>
              </div>
            </div>
          </div>
          </div>

            <div className='text'><h3>Champion Lore</h3></div>
            <div className='row'>
              <div className='text2'>
                <p><div dangerouslySetInnerHTML={{__html: lore}} /></p>
              </div>
            </div>
        </div>
      );
    }
  }
}

export default SingleChampion;
