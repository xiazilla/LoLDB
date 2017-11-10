import React, { Component } from 'react';
import '../index.css';

class MatchObject extends Component {
  constructor (props) {
    super(props);
    this.champion = this.champion.bind(this);
  }

  getItemURL (item_id) {
    if (item_id === 0) {
      return 'http://solomid-resources.s3-website-us-east-1.amazonaws.com/probuilds/img/items/28/EmptyIcon.png';
    } else {
      return 'http://ddragon.leagueoflegends.com/cdn/7.20.1/img/item/' + item_id + '.png';
    }
  }

  champion (e, matchId) {
    e.preventDefault();
        // console.log("HIIIII" + matchId);
    window.location = '/matches/' + matchId;
  }

  render () {
    console.log(this.props.thisMatch.gameMode);

        // let champImage = champData.data.filter(function(i) {
        //   return i.id === this.props.thisChampId;
        // });

        // console.log(champImage)
        // console.log(this.props.thisMatch)
        // console.log(this.props.index)
    let idx = this.props.index;
    let name = this.props.thisMatch.participants[idx].championName === "Cho'Gath" ? 'Chogath' : this.props.thisMatch.participants[idx].championName;
    let imageURL = `http://ddragon.leagueoflegends.com/cdn/7.20.1/img/champion/${name}.png`;
    imageURL = imageURL.replace(/\s/g, '');
    imageURL = imageURL.replace(/'/g, '');
    let kda = `${this.props.thisMatch.participants[idx].stats.kills}/${this.props.thisMatch.participants[idx].stats.deaths}/${this.props.thisMatch.participants[idx].stats.assists}`;
    if (this.props.linkToMatch) {
      return (
        <tr onClick={(e) => this.champion(e, this.props.thisMatch.gameId)} style={{cursor: 'pointer'}} href={`/champions`}>

          <td><img src={imageURL} alt='' border={3} height={50} width={50} /></td>
          <td>{this.props.thisMatch.participantIdentities[idx].player.summonerName}</td>
          <td>{kda}</td>
          <td>
            <img alt='' src={this.getItemURL(this.props.thisMatch.participants[idx].stats.item0)} border={3} height={50} width={50} />
            <img alt='' src={this.getItemURL(this.props.thisMatch.participants[idx].stats.item1)} border={3} height={50} width={50} />
            <img alt='' src={this.getItemURL(this.props.thisMatch.participants[idx].stats.item2)} border={3} height={50} width={50} />
            <img alt='' src={this.getItemURL(this.props.thisMatch.participants[idx].stats.item3)} border={3} height={50} width={50} />
            <img alt='' src={this.getItemURL(this.props.thisMatch.participants[idx].stats.item4)} border={3} height={50} width={50} />
            <img alt='' src={this.getItemURL(this.props.thisMatch.participants[idx].stats.item5)} border={3} height={50} width={50} />
          </td>
          <td>
            <img src={`http://ddragon.leagueoflegends.com/cdn/7.20.1/img/spell/${this.props.thisMatch.participants[idx].spell1Id}.png`} alt='' border={3} height={50} width={50} />
            <img src={`http://ddragon.leagueoflegends.com/cdn/7.20.1/img/spell/${this.props.thisMatch.participants[idx].spell2Id}.png`} alt='' border={3} height={50} width={50} />
          </td>
        </tr>

      );
    } else {
      return (
        <tr>
          <td><a href={`/champions/${this.props.thisMatch.participants[idx].championName}`}><img src={imageURL} alt='' border={3} height={50} width={50} /></a></td>
          <td>{this.props.thisMatch.participantIdentities[idx].player.summonerName}</td>
          <td>{kda}</td>
          <td>
            <a href={`/items/${this.props.thisMatch.participants[idx].stats.item0}`}><img alt='' src={this.getItemURL(this.props.thisMatch.participants[idx].stats.item0)} border={3} height={50} width={50} /></a>
            <a href={`/items/${this.props.thisMatch.participants[idx].stats.item1}`}><img alt='' src={this.getItemURL(this.props.thisMatch.participants[idx].stats.item1)} border={3} height={50} width={50} /></a>
            <a href={`/items/${this.props.thisMatch.participants[idx].stats.item2}`}><img alt='' src={this.getItemURL(this.props.thisMatch.participants[idx].stats.item2)} border={3} height={50} width={50} /></a>
            <a href={`/items/${this.props.thisMatch.participants[idx].stats.item3}`}><img alt='' src={this.getItemURL(this.props.thisMatch.participants[idx].stats.item3)} border={3} height={50} width={50} /></a>
            <a href={`/items/${this.props.thisMatch.participants[idx].stats.item4}`}><img alt='' src={this.getItemURL(this.props.thisMatch.participants[idx].stats.item4)} border={3} height={50} width={50} /></a>
            <a href={`/items/${this.props.thisMatch.participants[idx].stats.item5}`}><img alt='' src={this.getItemURL(this.props.thisMatch.participants[idx].stats.item5)} border={3} height={50} width={50} /></a>
          </td>
          <td>
            <img src={`http://ddragon.leagueoflegends.com/cdn/7.20.1/img/spell/${this.props.thisMatch.participants[idx].spell1Id}.png`} alt='' border={3} height={50} width={50} />
            <img src={`http://ddragon.leagueoflegends.com/cdn/7.20.1/img/spell/${this.props.thisMatch.participants[idx].spell2Id}.png`} alt='' border={3} height={50} width={50} />
          </td>
        </tr>

      );
    }
  }
}

export default MatchObject;
