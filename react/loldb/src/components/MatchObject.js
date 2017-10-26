import React, { Component } from 'react';
import '../index.css';
import champData from './champions.json'

class MatchObject extends Component {

    constructor(props) {
        super(props);
        this.champion = this.champion.bind(this);
    }

    getItemURL(item_id) {
        if (item_id === 0) {
            return "http://solomid-resources.s3-website-us-east-1.amazonaws.com/probuilds/img/items/28/EmptyIcon.png";
        }
        else {  
            return "http://ddragon.leagueoflegends.com/cdn/7.20.1/img/item/" + item_id + ".png"
        }
    }


    champion(e, matchId) {
        e.preventDefault();
        // console.log("HIIIII" + matchId);
        window.location = '/matches/' + matchId;
    }

    render () {


        // let champImage = champData.data.filter(function(i) {
        //   return i.id === this.props.thisChampId;
        // });

        // console.log(champImage)
        // console.log(this.props.thisMatch)
        let imageURL = `http://ddragon.leagueoflegends.com/cdn/7.20.1/img/champion/${this.props.thisMatch.participants["0"].championName}.png`
        imageURL = imageURL.replace(/\s/g, '');
        let kda = `${this.props.thisMatch.participants["0"].stats.kills}/${this.props.thisMatch.participants["0"].stats.deaths}/${this.props.thisMatch.participants["0"].stats.assists}`
        let click = `window.document.location=$'/matches/{this.props.thisMatch.gameId}';`
        return (
                <tr onClick={(e) => this.champion(e, this.props.thisMatch.gameId)} style={{cursor: 'pointer'}} href={`/champions`}>

                        <td><img src={imageURL} alt="" border={3} height={50} width={50}></img></td>
                        <td>{this.props.thisMatch.participantIdentities["0"].player.summonerName}</td>
                        <td>{kda}</td>
                        <td>
                            <img alt="" src={this.getItemURL(this.props.thisMatch.participants["0"].stats.item0)} border={3} height={50} width={50}/>
                            <img alt="" src={this.getItemURL(this.props.thisMatch.participants["0"].stats.item1)} border={3} height={50} width={50}/>
                            <img alt="" src={this.getItemURL(this.props.thisMatch.participants["0"].stats.item2)} border={3} height={50} width={50}/>
                            <img alt="" src={this.getItemURL(this.props.thisMatch.participants["0"].stats.item3)} border={3} height={50} width={50}/>
                            <img alt="" src={this.getItemURL(this.props.thisMatch.participants["0"].stats.item4)} border={3} height={50} width={50}/>
                            <img alt="" src={this.getItemURL(this.props.thisMatch.participants["0"].stats.item5)} border={3} height={50} width={50}/>
                        </td>
                        <td>
                            <img src={`http://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/${this.props.thisMatch.participants["0"].spell1Id}.png`} alt="" border={3} height={50} width={50}/>
                            <img src={`http://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/${this.props.thisMatch.participants["0"].spell2Id}.png`} alt="" border={3} height={50} width={50}/>
                        </td>
                </tr> 

        );
    }

}

export default MatchObject;